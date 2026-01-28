// [REMOVED] Database modules - not needed for local markdown editor
// import { DatabaseBlockModel } from '@ink/stone-model';
// import { matchModels } from '@ink/stone-shared/utils';
import type { BlockStdScope } from '@ink/stone-std';
import type { TransformerMiddleware } from '@ink/stone-store';

export const newIdCrossDoc =
  (std: BlockStdScope): TransformerMiddleware =>
  ({ slots }) => {
    let samePage = false;
    const oldToNewIdMap = new Map<string, string>();

    const beforeImportSliceSubscription = slots.beforeImport.subscribe((payload) => {
      if (payload.type === 'slice') {
        samePage = payload.snapshot.pageId === std.store.id;
      }
      if (payload.type === 'block' && !samePage) {
        const newId = std.workspace.idGenerator();

        oldToNewIdMap.set(payload.snapshot.id, newId);
        payload.snapshot.id = newId;
      }
    });

    // [REMOVED] Database modules - not needed for local markdown editor
    // const afterImportBlockSubscription = slots.afterImport.subscribe(
    //   payload => {
    //     if (
    //       !samePage &&
    //       payload.type === 'block' &&
    //       matchModels(payload.model, [DatabaseBlockModel])
    //     ) {
    //       const originalCells = payload.model.props.cells;
    //       const newCells = {
    //         ...originalCells,
    //       };

    //       Object.keys(originalCells).forEach(cellId => {
    //         if (oldToNewIdMap.has(cellId)) {
    //           newCells[oldToNewIdMap.get(cellId)!] = originalCells[cellId];
    //         }
    //       });

    //       payload.model.props.cells$.value = newCells;
    //     }
    //   }
    // );

    return () => {
      beforeImportSliceSubscription.unsubscribe();
      // [REMOVED] Database modules - not needed for local markdown editor
      // afterImportBlockSubscription.unsubscribe();
    };
  };
