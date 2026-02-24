import { useState } from 'react';
import { Icon } from '../Icon';
import type { InboxTab, InboxSubItem } from '../../data/inboxData';

interface InboxSidebarProps {
  tabs: InboxTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function InboxSidebar({ tabs, activeTab, onTabChange }: InboxSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['assigned-to-me', 'inbox', 'approvals'])
  );

  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Render a sub-item recursively
  const renderSubItem = (item: InboxSubItem) => {
    const isActive = activeTab === item.id;
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = item.subItems && item.subItems.length > 0;
    const hasIcon = !!item.icon;

    // Items without icons align their text with text of items that have icons
    // Icon items: 12px padding + 16px icon + 8px gap = 36px to text
    // Non-icon items: need marginLeft so text aligns at same position
    const marginLeft = hasIcon ? '0px' : '24px';

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            onTabChange(item.id);
          }}
          className="flex items-center transition-colors cursor-pointer border-none outline-none text-left w-full"
          style={{
            marginLeft,
            padding: '8px 12px',
            backgroundColor: 'transparent',
            color: isActive ? '#2e7918' : '#48413f',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: isActive ? 700 : 400,
            lineHeight: '22px',
            borderRadius: '8px',
            gap: '8px',
          }}
        >
          {/* Icon */}
          {hasIcon && (
            <Icon
              name={item.icon as any}
              size={16}
              style={{
                color: isActive ? '#2e7918' : '#48413f',
                flexShrink: 0
              }}
            />
          )}

          {/* Label with count in parentheses */}
          <span style={{ flex: 1 }}>
            {item.label}
            {item.count !== undefined && item.count > 0 && (
              <span style={{ marginLeft: '4px' }}>({item.count})</span>
            )}
          </span>
        </button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col" style={{ gap: '2px', marginTop: '2px' }}>
            {item.subItems?.map((subItem) => renderSubItem(subItem))}
          </div>
        )}
      </div>
    );
  };

  const Divider = () => (
    <div
      style={{
        height: '1px',
        backgroundColor: '#e5e4e1',
        marginTop: '8px',
        marginBottom: '8px',
      }}
    />
  );

  return (
    <div
      className="shrink-0"
      style={{
        width: '264px',
      }}
    >
      <div className="flex flex-col" style={{ gap: '4px' }}>
        {tabs.map((tab) => {
          const isExpanded = expandedSections.has(tab.id);
          const hasSubItems = tab.subItems && tab.subItems.length > 0;

          return (
            <div key={tab.id}>
              {/* Top-level item (Assigned to Me) */}
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(tab.id);
                  }
                  onTabChange(tab.id);
                }}
                className="flex items-center transition-colors cursor-pointer border-none outline-none text-left"
                style={{
                  width: '264px',
                  padding: '8px 12px',
                  backgroundColor: 'transparent',
                  color: '#48413f',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  borderRadius: '8px',
                  gap: '8px',
                }}
              >
                {/* Icon */}
                {tab.icon && (
                  <Icon
                    name={tab.icon as any}
                    size={16}
                    style={{
                      color: '#48413f',
                      flexShrink: 0
                    }}
                  />
                )}

                {/* Label with inline caret */}
                <span className="flex items-center gap-1">
                  {tab.label}
                  {tab.hasDropdown && (
                    <Icon
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={12}
                      style={{
                        color: '#777270',
                        flexShrink: 0
                      }}
                    />
                  )}
                </span>
              </button>

              {/* Divider after Assigned to Me */}
              <Divider />

              {/* Sub-items */}
              {hasSubItems && isExpanded && (
                <div className="flex flex-col" style={{ gap: '2px' }}>
                  {tab.subItems?.map((subItem) => {
                    const isInbox = subItem.id === 'inbox';
                    const isCompleted = subItem.id === 'completed';

                    return (
                      <div key={subItem.id}>
                        {renderSubItem(subItem)}

                        {/* Divider after Inbox section (after Onboarding) */}
                        {isInbox && <Divider />}

                        {/* Divider after Completed */}
                        {isCompleted && <Divider />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InboxSidebar;
