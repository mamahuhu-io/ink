import { Check, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { MenuItemData } from './types';

interface DropdownMenuProps {
  items: MenuItemData[];
  onClose: () => void;
  position?: { x: number; y: number };
  isSubmenu?: boolean;
}

export function DropdownMenu({ items, onClose, position, isSubmenu = false }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Small delay to avoid immediate close when menu opens
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleItemClick = (item: MenuItemData) => {
    if (item.disabled) return;
    if (item.type === 'separator') return;
    if (item.type === 'submenu') return;

    if (item.action) {
      item.action();
    }
    onClose();
  };

  const handleSubmenuEnter = (item: MenuItemData, event: React.MouseEvent) => {
    if (item.type !== 'submenu' || !item.submenu) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setSubmenuPosition({
      x: rect.right,
      y: rect.top,
    });
    setActiveSubmenu(item.id);
  };

  const handleSubmenuLeave = () => {
    // Delay closing to allow mouse to move to submenu
    setTimeout(() => {
      setActiveSubmenu(null);
    }, 100);
  };

  const style = position
    ? {
        position: 'fixed' as const,
        top: position.y,
        left: position.x,
      }
    : {};

  return (
    <div
      ref={menuRef}
      className={`dropdown-menu ${isSubmenu ? 'submenu' : ''}`}
      style={style}
      role="menu"
      tabIndex={-1}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={`sep-${index}`} className="dropdown-separator" role="separator" />;
        }

        const isSubmenuItem = item.type === 'submenu' && item.submenu;
        const isActive = activeSubmenu === item.id;

        return (
          <div
            key={item.id}
            className={`dropdown-item ${item.disabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
            onMouseEnter={(e) => isSubmenuItem && handleSubmenuEnter(item, e)}
            onMouseLeave={() => isSubmenuItem && handleSubmenuLeave()}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
            aria-haspopup={isSubmenuItem ? 'true' : undefined}
            aria-expanded={isSubmenuItem ? isActive : undefined}
          >
            <span className="dropdown-item-check">
              {item.type === 'checkbox' && item.checked && <Check size={14} />}
            </span>
            <span className="dropdown-item-label">{item.label}</span>
            {item.shortcut && <span className="dropdown-item-shortcut">{item.shortcut}</span>}
            {isSubmenuItem && (
              <span className="dropdown-item-arrow">
                <ChevronRight size={14} />
              </span>
            )}

            {/* Render submenu */}
            {isSubmenuItem && isActive && submenuPosition && (
              <DropdownMenu
                items={item.submenu!}
                onClose={onClose}
                position={submenuPosition}
                isSubmenu
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
