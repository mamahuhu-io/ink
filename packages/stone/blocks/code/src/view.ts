import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import {
  BlockViewExtension,
  FlavourExtension,
  WidgetViewExtension,
} from '@ink/stone-std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { getCodeClipboardExtensions } from './clipboard/index.js';
import { CodeBlockConfigExtension } from './code-block-config';
import {
  CodeBlockInlineManagerExtension,
  CodeBlockUnitSpecExtension,
} from './code-block-inline.js';
import { CodeBlockHighlighter } from './code-block-service.js';
import { CodeKeymapExtension } from './code-keymap.js';
import { INK_CODE_TOOLBAR_WIDGET } from './code-toolbar/index.js';
import { codeSlashMenuConfig } from './configs/slash-menu.js';
import { effects } from './effects.js';
import { CodeBlockMarkdownExtension } from './markdown.js';
import { MermaidPreviewExtension } from './mermaid-preview.js';

const codeToolbarWidget = WidgetViewExtension(
  'ink:code',
  INK_CODE_TOOLBAR_WIDGET,
  literal`${unsafeStatic(INK_CODE_TOOLBAR_WIDGET)}`
);

export class CodeBlockViewExtension extends ViewExtensionProvider {
  override name = 'ink-code-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('ink:code'),
      CodeBlockHighlighter,
      BlockViewExtension('ink:code', literal`ink-code`),
      SlashMenuConfigExtension('ink:code', codeSlashMenuConfig),
      CodeKeymapExtension,
      CodeBlockMarkdownExtension,
      ...getCodeClipboardExtensions(),
      MermaidPreviewExtension,
    ]);
    context.register([
      CodeBlockInlineManagerExtension,
      CodeBlockUnitSpecExtension,
    ]);
    if (!this.isMobile(context.scope)) {
      context.register(codeToolbarWidget);
    } else {
      context.register(
        CodeBlockConfigExtension({
          showLineNumbers: false,
        })
      );
    }
  }
}
