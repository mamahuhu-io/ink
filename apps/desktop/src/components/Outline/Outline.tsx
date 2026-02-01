import type { EditorHost } from '@ink/stone-std';
import type { BlockModel } from '@ink/stone-store';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getStore } from '../../stores/editor';
import { useEditorHostStore } from '../../stores/editorHost';
import { type Tab, useTabStore } from '../../stores/tabs';

interface HeadingInfo {
  id: string;
  text: string;
  level: number; // 1-6 for h1-h6
}

// Heading type keys
const headingKeys = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/**
 * Check if a block is a heading block
 */
function isHeadingBlock(block: BlockModel): boolean {
  if (block.flavour !== 'ink:paragraph') return false;
  // Access type through props signal
  const type = (block as any).props?.type$?.value || (block as any).type;
  return headingKeys.has(type);
}

/**
 * Get heading level from type (h1 -> 1, h2 -> 2, etc.)
 */
function getHeadingLevel(type: string): number {
  const match = type.match(/^h(\d)$/);
  return match ? parseInt(match[1], 10) : 1;
}

/**
 * Get text content from a block
 */
function getBlockText(block: BlockModel): string {
  // Ink Stone stores text in block.text (not props.text)
  const text = (block as any).text;
  if (!text) return '';
  if (typeof text === 'string') return text;
  if (typeof text.toString === 'function') return text.toString();
  if (typeof text.length === 'number' && text.length === 0) return '';
  return '';
}

/**
 * Get block type from props
 */
function getBlockType(block: BlockModel): string {
  return (block as any).props?.type$?.value || (block as any).type || 'text';
}

/**
 * Extract headings from the document store
 */
function extractHeadingsFromStore(docId: string): HeadingInfo[] {
  const store = getStore(docId);
  if (!store) {
    console.log('[Outline] Store not found for docId:', docId);
    return [];
  }

  const root = store.root;
  if (!root) {
    console.log('[Outline] Root not found in store');
    return [];
  }

  const headings: HeadingInfo[] = [];

  // Traverse note blocks
  for (const child of root.children) {
    if (child.flavour === 'ink:note') {
      for (const noteChild of child.children) {
        if (isHeadingBlock(noteChild)) {
          const type = getBlockType(noteChild);
          const text = getBlockText(noteChild);
          console.log('[Outline] Found heading:', { type, text, id: noteChild.id });
          if (text.trim()) {
            headings.push({
              id: noteChild.id,
              text: text.trim(),
              level: getHeadingLevel(type),
            });
          }
        }
      }
    }
  }

  console.log('[Outline] Total headings found:', headings.length);
  return headings;
}

/**
 * Scroll to a block and highlight it
 */
function scrollToBlock(host: EditorHost, blockId: string) {
  const block = host.view.getBlock(blockId);
  if (!block) return;

  block.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });

  // Add temporary highlight
  const originalBg = (block as HTMLElement).style.backgroundColor;
  (block as HTMLElement).style.backgroundColor = 'var(--ink-hover-color)';
  setTimeout(() => {
    (block as HTMLElement).style.backgroundColor = originalBg;
  }, 1000);
}

/**
 * Check if a block is before the viewport center
 */
function isBlockBeforeViewportCenter(block: Element, container: Element): boolean {
  const containerRect = container.getBoundingClientRect();
  const blockRect = block.getBoundingClientRect();

  const containerCenter = containerRect.top + containerRect.height / 2;
  const blockCenter = blockRect.top + blockRect.height / 2;

  return blockCenter < containerCenter + blockRect.height;
}

export function Outline() {
  const { t } = useTranslation();
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  // Subscribe to hosts and version to trigger re-render when EditorHost is registered
  const hosts = useEditorHostStore((state) => state.hosts);
  const version = useEditorHostStore((state) => state.version);
  const { activeTabId, tabs } = useTabStore();

  // Get the current docId from active tab
  const currentDocId = activeTabId
    ? tabs.find((t: Tab) => t.id === activeTabId)?.docId || null
    : null;

  // Get the current EditorHost
  const currentHost = currentDocId ? hosts[currentDocId] : undefined;

  console.log('[Outline] State:', {
    activeTabId,
    currentDocId,
    hasHost: !!currentHost,
    hostsKeys: Object.keys(hosts),
    version,
    tabsCount: tabs.length,
  });

  // Extract headings when docId changes or host becomes available
  useLayoutEffect(() => {
    console.log(
      '[Outline] useEffect triggered, currentDocId:',
      currentDocId,
      'hasHost:',
      !!currentHost,
      'version:',
      version,
    );

    if (!currentDocId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeadings([]);
      return;
    }

    const updateHeadings = () => {
      const newHeadings = extractHeadingsFromStore(currentDocId);
      console.log('[Outline] Extracted headings:', newHeadings.length, 'from docId:', currentDocId);
      setHeadings(newHeadings);
    };

    // Initial extraction with a small delay to ensure store is ready
    const timer = setTimeout(updateHeadings, 100);

    // Subscribe to store changes
    const store = getStore(currentDocId);
    if (store) {
      const subscription = store.slots.blockUpdated.subscribe(() => {
        updateHeadings();
      });
      return () => {
        clearTimeout(timer);
        subscription.unsubscribe();
      };
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentDocId, currentHost, version]); // Include version to trigger re-render when hosts change

  // Setup scroll listener for active heading tracking
  useLayoutEffect(() => {
    if (!currentDocId || headings.length === 0 || !currentHost) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveHeadingId(null);
      return;
    }

    const updateActiveHeading = () => {
      if (!currentHost) return;

      let activeId: string | null = null;

      for (const heading of headings) {
        const block = currentHost.view.getBlock(heading.id);
        if (!block) continue;

        const editorContainer = currentHost.parentElement || currentHost;
        if (isBlockBeforeViewportCenter(block, editorContainer)) {
          activeId = heading.id;
        }
      }

      setActiveHeadingId(activeId);
    };

    // Initial update
    updateActiveHeading();

    // Listen to scroll events
    const handleScroll = () => {
      requestAnimationFrame(updateActiveHeading);
    };

    window.addEventListener('scroll', handleScroll, true);
    scrollListenerRef.current = () => {
      window.removeEventListener('scroll', handleScroll, true);
    };

    return () => {
      if (scrollListenerRef.current) {
        scrollListenerRef.current();
        scrollListenerRef.current = null;
      }
    };
  }, [currentDocId, headings, currentHost]);

  // Handle heading click
  const handleHeadingClick = useCallback(
    (headingId: string) => {
      if (!currentHost) return;

      scrollToBlock(currentHost, headingId);
      setActiveHeadingId(headingId);
    },
    [currentHost],
  );

  if (!currentDocId) {
    return (
      <div className="outline-empty-state">
        <p>{t('outline.noDocument')}</p>
      </div>
    );
  }

  if (headings.length === 0) {
    return (
      <div className="outline-empty-state">
        <p>{t('outline.noHeadings')}</p>
        <span className="outline-hint">{t('outline.hint')}</span>
      </div>
    );
  }

  return (
    <div className="outline">
      <div className="outline-header">
        <span className="outline-title">{t('outline.title')}</span>
      </div>
      <div className="outline-content" role="tree">
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={`outline-item outline-level-${heading.level}${
              activeHeadingId === heading.id ? ' active' : ''
            }`}
            role="treeitem"
            aria-selected={activeHeadingId === heading.id}
            tabIndex={0}
            onClick={() => handleHeadingClick(heading.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleHeadingClick(heading.id);
              }
            }}
            style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
          >
            <span className="outline-item-text">{heading.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
