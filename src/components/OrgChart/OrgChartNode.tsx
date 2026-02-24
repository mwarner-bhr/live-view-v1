import type { Employee } from '../../data/employees';
import { TBHCard } from './TBHCard';

export interface OrgChartNodeProps {
  employee: Employee;
  isSelected?: boolean;
  isFocused?: boolean;
  onPinClick?: (id: number) => void;
  onExpandClick?: (id: number) => void;
  onNodeClick?: (id: number) => void;
  showPhoto?: boolean;
  compact?: boolean;
  isExpanded?: boolean;
}

export function OrgChartNode({
  employee,
  isSelected = false,
  isFocused = false,
  onPinClick,
  onExpandClick,
  onNodeClick,
  showPhoto = true,
  compact: _compact = false,
  isExpanded = true,
}: OrgChartNodeProps) {
  // Render TBH card for unfilled positions
  if (employee.isTBH) {
    return (
      <TBHCard
        title={employee.title}
        count={employee.tbhCount || 1}
      />
    );
  }

  const cardWidth = 185;
  const avatarSize = 56;
  const avatarOffset = 28; // Half avatar above card

  return (
    <div
      className="relative"
      style={{
        width: cardWidth,
        height: 140, // Total height including avatar overhang
      }}
    >
      {/* Avatar - centered at top, overhanging */}
      {showPhoto && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden z-20"
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '12px',
            top: 0,
            boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)',
          }}
        >
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 dark:bg-neutral-600 flex items-center justify-center">
              <i className="fa-solid fa-user text-white text-xl"></i>
            </div>
          )}
        </div>
      )}

      {/* Card */}
      <div
        className={`
          absolute bg-white dark:bg-neutral-700 cursor-pointer
          ${isSelected ? 'border-2 border-green-500 shadow-lg' : 'border border-[#e4e3e0] dark:border-neutral-600'}
          ${isFocused ? 'ring-2 ring-green-600' : ''}
        `}
        style={{
          width: cardWidth,
          top: avatarOffset,
          borderRadius: '8px',
          boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)',
          padding: '8px',
        }}
        onClick={() => {
          console.log('Card clicked:', employee.name, employee.id);
          onNodeClick?.(employee.id);
        }}
      >
        {/* Top row - pin and chevron icons */}
        <div className="flex items-start justify-between w-full mb-2">
          <button
            className="flex items-center justify-center w-3 h-3 text-[#777270] dark:text-neutral-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPinClick?.(employee.id);
            }}
            aria-label="Pin employee"
          >
            <i className="fa-solid fa-thumbtack text-[12px]"></i>
          </button>

          {employee.directReports > 0 && (
            <button
              className="flex items-center justify-center w-3 h-3 text-[#777270] dark:text-neutral-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              onClick={(e) => {
                console.log('Top chevron clicked for:', employee.name, employee.id);
                e.stopPropagation();
                onExpandClick?.(employee.id);
              }}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-[12px]`}></i>
            </button>
          )}
        </div>

        {/* Content - name and title */}
        <div className="flex flex-col items-center text-center w-full pt-2 pb-0">
          {/* Name - Green */}
          <div
            className="font-medium text-[15px] leading-[22px] text-[#2e7918] dark:text-green-400 w-full overflow-hidden text-ellipsis whitespace-nowrap mb-0"
            style={{ fontFamily: 'Inter' }}
          >
            {employee.name}
          </div>

          {/* Title */}
          <div
            className="font-normal text-[13px] leading-[19px] text-[#48413f] dark:text-neutral-400 w-full overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ fontFamily: 'Inter' }}
          >
            {employee.title}
          </div>
        </div>

        {/* Bottom right - Direct reports count (always rendered for consistent height) */}
        <div className="flex items-start justify-end w-full mt-2" style={{ minHeight: '19px' }}>
          {employee.directReports > 0 && (
            <button
              className="flex gap-1 items-center justify-end hover:opacity-70 transition-opacity"
              onClick={(e) => {
                console.log('Bottom chevron clicked for:', employee.name, employee.id);
                e.stopPropagation();
                onExpandClick?.(employee.id);
              }}
            >
              <span className="font-normal text-[13px] leading-[19px] text-[#38312f] dark:text-neutral-400">
                {employee.directReports}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-[#777270] dark:text-neutral-500"
              >
                {isExpanded ? (
                  // Chevron down
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  // Chevron up
                  <path
                    d="M3 7.5L6 4.5L9 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
