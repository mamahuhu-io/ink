import {
  BlockModel,
  BlockSchemaExtension,
  defineBlockSchema,
} from '@ink/stone-store';

export type SurfaceRefProps = {
  reference: string;
  caption: string;
  refFlavour: string;
  comments?: Record<string, boolean>;
};

export const SurfaceRefBlockSchema = defineBlockSchema({
  flavour: 'ink:surface-ref',
  props: (): SurfaceRefProps => ({
    reference: '',
    caption: '',
    refFlavour: '',
    comments: undefined,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: ['ink:note', 'ink:paragraph', 'ink:list'],
  },
  toModel: () => new SurfaceRefBlockModel(),
});

export const SurfaceRefBlockSchemaExtension = BlockSchemaExtension(
  SurfaceRefBlockSchema
);

export class SurfaceRefBlockModel extends BlockModel<SurfaceRefProps> {}
