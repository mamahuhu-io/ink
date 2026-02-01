import { createIdentifier } from '@ink/stone-global/di';
import type { ExtensionType } from '@ink/stone-store';

export interface SidebarService {
  open: (tabId?: string) => void;
  close: () => void;
  getTabIds: () => string[];
}

export const SidebarExtensionIdentifier = createIdentifier<SidebarService>('InkSidebarExtension');

export const SidebarExtension = (service: SidebarService): ExtensionType => ({
  setup: (di) => {
    di.addImpl(SidebarExtensionIdentifier, () => service);
  },
});
