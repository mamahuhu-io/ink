import { Pen, Settings, Palette, Keyboard, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SettingTabKey } from './types'
import './SettingsSidebar.css'

interface SettingsSidebarProps {
  activeTab: SettingTabKey
  onTabChange: (tab: SettingTabKey) => void
}

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const { t } = useTranslation()

  const tabs = [
    { key: 'general' as const, title: t('settings.tabs.general'), icon: <Settings size={16} /> },
    { key: 'editor' as const, title: t('settings.tabs.editor'), icon: <Pen size={16} /> },
    { key: 'appearance' as const, title: t('settings.tabs.appearance'), icon: <Palette size={16} /> },
    { key: 'shortcuts' as const, title: t('settings.tabs.shortcuts'), icon: <Keyboard size={16} /> },
    { key: 'about' as const, title: t('settings.tabs.about'), icon: <Info size={16} /> },
  ]

  return (
    <div className="settings-sidebar">
      <div className="settings-sidebar-title">{t('settings.title')}</div>
      <div className="settings-sidebar-items">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`settings-sidebar-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className="settings-sidebar-item-icon">{tab.icon}</span>
            <span className="settings-sidebar-item-title">{tab.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
