import { ReactNode, useState, useCallback, useEffect, useRef } from 'react'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { setToggleSidebarCallback, setToggleSourceModeCallback } from '../../hooks/useAppCommands'
import { useSidebarStore } from '../../stores/sidebar'
import { useEditorModeStore } from '../../stores/editorMode'
import { useTabStore } from '../../stores/tabs'
import { isTauri } from '../../services'

interface AppLayoutProps {
  children?: ReactNode
}

const MIN_SIDEBAR_WIDTH = 180
const MAX_SIDEBAR_WIDTH = 500
const DEFAULT_SIDEBAR_WIDTH = 240

// Update menu check state - unified function for all sidebar toggle sources
async function syncMenuSidebarState(visible: boolean) {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core')
      await invoke('set_sidebar_visible', { visible })
    } catch {
      // Silently ignore sync errors
    }
  }
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('sidebar-width')
    if (saved) {
      const width = parseInt(saved, 10)
      if (!isNaN(width) && width >= MIN_SIDEBAR_WIDTH && width <= MAX_SIDEBAR_WIDTH) {
        return width
      }
    }
    return DEFAULT_SIDEBAR_WIDTH
  })

  // Use sidebar store for visibility
  const { isVisible: sidebarVisible, toggleVisible: toggleSidebar } = useSidebarStore()
  const toggleSourceMode = useEditorModeStore((state) => state.toggleMode)
  const activeTabId = useTabStore((state) => state.activeTabId)
  const tabs = useTabStore((state) => state.tabs)

  const [isResizing, setIsResizing] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  // Sync menu state whenever visibility changes (from any source: menu, button, etc.)
  // This useEffect runs on mount and whenever sidebarVisible changes
  useEffect(() => {
    syncMenuSidebarState(sidebarVisible)
  }, [sidebarVisible])

  // Register toggle sidebar callback for menu
  useEffect(() => {
    setToggleSidebarCallback(toggleSidebar)
    return () => {
      setToggleSidebarCallback(() => {})
    }
  }, [toggleSidebar])

  // Register toggle source mode callback for menu
  useEffect(() => {
    const activeTab = tabs.find(t => t.id === activeTabId)
    const handleToggleSourceMode = () => {
      console.log('[ToggleSourceMode] Callback triggered, activeTab:', activeTab?.docId)
      if (activeTab?.docId) {
        const newMode = toggleSourceMode(activeTab.docId)
        console.log('[ToggleSourceMode] Mode toggled to:', newMode)
      } else {
        console.warn('[ToggleSourceMode] No active tab docId')
      }
    }
    setToggleSourceModeCallback(handleToggleSourceMode)
    return () => {
      setToggleSourceModeCallback(() => {})
    }
  }, [toggleSourceMode, activeTabId, tabs])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = sidebarWidth
  }, [sidebarWidth])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return

    const delta = e.clientX - startXRef.current
    let newWidth = startWidthRef.current + delta

    // Clamp the width
    newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, newWidth))

    setSidebarWidth(newWidth)
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false)
      // Save to localStorage
      localStorage.setItem('sidebar-width', sidebarWidth.toString())
    }
  }, [isResizing, sidebarWidth])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      // Add a class to body to prevent text selection during resize
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  return (
    <div className={`app-layout ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
      {sidebarVisible && (
        <>
          <ActivityBar />
          <div className="sidebar-container" style={{ width: sidebarWidth }}>
            <Sidebar />
          </div>
          <div
            className={`resize-handle ${isResizing ? 'resizing' : ''}`}
            onMouseDown={handleMouseDown}
          />
        </>
      )}
      <MainContent>{children}</MainContent>
    </div>
  )
}
