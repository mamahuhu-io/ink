import { DividerBlockSchema } from '@ink/stone-model';
import {
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
  type MarkdownAST,
} from '@ink/stone-shared/adapters';
import { nanoid } from '@ink/stone-store';
import type { ThematicBreak } from 'mdast';

const isDividerNode = (node: MarkdownAST): node is ThematicBreak => node.type === 'thematicBreak';

export const dividerBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher = {
  flavour: DividerBlockSchema.model.flavour,
  toMatch: (o) => isDividerNode(o.node),
  fromMatch: (o) => o.node.flavour === DividerBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (_, context) => {
      const { walkerContext } = context;
      walkerContext
        .openNode(
          {
            type: 'block',
            id: nanoid(),
            flavour: 'ink:divider',
            props: {},
            children: [],
          },
          'children',
        )
        .closeNode();
    },
  },
  fromBlockSnapshot: {
    enter: (_, context) => {
      const { walkerContext } = context;
      walkerContext
        .openNode(
          {
            type: 'thematicBreak',
          },
          'children',
        )
        .closeNode();
    },
  },
};

export const DividerBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  dividerBlockMarkdownAdapterMatcher,
);
