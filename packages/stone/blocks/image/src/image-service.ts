// [REMOVED] Edgeless blocks - not needed for Page mode
// import { SurfaceBlockModel } from '@ink/stone-block-surface';
import { FileDropConfigExtension } from '@ink/stone-components/drop-indicator';
import { ImageBlockSchema } from '@ink/stone-model';

// [REMOVED] Edgeless blocks - these imports no longer needed
// import { TelemetryProvider } from '@ink/stone-shared/services';
// import { isInsideEdgelessEditor, matchModels } from '@ink/stone-shared/utils';
// import { GfxControllerIdentifier } from '@ink/stone-std/gfx';
// import { addImages } from './utils.js';
import { addSiblingImageBlocks } from './utils.js';

export const ImageDropOption = FileDropConfigExtension({
  flavour: ImageBlockSchema.model.flavour,
  onDrop: ({ files, targetModel, placement, std }) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (!imageFiles.length) return false;

    // [REMOVED] Edgeless blocks - simplified check for Page mode
    // if (targetModel && !matchModels(targetModel, [SurfaceBlockModel])) {
    if (targetModel) {
      addSiblingImageBlocks(std, imageFiles, targetModel, placement).catch(console.error);
      return true;
    }

    // [REMOVED] Edgeless blocks - not needed for Page mode
    // if (isInsideEdgelessEditor(std.host)) {
    //   const gfx = std.get(GfxControllerIdentifier);
    //   point = gfx.viewport.toViewCoordFromClientCoord(point);
    //   addImages(std, files, { point, maxWidth: MAX_IMAGE_WIDTH })
    //     .then(() => {
    //       std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
    //         control: 'canvas:drop',
    //         page: 'whiteboard editor',
    //         module: 'toolbar',
    //         segment: 'toolbar',
    //         type: 'image',
    //       });
    //     })
    //     .catch(console.error);
    //   return true;
    // }

    return false;
  },
});
