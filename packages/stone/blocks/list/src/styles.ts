import { css } from 'lit';

export const listPrefix = css`
  .ink-list-block__prefix {
    display: flex;
    color: var(--ink-blue-700);
    font-size: var(--ink-font-sm);
    user-select: none;
    position: relative;
  }

  .ink-list-block__numbered {
    min-width: 22px;
    height: 24px;
    margin-left: 2px;
  }

  .ink-list-block__todo-prefix {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: var(--ink-icon-color);
  }

  .ink-list-block__todo-prefix.readonly {
    cursor: default;
  }

  .ink-list-block__todo-prefix > svg {
    width: 20px;
    height: 20px;
  }
`;

export const listBlockStyles = css`
  ink-list {
    display: block;
    font-size: var(--ink-font-base);
  }

  ink-list code {
    font-size: calc(var(--ink-font-base) - 3px);
    padding: 0px 4px 2px;
  }

  .ink-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
  }
  .ink-list-block-container .ink-list-block-container {
    margin-top: 0;
  }
  .ink-list-rich-text-wrapper {
    position: relative;
    display: flex;
  }
  .ink-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  .ink-list--checked {
    color: var(--ink-text-secondary-color);
  }

  ${listPrefix}
`;
