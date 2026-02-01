// Ink Stone effects initialization and custom element registration

// Import extension managers
import { setCaptionI18nGetter } from '@ink/stone-components/caption';
import { setHighlightI18nGetter } from '@ink/stone-components/highlight-dropdown-menu';
import { setAttachmentI18nGetter } from '@ink/stone-core/blocks/attachment';
import { setCodeLangI18nGetter } from '@ink/stone-core/blocks/code';
import { setImageI18nGetter } from '@ink/stone-core/blocks/image';
import { setNoteI18nGetter } from '@ink/stone-core/blocks/note';
// Import i18n setters from Stone packages (synchronous imports)
import { notifyLanguageChange, setPlaceholderGetter } from '@ink/stone-core/blocks/paragraph';
import { setToolbarI18nGetter } from '@ink/stone-core/blocks/root';
import { setTableI18nGetter } from '@ink/stone-core/blocks/table';
import { StoreExtensionManager, ViewExtensionManager } from '@ink/stone-core/ext-loader';
import { getInternalStoreExtensions } from '@ink/stone-core/extensions/store';
import { getInternalViewExtensions } from '@ink/stone-core/extensions/view';
import { setLatexI18nGetter } from '@ink/stone-core/inlines/latex';
import { setLinkI18nGetter, setLinkPopupI18nGetter } from '@ink/stone-core/inlines/link';
import { setTextFormatI18nGetter } from '@ink/stone-core/inlines/preset';
import {
  setSlashMenuEmojiPickerI18nGetter,
  setSlashMenuI18nGetter,
  setSlashMenuLinkPopupI18nGetter,
} from '@ink/stone-core/widgets/slash-menu';
import { setTextAlignI18nGetter, setTextConversionI18nGetter } from '@ink/stone-rich-text';
import { setIconPickerI18nGetter } from '@ink/stone-shared/services';

// Import i18n support
import {
  getBlockTranslation,
  getCaptionTranslation,
  getCodeLangTranslation,
  getEmojiTranslation,
  getHighlightTranslation,
  getIconPickerTranslation,
  getLatexTranslation,
  getLinkPopupTranslation,
  getLinkToolbarTranslation,
  getPlaceholder,
  getSlashMenuLinkPopupTranslation,
  getSlashMenuTranslation,
  getTextAlignTranslation,
  getTextConversionTranslation,
  getTextFormatTranslation,
  getToolbarTranslation,
  onLanguageChange,
} from './i18n';

// Create extension managers (this will trigger Stone's internal registration)
const viewManager = new ViewExtensionManager(getInternalViewExtensions());
const storeManager = new StoreExtensionManager(getInternalStoreExtensions());

// Export managers for use in editor creation
export const getViewManager = () => viewManager;
export const getStoreManager = () => storeManager;

// Effects initialization function - only register our custom editor container
let initialized = false;

export function effects() {
  if (initialized) return;
  initialized = true;

  // Set up i18n for all Stone components (synchronous)
  setPlaceholderGetter(getPlaceholder);
  setSlashMenuI18nGetter(getSlashMenuTranslation);
  setSlashMenuLinkPopupI18nGetter(getSlashMenuLinkPopupTranslation);
  setSlashMenuEmojiPickerI18nGetter(getEmojiTranslation);
  setLinkPopupI18nGetter(getLinkPopupTranslation);
  setLinkI18nGetter(getLinkToolbarTranslation);
  setCaptionI18nGetter(getCaptionTranslation);
  setCodeLangI18nGetter(getCodeLangTranslation);
  setLatexI18nGetter(getLatexTranslation);
  setTextFormatI18nGetter(getTextFormatTranslation);
  setToolbarI18nGetter(getToolbarTranslation);
  setTableI18nGetter(getBlockTranslation);
  setImageI18nGetter(getBlockTranslation);
  setAttachmentI18nGetter(getBlockTranslation);
  setNoteI18nGetter(getBlockTranslation);
  setTextConversionI18nGetter(getTextConversionTranslation);
  setTextAlignI18nGetter(getTextAlignTranslation);
  setHighlightI18nGetter(getHighlightTranslation);
  setIconPickerI18nGetter(getIconPickerTranslation);

  // Connect i18n language change to Stone placeholder updates
  onLanguageChange(() => {
    notifyLanguageChange();
  });

  // Dynamically import and register editor container to avoid side effect conflicts
  import('./editor-container').then(({ InkEditorContainer }) => {
    if (!customElements.get('ink-editor-container')) {
      customElements.define('ink-editor-container', InkEditorContainer);
    }
  });

  // Register source editor component
  import('./source-editor').then(({ InkSourceEditor }) => {
    if (!customElements.get('ink-source-editor')) {
      customElements.define('ink-source-editor', InkSourceEditor);
    }
  });

  console.log('Ink Stone effects initialized with i18n support');
}
