/**
 * Search service - handles global file search via Tauri
 */

import { isTauri } from './platform'

export interface SearchMatch {
  lineNumber: number
  lineContent: string
  matchStart: number
  matchEnd: number
}

export interface SearchResult {
  filePath: string
  fileName: string
  isNameMatch: boolean
  matches: SearchMatch[]
}

/**
 * Search files in the given root path
 * @param rootPath - Root directory to search in
 * @param query - Search query string
 * @param caseSensitive - Whether to use case-sensitive matching
 * @returns Array of search results
 */
export async function searchFiles(
  rootPath: string,
  query: string,
  caseSensitive: boolean = false
): Promise<SearchResult[]> {
  if (!isTauri()) {
    console.warn('Search is only available in Tauri environment')
    return []
  }

  if (!rootPath || !query.trim()) {
    return []
  }

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    const results = await invoke<SearchResult[]>('search_files', {
      rootPath,
      query,
      caseSensitive,
    })
    return results
  } catch (error) {
    console.error('Search failed:', error)
    return []
  }
}
