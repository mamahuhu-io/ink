import type { InkTextAttributes } from '@ink/stone-shared/types';
import { InlineSpecExtension } from '@ink/stone-std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const MermaidEditorUnitSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'mermaid-editor-unit',
    schema: z.object({
      'mermaid-editor-unit': z.undefined(),
    }),
    match: () => true,
    renderer: ({ delta }) => {
      return html`<mermaid-editor-unit .delta=${delta}></mermaid-editor-unit>`;
    },
  });
