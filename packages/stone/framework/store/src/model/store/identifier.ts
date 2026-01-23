import { createIdentifier } from '@ink/stone-global/di';

import type { Store } from './store';

export const StoreIdentifier = createIdentifier<Store>('Store');
