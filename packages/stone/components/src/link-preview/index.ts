import { LinkPreview } from './link';

export * from './link';

export function effects() {
  customElements.define('ink-link-preview', LinkPreview);
}
