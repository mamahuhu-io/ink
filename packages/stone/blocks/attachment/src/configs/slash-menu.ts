import { ExportToPdfIcon, FileIcon } from '@ink/stone-icons/lit';
import { openSingleFileWith } from '@ink/stone-shared/utils';
import { type SlashMenuConfig } from '@ink/stone-widget-slash-menu';

import { addSiblingAttachmentBlocks } from '../utils';
import { AttachmentTooltip, PDFTooltip } from './tooltips';

export const attachmentSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Attachment',
      description: 'Attach a file to document.',
      icon: FileIcon(),
      tooltip: {
        figure: AttachmentTooltip,
        caption: 'Attachment',
      },
      searchAlias: ['file'],
      group: '4_Content & Media@3',
      when: ({ model }) => model.store.schema.flavourSchemaMap.has('ink:attachment'),
      action: ({ std, model }) => {
        (async () => {
          const file = await openSingleFileWith();
          if (!file) return;

          await addSiblingAttachmentBlocks(std, [file], model);
          if (model.text?.length === 0) {
            std.store.deleteBlock(model);
          }
        })().catch(console.error);
      },
    },
    {
      name: 'PDF',
      description: 'Upload a PDF to document.',
      icon: ExportToPdfIcon(),
      tooltip: {
        figure: PDFTooltip,
        caption: 'PDF',
      },
      group: '4_Content & Media@4',
      when: ({ model }) => model.store.schema.flavourSchemaMap.has('ink:attachment'),
      action: ({ std, model }) => {
        (async () => {
          const file = await openSingleFileWith();
          if (!file) return;

          await addSiblingAttachmentBlocks(std, [file], model);
          if (model.text?.length === 0) {
            std.store.deleteBlock(model);
          }
        })().catch(console.error);
      },
    },
  ],
};
