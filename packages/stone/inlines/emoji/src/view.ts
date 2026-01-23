import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';

import { effects } from './effects';
import { EmojiInlineSpecExtension } from './inline-spec';

export class EmojiViewExtension extends ViewExtensionProvider {
  override name = 'ink-emoji-inline';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register(EmojiInlineSpecExtension);
  }
}
