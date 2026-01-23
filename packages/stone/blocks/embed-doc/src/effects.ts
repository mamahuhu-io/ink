import { EmbedLinkedDocBlockComponent } from './embed-linked-doc-block';
import { EmbedEdgelessLinkedDocBlockComponent } from './embed-linked-doc-block/embed-edgeless-linked-doc-block';
import { EmbedSyncedDocBlockComponent } from './embed-synced-doc-block';
import { EmbedSyncedDocCard } from './embed-synced-doc-block/components/embed-synced-doc-card';
import { EmbedEdgelessSyncedDocBlockComponent } from './embed-synced-doc-block/embed-edgeless-synced-doc-block';

export function effects() {
  customElements.define('ink-embed-synced-doc-card', EmbedSyncedDocCard);

  customElements.define(
    'ink-embed-edgeless-linked-doc-block',
    EmbedEdgelessLinkedDocBlockComponent
  );
  customElements.define(
    'ink-embed-linked-doc-block',
    EmbedLinkedDocBlockComponent
  );

  customElements.define(
    'ink-embed-edgeless-synced-doc-block',
    EmbedEdgelessSyncedDocBlockComponent
  );
  customElements.define(
    'ink-embed-synced-doc-block',
    EmbedSyncedDocBlockComponent
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-embed-synced-doc-card': EmbedSyncedDocCard;
    'ink-embed-synced-doc-block': EmbedSyncedDocBlockComponent;
    'ink-embed-edgeless-synced-doc-block': EmbedEdgelessSyncedDocBlockComponent;
    'ink-embed-linked-doc-block': EmbedLinkedDocBlockComponent;
    'ink-embed-edgeless-linked-doc-block': EmbedEdgelessLinkedDocBlockComponent;
  }
}
