import { InlineDeltaToMarkdownAdapterExtension } from '@ink/stone-shared/adapters';
import type { PhrasingContent } from 'mdast';

export const emojiDeltaToMarkdownAdapterMatcher =
  InlineDeltaToMarkdownAdapterExtension({
    name: 'emoji',
    match: delta => typeof delta.attributes?.emoji === 'string',
    toAST: delta => {
      const emoji = delta.attributes?.emoji;
      if (!emoji) {
        return { type: 'text', value: '' };
      }
      const mdast: PhrasingContent = {
        type: 'text',
        value: emoji,
      };
      return mdast;
    },
  });
