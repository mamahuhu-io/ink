import { toast } from '@ink/stone-components/toast';
import { CopyIcon, DeleteIcon, EditIcon, UnlinkIcon } from '@ink/stone-icons/lit';
import {
  ActionPlacement,
  EmbedIframeService,
  EmbedOptionProvider,
  type ToolbarAction,
  type ToolbarActionGenerator,
  type ToolbarActionGroup,
  type ToolbarModuleConfig,
} from '@ink/stone-shared/services';
import { BlockSelection } from '@ink/stone-std';
import { signal } from '@preact/signals-core';
import { html } from 'lit-html';
import { keyed } from 'lit-html/directives/keyed.js';

import { t } from '../../configs/i18n';
import { InkLink } from '../ink-link';
import { toggleLinkPopup } from '../link-popup/toggle-link-popup';

const trackBaseProps = {
  segment: 'doc',
  page: 'doc editor',
  module: 'toolbar',
  category: 'link',
  type: 'inline view',
};

export const builtinInlineLinkToolbarConfig = {
  actions: [
    {
      id: 'a.preview',
      content(cx) {
        const target = cx.message$.peek()?.element;
        if (!(target instanceof InkLink)) return null;

        const { link } = target;
        if (!link) return null;

        return html`<ink-link-preview .url=${link}></ink-link-preview>`;
      },
    },
    {
      id: 'b.copy-link-and-edit',
      actions: [
        {
          id: 'copy-link',
          generate: (ctx) => ({
            tooltip: t('copyLink', 'Copy link'),
            icon: CopyIcon(),
            run(ctx) {
              const target = ctx.message$.peek()?.element;
              if (!(target instanceof InkLink)) return;

              const { link } = target;

              if (!link) return;

              // Clears
              ctx.reset();

              navigator.clipboard.writeText(link).catch(console.error);
              toast(ctx.host, t('copiedLinkToClipboard', 'Copied link to clipboard'));

              ctx.track('CopiedLink', {
                ...trackBaseProps,
                control: 'copy link',
              });
            },
          }),
        } as ToolbarActionGenerator,
        {
          id: 'edit',
          generate: (ctx) => ({
            tooltip: t('edit', 'Edit'),
            icon: EditIcon(),
            run(ctx) {
              const target = ctx.message$.peek()?.element;
              if (!(target instanceof InkLink)) return;

              const { inlineEditor, selfInlineRange } = target;

              if (!inlineEditor || !selfInlineRange) return;

              const abortController = new AbortController();
              const popover = toggleLinkPopup(
                ctx.std,
                'edit',
                inlineEditor,
                selfInlineRange,
                abortController,
              );
              abortController.signal.onabort = () => popover.remove();

              ctx.track('OpenedAliasPopup', {
                ...trackBaseProps,
                control: 'edit',
              });
            },
          }),
        } as ToolbarActionGenerator,
      ],
    },
    {
      id: 'c.conversions',
      actions: [
        {
          id: 'inline',
          generate: (_) => ({
            label: t('inlineView', 'Inline view'),
            disabled: true,
          }),
        } as ToolbarActionGenerator,
        {
          id: 'card',
          generate: (ctx) => ({
            label: t('cardView', 'Card view'),
            run(ctx) {
              const target = ctx.message$.peek()?.element;
              if (!(target instanceof InkLink)) return;
              if (!target.block) return;

              const url = target.link;
              if (!url) return;

              const {
                block: { model },
                inlineEditor,
                selfInlineRange,
              } = target;
              const { parent } = model;

              if (!inlineEditor || !selfInlineRange || !parent) return;

              // Clears
              ctx.reset();

              const title = inlineEditor.yTextString.slice(
                selfInlineRange.index,
                selfInlineRange.index + selfInlineRange.length,
              );

              const options = ctx.std.get(EmbedOptionProvider).getEmbedBlockOptions(url);
              const flavour = options?.viewType === 'card' ? options.flavour : 'ink:bookmark';
              const index = parent.children.indexOf(model);
              const props = {
                url,
                title: title === url ? '' : title,
              };

              const blockId = ctx.store.addBlock(flavour, props, parent, index + 1);

              const totalTextLength = inlineEditor.yTextLength;
              const inlineTextLength = selfInlineRange.length;
              if (totalTextLength === inlineTextLength) {
                ctx.store.deleteBlock(model);
              } else {
                inlineEditor.formatText(selfInlineRange, { link: null });
              }

              ctx.select('note', [ctx.selection.create(BlockSelection, { blockId })]);

              ctx.track('SelectedView', {
                ...trackBaseProps,
                control: 'select view',
                type: 'card view',
              });
            },
          }),
        } as ToolbarActionGenerator,
        {
          id: 'embed',
          generate: (ctx) => ({
            label: t('embedView', 'Embed view'),
            when(ctx) {
              const target = ctx.message$.peek()?.element;
              if (!(target instanceof InkLink)) return false;
              if (!target.block) return false;

              const url = target.link;
              if (!url) return false;

              const {
                block: { model },
                inlineEditor,
                selfInlineRange,
              } = target;
              const { parent } = model;

              if (!inlineEditor || !selfInlineRange || !parent) return false;

              // check if the url can be embedded as iframe block
              const embedIframeService = ctx.std.get(EmbedIframeService);
              const canEmbedAsIframe = embedIframeService.canEmbed(url);

              const options = ctx.std.get(EmbedOptionProvider).getEmbedBlockOptions(url);
              return canEmbedAsIframe || options?.viewType === 'embed';
            },
            run(ctx) {
              const target = ctx.message$.peek()?.element;
              if (!(target instanceof InkLink)) return;
              if (!target.block) return;

              const url = target.link;
              if (!url) return;

              const {
                block: { model },
                inlineEditor,
                selfInlineRange,
              } = target;
              const { parent } = model;

              if (!inlineEditor || !selfInlineRange || !parent) return;

              // Clears
              ctx.reset();

              const index = parent.children.indexOf(model);
              const props = { url };
              let blockId: string | undefined;

              const embedIframeService = ctx.std.get(EmbedIframeService);
              const embedOptions = ctx.std.get(EmbedOptionProvider).getEmbedBlockOptions(url);

              if (embedOptions?.viewType === 'embed') {
                const flavour = embedOptions.flavour;
                blockId = ctx.store.addBlock(flavour, props, parent, index + 1);
              } else if (embedIframeService.canEmbed(url)) {
                blockId = embedIframeService.addEmbedIframeBlock(props, parent.id, index + 1);
              }

              if (!blockId) return;

              const totalTextLength = inlineEditor.yTextLength;
              const inlineTextLength = selfInlineRange.length;
              if (totalTextLength === inlineTextLength) {
                ctx.store.deleteBlock(model);
              } else {
                inlineEditor.formatText(selfInlineRange, { link: null });
              }

              ctx.select('note', [ctx.selection.create(BlockSelection, { blockId })]);

              ctx.track('SelectedView', {
                ...trackBaseProps,
                control: 'select view',
                type: 'embed view',
              });
            },
          }),
        } as ToolbarActionGenerator,
      ],
      content(ctx) {
        const target = ctx.message$.peek()?.element;
        if (!(target instanceof InkLink)) return null;

        // Generate actions at runtime
        const actions = this.actions.map((action) => {
          if ('generate' in action) {
            return { ...action, ...action.generate(ctx) };
          }
          return action;
        });

        // Get the label of the first action for the view type signal
        const firstAction = actions[0];
        const initialLabel =
          firstAction && 'label' in firstAction ? firstAction.label : 'Inline view';
        const viewType$ = signal(initialLabel);
        const onToggle = (e: CustomEvent<boolean>) => {
          const opened = e.detail;
          if (!opened) return;

          ctx.track('OpenedViewSelector', {
            ...trackBaseProps,
            control: 'switch view',
          });
        };

        return html`${keyed(
          target,
          html`<ink-view-dropdown-menu
            .actions=${actions}
            .context=${ctx}
            .onToggle=${onToggle}
            .viewType$=${viewType$}
          ></ink-view-dropdown-menu>`,
        )}`;
      },
      when(ctx) {
        const target = ctx.message$.peek()?.element;
        if (!(target instanceof InkLink)) return false;
        if (!target.block) return false;

        if (ctx.flags.isNative()) return false;
        if (target.block.closest('ink-database') || target.block.closest('ink-table')) return false;

        if (!target.link.startsWith('http')) return false;

        const { model } = target.block;
        const parent = model.parent;
        if (!parent) return false;

        const schema = ctx.store.schema;
        const bookmarkSchema = schema.flavourSchemaMap.get('ink:bookmark');
        if (!bookmarkSchema) return false;

        const parentSchema = schema.flavourSchemaMap.get(parent.flavour);
        if (!parentSchema) return false;

        try {
          schema.validateSchema(bookmarkSchema, parentSchema);
        } catch {
          return false;
        }

        return true;
      },
    } satisfies ToolbarActionGroup<ToolbarAction>,
    {
      placement: ActionPlacement.More,
      id: 'b.remove-link',
      generate: (ctx) => ({
        label: t('removeLink', 'Remove link'),
        icon: UnlinkIcon(),
        run(ctx) {
          const target = ctx.message$.peek()?.element;
          if (!(target instanceof InkLink)) return;

          const { inlineEditor, selfInlineRange } = target;
          if (!inlineEditor || !selfInlineRange) return;

          if (!inlineEditor.isValidInlineRange(selfInlineRange)) return;

          inlineEditor.formatText(selfInlineRange, { link: null });
        },
      }),
    } as ToolbarActionGenerator,
    {
      placement: ActionPlacement.More,
      id: 'c.delete',
      generate: (ctx) => ({
        label: t('delete', 'Delete'),
        icon: DeleteIcon(),
        variant: 'destructive',
        run(ctx) {
          const target = ctx.message$.peek()?.element;
          if (!(target instanceof InkLink)) return;

          const { inlineEditor, selfInlineRange } = target;
          if (!inlineEditor || !selfInlineRange) return;

          if (!inlineEditor.isValidInlineRange(selfInlineRange)) return;

          inlineEditor.deleteText(selfInlineRange);
        },
      }),
    } as ToolbarActionGenerator,
  ],
} as const satisfies ToolbarModuleConfig;
