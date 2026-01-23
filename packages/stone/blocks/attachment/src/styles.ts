import { unsafeCSSVarV2 } from '@ink/stone-shared/theme';
import { css } from 'lit';

export const styles = css`
  .ink-attachment-container {
    border-radius: 8px;
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    border: 1px solid ${unsafeCSSVarV2('layer/background/tertiary')};
    background: ${unsafeCSSVarV2('layer/background/primary')};

    &.focused {
      border-color: ${unsafeCSSVarV2('layer/insideBorder/primaryBorder')};
    }
  }

  .ink-attachment-card {
    display: flex;
    gap: 12px;
    padding: 12px;
  }

  .ink-attachment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;
    min-width: 0;
  }

  .truncate {
    align-self: stretch;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .ink-attachment-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    align-self: stretch;
  }

  .ink-attachment-content-title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-text-primary-color);
    font-size: 16px;
  }

  .ink-attachment-content-title-text {
    color: var(--ink-text-primary-color);
    font-family: var(--ink-font-family);
    font-size: var(--ink-font-sm);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .ink-attachment-content-description {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 8px;
  }

  .ink-attachment-content-info {
    color: var(--ink-text-secondary-color);
    font-family: var(--ink-font-family);
    font-size: var(--ink-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .ink-attachment-content-button {
    display: flex;
    height: 20px;
    align-items: center;
    align-self: stretch;
    gap: 4px;
    white-space: nowrap;
    padding: 0 4px;
    color: ${unsafeCSSVarV2('button/primary')};
    font-family: var(--ink-font-family);
    font-size: var(--ink-font-xs);
    font-style: normal;
    font-weight: 500;
    text-transform: capitalize;
    line-height: 20px;

    svg {
      font-size: 16px;
    }
  }

  .ink-attachment-banner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ink-attachment-card.loading {
    .ink-attachment-content-title-text {
      color: ${unsafeCSSVarV2('text/placeholder')};
    }
  }

  .ink-attachment-card.error {
    .ink-attachment-content-title-icon {
      color: ${unsafeCSSVarV2('status/error')};
    }
  }

  .ink-attachment-card.loading,
  .ink-attachment-card.error {
    background: ${unsafeCSSVarV2('layer/background/secondary')};
  }
`;
