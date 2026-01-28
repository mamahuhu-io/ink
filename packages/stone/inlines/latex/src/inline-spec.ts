import type { InkTextAttributes } from '@ink/stone-shared/types';
import { StdIdentifier } from '@ink/stone-std';
import { InlineSpecExtension } from '@ink/stone-std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const LatexInlineSpecExtension = InlineSpecExtension<InkTextAttributes>(
  'latex',
  (provider) => {
    const std = provider.get(StdIdentifier);
    return {
      name: 'latex',
      schema: z.object({
        latex: z.string().optional().nullable().catch(undefined),
      }),
      match: (delta) => typeof delta.attributes?.latex === 'string',
      renderer: ({ delta, selected, editor, startOffset, endOffset }) => {
        return html`<ink-latex-node
          .std=${std}
          .delta=${delta}
          .selected=${selected}
          .editor=${editor}
          .startOffset=${startOffset}
          .endOffset=${endOffset}
        ></ink-latex-node>`;
      },
      embed: true,
    };
  },
);

export const LatexEditorUnitSpecExtension = InlineSpecExtension<InkTextAttributes>({
  name: 'latex-editor-unit',
  schema: z.object({
    'latex-editor-unit': z.undefined(),
  }),
  match: () => true,
  renderer: ({ delta }) => {
    return html`<latex-editor-unit .delta=${delta}></latex-editor-unit>`;
  },
});
