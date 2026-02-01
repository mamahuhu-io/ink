/**
 * File service - abstracts file operations for Tauri and browser environments
 */

import { usePreferencesStore } from '../stores/preferences';
import { markFileSaving, unmarkFileSaving } from './fileWatcher';
import { isTauri } from './platform';

export interface FileInfo {
  path: string;
  name: string;
  content: string;
}

export interface FileFilter {
  name: string;
  extensions: string[];
}

const markdownFilters: FileFilter[] = [
  { name: 'Markdown', extensions: ['md', 'markdown'] },
  { name: 'All Files', extensions: ['*'] },
];

const htmlFilters: FileFilter[] = [
  { name: 'HTML', extensions: ['html', 'htm'] },
  { name: 'All Files', extensions: ['*'] },
];

const docxFilters: FileFilter[] = [
  { name: 'Word Document', extensions: ['docx'] },
  { name: 'All Files', extensions: ['*'] },
];

const pngFilters: FileFilter[] = [
  { name: 'PNG Image', extensions: ['png'] },
  { name: 'All Files', extensions: ['*'] },
];

/**
 * Open a file dialog and read the selected file
 */
export async function openFile(): Promise<FileInfo | null> {
  if (isTauri()) {
    return openFileTauri();
  }
  return openFileBrowser();
}

/**
 * Save content to a file (with dialog if no path provided)
 */
export async function saveFile(content: string, currentPath?: string): Promise<string | null> {
  if (isTauri()) {
    return saveFileTauri(content, currentPath);
  }
  return saveFileBrowser(content, currentPath);
}

/**
 * Save content to a new file (always shows dialog)
 */
export async function saveFileAs(
  content: string,
  defaultName?: string,
  fileType: 'markdown' | 'html' | 'docx' | 'png' = 'markdown',
): Promise<string | null> {
  if (isTauri()) {
    return saveFileTauri(content, undefined, defaultName, fileType);
  }
  return saveFileBrowser(content, undefined, defaultName, fileType);
}

/**
 * Read a file from the given path
 */
export async function readFile(path: string): Promise<string> {
  if (isTauri()) {
    const { readTextFile } = await import('@tauri-apps/plugin-fs');
    return readTextFile(path);
  }
  throw new Error('Cannot read file by path in browser environment');
}

/**
 * Write content to a file at the given path
 */
export async function writeFile(path: string, content: string): Promise<void> {
  if (isTauri()) {
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');
    // Mark file as being saved to ignore file watcher events
    markFileSaving(path);
    try {
      await writeTextFile(path, content);
    } finally {
      unmarkFileSaving(path);
    }
    return;
  }
  throw new Error('Cannot write file by path in browser environment');
}

// Tauri implementation
async function openFileTauri(): Promise<FileInfo | null> {
  const { open } = await import('@tauri-apps/plugin-dialog');
  const { readTextFile } = await import('@tauri-apps/plugin-fs');

  const selected = await open({
    multiple: false,
    filters: markdownFilters,
  });

  if (!selected) {
    return null;
  }

  const path = selected as string;
  const content = await readTextFile(path);
  const name = path.split(/[/\\]/).pop() || 'Untitled';

  return { path, name, content };
}

async function saveFileTauri(
  content: string,
  currentPath?: string,
  defaultName?: string,
  fileType: 'markdown' | 'html' | 'docx' | 'png' = 'markdown',
): Promise<string | null> {
  const { writeTextFile } = await import('@tauri-apps/plugin-fs');

  if (currentPath) {
    // Mark file as being saved to ignore file watcher events
    markFileSaving(currentPath);
    try {
      await writeTextFile(currentPath, content);
    } finally {
      unmarkFileSaving(currentPath);
    }
    return currentPath;
  }

  const { save } = await import('@tauri-apps/plugin-dialog');
  const { join } = await import('@tauri-apps/api/path');

  // Select appropriate filters based on file type
  let filters: FileFilter[];
  let defaultFileName: string;

  switch (fileType) {
    case 'html':
      filters = htmlFilters;
      defaultFileName = defaultName || 'untitled.html';
      break;
    case 'docx':
      filters = docxFilters;
      defaultFileName = defaultName || 'untitled.docx';
      break;
    case 'png':
      filters = pngFilters;
      defaultFileName = defaultName || 'untitled.png';
      break;
    default:
      filters = markdownFilters;
      defaultFileName = defaultName || 'untitled.md';
  }

  // Use default save location if configured
  let defaultPath = defaultFileName;
  const { defaultSaveLocation } = usePreferencesStore.getState();

  if (defaultSaveLocation) {
    try {
      defaultPath = await join(defaultSaveLocation, defaultFileName);
    } catch (e) {
      console.error('Failed to join path with default save location:', e);
    }
  }

  const path = await save({
    filters,
    defaultPath,
  });

  if (!path) {
    return null;
  }

  // For docx and png files, we don't write content here - just return the path
  // The caller will handle the binary write
  if (fileType === 'docx' || fileType === 'png') {
    return path;
  }

  // Mark file as being saved to ignore file watcher events
  markFileSaving(path);
  try {
    await writeTextFile(path, content);
  } finally {
    unmarkFileSaving(path);
  }
  return path;
}

// Browser fallback implementation using File System Access API
async function openFileBrowser(): Promise<FileInfo | null> {
  try {
    // Try modern File System Access API first
    if ('showOpenFilePicker' in window) {
      const [handle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Markdown files',
            accept: { 'text/markdown': ['.md', '.markdown'] },
          },
        ],
      });
      const file = await handle.getFile();
      const content = await file.text();
      return {
        path: file.name,
        name: file.name,
        content,
      };
    }

    // Fallback to input element
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.md,.markdown';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }
        const content = await file.text();
        resolve({
          path: file.name,
          name: file.name,
          content,
        });
      };
      input.click();
    });
  } catch {
    return null;
  }
}

async function saveFileBrowser(
  content: string,
  _currentPath?: string,
  defaultName?: string,
  fileType: 'markdown' | 'html' | 'docx' | 'png' = 'markdown',
): Promise<string | null> {
  try {
    let suggestedName: string;
    let mimeType: string;
    let extension: string;

    switch (fileType) {
      case 'html':
        suggestedName = defaultName || 'untitled.html';
        mimeType = 'text/html';
        extension = '.html';
        break;
      case 'docx':
        suggestedName = defaultName || 'untitled.docx';
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        extension = '.docx';
        break;
      case 'png':
        suggestedName = defaultName || 'untitled.png';
        mimeType = 'image/png';
        extension = '.png';
        break;
      default:
        suggestedName = defaultName || 'untitled.md';
        mimeType = 'text/markdown';
        extension = '.md';
    }

    // Try modern File System Access API first
    if ('showSaveFilePicker' in window) {
      const fileTypeDesc =
        fileType === 'html'
          ? 'HTML files'
          : fileType === 'docx'
            ? 'Word documents'
            : fileType === 'png'
              ? 'PNG images'
              : 'Markdown files';

      const handle = await (window as any).showSaveFilePicker({
        suggestedName,
        types: [
          {
            description: fileTypeDesc,
            accept: { [mimeType]: [extension] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return handle.name;
    }

    // Fallback to download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedName;
    a.click();
    URL.revokeObjectURL(url);
    return suggestedName;
  } catch {
    return null;
  }
}
