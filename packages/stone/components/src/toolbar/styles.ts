/**
 * Toolbar styles - CSS custom properties inherit through Shadow DOM naturally.
 *
 * Previously this file contained hardcoded CSS variable values for light/dark themes,
 * which prevented custom themes from working properly. Now we just return empty
 * styles to let CSS variables inherit from the document root (where custom themes
 * define their values).
 *
 * The `data-app-theme` attribute is still set on the toolbar for potential
 * future use, but we no longer override CSS variables based on it.
 */

export const lightToolbarStyles = (_selector: string) => '';

export const darkToolbarStyles = (_selector: string) => '';
