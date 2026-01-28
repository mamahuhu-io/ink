import { type ViewExtensionContext, ViewExtensionProvider } from '@ink/stone-ext-loader';
import { ParagraphBlockModel } from '@ink/stone-model';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';
import { z } from 'zod';

import { effects } from './effects';
import { ParagraphMarkdownExtension } from './markdown.js';
import { ParagraphBlockConfigExtension } from './paragraph-block-config.js';
import { ParagraphKeymapExtension, ParagraphTextKeymapExtension } from './paragraph-keymap.js';

// Default placeholders (used as fallback)
const defaultPlaceholders: Record<string, string> = {
  text: "Type '/' for commands",
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: '',
};

// i18n placeholder getter - can be overridden by the application
let i18nPlaceholderGetter: ((type: string) => string) | null = null;

// Language change listeners
const languageChangeListeners = new Set<() => void>();

/**
 * Set a custom i18n placeholder getter function
 * This allows the application to provide translated placeholders
 */
export function setPlaceholderGetter(getter: (type: string) => string) {
  i18nPlaceholderGetter = getter;
}

/**
 * Subscribe to language change events for placeholder updates
 * Returns an unsubscribe function
 */
export function subscribeLanguageChange(callback: () => void): () => void {
  languageChangeListeners.add(callback);
  return () => {
    languageChangeListeners.delete(callback);
  };
}

/**
 * Notify all subscribers that the language has changed
 * Call this when the application language changes
 */
export function notifyLanguageChange() {
  languageChangeListeners.forEach((callback) => callback());
}

/**
 * Get placeholder text with i18n support
 */
function getPlaceholderText(type: string): string {
  if (i18nPlaceholderGetter) {
    return i18nPlaceholderGetter(type);
  }
  return defaultPlaceholders[type] || '';
}

const optionsSchema = z.object({
  getPlaceholder: z.optional(
    z.function().args(z.instanceof(ParagraphBlockModel)).returns(z.string()),
  ),
});

export class ParagraphViewExtension extends ViewExtensionProvider<z.infer<typeof optionsSchema>> {
  override name = 'ink-paragraph-block';

  override schema = optionsSchema;

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext, options?: z.infer<typeof optionsSchema>) {
    super.setup(context, options);
    const getPlaceholder =
      options?.getPlaceholder ?? ((model) => getPlaceholderText(model.props.type));

    context.register([
      FlavourExtension('ink:paragraph'),
      BlockViewExtension('ink:paragraph', literal`ink-paragraph`),
      ParagraphTextKeymapExtension,
      ParagraphKeymapExtension,
      ParagraphBlockConfigExtension({
        getPlaceholder,
      }),
      ParagraphMarkdownExtension,
    ]);
  }
}
