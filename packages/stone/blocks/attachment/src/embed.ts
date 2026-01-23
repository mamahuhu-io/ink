import {
  type AttachmentBlockModel,
  type ImageBlockProps,
  MAX_IMAGE_WIDTH,
} from '@ink/stone-model';
import {
  readImageSize,
  transformModel,
  withTempBlobData,
} from '@ink/stone-shared/utils';
import type { Container } from '@ink/stone-global/di';
import { createIdentifier } from '@ink/stone-global/di';
import { Bound } from '@ink/stone-global/gfx';
import { type BlockStdScope, StdIdentifier } from '@ink/stone-std';
import type { ExtensionType } from '@ink/stone-store';
import { Extension } from '@ink/stone-store';

import { getAttachmentBlob } from './utils';

export type AttachmentEmbedConfig = {
  name: string;
  /**
   * Check if the attachment can be turned into embed view.
   */
  check: (model: AttachmentBlockModel) => boolean;
  /**
   * The action will be executed when the attachment needs to be converted.
   */
  action?: (
    model: AttachmentBlockModel,
    std: BlockStdScope
  ) => Promise<void> | void;
};

// Single embed config.
export const AttachmentEmbedConfigIdentifier =
  createIdentifier<AttachmentEmbedConfig>(
    'InkAttachmentEmbedConfigIdentifier'
  );

export function AttachmentEmbedConfigExtension(
  configs: AttachmentEmbedConfig[] = embedConfig
): ExtensionType {
  return {
    setup: di => {
      configs.forEach(option => {
        di.addImpl(AttachmentEmbedConfigIdentifier(option.name), () => option);
      });
    },
  };
}

// A embed config map.
export const AttachmentEmbedConfigMapIdentifier = createIdentifier<
  Map<string, AttachmentEmbedConfig>
>('InkAttachmentEmbedConfigMapIdentifier');

export const AttachmentEmbedProvider = createIdentifier<AttachmentEmbedService>(
  'InkAttachmentEmbedProvider'
);

export class AttachmentEmbedService extends Extension {
  get configs(): Map<string, AttachmentEmbedConfig> {
    return this.std.get(AttachmentEmbedConfigMapIdentifier);
  }

  constructor(private readonly std: BlockStdScope) {
    super();
  }

  static override setup(di: Container) {
    di.addImpl(AttachmentEmbedConfigMapIdentifier, provider =>
      provider.getAll(AttachmentEmbedConfigIdentifier)
    );
    di.addImpl(AttachmentEmbedProvider, this, [StdIdentifier]);
  }

  /**
   * Check if the attachment should be converted to another block type (e.g., image).
   */
  shouldBeConverted(model: AttachmentBlockModel) {
    return Array.from(this.configs.values()).some(config => config.check(model));
  }

  /**
   * Convert the attachment to another block type if applicable.
   */
  convertTo(model: AttachmentBlockModel) {
    const config = Array.from(this.configs.values()).find(config =>
      config.check(model)
    );

    if (config?.action) {
      config.action(model, this.std)?.catch(console.error);
    }
  }
}

// Only keep image conversion - converts image attachments to image blocks
const embedConfig: AttachmentEmbedConfig[] = [
  {
    name: 'image',
    check: model =>
      model.store.schema.flavourSchemaMap.has('ink:image') &&
      model.props.type.startsWith('image/'),
    async action(model, std) {
      const component = std.view.getBlock(model.id);
      if (!component) return;

      await turnIntoImageBlock(model);
    },
  },
];

/**
 * Turn the attachment block into an image block.
 */
async function turnIntoImageBlock(model: AttachmentBlockModel) {
  if (!model.store.schema.flavourSchemaMap.has('ink:image')) {
    console.error('The image flavour is not supported!');
    return;
  }

  const sourceId = model.props.sourceId;
  if (!sourceId) return;

  const { saveAttachmentData, getImageData } = withTempBlobData();
  saveAttachmentData(sourceId, { name: model.props.name });

  let imageSize = model.props.sourceId
    ? getImageData(model.props.sourceId)
    : undefined;

  const bounds = model.xywh
    ? Bound.fromXYWH(model.deserializedXYWH)
    : undefined;

  if (bounds) {
    if (!imageSize?.width || !imageSize?.height) {
      const blob = await getAttachmentBlob(model);
      if (blob) {
        imageSize = await readImageSize(blob);
      }
    }

    if (imageSize?.width && imageSize?.height) {
      const p = imageSize.height / imageSize.width;
      imageSize.width = Math.min(imageSize.width, MAX_IMAGE_WIDTH);
      imageSize.height = imageSize.width * p;
      bounds.w = imageSize.width;
      bounds.h = imageSize.height;
    }
  }

  const others = bounds ? { xywh: bounds.serialize() } : undefined;

  const imageProp: Partial<ImageBlockProps> = {
    sourceId,
    caption: model.props.caption,
    size: model.props.size,
    ...imageSize,
    ...others,
  };
  transformModel(model, 'ink:image', imageProp);
}
