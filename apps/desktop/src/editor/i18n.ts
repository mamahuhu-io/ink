// InkStone editor i18n integration
import i18n from "../i18n";

/**
 * Subscribe to language change events
 * Returns an unsubscribe function
 */
export function onLanguageChange(callback: (lang: string) => void): () => void {
  i18n.on("languageChanged", callback);
  return () => {
    i18n.off("languageChanged", callback);
  };
}

/**
 * Get placeholder text for paragraph blocks based on type
 */
export function getPlaceholder(type: string): string {
  const key = `editor.placeholder.${type}`;
  const translation = i18n.t(key);
  // If no translation found, return the key (fallback)
  return translation !== key ? translation : getDefaultPlaceholder(type);
}

/**
 * Default English placeholders (fallback)
 */
function getDefaultPlaceholder(type: string): string {
  const defaults: Record<string, string> = {
    text: "Type '/' for commands",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
    h4: "Heading 4",
    h5: "Heading 5",
    h6: "Heading 6",
    quote: "",
  };
  return defaults[type] || "";
}

/**
 * Get slash menu translation by key
 * This is used as the i18n getter for InkStone slash menu
 */
export function getSlashMenuTranslation(key: string, fallback: string): string {
  const fullKey = `editor.slashMenu.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get slash menu link popup translation by key
 * This is used as the i18n getter for InkStone slash menu link popup
 */
export function getSlashMenuLinkPopupTranslation(
  key: string,
  fallback: string,
): string {
  const fullKey = `editor.link.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get link popup translation by key
 * This is used as the i18n getter for InkStone link popup
 */
export function getLinkPopupTranslation(key: string, fallback: string): string {
  const fullKey = `editor.link.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get link toolbar translation by key
 * This is used as the i18n getter for InkStone link toolbar
 */
export function getLinkToolbarTranslation(
  key: string,
  fallback: string,
): string {
  const fullKey = `editor.link.${key}`;
  const translation = i18n.t(fullKey);
  console.log(
    `[LinkToolbar i18n] key: ${key}, fullKey: ${fullKey}, translation: ${translation}, fallback: ${fallback}`,
  );
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get caption translation by key
 * This is used as the i18n getter for InkStone caption component
 */
export function getCaptionTranslation(key: string, fallback: string): string {
  const fullKey = `editor.caption.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get code language translation by key
 * This is used as the i18n getter for InkStone code language selector
 */
export function getCodeLangTranslation(key: string, fallback: string): string {
  const fullKey = `editor.code.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get LaTeX translation by key
 * This is used as the i18n getter for InkStone LaTeX component
 */
export function getLatexTranslation(key: string, fallback: string): string {
  const fullKey = `editor.latex.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get text format toolbar translation by key
 * This is used as the i18n getter for InkStone text format toolbar (Bold, Italic, etc.)
 */
export function getTextFormatTranslation(
  key: string,
  fallback: string,
): string {
  const fullKey = `editor.toolbar.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get toolbar action translation by key
 * This is used as the i18n getter for InkStone toolbar actions (Turn into, Align, Copy, etc.)
 */
export function getToolbarTranslation(key: string, fallback: string): string {
  const fullKey = `editor.toolbarAction.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get text conversion translation by key
 * This is used as the i18n getter for InkStone text conversion options (Text, Heading 1-6, etc.)
 */
export function getTextConversionTranslation(
  key: string,
  fallback: string,
): string {
  const fullKey = `editor.conversion.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get text align translation by key
 * This is used as the i18n getter for InkStone text alignment options
 */
export function getTextAlignTranslation(key: string, fallback: string): string {
  const fullKey = `editor.align.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get highlight translation by key
 * This is used as the i18n getter for InkStone highlight dropdown
 */
export function getHighlightTranslation(key: string, fallback: string): string {
  const fullKey = `editor.highlight.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get emoji picker translation by key
 * This is used as the i18n getter for InkStone emoji picker
 */
export function getEmojiTranslation(key: string, fallback: string): string {
  const fullKey = `editor.emoji.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get icon picker translation by key
 * This is used as the i18n getter for InkStone icon picker (icons)
 */
export function getIconPickerTranslation(
  key: string,
  fallback: string,
): string {
  const fullKey = `editor.emoji.${key}`;
  const translation = i18n.t(fullKey);
  return translation !== fullKey ? translation : fallback;
}

/**
 * Get block translation by full key path
 * This is used as the i18n getter for block toolbars (table, image, attachment, etc.)
 * These blocks use full key paths like 'editor.image.download' instead of relative keys
 */
export function getBlockTranslation(key: string, fallback: string): string {
  const translation = i18n.t(key);
  return translation !== key ? translation : fallback;
}

/**
 * Slash menu translations object for InkStone
 */
export const slashMenuTranslations = {
  // Date group
  today: () => i18n.t("editor.slashMenu.today", "Today"),
  tomorrow: () => i18n.t("editor.slashMenu.tomorrow", "Tomorrow"),
  yesterday: () => i18n.t("editor.slashMenu.yesterday", "Yesterday"),
  now: () => i18n.t("editor.slashMenu.now", "Now"),

  // Insert group
  link: () => i18n.t("editor.slashMenu.link", "Link"),
  linkDesc: () => i18n.t("editor.slashMenu.linkDesc", "Insert a hyperlink."),

  // Actions group
  moveUp: () => i18n.t("editor.slashMenu.moveUp", "Move Up"),
  moveUpDesc: () =>
    i18n.t("editor.slashMenu.moveUpDesc", "Shift this line up."),
  moveDown: () => i18n.t("editor.slashMenu.moveDown", "Move Down"),
  moveDownDesc: () =>
    i18n.t("editor.slashMenu.moveDownDesc", "Shift this line down."),
  copy: () => i18n.t("editor.slashMenu.copy", "Copy"),
  copyDesc: () =>
    i18n.t("editor.slashMenu.copyDesc", "Copy this line to clipboard."),
  duplicate: () => i18n.t("editor.slashMenu.duplicate", "Duplicate"),
  duplicateDesc: () =>
    i18n.t(
      "editor.slashMenu.duplicateDesc",
      "Create a duplicate of this line.",
    ),
  delete: () => i18n.t("editor.slashMenu.delete", "Delete"),
  deleteDesc: () =>
    i18n.t("editor.slashMenu.deleteDesc", "Remove this line permanently."),

  // Toast messages
  copiedToClipboard: () =>
    i18n.t("editor.toast.copiedToClipboard", "Copied to clipboard"),
};

/**
 * Other editor UI translations
 */
export const editorTranslations = {
  // Link popup
  pasteOrTypeLink: () =>
    i18n.t("editor.link.pasteOrType", "Paste or type a link"),
  enterText: () => i18n.t("editor.link.enterText", "Enter text"),

  // Caption
  writeCaption: () => i18n.t("editor.caption", "Write a caption"),

  // Code block
  searchLanguage: () =>
    i18n.t("editor.code.searchLanguage", "Search for a language"),

  // LaTeX
  equation: () => i18n.t("editor.latex.equation", "Equation"),
  errorEquation: () => i18n.t("editor.latex.errorEquation", "Error equation"),

  // Search
  search: () => i18n.t("editor.search", "Search"),
};
