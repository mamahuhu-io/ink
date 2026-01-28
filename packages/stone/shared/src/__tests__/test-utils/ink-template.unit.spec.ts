import { TextSelection } from '@ink/stone-std';
import { describe, expect, it } from 'vitest';

import { ink } from '../../test-utils';

describe('helpers/ink-template', () => {
  it('should create a basic document structure from template', () => {
    const host = ink`
      <ink-page id="page">
        <ink-note id="note">
          <ink-paragraph id="paragraph-1">Hello, world</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    expect(host.store).toBeDefined();

    const pageBlock = host.store.getBlock('page');
    expect(pageBlock).toBeDefined();
    expect(pageBlock?.flavour).toBe('ink:page');

    const noteBlock = host.store.getBlock('note');
    expect(noteBlock).toBeDefined();
    expect(noteBlock?.flavour).toBe('ink:note');

    const paragraphBlock = host.store.getBlock('paragraph-1');
    expect(paragraphBlock).toBeDefined();
    expect(paragraphBlock?.flavour).toBe('ink:paragraph');
  });

  it('should handle nested blocks correctly', () => {
    const host = ink`
      <ink-page>
        <ink-note>
          <ink-paragraph>First paragraph</ink-paragraph>
          <ink-list>List item</ink-list>
          <ink-paragraph>Second paragraph</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const noteBlocks = host.store.getBlocksByFlavour('ink:note');
    const paragraphBlocks = host.store.getBlocksByFlavour('ink:paragraph');
    const listBlocks = host.store.getBlocksByFlavour('ink:list');

    expect(noteBlocks.length).toBe(1);
    expect(paragraphBlocks.length).toBe(2);
    expect(listBlocks.length).toBe(1);

    const noteBlock = noteBlocks[0];
    const noteChildren = host.store.getBlock(noteBlock.id)?.model.children || [];
    expect(noteChildren.length).toBe(3);

    expect(noteChildren[0].flavour).toBe('ink:paragraph');
    expect(noteChildren[1].flavour).toBe('ink:list');
    expect(noteChildren[2].flavour).toBe('ink:paragraph');
  });

  it('should handle empty blocks correctly', () => {
    const host = ink`
      <ink-page>
        <ink-note>
          <ink-paragraph></ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const paragraphBlocks = host.store.getBlocksByFlavour('ink:paragraph');
    expect(paragraphBlocks.length).toBe(1);

    const paragraphBlock = host.store.getBlock(paragraphBlocks[0].id);
    const paragraphText = paragraphBlock?.model.text?.toString() || '';
    expect(paragraphText).toBe('');
  });

  it('should throw error on invalid template', () => {
    expect(() => {
      ink`
        <unknown-tag></unknown-tag>
      `;
    }).toThrow();
  });

  it('should handle text selection with anchor and focus', () => {
    const host = ink`
      <ink-page id="page">
        <ink-note id="note">
          <ink-paragraph id="paragraph-1">Hel<anchor />lo</ink-paragraph>
          <ink-paragraph id="paragraph-2">Wo<focus />rld</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(3);
    expect(selection.from.length).toBe(2);
    expect(selection.to?.blockId).toBe('paragraph-2');
    expect(selection.to?.index).toBe(0);
    expect(selection.to?.length).toBe(2);
  });

  it('should handle cursor position', () => {
    const host = ink`
      <ink-page id="page">
        <ink-note id="note">
          <ink-paragraph id="paragraph-1">Hello<cursor />World</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(5);
    expect(selection.from.length).toBe(0);
    expect(selection.to).toBeNull();
  });

  it('should handle selection in empty blocks', () => {
    const host = ink`
      <ink-page id="page">
        <ink-note id="note">
          <ink-paragraph id="paragraph-1"><cursor /></ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(0);
    expect(selection.from.length).toBe(0);
    expect(selection.to).toBeNull();
  });

  it('should handle single point selection', () => {
    const host = ink`
      <ink-page id="page">
        <ink-note id="note">
          <ink-paragraph id="paragraph-1">Hello<anchor></anchor>World<focus></focus>Ink</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    const selection = host.selection.value[0] as TextSelection;
    expect(selection).toBeDefined();
    expect(selection.is(TextSelection)).toBe(true);
    expect(selection.from.blockId).toBe('paragraph-1');
    expect(selection.from.index).toBe(5);
    expect(selection.from.length).toBe(5);
    expect(selection.to).toBeNull();
  });
});
