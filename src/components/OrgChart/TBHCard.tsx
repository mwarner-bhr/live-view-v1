import { useState } from 'react';
import { Icon } from '../Icon';

export interface TBHCardProps {
  title?: string;
  count?: number;
  onTitleChange?: (newTitle: string) => void;
}

export function TBHCard({
  title = 'Financial Analyst',
  count = 1,
  onTitleChange,
}: TBHCardProps) {
  const cardWidth = 185;
  const avatarSize = 56;
  const avatarOffset = 28;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    setCurrentTitle(editedTitle);
    onTitleChange?.(editedTitle);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditedTitle(currentTitle);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="relative"
        style={{
          width: cardWidth,
          height: 140,
        }}
      >
        {/* Avatar - gray with person silhouette */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center bg-[#c6c2bf] dark:bg-neutral-600"
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: '12px',
            top: 0,
            boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)',
          }}
        >
          {/* Person silhouette SVG */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="10" r="6" fill="white" />
            <path
              d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
              fill="white"
            />
          </svg>
        </div>

        {/* Card with dashed border */}
        <div
          className="absolute bg-[#fafaf8] dark:bg-neutral-700 border-4 border-dashed border-[#d4d2d0] dark:border-neutral-500"
          style={{
            width: cardWidth,
            top: avatarOffset,
            borderRadius: '8px',
            boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)',
            padding: '8px',
          }}
        >
          {/* Content - Name and Title */}
          <div className="flex flex-col items-center text-center w-full pt-6 pb-2">
            {/* Name - Green "To Be Hired" */}
            <div
              className="font-medium text-[15px] leading-[22px] w-full overflow-hidden text-ellipsis whitespace-nowrap mb-0 text-[#2e7918] dark:text-green-400"
              style={{ fontFamily: 'Inter' }}
            >
              To Be Hired
            </div>

            {/* Title with edit affordance */}
            <div className="flex items-center justify-center gap-[4px] w-full">
              <span
                className="font-normal text-[13px] leading-[19px] text-[#48413f] dark:text-neutral-300"
                style={{ fontFamily: 'Inter' }}
              >
                {currentTitle}
              </span>
              <button
                className="hover:opacity-70 transition-opacity cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                aria-label="Edit title"
              >
                <Icon name="pen" size={11} className="text-[#777270] dark:text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Bottom right - Count with chevron if multiple positions */}
          <div className="flex items-center justify-end w-full" style={{ minHeight: '19px' }}>
            {count > 1 && (
              <div className="flex gap-1 items-center">
                <span
                  className="font-normal text-[13px] leading-[19px] text-[#38312f] dark:text-neutral-300"
                  style={{ fontFamily: 'Inter' }}
                >
                  {count}
                </span>
                <Icon name="chevron-down" size={12} className="text-[#777270] dark:text-neutral-400" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Title Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCancel}
        >
          <div
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-4"
            style={{ width: '300px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[15px] font-medium text-[#38312f] dark:text-neutral-100 mb-3">
              Edit Job Title
            </h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border border-[#d4d2d0] dark:border-neutral-600 rounded px-3 py-2 text-[13px] text-[#38312f] dark:text-neutral-100 bg-white dark:bg-neutral-700 focus:outline-none focus:border-[#2e7918]"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-[13px] text-[#48413f] dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-[13px] text-white bg-[#2e7918] hover:bg-[#256614] rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TBHCard;
