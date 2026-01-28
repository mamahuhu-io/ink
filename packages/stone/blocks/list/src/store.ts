import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { ListBlockSchemaExtension } from '@ink/stone-model';

import { ListBlockAdapterExtensions } from './adapters/extension';

export class ListStoreExtension extends StoreExtensionProvider {
  override name = 'ink-list-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(ListBlockSchemaExtension);
    context.register(ListBlockAdapterExtensions);
  }
}
