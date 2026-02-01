import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { ImageBlockSchemaExtension } from '@ink/stone-model';
import { ImageSelectionExtension } from '@ink/stone-shared/selection';

import { ImageBlockAdapterExtensions } from './adapters/extension';

export class ImageStoreExtension extends StoreExtensionProvider {
  override name = 'ink-image-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([ImageBlockSchemaExtension, ImageSelectionExtension]);
    context.register(ImageBlockAdapterExtensions);
  }
}
