import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from '@ink/stone-icons/lit';
import { TextAlign } from '@ink/stone-model';
import type { TemplateResult } from 'lit';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for text align translations
 */
export function setTextAlignI18nGetter(getter: (key: string, fallback: string) => string) {
  console.log('[TextAlign] i18n getter set');
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

export interface TextAlignConfig {
  textAlign: TextAlign;
  name: string;
  hotkey: string[] | null;
  icon: TemplateResult<1>;
}

export function getTextAlignConfigs(): TextAlignConfig[] {
  return [
    {
      textAlign: TextAlign.Left,
      name: t('alignLeft', 'Align left'),
      hotkey: [`Mod-Shift-L`],
      icon: TextAlignLeftIcon(),
    },
    {
      textAlign: TextAlign.Center,
      name: t('alignCenter', 'Align center'),
      hotkey: [`Mod-Shift-E`],
      icon: TextAlignCenterIcon(),
    },
    {
      textAlign: TextAlign.Right,
      name: t('alignRight', 'Align right'),
      hotkey: [`Mod-Shift-R`],
      icon: TextAlignRightIcon(),
    },
  ];
}

// Keep backward compatibility - but this will use fallback values
export const textAlignConfigs: TextAlignConfig[] = getTextAlignConfigs();
