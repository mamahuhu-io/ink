import { useEffect, useRef, useState, useCallback } from 'react'
import { getOrCreateDoc, docToMarkdown, markdownToDoc, isDocLoading, onDocLoadingChange } from '../../stores/editor'
import { getViewManager } from '../../editor/effects'
import { useEditorHostStore } from '../../stores/editorHost'
import { usePreferencesStore } from '../../stores/preferences'
import { useEditorModeStore } from '../../stores/editorMode'
import { useTabStore } from '../../stores/tabs'
import { isSpellCheckSupported } from '../../services/platform'
import { CodeBlockConfigExtension } from '@ink/stone-core/blocks/code'
import type { InkEditorContainer } from '../../editor/editor-container'

interface InkEditorProps {
  docId: string
  isActive?: boolean
  onContentChange?: () => void
}

export function InkStoneEditor({
  docId,
  isActive = true,
  onContentChange,
}: InkEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<InkEditorContainer | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const mountedRef = useRef(false)
  const onContentChangeRef = useRef(onContentChange)
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null)
  const initialIsActiveRef = useRef(isActive) // Capture initial isActive for autofocus
  const editorReadyRef = useRef(false) // Track if editor is fully initialized

  const { setHost, removeHost, setActiveDocId } = useEditorHostStore()
  const { fontSize, lineHeight, spellCheck, codeBlockShowLineNumbers, codeBlockEnableWordWrap } = usePreferencesStore()
  const editorMode = useEditorModeStore((state) => state.getMode(docId))
  const toggleMode = useEditorModeStore((state) => state.toggleMode)
  const setSourceContent = useEditorModeStore((state) => state.setSourceContent)
  const getSourceContent = useEditorModeStore((state) => state.getSourceContent)
  const hasSourceContentChanged = useEditorModeStore((state) => state.hasSourceContentChanged)
  const clearSourceContent = useEditorModeStore((state) => state.clearSourceContent)
  const prevModeRef = useRef(editorMode)

  // Get current tab's filePath for proper image path handling
  const tabs = useTabStore((state) => state.tabs)
  const currentTab = tabs.find((tab) => tab.docId === docId)
  const filePath = currentTab?.filePath

  // Spell check is only supported on macOS and Windows
  const enableSpellCheck = spellCheck && isSpellCheckSupported()

  // Update active docId when this editor becomes active
  useEffect(() => {
    if (isActive && editorRef.current?.host) {
      setActiveDocId(docId)
    }
  }, [isActive, docId, setActiveDocId])

  // Sync loading state with global document loading state
  // This ensures Loading UI stays visible until document content is fully loaded
  useEffect(() => {
    // Check initial loading state
    if (isDocLoading(docId)) {
      setIsLoading(true)
    }

    // Subscribe to loading state changes
    const unsubscribe = onDocLoadingChange((changedDocId, loading) => {
      if (changedDocId === docId) {
        if (loading) {
          setIsLoading(true)
        } else {
          // Document finished loading, hide loading UI
          setIsLoading(false)
        }
      }
    })

    return unsubscribe
  }, [docId])

  // Apply code block settings
  useEffect(() => {
    const editor = editorRef.current
    if (!editor || !editor.host) return

    const config = editor.host.std.getOptional(CodeBlockConfigExtension.identifier)
    if (config) {
      config.showLineNumbers = codeBlockShowLineNumbers
      config.enableWordWrap = codeBlockEnableWordWrap

      // Force update code blocks
      if (containerRef.current) {
        containerRef.current.querySelectorAll('ink-code').forEach((el) => {
          (el as any).requestUpdate()
        })
      }
    }
  }, [codeBlockShowLineNumbers, codeBlockEnableWordWrap])

  // Apply spellcheck to all contenteditable elements in the editor
  useEffect(() => {
    if (!containerRef.current) return

    const applySpellCheck = () => {
      const editables = containerRef.current?.querySelectorAll('[contenteditable="true"]')
      editables?.forEach((el) => {
        (el as HTMLElement).spellcheck = enableSpellCheck
      })
    }

    // Apply immediately
    applySpellCheck()

    // Also observe for new contenteditable elements (editor may add them dynamically)
    const observer = new MutationObserver(() => {
      applySpellCheck()
    })

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['contenteditable'],
    })

    return () => {
      observer.disconnect()
    }
  }, [enableSpellCheck])

  // Keep callback ref updated
  useEffect(() => {
    onContentChangeRef.current = onContentChange
  }, [onContentChange])

  // Handle editor mode changes
  useEffect(() => {
    const editor = editorRef.current
    console.log('[InkStoneEditor] Mode effect triggered:', { editorMode, mounted: mountedRef.current, hasEditor: !!editor, docId })
    if (!editor || !mountedRef.current) return

    const prevMode = prevModeRef.current
    prevModeRef.current = editorMode

    // Skip if mode hasn't changed
    if (prevMode === editorMode) {
      console.log('[InkStoneEditor] Mode unchanged, skipping')
      return
    }

    console.log('[InkStoneEditor] Mode changed from', prevMode, 'to', editorMode)

    const handleModeChange = async () => {
      if (editorMode === 'source') {
        // Switching to source mode - export markdown
        try {
          console.log('[InkStoneEditor] Exporting markdown for source mode...')
          const markdown = await docToMarkdown(docId, filePath)
          console.log('[InkStoneEditor] Markdown exported, length:', markdown.length)
          // Store in global store with original flag
          setSourceContent(docId, markdown, true)
          editor.sourceContent = markdown
          editor.onSourceChange = (content: string) => {
            // Update current content in store
            setSourceContent(docId, content, false)
            onContentChangeRef.current?.()
          }
          // Set the toggle mode callback so Cmd+/ in source editor works
          editor.onToggleMode = () => {
            console.log('[InkStoneEditor] onToggleMode callback triggered from source editor')
            toggleMode(docId)
          }
          editor.switchEditor('source')
          console.log('[InkStoneEditor] Switched to source editor')
        } catch (err) {
          console.error('Failed to export markdown:', err)
        }
      } else {
        // Switching back to preview mode - import markdown only if content changed
        try {
          const sourceContent = getSourceContent(docId)
          const contentChanged = hasSourceContentChanged(docId)
          console.log('[InkStoneEditor] Switching back to preview mode, content changed:', contentChanged)

          if (sourceContent?.current && contentChanged) {
            // Content was modified in source mode - import the changes
            console.log('[InkStoneEditor] Importing modified markdown, length:', sourceContent.current.length)
            await markdownToDoc(docId, sourceContent.current, filePath)
          } else {
            console.log('[InkStoneEditor] No changes in source mode, skipping markdown import')
          }
          // Clear source content after switching back
          clearSourceContent(docId)
          editor.switchEditor('page')
          console.log('[InkStoneEditor] Switched to page editor')

          // Wait for DOM update and view initialization to complete
          await new Promise(resolve => requestAnimationFrame(resolve))
          await editor.host?.updateComplete
          console.log('[InkStoneEditor] View update completed after mode switch')
        } catch (err) {
          console.error('Failed to import markdown:', err)
        }
      }
    }

    handleModeChange()
  }, [editorMode, docId, filePath, toggleMode, setSourceContent, getSourceContent, hasSourceContentChanged, clearSourceContent])

  const setupEditor = useCallback(async () => {
    if (!containerRef.current || mountedRef.current) return

    // Reset editor ready state
    editorReadyRef.current = false

    try {
      // Wait for custom element to be defined
      await customElements.whenDefined('ink-editor-container')

      // Create a separate div for the editor that React won't touch
      const editorDiv = document.createElement('div')
      editorDiv.style.width = '100%'
      editorDiv.style.height = '100%'
      editorContainerRef.current = editorDiv

      console.log('[InkStoneEditor] Creating doc:', docId)
      const { store } = getOrCreateDoc(docId)
      console.log('[InkStoneEditor] Store created:', store)

      // Create editor element
      console.log('[InkStoneEditor] Creating editor...')
      const editor = document.createElement('ink-editor-container') as InkEditorContainer
      editor.doc = store
      editor.autofocus = initialIsActiveRef.current // Use initial isActive for autofocus
      editor.mode = 'page'

      // Set up specs from view manager
      const viewManager = getViewManager()
      editor.pageSpecs = viewManager.get('page')
      editor.edgelessSpecs = viewManager.get('edgeless')

      console.log('[InkStoneEditor] Editor created:', editor)

      // Subscribe to document changes
      // Skip changes during: 1) document loading, 2) editor initialization
      subscriptionRef.current = store.slots.blockUpdated.subscribe(() => {
        // Skip changes while document is loading content
        if (isDocLoading(docId)) {
          return
        }
        // Skip changes while editor is still initializing
        if (!editorReadyRef.current) {
          return
        }
        console.log('[InkStoneEditor] Document changed:', docId)
        onContentChangeRef.current?.()
      })

      // Store editor reference
      editorRef.current = editor

      // Append editor to our isolated div
      editorDiv.appendChild(editor)

      // Append the isolated div to container
      containerRef.current.appendChild(editorDiv)

      mountedRef.current = true
      console.log('[InkStoneEditor] Editor mounted to DOM for:', docId)

      // Register EditorHost after editor is rendered
      // Use polling to ensure the editor host is fully initialized
      const registerHost = () => {
        if (editor.host) {
          setHost(docId, editor.host)
          // Set active docId if this editor was initially active
          if (initialIsActiveRef.current) {
            setActiveDocId(docId)
          }
          console.log('[InkStoneEditor] EditorHost registered for:', docId)

          // Synchronize Code Block preferences immediately on init
          const { codeBlockShowLineNumbers, codeBlockEnableWordWrap } = usePreferencesStore.getState()
          const config = editor.host.std.getOptional(CodeBlockConfigExtension.identifier)
          if (config) {
            config.showLineNumbers = codeBlockShowLineNumbers
            config.enableWordWrap = codeBlockEnableWordWrap

            // Force update existing blocks
            editor.querySelectorAll('ink-code').forEach((el) => {
              (el as any).requestUpdate()
            })
          }

          // Mark editor as ready after a short delay to allow initial rendering to complete
          // This prevents false "modified" state from editor initialization
          setTimeout(() => {
            editorReadyRef.current = true
            console.log('[InkStoneEditor] Editor ready for:', docId)
          }, 100)

          return true
        }
        return false
      }

      // Try immediately
      if (!registerHost()) {
        // If not ready, poll every 50ms for up to 1 second
        let attempts = 0
        const maxAttempts = 20
        const pollInterval = setInterval(() => {
          attempts++
          if (registerHost() || attempts >= maxAttempts) {
            clearInterval(pollInterval)
            if (attempts >= maxAttempts) {
              console.warn('[InkStoneEditor] EditorHost not available after polling')
              // Still mark as ready even if host registration failed
              editorReadyRef.current = true
            }
          }
        }, 50)
        ;(editorDiv as any).__pollInterval = pollInterval
      }

      // Only hide loading if document is not currently loading content
      // If document is loading, the onDocLoadingChange callback will hide it when done
      if (!isDocLoading(docId)) {
        setIsLoading(false)
      }
    } catch (err) {
      console.error('[InkStoneEditor] Failed to create editor:', err)
      setError(String(err))
      setIsLoading(false)
    }
  }, [docId, setHost, setActiveDocId]) // Removed isActive from dependencies

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupEditor, 50)

    return () => {
      clearTimeout(timer)
      // Clean up: remove our isolated div and dispose listeners
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
        subscriptionRef.current = null
      }
      if (editorContainerRef.current) {
        const pollInterval = (editorContainerRef.current as any).__pollInterval
        if (pollInterval) {
          clearInterval(pollInterval)
        }
        if (containerRef.current) {
          try {
            containerRef.current.removeChild(editorContainerRef.current)
          } catch (e) {
            // Ignore if already removed
          }
        }
        editorContainerRef.current = null
      }
      // Remove EditorHost registration
      removeHost(docId)
      editorRef.current = null
      mountedRef.current = false
      console.log('[InkStoneEditor] Editor unmounted for:', docId)
    }
  }, [setupEditor, docId, removeHost])

  if (error) {
    return (
      <div className="editor-error" style={{ padding: 20, color: 'red' }}>
        <h3>Failed to load editor</h3>
        <pre>{error}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="editor-container"
      spellCheck={enableSpellCheck}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        '--ink-font-base': `${fontSize}px`,
        '--ink-line-height': `${lineHeight}`,
      } as React.CSSProperties}
    >
      {isLoading && (
        <div className="editor-loading">
          <div className="loading-spinner"></div>
          <span>Loading editor...</span>
        </div>
      )}
    </div>
  )
}
