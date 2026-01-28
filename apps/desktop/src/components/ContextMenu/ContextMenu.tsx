import './ContextMenu.css';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
  danger?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useLayoutEffect(() => {
    // Adjust position to keep menu within viewport
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x;
      let newY = y;

      if (x + rect.width > viewportWidth) {
        newX = x - rect.width;
      }

      if (y + rect.height > viewportHeight) {
        newY = y - rect.height;
      }

      if (newX !== position.x || newY !== position.y) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPosition({ x: newX, y: newY });
      }
    }
  }, [x, y, position.x, position.y]);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleWindowBlur = () => {
      onClose();
    };

    document.addEventListener('pointerdown', handleClickOutside, true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    // Prevent scrolling when menu is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside, true);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ top: position.y, left: position.x }}
      onContextMenu={(e) => e.preventDefault()}
      role="menu"
      tabIndex={-1}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="context-menu-separator" role="separator" />;
        }

        const handleClick = () => {
          if (!item.disabled && item.action) {
            item.action();
            onClose();
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        };

        return (
          <div
            key={index}
            className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${
              item.danger ? 'danger' : ''
            }`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
          >
            {item.icon && <span className="context-menu-icon">{item.icon}</span>}
            <span className="context-menu-label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
