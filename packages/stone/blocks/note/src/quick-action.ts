// [REMOVED] Embed modules - not needed for local markdown editor
// import {
//   convertSelectedBlocksToLinkedDoc,
//   getTitleFromSelectedModels,
//   notifyDocCreated,
//   promptDocTitle,
// } from '@ink/stone-block-embed';
// [REMOVED] These imports no longer needed since quick action is disabled
// import {
//   draftSelectedModelsCommand,
//   getSelectedModelsCommand,
// } from '@ink/stone-shared/commands';
import type { BlockStdScope } from '@ink/stone-std';
// import { toDraftModel } from '@ink/stone-store';

export interface QuickActionConfig {
  id: string;
  hotkey?: string;
  showWhen: (std: BlockStdScope) => boolean;
  action: (std: BlockStdScope) => void;
}

// [REMOVED] Quick action for converting to linked doc - depends on embed module
export const quickActionConfig: QuickActionConfig[] = [];
