import { ToolbarModuleExtension } from '@ink/stone-shared/services';
import { BlockFlavourIdentifier } from '@ink/stone-std';

import { builtinInlineLinkToolbarConfig } from './link-node/configs/toolbar.js';

export const linkToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('ink:link'),
  config: builtinInlineLinkToolbarConfig,
});
