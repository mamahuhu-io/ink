import { limitShift, shift, size } from '@floating-ui/dom';
import { HoverController } from '@ink/stone-components/hover';
import type { AdvancedMenuItem, MenuItemGroup } from '@ink/stone-components/toolbar';
import { cloneGroups, getMoreMenuConfig } from '@ink/stone-components/toolbar';
import type { CodeBlockModel } from '@ink/stone-model';
import { BlockSelection, TextSelection, WidgetComponent } from '@ink/stone-std';
import { html } from 'lit';

import type { CodeBlockComponent } from '../code-block.js';
import { getMoreGroups, getPrimaryGroups } from './config.js';
import { CodeBlockToolbarContext } from './context.js';
export { setCodeI18nGetter as setCodeLangI18nGetter } from '../configs/i18n.js';

export const INK_CODE_TOOLBAR_WIDGET = 'ink-code-toolbar-widget';
export class InkCodeToolbarWidget extends WidgetComponent<CodeBlockModel, CodeBlockComponent> {
  private _hoverController: HoverController | null = null;

  private _isActivated = false;

  private readonly _setHoverController = () => {
    this._hoverController = null;
    this._hoverController = new HoverController(
      this,
      ({ abortController }) => {
        const codeBlock = this.block;
        if (!codeBlock) {
          return null;
        }

        const selection = this.host.selection;

        const textSelection = selection.find(TextSelection);
        if (!!textSelection && (!!textSelection.to || !!textSelection.from.length)) {
          return null;
        }

        const blockSelections = selection.filter(BlockSelection);
        if (
          blockSelections.length > 1 ||
          (blockSelections.length === 1 && blockSelections[0].blockId !== codeBlock.blockId)
        ) {
          return null;
        }

        const setActive = (active: boolean) => {
          this._isActivated = active;
          if (!active && !this._hoverController?.isHovering) {
            this._hoverController?.abort();
          }
        };

        // Refresh groups to ensure correct language and dynamic updates
        this.primaryGroups = cloneGroups(getPrimaryGroups());
        this.moreGroups = getMoreMenuConfig(this.std).configure(cloneGroups(getMoreGroups()));

        const context = new CodeBlockToolbarContext(codeBlock, abortController, setActive);

        return {
          template: html`<ink-code-toolbar
            .context=${context}
            .primaryGroups=${this.primaryGroups}
            .moreGroups=${this.moreGroups}
            .onActiveStatusChange=${setActive}
          ></ink-code-toolbar>`,
          container: this.block,
          // stacking-context(editor-host)
          portalStyles: {
            zIndex: 'var(--ink-z-index-popover)',
          },
          computePosition: {
            referenceElement: codeBlock,
            placement: 'top',
            middleware: [
              size({
                apply({ rects, elements }) {
                  elements.floating.style.width = `${rects.reference.width}px`;
                },
              }),
              shift({
                crossAxis: true,
                padding: {
                  bottom: 12,
                  right: 12,
                },
                limiter: limitShift(),
              }),
            ],
            autoUpdate: true,
          },
        };
      },
      { allowMultiple: true },
    );

    const codeBlock = this.block;
    if (!codeBlock) {
      return;
    }
    this._hoverController.setReference(codeBlock);
    this._hoverController.onAbort = () => {
      // If the more menu is opened, don't close it.
      if (this._isActivated) return;
      this._hoverController?.abort();
      return;
    };
  };

  addMoretems = (
    items: AdvancedMenuItem<CodeBlockToolbarContext>[],
    index?: number,
    type?: string,
  ) => {
    let group;
    if (type) {
      group = this.moreGroups.find((g) => g.type === type);
    }
    if (!group) {
      group = this.moreGroups[0];
    }

    if (index === undefined) {
      group.items.push(...items);
      return this;
    }

    group.items.splice(index, 0, ...items);
    return this;
  };

  addPrimaryItems = (items: AdvancedMenuItem<CodeBlockToolbarContext>[], index?: number) => {
    if (index === undefined) {
      this.primaryGroups[0].items.push(...items);
      return this;
    }

    this.primaryGroups[0].items.splice(index, 0, ...items);
    return this;
  };

  /*
   * Caches the more menu items.
   * Currently only supports configuring more menu.
   */
  protected moreGroups: MenuItemGroup<CodeBlockToolbarContext>[] = cloneGroups(getMoreGroups());

  protected primaryGroups: MenuItemGroup<CodeBlockToolbarContext>[] =
    cloneGroups(getPrimaryGroups());

  override firstUpdated() {
    this.moreGroups = getMoreMenuConfig(this.std).configure(this.moreGroups);
    this._setHoverController();
  }
}
