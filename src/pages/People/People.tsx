import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, EmployeeCard, Dropdown, PeopleListView, OrgChartView } from '../../components';
import { employees } from '../../data/employees';

type GroupBy = 'name' | 'department' | 'location' | 'division';
type ViewMode = 'list' | 'directory' | 'orgChart';

export function People() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState<GroupBy>('name');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Get unique departments for filter
  const departments = useMemo(() => {
    const unique = Array.from(new Set(employees.map((e) => e.department)));
    return [{ value: 'all', label: 'All Employees' }].concat(
      unique.map((dept) => ({ value: dept, label: dept }))
    );
  }, []);

  // Filter employees by search and department
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, filterDepartment]);

  // Group employees
  const groupedEmployees = useMemo(() => {
    if (groupBy === 'name') {
      // Group by first letter of name
      const groups: Record<string, typeof filteredEmployees> = {};
      filteredEmployees.forEach((employee) => {
        const key = employee.name.charAt(0).toUpperCase();
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(employee);
      });

      // Sort employees within each group
      Object.keys(groups).forEach((key) => {
        groups[key].sort((a, b) => a.name.localeCompare(b.name));
      });

      return groups;
    }

    // Group by the selected field
    const groups: Record<string, typeof filteredEmployees> = {};
    filteredEmployees.forEach((employee) => {
      const key = employee[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(employee);
    });

    // Sort employees within each group
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });

    return groups;
  }, [filteredEmployees, groupBy]);

  const groupByOptions = [
    { value: 'name', label: 'Name' },
    { value: 'department', label: 'Department' },
    { value: 'location', label: 'Location' },
    { value: 'division', label: 'Division' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          style={{
            fontFamily: 'Fields, system-ui, sans-serif',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: '56px',
            color: '#2e7918',
          }}
        >
          People
        </h1>
        <a
          href="#"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 400,
            color: 'var(--color-primary-strong)',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          Quick Access to the Directory
        </a>
      </div>

      {/* Actions Bar with Tabs */}
      <div className="flex items-end justify-between border-b border-[var(--border-neutral-x-weak)] mb-6">
        <div className="pb-4">
          <Button icon="circle-plus-lined" variant="outlined" onClick={() => navigate('/people/new')}>
            New Employee
          </Button>
        </div>

        {/* View Tabs */}
        <div className="flex items-center" style={{ gap: '24px' }}>
          <button
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 pb-3 text-[15px] transition-colors relative"
            style={{
              fontWeight: viewMode === 'list' ? 700 : 500,
              color: viewMode === 'list' ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
            }}
          >
            <Icon name="file-lines" size={20} />
            List
            {viewMode === 'list' && (
              <span
                className="absolute left-0 right-0 h-[2px] bg-[var(--color-primary-strong)]"
                style={{ bottom: '-1px' }}
              />
            )}
          </button>
          <button
            onClick={() => setViewMode('directory')}
            className="flex items-center gap-2 pb-3 text-[15px] transition-colors relative"
            style={{
              fontWeight: viewMode === 'directory' ? 700 : 500,
              color: viewMode === 'directory' ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
            }}
          >
            <Icon name="user-group" size={20} />
            Directory
            {viewMode === 'directory' && (
              <span
                className="absolute left-0 right-0 h-[2px] bg-[var(--color-primary-strong)]"
                style={{ bottom: '-1px' }}
              />
            )}
          </button>
          <button
            onClick={() => setViewMode('orgChart')}
            className="flex items-center gap-2 pb-3 text-[15px] transition-colors relative"
            style={{
              fontWeight: viewMode === 'orgChart' ? 700 : 500,
              color: viewMode === 'orgChart' ? 'var(--color-primary-strong)' : 'var(--text-neutral-medium)',
            }}
          >
            <Icon name="chart-pie-simple" size={20} />
            Org Chart
            {viewMode === 'orgChart' && (
              <span
                className="absolute left-0 right-0 h-[2px] bg-[var(--color-primary-strong)]"
                style={{ bottom: '-1px' }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === 'list' && (
        <PeopleListView employees={employees} />
      )}

      {viewMode === 'directory' && (
        <>
          {/* Filters Bar */}
          <div className="flex items-center gap-4 mb-8">
            {/* Search */}
            <div className="flex-1">
              <div
                className="flex items-center gap-2 h-10 px-4 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-full)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              >
                <Icon name="magnifying-glass" size={16} className="text-[var(--icon-neutral-strong)]" />
                <input
                  type="text"
                  placeholder="Search Directory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[15px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                />
              </div>
            </div>

            {/* Group By */}
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Group by
              </span>
              <Dropdown
                options={groupByOptions}
                value={groupBy}
                onChange={(value) => setGroupBy(value as GroupBy)}
                className="w-[180px]"
              />
            </div>

            {/* Filter By */}
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Filter by
              </span>
              <Dropdown
                options={departments}
                value={filterDepartment}
                onChange={setFilterDepartment}
                className="w-[200px]"
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="space-y-8">
            {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
              <div key={groupName} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
                {/* Group Header */}
                <div className="px-6 py-4">
                  <h2
                    className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
                    style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
                  >
                    {groupName}
                  </h2>
                </div>

                {/* Employee Cards */}
                <div className="divide-y divide-[var(--border-neutral-x-weak)]">
                  {groupEmployees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>
              </div>
            ))}

            {/* No Results */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[15px] text-[var(--text-neutral-medium)]">
                  No employees found matching your search.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {viewMode === 'orgChart' && (
        <div className="h-[calc(100vh-280px)]">
          <OrgChartView employees={employees} />
        </div>
      )}
    </div>
  );
}

export default People;
