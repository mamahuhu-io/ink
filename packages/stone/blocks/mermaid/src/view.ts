import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { mermaidSlashMenuConfig } from './configs/slash-menu.js';
import { effects } from './effects.js';
import { MermaidBlockService } from './mermaid-block-service.js';
import { MermaidEditorInlineManagerExtension } from './mermaid-editor-menu.js';
import { MermaidEditorUnitSpecExtension } from './inline-spec.js';

export class MermaidBlockViewExtension extends ViewExtensionProvider {
  override name = 'ink-mermaid-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('ink:mermaid'),
      MermaidBlockService,
      MermaidEditorUnitSpecExtension,
      MermaidEditorInlineManagerExtension,
      BlockViewExtension('ink:mermaid', literal`ink-mermaid`),
      SlashMenuConfigExtension('ink:mermaid', mermaidSlashMenuConfig),
    ]);
  }
}
