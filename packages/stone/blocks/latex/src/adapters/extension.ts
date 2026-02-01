import type { ExtensionType } from '@ink/stone-store';

import { LatexMarkdownAdapterExtensions } from './markdown/index.js';
import { LatexBlockPlainTextAdapterExtension } from './plain-text.js';

export const LatexBlockAdapterExtensions: ExtensionType[] = [
  LatexMarkdownAdapterExtensions,
  LatexBlockPlainTextAdapterExtension,
].flat();
