import type { EditorHost } from '@ink/stone-std';

import type { DocTitle } from './doc-title';

export function getDocTitleByEditorHost(editorHost: EditorHost): DocTitle | null {
  const docViewport = editorHost.closest('.ink-page-viewport');
  if (!docViewport) return null;
  return docViewport.querySelector('doc-title');
}
