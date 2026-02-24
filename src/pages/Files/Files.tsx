import { useState, useMemo } from 'react';
import { Icon } from '../../components';
import { files, fileCategories } from '../../data/files';

type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';

export function Files() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('size-largest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'date-recent', label: 'Date: Recent First' },
    { value: 'date-oldest', label: 'Date: Oldest First' },
    { value: 'size-largest', label: 'Size: Largest First' },
    { value: 'size-smallest', label: 'Size: Smallest First' },
  ];

  // Sort files
  const sortedFiles = useMemo(() => {
    const sorted = [...files];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent':
        return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest':
        return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      case 'size-largest':
        return sorted.sort((a, b) => b.sizeBytes - a.sizeBytes);
      case 'size-smallest':
        return sorted.sort((a, b) => a.sizeBytes - b.sizeBytes);
      default:
        return sorted;
    }
  }, [sortBy]);

  const allSelected = selectedFiles.size === files.length && files.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.id)));
    }
  };

  const toggleFileSelection = (fileId: number) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId);
    } else {
      newSelection.add(fileId);
    }
    setSelectedFiles(newSelection);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return { name: 'file-lines' as const, color: '#dc2626' }; // red
      case 'image':
        return { name: 'image' as const, color: '#2563eb' }; // blue
      case 'audio':
        return { name: 'file-audio' as const, color: '#7c3aed' }; // purple
      default:
        return { name: 'file' as const, color: '#6b7280' }; // gray
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-neutral-xx-weak)]">
      {/* Header */}
      <div className="flex items-center justify-between pr-10 pt-10 pb-6 pl-8">
        <h1>Files</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-10 px-5 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)] text-[15px] font-medium text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            <Icon name="arrow-up-from-bracket" size={16} />
            <span>Upload file</span>
          </button>
          <button className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            <Icon name="table-cells" size={16} />
          </button>
        </div>
      </div>

      {/* Content Area with Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-[280px] pl-8 overflow-y-auto flex-shrink-0">
          <nav className="space-y-1">
            {fileCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors
                  ${
                    selectedCategory === category.id
                      ? 'bg-[var(--color-primary-strong)] text-white'
                      : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                  }
                `}
              >
                <Icon name="folder" size={16} className={selectedCategory === category.id ? 'text-white' : ''} />
                <span className="flex-1 text-left">{category.label}</span>
                {category.count > 0 && (
                  <span className={selectedCategory === category.id ? 'text-white' : 'text-[var(--text-neutral-medium)]'}>
                    ({category.count})
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 pr-10 pl-6 pb-10 overflow-y-auto">
          {/* File List Card */}
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
            {/* Header Row */}
            <div className="flex items-center justify-between px-6 py-4">
              <h2
                className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
              >
                All Files
              </h2>
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 h-10 px-4 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)] text-[15px] text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                  >
                    <span className="text-[var(--text-neutral-medium)]">Sort by</span>
                    <span className="font-medium">
                      {sortOptions.find(opt => opt.value === sortBy)?.label}
                    </span>
                    <Icon name="chevron-down" size={12} />
                  </button>
                  {sortDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setSortDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-[240px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-lg shadow-lg z-20 py-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value as SortOption);
                              setSortDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-[15px] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors ${
                              sortBy === option.value
                                ? 'bg-[var(--surface-neutral-xx-weak)] font-medium text-[var(--text-neutral-xx-strong)]'
                                : 'text-[var(--text-neutral-strong)]'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Download Button */}
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <Icon name="arrow-down-to-line" size={16} />
                </button>

                {/* Delete Button */}
                <button className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <Icon name="trash-can" size={16} />
                </button>
              </div>
            </div>

            {/* Select All Row */}
            <div className="px-6 py-4">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-neutral-strong)] hover:text-[var(--color-primary-strong)] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)]"
                />
                <span>Select All Files ({files.length})</span>
              </button>
            </div>
            {/* Inset Border */}
            <div className="mx-6 border-b border-[var(--border-neutral-x-weak)]" />

            {/* File Rows */}
            <div>
              {sortedFiles.map((file, index) => {
                const icon = getFileIcon(file.type);
                const isSelected = selectedFiles.has(file.id);

                return (
                  <div key={file.id}>
                    <div
                      className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                        isSelected ? 'bg-[var(--surface-selected-weak)]' : 'hover:bg-[var(--surface-neutral-xx-weak)]'
                      }`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFileSelection(file.id)}
                        className="w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)]"
                      />

                      {/* File Icon */}
                      <Icon name={icon.name} size={20} style={{ color: icon.color }} />

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <a
                            href="#"
                            className="text-[15px] font-medium text-[#2563eb] hover:underline truncate"
                            onClick={(e) => e.preventDefault()}
                          >
                            {file.name}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[14px] text-[var(--text-neutral-medium)]">
                          <Icon name="folder" size={12} variant="regular" />
                          <span>Added {file.addedDate} by {file.addedBy} ({file.size})</span>
                          <Icon name="folder" size={14} variant="regular" />
                          <span>{file.category}</span>
                        </div>
                      </div>
                    </div>
                    {/* Inset Border */}
                    {index < sortedFiles.length - 1 && (
                      <div className="mx-6 border-b border-[var(--border-neutral-x-weak)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Files;
