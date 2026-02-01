import { createIdentifier } from '@ink/stone-global/di';
import type { ExtensionType } from '@ink/stone-store';
import type { Signal } from '@preact/signals-core';

import type { InkUserInfo } from './types';

export interface UserService {
  currentUserInfo$: Signal<InkUserInfo | null>;
  userInfo$(id: string): Signal<InkUserInfo | null>;
  isLoading$(id: string): Signal<boolean>;
  error$(id: string): Signal<string | null>; // user friendly error string
  revalidateUserInfo(id: string): void;
}

export const UserProvider = createIdentifier<UserService>('ink-user-service');

export function UserServiceExtension(service: UserService): ExtensionType {
  return {
    setup(di) {
      di.addImpl(UserProvider, () => service);
    },
  };
}
