import { createBlockI18n } from '@ink/stone-shared/utils';

const i18n = createBlockI18n();

export const setEmojiI18nGetter = (
  getter: (key: string, fallback: string) => string
) => {
  i18n.setI18nGetter(getter);
};

export const t = (key: string, fallback: string) => {
  return i18n.t(key, fallback);
};
