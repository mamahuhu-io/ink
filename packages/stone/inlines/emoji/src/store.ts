import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';

import {
  emojiDeltaToHtmlAdapterMatcher,
  emojiDeltaToMarkdownAdapterMatcher,
  emojiDeltaToPlainTextAdapterMatcher,
} from './adapters';

export class EmojiStoreExtension extends StoreExtensionProvider {
  override name = 'ink-emoji-inline';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(emojiDeltaToMarkdownAdapterMatcher);
    context.register(emojiDeltaToHtmlAdapterMatcher);
    context.register(emojiDeltaToPlainTextAdapterMatcher);
  }
}
