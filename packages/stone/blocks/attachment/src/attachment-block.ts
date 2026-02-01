import { CaptionedBlockComponent, SelectedStyle } from '@ink/stone-components/caption';
import { getAttachmentFileIcon, LoadingIcon } from '@ink/stone-components/icons';
import { type ResolvedStateInfo, ResourceController } from '@ink/stone-components/resource';
import { toast } from '@ink/stone-components/toast';
import { AttachmentIcon, ResetIcon, WarningIcon } from '@ink/stone-icons/lit';
import type { AttachmentBlockModel } from '@ink/stone-model';
import { DocModeProvider, TelemetryProvider } from '@ink/stone-shared/services';
import { formatSize, openSingleFileWith } from '@ink/stone-shared/utils';
import { BlockSelection } from '@ink/stone-std';
import { Slice } from '@ink/stone-store';
import { computed } from '@preact/signals-core';
import { html, type TemplateResult } from 'lit';
import { type ClassInfo, classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { AttachmentEmbedProvider } from './embed';
import { styles } from './styles';
import { getFileType, refreshData } from './utils';

type AttachmentResolvedStateInfo = ResolvedStateInfo & {
  kind?: TemplateResult;
};

export class AttachmentBlockComponent extends CaptionedBlockComponent<AttachmentBlockModel> {
  static override styles = styles;

  blockDraggable = true;

  resourceController = new ResourceController(computed(() => this.model.props.sourceId$.value));

  get blobUrl() {
    return this.resourceController.blobUrl$.value;
  }

  get filetype() {
    const name = this.model.props.name$.value;
    return name.split('.').pop() ?? '';
  }

  protected containerStyleMap = styleMap({
    position: 'relative',
    width: '100%',
    margin: '18px 0px',
  });

  copy = () => {
    const slice = Slice.fromModels(this.store, [this.model]);
    this.std.clipboard.copySlice(slice).catch(console.error);
    toast(this.host, 'Copied to clipboard');
  };

  open = () => {
    const blobUrl = this.blobUrl;
    if (!blobUrl) return;
    window.open(blobUrl, '_blank');
  };

  // Refreshes data.
  refreshData = () => {
    refreshData(this).catch(console.error);
  };

  // Refreshes the component.
  reload = () => {
    this.refreshData();
  };

  // Replaces the current attachment.
  replace = async () => {
    const state = this.resourceController.state$.peek();
    if (state.uploading) return;

    const file = await openSingleFileWith();
    if (!file) return;

    const sourceId = await this.std.store.blobSync.set(file);
    const type = await getFileType(file);
    const { name, size } = file;

    this.std.store.captureSync();
    this.std.store.transact(() => {
      this.std.store.updateBlock(this.blockId, {
        name,
        size,
        type,
        sourceId,
      });

      // Check if image type - convert to image block
      const provider = this.std.get(AttachmentEmbedProvider);
      if (provider.shouldBeConverted(this.model)) {
        provider.convertTo(this.model);
      }

      // Reloads
      this.reload();
    });
  };

  private _selectBlock() {
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create(BlockSelection, {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  }

  override connectedCallback() {
    super.connectedCallback();

    this.contentEditable = 'false';

    this.resourceController.setEngine(this.std.store.blobSync);

    this.disposables.add(this.resourceController.subscribe());
    this.disposables.add(this.resourceController);

    this.disposables.add(
      this.model.props.sourceId$.subscribe(() => {
        this.refreshData();
      }),
    );
  }

  override firstUpdated() {
    // lazy bindings
    this.disposables.addFromEvent(this, 'click', this.onClick);
  }

  protected onClick(event: MouseEvent) {
    if (event.defaultPrevented) return;

    event.stopPropagation();

    if (!this.selected$.peek()) {
      this._selectBlock();
    }
  }

  protected renderNormalButton = (needUpload: boolean) => {
    const label = needUpload ? 'retry' : 'reload';
    const run = async () => {
      if (needUpload) {
        await this.resourceController.upload();
        return;
      }

      this.refreshData();
    };

    return html`
      <button
        class="ink-attachment-content-button"
        @click=${(event: MouseEvent) => {
          event.stopPropagation();
          run().catch(console.error);

          {
            const mode = this.std.get(DocModeProvider).getEditorMode() ?? 'page';
            const segment = mode === 'page' ? 'doc' : 'whiteboard';
            this.std.getOptional(TelemetryProvider)?.track('AttachmentReloadedEvent', {
              segment,
              page: `${segment} editor`,
              module: 'attachment',
              control: label,
              category: 'card',
              type: this.filetype,
            });
          }
        }}
      >
        ${ResetIcon()} ${label}
      </button>
    `;
  };

  protected renderCardContent(
    classInfo: ClassInfo,
    { icon, title, description, kind, state, needUpload }: AttachmentResolvedStateInfo,
  ) {
    return html`
      <div class=${classMap(classInfo)}>
        <div class="ink-attachment-content">
          <div class="ink-attachment-content-title">
            <div class="ink-attachment-content-title-icon">${icon}</div>
            <div class="ink-attachment-content-title-text truncate">${title}</div>
          </div>

          <div class="ink-attachment-content-description">
            <div class="ink-attachment-content-info truncate">${description}</div>
            ${state === 'error' ? this.renderNormalButton(needUpload) : null}
          </div>
        </div>

        <div class="ink-attachment-banner">${kind}</div>
      </div>
    `;
  }

  protected resolvedState$ = computed<AttachmentResolvedStateInfo>(() => {
    const size = this.model.props.size;
    const name = this.model.props.name$.value;
    const kind = getAttachmentFileIcon(this.filetype);

    const resolvedState = this.resourceController.resolveStateWith({
      loadingIcon: LoadingIcon(),
      errorIcon: WarningIcon(),
      icon: AttachmentIcon(),
      title: name,
      description: formatSize(size),
    });

    return { ...resolvedState, kind };
  });

  protected renderCardView = () => {
    const resolvedState = this.resolvedState$.value;

    const classInfo = {
      'ink-attachment-card': true,
      horizontalThin: true,
      loading: resolvedState.loading,
      error: resolvedState.error,
    };

    return this.renderCardContent(classInfo, resolvedState);
  };

  override renderBlock() {
    return html`
      <div
        class=${classMap({
          'ink-attachment-container': true,
          focused: this.selected$.value,
        })}
        style=${this.containerStyleMap}
      >
        ${this.renderCardView()}
      </div>
    `;
  }

  override accessor selectedStyle = SelectedStyle.Border;

  override accessor useCaptionEditor = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-attachment': AttachmentBlockComponent;
  }
}
