import {
  EDGELESS_DND_PREVIEW_ELEMENT,
  EdgelessDndPreviewElement,
} from './components/edgeless-preview/preview';
import { INK_DRAG_HANDLE_WIDGET } from './consts';
import { InkDragHandleWidget } from './drag-handle';

export function effects() {
  customElements.define(INK_DRAG_HANDLE_WIDGET, InkDragHandleWidget);
  customElements.define(
    EDGELESS_DND_PREVIEW_ELEMENT,
    EdgelessDndPreviewElement
  );
}
