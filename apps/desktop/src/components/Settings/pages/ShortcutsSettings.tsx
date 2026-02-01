import './SettingPages.css';

import { useTranslation } from 'react-i18next';

import { KeybindingDisplay, SettingHeader, SettingRow, SettingWrapper } from '../components';
import { SHORTCUTS } from '../constants/shortcuts';

export function ShortcutsSettings() {
  const { t } = useTranslation();

  return (
    <div className="setting-page">
      <SettingHeader
        title={t('settings.shortcuts.title')}
        subtitle={t('settings.shortcuts.subtitle')}
      />

      {SHORTCUTS.map((category) => (
        <SettingWrapper key={category.titleKey} title={t(category.titleKey)}>
          {category.shortcuts.map((shortcut) => (
            <SettingRow key={shortcut.id} name={t(shortcut.descriptionKey)}>
              <KeybindingDisplay keybinding={shortcut.key} />
            </SettingRow>
          ))}
        </SettingWrapper>
      ))}
    </div>
  );
}
