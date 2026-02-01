import { unsafeCSSVarV2 } from '@ink/stone-shared/theme';
import { toGfxBlockComponent } from '@ink/stone-std';
import { css } from 'lit';

import { ImagePlaceholderBlockComponent } from './page.js';

export class ImageEdgelessPlaceholderBlockComponent extends toGfxBlockComponent(
  ImagePlaceholderBlockComponent,
) {
  static override styles = css`
    ink-edgeless-placeholder-preview-image .ink-placeholder-preview-container {
      border: 1px solid ${unsafeCSSVarV2('layer/background/tertiary')};
    }
  `;

  override renderGfxBlock(): unknown {
    return super.renderGfxBlock();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-edgeless-placeholder-preview-image': ImageEdgelessPlaceholderBlockComponent;
  }
}
