import { isMacOS } from '../../../services/platform'

interface KeybindingDisplayProps {
  keybinding: string
}

function formatKey(key: string): string {
  // Normalize the key name
  const normalized = key.trim()

  if (isMacOS()) {
    // On macOS, use symbols
    switch (normalized) {
      case 'Mod':
      case 'Cmd':
      case 'Command':
        return '⌘'
      case 'Ctrl':
      case 'Control':
        return '⌃'
      case 'Alt':
      case 'Option':
        return '⌥'
      case 'Shift':
        return '⇧'
      default:
        return normalized
    }
  } else {
    // On Windows/Linux, use text labels
    switch (normalized) {
      case 'Mod':
        return 'Ctrl'
      case 'Meta':
        return 'Win'
      default:
        return normalized
    }
  }
}

export function KeybindingDisplay({ keybinding }: KeybindingDisplayProps) {
  // Split keybinding string (e.g., "Mod-Shift-S" -> ["Mod", "Shift", "S"])
  const keys = keybinding.split('-').map(key => formatKey(key))

  return (
    <div className="shortcut-keys">
      {keys.map((key, index) => (
        <span key={index}>
          <kbd className="shortcut-key">{key}</kbd>
          {index < keys.length - 1 && <span className="shortcut-separator">+</span>}
        </span>
      ))}
    </div>
  )
}
