import {
  type TableBlockPropsSerialized,
  TableBlockSchema,
  type TableColumn,
  TableModelFlavour,
} from '@ink/stone-model';
import {
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
  type MarkdownAST,
} from '@ink/stone-shared/adapters';
import { nanoid } from '@ink/stone-store';
import type { Table, TableRow } from 'mdast';

import { parseTableFromMarkdown, processTable } from './utils';

const TABLE_NODE_TYPES = new Set(['table', 'tableRow']);

const isTableNode = (node: MarkdownAST) => TABLE_NODE_TYPES.has(node.type);

type AlignType = 'left' | 'right' | 'center' | null;

const getColumnAligns = (columns: Record<string, TableColumn>): AlignType[] => {
  const sortedColumns = Object.values(columns).sort((a, b) => a.order.localeCompare(b.order));
  return sortedColumns.map((col) => (col.textAlign as AlignType) ?? null);
};

export const tableBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher = {
  flavour: TableBlockSchema.model.flavour,
  toMatch: (o) => isTableNode(o.node),
  fromMatch: (o) => o.node.flavour === TableBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      const { walkerContext } = context;
      if (o.node.type === 'table') {
        const astToDelta = context.deltaConverter.astToDelta.bind(context.deltaConverter);
        walkerContext.openNode(
          {
            type: 'block',
            id: nanoid(),
            flavour: TableModelFlavour,
            props: parseTableFromMarkdown(o.node, astToDelta),
            children: [],
          },
          'children',
        );
        walkerContext.skipAllChildren();
      }
    },
    leave: (o, context) => {
      const { walkerContext } = context;
      if (o.node.type === 'table') {
        walkerContext.closeNode();
      }
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      const { walkerContext, deltaConverter } = context;
      const { columns, rows, cells } = o.node.props as unknown as TableBlockPropsSerialized;
      const table = processTable(columns, rows, cells);
      const result: TableRow[] = [];
      table.rows.forEach((v) => {
        result.push({
          type: 'tableRow',
          children: v.cells.map((v) => ({
            type: 'tableCell',
            children: deltaConverter.deltaToAST(v.value.delta),
          })),
        });
      });

      const align = getColumnAligns(columns);

      walkerContext
        .openNode({
          type: 'table',
          align,
          children: result,
        } as Table)
        .closeNode();

      walkerContext.skipAllChildren();
    },
  },
};

export const TableBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  tableBlockMarkdownAdapterMatcher,
);
