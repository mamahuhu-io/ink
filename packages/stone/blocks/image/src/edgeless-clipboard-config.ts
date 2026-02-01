import { EdgelessClipboardConfig } from '@ink/stone-block-surface';
import { type BlockSnapshot } from '@ink/stone-store';

export class EdgelessClipboardImageConfig extends EdgelessClipboardConfig {
  static override readonly key = 'ink:image';

  override async createBlock(image: BlockSnapshot) {
    const { xywh, rotate, sourceId, size, width, height, caption } = image.props;

    if (!this.surface) return null;

    if (!(await this.std.workspace.blobSync.get(sourceId as string))) {
      return null;
    }
    return this.crud.addBlock(
      'ink:image',
      {
        caption,
        sourceId,
        xywh,
        rotate,
        size,
        width,
        height,
      },
      this.surface.model.id,
    );
  }
}
