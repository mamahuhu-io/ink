import type { UniComponent } from '@ink/stone-shared/types';
import { createIdentifier } from '@ink/stone-global/di';
export enum IconType {
  Emoji = 'emoji',
  InkIcon = 'ink-icon',
  Blob = 'blob',
}

export type IconData =
  | {
      type: IconType.Emoji;
      unicode: string;
    }
  | {
      type: IconType.InkIcon;
      name: string;
      color: string;
    }
  | {
      type: IconType.Blob;
      blob: Blob;
    };

export interface IconPickerService {
  iconPickerComponent: UniComponent<{ onSelect?: (data?: IconData) => void }>;
}

export const IconPickerServiceIdentifier =
  createIdentifier<IconPickerService>('IconPickerService');

// Export implementation
export {
  IconPickerServiceExtension,
  defaultIconPickerService,
  createEmojiIconPickerComponent,
  setIconPickerI18nGetter,
  type EmojiIconPickerProps,
} from './impl.js';
