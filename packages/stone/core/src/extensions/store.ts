import { AttachmentStoreExtension } from '@ink/stone-block-attachment/store';
// [REMOVED] Embed modules - not needed for local markdown editor
// import { BookmarkStoreExtension } from '@ink/stone-block-bookmark/store';
import { CodeStoreExtension } from '@ink/stone-block-code/store';
// [REMOVED] Database modules - not needed for local markdown editor
// import { DataViewStoreExtension } from '@ink/stone-block-data-view/store';
// import { DatabaseStoreExtension } from '@ink/stone-block-database/store';
import { DividerStoreExtension } from '@ink/stone-block-divider/store';
// [REMOVED] Edgeless blocks - not needed for Page mode
// import { EdgelessTextStoreExtension } from '@ink/stone-block-edgeless-text/store';
// [REMOVED] Embed modules - not needed for local markdown editor
// import { EmbedStoreExtension } from '@ink/stone-block-embed/store';
// [REMOVED] EmbedDoc depends on embed module
// import { EmbedDocStoreExtension } from '@ink/stone-block-embed-doc/store';
// [REMOVED] Edgeless blocks
// import { FrameStoreExtension } from '@ink/stone-block-frame/store';
import { ImageStoreExtension } from '@ink/stone-block-image/store';
import { LatexStoreExtension } from '@ink/stone-block-latex/store';
import { ListStoreExtension } from '@ink/stone-block-list/store';
import { MermaidStoreExtension } from '@ink/stone-block-mermaid/store';
import { NoteStoreExtension } from '@ink/stone-block-note/store';
import { ParagraphStoreExtension } from '@ink/stone-block-paragraph/store';
import { RootStoreExtension } from '@ink/stone-block-root/store';
// [REMOVED] Edgeless blocks
// import { SurfaceStoreExtension } from '@ink/stone-block-surface/store';
// import { SurfaceRefStoreExtension } from '@ink/stone-block-surface-ref/store';
import { TableStoreExtension } from '@ink/stone-block-table/store';
import { FoundationStoreExtension } from '@ink/stone-foundation/store';
// [REMOVED] Gfx modules - not needed for Page mode markdown editor
// import { BrushStoreExtension } from '@ink/stone-gfx-brush/store';
// import { ConnectorStoreExtension } from '@ink/stone-gfx-connector/store';
// import { GroupStoreExtension } from '@ink/stone-gfx-group/store';
// import { MindmapStoreExtension } from '@ink/stone-gfx-mindmap/store';
// import { ShapeStoreExtension } from '@ink/stone-gfx-shape/store';
// import { TextStoreExtension } from '@ink/stone-gfx-text/store';
import { EmojiStoreExtension } from '@ink/stone-inline-emoji/store';
import { FootnoteStoreExtension } from '@ink/stone-inline-footnote/store';
import { LatexStoreExtension as InlineLatexStoreExtension } from '@ink/stone-inline-latex/store';
import { LinkStoreExtension } from '@ink/stone-inline-link/store';
import { InlinePresetStoreExtension } from '@ink/stone-inline-preset/store';
import { ReferenceStoreExtension } from '@ink/stone-inline-reference/store';

export function getInternalStoreExtensions() {
  return [
    FoundationStoreExtension,

    // Block
    AttachmentStoreExtension,
    // [REMOVED] Embed modules
    // BookmarkStoreExtension,
    MermaidStoreExtension, // Must be before CodeStoreExtension to match mermaid code blocks first
    CodeStoreExtension,
    // [REMOVED] Database modules
    // DataViewStoreExtension,
    // DatabaseStoreExtension,
    DividerStoreExtension,
    // [REMOVED] Edgeless blocks
    // EdgelessTextStoreExtension,
    // [REMOVED] Embed modules
    // EmbedStoreExtension,
    // [REMOVED] EmbedDoc depends on embed module
    // EmbedDocStoreExtension,
    // FrameStoreExtension,
    ImageStoreExtension,
    LatexStoreExtension,
    ListStoreExtension,
    NoteStoreExtension,
    ParagraphStoreExtension,
    // SurfaceRefStoreExtension,
    TableStoreExtension,
    // SurfaceStoreExtension,
    RootStoreExtension,

    // Inline
    EmojiStoreExtension,
    FootnoteStoreExtension,
    LinkStoreExtension,
    ReferenceStoreExtension,
    InlineLatexStoreExtension,
    InlinePresetStoreExtension,

    // [REMOVED] Gfx - not needed for Page mode
    // BrushStoreExtension,
    // ShapeStoreExtension,
    // MindmapStoreExtension,
    // ConnectorStoreExtension,
    // GroupStoreExtension,
    // TextStoreExtension,
  ];
}
