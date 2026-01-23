import { MermaidBlockComponent } from './mermaid-block.js';
import { MermaidEditorMenu } from './mermaid-editor-menu.js';
import { MermaidEditorUnit } from './mermaid-editor-unit.js';

export function effects() {
  customElements.define('ink-mermaid', MermaidBlockComponent);
  customElements.define('mermaid-editor-menu', MermaidEditorMenu);
  customElements.define('mermaid-editor-unit', MermaidEditorUnit);
}
