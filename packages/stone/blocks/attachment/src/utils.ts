import { toast } from '@ink/stone-components/toast';
import {
  type AttachmentBlockModel,
  type AttachmentBlockProps,
  AttachmentBlockSchema,
} from '@ink/stone-model';
import {
  type AttachmentUploadedEvent,
  FileSizeLimitProvider,
  TelemetryProvider,
} from '@ink/stone-shared/services';
import { formatSize } from '@ink/stone-shared/utils';
import type { BlockStdScope } from '@ink/stone-std';
import type { BlockModel } from '@ink/stone-store';

import type { AttachmentBlockComponent } from './attachment-block';

export async function getAttachmentBlob(model: AttachmentBlockModel) {
  const { sourceId$, type$ } = model.props;
  const sourceId = sourceId$.peek();
  const type = type$.peek();
  if (!sourceId) return null;

  const doc = model.store;
  const blob = await doc.blobSync.get(sourceId);
  if (!blob) return null;

  return new Blob([blob], { type });
}

export async function refreshData(block: AttachmentBlockComponent) {
  const model = block.model;
  const type = model.props.type$.peek();

  await block.resourceController.refreshUrlWith(type);
}

export async function getFileType(file: File) {
  if (file.type) return file.type;

  // If the file type is not available, try to get it from the buffer.
  const buffer = await file.arrayBuffer();
  const FileType = await import('file-type');
  const fileType = await FileType.fileTypeFromBuffer(buffer);
  return fileType?.mime ?? '';
}

function hasExceeded(
  std: BlockStdScope,
  files: File[],
  maxFileSize = std.get(FileSizeLimitProvider).maxFileSize,
) {
  const exceeded = files.some((file) => file.size > maxFileSize);

  if (exceeded) {
    const size = formatSize(maxFileSize);
    toast(std.host, `You can only upload files less than ${size}`);
  }

  return exceeded;
}

async function buildPropsWith(std: BlockStdScope, file: File) {
  let type = file.type;
  let category: AttachmentUploadedEvent['category'] = 'success';

  try {
    const { name, size } = file;
    const sourceId = await std.store.blobSync.set(file);
    type = await getFileType(file);

    return {
      name,
      size,
      type,
      sourceId,
    } satisfies Partial<AttachmentBlockProps>;
  } catch (err) {
    category = 'failure';
    throw err;
  } finally {
    std.getOptional(TelemetryProvider)?.track('AttachmentUploadedEvent', {
      page: 'doc editor',
      module: 'attachment',
      segment: 'doc',
      control: 'uploader',
      type,
      category,
    });
  }
}

/**
 * Add a new attachment block before / after the specified block.
 */
export async function addSiblingAttachmentBlocks(
  std: BlockStdScope,
  files: File[],
  targetModel: BlockModel,
  placement: 'before' | 'after' = 'after',
) {
  if (!files.length) return [];

  if (hasExceeded(std, files)) return [];

  const flavour = AttachmentBlockSchema.model.flavour;

  const propsArray = await Promise.all(files.map((file) => buildPropsWith(std, file)));

  const blockIds = std.store.addSiblingBlocks(
    targetModel,
    propsArray.map((props) => ({ ...props, flavour })),
    placement,
  );

  return blockIds;
}

export async function addAttachments(
  std: BlockStdScope,
  files: File[],
  targetModel: BlockModel,
  placement: 'before' | 'after' = 'after',
): Promise<string[]> {
  return addSiblingAttachmentBlocks(std, files, targetModel, placement);
}
