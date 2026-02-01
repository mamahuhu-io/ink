import { createIdentifier } from '@ink/stone-global/di';
import type { ExtensionType } from '@ink/stone-store';

import type { PeekViewService } from './type.js';

export const PeekViewProvider = createIdentifier<PeekViewService>('InkPeekViewProvider');

export function PeekViewExtension(service: PeekViewService): ExtensionType {
  return {
    setup: (di) => {
      di.override(PeekViewProvider, () => service);
    },
  };
}
