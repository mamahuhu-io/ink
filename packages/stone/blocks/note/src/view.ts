import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { NoteBlockSchema } from '@ink/stone-model';
import { BlockViewExtension, FlavourExtension } from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { NoteSlashMenuConfigExtension } from './configs/slash-menu';
// [REMOVED] Edgeless mode - not needed for Page mode
// import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
// import { EdgelessClipboardNoteConfig } from './edgeless-clipboard-config';
import { effects } from './effects';
// import { EdgelessNoteInteraction } from './note-edgeless-block';
import { NoteKeymapExtension } from './note-keymap';

const flavour = NoteBlockSchema.model.flavour;

export class NoteViewExtension extends ViewExtensionProvider {
  override name = 'ink-note-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension(flavour),
      NoteSlashMenuConfigExtension,
      NoteKeymapExtension,
    ]);

    // [REMOVED] Edgeless mode - always use Page mode
    context.register(BlockViewExtension(flavour, literal`ink-note`));
  }
}
