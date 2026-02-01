import { Schema, Transformer, type TransformerMiddleware } from '@ink/stone-store';
import { TestWorkspace } from '@ink/stone-store/test';

import { InkSchemas } from '../../schemas.js';
import { testStoreExtensions } from './store.js';

declare global {
  interface Window {
    happyDOM: {
      settings: {
        fetch: {
          disableSameOriginPolicy: boolean;
        };
      };
    };
  }
}

export function createJob(middlewares?: TransformerMiddleware[]) {
  window.happyDOM.settings.fetch.disableSameOriginPolicy = true;
  const testMiddlewares = middlewares ?? [];
  const schema = new Schema().register(InkSchemas);
  const docCollection = new TestWorkspace();
  docCollection.storeExtensions = testStoreExtensions;
  docCollection.meta.initialize();
  return new Transformer({
    schema,
    blobCRUD: docCollection.blobSync,
    middlewares: testMiddlewares,
    docCRUD: {
      create: (id: string) => docCollection.createDoc(id).getStore({ id }),
      get: (id: string) => docCollection.getDoc(id)?.getStore({ id }) ?? null,
      delete: (id: string) => docCollection.removeDoc(id),
    },
  });
}
