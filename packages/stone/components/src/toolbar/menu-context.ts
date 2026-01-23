import type { BlockStdScope, EditorHost } from '@ink/stone-std';
import type { GfxModel } from '@ink/stone-std/gfx';
import type { BlockModel, Store } from '@ink/stone-store';

export abstract class MenuContext {
  abstract get doc(): Store;

  get firstElement(): GfxModel | null {
    return null;
  }

  abstract get host(): EditorHost;

  abstract get selectedBlockModels(): BlockModel[];

  abstract get std(): BlockStdScope;

  // Sometimes we need to close the menu.
  close() {}

  isElement() {
    return false;
  }

  abstract isEmpty(): boolean;

  abstract isMultiple(): boolean;

  abstract isSingle(): boolean;
}
