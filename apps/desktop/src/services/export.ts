/**
 * Export service - handles HTML, PDF, DOCX, and Image export
 */

import { isTauri } from './platform'
import { usePreferencesStore } from '../stores/preferences'
import { useThemeStore } from '../stores/theme'
import { getCollection } from '../stores/editor'
import { useTabStore } from '../stores/tabs'
import { showSuccessToast, showErrorToast } from './toast'
import {
  createTransformerContext,
  blobToBase64,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  MAX_DOCX_IMAGE_WIDTH,
  MAX_DOCX_IMAGE_HEIGHT,
  IMAGE_EXPORT_SCALE,
} from './transformerUtils'

// ============================================
// Types
// ============================================

interface BlockData {
  type: string
  text?: string
  language?: string
  checked?: boolean
  caption?: string
  sourceId?: string
  imageSrc?: string  // base64 or file path
  children?: BlockData[]
}

/**
 * Extract block data from a InkStone block model
 */
function extractBlockData(block: any): BlockData | null {
  const data: BlockData = {
    type: block.flavour,
  }

  switch (block.flavour) {
    case 'ink:paragraph': {
      data.text = block.text?.toString() || ''
      // Paragraph type is stored in props.type
      data.type = block.props?.type || block.type || 'text'
      break
    }
    case 'ink:list': {
      data.text = block.text?.toString() || ''
      // List type is stored in props.type (bulleted, numbered, todo, toggle)
      data.type = block.props?.type || block.type || 'bulleted'
      data.checked = block.props?.checked ?? block.checked
      break
    }
    case 'ink:code': {
      data.text = block.text?.toString() || ''
      data.language = block.props?.language || block.language || ''
      break
    }
    case 'ink:divider': {
      break
    }
    case 'ink:image': {
      data.caption = block.props?.caption || block.caption || ''
      data.sourceId = block.props?.sourceId || block.sourceId
      break
    }
    default:
      if (block.text) {
        data.text = block.text.toString()
      }
  }

  // Process children
  if (block.children && block.children.length > 0) {
    data.children = block.children
      .map((child: any) => extractBlockData(child))
      .filter(Boolean) as BlockData[]
  }

  return data
}

/**
 * Load image data for all image blocks
 */
async function loadImageData(
  blocks: BlockData[],
  embedImages: boolean
): Promise<void> {
  const workspace = getCollection()
  const blobStorage = workspace.blobSync

  async function processBlock(block: BlockData): Promise<void> {
    if (block.type === 'ink:image' && block.sourceId) {
      try {
        const blob = await blobStorage.get(block.sourceId)
        if (blob) {
          if (embedImages) {
            // Convert to base64 using shared utility
            block.imageSrc = await blobToBase64(blob)
          } else {
            // Use blob URL (works for PDF print)
            block.imageSrc = URL.createObjectURL(blob)
          }
        }
      } catch (error) {
        console.warn('Failed to load image for export:', block.sourceId, error)
      }
    }

    // Process children
    if (block.children) {
      for (const child of block.children) {
        await processBlock(child)
      }
    }
  }

  for (const block of blocks) {
    await processBlock(block)
  }
}

/**
 * Convert block data to HTML
 */
function blockToHtml(block: BlockData, indent = 0): string {
  const prefix = '  '.repeat(indent)

  switch (block.type) {
    case 'h1':
      return `${prefix}<h1>${escapeHtml(block.text || '')}</h1>`
    case 'h2':
      return `${prefix}<h2>${escapeHtml(block.text || '')}</h2>`
    case 'h3':
      return `${prefix}<h3>${escapeHtml(block.text || '')}</h3>`
    case 'h4':
      return `${prefix}<h4>${escapeHtml(block.text || '')}</h4>`
    case 'h5':
      return `${prefix}<h5>${escapeHtml(block.text || '')}</h5>`
    case 'h6':
      return `${prefix}<h6>${escapeHtml(block.text || '')}</h6>`
    case 'quote':
      return `${prefix}<blockquote>${escapeHtml(block.text || '')}</blockquote>`
    case 'ink:paragraph':
    case 'text':
      return `${prefix}<p>${escapeHtml(block.text || '')}</p>`
    case 'bulleted':
      return `${prefix}<li>${escapeHtml(block.text || '')}</li>`
    case 'numbered':
      return `${prefix}<li>${escapeHtml(block.text || '')}</li>`
    case 'todo':
      const checked = block.checked ? 'checked' : ''
      return `${prefix}<li class="todo"><input type="checkbox" ${checked} disabled> ${escapeHtml(block.text || '')}</li>`
    case 'ink:code':
      return `${prefix}<pre><code class="language-${block.language || ''}">${escapeHtml(block.text || '')}</code></pre>`
    case 'ink:divider':
      return `${prefix}<hr>`
    case 'ink:image':
      const imgSrc = block.imageSrc || ''
      const caption = escapeHtml(block.caption || '')
      if (caption) {
        return `${prefix}<figure><img src="${imgSrc}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`
      }
      return `${prefix}<figure><img src="${imgSrc}" alt=""></figure>`
    default:
      if (block.text) {
        return `${prefix}<p>${escapeHtml(block.text)}</p>`
      }
      return ''
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * Get CSS styles for export
 */
function getExportStyles(theme: 'light' | 'dark'): string {
  const isDark = theme === 'dark'

  return `
    :root {
      --bg-color: ${isDark ? '#1a1a1a' : '#ffffff'};
      --text-color: ${isDark ? '#e0e0e0' : '#333333'};
      --heading-color: ${isDark ? '#ffffff' : '#1a1a1a'};
      --link-color: ${isDark ? '#6db3f2' : '#0066cc'};
      --code-bg: ${isDark ? '#2d2d2d' : '#f5f5f5'};
      --blockquote-border: ${isDark ? '#555555' : '#dddddd'};
      --blockquote-color: ${isDark ? '#aaaaaa' : '#666666'};
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background: var(--bg-color);
      color: var(--text-color);
    }

    h1, h2, h3, h4, h5, h6 {
      color: var(--heading-color);
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.3;
    }

    h1 { font-size: 2em; border-bottom: 1px solid var(--blockquote-border); padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid var(--blockquote-border); padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: var(--blockquote-color); }

    p {
      margin: 1em 0;
    }

    blockquote {
      border-left: 4px solid var(--blockquote-border);
      margin: 1em 0;
      padding: 0.5em 1em;
      color: var(--blockquote-color);
    }

    pre {
      background: var(--code-bg);
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
    }

    code {
      font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 0.9em;
    }

    ul, ol {
      padding-left: 2em;
      margin: 1em 0;
    }

    li {
      margin: 0.5em 0;
    }

    li.todo {
      list-style: none;
      margin-left: -1.5em;
    }

    li.todo input {
      margin-right: 0.5em;
    }

    hr {
      border: none;
      border-top: 1px solid var(--blockquote-border);
      margin: 2em 0;
    }

    figure {
      margin: 1em 0;
      text-align: center;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      display: block;
      overflow: hidden;
    }

    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    figure img {
      max-width: 100%;
    }

    /* InkStone image block container */
    .ink-image-block-container {
      margin: 1em 0;
      text-align: center;
    }

    .ink-image-block-container img {
      max-width: 100%;
      /* Let inline styles (width/height) take precedence */
    }

    figcaption {
      font-size: 0.9em;
      color: var(--blockquote-color);
      margin-top: 0.5em;
    }

    a {
      color: var(--link-color);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    @media print {
      body {
        max-width: none;
        padding: 0;
      }

      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  `
}

/**
 * Generate HTML document from blocks
 */
export function generateHtmlDocument(
  blocks: BlockData[],
  title: string,
  theme: 'light' | 'dark' = 'light'
): string {
  let listStack: string[] = []
  const htmlParts: string[] = []

  function closeOpenLists() {
    while (listStack.length > 0) {
      const listType = listStack.pop()
      htmlParts.push(`</${listType}>`)
    }
  }

  function processBlocks(blockList: BlockData[]) {
    for (const block of blockList) {
      // Handle list items
      if (block.type === 'bulleted' || block.type === 'numbered' || block.type === 'todo') {
        const listType = block.type === 'numbered' ? 'ol' : 'ul'
        const currentList = listStack[listStack.length - 1]

        if (currentList !== listType) {
          closeOpenLists()
          htmlParts.push(`<${listType}>`)
          listStack.push(listType)
        }

        htmlParts.push(blockToHtml(block))

        // Process children
        if (block.children && block.children.length > 0) {
          processBlocks(block.children)
        }
      } else {
        closeOpenLists()
        htmlParts.push(blockToHtml(block))

        // Process children
        if (block.children && block.children.length > 0) {
          processBlocks(block.children)
        }
      }
    }
  }

  processBlocks(blocks)
  closeOpenLists()

  const styles = getExportStyles(theme)
  const content = htmlParts.join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>${styles}</style>
</head>
<body>
${content}
</body>
</html>`
}

/**
 * Get the effective export theme (always use current theme)
 */
export function getEffectiveExportTheme(): 'light' | 'dark' {
  const { resolvedTheme } = useThemeStore.getState()
  return resolvedTheme
}

/**
 * Export document to HTML using HtmlAdapter (preserves links, images, formatting)
 */
export async function exportToHtml(
  filePath: string,
  store: any
): Promise<void> {
  if (!isTauri()) {
    throw new Error('HTML export only available in Tauri environment')
  }

  const root = store?.root
  if (!root) {
    showErrorToast('Document is empty or not loaded')
    throw new Error('Document is empty or not loaded')
  }

  try {
    // Use shared transformer context
    const { transformer, htmlAdapter } = await createTransformerContext()

    // Get block snapshot from root
    const blockSnapshot = transformer.blockToSnapshot(root)
    if (!blockSnapshot) {
      throw new Error('Failed to create block snapshot')
    }

    // Use HtmlAdapter to convert to HTML
    const result = await htmlAdapter.fromBlockSnapshot({
      snapshot: blockSnapshot,
      assets: transformer.assetsManager,
    })

    // Get title from file path
    const title = filePath.split(/[/\\]/).pop()?.replace(/\.(md|html)$/i, '') || 'Untitled'

    // Get theme for styling
    const theme = getEffectiveExportTheme()
    const styles = getExportStyles(theme)

    // Convert asset paths to base64 data URLs
    let htmlContent = result.file
    const assetsManager = transformer.assetsManager
    const assets = assetsManager.getAssets()

    // Replace each asset path with base64 data URL
    for (const [blobId, blob] of assets.entries()) {
      if (blob) {
        try {
          // Use shared blobToBase64 utility
          const dataUrl = await blobToBase64(blob)

          // Replace all occurrences of this asset
          // HtmlAdapter uses format: assets/{blobName} where blobName includes extension
          const blobName = `${blobId}.${blob.type?.split('/')[1] || 'png'}`
          htmlContent = htmlContent.replace(
            new RegExp(`assets/${blobName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
            dataUrl
          )
          // Also try without extension (in case blobId already has extension)
          htmlContent = htmlContent.replace(
            new RegExp(`assets/${blobId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
            dataUrl
          )
        } catch (error) {
          console.warn('Failed to convert asset to base64:', blobId, error)
        }
      }
    }

    // Wrap in complete HTML document with styles
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>${styles}</style>
</head>
<body>
${htmlContent}
</body>
</html>`

    // Save to file
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('write_file', { path: filePath, content: html })

    showSuccessToast('HTML exported successfully')
    console.log('Exported HTML using HtmlAdapter:', filePath)
  } catch (error) {
    console.error('HtmlAdapter export failed, falling back to manual export:', error)
    // Fallback to manual export
    await exportToHtmlFallback(filePath, store)
  }
}

/**
 * Fallback HTML export (manual block extraction)
 */
async function exportToHtmlFallback(
  filePath: string,
  store: any
): Promise<void> {
  const root = store?.root
  if (!root) {
    throw new Error('Document is empty or not loaded')
  }

  // Extract blocks from note
  const blocks: BlockData[] = []
  for (const child of root.children) {
    if (child.flavour === 'ink:note') {
      for (const noteChild of child.children) {
        const blockData = extractBlockData(noteChild)
        if (blockData) {
          blocks.push(blockData)
        }
      }
    }
  }

  // Load image data (always embed for HTML file export)
  await loadImageData(blocks, true)

  // Get title from file path
  const title = filePath.split(/[/\\]/).pop()?.replace(/\.md$/, '') || 'Untitled'

  // Generate HTML
  const theme = getEffectiveExportTheme()
  const html = generateHtmlDocument(blocks, title, theme)

  // Save to file
  const { invoke } = await import('@tauri-apps/api/core')
  await invoke('write_file', { path: filePath, content: html })
}

/**
 * Print to PDF using native browser print
 * This is the only way to achieve true WYSIWYG export
 * because browser's print engine correctly handles Shadow DOM
 */
export async function exportToPdf(): Promise<void> {
  console.log('exportToPdf: Starting print...')

  // Get current tab info for the PDF filename
  const { tabs, activeTabId } = useTabStore.getState()
  const activeTab = tabs.find(t => t.id === activeTabId)

  // Extract filename from filePath or use title
  let pdfName = 'Document'
  if (activeTab) {
    if (activeTab.filePath) {
      // Extract filename without extension from path
      const fileName = activeTab.filePath.split(/[/\\]/).pop() || ''
      pdfName = fileName.replace(/\.md$/i, '')
    } else if (activeTab.title) {
      pdfName = activeTab.title
    }
  }

  // Save original document title
  const originalTitle = document.title

  // Set document title to desired PDF filename
  // Browser uses document.title as default PDF filename
  document.title = pdfName

  // Add printing class to body for print-specific styles
  document.body.classList.add('printing')

  // Small delay to ensure styles are applied
  await new Promise(resolve => setTimeout(resolve, 100))

  // Trigger native print dialog
  // User can select "Save as PDF" in the print dialog
  window.print()

  // Remove printing class after print dialog closes
  // Note: onafterprint may fire immediately in some browsers
  const cleanup = () => {
    document.body.classList.remove('printing')
    document.title = originalTitle
    window.removeEventListener('afterprint', cleanup)
    console.log('exportToPdf: Print completed')
  }

  window.addEventListener('afterprint', cleanup)

  // Fallback cleanup after 1 second in case afterprint doesn't fire
  setTimeout(() => {
    document.body.classList.remove('printing')
    document.title = originalTitle
  }, 1000)
}

/**
 * Export document to DOCX using docx library
 */
export async function exportToDocx(
  filePath: string,
  store: any
): Promise<void> {
  if (!isTauri()) {
    throw new Error('DOCX export only available in Tauri environment')
  }

  const root = store?.root
  if (!root) {
    showErrorToast('Document is empty or not loaded')
    throw new Error('Document is empty or not loaded')
  }

  try {
    // Import docx library
    const {
      Document,
      Paragraph,
      TextRun,
      HeadingLevel,
      AlignmentType,
      Packer,
      ImageRun,
      ExternalHyperlink,
      BorderStyle,
      LevelFormat,
    } = await import('docx')

    // Get workspace for blob storage
    const workspace = getCollection()
    const blobStorage = workspace.blobSync

    // Helper to load image data from blob storage
    async function loadImageBlob(sourceId: string): Promise<{ data: Uint8Array; width: number; height: number } | null> {
      try {
        const blob = await blobStorage.get(sourceId)
        if (!blob) return null

        const arrayBuffer = await blob.arrayBuffer()
        return {
          data: new Uint8Array(arrayBuffer),
          width: DEFAULT_IMAGE_WIDTH,
          height: DEFAULT_IMAGE_HEIGHT
        }
      } catch (error) {
        console.warn('Failed to load image for DOCX export:', sourceId, error)
        return null
      }
    }

    // Convert Y.Text to plain text and extract formatting
    function extractTextContent(textContent: any): { text: string; links: Array<{ start: number; end: number; url: string }> } {
      if (!textContent) {
        return { text: '', links: [] }
      }

      // Check if it's a Y.Text object with toDelta
      if (typeof textContent.toDelta === 'function') {
        const delta = textContent.toDelta()
        let plainText = ''
        const links: Array<{ start: number; end: number; url: string }> = []

        for (const op of delta) {
          if (typeof op.insert === 'string') {
            const startPos = plainText.length
            plainText += op.insert

            // Check for link attribute
            if (op.attributes?.link) {
              links.push({
                start: startPos,
                end: plainText.length,
                url: op.attributes.link
              })
            }
          }
        }

        return { text: plainText, links }
      }

      // Fallback to toString()
      return { text: String(textContent), links: [] }
    }

    // Create paragraph with proper text runs (handling links)
    function createTextRuns(
      text: string,
      links: Array<{ start: number; end: number; url: string }>,
      options: { bold?: boolean; italic?: boolean; size?: number } = {}
    ): (TextRun | ExternalHyperlink)[] {
      if (links.length === 0) {
        return [new TextRun({ text, ...options })]
      }

      const runs: (TextRun | ExternalHyperlink)[] = []
      let currentPos = 0

      for (const link of links) {
        // Add text before link
        if (link.start > currentPos) {
          runs.push(new TextRun({
            text: text.slice(currentPos, link.start),
            ...options
          }))
        }

        // Add link
        runs.push(new ExternalHyperlink({
          children: [
            new TextRun({
              text: text.slice(link.start, link.end),
              style: 'Hyperlink',
              ...options
            })
          ],
          link: link.url
        }))

        currentPos = link.end
      }

      // Add remaining text after last link
      if (currentPos < text.length) {
        runs.push(new TextRun({
          text: text.slice(currentPos),
          ...options
        }))
      }

      return runs
    }

    // Convert block to DOCX paragraph(s)
    async function blockToDocxParagraphs(block: any): Promise<Paragraph[]> {
      const paragraphs: Paragraph[] = []
      const flavour = block.flavour
      const { text: textContent, links } = extractTextContent(block.text)
      const blockType = block.props?.type || block.type

      switch (flavour) {
        case 'ink:paragraph': {
          // Get heading level from props.type
          const headingLevelMap: Record<string, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
            'h1': HeadingLevel.HEADING_1,
            'h2': HeadingLevel.HEADING_2,
            'h3': HeadingLevel.HEADING_3,
            'h4': HeadingLevel.HEADING_4,
            'h5': HeadingLevel.HEADING_5,
            'h6': HeadingLevel.HEADING_6,
          }

          const headingLevel = headingLevelMap[blockType]

          if (blockType === 'quote') {
            // Quote - add with indent and italic
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links, { italic: true }),
              indent: { left: 720 }, // 0.5 inch
              border: {
                left: { style: BorderStyle.SINGLE, size: 24, color: '999999' }
              }
            }))
          } else if (headingLevel) {
            // Heading
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links),
              heading: headingLevel
            }))
          } else {
            // Regular paragraph
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links)
            }))
          }
          break
        }

        case 'ink:list': {
          // List item
          const listType = block.props?.type || block.type || 'bulleted'
          const checked = block.props?.checked ?? block.checked

          if (listType === 'todo') {
            // Todo item with checkbox
            const checkMark = checked ? '☑ ' : '☐ '
            paragraphs.push(new Paragraph({
              children: [
                new TextRun({ text: checkMark }),
                ...createTextRuns(textContent, links)
              ],
              bullet: { level: 0 }
            }))
          } else if (listType === 'numbered') {
            // Numbered list
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links),
              numbering: { reference: 'numberedList', level: 0 }
            }))
          } else {
            // Bulleted list
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links),
              bullet: { level: 0 }
            }))
          }
          break
        }

        case 'ink:code': {
          // Code block - use monospace font
          const codeText = textContent || ''
          const lines = codeText.split('\n')

          for (const line of lines) {
            paragraphs.push(new Paragraph({
              children: [
                new TextRun({
                  text: line || ' ', // Use space for empty lines
                  font: 'Courier New',
                  size: 20  // 10pt
                })
              ],
              shading: { fill: 'F5F5F5' }
            }))
          }
          break
        }

        case 'ink:divider': {
          // Horizontal rule - use border
          paragraphs.push(new Paragraph({
            children: [],
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' }
            },
            spacing: { after: 200, before: 200 }
          }))
          break
        }

        case 'ink:image': {
          // Image block
          const sourceId = block.props?.sourceId || block.sourceId
          if (sourceId) {
            const imageData = await loadImageBlob(sourceId)
            if (imageData) {
              // Get image dimensions from props if available
              const width = block.props?.width || DEFAULT_IMAGE_WIDTH
              const height = block.props?.height || DEFAULT_IMAGE_HEIGHT

              paragraphs.push(new Paragraph({
                children: [
                  new ImageRun({
                    data: imageData.data,
                    transformation: {
                      width: Math.min(width, MAX_DOCX_IMAGE_WIDTH),
                      height: Math.min(height, MAX_DOCX_IMAGE_HEIGHT)
                    },
                    type: 'png'
                  })
                ],
                alignment: AlignmentType.CENTER
              }))

              // Add caption if exists
              const caption = block.props?.caption || block.caption
              if (caption) {
                paragraphs.push(new Paragraph({
                  children: [
                    new TextRun({
                      text: caption,
                      italics: true,
                      size: 20,  // 10pt
                      color: '666666'
                    })
                  ],
                  alignment: AlignmentType.CENTER
                }))
              }
            }
          }
          break
        }

        default: {
          // Default: treat as paragraph
          if (textContent) {
            paragraphs.push(new Paragraph({
              children: createTextRuns(textContent, links)
            }))
          }
        }
      }

      // Process children
      if (block.children && block.children.length > 0) {
        for (const child of block.children) {
          const childParagraphs = await blockToDocxParagraphs(child)
          paragraphs.push(...childParagraphs)
        }
      }

      return paragraphs
    }

    // Build document sections from blocks
    const docSections: Paragraph[] = []

    // Process blocks from note
    for (const child of root.children) {
      if (child.flavour === 'ink:note') {
        for (const noteChild of child.children) {
          const paragraphs = await blockToDocxParagraphs(noteChild)
          docSections.push(...paragraphs)
        }
      }
    }

    // Create DOCX document
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: 'numberedList',
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: '%1.',
                alignment: AlignmentType.LEFT,
              }
            ]
          }
        ]
      },
      sections: [
        {
          children: docSections
        }
      ]
    })

    // Generate docx blob (browser-compatible)
    const blob = await Packer.toBlob(doc)
    const arrayBuffer = await blob.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Save to file using Tauri
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('write_binary_file', {
      path: filePath,
      data: Array.from(uint8Array)
    })

    showSuccessToast('DOCX exported successfully')
    console.log('Exported DOCX:', filePath)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    showErrorToast(`Failed to export DOCX: ${errorMessage}`)
    console.error('Failed to export DOCX:', error)
    throw error
  }
}

/**
 * Export document to PNG image using html2canvas
 */
export async function exportToImage(
  filePath: string
): Promise<void> {
  if (!isTauri()) {
    throw new Error('Image export only available in Tauri environment')
  }

  try {
    // Import html2canvas
    const html2canvas = (await import('html2canvas')).default

    // Find the editor content element
    // The editor content is inside ink-editor-container -> ink-page-root
    const editorContainer = document.querySelector('ink-editor-container')
    if (!editorContainer) {
      throw new Error('Editor container not found')
    }

    // Find the page root - try shadow DOM first, then direct DOM
    let pageRoot: Element | null = null
    const shadowRoot = editorContainer.shadowRoot

    if (shadowRoot) {
      // Shadow DOM mode
      pageRoot = shadowRoot.querySelector('ink-page-root')
    }

    if (!pageRoot) {
      // No shadow DOM or not found in shadow - try direct DOM
      pageRoot = editorContainer.querySelector('ink-page-root') ||
                 document.querySelector('ink-page-root')
    }

    if (!pageRoot) {
      throw new Error('Page root not found')
    }

    // Get computed styles for background color
    const theme = getEffectiveExportTheme()
    const isDark = theme === 'dark'
    const bgColor = isDark ? '#1a1a1a' : '#ffffff'

    // Clone the element to avoid modifying the original
    const clone = pageRoot.cloneNode(true) as HTMLElement

    // Create a wrapper div for proper styling
    const wrapper = document.createElement('div')
    wrapper.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      background: ${bgColor};
      padding: 40px;
      width: ${(pageRoot as HTMLElement).scrollWidth + 80}px;
    `
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 100))

    // Capture the content
    const canvas = await html2canvas(wrapper, {
      backgroundColor: bgColor,
      scale: IMAGE_EXPORT_SCALE,
      useCORS: true,
      allowTaint: true,
      logging: false,
    })

    // Remove the wrapper
    document.body.removeChild(wrapper)

    // Convert canvas to PNG blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create image blob'))
        }
      }, 'image/png')
    })

    // Convert blob to Uint8Array
    const arrayBuffer = await blob.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Save to file using Tauri
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('write_binary_file', {
      path: filePath,
      data: Array.from(uint8Array)
    })

    showSuccessToast('Image exported successfully')
    console.log('Exported Image:', filePath)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    showErrorToast(`Failed to export image: ${errorMessage}`)
    console.error('Failed to export image:', error)
    throw error
  }
}
