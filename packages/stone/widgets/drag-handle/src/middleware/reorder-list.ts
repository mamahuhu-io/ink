import { correctNumberedListsOrderToPrev } from '@ink/stone-block-list';
import { ListBlockModel } from '@ink/stone-model';
import { matchModels } from '@ink/stone-shared/utils';
import type { BlockStdScope } from '@ink/stone-std';
import type { TransformerMiddleware } from '@ink/stone-store';

export const reorderList =
  (std: BlockStdScope): TransformerMiddleware =>
  ({ slots }) => {
    const afterImportBlockSubscription = slots.afterImport.subscribe(
      payload => {
        if (payload.type === 'block') {
          const model = payload.model;
          if (
            matchModels(model, [ListBlockModel]) &&
            model.props.type === 'numbered'
          ) {
            const next = std.store.getNext(model);
            correctNumberedListsOrderToPrev(std.store, model);
            if (next) {
              correctNumberedListsOrderToPrev(std.store, next);
            }
          }
        }
      }
    );

    return () => {
      afterImportBlockSubscription.unsubscribe();
    };
  };
