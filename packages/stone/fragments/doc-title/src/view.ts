import { ViewExtensionProvider } from '@ink/stone-ext-loader';

import { effects } from './effects';

export class DocTitleViewExtension extends ViewExtensionProvider {
  override name = 'ink-doc-title-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
