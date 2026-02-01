import { type StoreExtensionContext, StoreExtensionProvider } from '@ink/stone-ext-loader';
import { CodeBlockSchemaExtension } from '@ink/stone-model';

import { CodeBlockAdapterExtensions } from './adapters/extension.js';
import { CodeMarkdownPreprocessorExtension } from './adapters/markdown/preprocessor.js';
import { CodeBlockConfigExtension } from './code-block-config.js';

export class CodeStoreExtension extends StoreExtensionProvider {
  override name = 'ink-code-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(CodeBlockSchemaExtension);
    context.register(CodeBlockAdapterExtensions);
    context.register(CodeMarkdownPreprocessorExtension);
    context.register(
      CodeBlockConfigExtension({
        showLineNumbers: true,
        enableWordWrap: false,
      }),
    );
  }
}
