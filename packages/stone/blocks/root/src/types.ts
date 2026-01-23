// [REMOVED] Edgeless blocks - not needed for Page mode
// import type { EdgelessRootBlockComponent } from './edgeless/edgeless-root-block.js';
import type { PageRootBlockComponent } from './page/page-root-block.js';

// For Page mode only, EdgelessRootBlockComponent is not available
export type RootBlockComponent = PageRootBlockComponent;
