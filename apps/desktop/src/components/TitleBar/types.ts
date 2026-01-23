// Menu item type definitions

export interface MenuItemData {
  id: string
  label: string
  shortcut?: string           // e.g., "Ctrl+S"
  icon?: React.ReactNode
  disabled?: boolean
  checked?: boolean           // For checkbox type items
  type?: 'normal' | 'checkbox' | 'separator' | 'submenu'
  submenu?: MenuItemData[]    // Nested submenu items
  action?: () => void         // Click action
}

export interface MenuData {
  id: string
  label: string
  items: MenuItemData[]
}
