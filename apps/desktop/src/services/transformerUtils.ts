/**
 * Shared transformer utilities for import/export operations
 */

// ============================================
// Constants
// ============================================

/** Delay to wait for document initialization */
export const DOC_INIT_DELAY = 100

/** Default image dimensions for DOCX export */
export const DEFAULT_IMAGE_WIDTH = 400
export const DEFAULT_IMAGE_HEIGHT = 300

/** Maximum image dimensions for DOCX export */
export const MAX_DOCX_IMAGE_WIDTH = 600
export const MAX_DOCX_IMAGE_HEIGHT = 450

/** Scale factor for image export (higher = better quality) */
export const IMAGE_EXPORT_SCALE = 2

// ============================================
// Transformer Context
// ============================================

interface TransformerContext {
  transformer: any
  htmlAdapter: any
  markdownAdapter: any
}

/**
 * Create a shared transformer context for import/export operations
 * This avoids duplicating the transformer creation logic
 */
export async function createTransformerContext(): Promise<TransformerContext> {
  const { HtmlAdapter, MarkdownAdapter } = await import('@ink/stone-shared/adapters')
  const { Transformer } = await import('@ink/stone-store')
  const { getWorkspace, getSchema, getStoreExtensions } = await import('../stores/editor')
  const { Container } = await import('@ink/stone-global/di')

  const ws = getWorkspace()
  const schema = getSchema()
  const storeExtensions = getStoreExtensions()

  // Create container and provider
  const container = new Container()
  storeExtensions.forEach((ext: { setup: (c: typeof container) => void }) => {
    ext.setup(container)
  })
  const provider = container.provider()

  // Create transformer
  const transformer = new Transformer({
    schema,
    blobCRUD: ws.blobSync,
    docCRUD: {
      create: (id: string) => ws.createDoc(id).getStore({ id }),
      get: (id: string) => ws.getDoc(id)?.getStore({ id }) ?? null,
      delete: (id: string) => ws.removeDoc(id),
    },
  })

  // Create adapters
  const htmlAdapter = new HtmlAdapter(transformer, provider)
  const markdownAdapter = new MarkdownAdapter(transformer, provider)

  return { transformer, htmlAdapter, markdownAdapter }
}

// ============================================
// Block Import Helper
// ============================================

/**
 * Import a block snapshot into a store
 * Shared logic for DOCX and HTML imports
 */
export async function importBlockSnapshotToStore(
  blockSnapshot: any,
  store: any,
  transformer: any
): Promise<void> {
  const root = store.root
  if (!root) {
    throw new Error('Store root not found')
  }

  // Find the note block
  const noteBlock = root.children.find((c: any) => c.flavour === 'ink:note')
  if (!noteBlock) {
    throw new Error('Note block not found')
  }

  // Get the children snapshots from the block snapshot
  const childrenSnapshots = blockSnapshot.children || []

  // Import each child block
  for (const childSnapshot of childrenSnapshots) {
    // Skip note blocks as we already have one
    if (childSnapshot.flavour === 'ink:note') {
      // Import the note's children instead
      for (const noteChildSnapshot of childSnapshot.children || []) {
        const block = await transformer.snapshotToBlock(
          noteChildSnapshot,
          store,
          noteBlock.id
        )
        if (block) {
          noteBlock.children.push(block)
        }
      }
    } else {
      // Import directly under the note
      const block = await transformer.snapshotToBlock(
        childSnapshot,
        store,
        noteBlock.id
      )
      if (block) {
        noteBlock.children.push(block)
      }
    }
  }
}

// ============================================
// Base64 Conversion Utilities
// ============================================

/**
 * Convert a Blob to base64 data URL
 * Optimized version using FileReader
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert blob to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Convert ArrayBuffer to base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer)
  let binary = ''
  const chunkSize = 8192
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize)
    binary += String.fromCharCode.apply(null, Array.from(chunk))
  }
  return btoa(binary)
}
