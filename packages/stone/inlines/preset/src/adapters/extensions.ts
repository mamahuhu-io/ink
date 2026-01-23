import type { ExtensionType } from '@ink/stone-store';

import { HtmlInlineToDeltaAdapterExtensions } from './html/html-inline';
import { InlineDeltaToHtmlAdapterExtensions } from './html/inline-delta';
import { InlineDeltaToMarkdownAdapterExtensions } from './markdown/inline-delta';
import { MarkdownInlineToDeltaAdapterExtensions } from './markdown/markdown-inline';

export const InlineAdapterExtensions: ExtensionType[] = [
  HtmlInlineToDeltaAdapterExtensions,
  InlineDeltaToHtmlAdapterExtensions,
  InlineDeltaToMarkdownAdapterExtensions,
  MarkdownInlineToDeltaAdapterExtensions,
].flat();

export * from './html/html-inline';
export * from './html/inline-delta';
export * from './markdown/inline-delta';
export * from './markdown/markdown-inline';
