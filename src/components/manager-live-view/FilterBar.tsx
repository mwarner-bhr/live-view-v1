import type { EmployeeStatus } from '../../types/managerLiveView';

interface FilterBarProps {
  departments: string[];
  locations: string[];
  statusFilter: EmployeeStatus | 'all';
  departmentFilter: string;
  locationFilter: string;
  searchQuery: string;
  onlyAlerts: boolean;
  showRisks: boolean;
  onStatusFilterChange: (value: EmployeeStatus | 'all') => void;
  onDepartmentFilterChange: (value: string) => void;
  onLocationFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onOnlyAlertsChange: (value: boolean) => void;
  onShowRisksChange: (value: boolean) => void;
}

const statusOptions: Array<{ label: string; value: EmployeeStatus | 'all' }> = [
  { label: 'All statuses', value: 'all' },
  { label: 'Clocked In', value: 'clocked_in' },
  { label: 'On Break', value: 'on_break' },
  { label: 'Clocked Out', value: 'clocked_out' },
  { label: 'Absent', value: 'absent' },
  { label: 'PTO', value: 'pto' },
];

export function FilterBar({
  departments,
  locations,
  statusFilter,
  departmentFilter,
  locationFilter,
  searchQuery,
  onlyAlerts,
  showRisks,
  onStatusFilterChange,
  onDepartmentFilterChange,
  onLocationFilterChange,
  onSearchChange,
  onOnlyAlertsChange,
  onShowRisksChange,
}: FilterBarProps) {
  return (
    <section className="rounded-2xl border border-[var(--border-neutral-x-weak)] bg-white p-3 sm:p-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <select
          className="h-10 rounded-xl border border-[var(--border-neutral-medium)] px-3 text-sm"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as EmployeeStatus | 'all')}
          aria-label="Filter by status"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <select
          className="h-10 rounded-xl border border-[var(--border-neutral-medium)] px-3 text-sm"
          value={departmentFilter}
          onChange={(event) => onDepartmentFilterChange(event.target.value)}
          aria-label="Filter by department"
        >
          <option value="all">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>

        <select
          className="h-10 rounded-xl border border-[var(--border-neutral-medium)] px-3 text-sm"
          value={locationFilter}
          onChange={(event) => onLocationFilterChange(event.target.value)}
          aria-label="Filter by location"
        >
          <option value="all">All locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <input
          className="h-10 rounded-xl border border-[var(--border-neutral-medium)] px-3 text-sm"
          placeholder="Search name"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search employee name"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-[var(--text-neutral-x-strong)]">
          <input type="checkbox" checked={onlyAlerts} onChange={(event) => onOnlyAlertsChange(event.target.checked)} />
          Only show Alerts
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[var(--text-neutral-x-strong)]">
          <input type="checkbox" checked={showRisks} onChange={(event) => onShowRisksChange(event.target.checked)} />
          Show Risks
        </label>
      </div>
    </section>
  );
}
