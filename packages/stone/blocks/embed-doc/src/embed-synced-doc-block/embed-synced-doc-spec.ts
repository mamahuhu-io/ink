import { EmbedSyncedDocBlockSchema } from '@ink/stone-model';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { literal } from 'lit/static-html.js';

import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { HeightInitializationExtension } from './init-height-extension';

const flavour = EmbedSyncedDocBlockSchema.model.flavour;

export const EmbedSyncedDocViewExtensions: ExtensionType[] = [
  FlavourExtension(flavour),
  BlockViewExtension(flavour, model => {
    return model.parent?.flavour === 'ink:surface'
      ? literal`ink-embed-edgeless-synced-doc-block`
      : literal`ink-embed-synced-doc-block`;
  }),
  createBuiltinToolbarConfigExtension(flavour),
  HeightInitializationExtension,
].flat();
