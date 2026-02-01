import { useSidebarStore } from '../../stores/sidebar';
import { FileTree } from '../FileTree';
import { Outline } from '../Outline';
import { SidebarToggle } from './SidebarToggle';

export function Sidebar() {
  const { view, isVisible, toggleVisible } = useSidebarStore();

  return (
    <aside className="sidebar">
      {/* Header with drag region and toggle button */}
      <div className="sidebar-header">
        <div className="sidebar-drag-region" data-tauri-drag-region="true" />
        <SidebarToggle isOpen={isVisible} onToggle={toggleVisible} />
      </div>
      {/* Content area - view is controlled by ActivityBar */}
      <div className="sidebar-content">{view === 'files' ? <FileTree /> : <Outline />}</div>
    </aside>
  );
}
