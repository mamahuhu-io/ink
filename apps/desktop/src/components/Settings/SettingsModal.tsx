import './SettingsModal.css';

import { X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  AboutSettings,
  AppearanceSettings,
  EditorSettings,
  GeneralSettings,
  ShortcutsSettings,
} from './pages';
import { SettingsSidebar } from './SettingsSidebar';
import type { SettingsModalProps, SettingTabKey } from './types';

export function SettingsModal({ isOpen, onClose, initialTab = 'general' }: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<SettingTabKey>(initialTab);

  // Update active tab when modal opens or initialTab changes
  useLayoutEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'editor':
        return <EditorSettings />;
      case 'general':
        return <GeneralSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'shortcuts':
        return <ShortcutsSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <EditorSettings />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="settings-backdrop"
      ref={modalRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="presentation"
    >
      <div className="settings-modal" role="dialog" aria-modal="true">
        <button className="settings-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
        <div className="settings-layout">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="settings-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
