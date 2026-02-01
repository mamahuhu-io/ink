import { createIdentifier } from '@ink/stone-global/di';
import type { DeepPartial } from '@ink/stone-global/utils';
import type { ExtensionType } from '@ink/stone-store';
import type { Signal } from '@preact/signals-core';
import { z } from 'zod';

import { NodePropsSchema } from '../utils/index.js';

export const GeneralSettingSchema = z
  .object({
    edgelessScrollZoom: z.boolean().default(false),
    edgelessDisableScheduleUpdate: z.boolean().default(false),
    docCanvasPreferView: z
      .enum(['ink:embed-linked-doc', 'ink:embed-synced-doc'])
      .default('ink:embed-synced-doc'),
  })
  .merge(NodePropsSchema);

export type EditorSetting = z.infer<typeof GeneralSettingSchema>;

export interface EditorSettingService {
  setting$: Signal<DeepPartial<EditorSetting>>;
  set?: (key: keyof EditorSetting, value: EditorSetting[keyof EditorSetting]) => void;
}

export const EditorSettingProvider = createIdentifier<EditorSettingService>(
  'InkEditorSettingProvider',
);

export function EditorSettingExtension(service: EditorSettingService): ExtensionType {
  return {
    setup: (di) => {
      di.override(EditorSettingProvider, () => service);
    },
  };
}
