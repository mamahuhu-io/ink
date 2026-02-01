import { textKeymap } from '@ink/stone-inline-preset';
import { CodeBlockSchema } from '@ink/stone-model';
import { KeymapExtension } from '@ink/stone-std';

export const CodeKeymapExtension = KeymapExtension(textKeymap, {
  flavour: CodeBlockSchema.model.flavour,
});
