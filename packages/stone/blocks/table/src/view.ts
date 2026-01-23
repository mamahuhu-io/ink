import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { TableModelFlavour } from '@ink/stone-model';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { tableSlashMenuConfig } from './configs/slash-menu';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { effects } from './effects';

export class TableViewExtension extends ViewExtensionProvider {
  override name = 'ink-table-block';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension(TableModelFlavour),
      BlockViewExtension(TableModelFlavour, literal`ink-table`),
      SlashMenuConfigExtension(TableModelFlavour, tableSlashMenuConfig),
      ...createBuiltinToolbarConfigExtension(TableModelFlavour),
    ]);
  }
}
