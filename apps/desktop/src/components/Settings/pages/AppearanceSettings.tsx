import { useTranslation } from 'react-i18next'
import { SettingHeader, SettingRow, SettingWrapper } from '../components'
import { usePreferencesStore } from '../../../stores/preferences'
import { useTheme } from '../../../hooks/useTheme'
import { isTauri } from '../../../services'
import './SettingPages.css'

export function AppearanceSettings() {
  const { t } = useTranslation()
  const { showDocStats, setShowDocStats } = usePreferencesStore()
  const { themes, currentTheme, setThemeById, openThemesDirectory } = useTheme()

  const handleOpenThemeFolder = () => {
    openThemesDirectory()
  }

  const handleGetThemes = async () => {
    if (isTauri()) {
      const { open } = await import('@tauri-apps/plugin-shell')
      await open('https://ink.mamahuhu.io/themes')
    } else {
      window.open('https://ink.mamahuhu.io/themes', '_blank')
    }
  }

  return (
    <div className="setting-page">
      <SettingHeader
        title={t('settings.appearance.title')}
        subtitle={t('settings.appearance.subtitle')}
      />

      <SettingWrapper title={t('settings.appearance.theme.title')}>
        <SettingRow
          name={t('settings.appearance.theme.colorMode')}
          desc={t('settings.appearance.theme.colorModeDesc')}
        >
          <div className="setting-control-group">
            <select
              className="setting-select"
              value={currentTheme}
              onChange={(e) => setThemeById(e.target.value)}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <div className="setting-actions">
              <button className="setting-button secondary" onClick={handleOpenThemeFolder}>
                {t('settings.appearance.theme.openFolder')}
              </button>
              <button className="setting-button secondary" onClick={handleGetThemes}>
                {t('settings.appearance.theme.getThemes')}
              </button>
            </div>
          </div>
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.appearance.window.title')}>
        <SettingRow
          name={t('settings.appearance.window.sidebarPosition')}
          desc={t('settings.appearance.window.sidebarPositionDesc')}
        >
          <select className="setting-select" defaultValue="left">
            <option value="left">{t('settings.appearance.window.left')}</option>
            <option value="right">{t('settings.appearance.window.right')}</option>
          </select>
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.appearance.display.title')}>
        <SettingRow
          name={t('settings.appearance.display.showDocStats')}
          desc={t('settings.appearance.display.showDocStatsDesc')}
        >
          <div
            className={`setting-switch ${showDocStats ? 'active' : ''}`}
            onClick={() => setShowDocStats(!showDocStats)}
          />
        </SettingRow>
      </SettingWrapper>
    </div>
  )
}
