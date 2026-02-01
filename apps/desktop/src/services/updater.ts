import { ask, message } from '@tauri-apps/plugin-dialog';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

import i18n from '../i18n';
import { usePreferencesStore } from '../stores/preferences';
import { useUpdaterStore } from '../stores/updater';
import { showErrorToast } from './toast';

export async function checkForAppUpdates(silent: boolean = false) {
  const store = useUpdaterStore.getState();

  // If already busy, don't start another check
  if (store.status === 'checking' || store.status === 'downloading') {
    return;
  }

  store.setStatus('checking');
  store.setError(null);

  try {
    const update = await check();

    if (update) {
      console.log(`[Updater] Update found: ${update.version}`);

      // Check if this version was skipped by user
      const { skippedVersion } = usePreferencesStore.getState();
      if (update.version === skippedVersion) {
        console.log(`[Updater] Skipping version ${update.version} (user requested)`);
        store.setStatus('idle');
        store.setUpdateInfo(null);
        return;
      }

      store.setUpdateInfo(update);
      store.setStatus('available');

      // Only show dialog if silent (startup check), otherwise let the UI handle it
      if (silent) {
        const shouldUpdate = await ask(
          `${i18n.t('updater.message', { version: update.version })}\n\n${i18n.t('updater.releaseNotes')}\n${update.body || i18n.t('updater.noReleaseNotes')}\n\n${i18n.t('updater.installConfirm')}`,
          {
            title: i18n.t('updater.title'),
            kind: 'info',
            okLabel: i18n.t('updater.installAndRestart'), // "Download & Update"
            cancelLabel: i18n.t('updater.later'),
          },
        );

        if (shouldUpdate) {
          // If confirmed via dialog, proceed to download immediately
          await downloadAndInstallUpdate();
        }
      }
    } else {
      console.log('[Updater] No updates available');
      store.setStatus('idle');
      store.setUpdateInfo(null);

      if (!silent) {
        await message(i18n.t('updater.latestVersion'), {
          title: i18n.t('updater.noUpdates'),
          kind: 'info',
        });
      }
    }
  } catch (error: any) {
    console.error('[Updater] Failed to check for updates:', error);
    store.setError(error.toString());

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

export async function downloadAndInstallUpdate() {
  const store = useUpdaterStore.getState();
  const update = store.updateInfo;

  if (!update) {
    console.error('[Updater] No update info available to download');
    return;
  }

  store.setStatus('downloading');
  console.log('[Updater] Downloading...');
  // No toast here as UI will reflect status

  try {
    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          console.log(`[Updater] Download started, contentLength: ${event.data.contentLength}`);
          useUpdaterStore.getState().setDownloadTotal(event.data.contentLength ?? null);
          break;
        case 'Progress':
          useUpdaterStore.getState().addDownloadProgress(event.data.chunkLength);
          const state = useUpdaterStore.getState();
          console.log(
            `[Updater] Progress: ${state.downloadProgress}/${state.downloadTotal} (${state.downloadPercent}%)`,
          );
          break;
        case 'Finished':
          console.log('[Updater] Download finished');
          break;
      }
    });
    console.log('[Updater] Update installed.');
    store.setStatus('ready');

    // Always ask for restart confirmation once ready
    const shouldRestart = await ask(i18n.t('updater.readyToRestart'), {
      title: i18n.t('updater.title'),
      kind: 'info',
      okLabel: i18n.t('updater.restart'),
      cancelLabel: i18n.t('updater.later'),
    });

    if (shouldRestart) {
      await relaunch();
    }
  } catch (err: any) {
    console.error('[Updater] Failed to install update:', err);
    store.setError(String(err));
    showErrorToast(i18n.t('updater.checkFailed', { error: String(err) }));
  }
}
