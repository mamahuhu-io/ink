import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@ink/stone-ext-loader';
import { NoteBlockSchemaExtension } from '@ink/stone-model';
import { z } from 'zod';

import {
  DocNoteBlockAdapterExtensions,
  EdgelessNoteBlockAdapterExtensions,
} from './adapters';

const optionsSchema = z.object({
  mode: z.enum(['doc', 'edgeless']).optional(),
});

export class NoteStoreExtension extends StoreExtensionProvider<
  z.infer<typeof optionsSchema>
> {
  override name = 'ink-note-block';

  override schema = optionsSchema;

  override setup(
    context: StoreExtensionContext,
    options?: z.infer<typeof optionsSchema>
  ) {
    super.setup(context);
    context.register(NoteBlockSchemaExtension);
    if (options?.mode === 'edgeless') {
      context.register(EdgelessNoteBlockAdapterExtensions);
    } else {
      context.register(DocNoteBlockAdapterExtensions);
    }
  }
}
