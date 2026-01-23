import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@ink/stone-ext-loader';
import { NoteBlockSchema } from '@ink/stone-model';
import {
  ToolbarModuleExtension,
  ViewportElementExtension,
} from '@ink/stone-shared/services';
import {
  BlockFlavourIdentifier,
  BlockViewExtension,
  FlavourExtension,
} from '@ink/stone-std';
import { literal } from 'lit/static-html.js';

import { PageClipboard, ReadOnlyClipboard } from './clipboard';
import { builtinToolbarConfig } from './configs/toolbar';
// [REMOVED] Edgeless mode - not needed for Page mode markdown editor
// import { EdgelessClipboardController, EdgelessRootService } from './edgeless';
// import { EdgelessElementToolbarExtension } from './edgeless/configs/toolbar';
// import { EdgelessLocker } from './edgeless/edgeless-root-spec';
// import { AltCloneExtension } from './edgeless/interact-extensions/clone-ext';
import { effects } from './effects';
import { fallbackKeymap } from './keyboard/keymap';

export class RootViewExtension extends ViewExtensionProvider {
  override name = 'ink-root-block';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('ink:page'),
      fallbackKeymap,
      ToolbarModuleExtension({
        id: BlockFlavourIdentifier(NoteBlockSchema.model.flavour),
        config: builtinToolbarConfig,
      }),
    ]);
    if (
      context.scope === 'preview-page' ||
      context.scope === 'preview-edgeless'
    ) {
      context.register(ReadOnlyClipboard);
    }
    // [REMOVED] Edgeless mode check - always use Page mode
    // if (this.isEdgeless(context.scope)) {
    //   this._setupEdgeless(context);
    //   return;
    // }
    this._setupPage(context);
  }

  private readonly _setupPage = (context: ViewExtensionContext) => {
    context.register(ViewportElementExtension('.ink-page-viewport'));
    if (context.scope === 'preview-page') {
      context.register(
        BlockViewExtension('ink:page', literal`ink-preview-root`)
      );
      return;
    }
    context.register(
      BlockViewExtension('ink:page', literal`ink-page-root`)
    );
    context.register(PageClipboard);
  };

  // [REMOVED] Edgeless setup - not needed for Page mode
  // private readonly _setupEdgeless = (context: ViewExtensionContext) => { ... };
}
