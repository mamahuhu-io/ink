import { useTranslation } from 'react-i18next'
import { Edit2, FolderOpen, Copy, FilePlus, FolderPlus, Trash2 } from 'lucide-react'
import { type MenuItem } from '../../ContextMenu'
import { useFileTreeStore } from '../../../stores/fileTree'
import { showInFolder } from '../../../services'

interface MenuContext {
  isRoot?: boolean
  isDirectory: boolean
  path: string
}

export function useFileTreeMenu() {
  const { t } = useTranslation()
  const { 
    setRenamingNode, deleteNode, createNewItem 
  } = useFileTreeStore()

  const getMenuItems = ({ isRoot, isDirectory, path }: MenuContext): MenuItem[] => {
    const items: MenuItem[] = []

    if (isRoot) {
      items.push(
        {
          label: t('fileTree.contextMenu.newFile', 'New File'),
          icon: <FilePlus size={14} />,
          action: () => createNewItem('file', path)
        },
        {
          label: t('fileTree.contextMenu.newFolder', 'New Folder'),
          icon: <FolderPlus size={14} />,
          action: () => createNewItem('folder', path)
        },
        {
          separator: true,
          label: ''
        },
        {
          label: t('fileTree.contextMenu.reveal', 'Reveal in System Explorer'),
          icon: <FolderOpen size={14} />,
          action: () => showInFolder(path)
        }
      )
      return items
    }

    // Standard items
    items.push(
      {
        label: t('fileTree.contextMenu.rename', 'Rename'),
        icon: <Edit2 size={14} />,
        action: () => setRenamingNode(path)
      },
      {
        label: t('fileTree.contextMenu.reveal', 'Reveal in System Explorer'),
        icon: <FolderOpen size={14} />,
        action: () => showInFolder(path)
      },
      {
        label: t('fileTree.contextMenu.copyPath', 'Copy Path'),
        icon: <Copy size={14} />,
        action: () => navigator.clipboard.writeText(path)
      }
    )

    if (isDirectory) {
      items.push(
        { separator: true, label: '' },
        {
          label: t('fileTree.contextMenu.newFile', 'New File'),
          icon: <FilePlus size={14} />,
          action: () => createNewItem('file', path)
        },
        {
          label: t('fileTree.contextMenu.newFolder', 'New Folder'),
          icon: <FolderPlus size={14} />,
          action: () => createNewItem('folder', path)
        }
      )
    }

    items.push(
      { separator: true, label: '' },
      {
        label: t('fileTree.contextMenu.delete', 'Delete'),
        icon: <Trash2 size={14} />,
        danger: true,
        action: () => deleteNode(path)
      }
    )

    return items
  }

  return { getMenuItems }
}
