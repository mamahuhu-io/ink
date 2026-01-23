import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { effects } from './effects.js';
import { ListKeymapExtension, ListTextKeymapExtension } from './list-keymap.js';
import { ListMarkdownExtension } from './markdown.js';

export class ListViewExtension extends ViewExtensionProvider {
  override name = 'ink-list-block';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('ink:list'),
      BlockViewExtension('ink:list', literal`ink-list`),
      ListKeymapExtension,
      ListTextKeymapExtension,
      ListMarkdownExtension,
    ]);
  }
}
