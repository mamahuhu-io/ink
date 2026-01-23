import { BlockSelection } from '@ink/stone-components/block-selection';
import { BlockZeroWidth } from '@ink/stone-components/block-zero-width';
import { effects as componentCaptionEffects } from '@ink/stone-components/caption';
import { effects as componentCardStyleDropdownMenuEffects } from '@ink/stone-components/card-style-dropdown-menu';
import { effects as componentCitationEffects } from '@ink/stone-components/citation';
import { effects as componentColorPickerEffects } from '@ink/stone-components/color-picker';
import { effects as componentContextMenuEffects } from '@ink/stone-components/context-menu';
import { effects as componentDatePickerEffects } from '@ink/stone-components/date-picker';
import { effects as componentDropIndicatorEffects } from '@ink/stone-components/drop-indicator';
// [REMOVED] Edgeless components - not needed for Page mode
// import { effects as componentEdgelessLineStylesEffects } from '@ink/stone-components/edgeless-line-styles-panel';
// import { effects as componentEdgelessLineWidthEffects } from '@ink/stone-components/edgeless-line-width-panel';
// import { effects as componentEdgelessShapeColorPickerEffects } from '@ink/stone-components/edgeless-shape-color-picker';
import { effects as componentEmbedCardModalEffects } from '@ink/stone-components/embed-card-modal';
import { FilterableListComponent } from '@ink/stone-components/filterable-list';
import { effects as componentHighlightDropdownMenuEffects } from '@ink/stone-components/highlight-dropdown-menu';
import { IconButton } from '@ink/stone-components/icon-button';
import { effects as componentLinkPreviewEffects } from '@ink/stone-components/link-preview';
import { effects as componentLinkedDocTitleEffects } from '@ink/stone-components/linked-doc-title';
import { effects as componentOpenDocDropdownMenuEffects } from '@ink/stone-components/open-doc-dropdown-menu';
import { effects as componentPortalEffects } from '@ink/stone-components/portal';
import { effects as componentResourceEffects } from '@ink/stone-components/resource';
import { effects as componentSizeDropdownMenuEffects } from '@ink/stone-components/size-dropdown-menu';
import { effects as componentSliderEffects } from '@ink/stone-components/slider';
import { SmoothCorner } from '@ink/stone-components/smooth-corner';
import { effects as componentToggleButtonEffects } from '@ink/stone-components/toggle-button';
import { ToggleSwitch } from '@ink/stone-components/toggle-switch';
import { effects as componentToolbarEffects } from '@ink/stone-components/toolbar';
import { effects as componentTooltipContentWithShortcutEffects } from '@ink/stone-components/tooltip-content-with-shortcut';
import { effects as componentViewDropdownMenuEffects } from '@ink/stone-components/view-dropdown-menu';
import { effects as richTextEffects } from '@ink/stone-rich-text/effects';
// [REMOVED] Database module - not needed for local markdown editor
// import { effects as dataViewEffects } from '@ink/stone-data-view/effects';
import { effects as stdEffects } from '@ink/stone-std/effects';

export function effects() {
  stdEffects();

  // [REMOVED] Database module
  // dataViewEffects();
  richTextEffects();

  componentCaptionEffects();
  componentContextMenuEffects();
  componentDatePickerEffects();
  componentPortalEffects();
  componentToolbarEffects();
  componentDropIndicatorEffects();
  componentToggleButtonEffects();
  componentColorPickerEffects();
  componentEmbedCardModalEffects();
  componentLinkPreviewEffects();
  componentLinkedDocTitleEffects();
  componentCardStyleDropdownMenuEffects();
  componentCitationEffects();
  componentHighlightDropdownMenuEffects();
  componentViewDropdownMenuEffects();
  componentTooltipContentWithShortcutEffects();
  componentSizeDropdownMenuEffects();
  componentSliderEffects();
  // [REMOVED] Edgeless components
  // componentEdgelessLineWidthEffects();
  // componentEdgelessLineStylesEffects();
  // componentEdgelessShapeColorPickerEffects();
  componentOpenDocDropdownMenuEffects();
  componentResourceEffects();

  customElements.define('icon-button', IconButton);
  customElements.define('smooth-corner', SmoothCorner);
  customElements.define('toggle-switch', ToggleSwitch);
  customElements.define('ink-filterable-list', FilterableListComponent);
  customElements.define('block-zero-width', BlockZeroWidth);
  customElements.define('ink-block-selection', BlockSelection);
}
