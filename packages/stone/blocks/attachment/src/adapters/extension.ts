import type { ExtensionType } from '@ink/stone-store';

import { AttachmentBlockMarkdownAdapterExtension } from './markdown.js';

export const AttachmentBlockAdapterExtensions: ExtensionType[] = [
  AttachmentBlockMarkdownAdapterExtension,
];
