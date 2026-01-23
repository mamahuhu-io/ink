import { ImageBlockSchema } from '@ink/stone-model';
import { SlashMenuConfigExtension } from '@ink/stone-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { literal } from 'lit/static-html.js';

import { imageSlashMenuConfig } from './configs/slash-menu';
import { ImageEdgelessBlockInteraction } from './image-edgeless-block';
import { ImageDropOption } from './image-service';

export const ImageBlockFlavour = ImageBlockSchema.model.flavour;

// Note: Toolbar config is registered separately in view.ts setup() for proper i18n support
export const ImageBlockSpec: ExtensionType[] = [
  FlavourExtension(ImageBlockFlavour),
  BlockViewExtension(ImageBlockFlavour, model => {
    const parent = model.store.getParent(model.id);

    if (parent?.flavour === 'ink:surface') {
      return literal`ink-edgeless-image`;
    }

    return literal`ink-image`;
  }),
  ImageDropOption,
  ImageEdgelessBlockInteraction,
  SlashMenuConfigExtension(ImageBlockFlavour, imageSlashMenuConfig),
].flat();
