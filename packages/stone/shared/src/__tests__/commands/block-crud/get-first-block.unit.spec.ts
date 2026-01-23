/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';

import { getFirstBlockCommand } from '../../../commands/block-crud/get-first-content-block';
import { ink } from '../../../test-utils';

describe('commands/block-crud', () => {
  describe('getFirstBlockCommand', () => {
    it('should return null when root is not exists', () => {
      const host = ink`<ink-page></ink-page>`;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'content',
        root: undefined,
      });

      expect(firstBlock).toBeNull();
    });

    it('should return first block with content role when found', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1-1">First Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-1-2">Second Paragraph</ink-paragraph>
          </ink-note>
          <ink-note id="note-2">
            <ink-paragraph id="paragraph-2-1">First Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2-2">Second Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'hub',
        root: undefined,
      });

      expect(firstBlock?.id).toBe('note-1');
    });

    it('should return first block with any role in the array when found', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1-1">First Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-1-2">Second Paragraph</ink-paragraph>
          </ink-note>
          <ink-note id="note-2">
            <ink-paragraph id="paragraph-2-1">First Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2-2">Second Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: ['hub', 'content'],
        root: undefined,
      });

      expect(firstBlock?.id).toBe('note-1');
    });

    it('should return first block with specified flavour when found', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Paragraph</ink-paragraph>
            <ink-list id="list-1">List Item</ink-list>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        flavour: 'ink:list',
        root: note,
      });

      expect(firstBlock?.id).toBe('list-1');
    });

    it('should return first block with any flavour in the array when found', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Paragraph</ink-paragraph>
            <ink-list id="list-1">List Item</ink-list>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        flavour: ['ink:list', 'ink:code'],
        root: note,
      });

      expect(firstBlock?.id).toBe('list-1');
    });

    it('should return first block matching both role and flavour when both specified', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Content Paragraph</ink-paragraph>
            <ink-list id="list-1">Content List</ink-list>
            <ink-paragraph id="paragraph-2">hub Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;
      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'content',
        flavour: 'ink:list',
        root: note,
      });

      expect(firstBlock?.id).toBe('list-1');
    });

    it('should return first block with default roles when role not specified', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">hub Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2">Content Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-3">Hub Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        root: undefined,
      });

      expect(firstBlock?.id).toBe('note-1');
    });

    it('should return first block with specified role when found', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Content Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2">hub Paragraph</ink-paragraph>
            <ink-database id="database-1">Database</ink-database>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'hub',
        root: note,
      });

      expect(firstBlock?.id).toBe('database-1');
    });

    it('should return null when no blocks with specified role are found in children', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Content Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2">Another Content Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'hub',
        root: note,
      });

      expect(firstBlock).toBeNull();
    });

    it('should return null when no blocks with specified flavour are found in children', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1">Paragraph</ink-paragraph>
            <ink-paragraph id="paragraph-2">Another Paragraph</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-1')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        flavour: 'ink:list',
        root: note,
      });

      expect(firstBlock).toBeNull();
    });

    it('should return first block with specified role within specified root subtree', () => {
      const host = ink`
        <ink-page>
          <ink-note id="note-1">
            <ink-paragraph id="paragraph-1-1">1-1 Content</ink-paragraph>
            <ink-paragraph id="paragraph-1-2">1-2 hub</ink-paragraph>
          </ink-note>
          <ink-note id="note-2">
            <ink-paragraph id="paragraph-2-1">2-1 hub</ink-paragraph>
            <ink-paragraph id="paragraph-2-2">2-2 Content</ink-paragraph>
          </ink-note>
        </ink-page>
      `;

      const note = host.store.getBlock('note-2')?.model;

      const [_, { firstBlock }] = host.command.exec(getFirstBlockCommand, {
        role: 'content',
        root: note,
      });

      expect(firstBlock?.id).toBe('paragraph-2-1');
    });
  });
});
