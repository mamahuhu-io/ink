import './SettingComponents.css';

import type { SettingRowProps } from '../types';

export function SettingRow({ name, desc, children, onClick, className }: SettingRowProps) {
  return (
    <div
      className={`setting-row ${onClick ? 'setting-row-clickable' : ''} ${className || ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e as any);
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="setting-row-info">
        <div className="setting-row-name">{name}</div>
        {desc && <div className="setting-row-desc">{desc}</div>}
      </div>
      {children && <div className="setting-row-control">{children}</div>}
    </div>
  );
}
