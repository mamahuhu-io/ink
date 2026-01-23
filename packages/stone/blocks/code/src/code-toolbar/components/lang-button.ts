import {
  type FilterableListItem,
  type FilterableListOptions,
  showPopFilterableList,
} from '@ink/stone-components/filterable-list';
import { ArrowDownIcon } from '@ink/stone-components/icons';
import {
  DocModeProvider,
  TelemetryProvider,
} from '@ink/stone-shared/services';
import { unsafeCSSVarV2 } from '@ink/stone-shared/theme';
import { SignalWatcher, WithDisposable } from '@ink/stone-global/lit';
import { noop } from '@ink/stone-global/utils';
import { BlockSelection } from '@ink/stone-std';
import { css, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';

import type { CodeBlockComponent } from '../..';
import { t } from '../../configs/i18n.js';

export class LanguageListButton extends WithDisposable(
  SignalWatcher(LitElement)
) {
  static override styles = css`
    .lang-button {
      display: flex;
      gap: 4px;
      padding: 2px 4px;
      height: 28px;
    }

    .lang-button:hover {
      background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
    }

    .lang-button[hover] {
      background: ${unsafeCSSVarV2('layer/background/hoverOverlay')};
    }

    .lang-button-icon {
      display: flex;
      align-items: center;
      color: ${unsafeCSSVarV2('icon/primary')};

      svg {
        height: 16px;
        width: 16px;
      }
    }
  `;

  private _abortController?: AbortController;

  private readonly _clickLangBtn = () => {
    if (this.blockComponent.store.readonly) return;
    if (this._abortController) {
      // Close the language list if it's already opened.
      this._abortController.abort();
      return;
    }
    this._abortController = new AbortController();
    this._abortController.signal.addEventListener('abort', () => {
      this.onActiveStatusChange(false);
      this._abortController = undefined;
    });
    this.onActiveStatusChange(true);

    const options: FilterableListOptions = {
      placeholder: t('editor.code.searchLanguage', 'Search for a language'),
      onSelect: item => {
        const sortedBundledLanguages = this._sortedBundledLanguages;
        const index = sortedBundledLanguages.indexOf(item);
        if (index !== -1) {
          sortedBundledLanguages.splice(index, 1);
          sortedBundledLanguages.unshift(item);
        }

        const std = this.blockComponent.std;
        const mode =
          std.getOptional(DocModeProvider)?.getEditorMode() ?? 'page';
        const telemetryService = std.getOptional(TelemetryProvider);

        // Auto-convert to Mermaid Block when language is switched to mermaid
        if (item.name === 'mermaid') {
          this.blockComponent.store.transact(() => {
            const codeModel = this.blockComponent.model;
            const code = codeModel.props.text.toString();
            const parent = this.blockComponent.store.getParent(codeModel);

            if (!parent) {
              // Fallback: just update language if no parent found
              codeModel.props.language$.value = item.name;
              return;
            }

            const index = parent.children.indexOf(codeModel);
            if (index === -1) {
              // Fallback: just update language if index not found
              codeModel.props.language$.value = item.name;
              return;
            }

            // Create Mermaid Block with the code content
            const mermaidId = this.blockComponent.store.addBlock(
              'ink:mermaid',
              {
                code,
                xywh: codeModel.xywh,
                index: codeModel.index,
              },
              parent,
              index
            );

            if (!mermaidId) {
              // Fallback: just update language if block creation failed
              codeModel.props.language$.value = item.name;
              return;
            }

            // Delete the original Code Block
            this.blockComponent.store.deleteBlock(codeModel);

            // Select the newly created Mermaid Block
            std.selection.setGroup('note', [
              std.selection.create(BlockSelection, { blockId: mermaidId }),
            ]);
          });

          // Track telemetry for mermaid conversion
          if (telemetryService) {
            telemetryService.track('codeBlockLanguageSelect', {
              page: mode,
              segment: 'code block',
              module: 'language selector',
              control: item.name,
              converted: true,
            });
          }
          return;
        }

        // Normal language switch for non-mermaid languages
        this.blockComponent.store.transact(() => {
          this.blockComponent.model.props.language$.value = item.name;
        });

        if (telemetryService) {
          telemetryService.track('codeBlockLanguageSelect', {
            page: mode,
            segment: 'code block',
            module: 'language selector',
            control: item.name,
          });
        }
      },
      active: item => item.name === this.blockComponent.model.props.language,
      items: this._sortedBundledLanguages,
    };

    showPopFilterableList({
      options,
      referenceElement: this._langButton,
      container: this.blockComponent.host,
      abortController: this._abortController,
      // stacking-context(editor-host)
      portalStyles: {
        zIndex: 'var(--ink-z-index-popover)',
      },
    });
  };

  private _sortedBundledLanguages: FilterableListItem[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    const langList = localStorage.getItem('stone:code-block:lang-list');
    if (langList) {
      this._sortedBundledLanguages = JSON.parse(langList);
    } else {
      this._sortedBundledLanguages = this.blockComponent.langs.map(lang => ({
        label: lang.name,
        name: lang.id,
        aliases: lang.aliases,
      }));
    }

    this.disposables.add(() => {
      localStorage.setItem(
        'stone:code-block:lang-list',
        JSON.stringify(this._sortedBundledLanguages)
      );
    });
  }

  override render() {
    const textStyles = styleMap({
      fontFamily: 'Inter',
      fontSize: 'var(--ink-font-xs)',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '20px',
      padding: '0 4px',
    });

    return html`<icon-button
      class="lang-button"
      data-testid="lang-button"
      width="auto"
      .text=${html`<div style=${textStyles}>
        ${this.blockComponent.languageName$.value}
      </div>`}
      height="24px"
      @click=${this._clickLangBtn}
      ?disabled=${this.blockComponent.store.readonly}
    >
      <span class="lang-button-icon" slot="suffix">
        ${!this.blockComponent.store.readonly ? ArrowDownIcon : nothing}
      </span>
    </icon-button> `;
  }

  @query('.lang-button')
  private accessor _langButton!: HTMLElement;

  @property({ attribute: false })
  accessor blockComponent!: CodeBlockComponent;

  @property({ attribute: false })
  accessor onActiveStatusChange: (active: boolean) => void = noop;
}
