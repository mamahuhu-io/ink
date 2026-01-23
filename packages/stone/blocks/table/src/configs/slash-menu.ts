import { getSelectedModelsCommand } from '@ink/stone-shared/commands';
import { TelemetryProvider } from '@ink/stone-shared/services';
import { isInsideBlockByFlavour } from '@ink/stone-shared/utils';
import type { SlashMenuConfig } from '@ink/stone-widget-slash-menu';
import { TableIcon } from '@ink/stone-icons/lit';

import { insertTableBlockCommand } from '../commands';
import { tableTooltip } from './tooltips';
import { t } from './i18n';

export const tableSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => model.flavour === 'ink:table',
  items: [
    {
      name: t('editor.slashMenu.table', 'Table'),
      description: t('editor.slashMenu.tableDesc', 'Create a simple table.'),
      icon: TableIcon(),
      tooltip: {
        figure: tableTooltip,
        caption: t('editor.slashMenu.table', 'Table'),
      },
      group: '4_Content & Media@0',
      when: ({ model }) =>
        !isInsideBlockByFlavour(model.store, model, 'ink:edgeless-text'),
      action: ({ std }) => {
        std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertTableBlockCommand, {
            place: 'after',
            removeEmptyLine: true,
          })
          .pipe(({ insertedTableBlockId }) => {
            if (insertedTableBlockId) {
              const telemetry = std.getOptional(TelemetryProvider);
              telemetry?.track('BlockCreated', {
                blockType: 'ink:table',
              });
            }
          })
          .run();
      },
    },
  ],
};
