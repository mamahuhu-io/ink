import type { ReferenceInfo } from '@ink/stone-model';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import type { BlockStdScope } from '@ink/stone-std';
import type { InlineEditor, InlineRange } from '@ink/stone-std/inline';

import { ReferencePopup } from './reference-popup';

export function toggleReferencePopup(
  std: BlockStdScope,
  docTitle: string,
  referenceInfo: ReferenceInfo,
  inlineEditor: InlineEditor<InkTextAttributes>,
  inlineRange: InlineRange,
  abortController: AbortController,
): ReferencePopup {
  const popup = new ReferencePopup();
  popup.std = std;
  popup.docTitle = docTitle;
  popup.referenceInfo = referenceInfo;
  popup.inlineEditor = inlineEditor;
  popup.inlineRange = inlineRange;
  popup.abortController = abortController;

  document.body.append(popup);

  return popup;
}
