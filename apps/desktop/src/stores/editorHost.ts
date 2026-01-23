import { create } from 'zustand'
import type { EditorHost } from '@ink/stone-std'

interface EditorHostState {
  // Record of docId -> EditorHost (use Record instead of Map for better Zustand reactivity)
  hosts: Record<string, EditorHost>
  // Current active docId
  activeDocId: string | null
  // Version counter to force re-renders
  version: number

  // Actions
  setHost: (docId: string, host: EditorHost) => void
  removeHost: (docId: string) => void
  setActiveDocId: (docId: string | null) => void
  getHost: (docId: string) => EditorHost | undefined
}

export const useEditorHostStore = create<EditorHostState>()((set, get) => ({
  hosts: {},
  activeDocId: null,
  version: 0,

  setHost: (docId, host) => set((state) => {
    console.log('[EditorHostStore] Setting host for docId:', docId)
    return {
      hosts: { ...state.hosts, [docId]: host },
      version: state.version + 1,
    }
  }),

  removeHost: (docId) => set((state) => {
    const { [docId]: _, ...rest } = state.hosts
    return {
      hosts: rest,
      version: state.version + 1,
    }
  }),

  setActiveDocId: (docId) => set({ activeDocId: docId }),

  getHost: (docId) => {
    return get().hosts[docId]
  },
}))
