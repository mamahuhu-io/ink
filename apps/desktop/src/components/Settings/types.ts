import type { ReactNode } from 'react';

export type SettingTabKey = 'editor' | 'general' | 'appearance' | 'shortcuts' | 'about';

export interface SettingTab {
  key: SettingTabKey;
  title: string;
  icon: ReactNode;
}

export interface SettingRowProps {
  name: string;
  desc?: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface SettingWrapperProps {
  title: string;
  children: ReactNode;
}

export interface SettingHeaderProps {
  title: string;
  subtitle?: string;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SettingTabKey;
}
