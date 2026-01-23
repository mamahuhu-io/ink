import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SettingHeader, SettingRow, SettingWrapper } from '../components'
import { usePreferencesStore } from '../../../stores/preferences'
import { checkForAppUpdates } from '../../../services/updater'
import { open } from '@tauri-apps/plugin-shell'
import './SettingPages.css'

export function AboutSettings() {
  const { t } = useTranslation()
  const { 
    resetToDefaults,
    autoCheckUpdates,
    setAutoCheckUpdates
  } = usePreferencesStore()

  const handleOpenLink = async (url: string) => {
    try {
      await open(url)
    } catch (e) {
      console.error('Failed to open link:', e)
    }
  }

  const handleCheckUpdate = async () => {
    await checkForAppUpdates(false)
  }

  return (
    <div className="setting-page">
      <SettingHeader
        title={t('settings.about.title')}
        subtitle={t('settings.about.subtitle')}
      />

      <SettingWrapper title={t('settings.about.version.title')}>
        <SettingRow
          name="Ink"
          desc="Version 0.1.0"
        >
          <img
            src="/icon.png"
            alt="Ink"
            className="about-app-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </SettingRow>
        
        <SettingRow
          name={t('settings.about.version.autoCheck')}
          desc={t('settings.about.version.autoCheckDesc')}
        >
          <div
            className={`setting-switch ${autoCheckUpdates ? 'active' : ''}`}
            onClick={() => setAutoCheckUpdates(!autoCheckUpdates)}
          />
        </SettingRow>

        <SettingRow
          name={t('settings.about.version.checkUpdates')}
          desc={t('settings.about.version.checkUpdatesDesc')}
          onClick={handleCheckUpdate}
        >
          <span className="setting-link">{t('settings.about.version.checkNow')}</span>
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
        <SettingRow
          name={t('settings.about.data.reset')}
          desc={t('settings.about.data.resetDesc')}
        >
          <button className="setting-button setting-button-danger" onClick={resetToDefaults}>
            {t('settings.about.data.resetButton')}
          </button>
        </SettingRow>
      </SettingWrapper>
    </div>
  )
}
