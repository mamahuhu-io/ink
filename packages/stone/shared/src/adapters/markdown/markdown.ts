import type { ServiceProvider } from '@ink/stone-global/di';
import { DefaultTheme, NoteDisplayMode } from '@ink/stone-model';
import {
  type AssetsManager,
  ASTWalker,
  BaseAdapter,
  type BlockSnapshot,
  BlockSnapshotSchema,
  type DocSnapshot,
  type ExtensionType,
  type FromBlockSnapshotPayload,
  type FromBlockSnapshotResult,
  type FromDocSnapshotPayload,
  type FromDocSnapshotResult,
  type FromSliceSnapshotPayload,
  type FromSliceSnapshotResult,
  nanoid,
  type SliceSnapshot,
  type ToBlockSnapshotPayload,
  type ToDocSnapshotPayload,
  type Transformer,
} from '@ink/stone-store';
import type { Root } from 'mdast';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

import { type AdapterContext, AdapterFactoryIdentifier } from '../types';
import {
  type BlockMarkdownAdapterMatcher,
  BlockMarkdownAdapterMatcherIdentifier,
} from './block-adapter';
import {
  InlineDeltaToMarkdownAdapterMatcherIdentifier,
  MarkdownASTToDeltaMatcherIdentifier,
  MarkdownDeltaConverter,
} from './delta-converter';
import { remarkGfm } from './gfm';
import { MarkdownPreprocessorManager } from './preprocessor';
import type { Markdown, MarkdownAST } from './type';

type MarkdownToSliceSnapshotPayload = {
  file: Markdown;
  assets?: AssetsManager;
  workspaceId: string;
  pageId: string;
};

export class MarkdownAdapter extends BaseAdapter<Markdown> {
  private readonly _traverseMarkdown = (
    markdown: MarkdownAST,
    snapshot: BlockSnapshot,
    assets?: AssetsManager,
  ) => {
    const walker = new ASTWalker<MarkdownAST, BlockSnapshot>();
    walker.setONodeTypeGuard(
      (node): node is MarkdownAST =>
        !Array.isArray(node) &&
        'type' in (node as object) &&
        (node as MarkdownAST).type !== undefined,
    );

    // Track the end line of the last processed child for each parent
    // Key: Parent Node, Value: End line of the last processed sibling
    const lastChildEndLineMap = new Map<object, number>();

    walker.setEnter(async (o, context) => {
      // Gap Detection Logic
      // Detect vertical gaps between siblings and inject empty paragraphs
      if (o.parent && o.node.position) {
        const lastEndLine = lastChildEndLineMap.get(o.parent);

        // Only check for gaps if we have processed a sibling before (lastEndLine is defined)
        if (lastEndLine !== undefined) {
          const currentStartLine = o.node.position.start.line;

          // Calculate the gap in lines
          // Standard Markdown separation is 1 empty line (Gap of 2 lines: End L1, Start L3)
          // Each empty block in the editor adds 2 lines (\n\n) in serialization
          // Formula: blocksToInsert = floor((currentStart - lastEnd) / 2) - 1
          const blocksToInsert = Math.floor((currentStartLine - lastEndLine) / 2) - 1;

          if (blocksToInsert > 0) {
            for (let i = 0; i < blocksToInsert; i++) {
              context
                .openNode(
                  {
                    type: 'block',
                    id: nanoid(),
                    flavour: 'ink:paragraph',
                    props: {
                      type: 'text',
                      text: {
                        '$stone:internal:text$': true,
                        delta: [],
                      },
                    },
                    children: [],
                  },
                  'children',
                )
                .closeNode();
            }
          }
        }
      }

      for (const matcher of this.blockMatchers) {
        if (matcher.toMatch(o)) {
          const adapterContext: AdapterContext<MarkdownAST, BlockSnapshot, MarkdownDeltaConverter> =
            {
              walker,
              walkerContext: context,
              configs: this.configs,
              job: this.job,
              deltaConverter: this.deltaConverter,
              provider: this.provider,
              textBuffer: { content: '' },
              assets,
            };
          await matcher.toBlockSnapshot.enter?.(o, adapterContext);
        }
      }

      // Update the last end line for this parent
      if (o.parent && o.node.position) {
        lastChildEndLineMap.set(o.parent, o.node.position.end.line);
      }
    });
    walker.setLeave(async (o, context) => {
      for (const matcher of this.blockMatchers) {
        if (matcher.toMatch(o)) {
          const adapterContext: AdapterContext<MarkdownAST, BlockSnapshot, MarkdownDeltaConverter> =
            {
              walker,
              walkerContext: context,
              configs: this.configs,
              job: this.job,
              deltaConverter: this.deltaConverter,
              provider: this.provider,
              textBuffer: { content: '' },
              assets,
            };
          await matcher.toBlockSnapshot.leave?.(o, adapterContext);
        }
      }
    });
    return walker.walk(markdown, snapshot);
  };

  private readonly _traverseSnapshot = async (
    snapshot: BlockSnapshot,
    markdown: MarkdownAST,
    assets?: AssetsManager,
  ) => {
    const assetsIds: string[] = [];
    const walker = new ASTWalker<BlockSnapshot, MarkdownAST>();
    walker.setONodeTypeGuard(
      (node): node is BlockSnapshot => BlockSnapshotSchema.safeParse(node).success,
    );
    walker.setEnter(async (o, context) => {
      for (const matcher of this.blockMatchers) {
        if (matcher.fromMatch(o)) {
          const adapterContext: AdapterContext<BlockSnapshot, MarkdownAST, MarkdownDeltaConverter> =
            {
              walker,
              walkerContext: context,
              configs: this.configs,
              job: this.job,
              deltaConverter: this.deltaConverter,
              provider: this.provider,
              textBuffer: { content: '' },
              assets,
              updateAssetIds: (assetsId: string) => {
                assetsIds.push(assetsId);
              },
            };
          await matcher.fromBlockSnapshot.enter?.(o, adapterContext);
        }
      }
    });
    walker.setLeave(async (o, context) => {
      for (const matcher of this.blockMatchers) {
        if (matcher.fromMatch(o)) {
          const adapterContext: AdapterContext<BlockSnapshot, MarkdownAST, MarkdownDeltaConverter> =
            {
              walker,
              walkerContext: context,
              configs: this.configs,
              job: this.job,
              deltaConverter: this.deltaConverter,
              provider: this.provider,
              textBuffer: { content: '' },
              assets,
            };
          await matcher.fromBlockSnapshot.leave?.(o, adapterContext);
        }
      }
    });
    return {
      ast: (await walker.walk(snapshot, markdown)) as Root,
      assetsIds,
    };
  };

  deltaConverter: MarkdownDeltaConverter;
  preprocessorManager: MarkdownPreprocessorManager;

  readonly blockMatchers: BlockMarkdownAdapterMatcher[];

  constructor(job: Transformer, provider: ServiceProvider) {
    super(job, provider);
    const blockMatchers = Array.from(
      provider.getAll(BlockMarkdownAdapterMatcherIdentifier).values(),
    );
    const inlineDeltaToMarkdownAdapterMatchers = Array.from(
      provider.getAll(InlineDeltaToMarkdownAdapterMatcherIdentifier).values(),
    );
    const markdownInlineToDeltaMatchers = Array.from(
      provider.getAll(MarkdownASTToDeltaMatcherIdentifier).values(),
    );
    this.blockMatchers = blockMatchers;
    this.deltaConverter = new MarkdownDeltaConverter(
      job.adapterConfigs,
      inlineDeltaToMarkdownAdapterMatchers,
      markdownInlineToDeltaMatchers,
    );
    this.preprocessorManager = new MarkdownPreprocessorManager(provider);
  }

  private _astToMarkdown(ast: Root) {
    let markdown = unified()
      .use(remarkGfm)
      .use(remarkStringify, {
        resourceLink: true,
        bullet: '-',
      })
      .use(remarkMath)
      .stringify(ast)
      .replace(/&#x20;\n/g, ' \n');

    // Unescape HTML tags that were escaped by remark-stringify
    // This restores <span>, </span>, <u>, </u> tags for color/underline support
    markdown = markdown
      .replace(/\\<(span|u|\/span|\/u)/g, '<$1')
      .replace(/(style="[^"]*")\\>/g, '$1>')
      .replace(/(<\/(?:span|u))\\>/g, '$1>');

    return markdown;
  }

  private _preprocessHtmlTags(markdown: Markdown): Markdown {
    // Convert HTML tags to special markers before parsing
    // This prevents remark-parse from splitting them into separate nodes
    // Only match innermost tags (content must not contain nested tags)

    let result = markdown;

    // Handle <span style="...">content</span>
    // Only match spans where content doesn't contain nested span tags
    result = result.replace(
      /<span\s+style="([^"]*)">((?:(?!<span|<\/span>)[\s\S])*?)<\/span>/gi,
      (_, style, content) => `[[SPAN:${style}]]${content}[[/SPAN]]`,
    );

    // Handle <u>content</u>
    // Only match u tags where content doesn't contain nested u tags
    result = result.replace(
      /<u>((?:(?!<u>|<\/u>)[\s\S])*?)<\/u>/gi,
      (_, content) => `[[U]]${content}[[/U]]`,
    );

    return result;
  }

  private _markdownToAst(markdown: Markdown) {
    // Preprocess HTML tags to special markers
    const preprocessed = this._preprocessHtmlTags(markdown);

    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
    const ast = processor.parse(preprocessed);
    return processor.runSync(ast);
  }

  async fromBlockSnapshot({
    snapshot,
    assets,
  }: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<Markdown>> {
    const root: Root = {
      type: 'root',
      children: [],
    };
    const { ast, assetsIds } = await this._traverseSnapshot(snapshot, root, assets);
    return {
      file: this._astToMarkdown(ast),
      assetsIds,
    };
  }

  async fromDocSnapshot({
    snapshot,
    assets,
  }: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<Markdown>> {
    let buffer = '';
    const { file, assetsIds } = await this.fromBlockSnapshot({
      snapshot: snapshot.blocks,
      assets,
    });
    buffer += file;
    return {
      file: buffer,
      assetsIds,
    };
  }

  async fromSliceSnapshot({
    snapshot,
    assets,
  }: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<Markdown>> {
    let buffer = '';
    const sliceAssetsIds: string[] = [];
    for (const contentSlice of snapshot.content) {
      const root: Root = {
        type: 'root',
        children: [],
      };
      const { ast, assetsIds } = await this._traverseSnapshot(contentSlice, root, assets);
      sliceAssetsIds.push(...assetsIds);
      buffer += this._astToMarkdown(ast);
    }
    const markdown = buffer.match(/\n/g)?.length === 1 ? buffer.trimEnd() : buffer;
    return {
      file: markdown,
      assetsIds: sliceAssetsIds,
    };
  }

  async toBlockSnapshot(payload: ToBlockSnapshotPayload<Markdown>): Promise<BlockSnapshot> {
    const markdownFile = this.preprocessorManager.process('block', payload.file);
    const markdownAst = this._markdownToAst(markdownFile);
    const blockSnapshotRoot = {
      type: 'block',
      id: nanoid(),
      flavour: 'ink:note',
      props: {
        xywh: '[0,0,800,95]',
        background: DefaultTheme.noteBackgrounColor,
        index: 'a0',
        hidden: false,
        displayMode: NoteDisplayMode.DocAndEdgeless,
      },
      children: [],
    };
    return this._traverseMarkdown(markdownAst, blockSnapshotRoot as BlockSnapshot, payload.assets);
  }

  async toDocSnapshot(payload: ToDocSnapshotPayload<Markdown>): Promise<DocSnapshot> {
    const markdownFile = this.preprocessorManager.process('doc', payload.file);
    const markdownAst = this._markdownToAst(markdownFile);
    const blockSnapshotRoot = {
      type: 'block',
      id: nanoid(),
      flavour: 'ink:note',
      props: {
        xywh: '[0,0,800,95]',
        background: DefaultTheme.noteBackgrounColor,
        index: 'a0',
        hidden: false,
        displayMode: NoteDisplayMode.DocAndEdgeless,
      },
      children: [],
    };
    return {
      type: 'page',
      meta: {
        id: nanoid(),
        title: 'Untitled',
        createDate: Date.now(),
        tags: [],
      },
      blocks: {
        type: 'block',
        id: nanoid(),
        flavour: 'ink:page',
        props: {
          title: {
            '$stone:internal:text$': true,
            delta: [
              {
                insert: 'Untitled',
              },
            ],
          },
        },
        children: [
          {
            type: 'block',
            id: nanoid(),
            flavour: 'ink:surface',
            props: {
              elements: {},
            },
            children: [],
          },
          await this._traverseMarkdown(
            markdownAst,
            blockSnapshotRoot as BlockSnapshot,
            payload.assets,
          ),
        ],
      },
    };
  }

  async toSliceSnapshot(payload: MarkdownToSliceSnapshotPayload): Promise<SliceSnapshot | null> {
    const markdownFile = this.preprocessorManager.process('slice', payload.file);
    const markdownAst = this._markdownToAst(markdownFile);
    const blockSnapshotRoot = {
      type: 'block',
      id: nanoid(),
      flavour: 'ink:note',
      props: {
        xywh: '[0,0,800,95]',
        background: DefaultTheme.noteBackgrounColor,
        index: 'a0',
        hidden: false,
        displayMode: NoteDisplayMode.DocAndEdgeless,
      },
      children: [],
    } as BlockSnapshot;
    const contentSlice = (await this._traverseMarkdown(
      markdownAst,
      blockSnapshotRoot,
      payload.assets,
    )) as BlockSnapshot;
    if (contentSlice.children.length === 0) {
      return null;
    }
    return {
      type: 'slice',
      content: [contentSlice],
      workspaceId: payload.workspaceId,
      pageId: payload.pageId,
    };
  }
}

export const MarkdownAdapterFactoryIdentifier = AdapterFactoryIdentifier('Markdown');

export const MarkdownAdapterFactoryExtension: ExtensionType = {
  setup: (di) => {
    di.addImpl(MarkdownAdapterFactoryIdentifier, (provider) => ({
      get: (job: Transformer) => new MarkdownAdapter(job, provider),
    }));
  },
};
