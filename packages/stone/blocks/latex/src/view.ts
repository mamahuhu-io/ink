import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import { BlockViewExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { latexSlashMenuConfig } from './configs/slash-menu';
import { effects } from './effects';

export class LatexViewExtension extends ViewExtensionProvider {
  override name = 'ink-latex-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      BlockViewExtension('ink:latex', literal`ink-latex`),
      SlashMenuConfigExtension('ink:latex', latexSlashMenuConfig),
    ]);
  }
}
