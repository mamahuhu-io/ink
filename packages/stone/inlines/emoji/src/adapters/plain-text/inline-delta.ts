import {
  InlineDeltaToPlainTextAdapterExtension,
  type TextBuffer,
} from '@ink/stone-shared/adapters';

export const emojiDeltaToPlainTextAdapterMatcher =
  InlineDeltaToPlainTextAdapterExtension({
    name: 'emoji',
    match: delta => typeof delta.attributes?.emoji === 'string',
    toAST: delta => {
      const emoji = delta.attributes?.emoji;
      const node: TextBuffer = {
        content: emoji || '',
      };
      return node;
    },
  });
