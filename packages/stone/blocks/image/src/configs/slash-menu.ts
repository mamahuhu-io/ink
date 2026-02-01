import { ImageIcon } from '@ink/stone-icons/lit';
import { getSelectedModelsCommand } from '@ink/stone-shared/commands';
import { type SlashMenuConfig } from '@ink/stone-widget-slash-menu';

import { insertImagesCommand } from '../commands';
import { PhotoTooltip } from './tooltips';

export const imageSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Image',
      description: 'Insert an image.',
      icon: ImageIcon(),
      tooltip: {
        figure: PhotoTooltip,
        caption: 'Photo',
      },
      group: '4_Content & Media@1',
      when: ({ model }) => model.store.schema.flavourSchemaMap.has('ink:image'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertImagesCommand, { removeEmptyLine: true })
          .run();

        if (success) ctx.insertedImageIds.catch(console.error);
      },
    },
  ],
};
