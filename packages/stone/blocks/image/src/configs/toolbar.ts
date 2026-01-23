import { ImageBlockModel } from '@ink/stone-model';
import {
  blockCommentToolbarButton,
  type ToolbarModuleConfig,
  ToolbarModuleExtension,
} from '@ink/stone-shared/services';
import {
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
} from '@ink/stone-icons/lit';
import { BlockFlavourIdentifier } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';

import { ImageBlockComponent } from '../image-block';
import { ImageEdgelessBlockComponent } from '../image-edgeless-block';
import { duplicate } from '../utils';
import { t } from './i18n';

export const createBuiltinToolbarConfigExtension = (
  flavour: string
): ExtensionType[] => {
  const name = flavour.split(':').pop();

  const builtinToolbarConfig = {
    actions: [
      {
        id: 'a.copy',
        tooltip: t('editor.clipboard.copy', 'Copy'),
        icon: CopyIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageBlockComponent);
          block?.copy();
        },
      },
      {
        id: 'b.duplicate',
        tooltip: t('editor.clipboard.duplicate', 'Duplicate'),
        icon: DuplicateIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageBlockComponent);
          if (!block) return;

          duplicate(block);
        },
      },
      {
        id: 'c.delete',
        tooltip: t('editor.toolbarAction.delete', 'Delete'),
        icon: DeleteIcon(),
        variant: 'destructive',
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageBlockComponent);
          if (!block) return;

          ctx.store.deleteBlock(block.model);
        },
      },
      {
        id: 'd.comment',
        ...blockCommentToolbarButton,
      },
    ],

    placement: 'inner',
  } as const satisfies ToolbarModuleConfig;

  const builtinSurfaceToolbarConfig = {
    actions: [
      {
        id: 'a.copy',
        tooltip: t('editor.clipboard.copy', 'Copy'),
        icon: CopyIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageEdgelessBlockComponent);
          block?.copy();
        },
      },
      {
        id: 'b.duplicate',
        tooltip: t('editor.clipboard.duplicate', 'Duplicate'),
        icon: DuplicateIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageEdgelessBlockComponent);
          if (!block) return;

          duplicate(block);
        },
      },
      {
        id: 'c.delete',
        tooltip: t('editor.toolbarAction.delete', 'Delete'),
        icon: DeleteIcon(),
        variant: 'destructive',
        run(ctx) {
          const block = ctx.getCurrentBlockByType(ImageEdgelessBlockComponent);
          if (!block) return;

          ctx.store.deleteBlock(block.model);
        },
      },
    ],

    when: ctx => ctx.getSurfaceModelsByType(ImageBlockModel).length === 1,
  } as const satisfies ToolbarModuleConfig;

  return [
    ToolbarModuleExtension({
      id: BlockFlavourIdentifier(flavour),
      config: builtinToolbarConfig,
    }),

    ToolbarModuleExtension({
      id: BlockFlavourIdentifier(`ink:surface:${name}`),
      config: builtinSurfaceToolbarConfig,
    }),
  ];
};
