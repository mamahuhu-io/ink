import { useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFileTreeStore } from '../../stores/fileTree'
import { FileTreeItem } from './FileTreeItem'
import { ContextMenu } from '../ContextMenu'
import { useFileTreeMenu } from './hooks'

export function FileTree() {
  const { t } = useTranslation()
  const {
    rootPath,
    entries,
    isLoading,
    openFolderPicker,
    refresh,
    setRootPath,
  } = useFileTreeStore()
  
  const { getMenuItems } = useFileTreeMenu()
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  // Load entries when rootPath changes
  useEffect(() => {
    if (rootPath && entries.length === 0) {
      refresh()
    }
  }, [rootPath, entries.length, refresh])

  const handleCloseWorkspace = useCallback(() => {
    setRootPath(null)
  }, [setRootPath])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (!rootPath) return
    
    // Prevent default context menu
    e.preventDefault()
    e.stopPropagation() // Stop bubbling to avoid double menus if nested
    
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [rootPath])

  if (!rootPath) {
    return (
      <div className="file-tree-empty-state">
        <p>{t('fileTree.noWorkspace')}</p>
        <button className="open-folder-btn" onClick={openFolderPicker}>
          {t('fileTree.openFolder')}
        </button>
      </div>
    )
  }

  const workspaceName = rootPath.split(/[/\\]/).pop() || rootPath
  const menuItems = getMenuItems({ isRoot: true, isDirectory: true, path: rootPath })

  return (
    <div className="file-tree">
      <div className="file-tree-header" onContextMenu={handleContextMenu}>
        <span className="workspace-name" title={rootPath}>
          {workspaceName}
        </span>
        <div className="file-tree-actions">
          <button
            className="file-tree-action-btn"
            onClick={refresh}
            title={t('fileTree.refresh')}
            disabled={isLoading}
          >
            ↻
          </button>
          <button
            className="file-tree-action-btn"
            onClick={handleCloseWorkspace}
            title={t('fileTree.closeWorkspace')}
          >
            ✕
          </button>
        </div>
      </div>

      <div 
        className="file-tree-content" 
        role="tree" 
        onContextMenu={(e) => {
          // Only trigger if clicking on the background, not on an item
          if (e.target === e.currentTarget) {
            handleContextMenu(e)
          }
        }}
      >
        {isLoading && entries.length === 0 ? (
          <div className="file-tree-loading">{t('fileTree.loading')}</div>
        ) : entries.length === 0 ? (
          <div className="file-tree-empty">{t('fileTree.noFiles')}</div>
        ) : (
          entries.map((node) => (
            <FileTreeItem
              key={node.path}
              node={node}
              depth={0}
            />
          ))
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
    </div>
  )
}
