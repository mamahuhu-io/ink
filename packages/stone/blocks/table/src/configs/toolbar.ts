import { renderToolbarSeparator } from '@ink/stone-components/toolbar';
import {
  DeleteIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@ink/stone-icons/lit';
import { TextAlign } from '@ink/stone-model';
import {
  blockCommentToolbarButton,
  type ToolbarModuleConfig,
  ToolbarModuleExtension,
} from '@ink/stone-shared/services';
import { BlockFlavourIdentifier } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';

import { TableBlockComponent } from '../table-block';
import { t } from './i18n';

const trackBaseProps = {
  category: 'table',
  type: 'block',
};

const setSelectedColumnsTextAlign = (block: TableBlockComponent, textAlign: TextAlign) => {
  const selected = block.selectionController.selected$.value;
  if (!selected) return;

  const columns = block.dataManager.uiColumns$.value;
  let columnIds: string[] = [];

  if (selected.type === 'column') {
    columnIds = [selected.columnId];
  } else if (selected.type === 'area') {
    for (let i = selected.columnStartIndex; i <= selected.columnEndIndex; i++) {
      const column = columns[i];
      if (column) {
        columnIds.push(column.columnId);
      }
    }
  } else if (selected.type === 'row') {
    // 选中行时，修改所有列
    columnIds = columns.map((c) => c.columnId);
  }

  if (columnIds.length > 0) {
    block.model.store.transact(() => {
      columnIds.forEach((columnId) => {
        block.dataManager.setColumnTextAlign(columnId, textAlign);
      });
    });
  }
};

export const createBuiltinToolbarConfigExtension = (flavour: string): ExtensionType[] => {
  const builtinToolbarConfig = {
    actions: [
      {
        id: 'a.1.align-left',
        tooltip: t('editor.align.alignLeft', 'Align left'),
        icon: TextAlignLeftIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(TableBlockComponent);
          if (block) {
            setSelectedColumnsTextAlign(block, TextAlign.Left);
          }
        },
      },
      {
        id: 'a.2.align-center',
        tooltip: t('editor.align.alignCenter', 'Align center'),
        icon: TextAlignCenterIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(TableBlockComponent);
          if (block) {
            setSelectedColumnsTextAlign(block, TextAlign.Center);
          }
        },
      },
      {
        id: 'a.3.align-right',
        tooltip: t('editor.align.alignRight', 'Align right'),
        icon: TextAlignRightIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(TableBlockComponent);
          if (block) {
            setSelectedColumnsTextAlign(block, TextAlign.Right);
          }
        },
      },
      {
        id: 'b.comment',
        ...blockCommentToolbarButton,
      },
      {
        id: 'separator',
        content: renderToolbarSeparator(),
      },
      {
        id: 'b.delete',
        tooltip: t('editor.toolbarAction.deleteTable', 'Delete table'),
        icon: DeleteIcon(),
        variant: 'destructive',
        run(ctx) {
          const block = ctx.getCurrentBlockByType(TableBlockComponent);
          if (!block) return;

          ctx.store.deleteBlock(block.model);

          ctx.track('DeletedTable', {
            ...trackBaseProps,
            control: 'toolbar',
          });
        },
      },
    ],

    placement: 'inner',
  } as const satisfies ToolbarModuleConfig;

  return [
    ToolbarModuleExtension({
      id: BlockFlavourIdentifier(flavour),
      config: builtinToolbarConfig,
    }),
  ];
};
