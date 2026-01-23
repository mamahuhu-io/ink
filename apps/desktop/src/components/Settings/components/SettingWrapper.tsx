import type { SettingWrapperProps } from '../types'
import './SettingComponents.css'

export function SettingWrapper({ title, children }: SettingWrapperProps) {
  return (
    <div className="setting-wrapper">
      <div className="setting-wrapper-title">{title}</div>
      <div className="setting-wrapper-content">{children}</div>
    </div>
  )
}
