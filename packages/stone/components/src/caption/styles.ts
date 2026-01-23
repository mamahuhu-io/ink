import { css } from 'lit';

export const styles = css`
  .ink-block-component.border.light .selected-style {
    border-radius: 8px;
    box-shadow: 0px 0px 0px 1px var(--ink-brand-color);
  }
  .ink-block-component.border.dark .selected-style {
    border-radius: 8px;
    box-shadow: 0px 0px 0px 1px var(--ink-brand-color);
  }
  @media print {
    .ink-block-component.border.light .selected-style,
    .ink-block-component.border.dark .selected-style {
      box-shadow: none;
    }
  }
`;
