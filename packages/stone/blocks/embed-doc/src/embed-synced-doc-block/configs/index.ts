import { EmbedSyncedDocBlockSchema, type EmbedSyncedDocModel } from '@ink/stone-model';
import { type BlockStdScope, ConfigExtensionFactory } from '@ink/stone-std';
import type { TemplateResult } from 'lit';

export type EmbedSyncedDocConfig = {
  edgelessHeader: (context: { model: EmbedSyncedDocModel; std: BlockStdScope }) => TemplateResult;
};

export const EmbedSyncedDocConfigExtension = ConfigExtensionFactory<EmbedSyncedDocConfig>(
  EmbedSyncedDocBlockSchema.model.flavour,
);
