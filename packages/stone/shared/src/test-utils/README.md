# InkStone Test Tools

## Structured Document Creation

`ink-template.ts` provides a concise way to create test documents, using a html-like syntax.

### Basic Usage

```typescript
import { ink } from '@ink/stone-shared/test-utils';

// Create a simple document
const doc = ink`
  <ink-page>
    <ink-note>
      <ink-paragraph>Hello, World!</ink-paragraph>
    </ink-note>
  </ink-page>
`;
```

### Complex Structure Example

```typescript
// Create a document with multiple notes and paragraphs
const doc = ink`
  <ink-page title="My Test Page">
    <ink-note>
      <ink-paragraph>First paragraph</ink-paragraph>
      <ink-paragraph>Second paragraph</ink-paragraph>
    </ink-note>
    <ink-note>
      <ink-paragraph>Another note</ink-paragraph>
    </ink-note>
  </ink-page>
`;
```

### Application in Tests

This tool is particularly suitable for creating documents with specific structures in test cases:

```typescript
import { describe, expect, it } from 'vitest';
import { ink } from '../__tests__/utils/ink-template';

describe('My Test', () => {
  it('should correctly handle document structure', () => {
    const doc = ink`
      <ink-page>
        <ink-note>
          <ink-paragraph>Test content</ink-paragraph>
        </ink-note>
      </ink-page>
    `;

    // Get blocks
    const pages = doc.getBlocksByFlavour('ink:page');
    const notes = doc.getBlocksByFlavour('ink:note');
    const paragraphs = doc.getBlocksByFlavour('ink:paragraph');

    expect(pages.length).toBe(1);
    expect(notes.length).toBe(1);
    expect(paragraphs.length).toBe(1);

    // Perform more tests here...
  });
});
```

### Supported Block Types

Currently supports the following block types:

- `ink-page` → `ink:page`
- `ink-note` → `ink:note`
- `ink-paragraph` → `ink:paragraph`
- `ink-list` → `ink:list`
- `ink-image` → `ink:image`
