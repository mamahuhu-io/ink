import { EmbedLinkedDocBlockSchema } from '@ink/stone-model';
import { insertContent } from '@ink/stone-rich-text';
import { REFERENCE_NODE } from '@ink/stone-shared/consts';
import { createDefaultDoc } from '@ink/stone-shared/utils';
import {
  type SlashMenuConfig,
  SlashMenuConfigIdentifier,
} from '@ink/stone-widget-slash-menu';
import { LinkedPageIcon, PlusIcon } from '@ink/stone-icons/lit';
import { type ExtensionType } from '@ink/stone-store';

import { LinkDocTooltip, NewDocTooltip } from './tooltips';

const linkedDocSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'New Doc',
      description: 'Start a new document.',
      icon: PlusIcon(),
      tooltip: {
        figure: NewDocTooltip,
        caption: 'New Doc',
      },
      group: '3_Page@0',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('ink:embed-linked-doc'),
      action: ({ std, model }) => {
        const newDoc = createDefaultDoc(std.host.store.workspace);
        insertContent(std, model, REFERENCE_NODE, {
          reference: {
            type: 'LinkedPage',
            pageId: newDoc.id,
          },
        });
      },
    },
    {
      name: 'Linked Doc',
      description: 'Link to another document.',
      icon: LinkedPageIcon(),
      tooltip: {
        figure: LinkDocTooltip,
        caption: 'Link Doc',
      },
      searchAlias: ['dual link'],
      group: '3_Page@1',
      when: ({ std, model }) => {
        const root = model.store.root;
        if (!root) return false;
        const linkedDocWidget = std.view.getWidget(
          'ink-linked-doc-widget',
          root.id
        );
        if (!linkedDocWidget) return false;

        return model.store.schema.flavourSchemaMap.has(
          'ink:embed-linked-doc'
        );
      },
      action: ({ model, std }) => {
        const root = model.store.root;
        if (!root) return;
        const linkedDocWidget = std.view.getWidget(
          'ink-linked-doc-widget',
          root.id
        );
        if (!linkedDocWidget) return;
        // TODO(@L-Sun): make linked-doc-widget as extension
        // @ts-expect-error same as above
        linkedDocWidget.show({ addTriggerKey: true });
      },
    },
  ],
};

export const LinkedDocSlashMenuConfigIdentifier = SlashMenuConfigIdentifier(
  EmbedLinkedDocBlockSchema.model.flavour
);

export const LinkedDocSlashMenuConfigExtension: ExtensionType = {
  setup: di => {
    di.addImpl(LinkedDocSlashMenuConfigIdentifier, linkedDocSlashMenuConfig);
  },
};
