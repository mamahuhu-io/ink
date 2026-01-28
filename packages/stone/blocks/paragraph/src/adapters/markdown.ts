import { AttachmentBlockSchema, ParagraphBlockSchema } from '@ink/stone-model';
import {
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
  getAttachmentSizeFromConfigs,
  IN_PARAGRAPH_NODE_CONTEXT_KEY,
  type MarkdownAST,
} from '@ink/stone-shared/adapters';
import type { DeltaInsert } from '@ink/stone-store';
import { nanoid } from '@ink/stone-store';
import type { Heading, Link } from 'mdast';

/**
 * Extend the HeadingData type to include the collapsed property
 */
declare module 'mdast' {
  interface HeadingData {
    collapsed?: boolean;
  }
}

const PARAGRAPH_MDAST_TYPE = new Set(['paragraph', 'heading', 'blockquote']);

const isParagraphMDASTType = (node: MarkdownAST) => PARAGRAPH_MDAST_TYPE.has(node.type);

/**
 * Attachment file extensions that should be converted to attachment blocks
 */
const ATTACHMENT_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'zip',
  'rar',
  '7z',
  'tar',
  'gz',
  'txt',
  'csv',
  'json',
  'xml',
  'mp3',
  'mp4',
  'avi',
  'mov',
  'mkv',
  'exe',
  'dmg',
  'apk',
]);

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
  // Remove angle brackets if present (e.g., <assets/file.xlsx> -> assets/file.xlsx)
  const cleanUrl = url.replace(/^<|>$/g, '');

  // Get file extension
  const extension = cleanUrl.split('.').pop()?.toLowerCase();

  // If it's an image, it's NOT an attachment
  if (extension && IMAGE_EXTENSIONS.has(extension)) {
    return false;
  }

  // Check if URL starts with assets/ or ./assets/ AND has an attachment extension
  if (cleanUrl.startsWith('assets/') || cleanUrl.startsWith('./assets/')) {
    // Must have an attachment extension to be considered an attachment
    if (extension && ATTACHMENT_EXTENSIONS.has(extension)) {
      return true;
    }
    // Unknown extension in assets folder - treat as attachment
    if (extension && !IMAGE_EXTENSIONS.has(extension)) {
      return true;
    }
  }

  // Check file extension for non-assets URLs
  if (extension && ATTACHMENT_EXTENSIONS.has(extension)) {
    return true;
  }

  return false;
}

/**
 * Check if a paragraph node contains only a single link to an attachment
 */
function isSingleAttachmentLink(node: MarkdownAST): Link | null {
  if (node.type !== 'paragraph') return null;
  if (!('children' in node) || !Array.isArray(node.children)) return null;
  if (node.children.length !== 1) return null;

  const child = node.children[0];
  if (child.type !== 'link') return null;
  if (!('url' in child)) return null;

  const link = child as Link;
  if (!isAttachmentUrl(link.url)) return null;

  return link;
}

export const paragraphBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher = {
  flavour: ParagraphBlockSchema.model.flavour,
  toMatch: (o) => isParagraphMDASTType(o.node),
  fromMatch: (o) => o.node.flavour === ParagraphBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      const { walkerContext, deltaConverter, configs } = context;
      switch (o.node.type) {
        case 'paragraph': {
          // Check if this paragraph contains only a single attachment link
          const attachmentLink = isSingleAttachmentLink(o.node);

          if (attachmentLink) {
            // Extract file name from link text or URL
            let fileName = '';
            if ('children' in attachmentLink && Array.isArray(attachmentLink.children)) {
              const textNode = attachmentLink.children.find((child) => child.type === 'text');
              if (textNode && 'value' in textNode) {
                fileName = textNode.value as string;
              }
            }

            // If no text, extract from URL
            const cleanUrl = attachmentLink.url.replace(/^<|>$/g, '');
            if (!fileName) {
              fileName = cleanUrl.split('/').pop() || 'attachment';
            }

            // Get file size from preloaded configs
            const fileSize = getAttachmentSizeFromConfigs(configs, cleanUrl);

            // Create attachment block instead of paragraph
            walkerContext
              .openNode(
                {
                  type: 'block',
                  id: nanoid(),
                  flavour: AttachmentBlockSchema.model.flavour,
                  props: {
                    name: fileName,
                    size: fileSize,
                    type: 'application/octet-stream',
                    // Store the original URL in caption for reference
                    caption: cleanUrl,
                  },
                  children: [],
                },
                'children',
              )
              .closeNode();

            // Skip processing children since we've handled the link
            walkerContext.skipAllChildren();
          } else {
            // Normal paragraph processing
            walkerContext.setGlobalContext(IN_PARAGRAPH_NODE_CONTEXT_KEY, true);
            walkerContext
              .openNode(
                {
                  type: 'block',
                  id: nanoid(),
                  flavour: 'ink:paragraph',
                  props: {
                    type: 'text',
                    text: {
                      '$stone:internal:text$': true,
                      delta: deltaConverter.astToDelta(o.node),
                    },
                  },
                  children: [],
                },
                'children',
              )
              .closeNode();
          }
          break;
        }
        case 'heading': {
          const isCollapsed = !!o.node.data?.collapsed;
          walkerContext
            .openNode(
              {
                type: 'block',
                id: nanoid(),
                flavour: 'ink:paragraph',
                props: {
                  type: `h${o.node.depth}`,
                  collapsed: isCollapsed,
                  text: {
                    '$stone:internal:text$': true,
                    delta: deltaConverter.astToDelta(o.node),
                  },
                },
                children: [],
              },
              'children',
            )
            .closeNode();
          break;
        }
        case 'blockquote': {
          walkerContext
            .openNode(
              {
                type: 'block',
                id: nanoid(),
                flavour: 'ink:paragraph',
                props: {
                  type: 'quote',
                  text: {
                    '$stone:internal:text$': true,
                    delta: deltaConverter.astToDelta(o.node),
                  },
                },
                children: [],
              },
              'children',
            )
            .closeNode();
          walkerContext.skipAllChildren();
          break;
        }
      }
    },
    leave: (o, context) => {
      if (o.node.type === 'paragraph') {
        const { walkerContext } = context;
        // Only clear context if we actually set it (i.e., not an attachment link)
        const attachmentLink = isSingleAttachmentLink(o.node);
        if (!attachmentLink) {
          walkerContext.setGlobalContext(IN_PARAGRAPH_NODE_CONTEXT_KEY, false);
        }
      }
    },
  },
  fromBlockSnapshot: {
    enter: (o, context) => {
      const { walkerContext, deltaConverter } = context;
      const paragraphDepth = (walkerContext.getGlobalContext('ink:paragraph:depth') ?? 0) as number;
      const text = (o.node.props.text ?? { delta: [] }) as {
        delta: DeltaInsert[];
      };
      switch (o.node.props.type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          walkerContext
            .openNode(
              {
                type: 'heading',
                depth: parseInt(o.node.props.type[1]) as Heading['depth'],
                children: deltaConverter.deltaToAST(text.delta, paragraphDepth),
              },
              'children',
            )
            .closeNode();
          break;
        }
        case 'text': {
          walkerContext
            .openNode(
              {
                type: 'paragraph',
                children: deltaConverter.deltaToAST(text.delta, paragraphDepth),
              },
              'children',
            )
            .closeNode();
          break;
        }
        case 'quote': {
          walkerContext
            .openNode(
              {
                type: 'blockquote',
                children: [],
              },
              'children',
            )
            .openNode(
              {
                type: 'paragraph',
                children: deltaConverter.deltaToAST(text.delta),
              },
              'children',
            )
            .closeNode()
            .closeNode();
          break;
        }
      }
      walkerContext.setGlobalContext('ink:paragraph:depth', paragraphDepth + 1);
    },
    leave: (_, context) => {
      const { walkerContext } = context;
      walkerContext.setGlobalContext(
        'ink:paragraph:depth',
        (walkerContext.getGlobalContext('ink:paragraph:depth') as number) - 1,
      );
    },
  },
};

export const ParagraphBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  paragraphBlockMarkdownAdapterMatcher,
);
