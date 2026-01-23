import { createIdentifier } from '@ink/stone-global/di';
import type { ExtensionType } from '@ink/stone-store';
import type { ReadonlySignal } from '@preact/signals-core';

import type { InkUserInfo } from './types';

export interface UserListService {
  users$: ReadonlySignal<InkUserInfo[]>;
  isLoading$: ReadonlySignal<boolean>;
  searchText$: ReadonlySignal<string>;
  hasMore$: ReadonlySignal<boolean>;
  loadMore(): void;
  search(keyword: string): void;
}

export const UserListProvider = createIdentifier<UserListService>(
  'ink-user-list-service'
);

export function UserListServiceExtension(
  service: UserListService
): ExtensionType {
  return {
    setup(di) {
      di.addImpl(UserListProvider, () => service);
    },
  };
}
