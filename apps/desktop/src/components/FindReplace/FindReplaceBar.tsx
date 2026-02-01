import './FindReplaceBar.css';

import { ChevronDown, ChevronUp, Replace, Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useFindReplaceStore } from '../../stores/findReplace';
import { formatShortcutHint } from '../../utils/shortcuts';

interface FindReplaceBarProps {
  docId: string;
}

export function FindReplaceBar({ docId }: FindReplaceBarProps) {
  const { t } = useTranslation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    showReplace,
    searchQuery,
    replaceQuery,
    caseSensitive,
    useRegex,
    matches,
    currentMatchIndex,
    setSearchQuery,
    setReplaceQuery,
    toggleCaseSensitive,
    toggleRegex,
    findAll,
    goToNext,
    goToPrev,
    replaceCurrent,
    replaceAll,
    close,
  } = useFindReplaceStore();

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [isOpen]);

  // Re-search when options change
  useEffect(() => {
    if (isOpen && searchQuery) {
      findAll(docId);
    }
  }, [caseSensitive, useRegex, docId, isOpen, findAll, searchQuery]);

  // Handle search input change with debounce
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      // Trigger search after a short delay
      setTimeout(() => {
        if (value.trim()) {
          findAll(docId);
        }
      }, 150);
    },
    [setSearchQuery, findAll, docId],
  );

  // Prevent events from bubbling to editor
  const stopPropagation = useCallback((e: React.KeyboardEvent | React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          goToPrev(docId);
        } else {
          goToNext(docId);
        }
      } else if (e.key === 'F3') {
        e.preventDefault();
        if (e.shiftKey) {
          goToPrev(docId);
        } else {
          goToNext(docId);
        }
      }
    },
    [close, goToNext, goToPrev, docId],
  );

  if (!isOpen) return null;

  return (
    <div className="find-replace-bar" onKeyDown={handleKeyDown} role="presentation">
      <div className="find-row">
        <div className="find-input-wrapper">
          <Search className="find-icon" size={14} />
          <input
            ref={searchInputRef}
            type="text"
            className="find-input"
            placeholder={t('findReplace.findPlaceholder')}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={stopPropagation}
            onMouseDown={stopPropagation}
          />
        </div>

        <button
          className={`find-option-btn ${caseSensitive ? 'active' : ''}`}
          onClick={toggleCaseSensitive}
          title={formatShortcutHint(t('findReplace.matchCase'))}
        >
          Aa
        </button>

        <button
          className={`find-option-btn ${useRegex ? 'active' : ''}`}
          onClick={toggleRegex}
          title={formatShortcutHint(t('findReplace.useRegex'))}
        >
          .*
        </button>

        <span className="match-count">
          {searchQuery
            ? matches.length > 0
              ? t('findReplace.count', { current: currentMatchIndex + 1, total: matches.length })
              : t('findReplace.noResults')
            : ''}
        </span>

        <div className="find-nav-buttons">
          <button
            className="find-nav-btn"
            onClick={() => goToPrev(docId)}
            disabled={matches.length === 0}
            title={t('findReplace.prevMatch')}
          >
            <ChevronUp size={12} />
          </button>
          <button
            className="find-nav-btn"
            onClick={() => goToNext(docId)}
            disabled={matches.length === 0}
            title={t('findReplace.nextMatch')}
          >
            <ChevronDown size={12} />
          </button>
        </div>

        <button className="find-close-btn" onClick={close} title={t('findReplace.close')}>
          <X size={14} />
        </button>
      </div>

      {showReplace && (
        <div className="replace-row">
          <div className="find-input-wrapper">
            <Replace className="find-icon" size={14} />
            <input
              ref={replaceInputRef}
              type="text"
              className="find-input"
              placeholder={t('findReplace.replacePlaceholder')}
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              onKeyDown={stopPropagation}
              onMouseDown={stopPropagation}
            />
          </div>

          <button
            className="replace-btn"
            onClick={() => replaceCurrent(docId)}
            disabled={matches.length === 0}
            title={t('findReplace.replace')}
          >
            {t('findReplace.replace')}
          </button>

          <button
            className="replace-btn replace-all-btn"
            onClick={() => replaceAll(docId)}
            disabled={matches.length === 0}
            title={t('findReplace.replaceAll')}
          >
            {t('findReplace.replaceAll')}
          </button>
        </div>
      )}
    </div>
  );
}
