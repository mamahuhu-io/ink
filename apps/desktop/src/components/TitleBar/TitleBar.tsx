import './TitleBar.css';

import { isWindows } from '../../services/platform';
import { MenuBar } from './MenuBar';
import { WindowControls } from './WindowControls';

interface TitleBarProps {
  title?: string;
}

export function TitleBar({ title = 'Ink' }: TitleBarProps) {
  // Only render on Windows
  if (!isWindows()) {
    return null;
  }

  return (
    <div className="title-bar" data-tauri-drag-region>
      <div className="title-bar-icon">
        <img src="/icon.png" alt="" width={16} height={16} />
      </div>
      <MenuBar />
      <div className="title-bar-spacer" data-tauri-drag-region />
      <div className="title-bar-title" data-tauri-drag-region>
        {title}
      </div>
      <div className="title-bar-spacer" data-tauri-drag-region />
      <WindowControls />
    </div>
  );
}
