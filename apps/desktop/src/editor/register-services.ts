import { ViewExtensionProvider } from '@ink/stone-ext-loader';
import { IconPickerServiceExtension } from '@ink/stone-shared/services';

/**
 * Custom view extension provider to register services
 */
export class ServiceRegistryViewExtension extends ViewExtensionProvider {
  override name = 'ServiceRegistryViewExtension';

  override setup(context: any) {
    super.setup(context);
    // Register all service extensions
    context.register([
      IconPickerServiceExtension(),
    ]);
  }
}

/**
 * Register custom services for the Ink desktop application
 */
export const registerServices = () => {
  return [
    // Register IconPickerService for Callout block emoji picker
    ServiceRegistryViewExtension,
  ];
};