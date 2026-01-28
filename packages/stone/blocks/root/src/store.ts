import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { RootBlockSchemaExtension } from '@ink/stone-model';

import { RootBlockAdapterExtensions } from './adapters/extension';

export class RootStoreExtension extends StoreExtensionProvider {
  override name = 'ink-root-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(RootBlockSchemaExtension);
    context.register(RootBlockAdapterExtensions);
  }
}
