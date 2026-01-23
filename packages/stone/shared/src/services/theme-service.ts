import {
  type Color,
  ColorScheme,
  DefaultTheme,
  resolveColor,
} from '@ink/stone-model';
import { type Container, createIdentifier } from '@ink/stone-global/di';
import { type BlockStdScope, StdIdentifier } from '@ink/stone-std';
import { Extension } from '@ink/stone-store';
import { type Signal, signal } from '@preact/signals-core';
import {
  type InkCssVariables,
  combinedDarkCssVariables,
  combinedLightCssVariables,
} from '@ink/stone-theme';

import { isInsideEdgelessEditor } from '../utils/dom';

export const ThemeExtensionIdentifier = createIdentifier<ThemeExtension>(
  'InkThemeExtension'
);

export interface ThemeExtension {
  getAppTheme?: () => Signal<ColorScheme>;
  getEdgelessTheme?: (docId?: string) => Signal<ColorScheme>;
}

export const ThemeProvider = createIdentifier<ThemeService>(
  'InkThemeProvider'
);

export class ThemeService extends Extension {
  app$: Signal<ColorScheme>;

  edgeless$: Signal<ColorScheme>;

  get appTheme() {
    return this.app$.peek();
  }

  get edgelessTheme() {
    return this.edgeless$.peek();
  }

  get theme() {
    return this.theme$.peek();
  }

  get theme$() {
    return isInsideEdgelessEditor(this.std.host) ? this.edgeless$ : this.app$;
  }

  constructor(private readonly std: BlockStdScope) {
    super();
    const extension = this.std.getOptional(ThemeExtensionIdentifier);
    this.app$ = extension?.getAppTheme?.() || getThemeObserver().theme$;
    this.edgeless$ =
      extension?.getEdgelessTheme?.(this.std.store.id) ||
      getThemeObserver().theme$;
  }

  static override setup(di: Container) {
    di.addImpl(ThemeProvider, ThemeService, [StdIdentifier]);
  }

  /**
   * Generates a CSS's color property with `var` or `light-dark` functions.
   *
   * Sometimes used to set the frame/note background.
   *
   * @param color - A color value.
   * @param fallback  - If color value processing fails, it will be used as a fallback.
   * @param theme - Target theme, default is the current theme.
   * @returns - A color property string.
   *
   * @example
   *
   * ```
   * `rgba(255,0,0)`
   * `#fff`
   * `light-dark(#fff, #000)`
   * `var(--ink-palette-shape-blue)`
   * ```
   */
  generateColorProperty(
    color: Color,
    fallback: Color = DefaultTheme.transparent,
    theme = this.theme
  ) {
    const result = resolveColor(color, theme, resolveColor(fallback, theme));

    // Compatible old data
    if (result.startsWith('--')) {
      return result.endsWith('transparent')
        ? DefaultTheme.transparent
        : `var(${result})`;
    }

    return result;
  }

  /**
   * Gets a color with the current theme.
   *
   * @param color - A color value.
   * @param fallback - If color value processing fails, it will be used as a fallback.
   * @param real - If true, it returns the computed style.
   * @param theme - Target theme, default is the current theme.
   * @returns - A color property string.
   *
   * @example
   *
   * ```
   * `rgba(255,0,0)`
   * `#fff`
   * `--ink-palette-shape-blue`
   * ```
   */
  getColorValue(
    color: Color,
    fallback: Color = DefaultTheme.transparent,
    real = false,
    theme = this.theme
  ) {
    let result = resolveColor(color, theme, resolveColor(fallback, theme));

    // Compatible old data
    if (real && result.startsWith('--')) {
      result = result.endsWith('transparent')
        ? DefaultTheme.transparent
        : this.getCssVariableColor(result, theme);
    }

    return result ?? DefaultTheme.transparent;
  }

  getCssVariableColor(property: string, theme = this.theme) {
    // Compatible old data
    if (property.startsWith('--')) {
      if (property.endsWith('transparent')) {
        return DefaultTheme.transparent;
      }

      // First try to get from computed style (supports custom themes)
      const computedColor = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
      if (computedColor) {
        return computedColor;
      }

      // Fallback to hardcoded values if CSS variable not found
      const key = property as keyof InkCssVariables;
      const color =
        theme === ColorScheme.Dark
          ? combinedDarkCssVariables[key]
          : combinedLightCssVariables[key];
      return color;
    }
    return property;
  }
}

export class ThemeObserver {
  private readonly observer: MutationObserver;

  theme$: Signal<ColorScheme>;

  /**
   * Detect theme based on CSS color-scheme property.
   * This allows custom themes (e.g., 'github-dark', 'nord') to work correctly
   * by checking the actual color-scheme value instead of just 'light' or 'dark' strings.
   */
  private detectTheme(): ColorScheme {
    const colorScheme = getComputedStyle(document.documentElement).colorScheme;
    if (colorScheme.includes('dark')) {
      return ColorScheme.Dark;
    }
    return ColorScheme.Light;
  }

  constructor() {
    // Detect initial theme based on color-scheme CSS property
    this.theme$ = signal(this.detectTheme());

    this.observer = new MutationObserver(() => {
      const newTheme = this.detectTheme();
      if (newTheme === this.theme$.value) return;
      this.theme$.value = newTheme;
    });
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style'],
    });
  }

  destroy() {
    this.observer.disconnect();
  }
}

export const getThemeObserver = (function () {
  let observer: ThemeObserver;
  return function () {
    if (observer) return observer;
    observer = new ThemeObserver();
    return observer;
  };
})();
