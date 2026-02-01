import type { FootNote, ReferenceInfo } from '@ink/stone-model';
import type { InlineEditor } from '@ink/stone-std/inline';
import type { BlockModel } from '@ink/stone-store';
export * from './uni-component';

export type NoteChildrenFlavour =
  | 'ink:paragraph'
  | 'ink:list'
  | 'ink:code'
  | 'ink:divider'
  | 'ink:database'
  | 'ink:data-view'
  | 'ink:image'
  | 'ink:bookmark'
  | 'ink:attachment'
  | 'ink:surface-ref';

export interface Viewport {
  left: number;
  top: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

export type ExtendedModel = BlockModel & Record<string, any>;

export type IndentContext = {
  blockId: string;
  inlineIndex: number;
  flavour: string;
  type: 'indent' | 'dedent';
};

export type InkTextStyleAttributes = {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  color?: string | null;
  background?: string | null;
};

export type InkTextAttributes = InkTextStyleAttributes & {
  link?: string | null;
  reference?:
    | ({
        type: 'Subpage' | 'LinkedPage';
      } & ReferenceInfo)
    | null;
  latex?: string | null;
  footnote?: FootNote | null;
  mention?: {
    member: string;
    notification?: string;
  } | null;
  emoji?: string | null;
  [key: `comment-${string}`]: boolean | null;
};

export type InkInlineEditor = InlineEditor<InkTextAttributes>;

export type SelectedRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderWidth: number;
  borderStyle: string;
  rotate: number;
};
