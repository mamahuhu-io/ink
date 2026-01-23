import { createLitPortal } from '@ink/stone-components/portal';
import { AttachmentBlockModel } from '@ink/stone-model';
import {
  type ToolbarAction,
  type ToolbarModuleConfig,
  ToolbarModuleExtension,
} from '@ink/stone-shared/services';
import { getBlockProps } from '@ink/stone-shared/utils';
import {
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  ReplaceIcon,
  ResetIcon,
} from '@ink/stone-icons/lit';
import { BlockFlavourIdentifier } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { flip, offset } from '@floating-ui/dom';
import { html } from 'lit';

import { AttachmentBlockComponent } from '../attachment-block';
import { RenameModal } from '../components/rename-model';
import { t } from './i18n';

const trackBaseProps = {
  category: 'attachment',
  type: 'card view',
};

export const createBuiltinToolbarConfigExtension = (
  flavour: string
): ExtensionType[] => {
  const replaceAction = {
    id: 'b.replace',
    tooltip: t('editor.attachment.replaceAttachment', 'Replace attachment'),
    icon: ReplaceIcon(),
    disabled(ctx) {
      const block = ctx.getCurrentBlockByType(AttachmentBlockComponent);
      if (!block) return true;

      const { uploading = false } = block.resourceController.state$.value;
      return uploading;
    },
    run(ctx) {
      const block = ctx.getCurrentBlockByType(AttachmentBlockComponent);
      block?.replace().catch(console.error);
    },
  } as const satisfies ToolbarAction;

  const builtinToolbarConfig = {
    actions: [
      {
        id: 'a.rename',
        content(ctx) {
          const block = ctx.getCurrentBlockByType(AttachmentBlockComponent);
          if (!block) return null;

          const abortController = new AbortController();
          abortController.signal.onabort = () => ctx.show();

          return html`
            <editor-icon-button
              aria-label="${t('editor.attachment.rename', 'Rename')}"
              .tooltip="${t('editor.attachment.rename', 'Rename')}"
              @click=${() => {
                ctx.hide();

                createLitPortal({
                  template: RenameModal({
                    model: block.model,
                    editorHost: ctx.host,
                    abortController,
                  }),
                  computePosition: {
                    referenceElement: block,
                    placement: 'top-start',
                    middleware: [flip(), offset(4)],
                  },
                  abortController,
                });
              }}
            >
              ${EditIcon()}
            </editor-icon-button>
          `;
        },
      },
      replaceAction,
      {
        id: 'c.copy',
        tooltip: t('editor.clipboard.copy', 'Copy'),
        icon: CopyIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(AttachmentBlockComponent);
          block?.copy();
        },
      },
      {
        id: 'd.duplicate',
        tooltip: t('editor.clipboard.duplicate', 'Duplicate'),
        icon: DuplicateIcon(),
        run(ctx) {
          const model = ctx.getCurrentModelByType(AttachmentBlockModel);
          if (!model) return;

          ctx.store.addSiblingBlocks(model, [
            {
              flavour: model.flavour,
              ...getBlockProps(model),
            },
          ]);
        },
      },
      {
        id: 'e.reload',
        tooltip: t('editor.attachment.reload', 'Reload'),
        icon: ResetIcon(),
        run(ctx) {
          const block = ctx.getCurrentBlockByType(AttachmentBlockComponent);
          block?.reload();

          ctx.track('AttachmentReloadedEvent', {
            ...trackBaseProps,
            control: 'reload',
            type: block?.model.props.name.split('.').pop() ?? '',
          });
        },
      },
      {
        id: 'f.delete',
        tooltip: t('editor.toolbarAction.delete', 'Delete'),
        icon: DeleteIcon(),
        run(ctx) {
          const model = ctx.getCurrentModel();
          if (!model) return;

          ctx.store.deleteBlock(model.id);

          ctx.select('note');
          ctx.reset();
        },
      },
    ],
  } as const satisfies ToolbarModuleConfig;

  return [
    ToolbarModuleExtension({
      id: BlockFlavourIdentifier(flavour),
      config: builtinToolbarConfig,
    }),
  ];
};
