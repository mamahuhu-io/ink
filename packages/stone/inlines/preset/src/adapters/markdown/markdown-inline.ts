import { MarkdownASTToDeltaExtension } from '@ink/stone-shared/adapters';
import type { DeltaInsert } from '@ink/stone-store';

/**
 * Parse special style markers from text and return delta array
 * Markers are: [[SPAN:style]]content[[/SPAN]] and [[U]]content[[/U]]
 */
function parseStyleMarkers(text: string): DeltaInsert[] {
  const deltas: DeltaInsert[] = [];

  // Combined regex to match both SPAN and U markers
  // [[SPAN:style]]content[[/SPAN]] or [[U]]content[[/U]]
  const markerRegex = /\[\[SPAN:([^\]]*)\]\]([\s\S]*?)\[\[\/SPAN\]\]|\[\[U\]\]([\s\S]*?)\[\[\/U\]\]/g;

  let lastIndex = 0;
  let match;

  while ((match = markerRegex.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      if (plainText) {
        deltas.push({ insert: plainText });
      }
    }

    if (match[1] !== undefined) {
      // SPAN match: [[SPAN:style]]content[[/SPAN]]
      const styleStr = match[1];
      const content = match[2];

      const attributes: Record<string, string | boolean> = {};

      // Parse color
      const colorMatch = styleStr.match(/(?:^|;)\s*color:\s*([^;]+)/);
      if (colorMatch) {
        attributes.color = colorMatch[1].trim();
      }

      // Parse background-color
      const bgMatch = styleStr.match(/background-color:\s*([^;]+)/);
      if (bgMatch) {
        attributes.background = bgMatch[1].trim();
      }

      if (content) {
        if (Object.keys(attributes).length > 0) {
          deltas.push({ insert: content, attributes });
        } else {
          deltas.push({ insert: content });
        }
      }
    } else if (match[3] !== undefined) {
      // U match: [[U]]content[[/U]]
      const content = match[3];
      if (content) {
        deltas.push({ insert: content, attributes: { underline: true } });
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      deltas.push({ insert: remainingText });
    }
  }

  return deltas;
}

/**
 * Check if text contains style markers
 */
function hasStyleMarkers(text: string): boolean {
  return /\[\[SPAN:[^\]]*\]\]|\[\[U\]\]/i.test(text);
}

export const markdownTextToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'text',
  match: ast => ast.type === 'text',
  toDelta: ast => {
    if (!('value' in ast)) {
      return [];
    }
    const text = ast.value;

    // Check if text contains style markers and parse them
    if (hasStyleMarkers(text)) {
      return parseStyleMarkers(text);
    }

    return [{ insert: text }];
  },
});

export const markdownInlineCodeToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'inlineCode',
  match: ast => ast.type === 'inlineCode',
  toDelta: ast => {
    if (!('value' in ast)) {
      return [];
    }
    return [{ insert: ast.value, attributes: { code: true } }];
  },
});

export const markdownStrongToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'strong',
  match: ast => ast.type === 'strong',
  toDelta: (ast, context) => {
    if (!('children' in ast)) {
      return [];
    }
    return ast.children.flatMap(child =>
      context.toDelta(child).map(delta => {
        delta.attributes = { ...delta.attributes, bold: true };
        return delta;
      })
    );
  },
});

export const markdownEmphasisToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'emphasis',
  match: ast => ast.type === 'emphasis',
  toDelta: (ast, context) => {
    if (!('children' in ast)) {
      return [];
    }
    return ast.children.flatMap(child =>
      context.toDelta(child).map(delta => {
        delta.attributes = { ...delta.attributes, italic: true };
        return delta;
      })
    );
  },
});

export const markdownDeleteToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'delete',
  match: ast => ast.type === 'delete',
  toDelta: (ast, context) => {
    if (!('children' in ast)) {
      return [];
    }
    return ast.children.flatMap(child =>
      context.toDelta(child).map(delta => {
        delta.attributes = { ...delta.attributes, strike: true };
        return delta;
      })
    );
  },
});

export const markdownListToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'list',
  match: ast => ast.type === 'list',
  toDelta: () => [],
});

export const markdownHtmlToDeltaMatcher = MarkdownASTToDeltaExtension({
  name: 'html',
  match: ast => ast.type === 'html',
  toDelta: ast => {
    if (!('value' in ast)) {
      return [];
    }
    const html = ast.value;

    // Parse <u>content</u> for underline
    const underlineMatch = html.match(/^<u>(.*?)<\/u>$/s);
    if (underlineMatch) {
      const content = underlineMatch[1];
      return [{ insert: content, attributes: { underline: true } }];
    }

    // Parse <span style="...">content</span> for color and background
    const spanMatch = html.match(/^<span\s+style="([^"]*)">(.*?)<\/span>$/s);
    if (spanMatch) {
      const styleStr = spanMatch[1];
      const content = spanMatch[2];

      const attributes: Record<string, string | boolean> = {};

      // Parse color
      const colorMatch = styleStr.match(/(?:^|;)\s*color:\s*([^;]+)/);
      if (colorMatch) {
        attributes.color = colorMatch[1].trim();
      }

      // Parse background-color
      const bgMatch = styleStr.match(/background-color:\s*([^;]+)/);
      if (bgMatch) {
        attributes.background = bgMatch[1].trim();
      }

      if (Object.keys(attributes).length > 0) {
        return [{ insert: content, attributes }];
      }
      return [{ insert: content }];
    }

    // For other HTML, insert as plain text
    return [{ insert: html }];
  },
});

export const MarkdownInlineToDeltaAdapterExtensions = [
  markdownTextToDeltaMatcher,
  markdownInlineCodeToDeltaMatcher,
  markdownStrongToDeltaMatcher,
  markdownEmphasisToDeltaMatcher,
  markdownDeleteToDeltaMatcher,
  markdownListToDeltaMatcher,
  markdownHtmlToDeltaMatcher,
];
