import type { ExtensionType } from '@ink/stone-store';

import { MermaidBlockMarkdownAdapterExtension } from './markdown.js';
import { MermaidMarkdownPreprocessorExtension } from './preprocessor.js';

export * from './markdown.js';
export * from './preprocessor.js';

export const MermaidMarkdownAdapterExtensions: ExtensionType[] = [
  MermaidMarkdownPreprocessorExtension,
  MermaidBlockMarkdownAdapterExtension,
];
