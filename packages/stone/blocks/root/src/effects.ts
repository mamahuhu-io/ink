import {
  // [REMOVED] Edgeless mode - not needed for Page mode
  // EdgelessRootBlockComponent,
  // EdgelessRootPreviewBlockComponent,
  PageRootBlockComponent,
  PreviewRootBlockComponent,
} from './index.js';

export function effects() {
  // Register components by category
  registerRootComponents();
}

function registerRootComponents() {
  customElements.define('ink-page-root', PageRootBlockComponent);
  customElements.define('ink-preview-root', PreviewRootBlockComponent);
  // [REMOVED] Edgeless mode - not needed for Page mode
  // customElements.define('ink-edgeless-root', EdgelessRootBlockComponent);
  // customElements.define(
  //   'ink-edgeless-root-preview',
  //   EdgelessRootPreviewBlockComponent
  // );
}

declare global {
  interface HTMLElementTagNameMap {
    // 'ink-edgeless-root': EdgelessRootBlockComponent;
    'ink-page-root': PageRootBlockComponent;
  }
}
