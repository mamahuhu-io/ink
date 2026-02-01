import './SettingPages.css';

import { relaunch } from '@tauri-apps/plugin-process';
import { open } from '@tauri-apps/plugin-shell';
import { ExternalLink } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import pkg from '../../../../package.json';
import { checkForAppUpdates, downloadAndInstallUpdate } from '../../../services/updater';
import { usePreferencesStore } from '../../../stores/preferences';
import { useUpdaterStore } from '../../../stores/updater';
import { SettingHeader, SettingRow, SettingWrapper } from '../components';

export function AboutSettings() {
  const { t } = useTranslation();
  const { resetToDefaults, autoCheckUpdates, setAutoCheckUpdates, setSkippedVersion } =
    usePreferencesStore();
  const status = useUpdaterStore((state) => state.status);
  const updateInfo = useUpdaterStore((state) => state.updateInfo);
  const downloadPercent = useUpdaterStore((state) => state.downloadPercent);

  const handleOpenLink = async (url: string) => {
    try {
      await open(url);
    } catch (e) {
      console.error('Failed to open link:', e);
    }
  };

  const handleCheckUpdate = async () => {
    await checkForAppUpdates(false);
  };

  const handleDownload = async () => {
    await downloadAndInstallUpdate();
  };

  const handleRestart = async () => {
    try {
      await relaunch();
    } catch (e) {
      console.error('Failed to relaunch:', e);
    }
  };

  const handleSkipVersion = () => {
    if (updateInfo) {
      setSkippedVersion(updateInfo.version);
      useUpdaterStore.getState().reset();
      console.log(`[Updater] User skipped version: ${updateInfo.version}`);
    }
  };

  const getUpdateButton = () => {
    switch (status) {
      case 'checking':
        return {
          text: t('settings.about.version.checking'),
          onClick: undefined,
          className: 'disabled',
        };
      case 'available':
        return {
          text: t('settings.about.version.downloadUpdate'),
          onClick: handleDownload,
          className: 'primary',
        };
      case 'downloading':
        return {
          text: '', // Progress bar will be rendered separately
          onClick: undefined,
          className: 'disabled',
        };
      case 'ready':
        return {
          text: t('updater.restart'), // "Restart" key was added in previous steps
          onClick: handleRestart,
          className: 'primary',
        };
      case 'error':
        return {
          text: t('settings.about.version.checkNow'), // Retry
          onClick: handleCheckUpdate,
          className: '',
        };
      default:
        return {
          text: t('settings.about.version.checkNow'),
          onClick: handleCheckUpdate,
          className: '',
        };
    }
  };

  const updateBtn = getUpdateButton();

  return (
    <div className="setting-page">
      <SettingHeader title={t('settings.about.title')} subtitle={t('settings.about.subtitle')} />

      <SettingWrapper title={t('settings.about.version.title')}>
        <SettingRow name="Ink" desc={`Version ${pkg.version}`}>
          <img
            src="/icon.png"
            alt="Ink"
            className="about-app-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </SettingRow>

        {status === 'available' && updateInfo && (
          <SettingRow
            name={t('updater.title')} // "Update Available"
            desc={`${t('updater.message', { version: updateInfo.version })}`}
          >
            <button
              className="setting-button"
              onClick={handleSkipVersion}
              title={t('updater.skipVersion')}
            >
              {t('updater.skipVersion')}
            </button>
          </SettingRow>
        )}

        <SettingRow
          name={t('settings.about.version.autoCheck')}
          desc={t('settings.about.version.autoCheckDesc')}
        >
          <div
            className={`setting-switch ${autoCheckUpdates ? 'active' : ''}`}
            onClick={() => setAutoCheckUpdates(!autoCheckUpdates)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAutoCheckUpdates(!autoCheckUpdates);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={autoCheckUpdates}
            aria-label={t('settings.about.version.autoCheck')}
          />
        </SettingRow>

        <SettingRow
          name={t('settings.about.version.checkUpdates')}
          desc={t('settings.about.version.checkUpdatesDesc')}
          onClick={updateBtn.onClick}
          className={updateBtn.className}
        >
          {status === 'downloading' ? (
            <div className="update-progress">
              <div className="update-progress-bar">
                <div className="update-progress-fill" style={{ width: `${downloadPercent}%` }} />
              </div>
              <span className="update-progress-text">{downloadPercent}%</span>
            </div>
          ) : (
            <span className={`setting-link ${updateBtn.className}`}>{updateBtn.text}</span>
          )}
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.about.resources.title')}>
        <SettingRow
          name={t('settings.about.resources.website')}
          desc={t('settings.about.resources.websiteDesc')}
          onClick={() => handleOpenLink('https://ink.mamahuhu.io')}
        >
          <ExternalLink size={16} className="setting-link-icon" />
        </SettingRow>
        <SettingRow
          name={t('settings.about.resources.github')}
          desc={t('settings.about.resources.githubDesc')}
          onClick={() => handleOpenLink('https://github.com/mamahuhu-io/ink')}
        >
          <ExternalLink size={16} className="setting-link-icon" />
        </SettingRow>
        <SettingRow
          name={t('settings.about.resources.documentation')}
          desc={t('settings.about.resources.documentationDesc')}
          onClick={() => handleOpenLink('https://github.com/mamahuhu-io/ink')}
        >
          <ExternalLink size={16} className="setting-link-icon" />
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.about.data.title')}>
        <SettingRow name={t('settings.about.data.reset')} desc={t('settings.about.data.resetDesc')}>
          <button className="setting-button setting-button-danger" onClick={resetToDefaults}>
            {t('settings.about.data.resetButton')}
          </button>
        </SettingRow>
      </SettingWrapper>
    </div>
  );
}
