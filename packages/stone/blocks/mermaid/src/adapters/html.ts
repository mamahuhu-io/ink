import { MermaidBlockSchema } from '@ink/stone-model';
import {
  BlockHtmlAdapterExtension,
  type BlockHtmlAdapterMatcher,
  type HtmlAST,
} from '@ink/stone-shared/adapters';
import { nanoid } from '@ink/stone-store';

const isMermaidNode = (node: HtmlAST) =>
  node.type === 'element' &&
  node.tagName === 'pre' &&
  node.properties?.className?.includes('mermaid');

export const mermaidBlockHtmlAdapterMatcher: BlockHtmlAdapterMatcher = {
  flavour: MermaidBlockSchema.model.flavour,
  toMatch: (o) => isMermaidNode(o.node),
  fromMatch: (o) => o.node.flavour === MermaidBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      const node = o.node as HtmlAST;
      let code = '';

      if (node.type === 'element' && node.children) {
        const codeNode = node.children.find(
          (child: HtmlAST) => child.type === 'element' && child.tagName === 'code',
        );
        if (codeNode && codeNode.type === 'element' && codeNode.children) {
          const textNode = codeNode.children.find((child: HtmlAST) => child.type === 'text');
          if (textNode && textNode.type === 'text') {
            code = textNode.value || '';
          }
        }
      }

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
            type: 'element',
            tagName: 'pre',
            properties: {
              className: ['mermaid'],
            },
            children: [
              {
                type: 'element',
                tagName: 'code',
                children: [
                  {
                    type: 'text',
                    value: code,
                  },
                ],
              },
            ],
          },
          'children',
        )
        .closeNode();
    },
  },
};

export const MermaidBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  mermaidBlockHtmlAdapterMatcher,
);
