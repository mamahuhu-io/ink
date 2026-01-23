import type { SettingRowProps } from '../types'
import './SettingComponents.css'

export function SettingRow({ name, desc, children, onClick, className }: SettingRowProps) {
  return (
    <div
      className={`setting-row ${onClick ? 'setting-row-clickable' : ''} ${className || ''}`}
      onClick={onClick}
    >
      <div className="setting-row-info">
        <div className="setting-row-name">{name}</div>
        {desc && <div className="setting-row-desc">{desc}</div>}
      </div>
      {children && <div className="setting-row-control">{children}</div>}
    </div>
  )
}
