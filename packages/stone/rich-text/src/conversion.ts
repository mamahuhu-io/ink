import {
  BulletedListIcon,
  CheckBoxIcon,
  CodeBlockIcon,
  DividerIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  NumberedListIcon,
  QuoteIcon,
  TextIcon,
} from '@ink/stone-components/icons';
import type { TemplateResult } from 'lit';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for text conversion translations
 */
export function setTextConversionI18nGetter(getter: (key: string, fallback: string) => string) {
  console.log('[TextConversion] i18n getter set');
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    return i18nGetter(key, fallback);
  }
  return fallback;
}

/**
 * Text primitive entries used in slash menu and format bar,
 * which are also used for registering hotkeys for converting block flavours.
 */
export interface TextConversionConfig {
  flavour: string;
  type?: string;
  name: string;
  description?: string;
  hotkey: string[] | null;
  icon: TemplateResult<1>;
}

export function getTextConversionConfigs(): TextConversionConfig[] {
  return [
    {
      flavour: 'ink:paragraph',
      type: 'text',
      name: t('text', 'Text'),
      description: t('textDesc', 'Start typing with plain text.'),
      hotkey: [`Mod-Alt-0`, `Mod-Shift-0`],
      icon: TextIcon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h1',
      name: t('heading1', 'Heading 1'),
      description: t('heading1Desc', 'Headings in the largest font.'),
      hotkey: [`Mod-Alt-1`, `Mod-Shift-1`],
      icon: Heading1Icon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h2',
      name: t('heading2', 'Heading 2'),
      description: t('heading2Desc', 'Headings in the 2nd font size.'),
      hotkey: [`Mod-Alt-2`, `Mod-Shift-2`],
      icon: Heading2Icon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h3',
      name: t('heading3', 'Heading 3'),
      description: t('heading3Desc', 'Headings in the 3rd font size.'),
      hotkey: [`Mod-Alt-3`, `Mod-Shift-3`],
      icon: Heading3Icon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h4',
      name: t('heading4', 'Heading 4'),
      description: t('heading4Desc', 'Headings in the 4th font size.'),
      hotkey: [`Mod-Alt-4`, `Mod-Shift-4`],
      icon: Heading4Icon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h5',
      name: t('heading5', 'Heading 5'),
      description: t('heading5Desc', 'Headings in the 5th font size.'),
      hotkey: [`Mod-Alt-5`, `Mod-Shift-5`],
      icon: Heading5Icon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'h6',
      name: t('heading6', 'Heading 6'),
      description: t('heading6Desc', 'Headings in the 6th font size.'),
      hotkey: [`Mod-Alt-6`, `Mod-Shift-6`],
      icon: Heading6Icon,
    },
    {
      flavour: 'ink:list',
      type: 'bulleted',
      name: t('bulletedList', 'Bulleted List'),
      description: t('bulletedListDesc', 'Create a bulleted list.'),
      hotkey: [`Mod-Alt-8`, `Mod-Shift-8`],
      icon: BulletedListIcon,
    },
    {
      flavour: 'ink:list',
      type: 'numbered',
      name: t('numberedList', 'Numbered List'),
      description: t('numberedListDesc', 'Create a numbered list.'),
      hotkey: [`Mod-Alt-9`, `Mod-Shift-9`],
      icon: NumberedListIcon,
    },
    {
      flavour: 'ink:list',
      type: 'todo',
      name: t('todoList', 'To-do List'),
      description: t('todoListDesc', 'Add tasks to a to-do list.'),
      hotkey: null,
      icon: CheckBoxIcon,
    },
    {
      flavour: 'ink:code',
      type: undefined,
      name: t('codeBlock', 'Code Block'),
      description: t('codeBlockDesc', 'Code snippet with formatting.'),
      hotkey: [`Mod-Alt-c`],
      icon: CodeBlockIcon,
    },
    {
      flavour: 'ink:paragraph',
      type: 'quote',
      name: t('quote', 'Quote'),
      description: t('quoteDesc', 'Add a blockquote for emphasis.'),
      hotkey: null,
      icon: QuoteIcon,
    },
    {
      flavour: 'ink:divider',
      type: 'divider',
      name: t('divider', 'Divider'),
      description: t('dividerDesc', 'Visually separate content.'),
      hotkey: [`Mod-Alt-d`, `Mod-Shift-d`],
      icon: DividerIcon,
    },
  ];
}

// Keep backward compatibility - but this will use fallback values
export const textConversionConfigs: TextConversionConfig[] = getTextConversionConfigs();
