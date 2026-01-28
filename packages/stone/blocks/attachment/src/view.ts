import { type ViewExtensionContext, ViewExtensionProvider } from '@ink/stone-ext-loader';
import { AttachmentBlockSchema } from '@ink/stone-model';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import { literal } from 'lit/static-html.js';

import { AttachmentDropOption } from './attachment-service.js';
import { attachmentSlashMenuConfig } from './configs/slash-menu.js';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { effects } from './effects.js';
import { AttachmentEmbedConfigExtension, AttachmentEmbedService } from './embed';

const flavour = AttachmentBlockSchema.model.flavour;

export class AttachmentViewExtension extends ViewExtensionProvider {
  override name = 'ink-attachment-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension(flavour),
      BlockViewExtension(flavour, () => {
        return literal`ink-attachment`;
      }),
      AttachmentDropOption,
      AttachmentEmbedConfigExtension(),
      AttachmentEmbedService,
      SlashMenuConfigExtension(flavour, attachmentSlashMenuConfig),
      ...createBuiltinToolbarConfigExtension(flavour),
    ]);
  }
}
