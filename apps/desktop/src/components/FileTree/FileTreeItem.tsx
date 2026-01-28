import './FileTreeItem.css';

import {
  ChevronDown,
  ChevronRight,
  Copy,
  Edit2,
  FilePlus,
  FileText,
  FolderOpen,
  FolderPlus,
  Trash2,
} from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { addRecentFile, readFile, showInFolder } from '../../services';
import { markdownToDoc, setDocLoading } from '../../stores/editor';
import { useFileTreeStore } from '../../stores/fileTree';
import { useTabStore } from '../../stores/tabs';
import { ContextMenu, type MenuItem } from '../ContextMenu';

interface FileTreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileTreeNode[];
  isLoaded?: boolean;
}

interface FileTreeItemProps {
  node: FileTreeNode;
  depth: number;
}

export function FileTreeItem({ node, depth }: FileTreeItemProps) {
  const { t } = useTranslation();
  const {
    expandedFolders,
    toggleFolder,
    selectFile,
    selectedPath,
    renamingNode,
    setRenamingNode,
    renameNode,
    deleteNode,
    createNewItem,
  } = useFileTreeStore();

  const addTab = useTabStore((state) => state.addTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const getTabByFilePath = useTabStore((state) => state.getTabByFilePath);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [editValue, setEditValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const isExpanded = expandedFolders.has(node.path);
  const isSelected = selectedPath === node.path;
  const isRenaming = renamingNode === node.path;

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  // Reset edit value when renaming starts or node name changes
  useLayoutEffect(() => {
    if (isRenaming) {
      if (editValue !== node.name) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEditValue(node.name);
      }
      // Focus input on next tick
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
    }
  }, [isRenaming, node.name, editValue]);

  const handleClick = useCallback(async () => {
    if (isRenaming) return; // Don't handle click if renaming

    console.log('FileTreeItem clicked:', node.path, 'isDirectory:', node.isDirectory);

    if (node.isDirectory) {
      toggleFolder(node.path);
      return;
    }

    // Handle file click - open in editor
    selectFile(node.path);

    // Check if file is already open
    const existingTab = getTabByFilePath(node.path);
    if (existingTab) {
      console.log('File already open, switching to tab:', existingTab.id);
      setActiveTab(existingTab.id);
      return;
    }

    // Open new tab with file
    try {
      console.log('Reading file:', node.path);
      const content = await readFile(node.path);
      console.log('File content length:', content.length);

      const fileName = node.path.split(/[/\\]/).pop() || 'Untitled';
      const docId = addTab(fileName, node.path);
      console.log('Created tab with docId:', docId);

      // Mark document as loading immediately
      setDocLoading(docId, true);

      // Load content into the editor
      setTimeout(async () => {
        try {
          await markdownToDoc(docId, content, node.path);
          console.log('Loaded file content into doc:', node.path);
          // Add to recent files
          await addRecentFile(node.path);
        } catch (error) {
          console.error('Failed to load file content:', error);
        }
      }, 150);
    } catch (error) {
      console.error('Failed to open file:', error);
    }
  }, [
    node.path,
    node.isDirectory,
    toggleFolder,
    selectFile,
    addTab,
    setActiveTab,
    getTabByFilePath,
    isRenaming,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isRenaming) return; // Let input handle events

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      } else if (e.key === 'F2') {
        e.preventDefault();
        setRenamingNode(node.path);
      }
    },
    [handleClick, isRenaming, node.path, setRenamingNode],
  );

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleRenameSubmit = async () => {
    if (!editValue || editValue === node.name) {
      setRenamingNode(null);
      return;
    }

    // Construct new path
    const parentPath = node.path.substring(0, node.path.lastIndexOf(node.name));
    const newPath = parentPath + editValue;

    await renameNode(node.path, newPath);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setRenamingNode(null);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: t('fileTree.contextMenu.rename', 'Rename'),
      icon: <Edit2 size={14} />,
      action: () => setRenamingNode(node.path),
    },
    {
      label: t('fileTree.contextMenu.reveal', 'Reveal in System Explorer'),
      icon: <FolderOpen size={14} />,
      action: () => showInFolder(node.path),
    },
    {
      label: t('fileTree.contextMenu.copyPath', 'Copy Path'),
      icon: <Copy size={14} />,
      action: () => navigator.clipboard.writeText(node.path),
    },
  ];

  if (node.isDirectory) {
    menuItems.push(
      { separator: true, label: '' },
      {
        label: t('fileTree.contextMenu.newFile', 'New File'),
        icon: <FilePlus size={14} />,
        action: () => createNewItem('file', node.path),
      },
      {
        label: t('fileTree.contextMenu.newFolder', 'New Folder'),
        icon: <FolderPlus size={14} />,
        action: () => createNewItem('folder', node.path),
      },
    );
  }

  menuItems.push(
    { separator: true, label: '' },
    {
      label: t('fileTree.contextMenu.delete', 'Delete'),
      icon: <Trash2 size={14} />,
      danger: true,
      action: () => deleteNode(node.path),
    },
  );

  return (
    <>
      <div className="file-tree-item-container" onContextMenu={handleContextMenu}>
        <div
          ref={itemRef}
          className={`file-tree-item ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="treeitem"
          tabIndex={0}
          aria-expanded={node.isDirectory ? isExpanded : undefined}
          aria-selected={isSelected}
        >
          {node.isDirectory ? (
            <span className="file-tree-icon folder-icon">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          ) : (
            <span className="file-tree-icon file-icon">
              <FileText size={14} />
            </span>
          )}

          {isRenaming ? (
            <input
              ref={inputRef}
              type="text"
              className="file-tree-rename-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleInputKeyDown}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="file-tree-name">{node.name}</span>
          )}
        </div>

        {node.isDirectory && isExpanded && node.children && (
          <div className="file-tree-children" role="group">
            {node.children.map((child) => (
              <FileTreeItem key={child.path} node={child} depth={depth + 1} />
            ))}
            {node.children.length === 0 && (
              <div className="file-tree-empty" style={{ paddingLeft: `${(depth + 1) * 16 + 8}px` }}>
                {t('fileTree.noFiles', 'No markdown files')}
              </div>
            )}
          </div>
        )}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={menuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}
