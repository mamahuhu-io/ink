import { useEffect, useRef, useCallback } from 'react'
import { useTabStore } from '../stores/tabs'
import { usePreferencesStore } from '../stores/preferences'
import { useEditorModeStore } from '../stores/editorMode'
import { docToMarkdown, markdownToDoc } from '../stores/editor'
import { writeFile } from '../services'

/**
 * Hook to automatically save modified files
 */
export function useAutoSave() {
  const { tabs, setModified } = useTabStore()
  const { autoSaveEnabled, autoSaveDelay } = usePreferencesStore()
  const saveTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const isSavingRef = useRef<Set<string>>(new Set())

  const saveTab = useCallback(
    async (tabId: string, docId: string, filePath: string) => {
      // Prevent concurrent saves for the same tab
      if (isSavingRef.current.has(tabId)) {
        return
      }

      isSavingRef.current.add(tabId)

      try {
        // Check if in source mode
        const editorModeState = useEditorModeStore.getState()
        const isSourceMode = editorModeState.getMode(docId) === 'source'
        const sourceContent = editorModeState.getSourceContent(docId)

        let content: string
        if (isSourceMode && sourceContent) {
          // In source mode - use the source editor content directly
          content = sourceContent.current
          console.log('[AutoSave] Saving source mode content, length:', content.length)
        } else {
          // In preview mode - export from store
          content = await docToMarkdown(docId, filePath)
        }
        
        await writeFile(filePath, content)
        
        // If in source mode, sync content to store and mark as saved
        if (isSourceMode && sourceContent) {
          await markdownToDoc(docId, sourceContent.current)
          editorModeState.markSourceContentSaved(docId)
        }
        setModified(tabId, false)
        console.log('Auto-saved:', filePath)
      } catch (error) {
        console.error('Auto-save failed:', error)
      } finally {
        isSavingRef.current.delete(tabId)
      }
    },
    [setModified]
  )

  useEffect(() => {
    // Skip if auto-save is disabled
    if (!autoSaveEnabled) {
      // Clear any existing timers
      for (const timer of saveTimersRef.current.values()) {
        clearTimeout(timer)
      }
      saveTimersRef.current.clear()
      return
    }

    // Find tabs that need to be saved
    const modifiedTabsWithPath = tabs.filter(
      (t) => t.isModified && t.filePath
    )

    // Schedule auto-save for each modified tab
    for (const tab of modifiedTabsWithPath) {
      // Skip if already scheduled
      if (saveTimersRef.current.has(tab.id)) {
        continue
      }

      // Schedule save (convert seconds to milliseconds)
      const timer = setTimeout(() => {
        saveTimersRef.current.delete(tab.id)
        if (tab.filePath) {
          saveTab(tab.id, tab.docId, tab.filePath)
        }
      }, autoSaveDelay * 1000)

      saveTimersRef.current.set(tab.id, timer)
    }

    // Clear timers for tabs that are no longer modified
    for (const [tabId, timer] of saveTimersRef.current.entries()) {
      const tab = tabs.find((t) => t.id === tabId)
      if (!tab || !tab.isModified || !tab.filePath) {
        clearTimeout(timer)
        saveTimersRef.current.delete(tabId)
      }
    }

    // Cleanup on unmount
    return () => {
      for (const timer of saveTimersRef.current.values()) {
        clearTimeout(timer)
      }
    }
  }, [tabs, saveTab, autoSaveEnabled, autoSaveDelay])
}
