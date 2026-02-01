import { type ViewExtensionContext, ViewExtensionProvider } from '@ink/stone-ext-loader';

// [REMOVED] Edgeless blocks - not needed for Page mode
// import { EdgelessClipboardImageConfig } from './edgeless-clipboard-config';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { effects } from './effects';
// [REMOVED] Edgeless blocks - not needed for Page mode
// import { ImageEdgelessBlockInteraction } from './image-edgeless-block';
import { ImageBlockFlavour, ImageBlockSpec } from './image-spec';

export class ImageViewExtension extends ViewExtensionProvider {
  override name = 'ink-image-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      ...ImageBlockSpec,
      // Register toolbar config here for proper i18n support (called at runtime, not module load time)
      ...createBuiltinToolbarConfigExtension(ImageBlockFlavour),
    ]);
    // [REMOVED] Edgeless blocks - not needed for Page mode
    // if (this.isEdgeless(context.scope)) {
    //   context.register(EdgelessClipboardImageConfig);
    //   context.register(ImageEdgelessBlockInteraction);
    // }
  }
}
