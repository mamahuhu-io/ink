/**
 * Import service - handles importing files in various formats
 */

import { isTauri } from './platform'
import { addRecentFile } from './recentItems'
import { showErrorToast, showSuccessToast } from './toast'
import {
  createTransformerContext,
  DOC_INIT_DELAY,
} from './transformerUtils'

// ============================================
// Types
// ============================================

export interface ImportResult {
  success: boolean
  docId?: string
  error?: string
}

type SupportedFormat = 'md' | 'markdown' | 'docx' | 'html' | 'htm'

// ============================================
// File Format Detection
// ============================================

/**
 * Get file extension from path
 */
function getFileExtension(filePath: string): string {
  return filePath.split('.').pop()?.toLowerCase() || ''
}

/**
 * Get filename without extension from path
 */
function getFileName(filePath: string): string {
  return filePath.split(/[/\\]/).pop()?.replace(/\.[^/.]+$/, '') || 'Imported Document'
}

/**
 * Check if file format is supported
 */
function isSupportedFormat(ext: string): ext is SupportedFormat {
  return ['md', 'markdown', 'docx', 'html', 'htm'].includes(ext)
}

// ============================================
// Block Import Helper
// ============================================

/**
 * Import blocks from snapshot into a store's note block
 */
async function importBlocksToNoteBlock(
  blockSnapshot: any,
  store: any,
  transformer: any
): Promise<void> {
  const rootBlock = store.root
  if (!rootBlock) {
    throw new Error('Store root not found')
  }

  const noteBlock = rootBlock.children.find(
    (child: { flavour: string }) => child.flavour === 'ink:note'
  )
  if (!noteBlock) {
    throw new Error('Note block not found')
  }

  // Clear existing children
  const childIds = noteBlock.children.map((c: { id: string }) => c.id)
  for (const childId of childIds) {
    const block = store.getBlock(childId)
    if (block) {
      store.deleteBlock(block.model)
    }
  }

  // Import new blocks
  if (blockSnapshot.children) {
    for (const childSnapshot of blockSnapshot.children) {
      try {
        await transformer.snapshotToBlock(childSnapshot, store, noteBlock.id)
      } catch (err) {
        console.warn('Failed to import block:', childSnapshot.flavour, err)
      }
    }
  }
}

// ============================================
// Format-specific Import Functions
// ============================================

/**
 * Import Markdown file
 */
async function importMarkdown(
  filePath: string,
  content: string,
  docId: string
): Promise<void> {
  const { markdownToDoc } = await import('../stores/editor')
  await markdownToDoc(docId, content, filePath)
  console.log('Successfully imported Markdown:', filePath)
}

/**
 * Import DOCX file
 */
async function importDocx(
  filePath: string,
  fileData: Uint8Array,
  docId: string
): Promise<void> {
  // @ts-ignore - mammoth types
  const { convertToHtml } = await import('mammoth/mammoth.browser')
  const { getOrCreateDoc } = await import('../stores/editor')

  // Convert DOCX to HTML using mammoth
  const { value: html } = await convertToHtml({
    arrayBuffer: fileData.buffer,
  })

  // Wait for document to initialize
  await new Promise(resolve => setTimeout(resolve, DOC_INIT_DELAY))

  // Get store and create transformer context
  const { store } = getOrCreateDoc(docId)
  const { transformer, htmlAdapter } = await createTransformerContext()

  // Convert HTML to block snapshot
  const blockSnapshot = await htmlAdapter.toBlockSnapshot({
    file: html,
    assets: transformer.assetsManager,
  })

  if (blockSnapshot) {
    await importBlocksToNoteBlock(blockSnapshot, store, transformer)
    console.log('Successfully imported DOCX:', filePath)
  } else {
    throw new Error('Failed to convert DOCX to block snapshot')
  }
}

/**
 * Import HTML file
 */
async function importHtml(
  filePath: string,
  content: string,
  docId: string
): Promise<void> {
  const { getOrCreateDoc } = await import('../stores/editor')

  // Wait for document to initialize
  await new Promise(resolve => setTimeout(resolve, DOC_INIT_DELAY))

  // Get store and create transformer context
  const { store } = getOrCreateDoc(docId)
  const { transformer, htmlAdapter } = await createTransformerContext()

  // Convert HTML to block snapshot
  const blockSnapshot = await htmlAdapter.toBlockSnapshot({
    file: content,
    assets: transformer.assetsManager,
  })

  if (blockSnapshot) {
    await importBlocksToNoteBlock(blockSnapshot, store, transformer)
    console.log('Successfully imported HTML:', filePath)
  } else {
    throw new Error('Failed to convert HTML to block snapshot')
  }
}

// ============================================
// Main Import Function
// ============================================

/**
 * Open import dialog and import selected file
 */
export async function importFile(
  addTab: (title: string, filePath?: string) => string
): Promise<ImportResult> {
  if (!isTauri()) {
    return { success: false, error: 'Import only available in Tauri environment' }
  }

  try {
    const { open } = await import('@tauri-apps/plugin-dialog')
    const { readFile: readBinaryFile, readTextFile } = await import('@tauri-apps/plugin-fs')

    // Open file dialog with multiple format support
    const selected = await open({
      multiple: false,
      filters: [
        { name: 'All Supported', extensions: ['docx', 'md', 'markdown', 'html', 'htm'] },
        { name: 'Word Documents', extensions: ['docx'] },
        { name: 'Markdown', extensions: ['md', 'markdown'] },
        { name: 'HTML', extensions: ['html', 'htm'] },
      ],
    })

    if (!selected) {
      return { success: false }
    }

    const filePath = typeof selected === 'string' ? selected : selected.path
    if (!filePath) {
      return { success: false }
    }

    // Get file extension and name
    const ext = getFileExtension(filePath)
    const fileName = getFileName(filePath)

    // Check if format is supported
    if (!isSupportedFormat(ext)) {
      const error = `Unsupported file format: ${ext}`
      showErrorToast(error)
      return { success: false, error }
    }

    // Create new tab
    const docId = addTab(fileName)

    // Import based on format
    try {
      switch (ext) {
        case 'md':
        case 'markdown': {
          const content = await readTextFile(filePath)
          // Use setTimeout to ensure doc is created
          await new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              try {
                await importMarkdown(filePath, content, docId)
                await addRecentFile(filePath)
                showSuccessToast('Markdown imported successfully')
                resolve()
              } catch (error) {
                reject(error)
              }
            }, DOC_INIT_DELAY)
          })
          break
        }

        case 'docx': {
          const fileData = await readBinaryFile(filePath)
          await importDocx(filePath, fileData, docId)
          showSuccessToast('DOCX imported successfully')
          break
        }

        case 'html':
        case 'htm': {
          const content = await readTextFile(filePath)
          await importHtml(filePath, content, docId)
          showSuccessToast('HTML imported successfully')
          break
        }
      }

      return { success: true, docId }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      showErrorToast(`Failed to import file: ${errorMessage}`)
      console.error('Failed to import file:', error)
      return { success: false, error: errorMessage }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    showErrorToast(`Import failed: ${errorMessage}`)
    console.error('Failed to import file:', error)
    return { success: false, error: errorMessage }
  }
}
