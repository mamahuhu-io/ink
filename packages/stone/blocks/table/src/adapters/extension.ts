import type { ExtensionType } from '@ink/stone-store';

import { TableBlockHtmlAdapterExtension } from './html.js';
import { TableBlockMarkdownAdapterExtension } from './markdown.js';
import { TableBlockPlainTextAdapterExtension } from './plain-text.js';

export const TableBlockAdapterExtensions: ExtensionType[] = [
  TableBlockHtmlAdapterExtension,
  TableBlockMarkdownAdapterExtension,
  TableBlockPlainTextAdapterExtension,
];
