import type { RootBlockModel } from '@ink/stone-model';
import { BLOCK_ID_ATTR, type BlockComponent } from '@ink/stone-std';
import type { BlockModel } from '@ink/stone-store';

const ATTR_SELECTOR = `[${BLOCK_ID_ATTR}]`;

export function getModelByElement<Model extends BlockModel>(element: Element): Model | null {
  const closestBlock = element.closest<BlockComponent>(ATTR_SELECTOR);
  if (!closestBlock) {
    return null;
  }
  return closestBlock.model as Model;
}

export function getRootByElement(element: Element): BlockComponent<RootBlockModel> | null {
  const pageRoot = getPageRootByElement(element);
  if (pageRoot) return pageRoot;

  const edgelessRoot = getEdgelessRootByElement(element);
  if (edgelessRoot) return edgelessRoot;

  return null;
}

export function getPageRootByElement(element: Element): BlockComponent<RootBlockModel> | null {
  return element.closest('ink-page-root');
}

export function getEdgelessRootByElement(element: Element): BlockComponent<RootBlockModel> | null {
  return element.closest('ink-edgeless-root');
}
