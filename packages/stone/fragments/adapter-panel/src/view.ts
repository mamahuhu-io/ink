import { ViewExtensionProvider } from '@ink/stone-ext-loader';

import { effects } from './effects';

export class AdapterPanelViewExtension extends ViewExtensionProvider {
  override name = 'ink-adapter-panel-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
