import { unsafeCSSVar, unsafeCSSVarV2 } from "@ink/stone-shared/theme";
import { css } from "lit";

export const mermaidBlockStyles = css`
  .mermaid-block-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 16px 24px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    overflow-x: auto;
    user-select: none;
  }

  .mermaid-block-container:hover {
    background: ${unsafeCSSVar("hoverColor")};
  }

  .mermaid-diagram-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }

  .mermaid-diagram {
    max-width: 100%;
    overflow: auto;
    min-width: 680px;
  }

  .mermaid-diagram svg {
    max-width: 100%;
    height: auto;
  }

  .mermaid-diagram-type-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 2px 8px;
    background: ${unsafeCSSVarV2("layer/background/secondary")};
    border: 1px solid ${unsafeCSSVarV2("border/border")};
    border-radius: 4px;
    color: ${unsafeCSSVarV2("text/secondary")};
    font-size: 11px;
    font-weight: 500;
    user-select: none;
    pointer-events: none;
  }

  .mermaid-block-error-placeholder {
    color: ${unsafeCSSVarV2("text/highlight/fg/red")};
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    user-select: none;
    text-align: center;
    padding: 20px;
  }

  .mermaid-block-empty-placeholder {
    color: ${unsafeCSSVarV2("text/secondary")};
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    user-select: none;
  }
`;
