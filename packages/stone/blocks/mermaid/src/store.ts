import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@ink/stone-ext-loader';
import { MermaidBlockSchemaExtension } from '@ink/stone-model';

import { MermaidBlockAdapterExtensions } from './adapters/extension.js';
import { MermaidMarkdownPreprocessorExtension } from './adapters/markdown/preprocessor.js';

export class MermaidStoreExtension extends StoreExtensionProvider {
  override name = 'ink-mermaid-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([MermaidBlockSchemaExtension]);
    context.register(MermaidBlockAdapterExtensions);
    context.register(MermaidMarkdownPreprocessorExtension);
  }
}
