import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@ink/stone-ext-loader';
import { LatexBlockSchemaExtension } from '@ink/stone-model';

import { LatexBlockAdapterExtensions } from './adapters/extension';
import { LatexMarkdownPreprocessorExtension } from './adapters/markdown/preprocessor';

export class LatexStoreExtension extends StoreExtensionProvider {
  override name = 'ink-latex-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([LatexBlockSchemaExtension]);
    context.register(LatexBlockAdapterExtensions);
    context.register(LatexMarkdownPreprocessorExtension);
  }
}
