import { FileDropConfigExtension } from '@ink/stone-components/drop-indicator';
import { AttachmentBlockSchema } from '@ink/stone-model';

import { addSiblingAttachmentBlocks } from './utils.js';

export const AttachmentDropOption = FileDropConfigExtension({
  flavour: AttachmentBlockSchema.model.flavour,
  onDrop: ({ files, targetModel, placement, std }) => {
    // generic attachment block for all files except images
    const attachmentFiles = files.filter(
      file => !file.type.startsWith('image/')
    );
    if (!attachmentFiles.length) return false;

    if (targetModel) {
      addSiblingAttachmentBlocks(
        std,
        attachmentFiles,
        targetModel,
        placement
      ).catch(console.error);

      return true;
    }

    return false;
  },
});
