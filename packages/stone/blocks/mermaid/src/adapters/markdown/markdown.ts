import { MermaidBlockSchema } from '@ink/stone-model';
import {
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
  type MarkdownAST,
} from '@ink/stone-shared/adapters';
import { nanoid } from '@ink/stone-store';

const isMermaidNode = (node: MarkdownAST) => {
  // Match all code blocks with lang='mermaid'
  // These will be converted to Mermaid blocks for rendering
  return node.type === 'code' && node.lang === 'mermaid';
};

export const mermaidBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher = {
  flavour: MermaidBlockSchema.model.flavour,
  toMatch: (o) => isMermaidNode(o.node),
  fromMatch: (o) => o.node.flavour === MermaidBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      // Skip if this is not a code node with mermaid lang
      if (!isMermaidNode(o.node)) {
        return;
      }

      const code = 'value' in o.node ? o.node.value : '';
      const { walkerContext } = context;

      walkerContext
        .openNode(
          {
            type: 'block',
            id: nanoid(),
            flavour: 'ink:mermaid',
            props: {
              code,
            },
            children: [],
          },
          'children',
        )
        .closeNode();
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      const code = 'code' in o.node.props ? (o.node.props.code as string) : '';
      const { walkerContext } = context;
      walkerContext
        .openNode(
          {
            type: 'code',
            lang: 'mermaid',
            meta: null,
            value: code,
          },
          'children',
        )
        .closeNode();
    },
  },
};

export const MermaidBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  mermaidBlockMarkdownAdapterMatcher,
);
