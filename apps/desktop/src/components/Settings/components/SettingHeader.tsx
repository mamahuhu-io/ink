import type { SettingHeaderProps } from '../types'
import './SettingComponents.css'

export function SettingHeader({ title, subtitle }: SettingHeaderProps) {
  return (
    <div className="setting-header">
      <h2 className="setting-header-title">{title}</h2>
      {subtitle && <p className="setting-header-subtitle">{subtitle}</p>}
    </div>
  )
}
