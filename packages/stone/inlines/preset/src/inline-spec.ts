import type { InkTextAttributes } from '@ink/stone-shared/types';
import {
  type InlineRootElement,
  InlineSpecExtension,
} from '@ink/stone-std/inline';
import type { ExtensionType } from '@ink/stone-store';
import { html } from 'lit';
import { z } from 'zod';

export type InkInlineRootElement = InlineRootElement<InkTextAttributes>;

export const BoldInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'bold',
    schema: z.object({
      bold: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.bold;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const ItalicInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'italic',
    schema: z.object({
      italic: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.italic;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const UnderlineInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'underline',
    schema: z.object({
      underline: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.underline;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const StrikeInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'strike',
    schema: z.object({
      strike: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.strike;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const CodeInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'inline-code',
    schema: z.object({
      code: z.literal(true).optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.code;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const BackgroundInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'background',
    schema: z.object({
      background: z.string().optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.background;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const ColorInlineSpecExtension =
  InlineSpecExtension<InkTextAttributes>({
    name: 'color',
    schema: z.object({
      color: z.string().optional().nullable().catch(undefined),
    }),
    match: delta => {
      return !!delta.attributes?.color;
    },
    renderer: ({ delta }) => {
      return html`<ink-text .delta=${delta}></ink-text>`;
    },
  });

export const InlineSpecExtensions: ExtensionType[] = [
  BoldInlineSpecExtension,
  ItalicInlineSpecExtension,
  UnderlineInlineSpecExtension,
  StrikeInlineSpecExtension,
  CodeInlineSpecExtension,
  BackgroundInlineSpecExtension,
  ColorInlineSpecExtension,
];
