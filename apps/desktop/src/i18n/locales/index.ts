import en from './en.json'
import zhCN from './zh-CN.json'
import ja from './ja.json'
import ko from './ko.json'
import es from './es.json'
import ptBR from './pt-BR.json'
import zhTW from './zh-TW.json'

export const resources = {
  en: { translation: en },
  'zh-CN': { translation: zhCN },
  ja: { translation: ja },
  ko: { translation: ko },
  es: { translation: es },
  'pt-BR': { translation: ptBR },
  'zh-TW': { translation: zhTW },
}

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

export { en, zhCN, ja, ko, es, ptBR, zhTW }