import { AttachmentBlockSchema, FootNoteReferenceParamsSchema } from '@ink/stone-model';
import {
  BlockMarkdownAdapterExtension,
  type BlockMarkdownAdapterMatcher,
  FOOTNOTE_DEFINITION_PREFIX,
  getFootnoteDefinitionText,
  isFootnoteDefinitionNode,
  type MarkdownAST,
} from '@ink/stone-shared/adapters';
import { getAssetName, nanoid } from '@ink/stone-store';

const isAttachmentFootnoteDefinitionNode = (node: MarkdownAST) => {
  if (!isFootnoteDefinitionNode(node)) return false;
  const footnoteDefinition = getFootnoteDefinitionText(node);
  try {
    const footnoteDefinitionJson = FootNoteReferenceParamsSchema.parse(
      JSON.parse(footnoteDefinition),
    );
    return footnoteDefinitionJson.type === 'attachment' && !!footnoteDefinitionJson.blobId;
  } catch {
    return false;
  }
};

export const attachmentBlockMarkdownAdapterMatcher: BlockMarkdownAdapterMatcher = {
  flavour: AttachmentBlockSchema.model.flavour,
  toMatch: (o) => isAttachmentFootnoteDefinitionNode(o.node),
  fromMatch: (o) => o.node.flavour === AttachmentBlockSchema.model.flavour,
  toBlockSnapshot: {
    enter: (o, context) => {
      if (!isFootnoteDefinitionNode(o.node)) {
        return;
      }

      const { walkerContext, configs } = context;
      const footnoteIdentifier = o.node.identifier;
      const footnoteDefinitionKey = `${FOOTNOTE_DEFINITION_PREFIX}${footnoteIdentifier}`;
      const footnoteDefinition = configs.get(footnoteDefinitionKey);
      if (!footnoteDefinition) {
        return;
      }
      try {
        const footnoteDefinitionJson = FootNoteReferenceParamsSchema.parse(
          JSON.parse(footnoteDefinition),
        );
        const { blobId, fileName } = footnoteDefinitionJson;
        if (!blobId || !fileName) {
          return;
        }
        walkerContext
          .openNode(
            {
              type: 'block',
              id: nanoid(),
              flavour: AttachmentBlockSchema.model.flavour,
              props: {
                name: fileName,
                sourceId: blobId,
                footnoteIdentifier,
                style: 'citation',
              },
              children: [],
            },
            'children',
          )
          .closeNode();
        walkerContext.skipAllChildren();
      } catch (err) {
        console.warn('Failed to parse attachment footnote definition:', err);
        return;
      }
    },
  },
  fromBlockSnapshot: {
    enter: async (o, context) => {
      const { assets, walkerContext, updateAssetIds } = context;
      const name = (o.node.props.name ?? '') as string;
      const sourceId = (o.node.props.sourceId ?? '') as string;
      const caption = (o.node.props.caption ?? '') as string;

      // Helper function to generate markdown link
      const generateLink = (url: string, text: string) => {
        walkerContext
          .openNode(
            {
              type: 'paragraph',
              children: [],
            },
            'children',
          )
          .openNode(
            {
              type: 'link',
              url: url,
              children: [
                {
                  type: 'text',
                  value: text,
                },
              ],
            },
            'children',
          )
          .closeNode()
          .closeNode();
      };

      // Case 1: Has sourceId - try to export from blob storage
      if (sourceId && assets) {
        await assets.readFromBlob(sourceId);
        const blob = assets.getAssets().get(sourceId);
        if (blob) {
          const blobName = getAssetName(assets.getAssets(), sourceId);
          updateAssetIds?.(sourceId);
          generateLink(`assets/${blobName}`, name || blobName);
          return;
        }
        // If blob not found, fall through to caption or name cases
      }

      // Case 2: Has caption (original URL from import)
      // This happens when attachment was imported from markdown but file wasn't loaded to blob
      if (caption) {
        const url = caption.startsWith('./') ? caption : `./${caption}`;
        const linkText = name || caption.split('/').pop() || 'attachment';
        generateLink(url, linkText);
        return;
      }

      // Case 3: Has name but no sourceId and no caption - just output name as link text
      if (name) {
        generateLink(`./assets/${name}`, name);
      }
    },
  },
};

export const AttachmentBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  attachmentBlockMarkdownAdapterMatcher,
);
