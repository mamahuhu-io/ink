import { Folder, List, Search, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { triggerGlobalSearch, triggerPreferences } from '../../hooks/useAppCommands';
import { type SidebarView, useSidebarStore } from '../../stores/sidebar';
import { formatShortcut } from '../../utils/shortcuts';

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function ActivityItem({ icon, title, isActive, onClick }: ActivityItemProps) {
  return (
    <button
      className={`activity-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {icon}
    </button>
  );
}

interface ActionItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

function ActionItem({ icon, title, onClick }: ActionItemProps) {
  return (
    <button className="activity-item" onClick={onClick} title={title} aria-label={title}>
      {icon}
    </button>
  );
}

export function ActivityBar() {
  const { t } = useTranslation();
  const { view, setView } = useSidebarStore();

  const viewItems: { id: SidebarView; icon: React.ReactNode; labelKey: string }[] = [
    { id: 'files', icon: <Folder size={20} />, labelKey: 'sidebar.files' },
    { id: 'outline', icon: <List size={20} />, labelKey: 'sidebar.outline' },
  ];

  return (
    <div className="activity-bar">
      <div className="activity-bar-top">
        {/* View switchers */}
        {viewItems.map((item) => (
          <ActivityItem
            key={item.id}
            icon={item.icon}
            title={t(item.labelKey)}
            isActive={view === item.id}
            onClick={() => setView(item.id)}
          />
        ))}
        {/* Separator */}
        <div className="activity-separator" />
        {/* Action buttons */}
        <ActionItem
          icon={<Search size={20} />}
          title={`${t('editor.search', 'Search')} (${formatShortcut('Cmd+K')})`}
          onClick={triggerGlobalSearch}
        />
      </div>
      <div className="activity-bar-bottom">
        <ActionItem
          icon={<Settings size={20} />}
          title={`${t('settings.title', 'Settings')} (${formatShortcut('Cmd+,')})`}
          onClick={triggerPreferences}
        />
      </div>
    </div>
  );
}
