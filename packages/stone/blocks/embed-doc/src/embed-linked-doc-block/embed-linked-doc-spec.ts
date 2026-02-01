import { EmbedLinkedDocBlockSchema } from '@ink/stone-model';
import { BlockViewExtension } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { literal } from 'lit/static-html.js';

import { LinkedDocSlashMenuConfigExtension } from './configs/slash-menu';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { EmbedLinkedDocInteraction } from './embed-edgeless-linked-doc-block';

const flavour = EmbedLinkedDocBlockSchema.model.flavour;

export const EmbedLinkedDocViewExtensions: ExtensionType[] = [
  BlockViewExtension(flavour, (model) => {
    return model.parent?.flavour === 'ink:surface'
      ? literal`ink-embed-edgeless-linked-doc-block`
      : literal`ink-embed-linked-doc-block`;
  }),
  createBuiltinToolbarConfigExtension(flavour),
  EmbedLinkedDocInteraction,
  LinkedDocSlashMenuConfigExtension,
].flat();
