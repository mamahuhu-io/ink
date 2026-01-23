import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@ink/stone-ext-loader';
import { DividerBlockSchemaExtension } from '@ink/stone-model';

import { DividerBlockAdapterExtensions } from './adapters/extension';

export class DividerStoreExtension extends StoreExtensionProvider {
  override name = 'ink-divider-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(DividerBlockSchemaExtension);
    context.register(DividerBlockAdapterExtensions);
  }
}
