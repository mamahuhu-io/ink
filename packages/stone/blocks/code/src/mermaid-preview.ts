import type { CodeBlockModel } from '@ink/stone-model';
import { effect } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CodeBlockPreviewExtension } from './code-preview-extension.js';

@customElement('ink-mermaid-viewer')
export class InkMermaidViewer extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: var(--ink-background-primary-color);
      min-height: 50px;
    }
    .mermaid-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .loading {
      color: var(--ink-text-secondary-color);
      font-size: 14px;
      padding: 16px;
    }
  `;

  @property({ attribute: false })
  accessor model: CodeBlockModel | null = null;

  @state()
  accessor _loading = false;

  private _dispose: (() => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._subscribe();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._dispose?.();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('model')) {
      this._subscribe();
    }
  }

  private _subscribe() {
    this._dispose?.();
    if (!this.model) return;

    this._dispose = effect(() => {
      const text = this.model!.props.text.toString();
      this._renderMermaid(text);
    });
  }

  private async _renderMermaid(code: string) {
    if (!code) {
      this.shadowRoot!.innerHTML = '';
      return;
    }

    try {
      this._loading = true;
      // Show loading indicator if loading takes time (e.g. initial load)
      this.shadowRoot!.innerHTML = '<div class="loading">Loading mermaid...</div>';

      const { default: mermaid } = await import('mermaid');
      
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose', // Allow styles
      });
      
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      // @ts-expect-error mermaid types might mismatch slightly depending on version
      const { svg } = await mermaid.render(id, code);
      this.shadowRoot!.innerHTML = `<div class="mermaid-container">${svg}</div>`;
    } catch (e) {
      console.error('Mermaid render error:', e);
      this.shadowRoot!.innerHTML = `
        <div style="color: var(--ink-text-error-color, red); padding: 8px; white-space: pre-wrap;">
          ${e instanceof Error ? e.message : String(e)}
        </div>
      `;
    } finally {
      this._loading = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-mermaid-viewer': InkMermaidViewer;
  }
}

export const MermaidPreviewExtension = CodeBlockPreviewExtension(
  'mermaid',
  model => html`<ink-mermaid-viewer .model=${model}></ink-mermaid-viewer>`
);
