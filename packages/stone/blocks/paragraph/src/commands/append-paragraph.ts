import { focusTextModel } from '@ink/stone-rich-text';
import { getLastNoteBlock } from '@ink/stone-shared/utils';
import type { Command } from '@ink/stone-std';
import { Text } from '@ink/stone-store';

/**
 * Append a paragraph block at the end of the whole page.
 */
export const appendParagraphCommand: Command<{ text?: string }> = (ctx, next) => {
  const { std, text = '' } = ctx;
  const { store } = std;
  if (!store.root) return;

  const note = getLastNoteBlock(store);
  let noteId = note?.id;
  if (!noteId) {
    noteId = store.addBlock('ink:note', {}, store.root.id);
  }
  const id = store.addBlock('ink:paragraph', { text: new Text(text) }, noteId);

  focusTextModel(std, id, text.length);
  next();
};
