import { WidgetViewExtension } from '@ink/stone-std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { INK_DRAG_HANDLE_WIDGET } from './consts';

export * from './consts';
export * from './drag-handle';
export * from './utils';
export type { DragBlockPayload } from './watchers/drag-event-watcher';

export const dragHandleWidget = WidgetViewExtension(
  'ink:page',
  INK_DRAG_HANDLE_WIDGET,
  literal`${unsafeStatic(INK_DRAG_HANDLE_WIDGET)}`,
);
