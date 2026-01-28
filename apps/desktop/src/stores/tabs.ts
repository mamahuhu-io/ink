import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generate a unique window ID for this window instance
// This ensures each window has its own tab state
const getWindowIdSync = (): string => {
  // First check sessionStorage - if window ID is already set (page reload)
  const existingId = sessionStorage.getItem('window-id');
  if (existingId) {
    console.log('[TabStore] Using existing window ID from sessionStorage:', existingId);
    return existingId;
  }

  // Try to get Tauri window label - getCurrentWindow() is synchronous in Tauri 2.x
  try {
    if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
      // Dynamic import is async, but we can use require-like pattern
      // or check if it's already loaded
      // For Tauri 2.x, we can access window label from the global object
      const tauriWindow = (window as any).__TAURI_INTERNALS__?.metadata?.currentWindow;
      if (tauriWindow?.label) {
        const label = tauriWindow.label;
        console.log('[TabStore] Using Tauri window label as ID:', label);
        sessionStorage.setItem('window-id', label);
        return label;
      }
    }
  } catch (e) {
    console.error('[TabStore] Failed to get Tauri window label:', e);
  }

  // Check 'openLastFile' preference directly from localStorage
  try {
    const prefs = localStorage.getItem('preferences-storage');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      // If the setting is disabled, we always generate a new session.
      if (parsed.state && parsed.state.openLastFile === false) {
        console.log('[TabStore] Open Last File is disabled, generating new session ID');
        const windowId = nanoid();
        sessionStorage.setItem('window-id', windowId);
        return windowId;
      }
    }
  } catch (e) {
    console.error('[TabStore] Failed to read preferences:', e);
  }

  // Fallback: Use 'main' for the first window
  // This allows the main window to persist its tabs when openLastFile=true
  // Secondary windows without a label will get unique IDs
  const windowId = 'main';
  sessionStorage.setItem('window-id', windowId);
  console.log('[TabStore] Using fallback window ID:', windowId);
  return windowId;
};

const WINDOW_ID = getWindowIdSync();
console.log('[TabStore] Using storage key:', `tabs-storage-${WINDOW_ID}`);

export interface Tab {
  id: string;
  title: string;
  docId: string;
  filePath?: string;
  isModified: boolean;
}

export interface TabUpdate {
  title?: string;
  filePath?: string;
  isModified?: boolean;
}

interface TabStore {
  tabs: Tab[];
  activeTabId: string | null;

  addTab: (title?: string, filePath?: string) => string;
  closeTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeTabsToTheRight: (id: string) => void;
  closeAllTabs: () => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (fromIndex: number, toIndex: number) => void;
  updateTab: (id: string, updates: TabUpdate) => void;
  updateTabTitle: (id: string, title: string) => void;
  setModified: (id: string, isModified: boolean) => void;
  getTabByFilePath: (filePath: string) => Tab | undefined;
  getOpenFilePaths: () => string[];
}

export const useTabStore = create<TabStore>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      addTab: (title = 'Untitled', filePath?: string) => {
        // Check for duplicate file path
        if (filePath) {
          const existing = get().tabs.find((t) => t.filePath === filePath);
          if (existing) {
            set({ activeTabId: existing.id });
            return existing.docId;
          }
        }

        const id = nanoid();
        const docId = nanoid();
        const newTab: Tab = {
          id,
          title,
          docId,
          filePath,
          isModified: false,
        };

        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: id,
        }));

        return docId;
      },

      closeTab: (id: string) => {
        const { tabs, activeTabId } = get();
        const index = tabs.findIndex((t) => t.id === id);
        const newTabs = tabs.filter((t) => t.id !== id);

        let newActiveId = activeTabId;
        if (activeTabId === id && newTabs.length > 0) {
          // Activate adjacent tab
          const newIndex = Math.min(index, newTabs.length - 1);
          newActiveId = newTabs[newIndex].id;
        } else if (newTabs.length === 0) {
          newActiveId = null;
        }

        set({
          tabs: newTabs,
          activeTabId: newActiveId,
        });
      },

      closeOtherTabs: (id: string) => {
        const { tabs } = get();
        const targetTab = tabs.find((t) => t.id === id);
        if (!targetTab) return;

        set({
          tabs: [targetTab],
          activeTabId: id,
        });
      },

      closeTabsToTheRight: (id: string) => {
        const { tabs, activeTabId } = get();
        const index = tabs.findIndex((t) => t.id === id);
        if (index === -1) return;

        const newTabs = tabs.slice(0, index + 1);
        const newActiveId = newTabs.find((t) => t.id === activeTabId) ? activeTabId : id;

        set({
          tabs: newTabs,
          activeTabId: newActiveId,
        });
      },

      closeAllTabs: () => {
        set({
          tabs: [],
          activeTabId: null,
        });
      },

      setActiveTab: (id: string) => {
        set({ activeTabId: id });
      },

      reorderTabs: (fromIndex: number, toIndex: number) => {
        const { tabs } = get();
        if (
          fromIndex === toIndex ||
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= tabs.length ||
          toIndex >= tabs.length
        ) {
          return;
        }

        const newTabs = [...tabs];
        const [movedTab] = newTabs.splice(fromIndex, 1);
        newTabs.splice(toIndex, 0, movedTab);

        set({ tabs: newTabs });
      },

      updateTab: (id: string, updates: TabUpdate) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
      },

      updateTabTitle: (id: string, title: string) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === id ? { ...t, title } : t)),
        }));
      },

      setModified: (id: string, isModified: boolean) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === id ? { ...t, isModified } : t)),
        }));
      },

      getTabByFilePath: (filePath: string) => {
        return get().tabs.find((t) => t.filePath === filePath);
      },

      getOpenFilePaths: () => {
        return get()
          .tabs.filter((t) => t.filePath)
          .map((t) => t.filePath!);
      },
    }),
    {
      name: `tabs-storage-${WINDOW_ID}`,
      partialize: (state) => ({
        tabs: state.tabs.map((t) => ({
          ...t,
          // Don't persist modification state
          isModified: false,
        })),
        activeTabId: state.activeTabId,
      }),
    },
  ),
);
