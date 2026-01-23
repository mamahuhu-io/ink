import type { ReferenceInfo } from '@ink/stone-model';
import type { OpenDocMode } from '@ink/stone-shared/services';
import type { EditorHost } from '@ink/stone-std';
import type { Subject } from 'rxjs';

export type DocLinkClickedEvent = ReferenceInfo & {
  // default is active view
  openMode?: OpenDocMode;
  event?: MouseEvent;
  host: EditorHost;
};

export type RefNodeSlots = {
  docLinkClicked: Subject<DocLinkClickedEvent>;
};
