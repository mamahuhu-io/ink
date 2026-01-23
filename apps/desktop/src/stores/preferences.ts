import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PreferencesState {
  // Auto-save settings
  autoSaveEnabled: boolean
  autoSaveDelay: number // seconds

  // Editor settings
  fontSize: number
  lineHeight: number
  spellCheck: boolean

  // General settings
  defaultSaveLocation: string | null
  recentFilesLimit: number
  confirmDelete: boolean
  openLastFile: boolean

  // Appearance settings
  showDocStats: boolean

  // Code Block settings
  codeBlockShowLineNumbers: boolean
  codeBlockEnableWordWrap: boolean

  // Update settings
  autoCheckUpdates: boolean

  // Actions
  setAutoSaveEnabled: (enabled: boolean) => void
  setAutoSaveDelay: (delay: number) => void
  setFontSize: (size: number) => void
  setLineHeight: (height: number) => void
  setSpellCheck: (enabled: boolean) => void
  setDefaultSaveLocation: (path: string | null) => void
  setRecentFilesLimit: (limit: number) => void
  setConfirmDelete: (confirm: boolean) => void
  setOpenLastFile: (open: boolean) => void
  setShowDocStats: (show: boolean) => void
  setCodeBlockShowLineNumbers: (show: boolean) => void
  setCodeBlockEnableWordWrap: (enable: boolean) => void
  setAutoCheckUpdates: (check: boolean) => void
  resetToDefaults: () => void
}

const DEFAULT_PREFERENCES = {
  autoSaveEnabled: true,
  autoSaveDelay: 5,
  fontSize: 16,
  lineHeight: 1.6,
  spellCheck: true,
  defaultSaveLocation: null,
  recentFilesLimit: 10,
  confirmDelete: true,
  openLastFile: true,
  showDocStats: true,
  codeBlockShowLineNumbers: true,
  codeBlockEnableWordWrap: false,
  autoCheckUpdates: true,
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,

      setAutoSaveEnabled: (autoSaveEnabled) => set({ autoSaveEnabled }),
      setAutoSaveDelay: (autoSaveDelay) => set({ autoSaveDelay }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setSpellCheck: (spellCheck) => set({ spellCheck }),
      setDefaultSaveLocation: (defaultSaveLocation) => set({ defaultSaveLocation }),
      setRecentFilesLimit: (recentFilesLimit) => set({ recentFilesLimit }),
      setConfirmDelete: (confirmDelete) => set({ confirmDelete }),
      setOpenLastFile: (openLastFile) => set({ openLastFile }),
      setShowDocStats: (showDocStats) => set({ showDocStats }),
      setCodeBlockShowLineNumbers: (codeBlockShowLineNumbers) => set({ codeBlockShowLineNumbers }),
      setCodeBlockEnableWordWrap: (codeBlockEnableWordWrap) => set({ codeBlockEnableWordWrap }),
      setAutoCheckUpdates: (autoCheckUpdates) => set({ autoCheckUpdates }),
      resetToDefaults: () => set(DEFAULT_PREFERENCES),
    }),
    {
      name: 'preferences-storage',
    }
  )
)
