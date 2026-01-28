import { createIdentifier } from '@ink/stone-global/di';
import type { ReferenceInfo } from '@ink/stone-model';
import type { OpenDocMode } from '@ink/stone-shared/services';
import type { EditorHost } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { Subject } from 'rxjs';

export type DocLinkClickedEvent = ReferenceInfo & {
  // default is active view
  openMode?: OpenDocMode;
  event?: MouseEvent;
  host: EditorHost;
};

export type RefNodeSlots = {
  docLinkClicked: Subject<DocLinkClickedEvent>;
};

export const RefNodeSlotsProvider = createIdentifier<RefNodeSlots>('InkRefNodeSlots');

const slots: RefNodeSlots = {
  docLinkClicked: new Subject(),
};

export const RefNodeSlotsExtension: ExtensionType = {
  setup: (di) => {
    di.addImpl(RefNodeSlotsProvider, () => slots);
  },
};
