import type { InlineHtmlAST } from '@ink/stone-shared/adapters';
import { InlineDeltaToHtmlAdapterExtension } from '@ink/stone-shared/adapters';

export const emojiDeltaToHtmlAdapterMatcher = InlineDeltaToHtmlAdapterExtension({
  name: 'emoji',
  match: (delta) => typeof delta.attributes?.emoji === 'string',
  toAST: (delta) => {
    const emoji = delta.attributes?.emoji;
    if (!emoji) {
      return { type: 'text', value: '' };
    }
    const hast: InlineHtmlAST = {
      type: 'element',
      tagName: 'span',
      properties: {
        class: 'emoji',
      },
      children: [{ type: 'text', value: emoji }],
    };
    return hast;
  },
});
