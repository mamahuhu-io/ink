import { EdgelessClipboardConfig } from '@ink/stone-block-surface';
import { ReferenceInfoSchema } from '@ink/stone-model';
import { type BlockSnapshot } from '@ink/stone-store';

export class EdgelessClipboardEmbedLinkedDocConfig extends EdgelessClipboardConfig {
  static override readonly key = 'ink:embed-linked-doc';

  override createBlock(linkedDocEmbed: BlockSnapshot): string | null {
    if (!this.surface) return null;

    const { xywh, style, caption, pageId, params, title, description } =
      linkedDocEmbed.props;
    const referenceInfo = ReferenceInfoSchema.parse({
      pageId,
      params,
      title,
      description,
    });

    return this.crud.addBlock(
      'ink:embed-linked-doc',
      {
        xywh,
        style,
        caption,
        ...referenceInfo,
      },
      this.surface.model.id
    );
  }
}
