import { ask, message } from '@tauri-apps/plugin-dialog';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

import i18n from '../i18n';

export async function checkForAppUpdates(silent: boolean = false) {
  try {
    const update = await check();

    if (update) {
      console.log(`[Updater] Update found: ${update.version}`);

      const shouldInstall = await ask(
        `${i18n.t('updater.message', { version: update.version })}\n\n${i18n.t('updater.releaseNotes')}\n${update.body || i18n.t('updater.noReleaseNotes')}\n\n${i18n.t('updater.installConfirm')}`,
        {
          title: i18n.t('updater.title'),
          kind: 'info',
          okLabel: i18n.t('updater.installAndRestart'),
          cancelLabel: i18n.t('updater.later'),
        },
      );

      if (shouldInstall) {
        console.log('[Updater] User confirmed update. Downloading...');

        // TODO: In a real app we might want to show a progress bar or blocking dialog
        // For now, we rely on the OS/Tauri behavior which might be silent until restart

        await update.downloadAndInstall();
        console.log('[Updater] Update installed. Restarting...');

        await relaunch();
      }
    } else {
      console.log('[Updater] No updates available');
      if (!silent) {
        await message(i18n.t('updater.latestVersion'), {
          title: i18n.t('updater.noUpdates'),
          kind: 'info',
        });
      }
    }
  } catch (error: any) {
    console.error('[Updater] Failed to check for updates:', error);

    if (!silent) {
      let errorMessage = error.toString();

      // Provide friendlier error messages for common issues
      if (
        errorMessage.includes('Could not fetch a valid release JSON') ||
        errorMessage.includes('404')
      ) {
        errorMessage = i18n.t('updater.invalidJson');
      } else if (
        errorMessage.includes('Network Error') ||
        errorMessage.includes('Failed to fetch')
      ) {
        errorMessage = i18n.t('updater.networkError');
      } else {
        errorMessage = i18n.t('updater.checkFailed', { error: errorMessage });
      }

      await message(errorMessage, {
        title: i18n.t('updater.error'),
        kind: 'error',
      });
    }
  }
}
