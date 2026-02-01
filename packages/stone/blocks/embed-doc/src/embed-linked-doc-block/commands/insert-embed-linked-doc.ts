import { insertEmbedCard } from '@ink/stone-block-embed';
import type { EmbedCardStyle, ReferenceParams } from '@ink/stone-model';
import type { Command } from '@ink/stone-std';

export type LinkableFlavour =
  | 'ink:bookmark'
  | 'ink:embed-linked-doc'
  | 'ink:embed-synced-doc'
  | 'ink:embed-iframe'
  | 'ink:embed-figma'
  | 'ink:embed-github'
  | 'ink:embed-loom'
  | 'ink:embed-youtube';

export type InsertedLinkType = {
  flavour: LinkableFlavour;
} | null;

export const insertEmbedLinkedDocCommand: Command<
  {
    docId: string;
    params?: ReferenceParams;
  },
  { blockId: string }
> = (ctx, next) => {
  const { docId, params, std } = ctx;
  const flavour = 'ink:embed-linked-doc';
  const targetStyle: EmbedCardStyle = 'vertical';
  const props: Record<string, unknown> = { pageId: docId };
  if (params) props.params = params;
  const blockId = insertEmbedCard(std, { flavour, targetStyle, props });
  if (!blockId) return;
  next({ blockId });
};
