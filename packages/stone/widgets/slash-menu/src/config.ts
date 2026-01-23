import { toast } from '@ink/stone-components/toast';
import type {
  ListBlockModel,
  ParagraphBlockModel,
} from '@ink/stone-model';
import { insertContent, getInlineEditorByModel } from '@ink/stone-rich-text';
import {
  ArrowDownBigIcon,
  ArrowUpBigIcon,
  CopyIcon,
  DeleteIcon,
  DualLinkIcon,
  LinkIcon,
  NowIcon,
  SmileSolidIcon,
  TodayIcon,
  TomorrowIcon,
  YesterdayIcon,
} from '@ink/stone-icons/lit';
import { type DeltaInsert, Slice, Text } from '@ink/stone-store';

import { slashMenuToolTips } from './tooltips';
import type { SlashMenuConfig } from './types';
import { formatDate, formatTime } from './utils';
import { SlashMenuLinkPopup } from './slash-menu-link-popup';
import { SlashMenuEmojiPicker } from './slash-menu-emoji-picker';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for slash menu translations
 */
export function setSlashMenuI18nGetter(getter: (key: string, fallback: string) => string) {
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    return i18nGetter(key, fallback);
  }
  return fallback;
}

export const defaultSlashMenuConfig: SlashMenuConfig = {
  items: () => {
    const now = new Date();
    const tomorrow = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        name: t('today', 'Today'),
        icon: TodayIcon(),
        tooltip: slashMenuToolTips['Today'],
        description: formatDate(now),
        group: '6_Date@0',
        action: ({ std, model }) => {
          insertContent(std, model, formatDate(now));
        },
      },
      {
        name: t('tomorrow', 'Tomorrow'),
        icon: TomorrowIcon(),
        tooltip: slashMenuToolTips['Tomorrow'],
        description: formatDate(tomorrow),
        group: '6_Date@1',
        action: ({ std, model }) => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          insertContent(std, model, formatDate(tomorrow));
        },
      },
      {
        name: t('yesterday', 'Yesterday'),
        icon: YesterdayIcon(),
        tooltip: slashMenuToolTips['Yesterday'],
        description: formatDate(yesterday),
        group: '6_Date@2',
        action: ({ std, model }) => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          insertContent(std, model, formatDate(yesterday));
        },
      },
      {
        name: t('now', 'Now'),
        icon: NowIcon(),
        tooltip: slashMenuToolTips['Now'],
        description: formatTime(now),
        group: '6_Date@3',
        action: ({ std, model }) => {
          insertContent(std, model, formatTime(now));
        },
      },
      {
        name: t('emoji', 'Emoji'),
        description: t('emojiDesc', 'Insert an emoji.'),
        icon: SmileSolidIcon(),
        searchAlias: ['emoticon', 'face', 'smiley'],
        group: '7_Insert@0',
        action: ({ std, model }) => {
          const inlineEditor = getInlineEditorByModel(std, model);
          if (!inlineEditor) {
            console.error('[SlashMenu Emoji] Inline editor not found');
            return;
          }

          const inlineRange = inlineEditor.getInlineRange();
          if (!inlineRange) {
            console.error('[SlashMenu Emoji] Inline range not found');
            return;
          }

          // Capture the current index for deletion and insertion
          const insertIndex = inlineRange.index;
          const textModel = model.text;
          if (!textModel) {
            console.error('[SlashMenu Emoji] Text model not found');
            return;
          }

          // Get the position for the popup based on the cursor position
          const range = inlineEditor.toDomRange(inlineRange);
          if (!range) {
            console.error('[SlashMenu Emoji] DOM range not found');
            return;
          }

          const rect = range.getBoundingClientRect();
          const position = {
            x: rect.left,
            y: rect.bottom + 8,
          };

          // Create and show the emoji picker popup
          const abortController = new AbortController();
          const picker = new SlashMenuEmojiPicker();
          picker.abortController = abortController;
          picker.position = position;
          picker.onSelect = (emoji) => {
            // Delete the slash character first (it's at insertIndex - 1)
            if (insertIndex > 0) {
              textModel.delete(insertIndex - 1, 1);
            }
            // Insert emoji at the position where '/' was
            const finalIndex = insertIndex > 0 ? insertIndex - 1 : 0;
            textModel.insert(' ', finalIndex, { emoji } as Record<string, unknown>);
            // Update cursor position to after the emoji
            inlineEditor.setInlineRange({
              index: finalIndex + 1,
              length: 0,
            });
          };

          const root = inlineEditor.rootElement?.closest('editor-host')?.parentElement ?? document.body;
          root.append(picker);

          abortController.signal.addEventListener('abort', () => picker.remove());
        },
      },
      {
        name: t('link', 'Link'),
        description: t('linkDesc', 'Insert a hyperlink.'),
        icon: LinkIcon(),
        searchAlias: ['url', 'hyperlink'],
        group: '7_Insert@1',
        action: ({ std, model }) => {
          const inlineEditor = getInlineEditorByModel(std, model);
          if (!inlineEditor) {
            console.error('[SlashMenu Link] Inline editor not found');
            return;
          }

          const inlineRange = inlineEditor.getInlineRange();
          if (!inlineRange) {
            console.error('[SlashMenu Link] Inline range not found');
            return;
          }

          // Capture the current index for deletion and insertion
          const insertIndex = inlineRange.index;
          const textModel = model.text;
          if (!textModel) {
            console.error('[SlashMenu Link] Text model not found');
            return;
          }

          // Get the position for the popup based on the cursor position
          const range = inlineEditor.toDomRange(inlineRange);
          if (!range) {
            console.error('[SlashMenu Link] DOM range not found');
            return;
          }

          const rect = range.getBoundingClientRect();
          const position = {
            x: rect.left,
            y: rect.bottom + 8,
          };

          // Create and show the link popup
          const abortController = new AbortController();
          const popup = new SlashMenuLinkPopup();
          popup.abortController = abortController;
          popup.position = position;
          popup.onConfirm = (result) => {
            // Delete the slash character first (it's at insertIndex - 1)
            if (insertIndex > 0) {
              textModel.delete(insertIndex - 1, 1);
            }
            // Insert the link text with link attribute at the position where '/' was
            const finalIndex = insertIndex > 0 ? insertIndex - 1 : 0;
            textModel.insert(result.text, finalIndex, { link: result.link } as Record<string, unknown>);
            // Update cursor position
            inlineEditor.setInlineRange({
              index: finalIndex + result.text.length,
              length: 0,
            });
          };

          const root = inlineEditor.rootElement?.closest('editor-host')?.parentElement ?? document.body;
          root.append(popup);

          abortController.signal.addEventListener('abort', () => popup.remove());
        },
      },
      {
        name: t('moveUp', 'Move Up'),
        description: t('moveUpDesc', 'Shift this line up.'),
        icon: ArrowUpBigIcon(),
        tooltip: slashMenuToolTips['Move Up'],
        group: '8_Actions@0',
        action: ({ std, model }) => {
          const { host } = std;
          const previousSiblingModel = host.store.getPrev(model);
          if (!previousSiblingModel) return;

          const parentModel = host.store.getParent(previousSiblingModel);
          if (!parentModel) return;

          host.store.moveBlocks(
            [model],
            parentModel,
            previousSiblingModel,
            true
          );
        },
      },
      {
        name: t('moveDown', 'Move Down'),
        description: t('moveDownDesc', 'Shift this line down.'),
        icon: ArrowDownBigIcon(),
        tooltip: slashMenuToolTips['Move Down'],
        group: '8_Actions@1',
        action: ({ std, model }) => {
          const { host } = std;
          const nextSiblingModel = host.store.getNext(model);
          if (!nextSiblingModel) return;

          const parentModel = host.store.getParent(nextSiblingModel);
          if (!parentModel) return;

          host.store.moveBlocks([model], parentModel, nextSiblingModel, false);
        },
      },
      {
        name: t('copy', 'Copy'),
        description: t('copyDesc', 'Copy this line to clipboard.'),
        icon: CopyIcon(),
        tooltip: slashMenuToolTips['Copy'],
        group: '8_Actions@2',
        action: ({ std, model }) => {
          const slice = Slice.fromModels(std.store, [model]);

          std.clipboard
            .copy(slice)
            .then(() => {
              toast(std.host, t('copiedToClipboard', 'Copied to clipboard'));
            })
            .catch(e => {
              console.error(e);
            });
        },
      },
      {
        name: t('duplicate', 'Duplicate'),
        description: t('duplicateDesc', 'Create a duplicate of this line.'),
        icon: DualLinkIcon(),
        tooltip: slashMenuToolTips['Copy'],
        group: '8_Actions@3',
        action: ({ std, model }) => {
          if (!model.text || !(model.text instanceof Text)) {
            console.error("Can't duplicate a block without text");
            return;
          }
          const { host } = std;
          const parent = host.store.getParent(model);
          if (!parent) {
            console.error(
              'Failed to duplicate block! Parent not found: ' +
                model.id +
                '|' +
                model.flavour
            );
            return;
          }
          const index = parent.children.indexOf(model);

          // FIXME: this clone is not correct
          host.store.addBlock(
            model.flavour,
            {
              type: (model as ParagraphBlockModel).props.type,
              text: new Text(
                (
                  model as ParagraphBlockModel
                ).props.text.toDelta() as DeltaInsert[]
              ),
              checked: (model as ListBlockModel).props.checked,
            },
            host.store.getParent(model),
            index
          );
        },
      },
      {
        name: t('delete', 'Delete'),
        description: t('deleteDesc', 'Remove this line permanently.'),
        searchAlias: ['remove'],
        icon: DeleteIcon(),
        tooltip: slashMenuToolTips['Delete'],
        group: '8_Actions@4',
        action: ({ std, model }) => {
          std.host.store.deleteBlock(model);
        },
      },
    ];
  },
};
