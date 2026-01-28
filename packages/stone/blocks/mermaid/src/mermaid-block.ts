import type { Placement } from '@floating-ui/dom';
import { selectBlock } from '@ink/stone-block-note';
import { CaptionedBlockComponent } from '@ink/stone-components/caption';
import { createLitPortal } from '@ink/stone-components/portal';
import type { MermaidBlockModel } from '@ink/stone-model';
import { ThemeProvider } from '@ink/stone-shared/services';
import { BlockSelection } from '@ink/stone-std';
import { effect } from '@preact/signals-core';
import { html, render } from 'lit';
import { query } from 'lit/decorators.js';

import { MermaidBlockService, MermaidBlockServiceIdentifier } from './mermaid-block-service.js';
import { mermaidBlockStyles } from './styles.js';

export class MermaidBlockComponent extends CaptionedBlockComponent<MermaidBlockModel> {
  static override styles = mermaidBlockStyles;

  private _editorAbortController: AbortController | null = null;
  private _mermaidService!: MermaidBlockService;

  get editorPlacement(): Placement {
    return 'bottom';
  }

  get isBlockSelected() {
    const blockSelection = this.selection.filter(BlockSelection);
    return blockSelection.some((selection) => selection.blockId === this.model.id);
  }

  override connectedCallback() {
    super.connectedCallback();
    this._mermaidService = this.std.get(MermaidBlockServiceIdentifier);
  }

  override firstUpdated(props: Map<string, unknown>) {
    super.firstUpdated(props);

    const { disposables } = this;

    this._editorAbortController?.abort();
    this._editorAbortController = new AbortController();
    disposables.add(() => {
      this._editorAbortController?.abort();
    });

    const mermaidContainer = this._mermaidContainer;
    if (!mermaidContainer) return;

    // Monitor code, theme, scale, and Ink theme changes
    const themeService = this.std.get(ThemeProvider);
    disposables.add(
      effect(() => {
        // Subscribe to signals

        const _inkTheme = themeService.theme$.value; // Track global theme
        const code = this.model.props.code$.value;
        const theme = this.model.props.theme$.value;
        const scale = this.model.props.scale$.value;

        this._renderDiagram(mermaidContainer, code, theme, scale);
      }),
    );
  }

  private async _renderDiagram(
    container: HTMLDivElement,
    code: string,
    theme: 'auto' | 'light' | 'dark',
    scale: number,
  ) {
    container.replaceChildren();
    // @ts-expect-error lit hack won't fix
    delete container['_$litPart$'];

    if (code.length === 0) {
      render(html`<span class="mermaid-block-empty-placeholder">Mermaid Diagram</span>`, container);
      return;
    }

    try {
      const svg = await this._mermaidService.render(code, theme);

      // Auto-detect diagram type if not set
      if (!this.model.props.diagramType) {
        const detectedType = this._mermaidService.detectDiagramType(code);
        if (detectedType) {
          this.store.updateBlock(this.model, {
            diagramType: detectedType,
          });
        }
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-diagram-wrapper';

      const diagramDiv = document.createElement('div');
      diagramDiv.className = 'mermaid-diagram';
      diagramDiv.innerHTML = svg;

      // Apply scale transformation
      if (scale !== 1) {
        diagramDiv.style.transform = `scale(${scale})`;
        diagramDiv.style.transformOrigin = 'center center';
      }

      wrapper.appendChild(diagramDiv);
      container.appendChild(wrapper);
    } catch (error) {
      container.replaceChildren();
      // @ts-expect-error lit hack won't fix
      delete container['_$litPart$'];

      const errorMessage = error instanceof Error ? error.message : 'Invalid diagram syntax';
      render(
        html`<span class="mermaid-block-error-placeholder">Error: ${errorMessage}</span>`,
        container,
      );
    }
  }

  private _handleClick() {
    if (this.store.readonly) return;

    if (this.isBlockSelected) {
      this.toggleEditor();
    } else {
      this.selectBlock();
    }
  }

  removeEditor(portal: HTMLDivElement) {
    portal.remove();
  }

  override renderBlock() {
    const showDiagramType = this.model.props.showDiagramType;
    const diagramType = this.model.props.diagramType;

    return html`
      <div contenteditable="false" class="mermaid-block-container" @click=${this._handleClick}>
        ${showDiagramType && diagramType
          ? html`<div class="mermaid-diagram-type-badge">${diagramType}</div>`
          : null}
        <div class="mermaid"></div>
      </div>
    `;
  }

  selectBlock() {
    this.host.command.exec(selectBlock, {
      focusBlock: this,
    });
  }

  toggleEditor() {
    const mermaidContainer = this._mermaidContainer;
    if (!mermaidContainer) return;

    this._editorAbortController?.abort();
    this._editorAbortController = new AbortController();

    this.selection.setGroup('note', []);

    const { portal } = createLitPortal({
      template: html`<mermaid-editor-menu
        .std=${this.std}
        .codeSignal=${this.model.props.code$}
        .diagramTypeSignal=${this.model.props.diagramType$}
        .abortController=${this._editorAbortController}
      ></mermaid-editor-menu>`,
      container: this.host,
      computePosition: {
        referenceElement: this,
        placement: this.editorPlacement,
        autoUpdate: {
          animationFrame: true,
        },
      },
      closeOnClickAway: true,
      abortController: this._editorAbortController,
      shadowDom: false,
      portalStyles: {
        zIndex: 'var(--ink-z-index-popover)',
      },
    });

    this._editorAbortController.signal.addEventListener(
      'abort',
      () => {
        this.removeEditor(portal);
      },
      { once: true },
    );
  }

  @query('.mermaid')
  private accessor _mermaidContainer!: HTMLDivElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-mermaid': MermaidBlockComponent;
  }
}
