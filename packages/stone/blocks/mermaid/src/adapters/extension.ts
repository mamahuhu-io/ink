import type { ExtensionType } from '@ink/stone-store';

import { MermaidBlockHtmlAdapterExtension } from './html.js';
import { MermaidMarkdownAdapterExtensions } from './markdown/index.js';
import { MermaidBlockPlainTextAdapterExtension } from './plain-text.js';

export const MermaidBlockAdapterExtensions: ExtensionType[] = [
  MermaidMarkdownAdapterExtensions,
  MermaidBlockHtmlAdapterExtension,
  MermaidBlockPlainTextAdapterExtension,
].flat();
