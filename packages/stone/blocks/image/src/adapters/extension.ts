import type { ExtensionType } from '@ink/stone-store';

import { ImageBlockHtmlAdapterExtension } from './html.js';
import { ImageBlockMarkdownAdapterExtension } from './markdown.js';

export const ImageBlockAdapterExtensions: ExtensionType[] = [
  ImageBlockHtmlAdapterExtension,
  ImageBlockMarkdownAdapterExtension,
];
