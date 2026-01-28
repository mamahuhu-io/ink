// [REMOVED] Edgeless blocks - not needed for Page mode
// import type { SurfaceBlockModel } from '@ink/stone-block-surface';
import type { BlockStdScope } from '@ink/stone-std';
import type { TransformerMiddleware } from '@ink/stone-store';

/**
 * [REMOVED] Edgeless blocks - not needed for Page mode
 * This middleware is for filtering gfx elements that are not selected in Edgeless mode
 * For Page mode, we don't need this functionality
 */
export const gfxBlocksFilter = (_ids: string[], _std: BlockStdScope): TransformerMiddleware => {
  // Return a no-op middleware for Page mode
  return () => {
    return () => {};
  };
};
