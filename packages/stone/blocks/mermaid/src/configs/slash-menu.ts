import { getSelectedModelsCommand } from '@ink/stone-shared/commands';
import { type SlashMenuConfig } from '@ink/stone-widget-slash-menu';
import { ImageIcon } from '@ink/stone-icons/lit';

import { insertMermaidBlockCommand } from '../commands.js';

export const mermaidSlashMenuConfig: SlashMenuConfig = {
  items: [
    {
      name: 'Flowchart',
      description: 'Insert a Mermaid flowchart diagram.',
      icon: ImageIcon(),
      group: '3_Diagram@0',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('ink:mermaid'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertMermaidBlockCommand, {
            code: 'flowchart TD\n  A[Start] --> B[End]',
            removeEmptyLine: true,
          })
          .run();

        if (success) ctx.insertedMermaidBlockId.catch(console.error);
      },
    },
    {
      name: 'Sequence Diagram',
      description: 'Insert a Mermaid sequence diagram.',
      icon: ImageIcon(),
      group: '3_Diagram@1',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('ink:mermaid'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertMermaidBlockCommand, {
            code: 'sequenceDiagram\n  Alice->>Bob: Hello Bob!\n  Bob->>Alice: Hello Alice!',
            removeEmptyLine: true,
          })
          .run();

        if (success) ctx.insertedMermaidBlockId.catch(console.error);
      },
    },
    {
      name: 'Gantt Chart',
      description: 'Insert a Mermaid gantt chart.',
      icon: ImageIcon(),
      group: '3_Diagram@2',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('ink:mermaid'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertMermaidBlockCommand, {
            code: 'gantt\n  title Project Schedule\n  section Tasks\n  Task 1: 2024-01-01, 7d\n  Task 2: 2024-01-08, 5d',
            removeEmptyLine: true,
          })
          .run();

        if (success) ctx.insertedMermaidBlockId.catch(console.error);
      },
    },
    {
      name: 'Diagram',
      description: 'Insert a Mermaid diagram (custom).',
      icon: ImageIcon(),
      group: '3_Diagram@3',
      when: ({ model }) =>
        model.store.schema.flavourSchemaMap.has('ink:mermaid'),
      action: ({ std }) => {
        const [success, ctx] = std.command
          .chain()
          .pipe(getSelectedModelsCommand)
          .pipe(insertMermaidBlockCommand, {
            code: '',
            removeEmptyLine: true,
          })
          .run();

        if (success) ctx.insertedMermaidBlockId.catch(console.error);
      },
    },
  ],
};
