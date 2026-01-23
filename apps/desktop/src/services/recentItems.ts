/**
 * Recent items service - manages recently opened files and folders
 */

import { isTauri } from './platform'
import { usePreferencesStore } from '../stores/preferences'

/**
 * Add a file to recent items
 */
export async function addRecentFile(filePath: string): Promise<void> {
  if (!isTauri()) return
  try {
    const { invoke } = await import('@tauri-apps/api/core')
    const { recentFilesLimit } = usePreferencesStore.getState()
    await invoke('add_recent_file', { filePath, limit: recentFilesLimit })
    console.log('[RecentItems] Added recent file:', filePath)
  } catch (error) {
    console.error('[RecentItems] Failed to add recent file:', error)
  }
}

/**
 * Add a folder to recent items
 */
export async function addRecentFolder(folderPath: string): Promise<void> {
  if (!isTauri()) return
  try {
    const { invoke } = await import('@tauri-apps/api/core')
    const { recentFilesLimit } = usePreferencesStore.getState()
    await invoke('add_recent_folder', { folderPath, limit: recentFilesLimit })
    console.log('[RecentItems] Added recent folder:', folderPath)
  } catch (error) {
    console.error('[RecentItems] Failed to add recent folder:', error)
  }
}
