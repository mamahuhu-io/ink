import { createIdentifier } from '@ink/stone-global/di';
import type { UniComponent } from '@ink/stone-shared/types';
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

export const IconPickerServiceIdentifier = createIdentifier<IconPickerService>('IconPickerService');

// Export implementation
export {
  createEmojiIconPickerComponent,
  defaultIconPickerService,
  type EmojiIconPickerProps,
  IconPickerServiceExtension,
  setIconPickerI18nGetter,
} from './impl.js';
