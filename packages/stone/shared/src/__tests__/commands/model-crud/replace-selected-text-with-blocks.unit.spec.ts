/**
 * @vitest-environment happy-dom
 */
import type { TextSelection } from '@ink/stone-std';
import { describe, expect, it } from 'vitest';

import { replaceSelectedTextWithBlocksCommand } from '../../../commands/model-crud/replace-selected-text-with-blocks';
import { ink, block } from '../../../test-utils';

describe('commands/model-crud', () => {
  describe('replaceSelectedTextWithBlocksCommand', () => {
    it('should replace selected text with blocks when both first and last blocks are mergable blocks', () => {
      const host = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel<anchor />lo</ink-paragraph>
            <ink-paragraph id="paragraph-2">Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph id="111">111</ink-paragraph>`,
        block`<ink-code id="code"></ink-code>`,
        block`<ink-paragraph id="222">222</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel111</ink-paragraph>
            <ink-code id="code"></ink-code>
            <ink-paragraph id="paragraph-2">222ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are mergable blocks in single paragraph', () => {
      const host = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel<anchor></anchor>lo Wor<focus></focus>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph id="111">111</ink-paragraph>`,
        block`<ink-code id="code"></ink-code>`,
        block`<ink-paragraph id="222">222</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel111</ink-paragraph>
            <ink-code id="code"></ink-code>
            <ink-paragraph id="222">222ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when blocks contains only one mergable block', () => {
      const host = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel<anchor />lo</ink-paragraph>
            <ink-paragraph id="paragraph-2">Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [block`<ink-paragraph id="111">111</ink-paragraph>`]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel111ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when blocks contains only one mergable block in single paragraph', () => {
      const host = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel<anchor></anchor>lo Wor<focus></focus>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [block`<ink-paragraph id="111">111</ink-paragraph>`]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page id="page">
          <ink-note id="note">
            <ink-paragraph id="paragraph-1">Hel111ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only first block is mergable block', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor />lo</ink-paragraph>
            <ink-paragraph>Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph>111</ink-paragraph>`,
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-paragraph>Hel111</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only first block is mergable block in single paragraph', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph>111</ink-paragraph>`,
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel111</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only last block is mergable block', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor />lo</ink-paragraph>
            <ink-paragraph>Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
        block`<ink-paragraph>111</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-paragraph>Hel</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>111ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when only last block is mergable block in single paragraph', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
        block`<ink-paragraph>111</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>111ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when neither first nor last block is mergable block', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor />lo</ink-paragraph>
            <ink-paragraph>Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-paragraph>Hel</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when neither first nor last block is mergable block in single paragraph', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor></anchor>lo Wor<focus></focus>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-code></ink-code>`,
        block`<ink-code></ink-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel</ink-paragraph>
            <ink-code></ink-code>
            <ink-code></ink-code>
            <ink-paragraph>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are mergable blocks with different types', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-paragraph>Hel<anchor />lo</ink-paragraph>
            <ink-paragraph>Wor<focus />ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-list>1.</ink-list>`,
        block`<ink-list>2.</ink-list>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-paragraph>Hel</ink-paragraph>
            <ink-list>1.</ink-list>
            <ink-list>2.</ink-list>
            <ink-paragraph>ld</ink-paragraph>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when both first and last blocks are paragraphs, and cursor is at the end of the text-block with different types', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-list>Hel<anchor />lo</ink-list>
            <ink-list>Wor<focus />ld</ink-list>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph>111</ink-paragraph>`,
        block`<ink-paragraph>222</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-list>Hel111</ink-list>
            <ink-list>222ld</ink-list>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when first block is paragraph, and cursor is at the end of the text-block with different type  ', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-list>Hel<anchor />lo</ink-list>
            <ink-list>Wor<focus />ld</ink-list>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-paragraph>111</ink-paragraph>`,
        block`<ink-code></ink-code>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-list>Hel111</ink-list>
            <ink-code></ink-code>
            <ink-list>ld</ink-list>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });

    it('should replace selected text with blocks when last block is paragraph, and cursor is at the end of the text-block with different type  ', () => {
      const host = ink`
        <ink-page>
          <ink-note>
            <ink-list>Hel<anchor />lo</ink-list>
            <ink-list>Wor<focus />ld</ink-list>
          </ink-note>
        </ink-page>
      `;

      const blocks = [
        block`<ink-code></ink-code>`,
        block`<ink-paragraph>222</ink-paragraph>`,
      ]
        .filter((b): b is NonNullable<typeof b> => b !== null)
        .map(b => b.model);

      const textSelection = host.selection.value[0] as TextSelection;

      host.command.exec(replaceSelectedTextWithBlocksCommand, {
        textSelection,
        blocks,
      });

      const expected = ink`
        <ink-page>
          <ink-note >
            <ink-list>Hel</ink-list>
            <ink-code></ink-code>
            <ink-list>222ld</ink-list>
          </ink-note>
        </ink-page>
      `;
      expect(host.store).toEqualDoc(expected.store);
    });
  });
});
