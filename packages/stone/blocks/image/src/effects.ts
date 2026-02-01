import { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import { ImageBlockPageComponent } from './components/page-image-block.js';
import { ImageBlockComponent } from './image-block.js';
import { ImageEdgelessBlockComponent } from './image-edgeless-block.js';
import { ImageEdgelessPlaceholderBlockComponent } from './preview-image/edgeless.js';
import { ImagePlaceholderBlockComponent } from './preview-image/page.js';

export function effects() {
  customElements.define('ink-image', ImageBlockComponent);
  customElements.define('ink-edgeless-image', ImageEdgelessBlockComponent);
  customElements.define('ink-page-image', ImageBlockPageComponent);
  customElements.define('ink-image-fallback-card', ImageBlockFallbackCard);
  customElements.define('ink-placeholder-preview-image', ImagePlaceholderBlockComponent);
  customElements.define(
    'ink-edgeless-placeholder-preview-image',
    ImageEdgelessPlaceholderBlockComponent,
  );
}
