import { whenHover } from '@ink/stone-components/hover';
import { Peekable } from '@ink/stone-components/peek';
import { WithDisposable } from '@ink/stone-global/lit';
import { LinkedPageIcon } from '@ink/stone-icons/lit';
import type { ReferenceInfo } from '@ink/stone-model';
import { DEFAULT_DOC_NAME, REFERENCE_NODE } from '@ink/stone-shared/consts';
import { DocDisplayMetaProvider, ToolbarRegistryIdentifier } from '@ink/stone-shared/services';
import { inkTextStyles } from '@ink/stone-shared/styles';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import { cloneReferenceInfo, referenceToNode } from '@ink/stone-shared/utils';
import type { BlockComponent, BlockStdScope } from '@ink/stone-std';
import { BLOCK_ID_ATTR, ShadowlessElement } from '@ink/stone-std';
import {
  INLINE_ROOT_ATTR,
  type InlineRootElement,
  ZERO_WIDTH_FOR_EMBED_NODE,
  ZERO_WIDTH_FOR_EMPTY_LINE,
} from '@ink/stone-std/inline';
import type { DeltaInsert, DocMeta, Store } from '@ink/stone-store';
import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { ReferenceNodeConfigProvider } from './reference-config';
import { RefNodeSlotsProvider } from './reference-node-slots';
import type { DocLinkClickedEvent } from './types';

@Peekable({ action: false })
export class InkReference extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .ink-reference {
      white-space: normal;
      word-break: break-word;
      color: var(--ink-text-primary-color);
      fill: var(--ink-icon-color);
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      padding: 1px 2px 1px 0;

      svg {
        margin-bottom: 0.1em;
      }
    }
    .ink-reference:hover {
      background: var(--ink-hover-color);
    }

    .ink-reference[data-selected='true'] {
      background: var(--ink-hover-color);
    }

    .ink-reference-title {
      margin-left: 4px;
      border-bottom: 0.5px solid var(--ink-divider-color);
      transition: border 0.2s ease-out;
    }
    .ink-reference-title:hover {
      border-bottom: 0.5px solid var(--ink-icon-color);
    }
  `;

  get docTitle() {
    return this.refMeta?.title ?? DEFAULT_DOC_NAME;
  }

  private readonly _updateRefMeta = (doc: Store) => {
    const refAttribute = this.delta.attributes?.reference;
    if (!refAttribute) {
      return;
    }

    const refMeta = doc.workspace.meta.docMetas.find((doc) => doc.id === refAttribute.pageId);
    this.refMeta = refMeta
      ? {
          ...refMeta,
        }
      : undefined;
  };

  // Since the linked doc may be deleted, the `_refMeta` could be undefined.
  @state()
  accessor refMeta: DocMeta | undefined = undefined;

  get _icon() {
    const { pageId, params, title } = this.referenceInfo;
    return this.std.get(DocDisplayMetaProvider).icon(pageId, { params, title, referenced: true })
      .value;
  }

  get _title() {
    const { pageId, params, title } = this.referenceInfo;
    return (
      this.std.get(DocDisplayMetaProvider).title(pageId, { params, title, referenced: true })
        .value || title
    );
  }

  get block() {
    if (!this.inlineEditor?.rootElement) return null;
    const block = this.inlineEditor.rootElement.closest<BlockComponent>(`[${BLOCK_ID_ATTR}]`);
    return block;
  }

  get customContent() {
    return this.config.customContent;
  }

  get doc() {
    const doc = this.config.doc;
    return doc;
  }

  get inlineEditor() {
    const inlineRoot = this.closest<InlineRootElement<InkTextAttributes>>(`[${INLINE_ROOT_ATTR}]`);
    return inlineRoot?.inlineEditor;
  }

  get referenceInfo(): ReferenceInfo {
    const reference = this.delta.attributes?.reference;
    const id = this.doc?.id ?? '';
    if (!reference) return { pageId: id };
    return cloneReferenceInfo(reference);
  }

  get selfInlineRange() {
    const selfInlineRange = this.inlineEditor?.getInlineRangeFromElement(this);
    return selfInlineRange;
  }

  readonly open = (event?: Partial<DocLinkClickedEvent>) => {
    if (!this.config.interactable) return;
    if (event?.event?.button === 2) {
      return;
    }

    this.std.getOptional(RefNodeSlotsProvider)?.docLinkClicked.next({
      ...this.referenceInfo,
      ...event,
      openMode: event?.event?.button === 1 ? 'open-in-new-tab' : event?.openMode,
      host: this.std.host,
    });
  };

  _whenHover = whenHover(
    (hovered) => {
      if (!this.config.interactable) return;

      const message$ = this.std.get(ToolbarRegistryIdentifier).message$;

      if (hovered) {
        message$.value = {
          flavour: 'ink:reference',
          element: this,
          setFloating: this._whenHover.setFloating,
        };
        return;
      }

      // Clears previous bindings
      message$.value = null;
      this._whenHover.setFloating();
    },
    { enterDelay: 500 },
  );

  override connectedCallback() {
    super.connectedCallback();

    this._whenHover.setReference(this);

    const message$ = this.std.get(ToolbarRegistryIdentifier).message$;

    this._disposables.add(() => {
      if (message$?.value) {
        message$.value = null;
      }
      this._whenHover.dispose();
    });

    if (!this.config) {
      console.error('`reference-node` need `ReferenceNodeConfig`.');
      return;
    }

    if (this.delta.insert !== REFERENCE_NODE) {
      console.error(
        `Reference node must be initialized with '${REFERENCE_NODE}', but got '${this.delta.insert}'`,
      );
    }

    const doc = this.doc;
    if (doc) {
      this._disposables.add(
        doc.workspace.slots.docListUpdated.subscribe(() => this._updateRefMeta(doc)),
      );
    }

    this.updateComplete
      .then(() => {
        if (!this.inlineEditor || !doc) return;

        // observe yText update
        this.disposables.add(
          this.inlineEditor.slots.textChange.subscribe(() => this._updateRefMeta(doc)),
        );
      })
      .catch(console.error);
  }

  // reference to block/element
  referenceToNode() {
    return referenceToNode(this.referenceInfo);
  }

  override render() {
    const refMeta = this.refMeta;
    const isDeleted = !refMeta;

    const attributes = this.delta.attributes;
    const reference = attributes?.reference;
    const type = reference?.type;
    if (!attributes || !type) {
      return nothing;
    }

    const title = this._title;
    const icon = choose(type, [
      ['LinkedPage', () => this._icon],
      [
        'Subpage',
        () =>
          LinkedPageIcon({
            width: '1.25em',
            height: '1.25em',
            style:
              'user-select:none;flex-shrink:0;vertical-align:middle;font-size:inherit;margin-bottom:0.1em;',
          }),
      ],
    ]);

    const style = inkTextStyles(
      attributes,
      isDeleted
        ? {
            color: 'var(--ink-text-disable-color)',
            textDecoration: 'line-through',
            fill: 'var(--ink-text-disable-color)',
          }
        : {},
    );

    const content = this.customContent
      ? this.customContent(this)
      : html`${icon}<span data-title=${ifDefined(title)} class="ink-reference-title"
            >${title}</span
          >`;

    // we need to add `<v-text .str=${ZERO_WIDTH_FOR_EMBED_NODE}></v-text>` in an
    // embed element to make sure inline range calculation is correct
    return html`<span
      data-selected=${this.selected}
      class="ink-reference"
      style=${styleMap(style)}
      @click=${(event: MouseEvent) => this.open({ event })}
      @auxclick=${(event: MouseEvent) => this.open({ event })}
      >${content}<v-text .str=${ZERO_WIDTH_FOR_EMBED_NODE}></v-text
    ></span>`;
  }

  override willUpdate(_changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(_changedProperties);

    const doc = this.doc;
    if (doc) {
      this._updateRefMeta(doc);
    }
  }

  @property({ attribute: false })
  accessor config!: ReferenceNodeConfigProvider;

  @property({ type: Object })
  accessor delta: DeltaInsert<InkTextAttributes> = {
    insert: ZERO_WIDTH_FOR_EMPTY_LINE,
    attributes: {},
  };

  @property({ type: Boolean })
  accessor selected = false;

  @property({ attribute: false })
  accessor std!: BlockStdScope;
}
