import { addSiblingAttachmentBlocks } from "@ink/stone-block-attachment";
// [REMOVED] Database modules - not needed for local markdown editor
// import { insertDatabaseBlockCommand } from '@ink/stone-block-database';
// [REMOVED] Embed modules - not needed for local markdown editor
// import { insertEmptyEmbedIframeCommand } from '@ink/stone-block-embed';
import { insertImagesCommand } from "@ink/stone-block-image";
import { insertLatexBlockCommand } from "@ink/stone-block-latex";
import {
  canDedentListCommand,
  canIndentListCommand,
  dedentListCommand,
  indentListCommand,
} from "@ink/stone-block-list";
import { updateBlockType } from "@ink/stone-block-note";
import {
  canDedentParagraphCommand,
  canIndentParagraphCommand,
  dedentParagraphCommand,
  indentParagraphCommand,
} from "@ink/stone-block-paragraph";
// [REMOVED] Edgeless blocks - not needed for Page mode
// import { DefaultTool, getSurfaceBlock } from '@ink/stone-block-surface';
// import { insertSurfaceRefBlockCommand } from '@ink/stone-block-surface-ref';
import { insertTableBlockCommand } from "@ink/stone-block-table";
import { toggleEmbedCardCreateModal } from "@ink/stone-components/embed-card-modal";
import { toast } from "@ink/stone-components/toast";
import { insertInlineLatex } from "@ink/stone-inline-latex";
import { toggleLink } from "@ink/stone-inline-link";
import {
  formatBlockCommand,
  formatNativeCommand,
  formatTextCommand,
  getTextAttributes,
  toggleBold,
  toggleCode,
  toggleItalic,
  toggleStrike,
  toggleUnderline,
} from "@ink/stone-inline-preset";
// [REMOVED] Edgeless blocks
// import type { FrameBlockModel } from '@ink/stone-model';
import { insertContent } from "@ink/stone-rich-text";
import {
  copySelectedModelsCommand,
  deleteSelectedModelsCommand,
  draftSelectedModelsCommand,
  duplicateSelectedModelsCommand,
  focusBlockEnd,
  getBlockSelectionsCommand,
  getSelectedModelsCommand,
  getTextSelectionCommand,
} from "@ink/stone-shared/commands";
import { REFERENCE_NODE } from "@ink/stone-shared/consts";
import { TelemetryProvider } from "@ink/stone-shared/services";
import type { InkTextStyleAttributes } from "@ink/stone-shared/types";
import {
  createDefaultDoc,
  isInsideBlockByFlavour,
  openSingleFileWith,
  type Signal,
} from "@ink/stone-shared/utils";
import type { InkLinkedDocWidget } from "@ink/stone-widget-linked-doc";
// [REMOVED] Database modules - not needed for local markdown editor
// import { viewPresets } from '@ink/stone-data-view/view-presets';
import { assertType } from "@ink/stone-global/utils";
import {
  AttachmentIcon,
  BoldIcon,
  BulletedListIcon,
  CheckBoxCheckLinearIcon,
  CloseIcon,
  CodeBlockIcon,
  CodeIcon,
  CollapseTabIcon,
  CopyIcon,
  DatabaseKanbanViewIcon,
  DatabaseTableViewIcon,
  DeleteIcon,
  DividerIcon,
  DuplicateIcon,
  EmbedIcon,
  FontIcon,
  // [REMOVED] Edgeless blocks
  // FrameIcon,
  GithubIcon,
  // GroupIcon,
  ImageIcon,
  ItalicIcon,
  LinkedPageIcon,
  LinkIcon,
  LoomLogoIcon,
  NewPageIcon,
  NowIcon,
  NumberedListIcon,
  PlusIcon,
  QuoteIcon,
  RedoIcon,
  RightTabIcon,
  StrikeThroughIcon,
  TableIcon,
  TeXIcon,
  TextIcon,
  TodayIcon,
  TomorrowIcon,
  UnderLineIcon,
  UndoIcon,
  YesterdayIcon,
  YoutubeDuotoneIcon,
} from "@ink/stone-icons/lit";
import {
  type BlockComponent,
  type BlockStdScope,
  ConfigExtensionFactory,
} from "@ink/stone-std";
// [REMOVED] Edgeless blocks
// import { GfxControllerIdentifier } from '@ink/stone-std/gfx';
import { computed } from "@preact/signals-core";
import { cssVarV2 } from "@ink/stone-theme";
import type { TemplateResult } from "lit";

import {
  FigmaDuotoneIcon,
  HeadingIcon,
  HighLightDuotoneIcon,
  TextBackgroundDuotoneIcon,
  TextColorIcon,
} from "./icons.js";
import { formatDate, formatTime } from "./utils.js";

export type KeyboardToolbarConfig = {
  items: KeyboardToolbarItem[];
};

export type KeyboardToolbarItem =
  | KeyboardToolbarActionItem
  | KeyboardSubToolbarConfig
  | KeyboardToolPanelConfig;

export type KeyboardIconType =
  | TemplateResult
  | ((ctx: KeyboardToolbarContext) => TemplateResult);

export type KeyboardToolbarActionItem = {
  name: string;
  icon: KeyboardIconType;
  background?: string | ((ctx: KeyboardToolbarContext) => string | undefined);
  /**
   * @default true
   * @description Whether to show the item in the toolbar.
   */
  showWhen?: (ctx: KeyboardToolbarContext) => boolean;
  /**
   * @default false
   * @description Whether to set the item as disabled status.
   */
  disableWhen?: (ctx: KeyboardToolbarContext) => boolean;
  /**
   * @description The action to be executed when the item is clicked.
   */
  action?: (ctx: KeyboardToolbarContext) => void | Promise<void>;
};

export type KeyboardSubToolbarConfig = {
  icon: KeyboardIconType;
  items: KeyboardToolbarItem[];
  /**
   * It will enter this sub-toolbar when the condition is met.
   */
  autoShow?: (ctx: KeyboardToolbarContext) => Signal<boolean>;
};

export type KeyboardToolbarContext = {
  std: BlockStdScope;
  rootComponent: BlockComponent;
  /**
   * Close current tool panel and show virtual keyboard
   */
  closeToolPanel: () => void;
};

export type KeyboardToolPanelConfig = {
  icon: KeyboardIconType;
  activeIcon?: KeyboardIconType;
  activeBackground?: string;
  groups: (KeyboardToolPanelGroup | DynamicKeyboardToolPanelGroup)[];
};

export type KeyboardToolPanelGroup = {
  name: string;
  items: KeyboardToolbarActionItem[];
};

export type DynamicKeyboardToolPanelGroup = (
  ctx: KeyboardToolbarContext
) => KeyboardToolPanelGroup | null;

const textToolActionItems: KeyboardToolbarActionItem[] = [
  {
    name: "Text",
    icon: TextIcon(),
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has("ink:paragraph"),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:paragraph",
        props: { type: "text" },
      });
    },
  },
  ...([1, 2, 3, 4, 5, 6] as const).map((i) => ({
    name: `Heading ${i}`,
    icon: HeadingIcon(i),
    showWhen: ({ std }: KeyboardToolbarContext) =>
      std.store.schema.flavourSchemaMap.has("ink:paragraph"),
    action: ({ std }: KeyboardToolbarContext) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:paragraph",
        props: { type: `h${i}` },
      });
    },
  })),
  {
    name: "CodeBlock",
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:code"),
    icon: CodeBlockIcon(),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:code",
      });
    },
  },
  {
    name: "Quote",
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has("ink:paragraph"),
    icon: QuoteIcon(),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:paragraph",
        props: { type: "quote" },
      });
    },
  },
  {
    name: "Divider",
    icon: DividerIcon(),
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:divider"),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:divider",
        props: { type: "divider" },
      });
    },
  },
  {
    name: "Inline equation",
    icon: TeXIcon(),
    showWhen: ({ std }) =>
      std.store.schema.flavourSchemaMap.has("ink:paragraph"),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getTextSelectionCommand)
        .pipe(insertInlineLatex)
        .run();
    },
  },
  {
    name: "Table",
    icon: TableIcon(),
    showWhen: ({ std, rootComponent: { model } }) =>
      std.store.schema.flavourSchemaMap.has("ink:table") &&
      !isInsideBlockByFlavour(std.store, model, "ink:edgeless-text"),
    action: ({ std }) => {
      std.command
        .chain()
        .pipe(getSelectedModelsCommand)
        .pipe(insertTableBlockCommand, {
          place: "after",
          removeEmptyLine: true,
        })
        .pipe(({ insertedTableBlockId }) => {
          if (insertedTableBlockId) {
            const telemetry = std.getOptional(TelemetryProvider);
            telemetry?.track("BlockCreated", {
              blockType: "ink:table",
            });
          }
        })
        .run();
    },
  },
];

const listToolActionItems: KeyboardToolbarActionItem[] = [
  {
    name: "BulletedList",
    icon: BulletedListIcon(),
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:list"),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:list",
        props: {
          type: "bulleted",
        },
      });
    },
  },
  {
    name: "NumberedList",
    icon: NumberedListIcon(),
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:list"),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:list",
        props: {
          type: "numbered",
        },
      });
    },
  },
  {
    name: "CheckBox",
    icon: CheckBoxCheckLinearIcon(),
    showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:list"),
    action: ({ std }) => {
      std.command.exec(updateBlockType, {
        flavour: "ink:list",
        props: {
          type: "todo",
        },
      });
    },
  },
];

const pageToolGroup: KeyboardToolPanelGroup = {
  name: "Page",
  items: [
    {
      name: "NewPage",
      icon: NewPageIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has("ink:embed-linked-doc"),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(({ selectedModels }) => {
            const newDoc = createDefaultDoc(std.store.workspace);
            if (!selectedModels?.length) return;
            insertContent(std, selectedModels[0], REFERENCE_NODE, {
              reference: {
                type: "LinkedPage",
                pageId: newDoc.id,
              },
            });
          })
          .run();
      },
    },
    {
      name: "LinkedPage",
      icon: LinkedPageIcon(),
      showWhen: ({ std, rootComponent }) => {
        const linkedDocWidget = std.view.getWidget(
          "ink-linked-doc-widget",
          rootComponent.model.id
        );
        if (!linkedDocWidget) return false;

        return std.store.schema.flavourSchemaMap.has("ink:embed-linked-doc");
      },
      action: ({ rootComponent, closeToolPanel }) => {
        const { std } = rootComponent;

        const linkedDocWidget = std.view.getWidget(
          "ink-linked-doc-widget",
          rootComponent.model.id
        );
        if (!linkedDocWidget) return;
        assertType<InkLinkedDocWidget>(linkedDocWidget);
        linkedDocWidget.show({
          mode: "mobile",
          addTriggerKey: true,
        });
        closeToolPanel();
      },
    },
  ],
};

const contentMediaToolGroup: KeyboardToolPanelGroup = {
  name: "Content & Media",
  items: [
    {
      name: "Image",
      icon: ImageIcon(),
      showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:image"),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();
      },
    },
    {
      name: "Link",
      icon: LinkIcon(),
      showWhen: ({ std }) =>
        std.store.schema.flavourSchemaMap.has("ink:bookmark"),
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const parentModel = std.store.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        await toggleEmbedCardCreateModal(
          std.host,
          "Links",
          "The added link will be displayed as a card view.",
          { mode: "page", parentModel, index },
          // [REMOVED] Edgeless blocks - callback removed
          () => {}
        );
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: "Attachment",
      icon: AttachmentIcon(),
      showWhen: () => false,
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openSingleFileWith();
        if (!file) return;

        await addSiblingAttachmentBlocks(std, [file], model);
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: "Equation",
      icon: TeXIcon(),
      showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:latex"),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertLatexBlockCommand, {
            place: "after",
            removeEmptyLine: true,
          })
          .run();
      },
    },
  ],
};

const embedToolGroup: KeyboardToolPanelGroup = {
  name: "Embeds",
  // [REMOVED] Embed modules - not needed for local markdown editor
  items: [],
};

// [REMOVED] Edgeless blocks - documentGroupFrameToolGroup not needed for Page mode
const documentGroupFrameToolGroup: DynamicKeyboardToolPanelGroup = () => {
  // Frame and Group features are Edgeless-only, return null for Page mode
  return null;
};

const dateToolGroup: KeyboardToolPanelGroup = {
  name: "Date",
  items: [
    {
      name: "Today",
      icon: TodayIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std, model, formatDate(new Date()));
      },
    },
    {
      name: "Tomorrow",
      icon: TomorrowIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        insertContent(std, model, formatDate(tomorrow));
      },
    },
    {
      name: "Yesterday",
      icon: YesterdayIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        insertContent(std, model, formatDate(yesterday));
      },
    },
    {
      name: "Now",
      icon: NowIcon(),
      action: ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        insertContent(std, model, formatTime(new Date()));
      },
    },
  ],
};

const databaseToolGroup: KeyboardToolPanelGroup = {
  name: "Database",
  // [REMOVED] Database modules - not needed for local markdown editor
  items: [],
};

const moreToolPanel: KeyboardToolPanelConfig = {
  icon: PlusIcon(),
  activeIcon: CloseIcon({
    style: `color: ${cssVarV2("icon/activated")}`,
  }),
  activeBackground: cssVarV2("edgeless/selection/selectionMarqueeBackground"),
  groups: [
    { name: "Basic", items: textToolActionItems },
    { name: "List", items: listToolActionItems },
    pageToolGroup,
    contentMediaToolGroup,
    embedToolGroup,
    documentGroupFrameToolGroup,
    dateToolGroup,
    databaseToolGroup,
  ],
};

const textToolPanel: KeyboardToolPanelConfig = {
  icon: TextIcon(),
  groups: [
    {
      name: "Turn into",
      items: textToolActionItems,
    },
  ],
};

const textStyleToolItems: KeyboardToolbarItem[] = [
  {
    name: "Bold",
    icon: BoldIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.bold ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleBold);
    },
  },
  {
    name: "Italic",
    icon: ItalicIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.italic ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleItalic);
    },
  },
  {
    name: "UnderLine",
    icon: UnderLineIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.underline ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleUnderline);
    },
  },
  {
    name: "StrikeThrough",
    icon: StrikeThroughIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.strike ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleStrike);
    },
  },
  {
    name: "Code",
    icon: CodeIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.code ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleCode);
    },
  },
  {
    name: "Link",
    icon: LinkIcon(),
    background: ({ std }) => {
      const [_, { textAttributes }] = std.command.exec(getTextAttributes);
      return textAttributes?.link ? "#00000012" : "";
    },
    action: ({ std }) => {
      std.command.exec(toggleLink);
    },
  },
];

const highlightToolPanel: KeyboardToolPanelConfig = {
  icon: ({ std }) => {
    const [_, { textAttributes }] = std.command.exec(getTextAttributes);
    if (textAttributes?.color) {
      return HighLightDuotoneIcon(textAttributes.color);
    } else {
      return HighLightDuotoneIcon(cssVarV2("icon/primary"));
    }
  },
  groups: [
    {
      name: "Color",
      items: [
        {
          name: "Default Color",
          icon: TextColorIcon(cssVarV2("text/highlight/fg/orange")),
        },
        ...(
          [
            "red",
            "orange",
            "yellow",
            "green",
            "teal",
            "blue",
            "purple",
            "grey",
          ] as const
        ).map<KeyboardToolbarActionItem>((color) => ({
          name: color.charAt(0).toUpperCase() + color.slice(1),
          icon: TextColorIcon(cssVarV2(`text/highlight/fg/${color}`)),
          action: ({ std }) => {
            const payload = {
              styles: {
                color: cssVarV2(`text/highlight/fg/${color}`),
              } satisfies InkTextStyleAttributes,
            };
            std.command
              .chain()
              .try((chain) => [
                chain
                  .pipe(getTextSelectionCommand)
                  .pipe(formatTextCommand, payload),
                chain
                  .pipe(getBlockSelectionsCommand)
                  .pipe(formatBlockCommand, payload),
                chain.pipe(formatNativeCommand, payload),
              ])
              .run();
          },
        })),
      ],
    },
    {
      name: "Background",
      items: [
        {
          name: "Default Color",
          icon: TextBackgroundDuotoneIcon(cssVarV2("text/highlight/bg/orange")),
        },
        ...(
          [
            "red",
            "orange",
            "yellow",
            "green",
            "teal",
            "blue",
            "purple",
            "grey",
          ] as const
        ).map<KeyboardToolbarActionItem>((color) => ({
          name: color.charAt(0).toUpperCase() + color.slice(1),
          icon: TextBackgroundDuotoneIcon(
            cssVarV2(`text/highlight/bg/${color}`)
          ),
          action: ({ std }) => {
            const payload = {
              styles: {
                background: cssVarV2(`text/highlight/bg/${color}`),
              } satisfies InkTextStyleAttributes,
            };
            std.command
              .chain()
              .try((chain) => [
                chain
                  .pipe(getTextSelectionCommand)
                  .pipe(formatTextCommand, payload),
                chain
                  .pipe(getBlockSelectionsCommand)
                  .pipe(formatBlockCommand, payload),
                chain.pipe(formatNativeCommand, payload),
              ])
              .run();
          },
        })),
      ],
    },
  ],
};

const textSubToolbarConfig: KeyboardSubToolbarConfig = {
  icon: FontIcon(),
  items: [
    textToolPanel,
    ...textStyleToolItems,
    {
      name: "InlineTex",
      icon: TeXIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getTextSelectionCommand)
          .pipe(insertInlineLatex)
          .run();
      },
    },
    highlightToolPanel,
  ],
  autoShow: ({ std }) => {
    return computed(() => {
      const [_, { currentTextSelection: selection }] = std.command.exec(
        getTextSelectionCommand
      );
      return selection ? !selection.isCollapsed() : false;
    });
  },
};

export const defaultKeyboardToolbarConfig: KeyboardToolbarConfig = {
  items: [
    moreToolPanel,
    // TODO(@L-Sun): add ai function in INK side
    // { icon: AiIcon(iconStyle) },
    textSubToolbarConfig,
    {
      name: "Image",
      icon: ImageIcon(),
      showWhen: ({ std }) => std.store.schema.flavourSchemaMap.has("ink:image"),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();
      },
    },
    {
      name: "Attachment",
      icon: AttachmentIcon(),
      showWhen: () => false,
      action: async ({ std }) => {
        const [_, { selectedModels }] = std.command.exec(
          getSelectedModelsCommand
        );
        const model = selectedModels?.[0];
        if (!model) return;

        const file = await openSingleFileWith();
        if (!file) return;

        await addSiblingAttachmentBlocks(std, [file], model);
        if (model.text?.length === 0) {
          std.store.deleteBlock(model);
        }
      },
    },
    {
      name: "Undo",
      icon: UndoIcon(),
      disableWhen: ({ std }) => !std.store.canUndo,
      action: ({ std }) => {
        std.store.undo();
      },
    },
    {
      name: "Redo",
      icon: RedoIcon(),
      disableWhen: ({ std }) => !std.store.canRedo,
      action: ({ std }) => {
        std.store.redo();
      },
    },
    {
      name: "RightTab",
      icon: RightTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll((chain) => [
            chain.pipe(canIndentParagraphCommand),
            chain.pipe(canIndentListCommand),
          ])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll((chain) => [
            chain.pipe(canIndentParagraphCommand).pipe(indentParagraphCommand),
            chain.pipe(canIndentListCommand).pipe(indentListCommand),
          ])
          .run();
      },
    },
    ...listToolActionItems,
    ...textToolActionItems.filter(({ name }) => name === "Divider"),
    {
      name: "CollapseTab",
      icon: CollapseTabIcon(),
      disableWhen: ({ std }) => {
        const [success] = std.command
          .chain()
          .tryAll((chain) => [
            chain.pipe(canDedentParagraphCommand),
            chain.pipe(canDedentListCommand),
          ])
          .run();
        return !success;
      },
      action: ({ std }) => {
        std.command
          .chain()
          .tryAll((chain) => [
            chain.pipe(canDedentParagraphCommand).pipe(dedentParagraphCommand),
            chain.pipe(canDedentListCommand).pipe(dedentListCommand),
          ])
          .run();
      },
    },
    {
      name: "Copy",
      icon: CopyIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .with({
            onCopy: () => {
              toast(std.host, "Copied to clipboard");
            },
          })
          .pipe(draftSelectedModelsCommand)
          .pipe(copySelectedModelsCommand)
          .run();
      },
    },
    {
      name: "Duplicate",
      icon: DuplicateIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(duplicateSelectedModelsCommand)
          .run();
      },
    },
    {
      name: "Delete",
      icon: DeleteIcon(),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(deleteSelectedModelsCommand)
          .run();
      },
    },
  ],
};

export const KeyboardToolbarConfigExtension = ConfigExtensionFactory<
  Partial<KeyboardToolbarConfig>
>("ink:keyboard-toolbar");
