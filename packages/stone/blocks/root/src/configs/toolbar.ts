// [REMOVED] Database modules - not needed for local markdown editor
// import {
//   convertToDatabase,
//   DATABASE_CONVERT_WHITE_LIST,
// } from '@ink/stone-block-database';
// [REMOVED] Embed modules - not needed for local markdown editor
// import {
//   convertSelectedBlocksToLinkedDoc,
//   getTitleFromSelectedModels,
//   notifyDocCreated,
//   promptDocTitle,
// } from '@ink/stone-block-embed';
import {
  updateBlockAlign,
  updateBlockType,
} from '@ink/stone-block-note';
import type { HighlightType } from '@ink/stone-components/highlight-dropdown-menu';
import { toast } from '@ink/stone-components/toast';
import { EditorChevronDown } from '@ink/stone-components/toolbar';
import {
  deleteTextCommand,
  formatBlockCommand,
  formatNativeCommand,
  formatTextCommand,
  getTextFormatConfigs,
  isFormatSupported,
} from '@ink/stone-inline-preset';
import {
  // [REMOVED] EmbedDoc depends on embed module
  // EmbedLinkedDocBlockSchema,
  // EmbedSyncedDocBlockSchema,
  type TextAlign,
} from '@ink/stone-model';
import {
  getTextAlignConfigs,
  getTextConversionConfigs,
} from '@ink/stone-rich-text';
import {
  copySelectedModelsCommand,
  deleteSelectedModelsCommand,
  draftSelectedModelsCommand,
  duplicateSelectedModelsCommand,
  getBlockSelectionsCommand,
  getImageSelectionsCommand,
  getSelectedBlocksCommand,
  getSelectedModelsCommand,
  getTextSelectionCommand,
} from '@ink/stone-shared/commands';
import type {
  ToolbarAction,
  ToolbarActionGenerator,
  ToolbarActionGroup,
  ToolbarModuleConfig,
} from '@ink/stone-shared/services';
import {
  ActionPlacement,
  blockCommentToolbarButton,
} from '@ink/stone-shared/services';
import { getMostCommonValue } from '@ink/stone-shared/utils';
// [REMOVED] Database modules - not needed for local markdown editor
// import { tableViewMeta } from '@ink/stone-data-view/view-presets';
import {
  CopyIcon,
  // [REMOVED] Database modules - not needed for local markdown editor
  // DatabaseTableViewIcon,
  DeleteIcon,
  DuplicateIcon,
  // [REMOVED] Embed modules - not needed for local markdown editor
  // LinkedPageIcon,
} from '@ink/stone-icons/lit';
import {
  // [REMOVED] These imports no longer needed
  // type BlockComponent,
  BlockSelection,
  // BlockViewIdentifier,
} from '@ink/stone-std';
// [REMOVED] toDraftModel no longer needed
// import { toDraftModel } from '@ink/stone-store';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for toolbar translations
 */
export function setToolbarI18nGetter(getter: (key: string, fallback: string) => string) {
  console.log('[Toolbar] i18n getter set');
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    const result = i18nGetter(key, fallback);
    return result;
  }
  return fallback;
}

const conversionsActionGroup = {
  id: 'a.conversions',
  when: ({ chain }) => isFormatSupported(chain).run()[0],
  generate({ chain }) {
    const textConversionConfigs = getTextConversionConfigs();
    const [ok, { selectedModels = [] }] = chain
      .tryAll(chain => [
        chain.pipe(getTextSelectionCommand),
        chain.pipe(getBlockSelectionsCommand),
      ])
      .pipe(getSelectedModelsCommand, { types: ['text', 'block'] })
      .run();

    // only support model with text
    // TODO(@fundon): displays only in a single paragraph, `length === 1`.
    const allowed = ok && selectedModels.filter(model => model.text).length > 0;
    if (!allowed) return null;

    const model = selectedModels[0];
    const conversion =
      textConversionConfigs.find(
        ({ flavour, type }) =>
          flavour === model.flavour &&
          (type ? 'type' in model.props && type === model.props.type : true)
      ) ?? textConversionConfigs[0];
    const update = (flavour: string, type?: string) => {
      chain
        .pipe(updateBlockType, {
          flavour,
          ...(type && { props: { type } }),
        })
        .run();
    };

    return {
      content: html`
        <editor-menu-button
          .contentPadding="${'8px'}"
          .button=${html`
            <editor-icon-button
              aria-label="Conversions"
              .tooltip="${t('turnInto', 'Turn into')}"
            >
              ${conversion.icon} ${EditorChevronDown}
            </editor-icon-button>
          `}
        >
          <div data-size="large" data-orientation="vertical">
            ${repeat(
              textConversionConfigs.filter(c => c.flavour !== 'ink:divider'),
              item => item.name,
              ({ flavour, type, name, icon }) => html`
                <editor-menu-action
                  aria-label=${name}
                  ?data-selected=${conversion.name === name}
                  @click=${() => update(flavour, type)}
                >
                  ${icon}<span class="label">${name}</span>
                </editor-menu-action>
              `
            )}
          </div>
        </editor-menu-button>
      `,
    };
  },
} as const satisfies ToolbarActionGenerator;

const alignActionGroup = {
  id: 'b.align',
  when: ({ chain }) => isFormatSupported(chain).run()[0],
  generate({ chain }) {
    const textAlignConfigs = getTextAlignConfigs();
    const [ok, { selectedModels = [] }] = chain
      .tryAll(chain => [
        chain.pipe(getTextSelectionCommand),
        chain.pipe(getBlockSelectionsCommand),
      ])
      .pipe(getSelectedModelsCommand, { types: ['text', 'block'] })
      .run();
    if (!ok) return null;

    const alignment =
      textAlignConfigs.find(
        ({ textAlign }) =>
          textAlign ===
          getMostCommonValue(
            selectedModels.map(
              ({ props }) => props as { textAlign?: TextAlign }
            ),
            'textAlign'
          )
      ) ?? textAlignConfigs[0];
    const update = (textAlign: TextAlign) => {
      chain.pipe(updateBlockAlign, { textAlign }).run();
    };

    return {
      content: html`
        <editor-menu-button
          .contentPadding="${'8px'}"
          .button=${html`
            <editor-icon-button aria-label="Align" .tooltip="${t('align', 'Align')}">
              ${alignment.icon} ${EditorChevronDown}
            </editor-icon-button>
          `}
        >
          <div data-size="large" data-orientation="vertical">
            ${repeat(
              textAlignConfigs,
              item => item.name,
              ({ textAlign, name, icon }) => html`
                <editor-menu-action
                  aria-label=${name}
                  @click=${() => update(textAlign)}
                >
                  ${icon}<span class="label">${name}</span>
                </editor-menu-action>
              `
            )}
          </div>
        </editor-menu-button>
      `,
    };
  },
} as const satisfies ToolbarActionGenerator;

const inlineTextActionGroup = {
  id: 'b.inline-text',
  when: ({ chain }) => isFormatSupported(chain).run()[0],
  get actions() {
    return getTextFormatConfigs().map(
      ({ id, name, action, activeWhen, icon }, score) => {
        return {
          id,
          icon,
          score,
          tooltip: name,
          run: ({ host }) => action(host),
          active: ({ host }) => activeWhen(host),
        };
      }
    );
  },
} satisfies ToolbarActionGroup;

const highlightActionGroup = {
  id: 'c.highlight',
  when: ({ chain }) => isFormatSupported(chain).run()[0],
  content({ chain }) {
    const updateHighlight = (styles: HighlightType) => {
      const payload = { styles };
      chain
        .try(chain => [
          chain.pipe(getTextSelectionCommand).pipe(formatTextCommand, payload),
          chain
            .pipe(getBlockSelectionsCommand)
            .pipe(formatBlockCommand, payload),
          chain.pipe(formatNativeCommand, payload),
        ])
        .run();
    };
    return html`
      <ink-highlight-dropdown-menu
        .updateHighlight=${updateHighlight}
      ></ink-highlight-dropdown-menu>
    `;
  },
} as const satisfies ToolbarAction;

// [REMOVED] Database modules - not needed for local markdown editor
// const turnIntoDatabase = {
//   id: 'e.convert-to-database',
//   tooltip: 'Create Table',
//   icon: DatabaseTableViewIcon(),
//   when({ chain }) {
//     const middleware = (count = 0) => {
//       return (ctx: { selectedBlocks: BlockComponent[] }, next: () => void) => {
//         const { selectedBlocks } = ctx;
//         if (!selectedBlocks || selectedBlocks.length === count) return;

//         const allowed = selectedBlocks.every(block =>
//           DATABASE_CONVERT_WHITE_LIST.includes(block.flavour)
//         );
//         if (!allowed) return;

//         next();
//       };
//     };

//     let [ok] = chain
//       .pipe(getTextSelectionCommand)
//       .pipe(getSelectedBlocksCommand, {
//         types: ['text'],
//       })
//       .pipe(middleware(1))
//       .run();

//     if (ok) return true;

//     [ok] = chain
//       .tryAll(chain => [
//         chain.pipe(getBlockSelectionsCommand),
//         chain.pipe(getImageSelectionsCommand),
//       ])
//       .pipe(getSelectedBlocksCommand, {
//         types: ['block', 'image'],
//       })
//       .pipe(middleware(0))
//       .run();

//     return ok;
//   },
//   run({ host }) {
//     convertToDatabase(host, tableViewMeta.type);
//   },
// } as const satisfies ToolbarAction;

// [REMOVED] Embed modules - not needed for local markdown editor
// const turnIntoLinkedDoc = {
//   id: 'f.convert-to-linked-doc',
//   tooltip: 'Create Linked Doc',
//   icon: LinkedPageIcon(),
//   when({ chain, std }) {
//     const supportFlavours = [
//       EmbedLinkedDocBlockSchema,
//       EmbedSyncedDocBlockSchema,
//     ].map(schema => schema.model.flavour);
//     if (
//       supportFlavours.some(
//         flavour => !std.getOptional(BlockViewIdentifier(flavour))
//       )
//     )
//       return false;

//     const [ok, { selectedModels }] = chain
//       .pipe(getSelectedModelsCommand, {
//         types: ['block', 'text'],
//         mode: 'flat',
//       })
//       .run();
//     return ok && Boolean(selectedModels?.length);
//   },
//   run({ chain, store, selection, std, track }) {
//     const [ok, { draftedModels, selectedModels }] = chain
//       .pipe(getSelectedModelsCommand, {
//         types: ['block', 'text'],
//         mode: 'flat',
//       })
//       .pipe(draftSelectedModelsCommand)
//       .run();
//     if (!ok || !draftedModels || !selectedModels?.length) return;

//     selection.clear();

//     const autofill = getTitleFromSelectedModels(
//       selectedModels.map(toDraftModel)
//     );
//     promptDocTitle(std, autofill)
//       .then(async title => {
//         if (title === null) return;
//         await convertSelectedBlocksToLinkedDoc(
//           std,
//           store,
//           draftedModels,
//           title
//         );
//         notifyDocCreated(std);

//         track('DocCreated', {
//           segment: 'doc',
//           page: 'doc editor',
//           module: 'toolbar',
//           control: 'create linked doc',
//           type: 'embed-linked-doc',
//         });

//         track('LinkedDocCreated', {
//           segment: 'doc',
//           page: 'doc editor',
//           module: 'toolbar',
//           control: 'create linked doc',
//           type: 'embed-linked-doc',
//         });
//       })
//       .catch(console.error);
//   },
// } as const satisfies ToolbarAction;

export const builtinToolbarConfig = {
  actions: [
    conversionsActionGroup,
    alignActionGroup,
    inlineTextActionGroup,
    highlightActionGroup,
    // [REMOVED] Database modules - not needed for local markdown editor
    // turnIntoDatabase,
    // [REMOVED] Embed modules - not needed for local markdown editor
    // turnIntoLinkedDoc,
    {
      id: 'g.comment',
      ...blockCommentToolbarButton,
    },
    {
      placement: ActionPlacement.More,
      id: 'a.clipboard',
      get actions() {
        return [
          {
            id: 'copy',
            label: t('copy', 'Copy'),
            icon: CopyIcon(),
            run({ chain, host }) {
              const [ok] = chain
                .pipe(getSelectedModelsCommand)
                .pipe(draftSelectedModelsCommand)
                .pipe(copySelectedModelsCommand)
                .run();

              if (!ok) return;

              toast(host, t('copiedToClipboard', 'Copied to clipboard'));
            },
          },
          {
            id: 'duplicate',
            label: t('duplicate', 'Duplicate'),
            icon: DuplicateIcon(),
            run({ chain, store, selection }) {
              store.captureSync();

              const [ok, { selectedBlocks = [] }] = chain
                .pipe(getTextSelectionCommand)
                .pipe(getSelectedBlocksCommand, {
                  types: ['text'],
                  mode: 'highest',
                })
                .run();

              // If text selection exists, convert to block selection
              if (ok && selectedBlocks.length) {
                selection.setGroup(
                  'note',
                  selectedBlocks.map(block =>
                    selection.create(BlockSelection, {
                      blockId: block.model.id,
                    })
                  )
                );
              }

              chain
                .pipe(getSelectedModelsCommand, {
                  types: ['block', 'image'],
                  mode: 'highest',
                })
                .pipe(duplicateSelectedModelsCommand)
                .run();
            },
          },
        ];
      },
      when(ctx) {
        return !ctx.flags.isNative();
      },
    },
    {
      placement: ActionPlacement.More,
      id: 'c.delete',
      get actions() {
        return [
          {
            id: 'delete',
            label: t('delete', 'Delete'),
            icon: DeleteIcon(),
            variant: 'destructive',
            run({ chain }) {
              // removes text
              const [ok] = chain
                .pipe(getTextSelectionCommand)
                .pipe(deleteTextCommand)
                .run();

              if (ok) return;

              // removes blocks
              chain
                .tryAll(chain => [
                  chain.pipe(getBlockSelectionsCommand),
                  chain.pipe(getImageSelectionsCommand),
                ])
                .pipe(getSelectedModelsCommand)
                .pipe(deleteSelectedModelsCommand)
                .run();
            },
          },
        ];
      },
      when(ctx) {
        return !ctx.flags.isNative();
      },
    },
  ],
} satisfies ToolbarModuleConfig;
