import type { InkTextAttributes } from '@ink/stone-shared/types';
import { StdIdentifier } from '@ink/stone-std';
import { InlineSpecExtension } from '@ink/stone-std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const LinkInlineSpecExtension = InlineSpecExtension<InkTextAttributes>(
  'link',
  (provider) => {
    const std = provider.get(StdIdentifier);
    return {
      name: 'link',
      schema: z.object({
        link: z.string().optional().nullable().catch(undefined),
      }),
      match: (delta) => {
        return !!delta.attributes?.link;
      },
      renderer: ({ delta }) => {
        return html`<ink-link .std=${std} .delta=${delta}></ink-link>`;
      },
    };
  },
);
