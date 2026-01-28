import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { closeTabWithCheck } from '../../hooks/useAppCommands';
import { removeDoc } from '../../stores/editor';
import { useFileTreeStore } from '../../stores/fileTree';
import { useSidebarStore } from '../../stores/sidebar';
import { type Tab, useTabStore } from '../../stores/tabs';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { DocStats } from '../DocStats';
import { SidebarToggle } from '../Layout/SidebarToggle';

interface SortableTabProps {
  tab: Tab;
  isActive: boolean;
  onTabClick: () => void;
  onMiddleClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
}

function SortableTab({
  tab,
  isActive,
  onTabClick,
  onMiddleClick,
  onContextMenu,
  onClose,
}: SortableTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tab.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`tab ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={onTabClick}
      onMouseDown={onMiddleClick}
      onContextMenu={onContextMenu}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTabClick();
        }
      }}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      {...attributes}
      {...listeners}
    >
      <span title={tab.title} className="tab-title">
        {tab.isModified && <span className="tab-modified">●</span>}
        {tab.title}
      </span>
      <button className="tab-close" onClick={onClose} title="Close tab">
        ×
      </button>
    </div>
  );
}

export function TabBar() {
  const { t } = useTranslation();
  const {
    tabs,
    activeTabId,
    addTab,
    closeTab,
    closeOtherTabs,
    closeTabsToTheRight,
    closeAllTabs,
    setActiveTab,
    reorderTabs,
  } = useTabStore();
  const { isVisible: sidebarVisible, toggleVisible: toggleSidebar } = useSidebarStore();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    tab: Tab;
  } | null>(null);

  // Configure drag sensors with activation constraint to avoid conflicts with click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderTabs(oldIndex, newIndex);
      }
    }
  };

  const handleAddTab = () => {
    addTab('Untitled');
  };

  const handleCloseTab = async (e: React.MouseEvent, tab: Tab) => {
    e.stopPropagation();

    // Check for unsaved changes before closing
    await closeTabWithCheck(tab, () => {
      removeDoc(tab.docId);
      closeTab(tab.id);
    });
  };

  const handleMiddleClick = (e: React.MouseEvent, tab: Tab) => {
    if (e.button === 1) {
      e.preventDefault();
      handleCloseTab(e, tab);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, tab: Tab) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tab,
    });
  };

  const handleCloseOtherTabs = async (tab: Tab) => {
    // Get all tabs except the target tab
    const otherTabs = tabs.filter((t) => t.id !== tab.id);

    // Close each tab with unsaved changes check
    for (const t of otherTabs) {
      await closeTabWithCheck(t, () => {
        removeDoc(t.docId);
      });
    }

    // After all checks, close remaining tabs
    closeOtherTabs(tab.id);
  };

  const handleCloseTabsToTheRight = async (tab: Tab) => {
    const tabIndex = tabs.findIndex((t) => t.id === tab.id);
    if (tabIndex === -1) return;

    const tabsToClose = tabs.slice(tabIndex + 1);

    // Close each tab with unsaved changes check
    for (const t of tabsToClose) {
      await closeTabWithCheck(t, () => {
        removeDoc(t.docId);
      });
    }

    // After all checks, close remaining tabs
    closeTabsToTheRight(tab.id);
  };

  const handleCloseAllTabs = async () => {
    // Close each tab with unsaved changes check
    for (const tab of tabs) {
      await closeTabWithCheck(tab, () => {
        removeDoc(tab.docId);
      });
    }

    // After all checks, close all tabs
    closeAllTabs();
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="tab-bar">
        {/* Show toggle button when sidebar is hidden */}
        {!sidebarVisible && (
          <SidebarToggle
            isOpen={sidebarVisible}
            onToggle={toggleSidebar}
            className="tab-bar-sidebar-toggle"
          />
        )}
        <SortableContext items={tabs.map((tab) => tab.id)} strategy={horizontalListSortingStrategy}>
          <div className="tabs-container">
            {tabs.map((tab) => (
              <SortableTab
                key={tab.id}
                tab={tab}
                isActive={activeTabId === tab.id}
                onTabClick={() => setActiveTab(tab.id)}
                onMiddleClick={(e) => handleMiddleClick(e, tab)}
                onContextMenu={(e) => handleContextMenu(e, tab)}
                onClose={(e) => handleCloseTab(e, tab)}
              />
            ))}
          </div>
        </SortableContext>
        {/* Drag region fills remaining space */}
        <div className="tab-bar-drag-region" data-tauri-drag-region="true" />
        {/* Document statistics */}
        <DocStats />
        <button className="add-tab-btn" onClick={handleAddTab} title="New tab">
          +
        </button>

        {/* Context menu */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={[
              {
                label: t('tabs.revealInFileTree'),
                action: () => {
                  if (contextMenu.tab.filePath) {
                    useSidebarStore.getState().setView('files');
                    useSidebarStore.getState().setVisible(true);
                    useFileTreeStore.getState().revealFile(contextMenu.tab.filePath);
                  }
                },
                disabled: !contextMenu.tab.filePath,
              },
              { separator: true, label: '' },
              {
                label: t('tabs.contextMenu.close'),
                action: () => {
                  const e = new MouseEvent('click') as any;
                  handleCloseTab(e, contextMenu.tab);
                },
              },
              {
                label: t('tabs.contextMenu.closeOthers'),
                action: () => handleCloseOtherTabs(contextMenu.tab),
                disabled: tabs.length <= 1,
              },
              {
                label: t('tabs.contextMenu.closeToRight'),
                action: () => handleCloseTabsToTheRight(contextMenu.tab),
                disabled: tabs.findIndex((t) => t.id === contextMenu.tab.id) === tabs.length - 1,
              },
              { separator: true },
              {
                label: t('tabs.contextMenu.closeAll'),
                action: () => handleCloseAllTabs(),
                danger: true,
              },
            ]}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    </DndContext>
  );
}
