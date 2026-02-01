/**
 * Image utility functions for handling image paths and processing
 */

/**
 * MIME type mapping for common image extensions
 */
export const IMAGE_MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
};

/**
 * Reverse mapping from MIME type to file extension
 * NOTE: Must match stone framework's mimeExtMap for consistency
 */
export const MIME_TO_EXT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpeg', // Match stone framework (not 'jpg')
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/apng': 'apng',
  'image/avif': 'avif',
  'image/tiff': 'tiff',
};

/**
 * Get file extension from MIME type
 */
export function getExtFromMime(mimeType: string): string {
  return MIME_TO_EXT[mimeType] || 'png';
}

/**
 * Get MIME type from file extension
 */
export function getMimeFromExt(ext: string): string {
  return IMAGE_MIME_TYPES[ext.toLowerCase()] || 'image/png';
}

/**
 * Remove angle brackets from markdown image URLs
 * Handles format like: <assets/image (4).png> -> assets/image (4).png
 */
export function stripAngleBrackets(url: string): string {
  return url.replace(/^<|>$/g, '');
}

/**
 * Decode URL-encoded path safely
 */
export function decodeImagePath(imagePath: string): string {
  try {
    return decodeURIComponent(imagePath);
  } catch {
    return imagePath;
  }
}

/**
 * Parse and clean an image path from markdown
 */
export function parseImagePath(rawPath: string): string {
  return decodeImagePath(stripAngleBrackets(rawPath));
}

/**
 * Check if a path is a remote URL or data URI
 */
export function isRemoteOrDataUrl(path: string): boolean {
  return path.includes('://') || path.startsWith('data:');
}

/**
 * Resolve a relative image path to an absolute path
 */
export function resolveImagePath(imagePath: string, fileDir: string): string {
  const cleanPath = parseImagePath(imagePath);

  if (cleanPath.startsWith('./')) {
    return `${fileDir}/${cleanPath.substring(2)}`;
  } else if (cleanPath.startsWith('../')) {
    return `${fileDir}/${cleanPath}`;
  } else if (!isRemoteOrDataUrl(cleanPath) && !cleanPath.startsWith('/')) {
    return `${fileDir}/${cleanPath}`;
  }
  return cleanPath;
}

/**
 * Extract directory path from a file path
 */
export function getDirectoryFromPath(filePath: string): string {
  return filePath.substring(0, Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')));
}

/**
 * Regex pattern source for matching markdown image syntax
 * Matches both ![alt](url) and ![alt](<url with spaces>)
 * Use with new RegExp(IMAGE_MARKDOWN_PATTERN, 'g') for global matching
 */
export const IMAGE_MARKDOWN_PATTERN = '!\\[([^\\]]*)\\]\\((<[^>]+>|[^)\\s]+)\\)';

/**
 * Create a new regex for matching markdown images (global)
 */
export function createImageMarkdownRegex(): RegExp {
  return new RegExp(IMAGE_MARKDOWN_PATTERN, 'g');
}

/**
 * Regex pattern for matching a single markdown image line
 */
export const IMAGE_LINE_REGEX = /^!\[([^\]]*)\]\((<[^>]+>|[^)\s]+)\)$/;

/**
 * Regex pattern source for matching markdown link syntax (for attachments)
 * Matches both [text](url) and [text](<url with spaces>)
 * Does NOT match images (which start with !)
 * Use with new RegExp(LINK_MARKDOWN_PATTERN, 'g') for global matching
 */
export const LINK_MARKDOWN_PATTERN = '(?<!!)\\[([^\\]]*)\\]\\((<[^>]+>|[^)\\s]+)\\)';

/**
 * Create a new regex for matching markdown links (global)
 */
export function createLinkMarkdownRegex(): RegExp {
  return new RegExp(LINK_MARKDOWN_PATTERN, 'g');
}
