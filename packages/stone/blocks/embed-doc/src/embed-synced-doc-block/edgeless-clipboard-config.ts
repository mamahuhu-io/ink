import { EdgelessClipboardConfig } from '@ink/stone-block-surface';
import { ReferenceInfoSchema } from '@ink/stone-model';
import { type BlockSnapshot } from '@ink/stone-store';

export class EdgelessClipboardEmbedSyncedDocConfig extends EdgelessClipboardConfig {
  static override readonly key = 'ink:embed-synced-doc';

  override createBlock(syncedDocEmbed: BlockSnapshot): string | null {
    if (!this.surface) return null;

    const { xywh, style, caption, scale, pageId, params } =
      syncedDocEmbed.props;
    const referenceInfo = ReferenceInfoSchema.parse({ pageId, params });

    return this.crud.addBlock(
      'ink:embed-synced-doc',
      {
        xywh,
        style,
        caption,
        scale,
        ...referenceInfo,
      },
      this.surface.model.id
    );
  }
}
