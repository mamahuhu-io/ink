import type { ExtensionType } from '@ink/stone-store';

import { LatexBlockMarkdownAdapterExtension } from './markdown.js';
import { LatexMarkdownPreprocessorExtension } from './preprocessor.js';

export * from './markdown.js';
export * from './preprocessor.js';

export const LatexMarkdownAdapterExtensions: ExtensionType[] = [
  LatexMarkdownPreprocessorExtension,
  LatexBlockMarkdownAdapterExtension,
];
