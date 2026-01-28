import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import i18n from '../i18n';
import {
  createDirectory,
  deletePath,
  type FileEntry,
  listDirectory,
  pickFolder,
  renamePath,
  writeFile,
} from '../services';
import { isTauri, isWindows } from '../services/platform';
import { usePreferencesStore } from './preferences';

interface FileTreeNode extends FileEntry {
  children?: FileTreeNode[];
  isLoaded?: boolean;
}

interface FileTreeStore {
  rootPath: string | null;
  entries: FileTreeNode[];
  expandedFolders: Set<string>;
  selectedPath: string | null;
  renamingNode: string | null;
  isLoading: boolean;

  setRootPath: (path: string | null) => void;
  openFolderPicker: () => Promise<void>;
  loadDirectory: (path: string) => Promise<FileTreeNode[]>;
  toggleFolder: (path: string) => Promise<void>;
  selectFile: (path: string) => void;
  setRenamingNode: (path: string | null) => void;
  renameNode: (oldPath: string, newPath: string) => Promise<void>;
  createNewItem: (type: 'file' | 'folder', parentPath: string) => Promise<void>;
  refresh: () => Promise<void>;
  collapseAll: () => void;
  deleteNode: (path: string) => Promise<void>;
  revealFile: (path: string) => Promise<void>;
}

export const useFileTreeStore = create<FileTreeStore>()(
  persist(
    (set, get) => ({
      rootPath: null,
      entries: [],
      expandedFolders: new Set<string>(),
      selectedPath: null,
      renamingNode: null,
      isLoading: false,

      setRootPath: (path: string | null) => {
        set({
          rootPath: path,
          entries: [],
          expandedFolders: new Set<string>(),
          selectedPath: null,
          renamingNode: null,
        });

        if (path) {
          get()
            .loadDirectory(path)
            .then((entries) => {
              set({ entries });
            });
        }
      },

      openFolderPicker: async () => {
        const path = await pickFolder();
        if (path) {
          get().setRootPath(path);
        }
      },

      loadDirectory: async (path: string): Promise<FileTreeNode[]> => {
        set({ isLoading: true });
        try {
          const entries = await listDirectory(path, true);
          return entries.map((e) => ({
            ...e,
            children: e.isDirectory ? undefined : undefined,
            isLoaded: !e.isDirectory,
          }));
        } catch (error) {
          console.error('Failed to load directory:', error);
          return [];
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFolder: async (path: string) => {
        const { expandedFolders, entries, loadDirectory } = get();
        const newExpanded = new Set(expandedFolders);

        if (newExpanded.has(path)) {
          // Collapse
          newExpanded.delete(path);
          set({ expandedFolders: newExpanded });
        } else {
          // Expand and load children if needed
          newExpanded.add(path);

          // Find the node and load its children
          const loadChildrenRecursive = async (nodes: FileTreeNode[]): Promise<FileTreeNode[]> => {
            return Promise.all(
              nodes.map(async (node) => {
                if (node.path === path && node.isDirectory && !node.isLoaded) {
                  const children = await loadDirectory(path);
                  return { ...node, children, isLoaded: true };
                } else if (node.children) {
                  const updatedChildren = await loadChildrenRecursive(node.children);
                  return { ...node, children: updatedChildren };
                }
                return node;
              }),
            );
          };

          const updatedEntries = await loadChildrenRecursive(entries);
          set({ entries: updatedEntries, expandedFolders: newExpanded });
        }
      },

      selectFile: (path: string) => {
        set({ selectedPath: path });
      },

      setRenamingNode: (path: string | null) => {
        set({ renamingNode: path });
      },

      renameNode: async (oldPath: string, newPath: string) => {
        try {
          await renamePath(oldPath, newPath);
          set({ renamingNode: null });
          get().refresh();
        } catch (error) {
          console.error('Failed to rename path:', error);
          if (isTauri()) {
            const { message } = await import('@tauri-apps/plugin-dialog');
            await message(`${i18n.t('messages.error')}: ${error}`, {
              title: i18n.t('messages.error'),
              kind: 'error',
            });
          } else {
            alert(`${i18n.t('messages.error')}: ${error}`);
          }
        }
      },

      createNewItem: async (type: 'file' | 'folder', parentPath: string) => {
        const sep = isWindows() ? '\\' : '/';
        const baseName = type === 'file' ? 'Untitled.md' : 'New Folder';
        let newPath = `${parentPath}${sep}${baseName}`;

        // Simple check to avoid overwrite (not perfect but ok for now)
        // Ideally we check if file exists.
        // For now let's just create it. If it fails, error will catch.
        // Or we could append timestamp.
        newPath = `${parentPath}${sep}${type === 'file' ? 'Untitled' : 'NewFolder'}-${Date.now()}${type === 'file' ? '.md' : ''}`;

        try {
          if (type === 'file') {
            await writeFile(newPath, '');
          } else {
            await createDirectory(newPath);
          }

          await get().refresh();

          // Expand the parent folder so we can see the new item
          const { expandedFolders } = get();
          if (!expandedFolders.has(parentPath)) {
            await get().toggleFolder(parentPath);
          } else {
            // If already expanded, we might need to re-load children if refresh didn't do it deep enough
            // actually refresh does loadExpandedRecursive.
          }

          // Set renaming mode
          set({ renamingNode: newPath });
        } catch (error) {
          console.error(`Failed to create ${type}:`, error);
          if (isTauri()) {
            const { message } = await import('@tauri-apps/plugin-dialog');
            await message(`${i18n.t('messages.error')}: ${error}`, {
              title: i18n.t('messages.error'),
              kind: 'error',
            });
          } else {
            alert(`${i18n.t('messages.error')}: ${error}`);
          }
        }
      },

      refresh: async () => {
        const { rootPath, loadDirectory, expandedFolders } = get();
        if (!rootPath) return;

        set({ isLoading: true });

        try {
          // Reload root
          const entries = await loadDirectory(rootPath);

          // Reload expanded folders
          const loadExpandedRecursive = async (nodes: FileTreeNode[]): Promise<FileTreeNode[]> => {
            return Promise.all(
              nodes.map(async (node) => {
                if (node.isDirectory && expandedFolders.has(node.path)) {
                  const children = await loadDirectory(node.path);
                  const loadedChildren = await loadExpandedRecursive(children);
                  return { ...node, children: loadedChildren, isLoaded: true };
                }
                return node;
              }),
            );
          };

          const updatedEntries = await loadExpandedRecursive(entries);
          set({ entries: updatedEntries });
        } finally {
          set({ isLoading: false });
        }
      },

      collapseAll: () => {
        set({ expandedFolders: new Set<string>() });
      },

      revealFile: async (filePath: string) => {
        const { rootPath, setRootPath, selectFile } = get();
        const isWin = isWindows();

        if (!filePath) return;

        // Get the directory containing the file
        // Handle both forward slash and backslash
        const sep = isWin ? '\\' : '/';
        const dirPath = filePath.substring(0, filePath.lastIndexOf(sep));

        // If file is not under current rootPath, switch to file's directory
        if (!rootPath || !filePath.startsWith(rootPath)) {
          // If we can't find a common root easily, just set parent dir as root
          // Ideally we would want to find the project root (e.g. where .git is)
          // but for now let's just use the parent dir
          setRootPath(dirPath);
          selectFile(filePath);
          return;
        }

        // File is within current rootPath, expand parent folders
        // We need to handle path separators carefully
        let relativePath = filePath.substring(rootPath.length);
        if (relativePath.startsWith(sep)) {
          relativePath = relativePath.substring(1);
        }

        const pathParts = relativePath.split(sep);

        // Build and expand each parent directory
        let currentPath = rootPath;
        const newExpanded = new Set(get().expandedFolders);

        // We go up to length - 1 because the last part is the file itself
        for (let i = 0; i < pathParts.length - 1; i++) {
          currentPath = `${currentPath}${sep}${pathParts[i]}`;
          if (!newExpanded.has(currentPath)) {
            newExpanded.add(currentPath);
            // We need to load directory content to ensure children are available
            // but we should do it via toggleFolder logic kind of,
            // or just ensure we load it.
            // loadDirectory just fetches. toggleFolder also updates state.
            // Let's just update expandedFolders set at the end, but we need to make sure
            // the data is loaded.

            // However, `refresh` uses `expandedFolders` to recursively load.
            // So if we update expandedFolders and then refresh/load, it might work.
            // But let's try to be more direct.
          }
        }

        set({ expandedFolders: newExpanded });

        // Now trigger a refresh or load to ensure nodes are loaded
        // We can just call refresh which respects expandedFolders
        await get().refresh();

        selectFile(filePath);
      },

      deleteNode: async (path: string) => {
        const { confirmDelete } = usePreferencesStore.getState();

        if (confirmDelete) {
          if (isTauri()) {
            const { ask } = await import('@tauri-apps/plugin-dialog');
            const confirmed = await ask(i18n.t('fileTree.deleteConfirm', { path }), {
              title: i18n.t('messages.confirm'),
              kind: 'warning',
              okLabel: i18n.t('fileTree.contextMenu.delete'),
              cancelLabel: i18n.t('messages.cancel'),
            });
            if (!confirmed) return;
          } else {
            const confirmed = window.confirm(i18n.t('fileTree.deleteConfirm', { path }));
            if (!confirmed) return;
          }
        }

        try {
          await deletePath(path);
          get().refresh();
        } catch (error) {
          console.error('Failed to delete path:', error);
          if (isTauri()) {
            const { message } = await import('@tauri-apps/plugin-dialog');
            await message(`${i18n.t('messages.error')}: ${error}`, {
              title: i18n.t('messages.error'),
              kind: 'error',
            });
          } else {
            alert(`${i18n.t('messages.error')}: ${error}`);
          }
        }
      },
    }),
    {
      name: 'file-tree-storage',
      partialize: (state) => ({
        rootPath: state.rootPath,
        // Convert Set to Array for serialization
        expandedFolders: Array.from(state.expandedFolders),
      }),
      merge: (persisted, current) => {
        const persistedState = persisted as {
          rootPath?: string | null;
          expandedFolders?: string[];
        };
        return {
          ...current,
          rootPath: persistedState?.rootPath ?? null,
          expandedFolders: new Set(persistedState?.expandedFolders ?? []),
        };
      },
    },
  ),
);
