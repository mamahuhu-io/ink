import {
  type MarkdownAdapterPreprocessor,
  MarkdownPreprocessorExtension,
} from '@ink/stone-shared/adapters';

/**
 * Preprocess the content to protect Mermaid code blocks
 * @param content - The content to preprocess
 * @returns The preprocessed content
 */
function preprocessMermaid(content: string) {
  // Mermaid code blocks are already handled by the markdown parser
  // This preprocessor is mainly for consistency with other block types
  return content;
}

const mermaidPreprocessor: MarkdownAdapterPreprocessor = {
  name: 'mermaid',
  levels: ['block', 'slice', 'doc'],
  preprocess: content => {
    return preprocessMermaid(content);
  },
};

export const MermaidMarkdownPreprocessorExtension =
  MarkdownPreprocessorExtension(mermaidPreprocessor);
