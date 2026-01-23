import type { ExtensionType } from '@ink/stone-store';

import { CodeBlockMarkdownAdapterExtension } from './markdown.js';
import { CodeMarkdownPreprocessorExtension } from './preprocessor.js';

export * from './markdown.js';
export * from './preprocessor.js';

export const CodeBlockMarkdownAdapterExtensions: ExtensionType[] = [
  CodeMarkdownPreprocessorExtension,
  CodeBlockMarkdownAdapterExtension,
];
