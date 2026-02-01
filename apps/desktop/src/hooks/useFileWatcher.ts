import { useCallback, useEffect, useRef } from 'react';

import { isTauri } from '../services';
import {
  cleanupFileWatcher,
  initFileWatcher,
  onFileChange,
  unwatchFile,
  watchFile,
} from '../services/fileWatcher';
import { markdownToDoc } from '../stores/editor';
import { useTabStore } from '../stores/tabs';

interface FileChangeDialogOptions {
  filePath: string;
  fileName: string;
  isModified: boolean;
  onReload: () => void;
  onKeepLocal: () => void;
}

// Dialog callback for when user needs to choose
let showFileChangeDialog: ((options: FileChangeDialogOptions) => void) | null = null;

export function setFileChangeDialogCallback(
  callback: (options: FileChangeDialogOptions) => void,
): void {
  showFileChangeDialog = callback;
}

/**
 * Hook to manage file watching for all open tabs
 */
export function useFileWatcher() {
  const { tabs, getTabByFilePath, updateTab } = useTabStore();
  const watchedFilesRef = useRef<Set<string>>(new Set());
  const isInitializedRef = useRef(false);

  // Reload file content
  const reloadFile = useCallback(
    async (filePath: string) => {
      const tab = getTabByFilePath(filePath);
      if (!tab) return;

      try {
        // Read the file content
        const { invoke } = await import('@tauri-apps/api/core');
        const result = await invoke<{ path: string; content: string }>('read_file', {
          path: filePath,
        });

        // Update the document
        await markdownToDoc(tab.docId, result.content, filePath);

        // Mark as not modified since we just loaded from disk
        updateTab(tab.id, { isModified: false });

        console.log('Reloaded file:', filePath);
      } catch (error) {
        console.error('Failed to reload file:', error);
      }
    },
    [getTabByFilePath, updateTab],
  );

  // Handle file change event
  const handleFileChange = useCallback(
    (filePath: string) => {
      const tab = getTabByFilePath(filePath);
      if (!tab) {
        console.log('No tab found for changed file:', filePath);
        return;
      }

      const fileName = filePath.split(/[/\\]/).pop() || filePath;

      if (tab.isModified) {
        // File has unsaved changes - ask user what to do
        if (showFileChangeDialog) {
          showFileChangeDialog({
            filePath,
            fileName,
            isModified: true,
            onReload: () => reloadFile(filePath),
            onKeepLocal: () => {
              console.log('Keeping local changes for:', filePath);
            },
          });
        } else {
          // Fallback: use native confirm dialog
          const shouldReload = window.confirm(
            `The file "${fileName}" has been modified externally.\n\n` +
              `You have unsaved changes. Do you want to reload and lose your changes?`,
          );
          if (shouldReload) {
            reloadFile(filePath);
          }
        }
      } else {
        // No unsaved changes - auto reload
        console.log('Auto-reloading file (no local changes):', filePath);
        reloadFile(filePath);
      }
    },
    [getTabByFilePath, reloadFile],
  );

  // Initialize file watcher
  useEffect(() => {
    if (!isTauri() || isInitializedRef.current) return;

    const init = async () => {
      await initFileWatcher();
      isInitializedRef.current = true;
    };

    init();

    return () => {
      cleanupFileWatcher();
      isInitializedRef.current = false;
    };
  }, []);

  // Subscribe to file change events
  useEffect(() => {
    if (!isTauri()) return;

    const unsubscribe = onFileChange(handleFileChange);
    return unsubscribe;
  }, [handleFileChange]);

  // Watch/unwatch files based on open tabs
  useEffect(() => {
    if (!isTauri() || !isInitializedRef.current) return;

    const currentFilePaths = new Set(tabs.filter((t) => t.filePath).map((t) => t.filePath!));

    // Start watching new files
    currentFilePaths.forEach((filePath) => {
      if (!watchedFilesRef.current.has(filePath)) {
        watchFile(filePath);
        watchedFilesRef.current.add(filePath);
      }
    });

    // Stop watching closed files
    watchedFilesRef.current.forEach((filePath) => {
      if (!currentFilePaths.has(filePath)) {
        unwatchFile(filePath);
        watchedFilesRef.current.delete(filePath);
      }
    });
  }, [tabs]);

  return {
    reloadFile,
  };
}
