// Import models only, the bundled file should not include anything else.
// [REMOVED] Database modules - not needed for local markdown editor
// import { DataViewBlockSchema } from '@ink/stone-block-data-view';
// [REMOVED] Edgeless blocks - not needed for Page mode
// import { SurfaceBlockSchema } from '@ink/stone-block-surface';
import {
  AttachmentBlockSchema,
  // [REMOVED] Embed modules - not needed for local markdown editor
  // BookmarkBlockSchema,
  CodeBlockSchema,
  // [REMOVED] Database modules - not needed for local markdown editor
  // DatabaseBlockSchema,
  DividerBlockSchema,
  // [REMOVED] Edgeless blocks
  // EdgelessTextBlockSchema,
  // [REMOVED] Embed modules - not needed for local markdown editor
  // EmbedFigmaBlockSchema,
  // EmbedGithubBlockSchema,
  // EmbedHtmlBlockSchema,
  // [REMOVED] EmbedDoc depends on embed module
  // EmbedLinkedDocBlockSchema,
  // EmbedLoomBlockSchema,
  // EmbedSyncedDocBlockSchema,
  // EmbedYoutubeBlockSchema,
  // [REMOVED] Edgeless blocks
  // FrameBlockSchema,
  ImageBlockSchema,
  LatexBlockSchema,
  ListBlockSchema,
  MermaidBlockSchema,
  NoteBlockSchema,
  ParagraphBlockSchema,
  RootBlockSchema,
  // [REMOVED] Edgeless blocks
  // SurfaceRefBlockSchema,
  TableBlockSchema,
} from '@ink/stone-model';
import type { BlockSchema } from '@ink/stone-store';
import type { z } from 'zod';

/** Built-in first party block models built for Ink */
export const InkSchemas: z.infer<typeof BlockSchema>[] = [
  CodeBlockSchema,
  ParagraphBlockSchema,
  RootBlockSchema,
  ListBlockSchema,
  NoteBlockSchema,
  DividerBlockSchema,
  ImageBlockSchema,
  // [REMOVED] Edgeless blocks
  // SurfaceBlockSchema,
  // [REMOVED] Embed modules - not needed for local markdown editor
  // BookmarkBlockSchema,
  // FrameBlockSchema,
  // [REMOVED] Database modules - not needed for local markdown editor
  // DatabaseBlockSchema,
  // SurfaceRefBlockSchema,
  // DataViewBlockSchema,
  AttachmentBlockSchema,
  // [REMOVED] Embed modules - not needed for local markdown editor
  // EmbedYoutubeBlockSchema,
  // EmbedFigmaBlockSchema,
  // EmbedGithubBlockSchema,
  // EmbedHtmlBlockSchema,
  // [REMOVED] EmbedDoc depends on embed module
  // EmbedLinkedDocBlockSchema,
  // EmbedSyncedDocBlockSchema,
  // EmbedLoomBlockSchema,
  // EdgelessTextBlockSchema,
  LatexBlockSchema,
  MermaidBlockSchema,
  TableBlockSchema,
];
