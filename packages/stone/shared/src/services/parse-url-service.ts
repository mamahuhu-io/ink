import { createIdentifier } from '@ink/stone-global/di';
import type { ReferenceParams } from '@ink/stone-model';
import type { ExtensionType } from '@ink/stone-store';

export interface ParseDocUrlService {
  parseDocUrl: (url: string) => ({ docId: string } & ReferenceParams) | undefined;
}

export const ParseDocUrlProvider = createIdentifier<ParseDocUrlService>('ParseDocUrlService');

export function ParseDocUrlExtension(parseDocUrlService: ParseDocUrlService): ExtensionType {
  return {
    setup: (di) => {
      di.addImpl(ParseDocUrlProvider, parseDocUrlService);
    },
  };
}
