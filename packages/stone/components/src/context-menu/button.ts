import { IS_MOBILE } from '@ink/stone-global/env';
import { CheckBoxCheckSolidIcon, CheckBoxUnIcon, DoneIcon } from '@ink/stone-icons/lit';
import { cssVarV2 } from '@ink/stone-theme';
import type { ReadonlySignal } from '@preact/signals-core';
import { css, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import type { ClassInfo } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { MenuFocusable } from './focusable.js';
import type { Menu } from './menu.js';
import type { MenuClass, MenuItemRender } from './types.js';

export type MenuButtonData = {
  content: () => TemplateResult;
  class: ClassInfo;
  select: (ele: HTMLElement) => void | false;
  onHover?: (hover: boolean) => void;
  testId?: string;
};

export class MenuButton extends MenuFocusable {
  static override styles = css`
    .ink-menu-button {
      display: flex;
      width: 100%;
      font-size: 20px;
      cursor: pointer;
      align-items: center;
      padding: 4px;
      gap: 8px;
      border-radius: 4px;
      color: var(--ink-icon-color);
    }

    .ink-menu-button:hover,
    ink-menu-button.active .ink-menu-button {
      background-color: var(--ink-hover-color);
    }

    .ink-menu-button .ink-menu-action-text {
      flex: 1;
      font-size: 14px;
      line-height: 22px;
      color: var(--ink-text-primary-color);
    }

    .ink-menu-button.focused {
      outline: 1px solid ${unsafeCSS(cssVarV2.layer.insideBorder.primaryBorder)};
    }

    .ink-menu-button.delete-item:hover {
      background-color: var(--ink-background-error-color);
      color: var(--ink-error-color);
    }

    .ink-menu-button.delete-item:hover .ink-menu-action-text {
      color: var(--ink-error-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.disposables.addFromEvent(this, 'mouseenter', () => {
      this.data.onHover?.(true);
      this.menu.closeSubMenu();
    });
    this.disposables.addFromEvent(this, 'mouseleave', () => {
      this.data.onHover?.(false);
    });
    this.disposables.addFromEvent(this, 'click', this.onClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.data.onHover?.(false);
  }

  onClick() {
    if (this.data.select(this) !== false) {
      this.menu.options.onComplete?.();
      this.menu.close();
    }
  }

  override onPressEnter() {
    this.onClick();
  }

  protected override render(): unknown {
    const classString = classMap({
      'ink-menu-button': true,
      focused: this.isFocused$.value,
      ...this.data.class,
    });
    return html` <div class="${classString}" data-testid=${ifDefined(this.data.testId)}>
      ${this.data.content()}
    </div>`;
  }

  @property({ attribute: false })
  accessor data!: MenuButtonData;
}

export class MobileMenuButton extends MenuFocusable {
  static override styles = css`
    .mobile-menu-button {
      display: flex;
      width: 100%;
      cursor: pointer;
      align-items: center;
      font-size: 20px;
      padding: 11px 8px;
      gap: 8px;
      border-radius: 4px;
      color: var(--ink-icon-color);
    }

    .mobile-menu-button .ink-menu-action-text {
      flex: 1;
      color: var(--ink-text-primary-color);
      font-size: 17px;
      line-height: 22px;
    }

    .mobile-menu-button.delete-item {
      color: var(--ink-error-color);
    }

    .mobile-menu-button.delete-item .mobile-menu-action-text {
      color: var(--ink-error-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.disposables.addFromEvent(this, 'click', this.onClick);
  }

  onClick() {
    if (this.data.select(this) !== false) {
      this.menu.options.onComplete?.();
      this.menu.close();
    }
  }

  override onPressEnter() {
    this.onClick();
  }

  protected override render(): unknown {
    const classString = classMap({
      'mobile-menu-button': true,
      focused: this.isFocused$.value,
      ...this.data.class,
    });
    return html` <div class="${classString}" data-testid=${ifDefined(this.data.testId)}>
      ${this.data.content()}
    </div>`;
  }

  @property({ attribute: false })
  accessor data!: MenuButtonData;
}

const renderButton = (data: MenuButtonData, menu: Menu) => {
  if (IS_MOBILE) {
    return html`<mobile-menu-button .data="${data}" .menu="${menu}"></mobile-menu-button>`;
  }
  return html`<ink-menu-button .data="${data}" .menu="${menu}"></ink-menu-button>`;
};
export const menuButtonItems = {
  action:
    (config: {
      name: string;
      label?: () => TemplateResult;
      info?: TemplateResult;
      prefix?: TemplateResult;
      postfix?: TemplateResult;
      isSelected?: boolean;
      select: (ele: HTMLElement) => void | false;
      onHover?: (hover: boolean) => void;
      class?: MenuClass;
      hide?: () => boolean;
      testId?: string;
    }) =>
    (menu) => {
      if (config.hide?.() || !menu.search(config.name)) {
        return;
      }
      const data: MenuButtonData = {
        content: () => {
          return html`
            ${config.prefix}
            <div class="ink-menu-action-text">
              ${config.label?.() ?? config.name} ${config.info}
            </div>
            ${config.postfix ?? (config.isSelected ? DoneIcon() : undefined)}
          `;
        },
        onHover: config.onHover,
        select: config.select,
        class: {
          'selected-item': config.isSelected ?? false,
          ...config.class,
        },
        testId: config.testId,
      };
      return renderButton(data, menu);
    },
  checkbox:
    (config: {
      name: string;
      checked: ReadonlySignal<boolean>;
      postfix?: TemplateResult;
      label?: () => TemplateResult;
      select: (checked: boolean) => boolean;
      class?: ClassInfo;
      testId?: string;
    }) =>
    (menu) => {
      if (!menu.search(config.name)) {
        return;
      }
      const data: MenuButtonData = {
        content: () => html`
          ${config.checked.value
            ? CheckBoxCheckSolidIcon({ style: `color:#1E96EB` })
            : CheckBoxUnIcon()}
          <div class="ink-menu-action-text">${config.label?.() ?? config.name}</div>
          ${config.postfix}
        `,
        select: () => {
          config.select(config.checked.value);
          return false;
        },
        class: config.class ?? {},
        testId: config.testId,
      };
      return html`${keyed(config.name, renderButton(data, menu))}`;
    },
  toggleSwitch:
    (config: {
      name: string;
      on: boolean;
      prefix?: TemplateResult;
      postfix?: TemplateResult;
      label?: () => TemplateResult;
      onChange: (on: boolean) => void;
      class?: ClassInfo;
      testId?: string;
    }) =>
    (menu) => {
      if (!menu.search(config.name)) {
        return;
      }
      const onChange = (on: boolean) => {
        config.onChange(on);
      };

      const data: MenuButtonData = {
        content: () => html`
          ${config.prefix}
          <div class="ink-menu-action-text">${config.label?.() ?? config.name}</div>
          <toggle-switch .on="${config.on}" .onChange="${onChange}"></toggle-switch>
          ${config.postfix}
        `,
        select: () => {
          config.onChange(config.on);
          return false;
        },
        class: config.class ?? {},
        testId: config.testId,
      };
      return html`${keyed(config.name, renderButton(data, menu))}`;
    },
} satisfies Record<string, MenuItemRender<never>>;
