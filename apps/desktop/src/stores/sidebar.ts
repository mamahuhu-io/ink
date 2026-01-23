import { create } from 'zustand'

export type SidebarView = 'files' | 'outline'

interface SidebarState {
  view: SidebarView
  setView: (view: SidebarView) => void
  // Visibility state
  isVisible: boolean
  toggleVisible: () => void
  setVisible: (visible: boolean) => void
}

// Get initial visibility from localStorage
const getInitialVisibility = (): boolean => {
  const saved = localStorage.getItem('sidebar-visible')
  return saved !== 'false' // default to visible
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  view: 'files',
  setView: (view) => set({ view }),
  // Visibility
  isVisible: getInitialVisibility(),
  toggleVisible: () => set((state) => {
    const newValue = !state.isVisible
    localStorage.setItem('sidebar-visible', String(newValue))
    return { isVisible: newValue }
  }),
  setVisible: (visible) => {
    localStorage.setItem('sidebar-visible', String(visible))
    set({ isVisible: visible })
  },
}))
