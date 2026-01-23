import { INK_OUTLINE_NOTICE, OutlineNotice } from './body/outline-notice';
import {
  INK_OUTLINE_PANEL_BODY,
  OutlinePanelBody,
} from './body/outline-panel-body';
import { INK_OUTLINE_NOTE_CARD, OutlineNoteCard } from './card/outline-card';
import {
  INK_OUTLINE_BLOCK_PREVIEW,
  OutlineBlockPreview,
} from './card/outline-preview';
import {
  INK_OUTLINE_PANEL_HEADER,
  OutlinePanelHeader,
} from './header/outline-panel-header';
import {
  INK_OUTLINE_NOTE_PREVIEW_SETTING_MENU,
  OutlineNotePreviewSettingMenu,
} from './header/outline-setting-menu';
import {
  INK_MOBILE_OUTLINE_MENU,
  MobileOutlineMenu,
} from './mobile-outline-panel';
import { INK_OUTLINE_PANEL, OutlinePanel } from './outline-panel';
import { INK_OUTLINE_VIEWER, OutlineViewer } from './outline-viewer';

export function effects() {
  customElements.define(
    INK_OUTLINE_NOTE_PREVIEW_SETTING_MENU,
    OutlineNotePreviewSettingMenu
  );
  customElements.define(INK_OUTLINE_NOTICE, OutlineNotice);
  customElements.define(INK_OUTLINE_PANEL, OutlinePanel);
  customElements.define(INK_OUTLINE_PANEL_HEADER, OutlinePanelHeader);
  customElements.define(INK_OUTLINE_NOTE_CARD, OutlineNoteCard);
  customElements.define(INK_OUTLINE_VIEWER, OutlineViewer);
  customElements.define(INK_MOBILE_OUTLINE_MENU, MobileOutlineMenu);
  customElements.define(INK_OUTLINE_BLOCK_PREVIEW, OutlineBlockPreview);
  customElements.define(INK_OUTLINE_PANEL_BODY, OutlinePanelBody);
}
