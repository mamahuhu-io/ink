/**
 * File Watcher Service - monitors open files for external changes
 */

import { isTauri } from './platform'

type FileChangeHandler = (filePath: string) => void

let isInitialized = false
let unlistenFn: (() => void) | null = null
const changeHandlers: Set<FileChangeHandler> = new Set()

// Track files currently being saved by us (to ignore self-triggered changes)
const filesSaving: Set<string> = new Set()
const savingTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map()

/**
 * Mark a file as being saved (to ignore file watcher events)
 */
export function markFileSaving(filePath: string): void {
  // Clear any existing timeout for this file
  const existingTimeout = savingTimeouts.get(filePath)
  if (existingTimeout) {
    clearTimeout(existingTimeout)
  }

  filesSaving.add(filePath)

  // Auto-clear after 2 seconds in case unmark is not called
  const timeout = setTimeout(() => {
    filesSaving.delete(filePath)
    savingTimeouts.delete(filePath)
  }, 2000)

  savingTimeouts.set(filePath, timeout)
}

/**
 * Unmark a file as being saved
 */
export function unmarkFileSaving(filePath: string): void {
  // Use a small delay to ensure file watcher event has passed
  setTimeout(() => {
    filesSaving.delete(filePath)
    const timeout = savingTimeouts.get(filePath)
    if (timeout) {
      clearTimeout(timeout)
      savingTimeouts.delete(filePath)
    }
  }, 500)
}

/**
 * Check if a file is currently being saved by us
 */
export function isFileSaving(filePath: string): boolean {
  return filesSaving.has(filePath)
}

/**
 * Initialize the file watcher system
 */
export async function initFileWatcher(): Promise<void> {
  if (!isTauri() || isInitialized) {
    return
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    const { listen } = await import('@tauri-apps/api/event')

    // Initialize the Rust file watcher
    await invoke('init_file_watcher')

    // Listen for file change events from Rust
    unlistenFn = await listen<string>('file-changed', (event) => {
      const filePath = event.payload

      // Skip if this is our own save operation
      if (isFileSaving(filePath)) {
        console.log('Ignoring self-triggered file change:', filePath)
        return
      }

      console.log('File changed externally:', filePath)

      // Notify all handlers
      changeHandlers.forEach((handler) => {
        try {
          handler(filePath)
        } catch (error) {
          console.error('Error in file change handler:', error)
        }
      })
    })

    isInitialized = true
    console.log('File watcher initialized')
  } catch (error) {
    console.error('Failed to initialize file watcher:', error)
  }
}

/**
 * Start watching a file for changes
 */
export async function watchFile(filePath: string): Promise<void> {
  if (!isTauri()) {
    return
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('watch_file', { path: filePath })
    console.log('Started watching file:', filePath)
  } catch (error) {
    console.error('Failed to watch file:', error)
  }
}

/**
 * Stop watching a file
 */
export async function unwatchFile(filePath: string): Promise<void> {
  if (!isTauri()) {
    return
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('unwatch_file', { path: filePath })
    console.log('Stopped watching file:', filePath)
  } catch (error) {
    console.error('Failed to unwatch file:', error)
  }
}

/**
 * Stop watching all files
 */
export async function unwatchAllFiles(): Promise<void> {
  if (!isTauri()) {
    return
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('unwatch_all')
    console.log('Stopped watching all files')
  } catch (error) {
    console.error('Failed to unwatch all files:', error)
  }
}

/**
 * Get list of currently watched files
 */
export async function getWatchedFiles(): Promise<string[]> {
  if (!isTauri()) {
    return []
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    return await invoke<string[]>('get_watched_files')
  } catch (error) {
    console.error('Failed to get watched files:', error)
    return []
  }
}

/**
 * Register a handler for file change events
 */
export function onFileChange(handler: FileChangeHandler): () => void {
  changeHandlers.add(handler)

  // Return unsubscribe function
  return () => {
    changeHandlers.delete(handler)
  }
}

/**
 * Cleanup file watcher resources
 */
export async function cleanupFileWatcher(): Promise<void> {
  if (unlistenFn) {
    unlistenFn()
    unlistenFn = null
  }

  await unwatchAllFiles()
  changeHandlers.clear()
  isInitialized = false
}
