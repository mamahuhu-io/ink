import { useEffect, useRef, useCallback } from 'react'
import { useFindReplaceStore, type MatchResult } from '../../stores/findReplace'
import { getBlockTextInfo, clearTextNodeCache } from '../../utils/textNodeCache'

interface SearchHighlightsProps {
  docId: string
}

// Check if CSS Custom Highlight API is supported
const supportsHighlightAPI = typeof CSS !== 'undefined' && 'highlights' in CSS

// Threshold for enabling virtualization (number of matches)
const VIRTUALIZATION_THRESHOLD = 100

// Helper function to clear all highlights
function clearAllHighlights(highlightRef?: React.MutableRefObject<Highlight | null>, currentHighlightRef?: React.MutableRefObject<Highlight | null>) {
  if (supportsHighlightAPI) {
    // First, clear the ranges from the Highlight objects if they exist
    if (highlightRef?.current) {
      highlightRef.current.clear()
    }
    if (currentHighlightRef?.current) {
      currentHighlightRef.current.clear()
    }

    // Then delete from the registry
    CSS.highlights.delete('search-results')
    CSS.highlights.delete('search-current')

    // Force a repaint - some WebViews need this to update the rendering
    // We do this by briefly modifying a CSS property
    const editorHost = document.querySelector('editor-host') || document.querySelector('.ink-page-viewport')
    if (editorHost instanceof HTMLElement) {
      const originalOpacity = editorHost.style.opacity
      editorHost.style.opacity = '0.999'
      requestAnimationFrame(() => {
        editorHost.style.opacity = originalOpacity || ''
      })
    }
  }
}

export function SearchHighlights({ docId: _docId }: SearchHighlightsProps) {
  const highlightRef = useRef<Highlight | null>(null)
  const currentHighlightRef = useRef<Highlight | null>(null)
  const scrollContainerRef = useRef<Element | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const { isOpen, matches, currentMatchIndex } = useFindReplaceStore()

  // Get Range objects for a match using cached text node info
  const getMatchRanges = useCallback((match: MatchResult): Range[] => {
    const blockInfo = getBlockTextInfo(match.blockId)
    if (!blockInfo || blockInfo.textNodes.length === 0) {
      return []
    }

    const ranges: Range[] = []
    const matchStart = match.index
    const matchEnd = match.index + match.length

    for (const { node: textNode, startOffset: nodeStart } of blockInfo.textNodes) {
      const nodeLength = textNode.length
      const nodeEnd = nodeStart + nodeLength

      if (nodeEnd > matchStart && nodeStart < matchEnd) {
        const startInNode = Math.max(0, matchStart - nodeStart)
        const endInNode = Math.min(nodeLength, matchEnd - nodeStart)

        try {
          const range = document.createRange()
          range.setStart(textNode, startInNode)
          range.setEnd(textNode, endInNode)
          ranges.push(range)
        } catch (e) {
          // Ignore range errors
        }
      }
    }

    return ranges
  }, [])

  // Check if a match is visible in the viewport
  const isMatchVisible = useCallback((match: MatchResult, containerRect: DOMRect): boolean => {
    const blockInfo = getBlockTextInfo(match.blockId)
    if (!blockInfo || blockInfo.lines.length === 0) {
      return false
    }

    // Find the line containing this match using binary search
    let left = 0
    let right = blockInfo.lines.length - 1
    let targetLine = null

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const line = blockInfo.lines[mid]

      if (match.index < line.startOffset) {
        right = mid - 1
      } else if (match.index >= line.endOffset) {
        left = mid + 1
      } else {
        targetLine = line
        break
      }
    }

    if (!targetLine) {
      return false
    }

    // Check if the line element is in the viewport
    const lineRect = targetLine.element.getBoundingClientRect()
    // Add some buffer (200px) to pre-render highlights slightly outside viewport
    const buffer = 200
    return lineRect.bottom >= containerRect.top - buffer &&
           lineRect.top <= containerRect.bottom + buffer
  }, [])

  // Update highlights with virtualization for large match sets
  const updateHighlights = useCallback(() => {
    // Clear existing highlights
    if (supportsHighlightAPI) {
      CSS.highlights.delete('search-results')
      CSS.highlights.delete('search-current')
    }

    if (!isOpen || matches.length === 0) {
      return
    }

    if (!supportsHighlightAPI) {
      applyMarkFallback()
      return
    }

    // Clear text node cache on first render
    if (!scrollContainerRef.current) {
      clearTextNodeCache()
    }

    const allRanges: Range[] = []
    const currentRanges: Range[] = []

    // For small match sets, render all highlights (no virtualization)
    if (matches.length <= VIRTUALIZATION_THRESHOLD) {
      matches.forEach((match, index) => {
        const ranges = getMatchRanges(match)
        if (index === currentMatchIndex) {
          currentRanges.push(...ranges)
        } else {
          allRanges.push(...ranges)
        }
      })
    } else {
      // Virtualization: only render visible matches
      const scrollContainer = scrollContainerRef.current ||
        document.querySelector('.ink-page-viewport') ||
        document.querySelector('editor-host')

      scrollContainerRef.current = scrollContainer

      if (!scrollContainer) {
        return
      }

      const containerRect = scrollContainer.getBoundingClientRect()

      matches.forEach((match, index) => {
        // Always render current match
        if (index === currentMatchIndex) {
          const ranges = getMatchRanges(match)
          currentRanges.push(...ranges)
        } else if (isMatchVisible(match, containerRect)) {
          // Only render visible matches
          const ranges = getMatchRanges(match)
          allRanges.push(...ranges)
        }
      })
    }

    if (allRanges.length > 0) {
      highlightRef.current = new Highlight(...allRanges)
      CSS.highlights.set('search-results', highlightRef.current)
    }

    if (currentRanges.length > 0) {
      currentHighlightRef.current = new Highlight(...currentRanges)
      CSS.highlights.set('search-current', currentHighlightRef.current)
    }
  }, [isOpen, matches, currentMatchIndex, getMatchRanges, isMatchVisible])

  // Throttled scroll handler for virtualization
  const handleScroll = useCallback(() => {
    if (matches.length <= VIRTUALIZATION_THRESHOLD) {
      return
    }

    // Cancel previous RAF
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }

    // Schedule update on next frame
    rafIdRef.current = requestAnimationFrame(() => {
      updateHighlights()
      rafIdRef.current = null
    })
  }, [matches.length, updateHighlights])

  // Apply highlights when matches or currentMatchIndex changes
  useEffect(() => {
    // Don't set timer if search is closed
    if (!isOpen) {
      return
    }
    // Small delay to ensure DOM is ready after scroll
    const timer = setTimeout(() => {
      clearTextNodeCache()
      updateHighlights()
    }, 50)
    return () => clearTimeout(timer)
  }, [isOpen, matches, currentMatchIndex, updateHighlights])

  // Set up scroll listener for virtualization
  useEffect(() => {
    if (!isOpen || matches.length <= VIRTUALIZATION_THRESHOLD) {
      return
    }

    const scrollContainer = document.querySelector('.ink-page-viewport') ||
      document.querySelector('editor-host')

    if (!scrollContainer) {
      return
    }

    scrollContainerRef.current = scrollContainer
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [isOpen, matches.length, handleScroll])

  // Cleanup on unmount or when search closes
  useEffect(() => {
    console.log('[SearchHighlights] isOpen changed:', isOpen, 'supportsHighlightAPI:', supportsHighlightAPI)
    if (!isOpen) {
      console.log('[SearchHighlights] Cleaning up highlights')
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      clearAllHighlights(highlightRef, currentHighlightRef)
      console.log('[SearchHighlights] After delete, CSS.highlights has:', supportsHighlightAPI ? Array.from(CSS.highlights.keys()) : 'N/A')
      clearTextNodeCache()
      // Reset refs when search closes
      scrollContainerRef.current = null
      highlightRef.current = null
      currentHighlightRef.current = null
    }

    return () => {
      console.log('[SearchHighlights] Cleanup function called, isOpen was:', isOpen)
      clearAllHighlights(highlightRef, currentHighlightRef)
    }
  }, [isOpen])

  // This component doesn't render anything - it just manages highlights
  return null
}

// Fallback for browsers without CSS Custom Highlight API
function applyMarkFallback() {
  // Remove existing marks
  document.querySelectorAll('.search-highlight-mark').forEach(el => {
    const parent = el.parentNode
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ''), el)
      parent.normalize()
    }
  })

  // This fallback is limited - for full support, would need to integrate with editor
  // For now, just log a warning
  console.warn('CSS Custom Highlight API not supported. Highlighting may not work correctly.')
}
