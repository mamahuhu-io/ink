import { WidgetViewExtension } from '@ink/stone-std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { INK_TOOLBAR_WIDGET } from './toolbar';

export * from './toolbar';

export const toolbarWidget = WidgetViewExtension(
  'ink:page',
  INK_TOOLBAR_WIDGET,
  literal`${unsafeStatic(INK_TOOLBAR_WIDGET)}`,
);
