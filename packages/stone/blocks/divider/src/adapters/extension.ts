import type { ExtensionType } from '@ink/stone-store';

import { DividerBlockHtmlAdapterExtension } from './html.js';
import { DividerBlockMarkdownAdapterExtension } from './markdown.js';
import { DividerBlockPlainTextAdapterExtension } from './plain-text.js';

export const DividerBlockAdapterExtensions: ExtensionType[] = [
  DividerBlockHtmlAdapterExtension,
  DividerBlockMarkdownAdapterExtension,
  DividerBlockPlainTextAdapterExtension,
];
