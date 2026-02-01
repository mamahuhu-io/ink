import { isMacOS } from '../../../services/platform';

export interface ShortcutItem {
  id: string;
  key: string;
  descriptionKey: string;
}

export interface ShortcutCategory {
  titleKey: string;
  shortcuts: ShortcutItem[];
}

export const SHORTCUTS: ShortcutCategory[] = [
  // File operations
  {
    titleKey: 'settings.shortcuts.categories.file',
    shortcuts: [
      {
        id: 'file-new-window',
        key: 'Mod-N',
        descriptionKey: 'settings.shortcuts.actions.newWindow',
      },
      { id: 'file-new-tab', key: 'Mod-T', descriptionKey: 'settings.shortcuts.actions.newTab' },
      { id: 'file-open', key: 'Mod-O', descriptionKey: 'settings.shortcuts.actions.openFile' },
      { id: 'file-save', key: 'Mod-S', descriptionKey: 'settings.shortcuts.actions.save' },
      {
        id: 'file-save-as',
        key: 'Mod-Shift-S',
        descriptionKey: 'settings.shortcuts.actions.saveAs',
      },
      { id: 'file-close-tab', key: 'Mod-W', descriptionKey: 'settings.shortcuts.actions.closeTab' },
    ],
  },
  // Edit operations
  {
    titleKey: 'settings.shortcuts.categories.edit',
    shortcuts: [
      { id: 'edit-undo', key: 'Mod-Z', descriptionKey: 'settings.shortcuts.actions.undo' },
      { id: 'edit-redo', key: 'Mod-Shift-Z', descriptionKey: 'settings.shortcuts.actions.redo' },
      { id: 'edit-cut', key: 'Mod-X', descriptionKey: 'settings.shortcuts.actions.cut' },
      { id: 'edit-copy', key: 'Mod-C', descriptionKey: 'settings.shortcuts.actions.copy' },
      { id: 'edit-paste', key: 'Mod-V', descriptionKey: 'settings.shortcuts.actions.paste' },
      {
        id: 'edit-select-all',
        key: 'Mod-A',
        descriptionKey: 'settings.shortcuts.actions.selectAll',
      },
      { id: 'edit-find', key: 'Mod-F', descriptionKey: 'settings.shortcuts.actions.find' },
      {
        id: 'edit-replace',
        key: isMacOS() ? 'Mod-Alt-F' : 'Mod-H',
        descriptionKey: 'settings.shortcuts.actions.replace',
      },
      { id: 'edit-search', key: 'Mod-K', descriptionKey: 'settings.shortcuts.actions.search' },
    ],
  },
  // Text formatting
  {
    titleKey: 'settings.shortcuts.categories.format',
    shortcuts: [
      { id: 'format-bold', key: 'Mod-B', descriptionKey: 'settings.shortcuts.actions.bold' },
      { id: 'format-italic', key: 'Mod-I', descriptionKey: 'settings.shortcuts.actions.italic' },
      {
        id: 'format-underline',
        key: 'Mod-U',
        descriptionKey: 'settings.shortcuts.actions.underline',
      },
      {
        id: 'format-strikethrough',
        key: 'Mod-Shift-S',
        descriptionKey: 'settings.shortcuts.actions.strikethrough',
      },
      { id: 'format-code', key: 'Mod-E', descriptionKey: 'settings.shortcuts.actions.inlineCode' },
      { id: 'format-link', key: 'Mod-K', descriptionKey: 'settings.shortcuts.actions.link' },
    ],
  },
  // Block conversion
  {
    titleKey: 'settings.shortcuts.categories.blocks',
    shortcuts: [
      {
        id: 'block-paragraph',
        key: 'Mod-Alt-0',
        descriptionKey: 'settings.shortcuts.actions.paragraph',
      },
      { id: 'block-h1', key: 'Mod-Alt-1', descriptionKey: 'settings.shortcuts.actions.heading1' },
      { id: 'block-h2', key: 'Mod-Alt-2', descriptionKey: 'settings.shortcuts.actions.heading2' },
      { id: 'block-h3', key: 'Mod-Alt-3', descriptionKey: 'settings.shortcuts.actions.heading3' },
      { id: 'block-h4', key: 'Mod-Alt-4', descriptionKey: 'settings.shortcuts.actions.heading4' },
      { id: 'block-h5', key: 'Mod-Alt-5', descriptionKey: 'settings.shortcuts.actions.heading5' },
      { id: 'block-h6', key: 'Mod-Alt-6', descriptionKey: 'settings.shortcuts.actions.heading6' },
      {
        id: 'block-bullet-list',
        key: 'Mod-Alt-8',
        descriptionKey: 'settings.shortcuts.actions.bulletList',
      },
      {
        id: 'block-number-list',
        key: 'Mod-Alt-9',
        descriptionKey: 'settings.shortcuts.actions.numberList',
      },
      {
        id: 'block-code',
        key: 'Mod-Alt-C',
        descriptionKey: 'settings.shortcuts.actions.codeBlock',
      },
      {
        id: 'block-divider',
        key: 'Mod-Alt-D',
        descriptionKey: 'settings.shortcuts.actions.divider',
      },
    ],
  },
  // Text alignment
  {
    titleKey: 'settings.shortcuts.categories.align',
    shortcuts: [
      {
        id: 'align-left',
        key: 'Mod-Shift-L',
        descriptionKey: 'settings.shortcuts.actions.alignLeft',
      },
      {
        id: 'align-center',
        key: 'Mod-Shift-E',
        descriptionKey: 'settings.shortcuts.actions.alignCenter',
      },
      {
        id: 'align-right',
        key: 'Mod-Shift-R',
        descriptionKey: 'settings.shortcuts.actions.alignRight',
      },
    ],
  },
  // View operations
  {
    titleKey: 'settings.shortcuts.categories.view',
    shortcuts: [
      {
        id: 'view-toggle-sidebar',
        key: 'Mod-\\',
        descriptionKey: 'settings.shortcuts.actions.toggleSidebar',
      },
      {
        id: 'view-toggle-source',
        key: 'Mod-/',
        descriptionKey: 'settings.shortcuts.actions.toggleSource',
      },
      { id: 'view-zoom-in', key: 'Mod-=', descriptionKey: 'settings.shortcuts.actions.zoomIn' },
      { id: 'view-zoom-out', key: 'Mod--', descriptionKey: 'settings.shortcuts.actions.zoomOut' },
      {
        id: 'view-zoom-reset',
        key: 'Mod-0',
        descriptionKey: 'settings.shortcuts.actions.zoomReset',
      },
      {
        id: 'view-settings',
        key: 'Mod-,',
        descriptionKey: 'settings.shortcuts.actions.openSettings',
      },
    ],
  },
];
