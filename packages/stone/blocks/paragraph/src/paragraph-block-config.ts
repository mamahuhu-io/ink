import type { ParagraphBlockModel } from '@ink/stone-model';
import { ConfigExtensionFactory } from '@ink/stone-std';

export interface ParagraphBlockConfig {
  getPlaceholder: (model: ParagraphBlockModel) => string;
}

export const ParagraphBlockConfigExtension =
  ConfigExtensionFactory<ParagraphBlockConfig>('ink:paragraph');
