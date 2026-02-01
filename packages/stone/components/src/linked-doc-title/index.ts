import { DocTitle } from './doc-title';

export * from './doc-title';

export function effects() {
  customElements.define('ink-linked-doc-title', DocTitle);
}
