import { useEffect } from 'react';

import { useFileTreeStore } from '../stores/fileTree';
import { useTabStore } from '../stores/tabs';

// Helper to normalize paths for comparison
// 1. Normalize separators to '/'
// 2. Remove trailing slashes (unless it's root)
// 3. Use NFC normalization
const normalizePath = (path: string) => {
  let normalized = path.replace(/\\/g, '/').normalize('NFC');
  // Remove trailing slashes but keep if it is just "/"
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

export function useFileTreeSelectionSync() {
  const activeTabId = useTabStore((state) => state.activeTabId);
  const rootPath = useFileTreeStore((state) => state.rootPath);

  // Subscribe to the active tab to get its file path
  // This ensures we react to tab switching AND file renames/updates
  const activeTab = useTabStore((state) => state.tabs.find((t) => t.id === activeTabId));
  const activeFilePath = activeTab?.filePath;

  useEffect(() => {
    if (!activeFilePath || !rootPath) return;

    const { selectFile, selectedPath } = useFileTreeStore.getState();

    // Normalize paths for comparison
    const normalizedFilePath = normalizePath(activeFilePath);
    const normalizedRootPath = normalizePath(rootPath);

    // Check if file is within current workspace
    // Ensure parent path ends with / for prefix check (unless it is just /)
    const parentWithSlash = normalizedRootPath.endsWith('/')
      ? normalizedRootPath
      : `${normalizedRootPath}/`;

    const isInside = normalizedFilePath.startsWith(parentWithSlash);

    if (isInside) {
      // Only update if different to avoid unnecessary store updates
      if (selectedPath !== activeFilePath) {
        // console.log('[FileTreeSync] Auto-selecting file:', activeFilePath)
        selectFile(activeFilePath);
      }
    }
  }, [activeFilePath, rootPath]);
}
