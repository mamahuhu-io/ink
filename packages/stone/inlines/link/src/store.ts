import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';

import {
  htmlLinkElementToDeltaMatcher,
  linkDeltaMarkdownAdapterMatch,
  linkDeltaToHtmlAdapterMatcher,
  linkDeltaToMarkdownAdapterMatcher,
  markdownLinkToDeltaMatcher,
} from './adapters';

export class LinkStoreExtension extends StoreExtensionProvider {
  override name = 'ink-link-inline';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(linkDeltaMarkdownAdapterMatch);
    context.register(linkDeltaToMarkdownAdapterMatcher);
    context.register(markdownLinkToDeltaMatcher);
    context.register(htmlLinkElementToDeltaMatcher);
    context.register(linkDeltaToHtmlAdapterMatcher);
  }
}
