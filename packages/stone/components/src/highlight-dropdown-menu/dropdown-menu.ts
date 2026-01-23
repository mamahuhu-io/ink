import type { InkTextStyleAttributes } from '@ink/stone-shared/types';
import { PropTypes, requiredProperties } from '@ink/stone-std';
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';

import { EditorChevronDown } from '../toolbar';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for highlight dropdown translations
 */
export function setHighlightI18nGetter(getter: (key: string, fallback: string) => string) {
  console.log('[Highlight] i18n getter set');
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

// Actual color values for Markdown portability
const colorConfig = {
  red: { foreground: '#c62222', background: '#fed5d5' },
  orange: { foreground: '#ac5a14', background: '#ffeace' },
  yellow: { foreground: '#8b7f17', background: '#fef8c3' },
  green: { foreground: '#237e43', background: '#cef4dc' },
  blue: { foreground: '#215ac9', background: '#c9dafe' },
  purple: { foreground: '#7f32a8', background: '#ead2f4' },
  pink: { foreground: '#b82c6d', background: '#fed5e8' },
  grey: { foreground: '#5c5d64', background: '#e7e7e8' },
  teal: { foreground: '#0d6e6e', background: '#c3f1f1' },
} as const;

const colors = ['default', ...Object.keys(colorConfig)] as const;

export type HighlightType = Pick<
  InkTextStyleAttributes,
  'color' | 'background'
>;

// TODO(@fundon): these recent settings should be added to the dropdown menu
// tests/blocksutie/e2e/format-bar.spec.ts#253
//
// let latestHighlightColor: string | null = null;
// let latestHighlightType: HighlightType = 'background';

@requiredProperties({
  updateHighlight: PropTypes.instanceOf(Function),
})
export class HighlightDropdownMenu extends LitElement {
  @property({ attribute: false })
  accessor updateHighlight!: (styles: HighlightType) => void;

  private readonly _update = (style: HighlightType) => {
    // latestHighlightColor = value;
    // latestHighlightType = type;

    this.updateHighlight(style);
  };

  override render() {
    return html`
      <editor-menu-button
        .contentPadding="${'8px'}"
        .button=${html`
          <editor-icon-button aria-label="highlight" .tooltip="${t('highlight', 'Highlight')}">
            <ink-highlight-duotone-icon
              style=${styleMap({
                '--color': 'var(--ink-text-primary-color)',
              })}
            ></ink-highlight-duotone-icon>
            ${EditorChevronDown}
          </editor-icon-button>
        `}
      >
        <div data-size="large" data-orientation="vertical">
          <div class="highlight-heading">${t('color', 'Color')}</div>
          ${repeat(colors, color => {
            const isDefault = color === 'default';
            const config = isDefault ? null : colorConfig[color as keyof typeof colorConfig];
            const value = config?.foreground ?? null;
            const displayColor = value ?? 'var(--ink-text-primary-color)';
            const colorName = isDefault ? t('defaultColor', 'default color') : t(color, color);
            return html`
              <editor-menu-action
                data-testid="foreground-${color}"
                @click=${() => this._update({ color: value })}
              >
                <ink-text-duotone-icon
                  style=${styleMap({
                    '--color': displayColor,
                  })}
                ></ink-text-duotone-icon>
                <span class="label capitalize"
                  >${colorName}</span
                >
              </editor-menu-action>
            `;
          })}

          <div class="highlight-heading">${t('background', 'Background')}</div>
          ${repeat(colors, color => {
            const isDefault = color === 'default';
            const config = isDefault ? null : colorConfig[color as keyof typeof colorConfig];
            const value = config?.background ?? null;
            const displayColor = value ?? 'transparent';
            const colorName = isDefault ? t('defaultBackground', 'default background') : t(color, color);
            return html`
              <editor-menu-action
                data-testid="background-${color}"
                @click=${() => this._update({ background: value })}
              >
                <ink-text-duotone-icon
                  style=${styleMap({
                    '--color': 'var(--ink-text-primary-color)',
                    '--background': displayColor,
                  })}
                ></ink-text-duotone-icon>

                <span class="label capitalize"
                  >${colorName}</span
                >
              </editor-menu-action>
            `;
          })}
        </div>
      </editor-menu-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-highlight-dropdown-menu': HighlightDropdownMenu;
  }
}
