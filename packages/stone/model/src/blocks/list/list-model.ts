import type { Text } from '@ink/stone-store';
import { BlockModel, BlockSchemaExtension, defineBlockSchema } from '@ink/stone-store';

import type { TextAlign } from '../../consts';
import type { BlockMeta } from '../../utils/types';

// `toggle` type has been deprecated, do not use it
export type ListType = 'bulleted' | 'numbered' | 'todo' | 'toggle';

export type ListProps = {
  type: ListType;
  text: Text;
  textAlign?: TextAlign;
  checked: boolean;
  collapsed: boolean;
  order: number | null;
  comments?: Record<string, boolean>;
} & BlockMeta;

export const ListBlockSchema = defineBlockSchema({
  flavour: 'ink:list',
  props: (internal) =>
    ({
      type: 'bulleted',
      text: internal.Text(),
      textAlign: undefined,
      checked: false,
      collapsed: false,

      // number type only for numbered list
      order: null,
      comments: undefined,
      'meta:createdAt': undefined,
      'meta:createdBy': undefined,
      'meta:updatedAt': undefined,
      'meta:updatedBy': undefined,
    }) as ListProps,
  metadata: {
    version: 1,
    role: 'content',
    parent: ['ink:note', 'ink:database', 'ink:list', 'ink:paragraph', 'ink:edgeless-text'],
  },
  toModel: () => new ListBlockModel(),
});

export const ListBlockSchemaExtension = BlockSchemaExtension(ListBlockSchema);

export class ListBlockModel extends BlockModel<ListProps> {}
