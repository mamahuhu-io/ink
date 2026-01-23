import type { ExtensionType } from '@ink/stone-store';

import { ListBlockHtmlAdapterExtension } from './html.js';
import { ListBlockMarkdownAdapterExtension } from './markdown.js';
import { ListBlockPlainTextAdapterExtension } from './plain-text.js';

export const ListBlockAdapterExtensions: ExtensionType[] = [
  ListBlockHtmlAdapterExtension,
  ListBlockMarkdownAdapterExtension,
  ListBlockPlainTextAdapterExtension,
];
