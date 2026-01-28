import { BlockModel, BlockSchemaExtension, defineBlockSchema, type Text } from '@ink/stone-store';

import type { BlockMeta } from '../../utils/types';

type CodeBlockProps = {
  text: Text;
  language: string | null;
  wrap: boolean;
  caption: string;
  preview?: boolean;
  lineNumber?: boolean;
  comments?: Record<string, boolean>;
} & BlockMeta;

export const CodeBlockSchema = defineBlockSchema({
  flavour: 'ink:code',
  props: (internal) =>
    ({
      text: internal.Text(),
      language: null,
      wrap: false,
      caption: '',
      preview: undefined,
      lineNumber: undefined,
      comments: undefined,
      'meta:createdAt': undefined,
      'meta:createdBy': undefined,
      'meta:updatedAt': undefined,
      'meta:updatedBy': undefined,
    }) as CodeBlockProps,
  metadata: {
    version: 1,
    role: 'content',
    parent: ['ink:note', 'ink:paragraph', 'ink:list', 'ink:edgeless-text'],
    children: [],
  },
  toModel: () => new CodeBlockModel(),
});

export const CodeBlockSchemaExtension = BlockSchemaExtension(CodeBlockSchema);

export class CodeBlockModel extends BlockModel<CodeBlockProps> {}
