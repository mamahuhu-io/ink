import { CodeBlockComponent } from './code-block';
import { INK_CODE_TOOLBAR_WIDGET, InkCodeToolbarWidget } from './code-toolbar';
import { InkCodeToolbar } from './code-toolbar/components/code-toolbar';
import { LanguageListButton } from './code-toolbar/components/lang-button';
import { PreviewButton } from './code-toolbar/components/preview-button';
import { InkCodeUnit } from './highlight/ink-code-unit';

export function effects() {
  customElements.define('language-list-button', LanguageListButton);
  customElements.define('ink-code-toolbar', InkCodeToolbar);
  customElements.define(INK_CODE_TOOLBAR_WIDGET, InkCodeToolbarWidget);
  customElements.define('ink-code-unit', InkCodeUnit);
  customElements.define('ink-code', CodeBlockComponent);
  customElements.define('preview-button', PreviewButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'language-list-button': LanguageListButton;
    'ink-code-toolbar': InkCodeToolbar;
    'preview-button': PreviewButton;
    [INK_CODE_TOOLBAR_WIDGET]: InkCodeToolbarWidget;
  }
}
