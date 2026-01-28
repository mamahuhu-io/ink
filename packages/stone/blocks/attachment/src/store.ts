import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { AttachmentBlockSchemaExtension } from '@ink/stone-model';

import { AttachmentBlockAdapterExtensions } from './adapters/extension';

export class AttachmentStoreExtension extends StoreExtensionProvider {
  override name = 'ink-attachment-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(AttachmentBlockSchemaExtension);
    context.register(AttachmentBlockAdapterExtensions);
  }
}
