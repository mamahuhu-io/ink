import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import {
  HtmlAdapterFactoryExtension,
  MarkdownAdapterFactoryExtension,
  MixTextAdapterFactoryExtension,
  NotionTextAdapterFactoryExtension,
  PlainTextAdapterFactoryExtension,
} from '@ink/stone-shared/adapters';
import { HighlightSelectionExtension } from '@ink/stone-shared/selection';
import { BlockMetaService, FeatureFlagService } from '@ink/stone-shared/services';
import {
  BlockSelectionExtension,
  CursorSelectionExtension,
  SurfaceSelectionExtension,
  TextSelectionExtension,
} from '@ink/stone-std';

export class FoundationStoreExtension extends StoreExtensionProvider {
  override name = 'foundation';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([
      // predefined selections
      BlockSelectionExtension,
      TextSelectionExtension,
      SurfaceSelectionExtension,
      CursorSelectionExtension,
      HighlightSelectionExtension,

      // predefined adapters
      MarkdownAdapterFactoryExtension,
      PlainTextAdapterFactoryExtension,
      HtmlAdapterFactoryExtension,
      NotionTextAdapterFactoryExtension,
      MixTextAdapterFactoryExtension,

      // shared services
      FeatureFlagService,
      BlockMetaService,
    ]);
  }
}
