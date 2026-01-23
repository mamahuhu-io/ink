import { MermaidBlockSchema } from '@ink/stone-model';
import {
  BlockPlainTextAdapterExtension,
  type BlockPlainTextAdapterMatcher,
} from '@ink/stone-shared/adapters';

const mermaidPrefix = 'Mermaid Diagram';

export const mermaidBlockPlainTextAdapterMatcher: BlockPlainTextAdapterMatcher = {
  flavour: MermaidBlockSchema.model.flavour,
  toMatch: () => false,
  fromMatch: o => o.node.flavour === MermaidBlockSchema.model.flavour,
  toBlockSnapshot: {},
  fromBlockSnapshot: {
    enter: (o, context) => {
      const code =
        'code' in o.node.props ? (o.node.props.code as string) : '';
      const diagramType =
        'diagramType' in o.node.props ? (o.node.props.diagramType as string | null) : null;

      const { textBuffer } = context;
      if (code) {
        const typeLabel = diagramType ? `: ${diagramType}` : '';
        textBuffer.content += `${mermaidPrefix}${typeLabel}\n${code}`;
        textBuffer.content += '\n';
      }
    },
  },
};

export const MermaidBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(mermaidBlockPlainTextAdapterMatcher);
