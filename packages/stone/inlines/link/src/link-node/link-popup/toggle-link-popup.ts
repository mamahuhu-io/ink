import type { InkInlineEditor } from '@ink/stone-shared/types';
import type { BlockStdScope } from '@ink/stone-std';
import type { InlineRange } from '@ink/stone-std/inline';

import { LinkPopup } from './link-popup';

export function toggleLinkPopup(
  std: BlockStdScope,
  type: LinkPopup['type'],
  inlineEditor: InkInlineEditor,
  targetInlineRange: InlineRange,
  abortController: AbortController
): LinkPopup {
  const popup = new LinkPopup();
  popup.std = std;
  popup.type = type;
  popup.inlineEditor = inlineEditor;
  popup.targetInlineRange = targetInlineRange;
  popup.abortController = abortController;

  const root =
    inlineEditor.rootElement?.closest('editor-host')?.parentElement ??
    document.body;
  root.append(popup);

  return popup;
}
