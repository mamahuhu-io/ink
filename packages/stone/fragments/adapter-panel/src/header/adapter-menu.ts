import { SignalWatcher } from '@ink/stone-global/lit';
import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
  type AdapterItem,
  type AdapterPanelContext,
  adapterPanelContext,
  ADAPTERS,
} from '../config';

export const INK_ADAPTER_MENU = 'ink-adapter-menu';

export class AdapterMenu extends SignalWatcher(LitElement) {
  static override styles = css`
    .adapter-menu {
      min-width: 120px;
      padding: 4px;
      background: var(--ink-background-primary-color);
      border: 1px solid var(--ink-border-color);
      border-radius: 4px;
      box-shadow: var(--ink-shadow-1);
    }
    .adapter-menu-item {
      display: block;
      width: 100%;
      padding: 6px 8px;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      color: var(--ink-text-primary-color);
      font-family: var(--ink-font-family);
      font-size: var(--ink-font-xs);
      border-radius: 4px;
    }
    .adapter-menu-item:hover {
      background: var(--ink-hover-color);
    }
    .adapter-menu-item.active {
      color: var(--ink-primary-color);
      background: var(--ink-hover-color);
    }
  `;

  get activeAdapter() {
    return this._context.activeAdapter$.value;
  }

  private readonly _handleAdapterChange = async (adapter: AdapterItem) => {
    this._context.activeAdapter$.value = adapter;
    this.abortController?.abort();
  };

  override render() {
    return html`<div class="adapter-menu">
      ${ADAPTERS.map((adapter) => {
        const classes = classMap({
          'adapter-menu-item': true,
          active: this.activeAdapter.id === adapter.id,
        });
        return html`
          <button class=${classes} @click=${() => this._handleAdapterChange(adapter)}>
            ${adapter.label}
          </button>
        `;
      })}
    </div>`;
  }

  @property({ attribute: false })
  accessor abortController: AbortController | null = null;

  @consume({ context: adapterPanelContext })
  private accessor _context!: AdapterPanelContext;
}
declare global {
  interface HTMLElementTagNameMap {
    [INK_ADAPTER_MENU]: AdapterMenu;
  }
}
