import { AdapterPanel, INK_ADAPTER_PANEL } from './adapter-panel';
import { AdapterPanelBody, INK_ADAPTER_PANEL_BODY } from './body/adapter-panel-body';
import { AdapterMenu, INK_ADAPTER_MENU } from './header/adapter-menu';
import { AdapterPanelHeader, INK_ADAPTER_PANEL_HEADER } from './header/adapter-panel-header';

export function effects() {
  customElements.define(INK_ADAPTER_PANEL, AdapterPanel);
  customElements.define(INK_ADAPTER_MENU, AdapterMenu);
  customElements.define(INK_ADAPTER_PANEL_HEADER, AdapterPanelHeader);
  customElements.define(INK_ADAPTER_PANEL_BODY, AdapterPanelBody);
}
