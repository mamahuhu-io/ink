import type { BlockSelection, Command, SurfaceSelection, TextSelection } from '@ink/stone-std';

import type { ImageSelection } from '../../selection/image';

export type GetSelectionCommand = Command<
  {},
  {
    currentTextSelection?: TextSelection;
    currentBlockSelections?: BlockSelection[];
    currentImageSelections?: ImageSelection[];
    currentSurfaceSelection?: SurfaceSelection;
  }
>;
