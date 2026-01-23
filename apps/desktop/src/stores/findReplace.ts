import { create } from 'zustand'
import { getOrCreateDoc, getStore } from './editor'
import { getBlockTextInfo, findLineByOffset } from '../utils/textNodeCache'

export interface MatchResult {
  blockId: string
  index: number
  length: number
  text: string
}

interface FindReplaceStore {
  isOpen: boolean
  showReplace: boolean
  searchQuery: string
  replaceQuery: string
  caseSensitive: boolean
  useRegex: boolean
  matches: MatchResult[]
  currentMatchIndex: number

  open: (showReplace?: boolean) => void
  close: () => void
  setSearchQuery: (query: string) => void
  setReplaceQuery: (query: string) => void
  toggleCaseSensitive: () => void
  toggleRegex: () => void
  findAll: (docId: string) => void
  goToNext: (docId: string) => void
  goToPrev: (docId: string) => void
  replaceCurrent: (docId: string) => void
  replaceAll: (docId: string) => void
  scrollToMatch: (docId: string, match: MatchResult) => void
  highlightMatch: (docId: string, match: MatchResult) => void
  reset: () => void
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const useFindReplaceStore = create<FindReplaceStore>()((set, get) => ({
  isOpen: false,
  showReplace: false,
  searchQuery: '',
  replaceQuery: '',
  caseSensitive: false,
  useRegex: false,
  matches: [],
  currentMatchIndex: 0,

  open: (showReplace = false) => {
    set({ isOpen: true, showReplace })
  },

  close: () => {
    console.log('[findReplace] close() called')
    set({
      isOpen: false,
      searchQuery: '',
      replaceQuery: '',
      matches: [],
      currentMatchIndex: 0,
    })
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  setReplaceQuery: (query: string) => {
    set({ replaceQuery: query })
  },

  toggleCaseSensitive: () => {
    set((state) => ({ caseSensitive: !state.caseSensitive }))
  },

  toggleRegex: () => {
    set((state) => ({ useRegex: !state.useRegex }))
  },

  findAll: (docId: string) => {
    const { searchQuery, caseSensitive, useRegex } = get()

    if (!searchQuery.trim()) {
      set({ matches: [], currentMatchIndex: 0 })
      return
    }

    try {
      const { store } = getOrCreateDoc(docId)
      const root = store.root
      if (!root) {
        set({ matches: [], currentMatchIndex: 0 })
        return
      }

      const matches: MatchResult[] = []

      // Create regex pattern
      let regex: RegExp
      try {
        if (useRegex) {
          regex = new RegExp(searchQuery, caseSensitive ? 'g' : 'gi')
        } else {
          regex = new RegExp(escapeRegex(searchQuery), caseSensitive ? 'g' : 'gi')
        }
      } catch (e) {
        // Invalid regex
        set({ matches: [], currentMatchIndex: 0 })
        return
      }

      // Search through all blocks
      const searchBlocks = (block: any) => {
        const text = block.text?.toString()
        if (text) {
          regex.lastIndex = 0
          let match
          while ((match = regex.exec(text)) !== null) {
            matches.push({
              blockId: block.id,
              index: match.index,
              length: match[0].length,
              text: match[0],
            })
          }
        }

        // Recursively search children
        if (block.children) {
          for (const child of block.children) {
            searchBlocks(child)
          }
        }
      }

      for (const child of root.children) {
        searchBlocks(child)
      }

      set({ matches, currentMatchIndex: 0 })

      // Only scroll to first match, don't select (would steal focus)
      if (matches.length > 0) {
        get().scrollToMatch(docId, matches[0])
      }
    } catch (error) {
      console.error('Find error:', error)
      set({ matches: [], currentMatchIndex: 0 })
    }
  },

  goToNext: (docId: string) => {
    const { matches, currentMatchIndex } = get()
    if (matches.length === 0) return

    const nextIndex = (currentMatchIndex + 1) % matches.length
    set({ currentMatchIndex: nextIndex })
    get().scrollToMatch(docId, matches[nextIndex])
  },

  goToPrev: (docId: string) => {
    const { matches, currentMatchIndex } = get()
    if (matches.length === 0) return

    const prevIndex = currentMatchIndex === 0 ? matches.length - 1 : currentMatchIndex - 1
    set({ currentMatchIndex: prevIndex })
    get().scrollToMatch(docId, matches[prevIndex])
  },

  replaceCurrent: (docId: string) => {
    const { matches, currentMatchIndex, replaceQuery, searchQuery, caseSensitive, useRegex } = get()
    if (matches.length === 0) return

    const match = matches[currentMatchIndex]
    if (!match) return

    try {
      const { store } = getOrCreateDoc(docId)
      const block = store.getBlock(match.blockId)

      if (block?.model?.text) {
        // For regex with groups, support $1, $2, etc.
        let replacement = replaceQuery
        if (useRegex) {
          try {
            const regex = new RegExp(searchQuery, caseSensitive ? '' : 'i')
            replacement = match.text.replace(regex, replaceQuery)
          } catch (e) {
            // Fall back to simple replacement
          }
        }

        const text = block.model.text
        text.delete(match.index, match.length)
        text.insert(replacement, match.index)

        // Re-search to update matches
        get().findAll(docId)
      }
    } catch (error) {
      console.error('Replace error:', error)
    }
  },

  replaceAll: (docId: string) => {
    const { matches, replaceQuery, searchQuery, caseSensitive, useRegex } = get()
    if (matches.length === 0) return

    try {
      const { store } = getOrCreateDoc(docId)

      // Group matches by block ID
      const byBlock = new Map<string, MatchResult[]>()
      for (const match of matches) {
        const existing = byBlock.get(match.blockId) || []
        existing.push(match)
        byBlock.set(match.blockId, existing)
      }

      // Replace from end to start to avoid index shifting
      for (const [blockId, blockMatches] of byBlock) {
        const block = store.getBlock(blockId)
        if (block?.model?.text) {
          // Sort by index descending
          const sorted = [...blockMatches].sort((a, b) => b.index - a.index)

          for (const match of sorted) {
            let replacement = replaceQuery
            if (useRegex) {
              try {
                const regex = new RegExp(searchQuery, caseSensitive ? '' : 'i')
                replacement = match.text.replace(regex, replaceQuery)
              } catch (e) {
                // Fall back to simple replacement
              }
            }

            const text = block.model.text
            text.delete(match.index, match.length)
            text.insert(replacement, match.index)
          }
        }
      }

      // Clear matches after replace all
      set({ matches: [], currentMatchIndex: 0 })
    } catch (error) {
      console.error('Replace all error:', error)
    }
  },

  scrollToMatch: (_docId: string, match: MatchResult) => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      try {
        // Use cached block text info with binary search for fast line lookup
        const blockInfo = getBlockTextInfo(match.blockId)
        if (blockInfo && blockInfo.lines.length > 0) {
          const targetElement = findLineByOffset(blockInfo.lines, match.index)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
          }
        }

        // Fallback: scroll to the block element
        const blockElement = document.querySelector(
          `.ink-page-viewport [data-block-id="${match.blockId}"], ` +
          `editor-host [data-block-id="${match.blockId}"]`
        ) as HTMLElement
        if (blockElement) {
          blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } catch (error) {
        console.error('Scroll error:', error)
      }
    })
  },

  highlightMatch: (_docId: string, match: MatchResult) => {
    try {
      // Find the block element in the DOM
      const blockElement = document.querySelector(`[data-block-id="${match.blockId}"]`)
      if (blockElement) {
        // Scroll into view
        blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // Try to select the matched text using native Selection API
        const textNodes: Text[] = []
        const walker = document.createTreeWalker(
          blockElement,
          NodeFilter.SHOW_TEXT,
          null
        )

        let node: Text | null
        while ((node = walker.nextNode() as Text | null)) {
          textNodes.push(node)
        }

        // Find the text node containing our match
        let currentOffset = 0
        for (const textNode of textNodes) {
          const nodeLength = textNode.length
          if (currentOffset + nodeLength > match.index) {
            // Found the node
            const startOffset = match.index - currentOffset

            const selection = window.getSelection()
            if (selection) {
              const range = document.createRange()
              range.setStart(textNode, startOffset)

              // Handle case where match spans multiple nodes
              if (startOffset + match.length <= nodeLength) {
                range.setEnd(textNode, startOffset + match.length)
              } else {
                range.setEnd(textNode, nodeLength)
              }

              selection.removeAllRanges()
              selection.addRange(range)
            }
            break
          }
          currentOffset += nodeLength
        }
      }
    } catch (error) {
      console.error('Highlight error:', error)
    }
  },

  reset: () => {
    set({
      isOpen: false,
      showReplace: false,
      searchQuery: '',
      replaceQuery: '',
      matches: [],
      currentMatchIndex: 0,
    })
  },
}))
