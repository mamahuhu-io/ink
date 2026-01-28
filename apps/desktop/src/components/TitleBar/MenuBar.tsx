import { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownMenu } from './DropdownMenu';
import { useMenuData } from './useMenuData';

export function MenuBar() {
  const menus = useMenuData();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);

  const handleMenuClick = useCallback(
    (menuId: string, event: React.MouseEvent) => {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

      if (activeMenuId === menuId) {
        // Close if clicking the same menu
        setActiveMenuId(null);
        setMenuPosition(null);
      } else {
        // Open this menu
        setActiveMenuId(menuId);
        setMenuPosition({ x: rect.left, y: rect.bottom });
      }
    },
    [activeMenuId],
  );

  const handleMenuEnter = useCallback(
    (menuId: string, event: React.MouseEvent) => {
      // If a menu is already open, switch to this one on hover
      if (activeMenuId && activeMenuId !== menuId) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        setActiveMenuId(menuId);
        setMenuPosition({ x: rect.left, y: rect.bottom });
      }
    },
    [activeMenuId],
  );

  const handleCloseMenu = useCallback(() => {
    setActiveMenuId(null);
    setMenuPosition(null);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (menuBarRef.current?.contains(event.target as Node)) {
        isMouseDownRef.current = true;
        return;
      }

      if (activeMenuId) {
        // Don't close if clicking inside dropdown (handled by DropdownMenu)
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown?.contains(event.target as Node)) {
          return;
        }
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [activeMenuId, handleCloseMenu]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeMenuId) return;

      const currentIndex = menus.findIndex((m) => m.id === activeMenuId);

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const newIndex = currentIndex > 0 ? currentIndex - 1 : menus.length - 1;
        const menuItem = menuBarRef.current?.children[newIndex] as HTMLElement;
        if (menuItem) {
          const rect = menuItem.getBoundingClientRect();
          setActiveMenuId(menus[newIndex].id);
          setMenuPosition({ x: rect.left, y: rect.bottom });
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        const newIndex = currentIndex < menus.length - 1 ? currentIndex + 1 : 0;
        const menuItem = menuBarRef.current?.children[newIndex] as HTMLElement;
        if (menuItem) {
          const rect = menuItem.getBoundingClientRect();
          setActiveMenuId(menus[newIndex].id);
          setMenuPosition({ x: rect.left, y: rect.bottom });
        }
      } else if (event.key === 'Escape') {
        handleCloseMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeMenuId, menus, handleCloseMenu]);

  const activeMenu = menus.find((m) => m.id === activeMenuId);

  return (
    <div className="menu-bar" ref={menuBarRef} role="menubar">
      {menus.map((menu) => (
        <div
          key={menu.id}
          className={`menu-bar-item ${activeMenuId === menu.id ? 'active' : ''}`}
          onClick={(e) => handleMenuClick(menu.id, e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMenuClick(menu.id, e as any);
            }
          }}
          onMouseEnter={(e) => handleMenuEnter(menu.id, e)}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={activeMenuId === menu.id}
          tabIndex={0}
        >
          {menu.label}
        </div>
      ))}

      {/* Render dropdown for active menu */}
      {activeMenu && menuPosition && (
        <DropdownMenu items={activeMenu.items} onClose={handleCloseMenu} position={menuPosition} />
      )}
    </div>
  );
}
