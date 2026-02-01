import { StoreExtensionManager } from '@ink/stone-core/ext-loader';
import { getInternalStoreExtensions } from '@ink/stone-core/extensions/store';
import { InkSchemas } from '@ink/stone-core/schemas';
import { Container } from '@ink/stone-global/di';
import { ATTACHMENT_SIZE_KEY_PREFIX, MarkdownAdapter } from '@ink/stone-shared/adapters';
import {
  type BlockModel,
  type Doc,
  getAssetName,
  Schema,
  type Store,
  Transformer,
} from '@ink/stone-store';
import { TestWorkspace as TestWorkspaceImpl } from '@ink/stone-store/test';

import {
  createImageMarkdownRegex,
  createLinkMarkdownRegex,
  getDirectoryFromPath,
  IMAGE_MIME_TYPES,
  isRemoteOrDataUrl,
  parseImagePath,
  resolveImagePath,
} from '../utils/imageUtils';
import { type BlockDef, parseMarkdownInWorker } from '../workers/markdownParserManager';

// Batch processing configuration
const BATCH_SIZE = 50; // Number of operations per batch
const BATCH_DELAY = 0; // Delay between batches (0 = just yield to main thread)

/**
 * Process items in batches, yielding to main thread between batches
 * This prevents UI freezing during large operations
 */
async function processBatched<T>(
  items: T[],
  processor: (item: T, index: number) => void | Promise<void>,
  options?: {
    batchSize?: number;
    onProgress?: (progress: number) => void;
  },
): Promise<void> {
  const batchSize = options?.batchSize ?? BATCH_SIZE;
  const total = items.length;

  for (let i = 0; i < total; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    for (let j = 0; j < batch.length; j++) {
      await processor(batch[j], i + j);
    }

    // Report progress
    if (options?.onProgress) {
      options.onProgress(Math.min((i + batchSize) / total, 1));
    }

    // Yield to main thread between batches (except for last batch)
    if (i + batchSize < total) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
    }
  }
}

// Lazy initialization: only initialize when first accessed
// This improves startup performance by deferring expensive initialization
let schema: Schema | null = null;
let extensionManager: StoreExtensionManager | null = null;
let storeExtensions: any[] | null = null;
let provider: any | null = null;

function getSchemaLazy(): Schema {
  if (!schema) {
    schema = new Schema().register(InkSchemas);
  }
  return schema;
}

function getExtensionManagerLazy(): StoreExtensionManager {
  if (!extensionManager) {
    extensionManager = new StoreExtensionManager(getInternalStoreExtensions());
  }
  return extensionManager;
}

function getStoreExtensionsLazy() {
  if (!storeExtensions) {
    const manager = getExtensionManagerLazy();
    storeExtensions = manager.get('store');
  }
  return storeExtensions;
}

function getProviderLazy() {
  if (!provider) {
    const container = new Container();
    const extensions = getStoreExtensionsLazy();
    extensions.forEach((ext) => {
      ext.setup(container);
    });
    provider = container.provider();
  }
  return provider;
}

// Create a single Workspace (previously DocCollection)
let workspace: TestWorkspaceImpl | null = null;

// Track saved images: sourceId -> relative path
const savedImagePaths = new Map<string, string>();

// Track blob names to saved paths
const blobNameToPath = new Map<string, string>();

export function getWorkspace(): TestWorkspaceImpl {
  if (!workspace) {
    workspace = new TestWorkspaceImpl({ id: 'workspace' });
    workspace.storeExtensions = getStoreExtensionsLazy();
    workspace.meta.initialize();
  }
  return workspace;
}

export function getStoreExtensions() {
  return getStoreExtensionsLazy();
}

export function getSchema() {
  return getSchemaLazy();
}

// Store for doc instances
const docs = new Map<string, Doc>();

// Store for store (editor data) instances
const stores = new Map<string, Store>();

// Track documents that are currently loading content
// This is used to prevent false "modified" state during initial load
const loadingDocs = new Set<string>();

// Listeners for loading state changes
const loadingListeners = new Set<(docId: string, isLoading: boolean) => void>();

/**
 * Check if a document is currently loading content
 */
export function isDocLoading(docId: string): boolean {
  return loadingDocs.has(docId);
}

/**
 * Mark a document as loading (call before markdownToDoc)
 * This should be called immediately after creating a tab to ensure
 * the loading UI stays visible until content is fully loaded
 */
export function setDocLoading(docId: string, loading: boolean): void {
  if (loading) {
    loadingDocs.add(docId);
  } else {
    loadingDocs.delete(docId);
  }
  loadingListeners.forEach((cb) => cb(docId, loading));
}

/**
 * Subscribe to loading state changes
 */
export function onDocLoadingChange(
  callback: (docId: string, isLoading: boolean) => void,
): () => void {
  loadingListeners.add(callback);
  return () => loadingListeners.delete(callback);
}

// Listeners for store creation
const storeListeners = new Set<(docId: string, store: Store) => void>();

export function onStoreCreated(callback: (docId: string, store: Store) => void) {
  storeListeners.add(callback);
  return () => storeListeners.delete(callback);
}

export function getOrCreateDoc(docId: string): { doc: Doc; store: Store } {
  const ws = getWorkspace();

  if (docs.has(docId)) {
    const doc = docs.get(docId)!;
    const store = stores.get(docId)!;
    if (!doc.ready) {
      doc.load();
    }
    return { doc, store };
  }

  const doc = ws.createDoc(docId);
  docs.set(docId, doc);

  doc.load();

  const store = doc.getStore();
  stores.set(docId, store);

  storeListeners.forEach((cb) => cb(docId, store));

  const pageBlockId = store.addBlock('ink:page', {});
  const noteId = store.addBlock('ink:note', {}, pageBlockId);
  store.addBlock('ink:paragraph', {}, noteId);

  return { doc, store };
}

export function getStore(docId: string): Store | undefined {
  return stores.get(docId);
}

export function removeDoc(docId: string) {
  if (docs.has(docId)) {
    docs.delete(docId);
    stores.delete(docId);
    const ws = getWorkspace();
    ws.removeDoc(docId);
  }
}

/**
 * Delta item from Yjs Text
 */
interface DeltaItem {
  insert: string;
  attributes?: {
    code?: boolean;
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
    underline?: boolean;
    link?: string;
    color?: string;
    background?: string;
  };
}

/**
 * Convert delta array to markdown formatted text
 */
function deltaToMarkdown(textObj: any): string {
  if (!textObj) return '';

  if (typeof textObj === 'string') return textObj;
  if (typeof textObj.toDelta !== 'function') {
    return textObj.toString?.() || '';
  }

  const deltas: DeltaItem[] = textObj.toDelta();
  if (!deltas || deltas.length === 0) {
    return textObj.toString?.() || '';
  }

  return deltas
    .map((delta: DeltaItem) => {
      let text = delta.insert || '';
      const attrs = delta.attributes;

      if (!attrs) return text;

      if (attrs.code) {
        text = `\`${text}\``;
      } else {
        if (attrs.strike) {
          text = `~~${text}~~`;
        }
        if (attrs.bold) {
          text = `**${text}**`;
        }
        if (attrs.italic) {
          text = `*${text}*`;
        }
        if (attrs.link) {
          text = `[${text}](${attrs.link})`;
        }
      }

      // Handle color and background using HTML span tags
      // These are preserved in markdown as inline HTML
      if (attrs.color || attrs.background) {
        const styles: string[] = [];
        if (attrs.color) {
          styles.push(`color:${attrs.color}`);
        }
        if (attrs.background) {
          styles.push(`background-color:${attrs.background}`);
        }
        text = `<span style="${styles.join(';')}">${text}</span>`;
      }

      return text;
    })
    .join('');
}

/**
 * Parse text with HTML span style tags and create a Text object with proper delta attributes
 */
function parseStyledText(store: Store, text: string): InstanceType<Store['Text']> {
  const textObj = new store.Text();

  // Regex to match <span style="...">content</span> patterns
  const spanRegex = /<span\s+style="([^"]*)">(.*?)<\/span>/g;

  let lastIndex = 0;
  let match;

  while ((match = spanRegex.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index);
      textObj.insert(plainText, textObj.length);
    }

    const styleStr = match[1];
    const content = match[2];

    // Parse style string
    const attributes: Record<string, string> = {};
    const styleItems = styleStr.split(';').filter((s) => s.trim());

    for (const item of styleItems) {
      const [prop, value] = item.split(':').map((s) => s.trim());
      if (prop === 'color' && value) {
        attributes.color = value;
      } else if (prop === 'background-color' && value) {
        attributes.background = value;
      }
    }

    // Insert styled text with attributes
    if (Object.keys(attributes).length > 0) {
      textObj.insert(content, textObj.length, attributes);
    } else {
      textObj.insert(content, textObj.length);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    textObj.insert(text.slice(lastIndex), textObj.length);
  }

  return textObj;
}

/**
 * Check if text contains styled spans
 */
function hasStyledSpans(text: string): boolean {
  return /<span\s+style="[^"]*">.*?<\/span>/.test(text);
}

/**
 * Create text object, parsing styled spans if present
 */
function createTextWithStyles(store: Store, text: string): InstanceType<Store['Text']> {
  if (hasStyledSpans(text)) {
    return parseStyledText(store, text);
  }
  return new store.Text(text);
}

/**
 * Extract text content from a block and its children
 */
function extractBlockText(
  block: BlockModel,
  indent = 0,
  imagePathMap?: Map<string, string>,
): string {
  const lines: string[] = [];
  const prefix = '  '.repeat(indent);

  switch (block.flavour) {
    case 'ink:paragraph': {
      const text = deltaToMarkdown((block as any).text);
      const type = (block as any).type || 'text';

      if (type === 'h1') {
        lines.push(`# ${text}`);
      } else if (type === 'h2') {
        lines.push(`## ${text}`);
      } else if (type === 'h3') {
        lines.push(`### ${text}`);
      } else if (type === 'h4') {
        lines.push(`#### ${text}`);
      } else if (type === 'h5') {
        lines.push(`##### ${text}`);
      } else if (type === 'h6') {
        lines.push(`###### ${text}`);
      } else if (type === 'quote') {
        lines.push(`> ${text}`);
      } else {
        lines.push(text);
      }
      break;
    }
    case 'ink:list': {
      const text = deltaToMarkdown((block as any).text);
      const type = (block as any).type || 'bulleted';
      const checked = (block as any).checked;

      if (type === 'numbered') {
        lines.push(`${prefix}1. ${text}`);
      } else if (type === 'todo') {
        lines.push(`${prefix}- [${checked ? 'x' : ' '}] ${text}`);
      } else {
        lines.push(`${prefix}- ${text}`);
      }
      break;
    }
    case 'ink:code': {
      const text = (block as any).text?.toString() || '';
      const language = (block as any).language || '';
      lines.push(`\`\`\`${language}`);
      lines.push(text);
      lines.push('```');
      break;
    }
    case 'ink:divider': {
      lines.push('---');
      break;
    }
    case 'ink:image': {
      const caption = (block as any).caption || '';
      const sourceId = (block as any).sourceId;

      if (sourceId && imagePathMap?.has(sourceId)) {
        const imagePath = imagePathMap.get(sourceId)!;
        lines.push(`![${caption}](${imagePath})`);
      } else if (sourceId && savedImagePaths.has(sourceId)) {
        const imagePath = savedImagePaths.get(sourceId)!;
        lines.push(`![${caption}](${imagePath})`);
      } else {
        lines.push(`![${caption}]()`);
      }
      break;
    }
    case 'ink:attachment': {
      const name = (block as any).name || 'attachment';
      const sourceId = (block as any).sourceId;

      if (sourceId && imagePathMap?.has(sourceId)) {
        const attachmentPath = imagePathMap.get(sourceId)!;
        lines.push(`[${name}](${attachmentPath})`);
      } else if (sourceId && savedImagePaths.has(sourceId)) {
        const attachmentPath = savedImagePaths.get(sourceId)!;
        lines.push(`[${name}](${attachmentPath})`);
      } else {
        lines.push(`[${name}]()`);
      }
      break;
    }
    default:
      if ((block as any).text) {
        lines.push(deltaToMarkdown((block as any).text));
      }
  }

  for (const child of block.children) {
    const childIndent = block.flavour === 'ink:list' ? indent + 1 : 0;
    lines.push(extractBlockText(child, childIndent, imagePathMap));
  }

  return lines.filter(Boolean).join('\n');
}

/**
 * Collect all asset sourceIds (images and attachments) from a block tree
 */
function collectAssetSourceIds(block: BlockModel): string[] {
  const sourceIds: string[] = [];

  if (block.flavour === 'ink:image' || block.flavour === 'ink:attachment') {
    const sourceId = (block as any).sourceId;
    if (sourceId) {
      sourceIds.push(sourceId);
    }
  }

  for (const child of block.children) {
    sourceIds.push(...collectAssetSourceIds(child));
  }

  return sourceIds;
}

/**
 * Save assets (images and attachments) from a document to the assets folder (used by fallback export)
 */
async function saveDocAssets(store: Store, filePath: string): Promise<Map<string, string>> {
  const assetPathMap = new Map<string, string>();

  if (!filePath) {
    return assetPathMap;
  }

  const root = store.root;
  if (!root) {
    return assetPathMap;
  }

  // Collect all asset sourceIds (images and attachments) from the document
  const sourceIds: string[] = [];
  for (const child of root.children) {
    if (child.flavour === 'ink:note') {
      for (const noteChild of child.children) {
        sourceIds.push(...collectAssetSourceIds(noteChild));
      }
    }
  }

  if (sourceIds.length === 0) {
    return assetPathMap;
  }

  const ws = getWorkspace();
  const blobStorage = ws.blobSync;
  const { saveImage, saveAsset } = await import('../services/images');

  for (const sourceId of sourceIds) {
    try {
      // Check if already saved
      if (savedImagePaths.has(sourceId)) {
        const existingPath = savedImagePaths.get(sourceId)!;
        assetPathMap.set(sourceId, existingPath);

        // Also set blobNameToPath mapping for already saved assets
        const blob = await blobStorage.get(sourceId);
        if (blob) {
          const tempAssets = new Map<string, Blob>([[sourceId, blob]]);
          const blobName = getAssetName(tempAssets, sourceId);
          blobNameToPath.set(blobName, existingPath);
          blobNameToPath.set(sourceId, existingPath);
        }
        continue;
      }

      const blob = await blobStorage.get(sourceId);
      if (!blob) {
        continue;
      }

      let relativePath: string;
      const blobType = blob.type;

      if (blobType.startsWith('image/')) {
        // Save as image
        relativePath = await saveImage(filePath, blob);
      } else {
        // Save as attachment (non-image asset)
        const originalFileName = (blob as File).name || `attachment-${sourceId}`;
        relativePath = await saveAsset(filePath, blob, originalFileName);
      }

      assetPathMap.set(sourceId, relativePath);
      savedImagePaths.set(sourceId, relativePath);

      // Create temp map to use getAssetName for consistency with MarkdownAdapter
      const tempAssets = new Map<string, Blob>([[sourceId, blob]]);
      const blobName = getAssetName(tempAssets, sourceId);
      blobNameToPath.set(blobName, relativePath);
      blobNameToPath.set(sourceId, relativePath);
    } catch (error) {
      console.error('[saveDocAssets] Failed to save asset:', sourceId, error);
    }
  }

  return assetPathMap;
}

/**
 * Save assets (images and attachments) from AssetsManager to the assets folder
 * This is called after MarkdownAdapter generates markdown, which populates the assetsManager
 */
async function saveImagesFromAssetsManager(
  assetsManager: { getAssets: () => Map<string, Blob> },
  filePath: string,
): Promise<Map<string, string>> {
  const imagePathMap = new Map<string, string>();

  const assets = assetsManager.getAssets();
  // Force evaluation of assets size
  const assetsSize = assets.size;
  if (assetsSize === 0) {
    return imagePathMap;
  }

  const { saveImage, saveAsset } = await import('../services/images');

  // Convert to array to avoid potential iterator issues
  const assetEntries = Array.from(assets.entries());

  for (const [blobId, blob] of assetEntries) {
    try {
      // Skip if already saved
      if (savedImagePaths.has(blobId)) {
        const existingPath = savedImagePaths.get(blobId)!;
        imagePathMap.set(blobId, existingPath);

        // Also set blobNameToPath mapping for already saved assets
        const blobName = getAssetName(assets, blobId);
        if (blobName) {
          blobNameToPath.set(blobName, existingPath);
        }
        blobNameToPath.set(blobId, existingPath);
        continue;
      }

      const blobType = blob.type;
      let relativePath: string;

      if (blobType.startsWith('image/')) {
        // Save as image
        relativePath = await saveImage(filePath, blob);
      } else {
        // Save as attachment (non-image asset)
        // Get original filename from blob if available
        const originalFileName =
          (blob as File).name || getAssetName(assets, blobId) || `attachment-${blobId}`;
        relativePath = await saveAsset(filePath, blob, originalFileName);
      }

      imagePathMap.set(blobId, relativePath);
      savedImagePaths.set(blobId, relativePath);

      // Use getAssetName from stone-store to ensure consistency with MarkdownAdapter
      const blobName = getAssetName(assets, blobId);
      // Ensure blobName is used before setting
      if (blobName) {
        blobNameToPath.set(blobName, relativePath);
      }
      blobNameToPath.set(blobId, relativePath);
    } catch (error) {
      console.error('[saveImagesFromAssetsManager] Failed to save:', blobId, error);
    }
  }

  return imagePathMap;
}

/**
 * Create a configured Transformer instance
 */
function createTransformer(): Transformer {
  const ws = getWorkspace();
  return new Transformer({
    schema: getSchemaLazy(),
    blobCRUD: ws.blobSync,
    docCRUD: {
      create: (id: string) => ws.createDoc(id).getStore({ id }),
      get: (id: string) => ws.getDoc(id)?.getStore({ id }) ?? null,
      delete: (id: string) => ws.removeDoc(id),
    },
  });
}

/**
 * Create a MarkdownAdapter with the configured transformer
 */
function createMarkdownAdapter(transformer: Transformer): MarkdownAdapter {
  return new MarkdownAdapter(transformer, getProviderLazy());
}

/**
 * Find saved path for an asset filename
 */
function findSavedPath(assetFilename: string, imagePathMap: Map<string, string>): string | null {
  // Try by blobName first
  const pathFromBlobName = blobNameToPath.get(assetFilename);
  if (pathFromBlobName) {
    return pathFromBlobName;
  }

  // Try by sourceId in savedImagePaths
  const savedPathEntries = Array.from(savedImagePaths.entries());
  for (const [sourceId, savedPath] of savedPathEntries) {
    if (assetFilename === sourceId || assetFilename.startsWith(sourceId)) {
      return savedPath;
    }
  }

  // Try by sourceId in imagePathMap
  const imagePathEntries = Array.from(imagePathMap.entries());
  for (const [sourceId, savedPath] of imagePathEntries) {
    if (assetFilename === sourceId || assetFilename.startsWith(sourceId)) {
      return savedPath;
    }
  }

  return null;
}

/**
 * Replace image URLs in markdown with actual saved paths
 */
function replaceImageUrls(markdown: string, imagePathMap: Map<string, string>): string {
  let result = markdown.replace(createImageMarkdownRegex(), (match, alt, rawUrl) => {
    const url = parseImagePath(rawUrl);

    // Handle assets/ URLs
    if (url.startsWith('assets/')) {
      const assetFilename = url.substring(7);
      const savedPath = findSavedPath(assetFilename, imagePathMap);
      if (savedPath) {
        return `![${alt}](${savedPath})`;
      }
    }

    // Handle blob: URLs
    if (url.startsWith('blob:')) {
      for (const [sourceId, savedPath] of savedImagePaths.entries()) {
        if (url.includes(sourceId)) {
          return `![${alt}](${savedPath})`;
        }
      }
    }

    return match;
  });

  // Also replace attachment link URLs (non-image links to assets)
  result = result.replace(createLinkMarkdownRegex(), (match, text, rawUrl) => {
    const url = parseImagePath(rawUrl);

    // Handle assets/ URLs for attachments
    if (url.startsWith('assets/')) {
      const assetFilename = url.substring(7);
      const savedPath = findSavedPath(assetFilename, imagePathMap);
      if (savedPath) {
        return `[${text}](${savedPath})`;
      }
    }

    // Handle blob: URLs for attachments
    if (url.startsWith('blob:')) {
      for (const [sourceId, savedPath] of savedImagePaths.entries()) {
        if (url.includes(sourceId)) {
          return `[${text}](${savedPath})`;
        }
      }
    }

    return match;
  });

  return result;
}

/**
 * Normalize markdown content to reduce false positives in change detection
 * This helps avoid unnecessary block rebuilding when switching between modes
 */
export function normalizeMarkdown(markdown: string): string {
  return markdown
    .trim()
    .replace(/\r\n/g, '\n') // Normalize line endings to LF
    .replace(/[^\S\n]+$/gm, ''); // Remove trailing whitespace from lines
}

/**
 * Export a doc to markdown string using MarkdownAdapter
 */
export async function docToMarkdown(docId: string, filePath?: string): Promise<string> {
  const store = stores.get(docId);
  if (!store) {
    throw new Error(`Store not found: ${docId}`);
  }

  const root = store.root;
  if (!root) {
    return '';
  }

  try {
    const transformer = createTransformer();
    const adapter = createMarkdownAdapter(transformer);

    const snapshot = transformer.docToSnapshot(store);
    if (!snapshot) {
      return '';
    }

    // Log blocks in snapshot for debugging
    const logBlockFlavours = (block: any, depth = 0): void => {
      const prefix = '  '.repeat(depth);
      console.log(`${prefix}[docToMarkdown] Block: ${block.flavour}`, {
        id: block.id,
        props: block.props ? Object.keys(block.props) : [],
      });
      if (block.children) {
        block.children.forEach((child: any) => logBlockFlavours(child, depth + 1));
      }
    };
    console.log('[docToMarkdown] Snapshot blocks:');
    logBlockFlavours(snapshot.blocks);

    // Generate markdown - this populates assetsManager with blobs
    const result = await adapter.fromDocSnapshot({
      snapshot,
      assets: transformer.assetsManager,
    });

    let markdown = result.file;
    console.log('[docToMarkdown] Generated markdown length:', markdown.length);
    console.log('[docToMarkdown] Assets count:', transformer.assetsManager.getAssets().size);

    // Save images and replace URLs if filePath is provided
    if (filePath) {
      const imagePathMap = await saveImagesFromAssetsManager(transformer.assetsManager, filePath);
      markdown = replaceImageUrls(markdown, imagePathMap);
    }

    // Normalize markdown to reduce false positives in change detection
    return normalizeMarkdown(markdown);
  } catch (error) {
    console.error('MarkdownAdapter export failed, using fallback:', error);
    const fallbackMarkdown = await fallbackDocToMarkdown(store, filePath);
    return normalizeMarkdown(fallbackMarkdown);
  }
}

/**
 * Fallback manual markdown extraction
 */
async function fallbackDocToMarkdown(store: Store, filePath?: string): Promise<string> {
  const root = store.root;
  if (!root) {
    return '';
  }

  let assetPathMap: Map<string, string> | undefined;
  if (filePath) {
    assetPathMap = await saveDocAssets(store, filePath);
  }

  const lines: string[] = [];
  for (const child of root.children) {
    if (child.flavour === 'ink:note') {
      for (const noteChild of child.children) {
        lines.push(extractBlockText(noteChild, 0, assetPathMap));
      }
    }
  }

  return lines.join('\n\n');
}

/**
 * Import markdown content into a doc
 */
export async function markdownToDoc(
  docId: string,
  markdown: string,
  filePath?: string,
): Promise<void> {
  const store = stores.get(docId);
  if (!store) {
    throw new Error(`Store not found: ${docId}`);
  }

  const rootBlock = store.root;
  if (!rootBlock) {
    return;
  }

  // Mark document as loading to prevent false "modified" state
  loadingDocs.add(docId);
  loadingListeners.forEach((cb) => cb(docId, true));

  try {
    // Find all note blocks (in case there are multiple due to previous issues)
    const noteBlocks = rootBlock.children.filter((child) => child.flavour === 'ink:note');

    if (noteBlocks.length === 0) {
      return;
    }

    // Use the first note block for adding content
    const noteBlock = noteBlocks[0];

    // Collect all child IDs to delete from all note blocks
    const allChildIds: string[] = [];
    for (const note of noteBlocks) {
      allChildIds.push(...note.children.map((c) => c.id));
    }

    // Delete all children in batches to prevent UI freezing
    await processBatched(allChildIds, (childId) => {
      const block = store.getBlock(childId);
      if (block) {
        store.deleteBlock(block.model);
      }
    });

    // Delete extra note blocks (keep only the first one)
    for (let i = 1; i < noteBlocks.length; i++) {
      store.deleteBlock(noteBlocks[i]);
    }

    const fileDir = filePath ? getDirectoryFromPath(filePath) : '';

    try {
      const transformer = createTransformer();
      const adapter = createMarkdownAdapter(transformer);

      await preloadImagesToAssets(markdown, fileDir, transformer.assetsManager);
      await preloadAttachmentSizes(markdown, fileDir, transformer.adapterConfigs);

      const blockSnapshot = await adapter.toBlockSnapshot({
        file: markdown,
        assets: transformer.assetsManager,
      });

      if (!blockSnapshot) {
        await fallbackMarkdownToDoc(store, noteBlock.id, markdown, fileDir);
        return;
      }

      // Create blocks in batches to prevent UI freezing
      if (blockSnapshot.children) {
        await processBatched(blockSnapshot.children, async (childSnapshot) => {
          try {
            await transformer.snapshotToBlock(childSnapshot, store, noteBlock.id);
          } catch {
            // Skip failed block imports
          }
        });
      }
    } catch (error) {
      console.error('MarkdownAdapter import failed, using fallback:', error);
      await fallbackMarkdownToDoc(store, noteBlock.id, markdown, fileDir);
    }
  } finally {
    // Mark document as no longer loading
    loadingDocs.delete(docId);
    loadingListeners.forEach((cb) => cb(docId, false));
  }
}

/**
 * Pre-load local images into blob storage
 */
async function preloadImagesToAssets(
  markdown: string,
  fileDir: string,
  assetsManager: {
    getAssets: () => Map<string, Blob>;
    getPathBlobIdMap: () => Map<string, string>;
  },
): Promise<void> {
  const imageRegex = createImageMarkdownRegex();
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    const [, , rawImagePath] = match;
    const imagePath = parseImagePath(rawImagePath);

    // Skip remote URLs and data URIs
    if (isRemoteOrDataUrl(imagePath)) {
      continue;
    }

    try {
      const sourceId = await loadImageToBlob(imagePath, fileDir);
      if (sourceId) {
        const ws = getWorkspace();
        const blob = await ws.blobSync.get(sourceId);

        if (blob) {
          assetsManager.getAssets().set(sourceId, blob);

          // Register path mappings for the adapter
          const pathBlobIdMap = assetsManager.getPathBlobIdMap();
          pathBlobIdMap.set(imagePath, sourceId);

          if (imagePath.startsWith('./')) {
            pathBlobIdMap.set(imagePath.substring(2), sourceId);
          }

          const filename = imagePath.split('/').pop();
          if (filename) {
            pathBlobIdMap.set(filename, sourceId);
            pathBlobIdMap.set(`assets/${filename}`, sourceId);
          }

          savedImagePaths.set(sourceId, imagePath);
        }
      }
    } catch {
      // Silently skip failed image loads
    }
  }
}

/**
 * Image file extensions that should NOT be treated as attachments
 */
const IMAGE_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'bmp',
  'ico',
  'tiff',
  'apng',
  'avif',
]);

/**
 * Check if a URL points to an attachment file (not an image)
 */
function isAttachmentUrl(url: string): boolean {
  const extension = url.split('.').pop()?.toLowerCase();
  if (extension && IMAGE_EXTENSIONS.has(extension)) {
    return false;
  }
  // Check if URL is a local file path (assets/ or ./assets/)
  const cleanUrl = url.replace(/^<|>$/g, '');
  return cleanUrl.startsWith('assets/') || cleanUrl.startsWith('./assets/');
}

/**
 * Normalize URL for consistent matching
 * - Decode URL-encoded characters
 * - Remove leading ./
 */
function normalizeAttachmentUrl(url: string): string {
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
 * Pre-load local attachment file sizes
 */
async function preloadAttachmentSizes(
  markdown: string,
  fileDir: string,
  adapterConfigs: Map<string, string>,
): Promise<void> {
  const linkRegex = createLinkMarkdownRegex();
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    const [, , rawLinkPath] = match;
    const linkPath = parseImagePath(rawLinkPath);

    // Skip if not an attachment URL
    if (!isAttachmentUrl(linkPath)) {
      continue;
    }

    // Skip remote URLs and data URIs
    if (isRemoteOrDataUrl(linkPath)) {
      continue;
    }

    try {
      // Resolve the full path
      const fullPath = resolveImagePath(linkPath, fileDir);

      // Get file metadata using the Tauri command
      const { getFileMetadata } = await import('../services/fileSystem');
      const metadata = await getFileMetadata(fullPath);

      if (metadata && !metadata.isDirectory) {
        // Store the size with normalized URL as key
        const normalizedUrl = normalizeAttachmentUrl(linkPath);
        const key = `${ATTACHMENT_SIZE_KEY_PREFIX}${normalizedUrl}`;
        adapterConfigs.set(key, String(metadata.size));
      }
    } catch {
      // Silently skip failed metadata reads
    }
  }
}

// Image regex pattern for sync parsing fallback
const SYNC_IMAGE_LINE_REGEX = /^!\[(.*?)\]\((.+?)\)$/;

/**
 * Synchronous markdown parsing fallback
 * Used when Web Worker is not available or fails
 */
function parseMarkdownSync(markdown: string): BlockDef[] {
  const lines = markdown.split('\n');
  const blockDefs: BlockDef[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = '';

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        blockDefs.push({
          type: 'ink:code',
          props: {
            text: codeBlockContent.join('\n'),
            language: codeBlockLanguage,
          },
        });
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    const imageMatch = line.match(SYNC_IMAGE_LINE_REGEX);
    if (imageMatch) {
      const caption = imageMatch[1];
      let imagePath = imageMatch[2];
      if (imagePath.startsWith('<') && imagePath.endsWith('>')) {
        imagePath = imagePath.slice(1, -1);
      }
      blockDefs.push({
        type: 'ink:image',
        props: { caption },
        imagePath,
      });
      continue;
    }

    if (line.startsWith('# ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h1', text: line.slice(2) },
      });
    } else if (line.startsWith('## ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h2', text: line.slice(3) },
      });
    } else if (line.startsWith('### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h3', text: line.slice(4) },
      });
    } else if (line.startsWith('#### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h4', text: line.slice(5) },
      });
    } else if (line.startsWith('##### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h5', text: line.slice(6) },
      });
    } else if (line.startsWith('###### ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'h6', text: line.slice(7) },
      });
    } else if (line.startsWith('> ')) {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { type: 'quote', text: line.slice(2) },
      });
    } else if (line === '---' || line === '***' || line === '___') {
      blockDefs.push({
        type: 'ink:divider',
        props: {},
      });
    } else if (line.match(/^\s*[-*+]\s/)) {
      const match = line.match(/^\s*[-*+]\s(.*)$/);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: { type: 'bulleted', text: match[1] },
        });
      }
    } else if (line.match(/^\s*\d+\.\s/)) {
      const match = line.match(/^\s*\d+\.\s(.*)$/);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: { type: 'numbered', text: match[1] },
        });
      }
    } else if (line.match(/^\s*-\s*\[[ x]\]\s/i)) {
      const match = line.match(/^\s*-\s*\[([ x])\]\s(.*)$/i);
      if (match) {
        blockDefs.push({
          type: 'ink:list',
          props: {
            type: 'todo',
            checked: match[1].toLowerCase() === 'x',
            text: match[2],
          },
        });
      }
    } else {
      blockDefs.push({
        type: 'ink:paragraph',
        props: { text: line },
      });
    }
  }

  return blockDefs;
}

/**
 * Fallback manual markdown import
 * Uses Web Worker for parsing to avoid blocking the main thread
 */
async function fallbackMarkdownToDoc(
  store: Store,
  noteBlockId: string,
  markdown: string,
  fileDir: string,
): Promise<void> {
  // Parse markdown in Web Worker (non-blocking)
  let blockDefs: BlockDef[];
  try {
    blockDefs = await parseMarkdownInWorker(markdown);
  } catch (error) {
    console.error('Web Worker parsing failed, using sync fallback:', error);
    // Fallback to synchronous parsing if worker fails
    blockDefs = parseMarkdownSync(markdown);
  }

  // Create blocks in batches (main thread, but batched to stay responsive)
  await processBatched(blockDefs, async (blockDef) => {
    if (blockDef.type === 'ink:image' && blockDef.imagePath) {
      try {
        const sourceId = await loadImageToBlob(blockDef.imagePath, fileDir);
        if (sourceId) {
          store.addBlock(
            'ink:image',
            {
              sourceId,
              caption: blockDef.props.caption,
              width: 0,
              height: 0,
            },
            noteBlockId,
          );
          savedImagePaths.set(sourceId, blockDef.imagePath);
          return;
        }
      } catch {
        // Failed to load image, treat as paragraph
      }
      // Fallback to paragraph with original line
      store.addBlock(
        'ink:paragraph',
        {
          text: createTextWithStyles(store, `![${blockDef.props.caption}](${blockDef.imagePath})`),
        },
        noteBlockId,
      );
    } else if (blockDef.type === 'ink:code') {
      store.addBlock(
        'ink:code',
        {
          text: new store.Text(blockDef.props.text as string),
          language: blockDef.props.language,
        },
        noteBlockId,
      );
    } else if (blockDef.type === 'ink:divider') {
      store.addBlock('ink:divider', {}, noteBlockId);
    } else if (blockDef.type === 'ink:list') {
      store.addBlock(
        'ink:list',
        {
          type: blockDef.props.type,
          checked: blockDef.props.checked,
          text: createTextWithStyles(store, blockDef.props.text as string),
        },
        noteBlockId,
      );
    } else {
      // ink:paragraph
      store.addBlock(
        'ink:paragraph',
        {
          type: blockDef.props.type,
          text: createTextWithStyles(store, blockDef.props.text as string),
        },
        noteBlockId,
      );
    }
  });
}

/**
 * Load an image from a path and store it in blob storage
 */
async function loadImageToBlob(imagePath: string, fileDir: string): Promise<string | null> {
  // Skip remote URLs and data URIs
  if (isRemoteOrDataUrl(parseImagePath(imagePath))) {
    return null;
  }

  const absolutePath = resolveImagePath(imagePath, fileDir);

  try {
    const { invoke } = await import('@tauri-apps/api/core');
    const imageData = await invoke<number[]>('read_binary_file', {
      path: absolutePath,
    });

    if (!imageData || imageData.length === 0) {
      return null;
    }

    const ext = absolutePath.split('.').pop()?.toLowerCase() || 'png';
    const mimeType = IMAGE_MIME_TYPES[ext] || 'image/png';
    const blob = new Blob([new Uint8Array(imageData)], { type: mimeType });

    const ws = getWorkspace();
    return await ws.blobSync.set(blob);
  } catch {
    return null;
  }
}

/**
 * Create a new doc from markdown content
 */
export async function createDocFromMarkdown(
  docId: string,
  markdown: string,
  filePath?: string,
): Promise<{ doc: Doc; store: Store }> {
  const ws = getWorkspace();

  const doc = ws.createDoc(docId);
  docs.set(docId, doc);

  doc.load();

  const store = doc.getStore();
  stores.set(docId, store);

  // Initialize with basic structure (Page mode only, no surface block needed)
  const pageBlockId = store.addBlock('ink:page', {});
  store.addBlock('ink:note', {}, pageBlockId);

  // Import markdown content
  await markdownToDoc(docId, markdown, filePath);

  return { doc, store };
}

// Legacy compatibility exports
export { getWorkspace as getCollection };
