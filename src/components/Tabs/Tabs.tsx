import { Icon } from '../Icon';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'inverted';
}

export function Tabs({ tabs, activeTab, onTabChange, className = '', variant = 'default' }: TabsProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        // Default variant styles (for light backgrounds)
        const defaultActiveStyles = 'text-[var(--color-primary-strong)] border-b-2 border-[var(--color-primary-strong)]';
        const defaultInactiveStyles = 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] border-b-2 border-transparent';

        // Inverted variant styles (for dark/colored backgrounds)
        const invertedActiveStyles = 'text-white border-b-2 border-white';
        const invertedInactiveStyles = 'text-white/70 hover:text-white/90 border-b-2 border-transparent';

        const activeStyles = variant === 'inverted' ? invertedActiveStyles : defaultActiveStyles;
        const inactiveStyles = variant === 'inverted' ? invertedInactiveStyles : defaultInactiveStyles;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              pb-3 px-1 text-[15px] font-medium transition-colors flex items-center gap-2
              ${isActive ? activeStyles : inactiveStyles}
            `}
          >
            {tab.icon && <Icon name={tab.icon as any} size={16} className="text-current" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
