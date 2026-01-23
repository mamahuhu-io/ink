import { createIdentifier } from '@ink/stone-global/di';
import type { ExtensionType } from '@ink/stone-store';

import type { InkUserInfo } from './types';

export interface WriterInfoService {
  getWriterInfo(): InkUserInfo | null;
}

export const WriterInfoProvider = createIdentifier<WriterInfoService>(
  'ink-writer-info-service'
);

export function WriterInfoServiceExtension(
  service: WriterInfoService
): ExtensionType {
  return {
    setup(di) {
      di.addImpl(WriterInfoProvider, () => service);
    },
  };
}
