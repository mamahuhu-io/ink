import type { ExtensionType } from '@ink/stone-store';

import { CodeBlockHtmlAdapterExtension } from './html.js';
import { CodeBlockMarkdownAdapterExtensions } from './markdown/index.js';
import { CodeBlockPlainTextAdapterExtension } from './plain-text.js';

export const CodeBlockAdapterExtensions: ExtensionType[] = [
  CodeBlockHtmlAdapterExtension,
  CodeBlockMarkdownAdapterExtensions,
  CodeBlockPlainTextAdapterExtension,
].flat();
