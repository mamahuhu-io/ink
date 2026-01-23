import { PanelLeftClose, PanelLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SidebarToggleProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function SidebarToggle({ isOpen, onToggle, className = '' }: SidebarToggleProps) {
  const { t } = useTranslation()

  return (
    <button
      className={`sidebar-toggle-btn ${className}`}
      onClick={onToggle}
      title={t('sidebar.toggle', isOpen ? 'Hide sidebar' : 'Show sidebar')}
      aria-label={isOpen ? 'Hide sidebar' : 'Show sidebar'}
    >
      {isOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
    </button>
  )
}
