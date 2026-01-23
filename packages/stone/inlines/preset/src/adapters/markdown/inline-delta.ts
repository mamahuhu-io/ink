import { InlineDeltaToMarkdownAdapterExtension } from '@ink/stone-shared/adapters';
import type { PhrasingContent, Html } from 'mdast';

// Helper to extract text from mdast node
function extractTextFromMdast(node: PhrasingContent): string {
  if (node.type === 'text') {
    return node.value;
  }
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(child => extractTextFromMdast(child as PhrasingContent)).join('');
  }
  if ('value' in node) {
    return String(node.value);
  }
  return '';
}

// Helper to wrap mdast node with HTML tags
function wrapWithHtmlTags(node: PhrasingContent, openTag: string, closeTag: string): Html {
  const text = extractTextFromMdast(node);
  return {
    type: 'html',
    value: `${openTag}${text}${closeTag}`,
  };
}

export const boldDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'bold',
    match: delta => !!delta.attributes?.bold,
    toAST: (_, context) => {
      const { current: currentMdast } = context;
      return {
        type: 'strong',
        children: [currentMdast],
      };
    },
  });

export const italicDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'italic',
    match: delta => !!delta.attributes?.italic,
    toAST: (_, context) => {
      const { current: currentMdast } = context;
      return {
        type: 'emphasis',
        children: [currentMdast],
      };
    },
  });

export const strikeDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'strike',
    match: delta => !!delta.attributes?.strike,
    toAST: (_, context) => {
      const { current: currentMdast } = context;
      return {
        type: 'delete',
        children: [currentMdast],
      };
    },
  });

export const inlineCodeDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'inlineCode',
    match: delta => !!delta.attributes?.code,
    toAST: delta => ({
      type: 'inlineCode',
      value: delta.insert,
    }),
  });

export const underlineDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'underline',
    match: delta => !!delta.attributes?.underline,
    toAST: (_, context) => {
      const { current: currentMdast } = context;
      const text = extractTextFromMdast(currentMdast);
      // Use HTML <u> tag for underline since Markdown doesn't have native support
      return {
        type: 'html',
        value: `<u>${text}</u>`,
      } as Html;
    },
  });

// Combined matcher for color and background to handle both together
export const highlightStyleDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'highlight-style',
    match: delta => !!delta.attributes?.color || !!delta.attributes?.background,
    toAST: (delta, context) => {
      const { current: currentMdast } = context;
      const color = delta.attributes?.color;
      const background = delta.attributes?.background;

      if (!color && !background) {
        return currentMdast;
      }

      const text = extractTextFromMdast(currentMdast);
      const styles: string[] = [];

      if (color) {
        styles.push(`color:${color}`);
      }
      if (background) {
        styles.push(`background-color:${background}`);
      }

      return {
        type: 'html',
        value: `<span style="${styles.join(';')}">${text}</span>`,
      } as Html;
    },
  });

export const InlineDeltaToMarkdownAdapterExtensions = [
  inlineCodeDeltaToMarkdownAdapterMatcher,
  boldDeltaToMarkdownAdapterMatcher,
  italicDeltaToMarkdownAdapterMatcher,
  strikeDeltaToMarkdownAdapterMatcher,
  underlineDeltaToMarkdownAdapterMatcher,
  highlightStyleDeltaToMarkdownAdapterMatcher,
];
