import { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { TitleBar } from './components/TitleBar'
import { AppLayout } from './components/Layout'
import { TabBar, TabPanel } from './components/Tabs'
import { Toast } from './components/Toast'
import { useTabStore } from './stores/tabs'
import { getOrCreateDoc, markdownToDoc, setDocLoading } from './stores/editor'
import { useTheme } from './hooks/useTheme'
import { useAppCommands, setPreferencesCallback, setImportCallback, setExportHtmlCallback, setExportPdfCallback, setExportDocxCallback, setExportImageCallback, setGlobalSearchCallback } from './hooks/useAppCommands'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useFileTreeSelectionSync } from './hooks/useFileTreeSelectionSync'
import { useAutoSave } from './hooks/useAutoSave'
import { useFileWatcher } from './hooks/useFileWatcher'
import { useWindowTitle } from './hooks/useWindowTitle'
import { exportToHtml, exportToPdf, exportToDocx, exportToImage, saveFileAs, readFile, setupWindowMenu, addRecentFile, isTauri, isMacOS, isWindows, isLinux, importFile } from './services'
import { checkForAppUpdates } from './services/updater'
import { usePreferencesStore } from './stores/preferences'
import type { SettingTabKey } from './components/Settings/types'
import { usePlatformStore } from './stores/platform'

// Lazy load large components to reduce initial bundle size
// These components are only loaded when actually needed
const SettingsModal = lazy(() => import('./components/Settings').then(m => ({ default: m.SettingsModal })))
const GlobalSearchModal = lazy(() => import('./components/GlobalSearch').then(m => ({ default: m.GlobalSearchModal })))
const FileChangeDialog = lazy(() => import('./components/FileChangeDialog').then(m => ({ default: m.FileChangeDialog })))

function App() {
  const { tabs, activeTabId, addTab } = useTabStore()
  const { autoCheckUpdates } = usePreferencesStore()
  const { fetchInfo, isMacOS, isWindows, isLinux, initialized: platformInitialized } = usePlatformStore()
  const initializedRef = useRef(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settingsInitialTab, setSettingsInitialTab] = useState<SettingTabKey>('general')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Get active tab
  const activeTab = tabs.find((t) => t.id === activeTabId)

  // Initialize theme on app load
  useTheme()

  // Initialize platform info
  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  // Set platform class on body for CSS targeting
  useEffect(() => {
    if (!platformInitialized) return

    if (isMacOS) {
      document.body.classList.add('platform-macos')
    } else if (isWindows) {
      document.body.classList.add('platform-windows')
    } else if (isLinux) {
      document.body.classList.add('platform-linux')
    } else {
      document.body.classList.add('platform-other')
    }
  }, [platformInitialized, isMacOS, isWindows, isLinux])

  // Check for updates on startup
  useEffect(() => {
    if (autoCheckUpdates && isTauri()) {
      // Run update check in background, don't await it
      checkForAppUpdates(true).catch(err => {
        console.error('Auto-update check failed:', err)
      })
    }
  }, [autoCheckUpdates])

  // Setup macOS Window menu for automatic window list
  useEffect(() => {
    setupWindowMenu()
  }, [])

  // Initialize app commands (menu events, keyboard shortcuts)
  useAppCommands()
  useKeyboardShortcuts()
  useFileTreeSelectionSync()

  // Enable auto-save for modified files
  useAutoSave()

  // Watch open files for external changes
  useFileWatcher()

  // Sync window title with active tab
  useWindowTitle()

  // Set up preferences callback
  const openSettings = useCallback((tab?: SettingTabKey) => {
    if (tab) {
      setSettingsInitialTab(tab)
    }
    setIsSettingsOpen(true)
  }, [])

  // Set up export HTML callback
  const handleExportHtml = useCallback(async () => {
    if (!activeTab) return

    try {
      const { store } = getOrCreateDoc(activeTab.docId)

      // Get save path
      const defaultName = activeTab.title.replace(/\.md$/, '') + '.html'
      const path = await saveFileAs('', defaultName, 'html')

      if (path) {
        await exportToHtml(path, store)
        console.log('Exported to HTML:', path)
      }
    } catch (error) {
      console.error('Failed to export HTML:', error)
    }
  }, [activeTab])

  // Set up export PDF callback
  const handleExportPdf = useCallback(async () => {
    console.log('App.handleExportPdf called, activeTab:', activeTab?.id)
    if (!activeTab) {
      console.warn('No active tab for PDF export')
      return
    }

    try {
      console.log('Exporting PDF for doc:', activeTab.docId)
      await exportToPdf()
      console.log('PDF export completed')
    } catch (error) {
      console.error('Failed to export PDF:', error)
    }
  }, [activeTab])

  // Set up export DOCX callback
  const handleExportDocx = useCallback(async () => {
    console.log('App.handleExportDocx called, activeTab:', activeTab?.id)
    if (!activeTab) {
      console.warn('No active tab for DOCX export')
      return
    }

    try {
      const { store } = getOrCreateDoc(activeTab.docId)

      // Get save path
      const defaultName = activeTab.title.replace(/\.md$/, '') + '.docx'
      const path = await saveFileAs('', defaultName, 'docx')

      if (path) {
        await exportToDocx(path, store)
        console.log('Exported to DOCX:', path)
      }
    } catch (error) {
      console.error('Failed to export DOCX:', error)
    }
  }, [activeTab])

  // Set up export Image callback
  const handleExportImage = useCallback(async () => {
    console.log('App.handleExportImage called, activeTab:', activeTab?.id)
    if (!activeTab) {
      console.warn('No active tab for Image export')
      return
    }

    try {
      // Get save path
      const defaultName = activeTab.title.replace(/\.md$/, '') + '.png'
      const path = await saveFileAs('', defaultName, 'png')

      if (path) {
        await exportToImage(path)
        console.log('Exported to Image:', path)
      }
    } catch (error) {
      console.error('Failed to export Image:', error)
    }
  }, [activeTab])

  // Set up import callback (supports multiple formats)
  const handleImport = useCallback(async () => {
    await importFile(addTab)
  }, [addTab])

  // Set up global search callback
  const openGlobalSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  // Handle opening file from search results or "Open With"
  const handleOpenFileFromSearch = useCallback(async (filePath: string) => {
    try {
      // Check if file is already open
      const existingTab = tabs.find(t => t.filePath === filePath)
      if (existingTab) {
        // Just activate the existing tab
        useTabStore.getState().setActiveTab(existingTab.id)
        return
      }

      // Read the file content
      const content = await readFile(filePath)
      const fileName = filePath.split(/[/\\]/).pop() || 'Untitled'

      // Add new tab with file info
      const docId = addTab(fileName, filePath)

      // Mark document as loading immediately to keep loading UI visible
      setDocLoading(docId, true)

      // Load content into the editor
      setTimeout(async () => {
        try {
          await markdownToDoc(docId, content, filePath)
          console.log('Loaded file content into doc:', filePath)
          // Add to recent files
          await addRecentFile(filePath)
        } catch (error) {
          console.error('Failed to load file content:', error)
        }
      }, 100)
    } catch (error) {
      console.error('Failed to open file from search:', error)
    }
  }, [tabs, addTab])

  // Handle "Open With" file associations (macOS/Windows/Linux)
  useEffect(() => {
    if (!isTauri()) return

    // Function to open files received from "Open With"
    const openFiles = async (paths: string[]) => {
      console.log('[OpenWith] Opening files:', paths)
      for (const path of paths) {
        // Only open markdown files
        if (/\.(md|markdown|mdown|mkd|mdx)$/i.test(path)) {
          await handleOpenFileFromSearch(path)
        } else {
          console.log('[OpenWith] Skipping non-markdown file:', path)
        }
      }
    }

    // Listen for files opened at runtime (when app is already running)
    const unlistenPromise = listen<string[]>('files-opened', (event) => {
      console.log('[OpenWith] Received files-opened event:', event.payload)
      openFiles(event.payload)
    })

    // Check for files that were opened before frontend was ready
    invoke<string[]>('get_pending_files').then((paths) => {
      if (paths.length > 0) {
        console.log('[OpenWith] Found pending files:', paths)
        openFiles(paths)
      }
    }).catch((error) => {
      console.error('[OpenWith] Failed to get pending files:', error)
    })

    return () => {
      unlistenPromise.then(unlisten => unlisten())
    }
  }, [handleOpenFileFromSearch])

  useEffect(() => {
    setPreferencesCallback(openSettings)
    setImportCallback(handleImport)
    setExportHtmlCallback(handleExportHtml)
    setExportPdfCallback(handleExportPdf)
    setExportDocxCallback(handleExportDocx)
    setExportImageCallback(handleExportImage)
    setGlobalSearchCallback(openGlobalSearch)
  }, [openSettings, handleImport, handleExportHtml, handleExportPdf, handleExportDocx, handleExportImage, openGlobalSearch])

  // Create initial tab on first load or restore tabs content
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true

      const restoreTab = async (tab: typeof tabs[0]) => {
        try {
          if (tab.filePath) {
            console.log(`[Perf] Reloading content for tab: ${tab.id} (${tab.filePath})`)
            setDocLoading(tab.docId, true)
            const content = await readFile(tab.filePath)
            getOrCreateDoc(tab.docId)
            await markdownToDoc(tab.docId, content, tab.filePath)
          }
        } catch (error) {
          console.error(`Failed to restore tab ${tab.id}:`, error)
          setDocLoading(tab.docId, false)
        }
      }

      const restoreTabs = async () => {
        const tabsToRestore = tabs.filter(t => t.filePath)

        if (tabsToRestore.length > 0) {
          console.log(`[Perf] Restoring content for ${tabsToRestore.length} tabs...`)
          const startTime = performance.now()

          // Find active tab and restore it first for better perceived performance
          const activeTabToRestore = tabsToRestore.find(t => t.id === activeTabId)
          const otherTabs = tabsToRestore.filter(t => t.id !== activeTabId)

          // Restore active tab first (priority)
          if (activeTabToRestore) {
            await restoreTab(activeTabToRestore)
          }

          // Restore other tabs sequentially to avoid main thread congestion
          for (const tab of otherTabs) {
            await restoreTab(tab)
          }

          const duration = performance.now() - startTime
          console.log(`[Perf] Tab restoration completed in ${duration.toFixed(2)}ms`)
        } else if (tabs.length === 0) {
          console.log('No tabs to restore, adding initial tab...')
          addTab('Untitled')
        }
      }

      // Defer tab restoration to allow window to render immediately
      setTimeout(() => {
        restoreTabs()
      }, 0)
    }
  }, [tabs, addTab, activeTabId])

  return (
    <div className="app-root">
      {/* Windows custom title bar with menu */}
      <TitleBar />
      <AppLayout>
        <div className="workspace-container">
          <TabBar />
          <TabPanel />
        </div>
        {/* Lazy-loaded components wrapped in Suspense for code splitting */}
        {/* These components are only loaded when their modals are opened */}
        <Suspense fallback={null}>
          {isSettingsOpen && (
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              initialTab={settingsInitialTab}
            />
          )}
        </Suspense>
        <Suspense fallback={null}>
          {isSearchOpen && (
            <GlobalSearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              onOpenFile={handleOpenFileFromSearch}
            />
          )}
        </Suspense>
        <Suspense fallback={null}>
          <FileChangeDialog />
        </Suspense>
        <Toast />
      </AppLayout>
    </div>
  )
}

export default App
