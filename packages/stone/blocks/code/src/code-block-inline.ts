// [REMOVED] Collaboration features - not needed for local markdown editor
// import { CommentInlineSpecExtension } from '@ink/stone-inline-comment';
import { LatexInlineSpecExtension } from '@ink/stone-inline-latex';
import { LinkInlineSpecExtension } from '@ink/stone-inline-link';
import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from '@ink/stone-inline-preset';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import {
  InlineManagerExtension,
  InlineSpecExtension,
} from '@ink/stone-std/inline';
import { html } from 'lit';
import { z } from 'zod';

export const CodeBlockUnitSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'code-block-unit',
    schema: z.object({
      'code-block-uint': z.undefined(),
    }),
    match: () => true,
    renderer: ({ delta }) => {
      return html`<ink-code-unit .delta=${delta}></ink-code-unit>`;
    },
  });

export const CodeBlockInlineManagerExtension =
  InlineManagerExtension<InkTextAttributes>({
    id: 'CodeBlockInlineManager',
    enableMarkdown: false,
    specs: [
      BoldInlineSpecExtension.identifier,
      ItalicInlineSpecExtension.identifier,
      UnderlineInlineSpecExtension.identifier,
      StrikeInlineSpecExtension.identifier,
      CodeInlineSpecExtension.identifier,
      BackgroundInlineSpecExtension.identifier,
      ColorInlineSpecExtension.identifier,
      LatexInlineSpecExtension.identifier,
      LinkInlineSpecExtension.identifier,
      CodeBlockUnitSpecExtension.identifier,
      // [REMOVED] Collaboration features
      // CommentInlineSpecExtension.identifier,
    ],
  });
