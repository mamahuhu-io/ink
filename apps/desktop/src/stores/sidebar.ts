import { create } from 'zustand';

export type SidebarView = 'files' | 'outline';

interface SidebarState {
  view: SidebarView;
  setView: (view: SidebarView) => void;
  // Visibility state
  isVisible: boolean;
  toggleVisible: () => void;
  setVisible: (visible: boolean) => void;
}

// Get initial visibility from localStorage
const getInitialVisibility = (): boolean => {
  const saved = localStorage.getItem('sidebar-visible');
  return saved !== 'false'; // default to visible
};

// Get initial view from localStorage
const getInitialView = (): SidebarView => {
  const saved = localStorage.getItem('sidebar-view') as SidebarView;
  return saved === 'outline' ? 'outline' : 'files';
};

export const useSidebarStore = create<SidebarState>()((set) => ({
  view: getInitialView(),
  setView: (view) => {
    localStorage.setItem('sidebar-view', view);
    set({ view });
  },
  // Visibility
  isVisible: getInitialVisibility(),
  toggleVisible: () =>
    set((state) => {
      const newValue = !state.isVisible;
      localStorage.setItem('sidebar-visible', String(newValue));
      return { isVisible: newValue };
    }),
  setVisible: (visible) => {
    localStorage.setItem('sidebar-visible', String(visible));
    set({ isVisible: visible });
  },
}));
