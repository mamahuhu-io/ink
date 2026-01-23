import { NoteBlockModel, NoteDisplayMode } from '@ink/stone-model';
import { matchModels } from '@ink/stone-shared/utils';
import { BlockComponent } from '@ink/stone-std';
import { css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export class PreviewRootBlockComponent extends BlockComponent {
  static override styles = css`
    ink-preview-root {
      display: block;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  override renderBlock() {
    const widgets = html`${repeat(
      Object.entries(this.widgets),
      ([id]) => id,
      ([_, widget]) => widget
    )}`;

    const children = this.renderChildren(this.model, child => {
      const isNote = matchModels(child, [NoteBlockModel]);
      const note = child as NoteBlockModel;
      const displayOnEdgeless =
        !!note.props.displayMode &&
        note.props.displayMode === NoteDisplayMode.EdgelessOnly;
      // Should remove deprecated `hidden` property in the future
      return !(isNote && displayOnEdgeless);
    });

    return html`<div class="ink-preview-root">${children} ${widgets}</div>`;
  }
}
