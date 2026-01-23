import { FootNoteSchema } from '@ink/stone-model';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import { StdIdentifier } from '@ink/stone-std';
import { InlineSpecExtension } from '@ink/stone-std/inline';
import { html } from 'lit';
import z from 'zod';

import { FootNoteNodeConfigIdentifier } from './footnote-node/footnote-config';

export const FootNoteInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>('footnote', provider => {
    const std = provider.get(StdIdentifier);
    const config =
      provider.getOptional(FootNoteNodeConfigIdentifier) ?? undefined;
    return {
      name: 'footnote',
      schema: z.object({
        footnote: FootNoteSchema.optional().nullable().catch(undefined),
      }),
      match: delta => {
        return !!delta.attributes?.footnote;
      },
      renderer: ({ delta }) => {
        return html`<ink-footnote-node
          .delta=${delta}
          .std=${std}
          .config=${config}
        ></ink-footnote-node>`;
      },
      embed: true,
    };
  });
