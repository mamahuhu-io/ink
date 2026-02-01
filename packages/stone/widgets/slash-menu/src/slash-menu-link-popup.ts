import { WithDisposable } from '@ink/stone-global/lit';
import { DoneIcon } from '@ink/stone-icons/lit';
import { unsafeCSSVar, unsafeCSSVarV2 } from '@ink/stone-shared/theme';
import { normalizeUrl, stopPropagation } from '@ink/stone-shared/utils';
import { ShadowlessElement } from '@ink/stone-std';
import { baseTheme } from '@ink/stone-theme';
import { css, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';

// Simple URL validation - just check if it's not empty
// The normalizeUrl function will add https:// if needed
function isValidLinkUrl(str: string): boolean {
  if (!str || !str.trim()) return false;
  return true; // Accept any non-empty string, normalizeUrl will handle the rest
}

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for slash menu link popup translations
 */
export function setSlashMenuLinkPopupI18nGetter(getter: (key: string, fallback: string) => string) {
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

const styles = css`
  :host {
    box-sizing: border-box;
  }

  .overlay-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--ink-z-index-popover);
  }

  .overlay-mask {
    pointer-events: auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .popover-container {
    position: absolute;
    z-index: var(--ink-z-index-popover);
    animation: ink-popover-fade-in 0.2s ease;

    background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
    box-shadow: ${unsafeCSSVar('overlayPanelShadow')};
    border-radius: 8px;
    font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
  }

  @keyframes ink-popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ink-slash-link-popover {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    width: 280px;
    box-sizing: border-box;
  }

  .ink-slash-link-popover .input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ink-slash-link-popover label {
    font-size: var(--ink-font-xs);
    font-weight: 500;
    color: var(--ink-text-secondary-color, #8e8d91);
    line-height: var(--ink-line-height);
  }

  .ink-slash-link-popover input {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    padding: 6px 10px;
    border: 1px solid var(--ink-border-color, #e3e2e4);
    border-radius: 4px;
    background: transparent;
    color: var(--ink-text-primary-color);
    font-size: var(--ink-font-sm);
    font-family: inherit;
    outline: none;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
  }

  .ink-slash-link-popover input::placeholder {
    color: var(--ink-placeholder-color, #8e8d91);
  }

  .ink-slash-link-popover input:focus {
    border-color: var(--ink-blue-700, #1e96eb);
    box-shadow: 0 0 0 2px rgba(30, 150, 235, 0.2);
  }

  .ink-slash-link-popover .button-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }

  .ink-confirm-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .ink-confirm-button:hover:not([disabled]) {
    background: var(--ink-hover-color, rgba(0, 0, 0, 0.04));
  }

  .ink-confirm-button[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export interface SlashMenuLinkPopupResult {
  text: string;
  link: string;
}

export class SlashMenuLinkPopup extends WithDisposable(ShadowlessElement) {
  static override styles = styles;

  private _bodyOverflowStyle = '';

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor position: { x: number; y: number } = { x: 0, y: 0 };

  @property({ attribute: false })
  accessor onConfirm: ((result: SlashMenuLinkPopupResult) => void) | null = null;

  @state()
  accessor _isConfirmDisabled: boolean = true;

  @query('#link-input')
  accessor linkInput: HTMLInputElement | null = null;

  @query('#text-input')
  accessor textInput: HTMLInputElement | null = null;

  @query('.popover-container')
  accessor popoverContainer!: HTMLDivElement;

  private readonly _updateConfirmBtn = () => {
    const link = this.linkInput?.value.trim() ?? '';
    const text = this.textInput?.value.trim() ?? '';
    const isValid = !!(link && text && isValidLinkUrl(link));
    this._isConfirmDisabled = !isValid;
  };

  private readonly _handleConfirm = () => {
    if (!this.linkInput || !this.textInput) {
      return;
    }

    const linkValue = this.linkInput.value.trim();
    const textValue = this.textInput.value.trim();

    if (!linkValue || !textValue || !isValidLinkUrl(linkValue)) {
      return;
    }

    const link = normalizeUrl(linkValue);

    if (this.onConfirm) {
      this.onConfirm({ text: textValue, link });
    }
    this.abortController.abort();
  };

  private readonly _onMaskClick = (e: Event) => {
    e.stopPropagation();
    this.abortController.abort();
  };

  override connectedCallback() {
    super.connectedCallback();

    // disable body scroll
    this._bodyOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.disposables.add({
      dispose: () => {
        document.body.style.overflow = this._bodyOverflowStyle;
      },
    });
  }

  override firstUpdated() {
    // Listen on document to catch all keyboard events
    const handleKeydown = (e: KeyboardEvent) => {
      if (!e.isComposing) {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          this.abortController.abort();
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this._handleConfirm();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown, true);
    this.disposables.add({
      dispose: () => document.removeEventListener('keydown', handleKeydown, true),
    });

    this.disposables.addFromEvent(this, 'copy', stopPropagation);
    this.disposables.addFromEvent(this, 'cut', stopPropagation);
    this.disposables.addFromEvent(this, 'paste', stopPropagation);

    // Position the popover
    if (this.popoverContainer) {
      this.popoverContainer.style.left = `${this.position.x}px`;
      this.popoverContainer.style.top = `${this.position.y}px`;
    }

    // Focus the text input
    this.updateComplete
      .then(() => {
        this.textInput?.focus();
        this._updateConfirmBtn();
      })
      .catch(() => {});
  }

  override render() {
    return html`
      <div class="overlay-root">
        <div class="overlay-mask" @click=${this._onMaskClick}></div>
        <div class="popover-container">
          <div class="ink-slash-link-popover">
            <div class="input-group">
              <label for="text-input">${t('text', 'Text')}</label>
              <input
                id="text-input"
                type="text"
                placeholder="${t('enterLinkText', 'Enter link text')}"
                @input=${this._updateConfirmBtn}
              />
            </div>
            <div class="input-group">
              <label for="link-input">${t('link', 'Link')}</label>
              <input
                id="link-input"
                type="text"
                spellcheck="false"
                placeholder="${t('pasteOrTypeLink', 'Paste or type a link')}"
                @input=${this._updateConfirmBtn}
              />
            </div>
            <div class="button-row">
              <editor-icon-button
                class="ink-confirm-button"
                .iconSize="${'20px'}"
                .disabled=${this._isConfirmDisabled}
                @click=${this._handleConfirm}
              >
                ${DoneIcon()}
              </editor-icon-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
