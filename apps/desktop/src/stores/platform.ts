import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/core'

interface AppInfo {
  name: string
  version: string
  os: string
  platform: string
}

interface PlatformState {
  info: AppInfo | null
  isMacOS: boolean
  isWindows: boolean
  isLinux: boolean
  initialized: boolean
  fetchInfo: () => Promise<void>
}

export const usePlatformStore = create<PlatformState>((set, get) => ({
  info: null,
  isMacOS: false,
  isWindows: false,
  isLinux: false,
  initialized: false,

  fetchInfo: async () => {
    try {
      // In browser environment, fallback to navigator
      if (typeof window === 'undefined' || !('__TAURI__' in window)) {
        const platform = navigator.platform.toLowerCase()
        const isMac = platform.includes('mac')
        const isWin = platform.includes('win')
        const isLin = platform.includes('linux')
        
        set({
          info: {
            name: 'Ink',
            version: '0.0.0', // Unknown in browser
            os: isMac ? 'macos' : isWin ? 'windows' : isLin ? 'linux' : 'unknown',
            platform: 'browser'
          },
          isMacOS: isMac,
          isWindows: isWin,
          isLinux: isLin,
          initialized: true
        })
        return
      }

      // In Tauri, fetch from Rust
      const info = await invoke<AppInfo>('get_app_info')
      
      const isMac = info.os === 'macos'
      const isWin = info.os === 'windows'
      const isLin = info.os === 'linux'

      set({
        info,
        isMacOS: isMac,
        isWindows: isWin,
        isLinux: isLin,
        initialized: true
      })
      
      console.log('[Platform] Initialized:', info)
    } catch (error) {
      console.error('Failed to fetch platform info:', error)
      // Fallback to safe defaults
      set({ initialized: true })
    }
  }
}))
