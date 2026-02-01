import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from '@ink/stone-components/icons';
import { toggleLink } from '@ink/stone-inline-link';
import { type EditorHost, TextSelection } from '@ink/stone-std';
import type { TemplateResult } from 'lit';

import {
  isTextAttributeActive,
  toggleBold,
  toggleCode,
  toggleItalic,
  toggleStrike,
  toggleUnderline,
} from './text-style.js';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for text format toolbar translations
 */
export function setTextFormatI18nGetter(getter: (key: string, fallback: string) => string) {
  console.log('[TextFormat] i18n getter set');
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    const result = i18nGetter(key, fallback);
    console.log(`[TextFormat] t('${key}', '${fallback}') => '${result}'`);
    return result;
  }
  console.log(`[TextFormat] t('${key}', '${fallback}') => '${fallback}' (no getter)`);
  return fallback;
}

export interface TextFormatConfig {
  id: string;
  name: string;
  icon: TemplateResult<1>;
  hotkey?: string;
  activeWhen: (host: EditorHost) => boolean;
  action: (host: EditorHost) => void;
  textChecker?: (host: EditorHost) => boolean;
}

export function getTextFormatConfigs(): TextFormatConfig[] {
  return [
    {
      id: 'bold',
      name: t('bold', 'Bold'),
      icon: BoldIcon,
      hotkey: 'Mod-b',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'bold' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleBold).run();
      },
    },
    {
      id: 'italic',
      name: t('italic', 'Italic'),
      icon: ItalicIcon,
      hotkey: 'Mod-i',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'italic' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleItalic).run();
      },
    },
    {
      id: 'underline',
      name: t('underline', 'Underline'),
      icon: UnderlineIcon,
      hotkey: 'Mod-u',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'underline' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleUnderline).run();
      },
    },
    {
      id: 'strike',
      name: t('strikethrough', 'Strikethrough'),
      icon: StrikethroughIcon,
      hotkey: 'Mod-shift-s',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'strike' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleStrike).run();
      },
    },
    {
      id: 'code',
      name: t('code', 'Code'),
      icon: CodeIcon,
      hotkey: 'Mod-e',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'code' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleCode).run();
      },
    },
    {
      id: 'link',
      name: t('link', 'Link'),
      icon: LinkIcon,
      hotkey: 'Mod-k',
      activeWhen: (host) => {
        const [result] = host.std.command
          .chain()
          .pipe(isTextAttributeActive, { key: 'link' })
          .run();
        return result;
      },
      action: (host) => {
        host.std.command.chain().pipe(toggleLink).run();
      },
      // should check text length
      textChecker: (host) => {
        const textSelection = host.std.selection.find(TextSelection);
        if (!textSelection || textSelection.isCollapsed()) return false;

        return Boolean(textSelection.from.length + (textSelection.to?.length ?? 0));
      },
    },
  ];
}

// Keep backward compatibility - but this will use fallback values
export const textFormatConfigs: TextFormatConfig[] = getTextFormatConfigs();
