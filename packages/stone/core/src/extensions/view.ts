import { AttachmentViewExtension } from '@ink/stone-block-attachment/view';
// [REMOVED] Embed modules - not needed for local markdown editor
// import { BookmarkViewExtension } from '@ink/stone-block-bookmark/view';
import { CodeBlockViewExtension } from '@ink/stone-block-code/view';
// [REMOVED] Database modules - not needed for local markdown editor
// import { DataViewViewExtension } from '@ink/stone-block-data-view/view';
// import { DatabaseViewExtension } from '@ink/stone-block-database/view';
import { DividerViewExtension } from '@ink/stone-block-divider/view';
// [REMOVED] Edgeless blocks - not needed for Page mode
// import { EdgelessTextViewExtension } from '@ink/stone-block-edgeless-text/view';
// [REMOVED] Embed modules - not needed for local markdown editor
// import { EmbedViewExtension } from '@ink/stone-block-embed/view';
// [REMOVED] EmbedDoc depends on embed module
// import { EmbedDocViewExtension } from '@ink/stone-block-embed-doc/view';
// [REMOVED] Edgeless blocks
// import { FrameViewExtension } from '@ink/stone-block-frame/view';
import { ImageViewExtension } from '@ink/stone-block-image/view';
import { LatexViewExtension } from '@ink/stone-block-latex/view';
import { ListViewExtension } from '@ink/stone-block-list/view';
import { MermaidBlockViewExtension } from '@ink/stone-block-mermaid/view';
import { NoteViewExtension } from '@ink/stone-block-note/view';
import { ParagraphViewExtension } from '@ink/stone-block-paragraph/view';
import { RootViewExtension } from '@ink/stone-block-root/view';
// [REMOVED] Edgeless blocks
// import { SurfaceViewExtension } from '@ink/stone-block-surface/view';
// import { SurfaceRefViewExtension } from '@ink/stone-block-surface-ref/view';
import { TableViewExtension } from '@ink/stone-block-table/view';
import { FoundationViewExtension } from '@ink/stone-foundation/view';
import { AdapterPanelViewExtension } from '@ink/stone-fragment-adapter-panel/view';
import { DocTitleViewExtension } from '@ink/stone-fragment-doc-title/view';
// [REMOVED] Edgeless fragment
// import { FramePanelViewExtension } from '@ink/stone-fragment-frame-panel/view';
import { OutlineViewExtension } from '@ink/stone-fragment-outline/view';
// [REMOVED] Gfx modules - not needed for Page mode markdown editor
// import { BrushViewExtension } from '@ink/stone-gfx-brush/view';
// import { ConnectorViewExtension } from '@ink/stone-gfx-connector/view';
// import { GroupViewExtension } from '@ink/stone-gfx-group/view';
// import { LinkViewExtension as GfxLinkViewExtension } from '@ink/stone-gfx-link/view';
// import { MindmapViewExtension } from '@ink/stone-gfx-mindmap/view';
// import { NoteViewExtension as GfxNoteViewExtension } from '@ink/stone-gfx-note/view';
// import { PointerViewExtension } from '@ink/stone-gfx-pointer/view';
// import { ShapeViewExtension } from '@ink/stone-gfx-shape/view';
// import { TemplateViewExtension } from '@ink/stone-gfx-template/view';
// import { TextViewExtension } from '@ink/stone-gfx-text/view';
// [REMOVED] Collaboration features - not needed for local markdown editor
// import { InlineCommentViewExtension } from '@ink/stone-inline-comment/view';
import { EmojiViewExtension } from '@ink/stone-inline-emoji/view';
import { FootnoteViewExtension } from '@ink/stone-inline-footnote/view';
import { LatexViewExtension as InlineLatexViewExtension } from '@ink/stone-inline-latex/view';
import { LinkViewExtension } from '@ink/stone-inline-link/view';
// [REMOVED] Collaboration features - not needed for local markdown editor
// import { MentionViewExtension } from '@ink/stone-inline-mention/view';
import { InlinePresetViewExtension } from '@ink/stone-inline-preset/view';
import { ReferenceViewExtension } from '@ink/stone-inline-reference/view';
import { DragHandleViewExtension } from '@ink/stone-widget-drag-handle/view';
// [REMOVED] Edgeless widgets
// import { EdgelessAutoConnectViewExtension } from '@ink/stone-widget-edgeless-auto-connect/view';
// import { EdgelessDraggingAreaViewExtension } from '@ink/stone-widget-edgeless-dragging-area/view';
// import { EdgelessSelectedRectViewExtension } from '@ink/stone-widget-edgeless-selected-rect/view';
// import { EdgelessToolbarViewExtension } from '@ink/stone-widget-edgeless-toolbar/view';
// import { EdgelessZoomToolbarViewExtension } from '@ink/stone-widget-edgeless-zoom-toolbar/view';
// import { FrameTitleViewExtension } from '@ink/stone-widget-frame-title/view';
import { KeyboardToolbarViewExtension } from '@ink/stone-widget-keyboard-toolbar/view';
import { LinkedDocViewExtension } from '@ink/stone-widget-linked-doc/view';
// [REMOVED] Edgeless widgets
// import { NoteSlicerViewExtension } from '@ink/stone-widget-note-slicer/view';
import { PageDraggingAreaViewExtension } from '@ink/stone-widget-page-dragging-area/view';
// [REMOVED] Collaboration features - not needed for local markdown editor
// import { RemoteSelectionViewExtension } from '@ink/stone-widget-remote-selection/view';
import { ScrollAnchoringViewExtension } from '@ink/stone-widget-scroll-anchoring/view';
import { SlashMenuViewExtension } from '@ink/stone-widget-slash-menu/view';
import { ToolbarViewExtension } from '@ink/stone-widget-toolbar/view';
// [REMOVED] Edgeless widgets
// import { ViewportOverlayViewExtension } from '@ink/stone-widget-viewport-overlay/view';

export function getInternalViewExtensions() {
  return [
    FoundationViewExtension,

    // [REMOVED] Gfx - not needed for Page mode
    // PointerViewExtension,
    // GfxNoteViewExtension,
    // BrushViewExtension,
    // ShapeViewExtension,
    // MindmapViewExtension,
    // ConnectorViewExtension,
    // GroupViewExtension,
    // TextViewExtension,
    // TemplateViewExtension,
    // GfxLinkViewExtension,

    // Block
    AttachmentViewExtension,
    // [REMOVED] Embed modules
    // BookmarkViewExtension,
    MermaidBlockViewExtension, // Must be before CodeBlockViewExtension to match mermaid code blocks first
    CodeBlockViewExtension,
    // [REMOVED] Database modules
    // DataViewViewExtension,
    // DatabaseViewExtension,
    DividerViewExtension,
    // [REMOVED] Edgeless blocks
    // EdgelessTextViewExtension,
    // [REMOVED] Embed modules
    // EmbedViewExtension,
    // [REMOVED] EmbedDoc depends on embed module
    // EmbedDocViewExtension,
    // FrameViewExtension,
    ImageViewExtension,
    LatexViewExtension,
    ListViewExtension,
    NoteViewExtension,
    ParagraphViewExtension,
    // SurfaceRefViewExtension,
    TableViewExtension,
    // SurfaceViewExtension,
    RootViewExtension,

    // Inline
    // [REMOVED] Collaboration features
    // InlineCommentViewExtension,
    EmojiViewExtension,
    FootnoteViewExtension,
    LinkViewExtension,
    ReferenceViewExtension,
    InlineLatexViewExtension,
    // [REMOVED] Collaboration features
    // MentionViewExtension,
    InlinePresetViewExtension,

    // Widget
    // order will affect the z-index of the widget
    DragHandleViewExtension,
    // [REMOVED] Edgeless widgets
    // EdgelessAutoConnectViewExtension,
    // FrameTitleViewExtension,
    KeyboardToolbarViewExtension,
    LinkedDocViewExtension,
    // [REMOVED] Collaboration features
    // RemoteSelectionViewExtension,
    ScrollAnchoringViewExtension,
    SlashMenuViewExtension,
    ToolbarViewExtension,
    // ViewportOverlayViewExtension,
    // EdgelessZoomToolbarViewExtension,
    PageDraggingAreaViewExtension,
    // EdgelessSelectedRectViewExtension,
    // EdgelessDraggingAreaViewExtension,
    // NoteSlicerViewExtension,
    // EdgelessToolbarViewExtension,

    // Fragment
    DocTitleViewExtension,
    // FramePanelViewExtension,
    OutlineViewExtension,
    AdapterPanelViewExtension,
  ];
}
