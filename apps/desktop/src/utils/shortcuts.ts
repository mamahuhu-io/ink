/**
 * Keyboard shortcut formatting utilities
 *
 * Formats keyboard shortcuts in a platform-specific way:
 * - macOS: Uses symbols (⌘, ⌥, ⌃, ⇧)
 * - Windows/Linux: Uses text labels (Ctrl, Alt, Shift)
 */

import { isMacOS } from '../services/platform'

/**
 * Modifier key symbols for macOS
 */
const MAC_SYMBOLS = {
  'Cmd': '⌘',
  'Command': '⌘',
  'Ctrl': '⌃',
  'Control': '⌃',
  'Alt': '⌥',
  'Option': '⌥',
  'Shift': '⇧',
  'Meta': '⌘',
} as const

/**
 * Format a keyboard shortcut for the current platform
 *
 * @param shortcut - The shortcut string (e.g., "Alt+C", "Cmd+Shift+F")
 * @returns Formatted shortcut string
 *
 * @example
 * // On macOS
 * formatShortcut("Alt+C") // Returns "⌥C"
 * formatShortcut("Ctrl+F") // Returns "⌃F"
 * formatShortcut("Cmd+Shift+P") // Returns "⌘⇧P"
 *
 * // On Windows/Linux
 * formatShortcut("Alt+C") // Returns "Alt+C"
 * formatShortcut("Ctrl+F") // Returns "Ctrl+F"
 */
export function formatShortcut(shortcut: string): string {
  if (!isMacOS()) {
    return shortcut
  }

  // Replace modifier keys with macOS symbols
  let formatted = shortcut

  // Process each modifier key
  Object.entries(MAC_SYMBOLS).forEach(([key, symbol]) => {
    // Match the key followed by a plus sign
    const regex = new RegExp(`\\b${key}\\+`, 'g')
    formatted = formatted.replace(regex, symbol)
  })

  return formatted
}

/**
 * Format a shortcut hint by extracting the shortcut from parentheses
 * and formatting it for the current platform
 *
 * @param text - Text containing a shortcut in parentheses (e.g., "Match Case (Alt+C)")
 * @returns Formatted text with platform-specific shortcut
 *
 * @example
 * // On macOS
 * formatShortcutHint("Match Case (Alt+C)") // Returns "Match Case (⌥C)"
 *
 * // On Windows/Linux
 * formatShortcutHint("Match Case (Alt+C)") // Returns "Match Case (Alt+C)"
 */
export function formatShortcutHint(text: string): string {
  // Match text in parentheses
  const match = text.match(/\(([^)]+)\)/)

  if (!match) {
    return text
  }

  const shortcut = match[1]
  const formattedShortcut = formatShortcut(shortcut)

  return text.replace(/\([^)]+\)/, `(${formattedShortcut})`)
}

/**
 * Get the display name for a modifier key on the current platform
 *
 * @param key - The modifier key name
 * @returns Display name for the key
 *
 * @example
 * // On macOS
 * getModifierDisplay("Alt") // Returns "⌥"
 * getModifierDisplay("Cmd") // Returns "⌘"
 *
 * // On Windows/Linux
 * getModifierDisplay("Alt") // Returns "Alt"
 * getModifierDisplay("Ctrl") // Returns "Ctrl"
 */
export function getModifierDisplay(key: keyof typeof MAC_SYMBOLS): string {
  if (isMacOS() && key in MAC_SYMBOLS) {
    return MAC_SYMBOLS[key]
  }
  return key
}
