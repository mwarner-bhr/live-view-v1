import { useState, useMemo } from 'react';
import { InboxSidebar } from '../../components/InboxSidebar';
import { InboxContentCard } from '../../components/InboxContentCard';
import { RequestItem } from '../../components/RequestItem';
import { Pagination } from '../../components/Pagination';
import {
  inboxTabs,
  getRequestsByTab,
  ITEMS_PER_PAGE,
} from '../../data/inboxData';

export function Inbox() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());

  // Get filtered requests based on active tab
  const filteredRequests = useMemo(() => {
    return getRequestsByTab(activeTab);
  }, [activeTab]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  // Reset to page 1 when changing tabs
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSelectedRequests(new Set());
  };

  // Toggle individual request selection
  const handleToggleSelect = (requestId: string) => {
    const newSelected = new Set(selectedRequests);
    if (newSelected.has(requestId)) {
      newSelected.delete(requestId);
    } else {
      newSelected.add(requestId);
    }
    setSelectedRequests(newSelected);
  };

  // Select all visible requests
  const handleSelectAll = () => {
    if (selectedRequests.size === paginatedRequests.length) {
      // Deselect all
      setSelectedRequests(new Set());
    } else {
      // Select all on current page
      const allIds = new Set(paginatedRequests.map(req => req.id));
      setSelectedRequests(allIds);
    }
  };

  const allSelected = paginatedRequests.length > 0 && selectedRequests.size === paginatedRequests.length;
  const someSelected = selectedRequests.size > 0 && selectedRequests.size < paginatedRequests.length;

  return (
    <div
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface-neutral-xx-weak)',
      }}
    >
      {/* Page Header - Fixed */}
      <div className="px-8 pt-8 pb-6 shrink-0">
        <h1
          style={{
            fontFamily: "'Fields', system-ui, sans-serif",
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '58px',
            color: 'var(--color-primary-strong)',
            margin: 0,
          }}
        >
          Requests
        </h1>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex px-10 pb-10 min-h-0 overflow-hidden"
        style={{
          gap: '24px',
        }}
      >
        {/* Sidebar */}
        <InboxSidebar
          tabs={inboxTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Content Card */}
        <InboxContentCard>
          {/* Header with Select All - Fixed at top */}
          <div
            className="flex items-center gap-4 px-5 py-4 border-b shrink-0"
            style={{
              borderColor: 'var(--border-neutral-xx-weak)',
            }}
          >
            {/* Select All Checkbox */}
            <div
              className="shrink-0 relative"
              style={{
                width: '20px',
                height: '20px',
              }}
            >
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected;
                  }
                }}
                onChange={handleSelectAll}
                className="absolute inset-0 w-full h-full cursor-pointer"
                style={{
                  accentColor: 'var(--color-primary-strong)',
                  margin: 0,
                }}
              />
            </div>

            {/* Header Text */}
            <div
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                lineHeight: '18px',
                color: 'var(--text-neutral-medium)',
              }}
            >
              {selectedRequests.size > 0
                ? `${selectedRequests.size} Selected`
                : 'Select All'}
            </div>
          </div>

          {/* Request List */}
          <div className="flex-1 overflow-y-auto">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <RequestItem
                  key={request.id}
                  request={request}
                  isSelected={selectedRequests.has(request.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))
            ) : (
              <div
                className="flex items-center justify-center h-full"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  color: 'var(--text-neutral-medium)',
                }}
              >
                No requests found
              </div>
            )}
          </div>

          {/* Pagination - Fixed at bottom */}
          {filteredRequests.length > 0 && (
            <div
              className="border-t shrink-0"
              style={{
                borderColor: 'var(--border-neutral-xx-weak)',
              }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredRequests.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </InboxContentCard>
      </div>
    </div>
  );
}

export default Inbox;
