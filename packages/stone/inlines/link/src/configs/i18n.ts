import { createBlockI18n } from '@ink/stone-shared/utils';

const i18n = createBlockI18n();

export const setLinkI18nGetter = (getter: (key: string, fallback: string) => string) => {
  console.log('[Link i18n] setLinkI18nGetter called');
  i18n.setI18nGetter(getter);
};

export const t = (key: string, fallback: string) => {
  const result = i18n.t(key, fallback);
  console.log(`[Link i18n] t('${key}', '${fallback}') = '${result}'`);
  return result;
};
