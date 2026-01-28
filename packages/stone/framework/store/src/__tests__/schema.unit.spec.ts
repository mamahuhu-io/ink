import { literal } from 'lit/static-html.js';
import { describe, expect, it, vi } from 'vitest';

import { BlockSchemaExtension } from '../extension/schema.js';
import { defineBlockSchema } from '../model/block/zod.js';
// import some blocks
import { SchemaValidateError } from '../schema/error.js';
import { createAutoIncrementIdGenerator } from '../test/index.js';
import { TestWorkspace } from '../test/test-workspace.js';
import {
  DividerBlockSchemaExtension,
  ListBlockSchemaExtension,
  NoteBlockSchemaExtension,
  ParagraphBlockSchemaExtension,
  RootBlockSchemaExtension,
} from './test-schema.js';

function createTestOptions() {
  const idGenerator = createAutoIncrementIdGenerator();
  return { id: 'test-collection', idGenerator };
}

const TestCustomNoteBlockSchema = defineBlockSchema({
  flavour: 'ink:note-block-video',
  props: (internal) => ({
    text: internal.Text(),
  }),
  metadata: {
    version: 1,
    role: 'content',
    tag: literal`ink-note-block-video`,
    parent: ['ink:note'],
  },
});

const TestCustomNoteBlockSchemaExtension = BlockSchemaExtension(TestCustomNoteBlockSchema);

const TestInvalidNoteBlockSchema = defineBlockSchema({
  flavour: 'ink:note-invalid-block-video',
  props: (internal) => ({
    text: internal.Text(),
  }),
  metadata: {
    version: 1,
    role: 'content',
    tag: literal`ink-invalid-note-block-video`,
    parent: ['ink:note'],
  },
});

const TestInvalidNoteBlockSchemaExtension = BlockSchemaExtension(TestInvalidNoteBlockSchema);

const TestRoleBlockSchema = defineBlockSchema({
  flavour: 'ink:note-block-role-test',
  metadata: {
    version: 1,
    role: 'content',
    parent: ['ink:note'],
    children: ['@test'],
  },
  props: (internal) => ({
    text: internal.Text(),
  }),
});

const TestRoleBlockSchemaExtension = BlockSchemaExtension(TestRoleBlockSchema);

const TestParagraphBlockSchema = defineBlockSchema({
  flavour: 'ink:test-paragraph',
  metadata: {
    version: 1,
    role: 'test',
    parent: ['@content'],
  },
});

const TestParagraphBlockSchemaExtension = BlockSchemaExtension(TestParagraphBlockSchema);

const extensions = [
  RootBlockSchemaExtension,
  ParagraphBlockSchemaExtension,
  ListBlockSchemaExtension,
  NoteBlockSchemaExtension,
  DividerBlockSchemaExtension,
  TestCustomNoteBlockSchemaExtension,
  TestInvalidNoteBlockSchemaExtension,
  TestRoleBlockSchemaExtension,
  TestParagraphBlockSchemaExtension,
];

const defaultDocId = 'doc0';
function createTestDoc(docId = defaultDocId) {
  const options = createTestOptions();
  const collection = new TestWorkspace(options);
  collection.meta.initialize();
  const doc = collection.createDoc(docId);
  doc.load();
  const store = doc.getStore({ extensions });
  return store;
}

describe('schema', () => {
  it('should be able to validate schema by role', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('ink:page', {});
    const noteId = doc.addBlock('ink:note', {}, rootId);
    const paragraphId = doc.addBlock('ink:paragraph', {}, noteId);

    doc.addBlock('ink:note', {});
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    // add paragraph to root should throw
    doc.addBlock('ink:paragraph', {}, rootId);
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    doc.addBlock('ink:note', {}, rootId);
    doc.addBlock('ink:paragraph', {}, noteId);
    doc.addBlock('ink:paragraph', {}, paragraphId);
    expect(consoleMock).not.toBeCalled();
  });

  it('should glob match works', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('ink:page', {});
    const noteId = doc.addBlock('ink:note', {}, rootId);

    doc.addBlock('ink:note-block-video', {}, noteId);
    expect(consoleMock).not.toBeCalled();

    doc.addBlock('ink:note-invalid-block-video', {}, noteId);
    expect(consoleMock.mock.calls[0]).toSatisfy((call: unknown[]) => {
      return typeof call[0] === 'string';
    });
    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });
  });

  it('should be able to validate schema by role', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const doc = createTestDoc();
    const rootId = doc.addBlock('ink:page', {});
    const noteId = doc.addBlock('ink:note', {}, rootId);
    const roleId = doc.addBlock('ink:note-block-role-test', {}, noteId);

    doc.addBlock('ink:paragraph', {}, roleId);
    doc.addBlock('ink:paragraph', {}, roleId);

    expect(consoleMock.mock.calls[1]).toSatisfy((call: unknown[]) => {
      return call[0] instanceof SchemaValidateError;
    });

    consoleMock.mockClear();
    doc.addBlock('ink:test-paragraph', {}, roleId);
    doc.addBlock('ink:test-paragraph', {}, roleId);
    expect(consoleMock).not.toBeCalled();

    expect(doc.getBlocksByFlavour('ink:test-paragraph')).toHaveLength(2);
  });
});
