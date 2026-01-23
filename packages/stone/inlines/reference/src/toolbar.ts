import { ToolbarModuleExtension } from '@ink/stone-shared/services';
import { BlockFlavourIdentifier } from '@ink/stone-std';

import { builtinInlineReferenceToolbarConfig } from './reference-node/configs/toolbar';

export const referenceNodeToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('ink:reference'),
  config: builtinInlineReferenceToolbarConfig,
});
