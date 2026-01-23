import {
  CopyIcon,
  DeleteIcon,
  DuplicateIcon,
} from '@ink/stone-components/icons';
import type { MenuItemGroup } from '@ink/stone-components/toolbar';
import { CommentProviderIdentifier } from '@ink/stone-shared/services';
import { isInsidePageEditor } from '@ink/stone-shared/utils';
import { noop, sleep } from '@ink/stone-global/utils';
import { CommentIcon } from '@ink/stone-icons/lit';
import { BlockSelection } from '@ink/stone-std';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { CodeBlockToolbarContext } from './context.js';
import { duplicateCodeBlock } from './utils.js';
import { t } from '../configs/i18n.js';

export const getPrimaryGroups = (): MenuItemGroup<CodeBlockToolbarContext>[] => [
  {
    type: 'primary',
    items: [
      {
        type: 'change-lang',
        generate: ({ blockComponent, setActive }) => {
          const state = { active: false };
          return {
            action: noop,
            render: () =>
              html`<language-list-button
                .blockComponent=${blockComponent}
                .onActiveStatusChange=${async (active: boolean) => {
                  state.active = active;
                  if (!active) {
                    await sleep(1000);
                    if (state.active) return;
                  }
                  setActive(active);
                }}
              >
              </language-list-button>`,
          };
        },
      },
      {
        type: 'preview',
        generate: ({ blockComponent }) => {
          return {
            action: noop,
            render: () => html`
              <preview-button .blockComponent=${blockComponent}>
              </preview-button>
            `,
          };
        },
      },
      {
        type: 'copy-code',
        label: t('editor.code.copy', 'Copy code'),
        icon: CopyIcon,
        generate: ({ blockComponent }) => {
          return {
            action: () => {
              blockComponent.copyCode();
            },
            render: item => html`
              <editor-icon-button
                class="code-toolbar-button copy-code"
                aria-label=${ifDefined(item.label)}
                .tooltip=${item.label}
                .tooltipOffset=${4}
                .iconSize=${'16px'}
                .iconContainerPadding=${4}
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  item.action();
                }}
              >
                ${item.icon}
              </editor-icon-button>
            `,
          };
        },
      },
      {
        type: 'comment',
        label: t('editor.code.comment', 'Comment'),
        tooltip: t('editor.code.comment', 'Comment'),
        icon: CommentIcon({
          width: '20',
          height: '20',
        }),
        when: ({ std }) => !!std.getOptional(CommentProviderIdentifier),
        generate: ({ blockComponent }) => {
          return {
            action: () => {
              const commentProvider = blockComponent.std.getOptional(
                CommentProviderIdentifier
              );
              if (!commentProvider) return;

              commentProvider.addComment([
                new BlockSelection({
                  blockId: blockComponent.model.id,
                }),
              ]);
            },
            render: item =>
              html`<editor-icon-button
                class="code-toolbar-button comment"
                aria-label=${ifDefined(item.label)}
                .tooltip=${item.label}
                .tooltipOffset=${4}
                .iconSize=${'16px'}
                .iconContainerPadding=${4}
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  item.action();
                }}
              >
                ${item.icon}
              </editor-icon-button>`,
          };
        },
      },
      {
        type: 'duplicate',
        label: t('editor.code.duplicate', 'Duplicate'),
        icon: DuplicateIcon,
        when: ({ doc }) => !doc.readonly,
        generate: ({ host, blockComponent, close }) => {
          return {
            action: () => {
              const codeId = duplicateCodeBlock(blockComponent.model);

              host.updateComplete
                .then(() => {
                  host.selection.setGroup('note', [
                    host.selection.create(BlockSelection, {
                      blockId: codeId,
                    }),
                  ]);

                  if (isInsidePageEditor(host)) {
                    const duplicateElement = host.view.getBlock(codeId);
                    if (duplicateElement) {
                      duplicateElement.scrollIntoView({ block: 'nearest' });
                    }
                  }
                })
                .catch(console.error);

              close();
            },
            render: item => html`
              <editor-icon-button
                class="code-toolbar-button duplicate"
                aria-label=${ifDefined(item.label)}
                .tooltip=${item.label}
                .tooltipOffset=${4}
                .iconSize=${'16px'}
                .iconContainerPadding=${4}
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  item.action();
                }}
              >
                ${item.icon}
              </editor-icon-button>
            `,
          };
        },
      },
      {
        type: 'delete',
        label: t('editor.code.delete', 'Delete'),
        icon: DeleteIcon,
        when: ({ doc }) => !doc.readonly,
        generate: ({ doc, blockComponent, close }) => {
          return {
            action: () => {
              doc.deleteBlock(blockComponent.model);
              close();
            },
            render: item => html`
              <editor-icon-button
                class="code-toolbar-button delete"
                aria-label=${ifDefined(item.label)}
                .tooltip=${item.label}
                .tooltipOffset=${4}
                .iconSize=${'16px'}
                .iconContainerPadding=${4}
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  item.action();
                }}
              >
                ${item.icon}
              </editor-icon-button>
            `,
          };
        },
      },
    ],
  },
];

export const getMoreGroups = (): MenuItemGroup<CodeBlockToolbarContext>[] => [];
