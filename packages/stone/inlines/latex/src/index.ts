import type * as RichTextEffects from '@ink/stone-rich-text/effects';
import type RemarkMath from 'remark-math';

export * from './adapters';
export * from './command';
export * from './inline-spec';
export { setLatexI18nGetter } from './latex-node/latex-node.js';
export * from './markdown';

declare type _GLOBAL_ = typeof RichTextEffects | typeof RemarkMath;
