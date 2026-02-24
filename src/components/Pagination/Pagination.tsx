import { Icon } from '../Icon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Calculate range for display
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-5 py-4">
      {/* Range Display */}
      <div
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px',
          color: 'var(--text-neutral-medium)',
        }}
      >
        {startItem}-{endItem} of {totalItems}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="flex items-center justify-center w-10 h-10 rounded-full border-none outline-none transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          backgroundColor: 'var(--surface-neutral-white)',
          color: canGoPrevious ? 'var(--icon-neutral-strong)' : 'var(--icon-neutral-strong)',
        }}
        aria-label="Previous page"
      >
        <Icon name="chevron-left" size={16} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--text-neutral-medium)',
              }}
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className="flex items-center justify-center w-8 h-8 rounded-full outline-none transition-colors cursor-pointer"
            style={{
              backgroundColor: isActive ? '#2e7918' : 'var(--surface-neutral-white)',
              color: isActive ? '#ffffff' : 'var(--text-neutral-strong)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              border: isActive ? 'none' : '1px solid var(--border-neutral-medium)',
            }}
            aria-label={`Page ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="flex items-center gap-1 border-none outline-none bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          color: canGoNext ? '#0b4fd1' : 'var(--text-neutral-weak)',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
        }}
        aria-label="Next page"
      >
        Next →
      </button>
      </div>
    </div>
  );
}

export default Pagination;
