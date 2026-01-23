import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { invoke } from '@tauri-apps/api/core'
import i18n from '../i18n'
import type { LanguageCode } from '../i18n'

export interface LanguageState {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: (i18n.language as LanguageCode) || 'en',
      setLanguage: (language) => {
        i18n.changeLanguage(language)
        set({ language })
        // Sync with Rust backend to update menus
        invoke('set_language', { language }).catch((err) => {
          console.error('Failed to sync language with backend:', err)
        })
      },
    }),
    {
      name: 'language-storage',
    }
  )
)

// Initialize language from store on app start
const initializeLanguage = () => {
  const { language } = useLanguageStore.getState()
  if (language && language !== i18n.language) {
    i18n.changeLanguage(language)
  }
  // Sync with Rust backend on startup
  invoke('set_language', { language }).catch((err) => {
    console.error('Failed to sync language with backend on startup:', err)
  })
}

// Call on module load
initializeLanguage()
