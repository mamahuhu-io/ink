import { WidgetViewExtension } from '@ink/stone-std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { INK_SCROLL_ANCHORING_WIDGET } from './scroll-anchoring.js';

export * from './scroll-anchoring.js';

export const scrollAnchoringWidget = WidgetViewExtension(
  'ink:page',
  INK_SCROLL_ANCHORING_WIDGET,
  literal`${unsafeStatic(INK_SCROLL_ANCHORING_WIDGET)}`,
);
