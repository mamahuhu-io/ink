import { useEffect, useRef, useState } from 'react'
import './ContextMenu.css'

export interface MenuItem {
  label: string
  icon?: React.ReactNode
  action?: () => void
  disabled?: boolean
  separator?: boolean
  danger?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  items: MenuItem[]
  onClose: () => void
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x, y })

  useEffect(() => {
    // Adjust position to keep menu within viewport
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newX = x
      let newY = y

      if (x + rect.width > viewportWidth) {
        newX = x - rect.width
      }

      if (y + rect.height > viewportHeight) {
        newY = y - rect.height
      }

      setPosition({ x: newX, y: newY })
    }
  }, [x, y])

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleWindowBlur = () => {
      onClose()
    }

    document.addEventListener('pointerdown', handleClickOutside, true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('blur', handleWindowBlur)
    // Prevent scrolling when menu is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside, true)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('blur', handleWindowBlur)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ top: position.y, left: position.x }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="context-menu-separator" />
        }

        return (
          <div
            key={index}
            className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${
              item.danger ? 'danger' : ''
            }`}
            onClick={() => {
              if (!item.disabled && item.action) {
                item.action()
                onClose()
              }
            }}
          >
            {item.icon && <span className="context-menu-icon">{item.icon}</span>}
            <span className="context-menu-label">{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}
