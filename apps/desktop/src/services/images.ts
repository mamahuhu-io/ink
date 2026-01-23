/**
 * Image service - handles image storage and retrieval
 */

import { isTauri } from './platform'

/**
 * Generate a unique filename for an image
 */
function generateImageFilename(extension: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `image-${timestamp}-${random}.${extension}`
}

/**
 * Generate a unique filename for an asset (preserving original name structure)
 */
function generateAssetFilename(originalFileName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 6)
  const lastDotIndex = originalFileName.lastIndexOf('.')
  if (lastDotIndex > 0) {
    const name = originalFileName.substring(0, lastDotIndex)
    const ext = originalFileName.substring(lastDotIndex + 1)
    return `${name}-${timestamp}-${random}.${ext}`
  }
  return `${originalFileName}-${timestamp}-${random}`
}

/**
 * Get image extension from MIME type
 */
function getExtensionFromMime(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',
  }
  return mimeToExt[mimeType] || 'png'
}

/**
 * Get the directory containing a file
 */
function getDirectory(filePath: string): string {
  const lastSep = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\'))
  return lastSep > 0 ? filePath.substring(0, lastSep) : filePath
}

/**
 * Ensure the assets directory exists for a markdown file
 */
export async function ensureAssetsDirectory(markdownPath: string): Promise<string> {
  if (!isTauri()) {
    throw new Error('Assets directory only available in Tauri environment')
  }

  const { invoke } = await import('@tauri-apps/api/core')
  return await invoke<string>('ensure_assets_directory', { markdownPath })
}

/**
 * Save an image blob to the assets directory
 * Returns the relative path to use in markdown: ./assets/filename.ext
 */
export async function saveImage(
  markdownPath: string,
  imageBlob: Blob,
  originalFileName?: string
): Promise<string> {
  if (!isTauri()) {
    throw new Error('Image saving only available in Tauri environment')
  }

  const { invoke } = await import('@tauri-apps/api/core')

  // Ensure assets directory exists
  const assetsDir = await ensureAssetsDirectory(markdownPath)

  // Generate filename
  const extension = originalFileName
    ? originalFileName.split('.').pop() || getExtensionFromMime(imageBlob.type)
    : getExtensionFromMime(imageBlob.type)
  const fileName = generateImageFilename(extension)

  // Convert blob to byte array
  const arrayBuffer = await imageBlob.arrayBuffer()
  const imageData = Array.from(new Uint8Array(arrayBuffer))

  // Full path for the image
  const imagePath = `${assetsDir}/${fileName}`

  // Save the image
  await invoke<string>('save_image', { filePath: imagePath, imageData })

  // Return relative path for markdown
  return `./assets/${fileName}`
}

/**
 * Save any asset (attachment, document, etc.) to the assets directory
 * Returns the relative path to use in markdown: ./assets/filename.ext
 */
export async function saveAsset(
  markdownPath: string,
  assetBlob: Blob,
  originalFileName: string
): Promise<string> {
  if (!isTauri()) {
    throw new Error('Asset saving only available in Tauri environment')
  }

  const { invoke } = await import('@tauri-apps/api/core')

  // Ensure assets directory exists
  const assetsDir = await ensureAssetsDirectory(markdownPath)

  // Generate unique filename while preserving original name structure
  const fileName = generateAssetFilename(originalFileName)

  // Convert blob to byte array
  const arrayBuffer = await assetBlob.arrayBuffer()
  const assetData = Array.from(new Uint8Array(arrayBuffer))

  // Full path for the asset
  const assetPath = `${assetsDir}/${fileName}`

  // Save the asset (use save_image which handles binary data)
  await invoke<string>('save_image', { filePath: assetPath, imageData: assetData })

  // Return relative path for markdown
  return `./assets/${fileName}`
}

/**
 * Read a binary file (image) and return as blob URL
 */
export async function readImageAsUrl(absolutePath: string): Promise<string> {
  if (!isTauri()) {
    // In browser, assume it's a URL
    return absolutePath
  }

  const { invoke } = await import('@tauri-apps/api/core')

  const imageData = await invoke<number[]>('read_binary_file', { path: absolutePath })
  const uint8Array = new Uint8Array(imageData)

  // Detect MIME type from extension
  const ext = absolutePath.split('.').pop()?.toLowerCase() || 'png'
  const mimeTypes: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    bmp: 'image/bmp',
  }
  const mimeType = mimeTypes[ext] || 'image/png'

  const blob = new Blob([uint8Array], { type: mimeType })
  return URL.createObjectURL(blob)
}

/**
 * Resolve a relative image path to an absolute path
 */
export function resolveImagePath(markdownPath: string, relativePath: string): string {
  // Handle ./assets/... paths
  if (relativePath.startsWith('./')) {
    const dir = getDirectory(markdownPath)
    return `${dir}/${relativePath.substring(2)}`
  }

  // Handle assets/... paths (without ./)
  if (relativePath.startsWith('assets/')) {
    const dir = getDirectory(markdownPath)
    return `${dir}/${relativePath}`
  }

  // Already absolute or URL
  return relativePath
}

/**
 * Check if a path is a local relative path (not a URL)
 */
export function isLocalPath(path: string): boolean {
  return (
    path.startsWith('./') ||
    path.startsWith('../') ||
    path.startsWith('assets/') ||
    (!path.includes('://') && !path.startsWith('data:'))
  )
}
