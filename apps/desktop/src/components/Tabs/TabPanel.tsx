import { useCallback, useMemo, useRef } from 'react'
import { useTabStore } from '../../stores/tabs'
import { InkStoneEditor } from '../Editor'
import { FindReplaceBar, SearchHighlights } from '../FindReplace'

// Maximum number of editor instances to keep in memory
const MAX_CACHED_EDITORS = 10

export function TabPanel() {
  const { tabs, activeTabId, setModified } = useTabStore()
  const activeTab = tabs.find((t) => t.id === activeTabId)

  // Track which tabs have been activated (visited) at least once
  // This allows lazy initialization of editors - only render when first visited
  const visitedTabsRef = useRef<Set<string>>(new Set())

  // Get the list of tabs to render (limit to MAX_CACHED_EDITORS)
  // Only include tabs that have been visited at least once
  const tabsToRender = useMemo(() => {
    // Mark current active tab as visited (do this in useMemo to ensure it's
    // available for the first render, not after like useEffect would be)
    if (activeTabId) {
      visitedTabsRef.current.add(activeTabId)
    }

    // Filter to only visited tabs
    const visitedTabs = tabs.filter(t => visitedTabsRef.current.has(t.id))

    if (visitedTabs.length <= MAX_CACHED_EDITORS) {
      return visitedTabs
    }

    // If we have more visited tabs than the limit, prioritize:
    // 1. The active tab (always rendered)
    // 2. The most recent tabs (by their position in the tabs array, which reflects order)
    const activeTabIndex = visitedTabs.findIndex(t => t.id === activeTabId)

    // Keep the active tab and the tabs around it
    if (activeTabIndex >= 0) {
      // Simple strategy: keep first MAX_CACHED_EDITORS tabs, but ensure active is included
      const toKeep = new Set<string>()

      // Always include active tab
      toKeep.add(visitedTabs[activeTabIndex].id)

      // Add tabs from the beginning until we reach the limit
      for (let i = 0; i < visitedTabs.length && toKeep.size < MAX_CACHED_EDITORS; i++) {
        toKeep.add(visitedTabs[i].id)
      }

      return visitedTabs.filter(t => toKeep.has(t.id))
    }

    return visitedTabs.slice(0, MAX_CACHED_EDITORS)
  }, [tabs, activeTabId])

  // Create content change handlers for each tab
  const handleContentChange = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId)
    if (tab && !tab.isModified) {
      setModified(tabId, true)
    }
  }, [tabs, setModified])

  console.log('TabPanel render - tabs:', tabs.length, 'activeTabId:', activeTabId, 'tabsToRender:', tabsToRender.length)

  if (!activeTab) {
    return (
      <div className="tab-panel-empty">
        <div className="empty-state">
          <h2>No document open</h2>
          <p>Click the + button to create a new document</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tab-panel">
      {/* FindReplaceBar and SearchHighlights only for active tab */}
      <FindReplaceBar docId={activeTab.docId} />
      <SearchHighlights docId={activeTab.docId} />

      {/* Render all cached editors, control visibility with CSS */}
      <div className="editors-container" style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {tabsToRender.map((tab) => (
          <div
            key={tab.docId}
            className="editor-wrapper"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              visibility: tab.id === activeTabId ? 'visible' : 'hidden',
              // Use visibility instead of display to keep the editor in the DOM
              // This preserves scroll position and selection state
            }}
          >
            <InkStoneEditor
              docId={tab.docId}
              isActive={tab.id === activeTabId}
              onContentChange={() => handleContentChange(tab.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
