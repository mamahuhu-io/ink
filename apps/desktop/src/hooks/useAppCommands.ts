import { useCallback, useEffect } from 'react';

import type { SettingTabKey } from '../components/Settings/types';
import i18n from '../i18n';
import {
  addRecentFile,
  addRecentFolder,
  isTauri,
  isWindows,
  type MenuAction,
  openFile,
  readFile,
  saveFile,
  saveFileAs,
  setupBrowserShortcuts,
  subscribeToMenuEvents,
  unsubscribeFromMenuEvents,
} from '../services';
import { docToMarkdown, getStore, markdownToDoc, setDocLoading } from '../stores/editor';
import { useEditorModeStore } from '../stores/editorMode';
import { useFindReplaceStore } from '../stores/findReplace';
import { useTabStore } from '../stores/tabs';

// ============================================
// Types
// ============================================

interface UnsavedTab {
  id: string;
  docId: string;
  filePath?: string;
  title: string;
}

type CloseAction = 'close-window' | 'quit-app';

// ============================================
// Utility Functions
// ============================================

/** Sleep for specified milliseconds */
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Invoke a Tauri command with error handling */
async function invokeTauriCommand(command: string): Promise<void> {
  if (!isTauri()) {
    window.close();
    return;
  }
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke(command);
}

/** Force close the current window */
const forceCloseWindow = () => invokeTauriCommand('force_close_window');

/** Force quit the entire application */
const forceQuitApp = () => invokeTauriCommand('force_quit_app');

// Global callbacks for app-level handlers
// Using a Map for cleaner management instead of individual variables
type CallbackType =
  | 'preferences'
  | 'import'
  | 'exportHtml'
  | 'exportPdf'
  | 'exportDocx'
  | 'exportImage'
  | 'globalSearch'
  | 'toggleSidebar'
  | 'toggleSourceMode';

const callbacks = new Map<CallbackType, (arg?: any) => void>();

// Setter functions for backward compatibility
export function setPreferencesCallback(callback: (tab?: SettingTabKey) => void): void {
  callbacks.set('preferences', callback);
}

export function setImportCallback(callback: () => void): void {
  callbacks.set('import', callback);
}

export function setExportHtmlCallback(callback: () => void): void {
  callbacks.set('exportHtml', callback);
}

export function setExportPdfCallback(callback: () => void): void {
  callbacks.set('exportPdf', callback);
}

export function setExportDocxCallback(callback: () => void): void {
  callbacks.set('exportDocx', callback);
}

export function setExportImageCallback(callback: () => void): void {
  callbacks.set('exportImage', callback);
}

export function setGlobalSearchCallback(callback: () => void): void {
  callbacks.set('globalSearch', callback);
}

export function setToggleSidebarCallback(callback: () => void): void {
  callbacks.set('toggleSidebar', callback);
}

export function setToggleSourceModeCallback(callback: () => void): void {
  callbacks.set('toggleSourceMode', callback);
}

// Helper to execute a callback if it exists
function executeCallback(type: CallbackType, arg?: any): void {
  console.log(`[executeCallback] Executing callback for: ${type}`);
  const callback = callbacks.get(type);
  if (callback) {
    console.log(`[executeCallback] Callback found, calling...`);
    callback(arg);
  } else {
    console.warn(`Callback not set for: ${type}`);
  }
}

// Trigger functions - can be called from anywhere
export function triggerGlobalSearch(): void {
  executeCallback('globalSearch');
}

export function triggerPreferences(tab?: SettingTabKey): void {
  executeCallback('preferences', tab || 'general');
}

// Global flag to prevent duplicate close handling
let isHandlingClose = false;

/**
 * Save all unsaved tabs
 */
async function saveAllUnsavedTabs(unsavedTabs: UnsavedTab[]): Promise<void> {
  const { updateTab } = useTabStore.getState();
  const editorModeState = useEditorModeStore.getState();

  for (const tab of unsavedTabs) {
    // Check if in source mode
    const isSourceMode = editorModeState.getMode(tab.docId) === 'source';
    const sourceContent = editorModeState.getSourceContent(tab.docId);

    if (tab.filePath) {
      // Has existing path - save directly
      let content: string;
      if (isSourceMode && sourceContent) {
        content = sourceContent.current;
      } else {
        content = await docToMarkdown(tab.docId, tab.filePath);
      }
      await saveFile(content, tab.filePath);

      // If in source mode, sync content to store and mark as saved
      if (isSourceMode && sourceContent) {
        await markdownToDoc(tab.docId, sourceContent.current);
        editorModeState.markSourceContentSaved(tab.docId);
      }
      updateTab(tab.id, { isModified: false });
    } else {
      // No path - need to prompt for save location
      const path = await saveFileAs('');
      if (path) {
        let content: string;
        if (isSourceMode && sourceContent) {
          content = sourceContent.current;
        } else {
          content = await docToMarkdown(tab.docId, path);
        }
        await saveFile(content, path);
        const fileName = path.split(/[/\\]/).pop() || tab.title;

        // If in source mode, sync content to store and mark as saved
        if (isSourceMode && sourceContent) {
          await markdownToDoc(tab.docId, sourceContent.current);
          editorModeState.markSourceContentSaved(tab.docId);
        }
        updateTab(tab.id, {
          title: fileName,
          filePath: path,
          isModified: false,
        });
        await addRecentFile(path);
      } else {
        // User cancelled save dialog - abort the close operation
        throw new Error('Save cancelled by user');
      }
    }
  }
}

/** Dialog result: true = save, false = don't save, null = cancel */
type DialogResult = boolean | null;

/**
 * Show unsaved changes dialog and return user choice
 */
async function showUnsavedChangesDialog(unsavedTabs: UnsavedTab[]): Promise<DialogResult> {
  if (!isTauri()) {
    // Browser environment - use simple confirm
    const confirmed = window.confirm(
      `You have ${unsavedTabs.length} unsaved document(s). Save before closing?`,
    );
    return confirmed;
  }

  const { ask } = await import('@tauri-apps/plugin-dialog');
  const t = i18n.t.bind(i18n);

  let message: string;
  if (unsavedTabs.length === 1) {
    message = t('messages.unsavedChanges.singleFile', {
      filename: unsavedTabs[0].title,
    });
  } else {
    message = t('messages.unsavedChanges.multipleFiles', {
      count: unsavedTabs.length,
    });
  }
  message += '\n\n' + t('messages.unsavedChanges.warning');

  const result = await ask(message, {
    title: t('messages.unsavedChanges.title'),
    kind: 'warning',
    okLabel:
      unsavedTabs.length === 1
        ? t('messages.unsavedChanges.save')
        : t('messages.unsavedChanges.saveAll'),
    cancelLabel: t('messages.unsavedChanges.dontSave'),
  });

  return result;
}

/**
 * Handle close/quit with unsaved changes check
 */
async function handleCloseWithUnsavedCheck(action: CloseAction, logPrefix: string): Promise<void> {
  const { tabs } = useTabStore.getState();
  const unsavedTabs = tabs.filter((t) => t.isModified);

  console.log(`[${logPrefix}] Total tabs:`, tabs.length);
  console.log(`[${logPrefix}] Unsaved tabs:`, unsavedTabs.length);

  const executeAction = action === 'close-window' ? forceCloseWindow : forceQuitApp;

  if (unsavedTabs.length === 0) {
    console.log(`[${logPrefix}] No unsaved changes, executing action`);
    await executeAction();
    return;
  }

  console.log(`[${logPrefix}] Showing dialog...`);
  const result = await showUnsavedChangesDialog(unsavedTabs);
  console.log(`[${logPrefix}] Dialog result:`, result);

  // Small delay to let the dialog close before opening save dialog
  await sleep(100);

  if (result) {
    try {
      console.log(`[${logPrefix}] Saving tabs...`);
      await saveAllUnsavedTabs(unsavedTabs);
      console.log(`[${logPrefix}] Executing action...`);
      await executeAction();
    } catch (error) {
      console.error(`[${logPrefix}] Failed to save:`, error);
      throw error;
    }
  } else {
    console.log(`[${logPrefix}] Executing action without saving...`);
    await executeAction();
  }
}

/**
 * Close a single tab with unsaved check
 * Returns true if tab was closed, false if user cancelled
 */
export async function closeTabWithCheck(
  tab: {
    id: string;
    docId: string;
    title: string;
    filePath?: string;
    isModified: boolean;
  },
  onClose: () => void,
): Promise<boolean> {
  console.log(
    '[CloseTab] closeTabWithCheck called for tab:',
    tab.title,
    'isModified:',
    tab.isModified,
  );

  if (!tab.isModified) {
    // No unsaved changes - close directly
    onClose();
    return true;
  }

  // Has unsaved changes - show dialog
  if (isTauri()) {
    const { ask } = await import('@tauri-apps/plugin-dialog');

    const t = i18n.t.bind(i18n);
    const message =
      t('messages.unsavedChanges.singleFile', { filename: tab.title }) +
      '\n\n' +
      t('messages.unsavedChanges.warning');

    const result = await ask(message, {
      title: t('messages.unsavedChanges.title'),
      kind: 'warning',
      okLabel: t('messages.unsavedChanges.save'),
      cancelLabel: t('messages.unsavedChanges.dontSave'),
    });

    if (result) {
      // User chose "Save"
      try {
        const { updateTab } = useTabStore.getState();
        const editorModeState = useEditorModeStore.getState();
        const isSourceMode = editorModeState.getMode(tab.docId) === 'source';
        const sourceContent = editorModeState.getSourceContent(tab.docId);

        if (tab.filePath) {
          let content: string;
          if (isSourceMode && sourceContent) {
            content = sourceContent.current;
          } else {
            content = await docToMarkdown(tab.docId, tab.filePath);
          }
          await saveFile(content, tab.filePath);

          // If in source mode, sync content to store and mark as saved
          if (isSourceMode && sourceContent) {
            await markdownToDoc(tab.docId, sourceContent.current);
            editorModeState.markSourceContentSaved(tab.docId);
          }
          updateTab(tab.id, { isModified: false });
        } else {
          // No path - need to prompt for save location
          const path = await saveFileAs('');
          if (path) {
            let content: string;
            if (isSourceMode && sourceContent) {
              content = sourceContent.current;
            } else {
              content = await docToMarkdown(tab.docId, path);
            }
            await saveFile(content, path);

            // If in source mode, sync content to store and mark as saved
            if (isSourceMode && sourceContent) {
              await markdownToDoc(tab.docId, sourceContent.current);
              editorModeState.markSourceContentSaved(tab.docId);
            }
            await addRecentFile(path);
          } else {
            // User cancelled save dialog
            return false;
          }
        }
        onClose();
        return true;
      } catch (error) {
        console.error('Failed to save file:', error);
        return false;
      }
    } else {
      // User chose "Don't Save" - close without saving
      onClose();
      return true;
    }
  } else {
    // Browser environment - use confirm
    const confirmed = window.confirm(
      `Do you want to save the changes to "${tab.title}"?\n\nYour changes will be lost if you don't save them.`,
    );
    if (confirmed) {
      // In browser, we can't really save, just close
      onClose();
    }
    return confirmed;
  }
}

/**
 * Hook to handle application commands from menu and keyboard shortcuts
 */
export function useAppCommands() {
  const { tabs, activeTabId, addTab, closeTab, updateTab } = useTabStore();

  // Get active tab
  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Handle new tab - creates a new tab in current window
  const handleNewTab = useCallback(() => {
    addTab('Untitled');
  }, [addTab]);

  // Handle new window - creates a new window
  const handleNewWindow = useCallback(async () => {
    if (isTauri()) {
      try {
        const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
        const { invoke } = await import('@tauri-apps/api/core');
        const { useThemeStore } = await import('../stores/theme');

        // Get current theme to set correct background color
        const resolvedTheme = useThemeStore.getState().resolvedTheme;
        const isDark = resolvedTheme === 'dark';
        // Color format: [r, g, b, a] array
        const backgroundColor: [number, number, number, number] = isDark
          ? [20, 20, 20, 255] // #141414
          : [255, 255, 255, 255]; // #ffffff

        const uniqueLabel = `main-${Date.now()}`;
        console.log('Creating new window with label:', uniqueLabel);

        // Platform-specific window options
        // Windows: no decorations (uses custom web title bar), no titleBarStyle/hiddenTitle
        // macOS: overlay title bar style with hidden title
        // Linux: standard decorations
        const isWin = isWindows();
        const windowOptions: Parameters<typeof WebviewWindow>[1] = {
          url: '/',
          title: 'Ink',
          width: 1200,
          height: 800,
          minWidth: 800,
          minHeight: 600,
          center: true,
          visible: false, // Start hidden, will show after theme loads
          backgroundColor,
          // Windows uses custom web title bar, so no decorations
          decorations: !isWin,
          transparent: !isWin,
          // macOS-specific options (these are ignored on other platforms but may cause issues)
          ...(isWin
            ? {}
            : {
                titleBarStyle: 'overlay' as const,
                hiddenTitle: true,
              }),
        };

        const webview = new WebviewWindow(uniqueLabel, windowOptions);
        // Listen for window creation events
        webview.once('tauri://created', async () => {
          console.log('New window created successfully');
          // Rebuild menu to update window list (not needed on Windows where we use web menu)
          if (!isWin) {
            try {
              await invoke('rebuild_menu');
              console.log('Menu rebuilt with new window');
            } catch (error) {
              console.error('Failed to rebuild menu:', error);
            }
          }
        });
        webview.once('tauri://error', (e) => {
          console.error('Failed to create window:', e);
        });
      } catch (error) {
        console.error('Failed to create new window:', error);
      }
    } else {
      // In browser, open a new browser window
      window.open(window.location.href, '_blank');
    }
  }, []);

  // Open a file by path (used for recent files)
  const openFileByPath = useCallback(
    async (filePath: string) => {
      try {
        // Check if file is already open
        const existingTab = tabs.find((t) => t.filePath === filePath);
        if (existingTab) {
          // Just activate the existing tab
          useTabStore.getState().setActiveTab(existingTab.id);
          return;
        }

        // Read the file content
        const content = await readFile(filePath);
        const fileName = filePath.split(/[/\\]/).pop() || 'Untitled';

        // Add new tab with file info
        const docId = addTab(fileName, filePath);

        // Mark document as loading immediately
        setDocLoading(docId, true);

        // Load content into the editor
        setTimeout(async () => {
          try {
            await markdownToDoc(docId, content, filePath);
            console.log('Loaded file content into doc:', filePath);
            // Add to recent files
            await addRecentFile(filePath);
          } catch (error) {
            console.error('Failed to load file content:', error);
          }
        }, 100);
      } catch (error) {
        console.error('Failed to open file:', error);
      }
    },
    [tabs, addTab],
  );

  // Handle open file
  const handleOpen = useCallback(async () => {
    try {
      const fileInfo = await openFile();
      if (fileInfo) {
        // Add new tab with file info
        const docId = addTab(fileInfo.name, fileInfo.path);

        // Mark document as loading immediately
        setDocLoading(docId, true);

        // Load content into the editor
        // Wait a bit for the doc to be created
        setTimeout(async () => {
          try {
            await markdownToDoc(docId, fileInfo.content, fileInfo.path);
            console.log('Loaded file content into doc:', fileInfo.path);
            // Add to recent files
            await addRecentFile(fileInfo.path);
          } catch (error) {
            console.error('Failed to load file content:', error);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Failed to open file:', error);
    }
  }, [addTab]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!activeTab) return;

    // Get editor mode store state
    const editorModeState = useEditorModeStore.getState();
    const isSourceMode = editorModeState.getMode(activeTab.docId) === 'source';
    const sourceContent = editorModeState.getSourceContent(activeTab.docId);

    try {
      // If file has a path, save directly
      if (activeTab.filePath) {
        let content: string;
        if (isSourceMode && sourceContent) {
          // In source mode - use the source editor content directly
          content = sourceContent.current;
          console.log('[handleSave] Saving source mode content, length:', content.length);
        } else {
          // In preview mode - export from store
          content = await docToMarkdown(activeTab.docId, activeTab.filePath);
        }
        await saveFile(content, activeTab.filePath);

        // If in source mode, sync content to store and mark as saved
        if (isSourceMode && sourceContent) {
          // Sync to store so preview mode will show the updated content
          await markdownToDoc(activeTab.docId, sourceContent.current);
          editorModeState.markSourceContentSaved(activeTab.docId);
        }
        updateTab(activeTab.id, { isModified: false });
      } else {
        // No path - need to get one first via dialog
        const path = await saveFile('', undefined);
        if (path) {
          let content: string;
          if (isSourceMode && sourceContent) {
            // In source mode - use the source editor content directly
            content = sourceContent.current;
            console.log(
              '[handleSave] Saving source mode content (new file), length:',
              content.length,
            );
          } else {
            // In preview mode - export from store (now with path for image saving)
            content = await docToMarkdown(activeTab.docId, path);
          }
          await saveFile(content, path);
          const fileName = path.split(/[/\\]/).pop() || activeTab.title;

          // If in source mode, sync content to store and mark as saved
          if (isSourceMode && sourceContent) {
            // Sync to store so preview mode will show the updated content
            await markdownToDoc(activeTab.docId, sourceContent.current);
            editorModeState.markSourceContentSaved(activeTab.docId);
          }
          updateTab(activeTab.id, {
            title: fileName,
            filePath: path,
            isModified: false,
          });
          // Add to recent files
          await addRecentFile(path);
        }
      }
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  }, [activeTab, updateTab]);

  // Handle save as
  const handleSaveAs = useCallback(async () => {
    if (!activeTab) return;

    // Get editor mode store state
    const editorModeState = useEditorModeStore.getState();
    const isSourceMode = editorModeState.getMode(activeTab.docId) === 'source';
    const sourceContent = editorModeState.getSourceContent(activeTab.docId);

    try {
      // Get new path first
      const path = await saveFileAs('');
      if (path) {
        let content: string;
        if (isSourceMode && sourceContent) {
          // In source mode - use the source editor content directly
          content = sourceContent.current;
          console.log('[handleSaveAs] Saving source mode content, length:', content.length);
        } else {
          // In preview mode - export from store (now with path for image saving)
          content = await docToMarkdown(activeTab.docId, path);
        }
        await saveFile(content, path);
        const fileName = path.split(/[/\\]/).pop() || activeTab.title;

        // If in source mode, sync content to store and mark as saved
        if (isSourceMode && sourceContent) {
          // Sync to store so preview mode will show the updated content
          await markdownToDoc(activeTab.docId, sourceContent.current);
          editorModeState.markSourceContentSaved(activeTab.docId);
        }
        updateTab(activeTab.id, {
          title: fileName,
          filePath: path,
          isModified: false,
        });
        // Add to recent files
        await addRecentFile(path);
      }
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  }, [activeTab, updateTab]);

  // Handle close tab (from menu Cmd+W)
  const handleCloseTab = useCallback(async () => {
    if (!activeTab) return;

    // Use the shared close tab with check function
    const { removeDoc } = await import('../stores/editor');
    await closeTabWithCheck(activeTab, () => {
      removeDoc(activeTab.docId);
      closeTab(activeTab.id);
    });
  }, [activeTab, closeTab]);

  // Handle toggle sidebar
  const handleToggleSidebar = useCallback(() => {
    executeCallback('toggleSidebar');
  }, []);

  // Handle toggle source mode
  const handleToggleSourceMode = useCallback(() => {
    console.log('[useAppCommands] handleToggleSourceMode called');
    executeCallback('toggleSourceMode');
  }, []);

  // Handle zoom - applies to the entire document
  const handleZoom = useCallback((action: 'in' | 'out' | 'reset') => {
    const root = document.documentElement;
    // Get current zoom level from CSS variable or default to 1
    const currentZoom = parseFloat(root.style.getPropertyValue('--app-zoom') || '1');

    let newZoom = currentZoom;
    if (action === 'in') {
      newZoom = Math.min(currentZoom + 0.1, 2);
    } else if (action === 'out') {
      newZoom = Math.max(currentZoom - 0.1, 0.5);
    } else {
      newZoom = 1;
    }

    // Store zoom level in CSS variable
    root.style.setProperty('--app-zoom', String(newZoom));

    // Apply zoom to the body using CSS zoom property (better cross-browser support)
    document.body.style.zoom = String(newZoom);

    console.log(`[Zoom] ${action}: ${currentZoom} -> ${newZoom}`);
  }, []);

  // Handle about
  const handleAbout = useCallback(() => {
    executeCallback('preferences', 'about');
  }, []);

  // Handle preferences
  const handlePreferences = useCallback(() => {
    executeCallback('preferences', 'general');
  }, []);

  // Handle export HTML
  const handleExportHtml = useCallback(() => {
    executeCallback('exportHtml');
  }, []);

  // Handle export PDF
  const handleExportPdf = useCallback(() => {
    console.log('handleExportPdf called');
    executeCallback('exportPdf');
  }, []);

  // Handle export DOCX
  const handleExportDocx = useCallback(() => {
    console.log('handleExportDocx called');
    executeCallback('exportDocx');
  }, []);

  // Handle export Image
  const handleExportImage = useCallback(() => {
    console.log('handleExportImage called');
    executeCallback('exportImage');
  }, []);

  // Handle import
  const handleImport = useCallback(() => {
    executeCallback('import');
  }, []);

  // Handle global search
  const handleGlobalSearch = useCallback(() => {
    executeCallback('globalSearch');
  }, []);

  // Handle find in current document
  const handleFind = useCallback(() => {
    useFindReplaceStore.getState().open(false);
  }, []);

  // Handle find and replace in current document
  const handleFindReplace = useCallback(() => {
    useFindReplaceStore.getState().open(true);
  }, []);

  // Handle undo (for menu click only, keyboard is handled by InkStone)
  const handleUndo = useCallback(() => {
    const state = useTabStore.getState();
    const currentTab = state.tabs.find((t) => t.id === state.activeTabId);
    if (!currentTab) return;

    const store = getStore(currentTab.docId);
    if (store) {
      store.undo();
    }
  }, []);

  // Handle redo (for menu click only, keyboard is handled by InkStone)
  const handleRedo = useCallback(() => {
    const state = useTabStore.getState();
    const currentTab = state.tabs.find((t) => t.id === state.activeTabId);
    if (!currentTab) return;

    const store = getStore(currentTab.docId);
    if (store) {
      store.redo();
    }
  }, []);

  // Menu action handler
  const handleMenuAction = useCallback(
    (action: MenuAction) => {
      console.log('handleMenuAction received:', action, 'focused:', document.hasFocus());

      // Events that should only be handled by the focused window
      const windowSpecificActions: MenuAction[] = [
        'new_tab',
        'open',
        'save',
        'save_as',
        'close_tab',
        'toggle_sidebar',
        'toggle_source_mode',
        'zoom_in',
        'zoom_out',
        'zoom_reset',
        'import',
        'export_html',
        'export_pdf',
        'export_docx',
        'export_image',
        'global_search',
        'find',
        'find_replace',
        'undo',
        'redo',
      ];

      // Skip window-specific actions if this window is not focused
      if (windowSpecificActions.includes(action) && !document.hasFocus()) {
        console.log('Skipping action - window not focused');
        return;
      }

      switch (action) {
        case 'new_window':
          handleNewWindow();
          break;
        case 'new_tab':
          handleNewTab();
          break;
        case 'open':
          handleOpen();
          break;
        case 'save':
          handleSave();
          break;
        case 'save_as':
          handleSaveAs();
          break;
        case 'close_tab':
          handleCloseTab();
          break;
        case 'toggle_sidebar':
          handleToggleSidebar();
          break;
        case 'toggle_source_mode':
          handleToggleSourceMode();
          break;
        case 'zoom_in':
          handleZoom('in');
          break;
        case 'zoom_out':
          handleZoom('out');
          break;
        case 'zoom_reset':
          handleZoom('reset');
          break;
        case 'about':
          handleAbout();
          break;
        case 'preferences':
          handlePreferences();
          break;
        case 'import':
          handleImport();
          break;
        case 'export_html':
          handleExportHtml();
          break;
        case 'export_pdf':
          handleExportPdf();
          break;
        case 'export_docx':
          handleExportDocx();
          break;
        case 'export_image':
          handleExportImage();
          break;
        case 'global_search':
          handleGlobalSearch();
          break;
        case 'find':
          handleFind();
          break;
        case 'find_replace':
          handleFindReplace();
          break;
        case 'undo':
          handleUndo();
          break;
        case 'redo':
          handleRedo();
          break;
      }
    },
    [
      handleNewWindow,
      handleNewTab,
      handleOpen,
      handleSave,
      handleSaveAs,
      handleCloseTab,
      handleToggleSidebar,
      handleToggleSourceMode,
      handleZoom,
      handleAbout,
      handlePreferences,
      handleImport,
      handleExportHtml,
      handleExportPdf,
      handleExportDocx,
      handleExportImage,
      handleGlobalSearch,
      handleFind,
      handleFindReplace,
      handleUndo,
      handleRedo,
    ],
  );

  // Subscribe to menu events and recent file/folder events
  useEffect(() => {
    if (isTauri()) {
      // subscribeToMenuEvents handles deduplication internally
      // It only sets up one listener and updates currentHandler
      subscribeToMenuEvents(handleMenuAction);

      // Listen for open-recent-file events
      let unlistenRecentFile: (() => void) | null = null;
      let unlistenRecentFolder: (() => void) | null = null;
      let unlistenMainWindowClose: (() => void) | null = null;
      let unlistenAppQuit: (() => void) | null = null;

      const setupListeners = async () => {
        try {
          console.log('[Setup] Starting listener setup...');

          // Reset the handling flag when a new window is set up
          // This ensures the flag doesn't persist from a previous closed window
          isHandlingClose = false;
          console.log('[Setup] Reset isHandlingClose flag to false');

          const { listen } = await import('@tauri-apps/api/event');
          const { getCurrentWindow } = await import('@tauri-apps/api/window');

          unlistenRecentFile = await listen<string>('open-recent-file', (event) => {
            console.log('Opening recent file:', event.payload);
            openFileByPath(event.payload);
          });

          unlistenRecentFolder = await listen<string>('open-recent-folder', (event) => {
            console.log('Opening recent folder:', event.payload);
            // TODO: Implement folder opening (set as workspace root)
            addRecentFolder(event.payload);
          });

          // Use Tauri's built-in onCloseRequested API for window close handling
          // Note: All window close is now handled via window-close-requested event from Rust
          const currentWindow = getCurrentWindow();
          console.log('[Setup] Current window label:', currentWindow.label);

          // Listen for window-close-requested (emitted by Rust for THIS specific window)
          // IMPORTANT: Use currentWindow.listen() instead of listen() to ensure
          // we only receive events for THIS window, not all windows
          unlistenMainWindowClose = await currentWindow.listen<{
            label: string;
            timestamp: number;
          }>('window-close-requested', (event) => {
            console.log('[WindowClose] Event received for window:', event.payload.label);
            console.log('[WindowClose] Current window:', currentWindow.label);
            console.log('[WindowClose] isHandlingClose:', isHandlingClose);

            // Double-check this event is for THIS window
            if (event.payload.label !== currentWindow.label) {
              console.log('[WindowClose] Event is for different window, ignoring');
              return;
            }

            // Prevent duplicate handling
            if (isHandlingClose) {
              console.log('[WindowClose] Already handling close, ignoring duplicate event');
              return;
            }
            isHandlingClose = true;

            // Use queueMicrotask + setTimeout to ensure we're out of Tauri's event context
            queueMicrotask(async () => {
              await sleep(50); // Let UI update
              try {
                await handleCloseWithUnsavedCheck('close-window', 'WindowClose');
              } catch (error) {
                console.error('[WindowClose] Error:', error);
                isHandlingClose = false;
              }
            });
          });
          console.log(
            '[Setup] window-close-requested listener registered for:',
            currentWindow.label,
          );

          // Listen for app quit request (Cmd+Q) - use global listen
          unlistenAppQuit = await listen('app-quit-requested', async () => {
            console.log('[AppQuit] Event received, isHandlingClose:', isHandlingClose);

            // Prevent duplicate handling
            if (isHandlingClose) {
              console.log('[AppQuit] Already handling close, ignoring duplicate event');
              return;
            }
            isHandlingClose = true;

            try {
              await handleCloseWithUnsavedCheck('quit-app', 'AppQuit');
            } catch (error) {
              console.error('[AppQuit] Error:', error);
              isHandlingClose = false;
            }
          });
          console.log('[Setup] app-quit-requested listener registered');
          console.log('[Setup] All listeners set up successfully!');
        } catch (error) {
          console.error('[Setup] Failed to setup listeners:', error);
        }
      };

      setupListeners();

      return () => {
        unsubscribeFromMenuEvents();
        if (unlistenRecentFile) unlistenRecentFile();
        if (unlistenRecentFolder) unlistenRecentFolder();
        if (unlistenMainWindowClose) unlistenMainWindowClose();
        if (unlistenAppQuit) unlistenAppQuit();
      };
    } else {
      // Setup browser keyboard shortcuts
      return setupBrowserShortcuts(handleMenuAction);
    }
  }, [handleMenuAction, openFileByPath]);

  return {
    handleNewWindow,
    handleNewTab,
    handleOpen,
    handleSave,
    handleSaveAs,
    handleCloseTab,
    handleToggleSidebar,
    handleZoom,
    handleAbout,
  };
}
