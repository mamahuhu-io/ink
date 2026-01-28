import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { ParagraphBlockSchemaExtension } from '@ink/stone-model';

import { ParagraphBlockAdapterExtensions } from './adapters/extension';

export class ParagraphStoreExtension extends StoreExtensionProvider {
  override name = 'ink-paragraph-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(ParagraphBlockSchemaExtension);
    context.register(ParagraphBlockAdapterExtensions);
  }
}
