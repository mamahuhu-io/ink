import { ConfigExtensionFactory } from '@ink/stone-std';
import type { BundledLanguageInfo, ThemeInput } from 'shiki';

export interface CodeBlockConfig {
  theme?: {
    dark?: ThemeInput;
    light?: ThemeInput;
  };
  langs?: BundledLanguageInfo[];

  /**
   * Whether to show line numbers in the code block.
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Whether to enable word wrap in the code block.
   * @default false
   */
  enableWordWrap?: boolean;
}

export const CodeBlockConfigExtension = ConfigExtensionFactory<CodeBlockConfig>('ink:code');
