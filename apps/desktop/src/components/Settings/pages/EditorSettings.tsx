import './SettingPages.css';

import { useTranslation } from 'react-i18next';

import { isSpellCheckSupported } from '../../../services/platform';
import { usePreferencesStore } from '../../../stores/preferences';
import { SettingHeader, SettingRow, SettingWrapper } from '../components';

export function EditorSettings() {
  const { t } = useTranslation();
  const {
    autoSaveEnabled,
    autoSaveDelay,
    fontSize,
    lineHeight,
    spellCheck,
    codeBlockShowLineNumbers,
    codeBlockEnableWordWrap,
    setAutoSaveEnabled,
    setAutoSaveDelay,
    setFontSize,
    setLineHeight,
    setSpellCheck,
    setCodeBlockShowLineNumbers,
    setCodeBlockEnableWordWrap,
  } = usePreferencesStore();

  // Spell check is only available on macOS and Windows
  const showSpellCheck = isSpellCheckSupported();

  return (
    <div className="setting-page">
      <SettingHeader title={t('settings.editor.title')} subtitle={t('settings.editor.subtitle')} />

      <SettingWrapper title={t('settings.editor.autoSave.title')}>
        <SettingRow
          name={t('settings.editor.autoSave.enable')}
          desc={t('settings.editor.autoSave.enableDesc')}
        >
          <div
            className={`setting-switch ${autoSaveEnabled ? 'active' : ''}`}
            onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAutoSaveEnabled(!autoSaveEnabled);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={autoSaveEnabled}
            aria-label={t('settings.editor.autoSave.enable')}
          />
        </SettingRow>
        <SettingRow
          name={t('settings.editor.autoSave.delay')}
          desc={t('settings.editor.autoSave.delayDesc')}
        >
          <input
            type="number"
            min="1"
            max="60"
            value={autoSaveDelay}
            onChange={(e) => setAutoSaveDelay(Math.max(1, parseInt(e.target.value) || 5))}
            disabled={!autoSaveEnabled}
            className="setting-input"
          />
        </SettingRow>
      </SettingWrapper>

      <SettingWrapper title={t('settings.editor.text.title')}>
        <SettingRow
          name={t('settings.editor.text.fontSize')}
          desc={t('settings.editor.text.fontSizeDesc')}
        >
          <input
            type="number"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) =>
              setFontSize(Math.max(12, Math.min(24, parseInt(e.target.value) || 16)))
            }
            className="setting-input"
          />
        </SettingRow>
        <SettingRow
          name={t('settings.editor.text.lineHeight')}
          desc={t('settings.editor.text.lineHeightDesc')}
        >
          <input
            type="number"
            min="1.2"
            max="2.5"
            step="0.1"
            value={lineHeight}
            onChange={(e) =>
              setLineHeight(Math.max(1.2, Math.min(2.5, parseFloat(e.target.value) || 1.6)))
            }
            className="setting-input"
          />
        </SettingRow>
        {showSpellCheck && (
          <SettingRow
            name={t('settings.editor.text.spellCheck')}
            desc={t('settings.editor.text.spellCheckDesc')}
          >
            <div
              className={`setting-switch ${spellCheck ? 'active' : ''}`}
              onClick={() => setSpellCheck(!spellCheck)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSpellCheck(!spellCheck);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={spellCheck}
              aria-label={t('settings.editor.text.spellCheck')}
            />
          </SettingRow>
        )}
      </SettingWrapper>

      <SettingWrapper title={t('settings.editor.code.title')}>
        <SettingRow
          name={t('settings.editor.code.lineNumbers')}
          desc={t('settings.editor.code.lineNumbersDesc')}
        >
          <div
            className={`setting-switch ${codeBlockShowLineNumbers ? 'active' : ''}`}
            onClick={() => setCodeBlockShowLineNumbers(!codeBlockShowLineNumbers)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCodeBlockShowLineNumbers(!codeBlockShowLineNumbers);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={codeBlockShowLineNumbers}
            aria-label={t('settings.editor.code.lineNumbers')}
          />
        </SettingRow>
        <SettingRow
          name={t('settings.editor.code.wordWrap')}
          desc={t('settings.editor.code.wordWrapDesc')}
        >
          <div
            className={`setting-switch ${codeBlockEnableWordWrap ? 'active' : ''}`}
            onClick={() => setCodeBlockEnableWordWrap(!codeBlockEnableWordWrap)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCodeBlockEnableWordWrap(!codeBlockEnableWordWrap);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={codeBlockEnableWordWrap}
            aria-label={t('settings.editor.code.wordWrap')}
          />
        </SettingRow>
      </SettingWrapper>
    </div>
  );
}
