import type { BlockModel } from '@ink/stone-store';
import { useLayoutEffect, useState } from 'react';

import { getStore, onStoreCreated } from '../stores/editor';

export interface DocStats {
  wordCount: number; // Word count (Chinese characters + English words)
  lineCount: number; // Line count
  charCount: number; // Character count (excluding spaces)
}

/**
 * Extract plain text from text object
 */
function extractText(textObj: any): string {
  if (!textObj) return '';

  if (typeof textObj === 'string') return textObj;

  // If it is a Text object, extract delta
  if (typeof textObj.toDelta === 'function') {
    const deltas = textObj.toDelta();
    return deltas.map((d: any) => d.insert || '').join('');
  }

  return textObj.toString?.() || '';
}

/**
 * Count words and characters in text
 * Word count rules:
 * - Chinese/Japanese/Korean: Each character counts as 1 word
 * - English/Numbers: Count words separated by spaces
 */
function countText(text: string): { words: number; chars: number } {
  // Character count: length after removing all whitespace characters
  const chars = text.replace(/\s/g, '').length;

  let words = 0;

  // 1. Count CJK (Chinese/Japanese/Korean) characters
  // Includes: Chinese characters, Japanese kana, Korean, etc.
  const cjkPattern =
    /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/gu;
  const cjkChars = text.match(cjkPattern);
  if (cjkChars) {
    words += cjkChars.length;
  }

  // 2. Count non-CJK words (English, numbers, etc.)
  // Remove CJK characters, then split by whitespace to count words
  const nonCJKText = text.replace(cjkPattern, ' ');
  const nonCJKWords = nonCJKText.split(/\s+/).filter((word) => {
    // Filter out empty strings and pure punctuation
    const trimmed = word.trim();
    return trimmed.length > 0 && /[a-zA-Z0-9]/.test(trimmed);
  });

  words += nonCJKWords.length;

  return { words, chars };
}

/**
 * Count content of a single block
 */
function countBlock(block: BlockModel): { words: number; chars: number; lines: number } {
  let words = 0;
  let chars = 0;
  let lines = 0;

  // Countable block types
  const countableBlocks = ['ink:paragraph', 'ink:list', 'ink:code'];

  if (countableBlocks.includes(block.flavour)) {
    const text = extractText((block as any).text);

    // Count lines: count number of internal newlines
    if (text.length > 0) {
      // Newline count + 1 = actual line count
      const newlineCount = (text.match(/\n/g) || []).length;
      lines += newlineCount + 1;
    } else {
      // Empty content counts as 1 line
      lines++;
    }

    const counts = countText(text);
    words += counts.words;
    chars += counts.chars;
  }

  // Recursively count child blocks
  for (const child of block.children) {
    const childCounts = countBlock(child);
    words += childCounts.words;
    chars += childCounts.chars;
    lines += childCounts.lines;
  }

  return { words, chars, lines };
}

/**
 * Hook: Count words, lines, and characters of the document
 */
export function useDocStats(docId: string | null): DocStats {
  const [stats, setStats] = useState<DocStats>({
    wordCount: 0,
    lineCount: 0,
    charCount: 0,
  });
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useLayoutEffect(() => {
    if (!docId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats({ wordCount: 0, lineCount: 0, charCount: 0 });
      return;
    }

    const store = getStore(docId);
    if (!store) {
      setStats({ wordCount: 0, lineCount: 0, charCount: 0 });

      // Listen for store creation if it doesn't exist yet
      const dispose = onStoreCreated((createdDocId) => {
        if (createdDocId === docId) {
          setUpdateTrigger((prev) => prev + 1);
        }
      });
      return dispose;
    }

    // Calculate statistics
    const calculateStats = () => {
      const root = store.root;
      if (!root) {
        return { wordCount: 0, lineCount: 0, charCount: 0 };
      }

      let totalWords = 0;
      let totalChars = 0;
      let totalLines = 0;

      // Iterate over all top-level blocks (usually ink:note)
      for (const child of root.children) {
        if (child.flavour === 'ink:note') {
          // Count all content blocks under note
          for (const noteChild of child.children) {
            const counts = countBlock(noteChild);
            totalWords += counts.words;
            totalChars += counts.chars;
            totalLines += counts.lines;
          }
        }
      }

      return {
        wordCount: totalWords,
        lineCount: totalLines,
        charCount: totalChars,
      };
    };

    // Initial calculation
    const initialStats = calculateStats();
    setStats(initialStats);

    // Subscribe to document changes
    let debounceTimer: NodeJS.Timeout | null = null;
    const subscription = store.slots.blockUpdated.subscribe(() => {
      // Use debounce to avoid frequent calculations
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        const newStats = calculateStats();
        setStats(newStats);
      }, 300); // 300ms debounce
    });

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [docId, updateTrigger]);

  return stats;
}
