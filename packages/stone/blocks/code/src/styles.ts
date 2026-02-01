import { scrollbarStyle } from '@ink/stone-shared/styles';
import { unsafeCSSVarV2 } from '@ink/stone-shared/theme';
import { css } from 'lit';

export const codeBlockStyles = css`
  ink-code {
    display: block;
  }

  .ink-code-block-container {
    font-size: var(--ink-font-xs);
    line-height: var(--ink-line-height);
    position: relative;
    padding: 32px 20px;
    background: var(--ink-background-code-block);
    border-radius: 10px;
    box-sizing: border-box;
  }

  .ink-code-block-container.mobile {
    padding: 12px;
  }

  .ink-code-block-container.highlight-comment {
    outline: 2px solid ${unsafeCSSVarV2('block/comment/highlightUnderline')};
  }

  ${scrollbarStyle('.ink-code-block-container rich-text')}

  .ink-code-block-container .inline-editor {
    font-family: var(--ink-font-code-family);
    font-variant-ligatures: none;
  }

  .ink-code-block-container v-line {
    position: relative;
    display: inline-grid !important;
    grid-template-columns: auto minmax(0, 1fr);
  }

  .ink-code-block-container.disable-line-numbers v-line {
    grid-template-columns: unset;
  }

  .ink-code-block-container div:has(> v-line) {
    display: grid;
  }

  .ink-code-block-container .line-number {
    position: sticky;
    text-align: left;
    padding-right: 12px;
    width: 32px;
    word-break: break-word;
    white-space: nowrap;
    left: -0.5px;
    z-index: 1;
    background: var(--ink-background-code-block);
    font-size: var(--ink-font-xs);
    line-height: var(--ink-line-height);
    color: var(--ink-text-secondary);
    box-sizing: border-box;
    user-select: none;
  }

  .ink-code-block-container.disable-line-numbers .line-number {
    display: none;
  }

  ink-code .ink-code-block-preview {
    padding: 12px;
  }
`;
