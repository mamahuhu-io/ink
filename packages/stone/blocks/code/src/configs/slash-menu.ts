import { type SlashMenuConfig } from '@ink/stone-widget-slash-menu';

export const codeSlashMenuConfig: SlashMenuConfig = {
  disableWhen: ({ model }) => {
    return model.flavour === 'ink:code';
  },
  items: [],
};
