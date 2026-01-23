import { BlockSchemaExtension, defineBlockSchema } from '@ink/stone-store';

import { defaultEmbedIframeProps, EmbedIframeBlockModel } from './iframe-model';

export const EmbedIframeBlockSchema = defineBlockSchema({
  flavour: 'ink:embed-iframe',
  props: () => defaultEmbedIframeProps,
  metadata: {
    version: 1,
    role: 'content',
  },
  toModel: () => new EmbedIframeBlockModel(),
});

export const EmbedIframeBlockSchemaExtension = BlockSchemaExtension(
  EmbedIframeBlockSchema
);
