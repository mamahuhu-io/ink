import type { ExtensionType } from '@ink/stone-store';

import { ParagraphBlockHtmlAdapterExtension } from './html.js';
import { ParagraphBlockMarkdownAdapterExtension } from './markdown.js';
import { ParagraphBlockPlainTextAdapterExtension } from './plain-text.js';

export const ParagraphBlockAdapterExtensions: ExtensionType[] = [
  ParagraphBlockHtmlAdapterExtension,
  ParagraphBlockMarkdownAdapterExtension,
  ParagraphBlockPlainTextAdapterExtension,
];
