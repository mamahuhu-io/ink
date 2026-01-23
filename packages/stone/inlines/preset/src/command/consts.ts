// corresponding to `formatText` command
import { TableModelFlavour } from '@ink/stone-model';

export const FORMAT_TEXT_SUPPORT_FLAVOURS = [
  'ink:paragraph',
  'ink:list',
  'ink:code',
];
// corresponding to `formatBlock` command
export const FORMAT_BLOCK_SUPPORT_FLAVOURS = [
  'ink:paragraph',
  'ink:list',
  'ink:code',
];
// corresponding to `formatNative` command
export const FORMAT_NATIVE_SUPPORT_FLAVOURS = [
  'ink:database',
  TableModelFlavour,
];
