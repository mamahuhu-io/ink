/* CSS variables. You need to handle all places where `CSS variables` are marked. */

import { LINE_COLORS } from '@ink/stone-model';
import {
  cssVar,
  cssVarV2,
  type InkCssVariables,
  type InkTheme,
  type InkThemeKeyV2,
} from '@ink/stone-theme';
import { unsafeCSS } from 'lit';
export { cssVar, cssVarV2 } from '@ink/stone-theme';
export const ColorVariables = [
  '--ink-brand-color',
  '--ink-primary-color',
  '--ink-secondary-color',
  '--ink-tertiary-color',
  '--ink-hover-color',
  '--ink-icon-color',
  '--ink-icon-secondary',
  '--ink-border-color',
  '--ink-divider-color',
  '--ink-placeholder-color',
  '--ink-quote-color',
  '--ink-link-color',
  '--ink-edgeless-grid-color',
  '--ink-success-color',
  '--ink-warning-color',
  '--ink-error-color',
  '--ink-processing-color',
  '--ink-text-emphasis-color',
  '--ink-text-primary-color',
  '--ink-text-secondary-color',
  '--ink-text-disable-color',
  '--ink-black-10',
  '--ink-black-30',
  '--ink-black-50',
  '--ink-black-60',
  '--ink-black-80',
  '--ink-black-90',
  '--ink-black',
  '--ink-white-10',
  '--ink-white-30',
  '--ink-white-50',
  '--ink-white-60',
  '--ink-white-80',
  '--ink-white-90',
  '--ink-white',
  '--ink-background-code-block',
  '--ink-background-tertiary-color',
  '--ink-background-processing-color',
  '--ink-background-error-color',
  '--ink-background-warning-color',
  '--ink-background-success-color',
  '--ink-background-primary-color',
  '--ink-background-secondary-color',
  '--ink-background-modal-color',
  '--ink-background-overlay-panel-color',
  '--ink-tag-blue',
  '--ink-tag-green',
  '--ink-tag-teal',
  '--ink-tag-white',
  '--ink-tag-purple',
  '--ink-tag-red',
  '--ink-tag-pink',
  '--ink-tag-yellow',
  '--ink-tag-orange',
  '--ink-tag-gray',
  ...LINE_COLORS,
  '--ink-tooltip',
  '--ink-blue',
];

export const SizeVariables = [
  '--ink-font-h-1',
  '--ink-font-h-2',
  '--ink-font-h-3',
  '--ink-font-h-4',
  '--ink-font-h-5',
  '--ink-font-h-6',
  '--ink-font-base',
  '--ink-font-sm',
  '--ink-font-xs',
  '--ink-line-height',
  '--ink-z-index-modal',
  '--ink-z-index-popover',
];

export const FontFamilyVariables = [
  '--ink-font-family',
  '--ink-font-number-family',
  '--ink-font-code-family',
];

export const StyleVariables = [
  '--ink-editor-width',

  '--ink-theme-mode',
  '--ink-editor-mode',
  /* --ink-palette-transparent: special values added for the sake of logical consistency. */
  '--ink-palette-transparent',

  '--ink-popover-shadow',
  '--ink-menu-shadow',
  '--ink-float-button-shadow',
  '--ink-shadow-1',
  '--ink-shadow-2',
  '--ink-shadow-3',

  '--ink-paragraph-space',
  '--ink-popover-radius',
  '--ink-scale',
  ...SizeVariables,
  ...ColorVariables,
  ...FontFamilyVariables,
] as const;

type VariablesType = typeof StyleVariables;
export type CssVariableName = Extract<VariablesType[keyof VariablesType], string>;

export type CssVariablesMap = Record<CssVariableName, string>;

export const unsafeCSSVar = (key: keyof InkCssVariables | keyof InkTheme, fallback?: string) =>
  unsafeCSS(cssVar(key, fallback));

export const unsafeCSSVarV2 = (key: InkThemeKeyV2, fallback?: string) =>
  unsafeCSS(cssVarV2(key, fallback));
