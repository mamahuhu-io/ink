// [REMOVED] Collaboration features - not needed for local markdown editor
// import { CommentInlineSpecExtension } from '@ink/stone-inline-comment';
import { EmojiInlineSpecExtension } from '@ink/stone-inline-emoji';
import { FootNoteInlineSpecExtension } from '@ink/stone-inline-footnote';
import { LatexInlineSpecExtension } from '@ink/stone-inline-latex';
import { LinkInlineSpecExtension } from '@ink/stone-inline-link';
// [REMOVED] Collaboration features - not needed for local markdown editor
// import { MentionInlineSpecExtension } from '@ink/stone-inline-mention';
import { ReferenceInlineSpecExtension } from '@ink/stone-inline-reference';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import { InlineManagerExtension } from '@ink/stone-std/inline';

import {
  BackgroundInlineSpecExtension,
  BoldInlineSpecExtension,
  CodeInlineSpecExtension,
  ColorInlineSpecExtension,
  ItalicInlineSpecExtension,
  StrikeInlineSpecExtension,
  UnderlineInlineSpecExtension,
} from './inline-spec';

export const DefaultInlineManagerExtension = InlineManagerExtension<InkTextAttributes>({
  id: 'DefaultInlineManager',
  specs: [
    BoldInlineSpecExtension.identifier,
    ItalicInlineSpecExtension.identifier,
    UnderlineInlineSpecExtension.identifier,
    StrikeInlineSpecExtension.identifier,
    CodeInlineSpecExtension.identifier,
    BackgroundInlineSpecExtension.identifier,
    ColorInlineSpecExtension.identifier,
    LatexInlineSpecExtension.identifier,
    ReferenceInlineSpecExtension.identifier,
    LinkInlineSpecExtension.identifier,
    FootNoteInlineSpecExtension.identifier,
    EmojiInlineSpecExtension.identifier,
    // [REMOVED] Collaboration features
    // MentionInlineSpecExtension.identifier,
    // CommentInlineSpecExtension.identifier,
  ],
});
