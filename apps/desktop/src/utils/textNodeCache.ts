// Cache for text node offsets to avoid repeated DOM traversal

export interface TextNodeWithOffset {
  node: Text;
  startOffset: number;
}

export interface LineInfo {
  element: Element;
  startOffset: number;
  endOffset: number;
}

export interface BlockTextInfo {
  textNodes: TextNodeWithOffset[];
  lines: LineInfo[];
}

// Cache: blockId -> BlockTextInfo
const blockTextCache = new Map<string, BlockTextInfo>();

// Clear cache (call when search closes or document changes)
export function clearTextNodeCache() {
  blockTextCache.clear();
}

// Get or compute text node info for a block
export function getBlockTextInfo(blockId: string): BlockTextInfo | null {
  // Check cache first
  const cached = blockTextCache.get(blockId);
  if (cached) {
    // Verify cache is still valid (nodes still in DOM)
    if (cached.textNodes.length > 0 && cached.textNodes[0].node.isConnected) {
      return cached;
    }
    // Cache invalid, remove it
    blockTextCache.delete(blockId);
  }

  // Compute text info
  const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
  if (!blockElement) {
    return null;
  }

  // Find the text container
  let textContainer: Element | null = null;
  const richText = blockElement.querySelector('rich-text');
  if (richText) {
    textContainer = richText.querySelector('.inline-editor');
  }
  if (!textContainer) {
    textContainer =
      blockElement.querySelector('.inline-editor') ||
      blockElement.querySelector('[data-v-text="true"]') ||
      blockElement.querySelector('.ink-paragraph-rich-text-wrapper');
  }

  if (!textContainer) {
    return null;
  }

  // Collect text nodes and line info
  const vLines = textContainer.querySelectorAll('v-line');
  const textNodes: TextNodeWithOffset[] = [];
  const lines: LineInfo[] = [];
  let currentOffset = 0;

  for (let lineIndex = 0; lineIndex < vLines.length; lineIndex++) {
    const vLine = vLines[lineIndex];

    // Add newline offset for lines after the first
    if (lineIndex > 0) {
      currentOffset += 1; // for '\n'
    }

    const lineStartOffset = currentOffset;

    // Get all v-text spans in this line
    const vTextSpans = vLine.querySelectorAll('[data-v-text="true"]');

    for (let i = 0; i < vTextSpans.length; i++) {
      const vTextSpan = vTextSpans[i];
      for (let j = 0; j < vTextSpan.childNodes.length; j++) {
        const child = vTextSpan.childNodes[j];
        if (child.nodeType === Node.TEXT_NODE) {
          const textNode = child as Text;
          if (
            textNode.textContent &&
            textNode.textContent.length > 0 &&
            textNode.textContent !== '\u200B'
          ) {
            textNodes.push({ node: textNode, startOffset: currentOffset });
            currentOffset += textNode.length;
          }
        }
      }
    }

    lines.push({
      element: vLine,
      startOffset: lineStartOffset,
      endOffset: currentOffset,
    });
  }

  const result: BlockTextInfo = { textNodes, lines };
  blockTextCache.set(blockId, result);
  return result;
}

// Find the line element that contains a given offset using binary search
export function findLineByOffset(lines: LineInfo[], offset: number): Element | null {
  if (lines.length === 0) return null;

  let left = 0;
  let right = lines.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const line = lines[mid];

    if (offset < line.startOffset) {
      right = mid - 1;
    } else if (offset >= line.endOffset) {
      left = mid + 1;
    } else {
      // offset is within this line
      return line.element;
    }
  }

  // Fallback to last line if offset is beyond all lines
  return lines[lines.length - 1]?.element || null;
}
