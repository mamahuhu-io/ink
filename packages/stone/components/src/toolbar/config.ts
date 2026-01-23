import { ConfigExtensionFactory } from '@ink/stone-std';

import type { ToolbarMoreMenuConfig } from './types';

export const ToolbarMoreMenuConfigExtension = ConfigExtensionFactory<
  Partial<ToolbarMoreMenuConfig>
>('ink-toolbar-more-menu');
