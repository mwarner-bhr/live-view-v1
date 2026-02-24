import { useState, useRef, useEffect } from 'react';
import type { Employee } from '../../data/employees';
import { Icon } from '../Icon';

interface OrgChartControlsProps {
  employees: Employee[];
  depth: number | 'all';
  onDepthChange: (depth: number | 'all') => void;
  onEmployeeJump: (employeeId: number) => void;
  onGoUp?: () => void;
  onFilterOpen?: () => void;
  onExportOpen?: () => void;
}

export function OrgChartControls({
  employees,
  depth,
  onDepthChange,
  onEmployeeJump,
  onGoUp,
  onFilterOpen,
  onExportOpen,
}: OrgChartControlsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [depthDropdownOpen, setDepthDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);

  // Filter employees based on search query
  const searchResults = searchQuery.trim()
    ? employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Reset highlighted index when search results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchResults.length]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        const selectedEmployee = searchResults[highlightedIndex];
        if (selectedEmployee) {
          onEmployeeJump(selectedEmployee.id);
          setSearchQuery('');
          setShowSearchResults(false);
        }
        break;
      case 'Escape':
        setShowSearchResults(false);
        break;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (depthRef.current && !depthRef.current.contains(event.target as Node)) {
        setDepthDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const depthOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 'all' as const, label: 'All' },
  ];

  const currentDepthLabel = depth === 'all' ? 'All' : (depth ?? 'all').toString();

  return (
    <div className="flex items-center gap-3 px-0 pt-0 pb-3 border-b border-gray-200 dark:border-neutral-700">
      {/* Left: Search */}
      <div ref={searchRef} className="relative" style={{ width: '350px' }}>
        <div className="relative">
          <Icon
            name="circle-user"
            size={16}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ color: '#777270', left: '16px' }}
          />
          <input
            type="text"
            placeholder="Jump to an Employee..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={handleKeyDown}
            className="w-full h-10 pl-11 pr-4 rounded-full
                     bg-white dark:bg-neutral-800
                     border border-gray-300 dark:border-neutral-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     placeholder:text-[#777270] text-gray-900 dark:text-neutral-100"
            style={{
              fontSize: '15px',
              lineHeight: '22px',
              padding: '8px 16px 8px 44px'
            }}
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div
            className="absolute left-0 top-full mt-1 w-full rounded-lg shadow-lg py-1 z-50 max-h-64 overflow-y-auto bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
          >
            {searchResults.map((emp, index) => (
              <button
                key={emp.id}
                onClick={() => {
                  onEmployeeJump(emp.id);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 ${
                  index === highlightedIndex
                    ? 'bg-gray-100 dark:bg-neutral-700'
                    : 'hover:bg-gray-100 dark:hover:bg-neutral-700'
                }`}
              >
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-neutral-100 truncate">
                    {emp.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                    {emp.title} · {emp.department}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Center: Depth Selector and Up Arrow */}
      <div className="flex items-center gap-2">
        {/* Depth Dropdown */}
        <div ref={depthRef} className="relative">
          <button
            onClick={() => setDepthDropdownOpen(!depthDropdownOpen)}
            className="h-10 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 flex items-center text-sm font-normal transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700"
            style={{ width: '88px', padding: '8px 16px', gap: '16px' }}
          >
            <span className="flex-1 text-left text-gray-900 dark:text-neutral-100">{currentDepthLabel}</span>
            <div className="flex items-center gap-3 h-full">
              <div className="w-px h-full bg-gray-300 dark:bg-neutral-600"></div>
              <Icon
                name="caret-down"
                size={10}
                style={{ color: '#777270' }}
                className={`transition-transform duration-150 ${
                  depthDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {depthDropdownOpen && (
            <div
              className="absolute left-0 top-full mt-1 w-24 rounded-lg shadow-lg py-1 z-50 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
            >
              {depthOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onDepthChange(option.value);
                    setDepthDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100"
                  style={{
                    backgroundColor:
                      depth === option.value ? (document.documentElement.classList.contains('dark') ? '#404040' : '#f3f4f6') : 'transparent',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Up Arrow */}
        {onGoUp && (
          <button
            onClick={onGoUp}
            className="h-10 w-10 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 flex items-center justify-center transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700"
            aria-label="Go to parent"
            style={{ width: '48px' }}
          >
            <Icon name="chevron-up" size={16} style={{ color: '#48413f' }} />
          </button>
        )}
      </div>

      {/* Right: Filter and Export */}
      {(onFilterOpen || onExportOpen) && (
        <div className="flex items-center gap-2 ml-auto">
          {/* Filter Button */}
          {onFilterOpen && (
            <button
              onClick={onFilterOpen}
              className="h-10 px-4 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100"
            >
              <Icon name="sliders" size={16} />
              <Icon name="caret-down" size={8} />
            </button>
          )}

          {/* Export Button */}
          {onExportOpen && (
            <button
              onClick={onExportOpen}
              className="h-10 px-4 rounded-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100"
            >
              <Icon name="file-export" size={16} />
              <span className="font-semibold">Export</span>
              <Icon name="caret-down" size={10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
