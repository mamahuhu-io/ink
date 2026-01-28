/**
 * Attachment size adapter config key prefix
 * Used to pass file sizes from preloading phase to toBlockSnapshot
 */
export const ATTACHMENT_SIZE_KEY_PREFIX = 'attachment:size:';

/**
 * Normalize URL for consistent matching
 * - Decode URL-encoded characters
 * - Remove leading ./
 */
function normalizeUrl(url: string): string {
  let normalized = url;

  // Decode URL-encoded characters
  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    // Keep original if decoding fails
  }

  // Remove leading ./
  if (normalized.startsWith('./')) {
    normalized = normalized.substring(2);
  }

  return normalized;
}

/**
 * Get attachment size from adapter configs
 * @param configs - The adapter configs map
 * @param url - The attachment URL (e.g., "assets/file.xlsx" or "./assets/file.xlsx")
 * @returns The file size in bytes, or 0 if not found
 */
export function getAttachmentSizeFromConfigs(configs: Map<string, string>, url: string): number {
  const normalizedUrl = normalizeUrl(url);

  // Try with normalized URL
  const key = `${ATTACHMENT_SIZE_KEY_PREFIX}${normalizedUrl}`;
  let sizeStr = configs.get(key);

  // If not found, try iterating through configs to find a match
  if (!sizeStr) {
    for (const [configKey, value] of configs.entries()) {
      if (configKey.startsWith(ATTACHMENT_SIZE_KEY_PREFIX)) {
        const configUrl = configKey.substring(ATTACHMENT_SIZE_KEY_PREFIX.length);
        if (normalizeUrl(configUrl) === normalizedUrl) {
          sizeStr = value;
          break;
        }
      }
    }
  }

  return sizeStr ? parseInt(sizeStr, 10) : 0;
}
