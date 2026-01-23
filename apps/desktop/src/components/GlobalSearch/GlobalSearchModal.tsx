import { useEffect, useRef, useCallback } from 'react'
import { Search, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSearchStore } from '../../stores/search'
import { useFileTreeStore } from '../../stores/fileTree'
import { SearchResult } from '../../services/search'
import './GlobalSearchModal.css'

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenFile: (filePath: string) => void
}

export function GlobalSearchModal({ isOpen, onClose, onOpenFile }: GlobalSearchModalProps) {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    query,
    results,
    isSearching,
    selectedIndex,
    setQuery,
    search,
    selectNext,
    selectPrev,
    reset,
  } = useSearchStore()

  const { rootPath } = useFileTreeStore()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Clear timer on close
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
      reset()
    }
  }, [isOpen, reset])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector('.search-result-item.selected')
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  // Handle result click
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      onOpenFile(result.filePath)
      onClose()
    },
    [onOpenFile, onClose]
  )

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          selectNext()
          break
        case 'ArrowUp':
          e.preventDefault()
          selectPrev()
          break
        case 'Enter':
          e.preventDefault()
          if (results.length > 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, selectNext, selectPrev, results, selectedIndex, handleResultClick])

  // Debounced search
  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value)

      // Clear previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Set new debounced search
      debounceTimerRef.current = setTimeout(() => {
        search(value)
      }, 300)
    },
    [setQuery, search]
  )

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === modalRef.current) {
        onClose()
      }
    },
    [onClose]
  )

  // Highlight matching text
  const highlightMatch = (text: string, start: number, end: number) => {
    if (start < 0 || end > text.length || start >= end) {
      return text
    }
    const before = text.slice(0, start)
    const match = text.slice(start, end)
    const after = text.slice(end)

    return (
      <>
        {before}
        <mark className="search-highlight">{match}</mark>
        {after}
      </>
    )
  }

  // Truncate line content for display
  const truncateLine = (line: string | undefined, matchStart: number, maxLength: number = 80) => {
    if (!line) {
      return { text: '', offset: 0 }
    }
    if (line.length <= maxLength) {
      return { text: line, offset: 0 }
    }

    // Center around the match
    const start = Math.max(0, matchStart - Math.floor(maxLength / 2))
    const end = Math.min(line.length, start + maxLength)
    const text = (start > 0 ? '...' : '') + line.slice(start, end) + (end < line.length ? '...' : '')
    const offset = start > 0 ? start - 3 : 0

    return { text, offset }
  }

  if (!isOpen) return null

  return (
    <div className="search-backdrop" ref={modalRef} onClick={handleBackdropClick}>
      <div className="search-modal">
        <div className="search-input-container">
          <Search className="search-icon" size={18} />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={rootPath ? t('search.placeholderWithFolder') : t('search.placeholderNoFolder')}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            disabled={!rootPath}
          />
          {isSearching && <div className="search-spinner" />}
          <div className="search-shortcut">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span>{t('search.shortcuts.navigate')}</span>
            <kbd>↵</kbd>
            <span>{t('search.shortcuts.open')}</span>
            <kbd>esc</kbd>
            <span>{t('search.shortcuts.close')}</span>
          </div>
        </div>

        <div className="search-results" ref={resultsRef}>
          {!rootPath ? (
            <div className="search-empty">
              <p>{t('search.openFolderHint')}</p>
            </div>
          ) : query && results.length === 0 && !isSearching ? (
            <div className="search-empty">
              <p>{t('search.noResultsFor', { query })}</p>
            </div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={result.filePath}
                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleResultClick(result)}
              >
                <div className="search-result-header">
                  <FileText className="search-file-icon" size={16} />
                  <span className="search-result-filename">{result.fileName}</span>
                  {result.isNameMatch && <span className="search-name-badge">{t('search.badge.nameMatch')}</span>}
                </div>
                {result.matches && result.matches.length > 0 && (
                  <div className="search-result-matches">
                    {result.matches.slice(0, 3).map((match, matchIndex) => {
                      if (!match || !match.lineContent) {
                        return null
                      }
                      const { text, offset } = truncateLine(match.lineContent, match.matchStart || 0)
                      const adjustedStart = (match.matchStart || 0) - offset
                      const adjustedEnd = (match.matchEnd || 0) - offset

                      return (
                        <div key={matchIndex} className="search-match-line">
                          <span className="search-line-number">{match.lineNumber || 0}</span>
                          <span className="search-line-content">
                            {adjustedStart >= 0 && adjustedEnd <= text.length
                              ? highlightMatch(text, adjustedStart, adjustedEnd)
                              : text}
                          </span>
                        </div>
                      )
                    })}
                    {result.matches.length > 3 && (
                      <div className="search-more-matches">
                        {t('search.badge.moreMatches', { count: result.matches.length - 3 })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : query && isSearching ? (
            <div className="search-empty">
              <p>{t('search.searching')}</p>
            </div>
          ) : (
            <div className="search-empty">
              <p>{t('search.typeToSearch')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
