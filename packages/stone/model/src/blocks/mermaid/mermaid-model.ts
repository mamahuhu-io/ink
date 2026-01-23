import {
  type GfxCommonBlockProps,
  GfxCompatible,
  type GfxElementGeometry,
} from '@ink/stone-std/gfx';
import {
  BlockModel,
  BlockSchemaExtension,
  defineBlockSchema,
} from '@ink/stone-store';

export type MermaidProps = {
  code: string;
  diagramType: string | null;
  theme: 'auto' | 'light' | 'dark';
  caption: string;
  scale: number;
  showDiagramType: boolean;
  comments?: Record<string, boolean>;
} & GfxCommonBlockProps;

export const MermaidBlockSchema = defineBlockSchema({
  flavour: 'ink:mermaid',
  props: (): MermaidProps => ({
    xywh: '[0,0,16,16]',
    index: 'a0',
    lockedBySelf: false,
    scale: 1,
    rotate: 0,
    code: '',
    diagramType: null,
    theme: 'auto',
    caption: '',
    showDiagramType: true,
    comments: undefined,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: [
      'ink:note',
      'ink:edgeless-text',
      'ink:paragraph',
      'ink:list',
    ],
  },
  toModel: () => {
    return new MermaidBlockModel();
  },
});

export const MermaidBlockSchemaExtension = BlockSchemaExtension(MermaidBlockSchema);

export class MermaidBlockModel
  extends GfxCompatible<MermaidProps>(BlockModel)
  implements GfxElementGeometry {}
