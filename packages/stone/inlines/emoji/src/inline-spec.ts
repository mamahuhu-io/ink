import type { InkTextAttributes } from '@ink/stone-shared/types';
import { StdIdentifier } from '@ink/stone-std';
import { InlineSpecExtension } from '@ink/stone-std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const EmojiInlineSpecExtension = InlineSpecExtension<InkTextAttributes>(
  'emoji',
  (provider) => {
    const std = provider.get(StdIdentifier);
    return {
      name: 'emoji',
      schema: z.object({
        emoji: z.string().optional().nullable().catch(undefined),
      }),
      match: (delta) => {
        return typeof delta.attributes?.emoji === 'string';
      },
      renderer: ({ delta, selected }) => {
        return html`<ink-emoji .delta=${delta} .selected=${selected} .std=${std}></ink-emoji>`;
      },
      embed: true,
    };
  },
);
