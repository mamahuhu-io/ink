import { LatexEditorMenu } from './latex-node/latex-editor-menu';
import { LatexEditorUnit } from './latex-node/latex-editor-unit';
import { InkLatexNode } from './latex-node/latex-node';

export function effects() {
  customElements.define('latex-editor-menu', LatexEditorMenu);
  customElements.define('latex-editor-unit', LatexEditorUnit);
  customElements.define('ink-latex-node', InkLatexNode);
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-latex-node': InkLatexNode;
    'latex-editor-unit': LatexEditorUnit;
    'latex-editor-menu': LatexEditorMenu;
  }
}
