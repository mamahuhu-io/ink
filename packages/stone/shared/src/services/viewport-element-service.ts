import { createIdentifier } from '@ink/stone-global/di';
import { InkStoneError } from '@ink/stone-global/exceptions';
import { StdIdentifier } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';

import type { Viewport } from '../types';

export interface ViewportElementService {
  get viewportElement(): HTMLElement;
  get viewport(): Viewport;
}

export const ViewportElementProvider = createIdentifier<ViewportElementService>(
  'ViewportElementProvider'
);

export const ViewportElementExtension = (selector: string): ExtensionType => {
  return {
    setup: di => {
      di.override(ViewportElementProvider, provider => {
        const getViewportElement = (): HTMLElement => {
          const std = provider.get(StdIdentifier);
          const viewportElement = std.host.closest<HTMLElement>(selector);
          if (!viewportElement) {
            throw new InkStoneError(
              InkStoneError.ErrorCode.ValueNotExists,
              `ViewportElementProvider: viewport element is not found`
            );
          }
          return viewportElement;
        };
        return {
          get viewportElement() {
            return getViewportElement();
          },
          get viewport() {
            const viewportElement = getViewportElement();
            const {
              scrollLeft,
              scrollTop,
              scrollWidth,
              scrollHeight,
              clientWidth,
              clientHeight,
            } = viewportElement;
            const { top, left } = viewportElement.getBoundingClientRect();
            return {
              top,
              left,
              scrollLeft,
              scrollTop,
              scrollWidth,
              scrollHeight,
              clientWidth,
              clientHeight,
            };
          },
        };
      });
    },
  };
};
