import { ViewExtensionProvider } from '@ink/stone-ext-loader';

import { effects } from './effects';

export class OutlineViewExtension extends ViewExtensionProvider {
  override name = 'ink-outline-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
