import type * as RichTextEffects from '@ink/stone-rich-text/effects';
import type RemarkMath from 'remark-math';

export * from './adapters';
export * from './command';
export * from './inline-spec';
export * from './markdown';
export { setLatexI18nGetter } from './latex-node/latex-node.js';

declare type _GLOBAL_ = typeof RichTextEffects | typeof RemarkMath;
