import { fontXSStyle, panelBaseStyle } from '@ink/stone-shared/styles';
import { css } from 'lit';

export const renameStyles = css`
  ${panelBaseStyle('.ink-attachment-rename-container')}
  .ink-attachment-rename-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 320px;
    gap: 12px;
    padding: 12px;
    z-index: var(--ink-z-index-popover);
  }

  .ink-attachment-rename-input-wrapper {
    display: flex;
    min-width: 280px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 10px;
    background: var(--ink-white-10);
    border-radius: 4px;
    border: 1px solid var(--ink-border-color);
  }

  .ink-attachment-rename-input-wrapper:focus-within {
    border-color: var(--ink-blue-700);
    box-shadow: var(--ink-active-shadow);
  }

  .ink-attachment-rename-input-wrapper input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--ink-text-primary-color);
  }
  ${fontXSStyle('.ink-attachment-rename-input-wrapper input')}

  .ink-attachment-rename-input-wrapper input::placeholder {
    color: var(--ink-placeholder-color);
  }

  .ink-attachment-rename-extension {
    font-size: var(--ink-font-xs);
    color: var(--ink-text-secondary-color);
  }

  .ink-attachment-rename-overlay-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--ink-z-index-popover);
  }
`;

export const styles = css`
  :host {
    z-index: 1;
  }
`;
