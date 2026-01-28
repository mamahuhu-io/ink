import { useEffect } from 'react';

import { useFileTreeStore } from '../stores/fileTree';
import { useSidebarStore } from '../stores/sidebar';
import { useTabStore } from '../stores/tabs';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      const isShift = e.shiftKey;

      // Cmd+Shift+E: Reveal in File Tree
      if (isMod && isShift && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        const { tabs, activeTabId } = useTabStore.getState();
        const activeTab = tabs.find((t) => t.id === activeTabId);

        if (activeTab?.filePath) {
          useSidebarStore.getState().setView('files');
          useSidebarStore.getState().setVisible(true);
          useFileTreeStore.getState().revealFile(activeTab.filePath);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
