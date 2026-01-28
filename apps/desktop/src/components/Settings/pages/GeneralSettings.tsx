import './SettingPages.css';

import { useTranslation } from 'react-i18next';

import { languages } from '../../../i18n';
import { pickFolder } from '../../../services/fileSystem';
import { useLanguageStore } from '../../../stores/language';
import { usePreferencesStore } from '../../../stores/preferences';
import { SettingHeader, SettingRow, SettingWrapper } from '../components';

export function GeneralSettings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const {
    defaultSaveLocation,
    setDefaultSaveLocation,
    recentFilesLimit,
    setRecentFilesLimit,
    confirmDelete,
    setConfirmDelete,
    openLastFile,
    setOpenLastFile,
  } = usePreferencesStore();

  const handleChooseLocation = async () => {
    const path = await pickFolder();
    if (path) {
      setDefaultSaveLocation(path);
    }
  };

  return (
    <div className="setting-page">
      <SettingHeader
        title={t('settings.general.title')}
        subtitle={t('settings.general.subtitle')}
      />

      <SettingWrapper title={t('settings.general.language.title')}>
        <SettingRow
          name={t('settings.general.language.select')}
          desc={t('settings.general.language.selectDesc')}
        >
          <select
            className="setting-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.general.files.title')}>
        <SettingRow
          name={t('settings.general.files.defaultLocation')}
          desc={defaultSaveLocation || t('settings.general.files.defaultLocationDesc')}
        >
          <button className="setting-button" onClick={handleChooseLocation}>
            {defaultSaveLocation
              ? t('settings.general.files.chooseButton').replace('...', 'Change')
              : t('settings.general.files.chooseButton')}
          </button>
        </SettingRow>
        <SettingRow
          name={t('settings.general.files.recentLimit')}
          desc={t('settings.general.files.recentLimitDesc')}
        >
          <input
            type="number"
            min="5"
            max="50"
            value={recentFilesLimit}
            onChange={(e) => setRecentFilesLimit(parseInt(e.target.value) || 10)}
            className="setting-input"
          />
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.general.behavior.title')}>
        <SettingRow
          name={t('settings.general.behavior.confirmDelete')}
          desc={t('settings.general.behavior.confirmDeleteDesc')}
        >
          <div
            className={`setting-switch ${confirmDelete ? 'active' : ''}`}
            onClick={() => setConfirmDelete(!confirmDelete)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setConfirmDelete(!confirmDelete);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={confirmDelete}
            aria-label={t('settings.general.behavior.confirmDelete')}
          />
        </SettingRow>
        <SettingRow
          name={t('settings.general.behavior.openLastFile')}
          desc={t('settings.general.behavior.openLastFileDesc')}
        >
          <div
            className={`setting-switch ${openLastFile ? 'active' : ''}`}
            onClick={() => setOpenLastFile(!openLastFile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenLastFile(!openLastFile);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={openLastFile}
            aria-label={t('settings.general.behavior.openLastFile')}
          />
        </SettingRow>
      </SettingWrapper>
    </div>
  );
}
