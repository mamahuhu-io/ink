import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Type, AlignLeft, Hash } from 'lucide-react'
import { useTabStore } from '../../stores/tabs'
import { usePreferencesStore } from '../../stores/preferences'
import { useDocStats } from '../../hooks/useDocStats'

export function DocStats() {
  const { t, i18n } = useTranslation()
  const { activeTabId, tabs } = useTabStore()
  const { showDocStats } = usePreferencesStore()
  const [showDetail, setShowDetail] = useState(false)

  const activeTab = tabs.find((t) => t.id === activeTabId)
  const stats = useDocStats(activeTab?.docId ?? null)

  // 如果设置关闭或没有活动标签，不显示
  if (!showDocStats || !activeTab) {
    return null
  }

  // 格式化数字（添加千位分隔符，使用当前语言环境）
  const formatNumber = (num: number): string => {
    return num.toLocaleString(i18n.language)
  }

  return (
    <div
      className="doc-stats"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
      aria-label={`${t('editor.docStats.title')}: ${stats.wordCount} ${t('editor.docStats.wordUnit')}, ${stats.lineCount} ${t('editor.docStats.lineCount')}, ${stats.charCount} ${t('editor.docStats.charCount')}`}
    >
      {/* 默认显示：只显示字数 */}
      <div className="doc-stats-trigger">
        <Type size={13} strokeWidth={2} />
        <span>{formatNumber(stats.wordCount)}</span>
      </div>

      {/* 悬停时显示：详细统计弹出层 */}
      {showDetail && (
        <div className="doc-stats-popover">
          <div className="doc-stats-header">{t('editor.docStats.title')}</div>

          <div className="doc-stats-item">
            <div className="doc-stats-item-left">
              <Type size={12} strokeWidth={2} className="doc-stats-icon" />
              <span className="doc-stats-label">{t('editor.docStats.wordCount')}</span>
            </div>
            <span className="doc-stats-value">{formatNumber(stats.wordCount)}</span>
          </div>

          <div className="doc-stats-divider"></div>

          <div className="doc-stats-item">
            <div className="doc-stats-item-left">
              <AlignLeft size={12} strokeWidth={2} className="doc-stats-icon" />
              <span className="doc-stats-label">{t('editor.docStats.lineCount')}</span>
            </div>
            <span className="doc-stats-value">{formatNumber(stats.lineCount)}</span>
          </div>

          <div className="doc-stats-divider"></div>

          <div className="doc-stats-item">
            <div className="doc-stats-item-left">
              <Hash size={12} strokeWidth={2} className="doc-stats-icon" />
              <span className="doc-stats-label">{t('editor.docStats.charCount')}</span>
            </div>
            <span className="doc-stats-value">{formatNumber(stats.charCount)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
