import { fontSMStyle, panelBaseStyle } from "@ink/stone-shared/styles";
import { css } from "lit";

const editLinkStyle = css`
  .ink-link-edit-popover {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "text-area ."
      "link-area btn";
    justify-items: center;
    align-items: center;
    width: 320px;
    gap: 8px 12px;
    padding: 8px;
    box-sizing: content-box;
  }

  ${fontSMStyle(".ink-link-edit-popover label")}
  .ink-link-edit-popover label {
    box-sizing: border-box;
    color: var(--ink-icon-color);
    font-weight: 400;
    width: 30px;
  }

  ${fontSMStyle(".ink-link-edit-popover input")}
  .ink-link-edit-popover input {
    color: inherit;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--ink-text-primary-color);
  }
  .ink-link-edit-popover input::placeholder {
    color: var(--ink-placeholder-color);
  }
  input:focus {
    outline: none;
  }
  .ink-link-edit-popover input:focus ~ label,
  .ink-link-edit-popover input:active ~ label {
    color: var(--ink-primary-color);
  }

  .ink-edit-area {
    width: 280px;
    padding: 4px 10px;
    display: grid;
    gap: 8px;
    grid-template-columns: 26px auto;
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: "label input";
    user-select: none;
    box-sizing: border-box;

    border: 1px solid var(--ink-border-color);
    box-sizing: border-box;

    outline: none;
    border-radius: 4px;
    background: transparent;
  }
  .ink-edit-area:focus-within {
    border-color: var(--ink-blue-700);
    box-shadow: var(--ink-active-shadow);
  }

  .ink-edit-area.text {
    grid-area: text-area;
  }

  .ink-edit-area.link {
    grid-area: link-area;
  }

  .ink-edit-label {
    grid-area: label;
  }

  .ink-edit-input {
    grid-area: input;
  }

  .ink-confirm-button {
    grid-area: btn;
    user-select: none;
  }
`;

export const linkPopupStyle = css`
  :host {
    box-sizing: border-box;
  }

  .mock-selection {
    position: absolute;
    background-color: rgba(35, 131, 226, 0.28);
  }

  ${panelBaseStyle(".popover-container")}
  .popover-container {
    z-index: var(--ink-z-index-popover);
    animation: ink-popover-fade-in 0.2s ease;
    position: absolute;
  }

  @keyframes ink-popover-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .overlay-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: var(--ink-z-index-popover);
  }

  .mock-selection-container {
    pointer-events: none;
  }

  .ink-link-popover.create {
    display: flex;
    gap: 12px;
    padding: 8px;

    color: var(--ink-text-primary-color);
  }

  .ink-link-popover-input {
    min-width: 280px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 10px;
    background: var(--ink-white-10);
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--ink-border-color);
    color: var(--ink-text-primary-color);
  }
  ${fontSMStyle(".ink-link-popover-input")}
  .ink-link-popover-input::placeholder {
    color: var(--ink-placeholder-color);
  }
  .ink-link-popover-input:focus {
    border-color: var(--ink-blue-700);
    box-shadow: var(--ink-active-shadow);
  }

  ${editLinkStyle}
`;
