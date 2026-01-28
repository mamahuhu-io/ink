/**
 * Web Worker for parsing Markdown content
 * This offloads CPU-intensive parsing from the main thread
 */

export interface BlockDef {
  type: string;
  props: Record<string, unknown>;
  imagePath?: string;
}

export interface ParseMarkdownMessage {
  type: 'parse';
  id: string;
  markdown: string;
}

export interface ParseMarkdownResult {
  type: 'result';
  id: string;
  blockDefs: BlockDef[];
}

// Image regex pattern
const IMAGE_LINE_REGEX = /^!\[(.*?)\]\((.+?)\)$/;

/**
 * Parse markdown content into block definitions
 * This is a pure function that doesn't touch the DOM
 */
function parseMarkdownToBlockDefs(markdown: string): BlockDef[] {
  const lines = markdown.split('\n');
  const blockDefs: BlockDef[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = '';

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        blockDefs.push({
          type: 'ink:code',
          props: {
            text: codeBlockContent.join('\n'),
            language: codeBlockLanguage,
          },
        });
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    const imageMatch = line.match(IMAGE_LINE_REGEX);
    if (imageMatch) {
      const caption = imageMatch[1];
      // Parse image path - remove angle brackets if present
      let imagePath = imageMatch[2];
      if (imagePath.startsWith('<') && imagePath.endsWith('>')) {
        imagePath = imagePath.slice(1, -1);
      }
      blockDefs.push({
        type: 'ink:image',
        props: { caption },
        imagePath,
      });
      continue;
    }

    if (line.startsWith('# ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h1', text: line.slice(2) },
      });
    } else if (line.startsWith('## ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h2', text: line.slice(3) },
      });
    } else if (line.startsWith('### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h3', text: line.slice(4) },
      });
    } else if (line.startsWith('#### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h4', text: line.slice(5) },
      });
    } else if (line.startsWith('##### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h5', text: line.slice(6) },
      });
    } else if (line.startsWith('###### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h6', text: line.slice(7) },
      });
    } else if (line.startsWith('> ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'quote', text: line.slice(2) },
      });
    } else if (line === '---' || line === '***' || line === '___') {
      blockDefs.push({
        type: 'ink:divider',
        props: {},
      });
    } else if (line.match(/^\s*[-*+]\s/)) {
      const match = line.match(/^\s*[-*+]\s(.*)$/);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: { type: 'bulleted', text: match[1] },
        });
      }
    } else if (line.match(/^\s*\d+\.\s/)) {
      const match = line.match(/^\s*\d+\.\s(.*)$/);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: { type: 'numbered', text: match[1] },
        });
      }
    } else if (line.match(/^\s*-\s*\[[ x]\]\s/i)) {
      const match = line.match(/^\s*-\s*\[([ x])\]\s(.*)$/i);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: {
            type: 'todo',
            checked: match[1].toLowerCase() === 'x',
            text: match[2],
          },
        });
      }
    } else {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { text: line },
      });
    }
  }

  return blockDefs;
}

// Worker message handler
self.onmessage = (event: MessageEvent<ParseMarkdownMessage>) => {
  const { type, id, markdown } = event.data;

  if (type === 'parse') {
    const blockDefs = parseMarkdownToBlockDefs(markdown);

    const result: ParseMarkdownResult = {
      type: 'result',
      id,
      blockDefs,
    };

    self.postMessage(result);
  }
};
