/**
 * File system service - handles directory operations
 */

import { isTauri } from './platform';

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

export interface FileMetadata {
  path: string;
  size: number;
  modified: number;
  isDirectory: boolean;
}

/**
 * List directory contents
 * @param path Directory path to list
 * @param markdownOnly If true, only show .md/.markdown files (directories always shown)
 */
export async function listDirectory(path: string, markdownOnly = true): Promise<FileEntry[]> {
  if (!isTauri()) {
    console.warn('listDirectory only available in Tauri environment');
    return [];
  }

  const { invoke } = await import('@tauri-apps/api/core');
  const entries = await invoke<Array<{ name: string; path: string; is_directory: boolean }>>(
    'list_directory',
    { path, markdownOnly },
  );

  return entries.map((e) => ({
    name: e.name,
    path: e.path,
    isDirectory: e.is_directory,
  }));
}

/**
 * Get user's home directory
 */
export async function getHomeDirectory(): Promise<string | null> {
  if (!isTauri()) {
    console.warn('getHomeDirectory only available in Tauri environment');
    return null;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  return invoke<string>('get_home_directory');
}

/**
 * Create a new directory
 */
export async function createDirectory(path: string): Promise<void> {
  if (!isTauri()) {
    console.warn('createDirectory only available in Tauri environment');
    return;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('create_directory', { path });
}

/**
 * Delete a file or directory
 */
export async function deletePath(path: string): Promise<void> {
  if (!isTauri()) {
    console.warn('deletePath only available in Tauri environment');
    return;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('delete_path', { path });
}

/**
 * Rename/move a file or directory
 */
export async function renamePath(oldPath: string, newPath: string): Promise<void> {
  if (!isTauri()) {
    console.warn('renamePath only available in Tauri environment');
    return;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('rename_path', { oldPath, newPath });
}

/**
 * Get file or directory metadata
 */
export async function getFileMetadata(path: string): Promise<FileMetadata | null> {
  if (!isTauri()) {
    console.warn('getFileMetadata only available in Tauri environment');
    return null;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  const meta = await invoke<{
    path: string;
    size: number;
    modified: number;
    is_directory: boolean;
  }>('get_file_metadata', { path });

  return {
    path: meta.path,
    size: meta.size,
    modified: meta.modified,
    isDirectory: meta.is_directory,
  };
}

/**
 * Open folder picker dialog
 */
export async function pickFolder(): Promise<string | null> {
  if (!isTauri()) {
    console.warn('pickFolder only available in Tauri environment');
    return null;
  }

  const { open } = await import('@tauri-apps/plugin-dialog');
  const result = await open({
    directory: true,
    multiple: false,
    title: 'Select Workspace Folder',
  });

  return result as string | null;
}

/**
 * Reveal file in system explorer
 */
export async function showInFolder(path: string): Promise<void> {
  if (!isTauri()) {
    console.warn('showInFolder only available in Tauri environment');
    return;
  }

  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('show_in_folder', { path });
}
