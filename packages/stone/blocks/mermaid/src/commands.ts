import type { MermaidProps } from '@ink/stone-model';
import {
  DocModeProvider,
  TelemetryProvider,
} from '@ink/stone-shared/services';
import type { Command } from '@ink/stone-std';
import type { BlockModel } from '@ink/stone-store';

import { MermaidBlockComponent } from './mermaid-block.js';

export const insertMermaidBlockCommand: Command<
  {
    code?: string;
    place?: 'after' | 'before';
    removeEmptyLine?: boolean;
    selectedModels?: BlockModel[];
  },
  {
    insertedMermaidBlockId: Promise<string>;
  }
> = (ctx, next) => {
  const { selectedModels, code, place, removeEmptyLine, std } = ctx;
  if (!selectedModels?.length) return;

  const targetModel =
    place === 'before'
      ? selectedModels[0]
      : selectedModels[selectedModels.length - 1];

  const mermaidBlockProps: Partial<MermaidProps> & {
    flavour: 'ink:mermaid';
  } = {
    flavour: 'ink:mermaid',
    code: code ?? '',
  };

  const result = std.store.addSiblingBlocks(
    targetModel,
    [mermaidBlockProps],
    place
  );
  if (result.length === 0) return;

  if (removeEmptyLine && targetModel.text?.length === 0) {
    std.store.deleteBlock(targetModel);
  }

  next({
    insertedMermaidBlockId: std.host.updateComplete.then(async () => {
      if (!code) {
        const blockComponent = std.view.getBlock(result[0]);
        if (blockComponent instanceof MermaidBlockComponent) {
          await blockComponent.updateComplete;
          blockComponent.toggleEditor();

          const mode = std.get(DocModeProvider).getEditorMode() ?? 'page';
          const ifEdgelessText = blockComponent.closest('ink-edgeless-text');
          std.getOptional(TelemetryProvider)?.track('Mermaid', {
            from:
              mode === 'page'
                ? 'doc'
                : ifEdgelessText
                  ? 'edgeless text'
                  : 'edgeless note',
            page: mode === 'page' ? 'doc' : 'edgeless',
            segment: mode === 'page' ? 'doc' : 'whiteboard',
            module: 'diagram',
            control: 'create diagram',
          });
        }
      }
      return result[0];
    }),
  });
};
