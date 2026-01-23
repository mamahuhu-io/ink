import { isMacOS } from '../services/platform'

export interface ShortcutConfig {
  id: string
  mac: string
  win: string
  label?: string // Optional override for display
}

// Helper to get shortcut for current platform
export function getShortcut(id: string): string | undefined {
  const shortcut = SHORTCUTS[id]
  if (!shortcut) return undefined
  return isMacOS() ? shortcut.mac : shortcut.win
}

// Helper to format shortcut for display in menu
export function formatShortcut(shortcut: string): string {
  if (!shortcut) return ''
  // Replace standard keys with symbols or friendly names if needed
  // For now, we keep the format compatible with Tauri/Electron accelerators
  return shortcut
    .replace('CmdOrCtrl', isMacOS() ? '⌘' : 'Ctrl')
    .replace('CommandOrControl', isMacOS() ? '⌘' : 'Ctrl')
    .replace('Command', '⌘')
    .replace('Control', 'Ctrl')
    .replace('Shift', '⇧')
    .replace('Alt', isMacOS() ? '⌥' : 'Alt')
    .replace(/\+/g, isMacOS() ? '' : '+') // Mac menus usually don't show +
}

export const SHORTCUTS: Record<string, ShortcutConfig> = {
  // File
  new_window: { id: 'new_window', mac: 'Cmd+N', win: 'Ctrl+N' },
  new_tab: { id: 'new_tab', mac: 'Cmd+T', win: 'Ctrl+T' },
  open: { id: 'open', mac: 'Cmd+O', win: 'Ctrl+O' },
  save: { id: 'save', mac: 'Cmd+S', win: 'Ctrl+S' },
  save_as: { id: 'save_as', mac: 'Cmd+Shift+S', win: 'Ctrl+Shift+S' },
  close_tab: { id: 'close_tab', mac: 'Cmd+W', win: 'Ctrl+W' },
  quit: { id: 'quit', mac: 'Cmd+Q', win: 'Ctrl+Q' },

  // Edit
  undo: { id: 'undo', mac: 'Cmd+Z', win: 'Ctrl+Z' },
  redo: { id: 'redo', mac: 'Cmd+Shift+Z', win: 'Ctrl+Shift+Z' },
  find: { id: 'find', mac: 'Cmd+F', win: 'Ctrl+F' },
  find_replace: { id: 'find_replace', mac: 'Cmd+Alt+F', win: 'Ctrl+H' },
  global_search: { id: 'global_search', mac: 'Cmd+K', win: 'Ctrl+K' },
  preferences: { id: 'preferences', mac: 'Cmd+,', win: 'Ctrl+,' },

  // View
  toggle_sidebar: { id: 'toggle_sidebar', mac: 'Cmd+\\', win: 'Ctrl+\\' },
  toggle_source_mode: { id: 'toggle_source_mode', mac: 'Cmd+/', win: 'Ctrl+/' },
  zoom_in: { id: 'zoom_in', mac: 'Cmd+=', win: 'Ctrl+=' },
  zoom_out: { id: 'zoom_out', mac: 'Cmd+-', win: 'Ctrl+-' },
  zoom_reset: { id: 'zoom_reset', mac: 'Cmd+0', win: 'Ctrl+0' },
  fullscreen: { id: 'fullscreen', mac: 'Ctrl+Cmd+F', win: 'F11' }, // Mac standard fullscreen is Ctrl+Cmd+F
}
