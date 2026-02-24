import { useState, useMemo, useRef, useEffect } from 'react';
import { Dropdown, Icon, Pagination } from '../../components';
import { EmployeeTableRow } from '../EmployeeTableRow';
import type { Employee } from '../../data/employees';

interface PeopleListViewProps {
  employees: Employee[];
}

export function PeopleListView({ employees }: PeopleListViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 50;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter employees by status
  const filteredEmployees = useMemo(() => {
    if (filterStatus === 'all') {
      return employees;
    }
    return employees.filter((emp) => emp.employmentStatus === filterStatus);
  }, [employees, filterStatus]);

  // Pagination
  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const statusOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contractor', label: 'Contractor' },
  ];

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Group: Filter + Dropdown + Icon + Count */}
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            style={{ boxShadow: 'var(--shadow-100)' }}
            aria-label="Filter"
          >
            <Icon name="sliders" size={16} className="text-[var(--icon-neutral-x-strong)]" />
          </button>

          {/* All Employees Dropdown */}
          <Dropdown
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-[248px]"
          />

          {/* User Group Icon + Count */}
          <div className="flex items-center gap-2" style={{ marginLeft: '16px' }}>
            <Icon
              name="user-group"
              size={16}
              className="text-[var(--icon-neutral-strong)]"
            />
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'var(--text-neutral-weak)',
              }}
            >
              {totalItems}
            </span>
          </div>
        </div>

        {/* Right Group: Showing + Active + Ellipsis */}
        <div className="flex items-center gap-3">
          {/* Showing Label */}
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: 'var(--text-neutral-x-strong)',
            }}
          >
            Showing
          </span>

          {/* Status Dropdown */}
          <Dropdown
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'all', label: 'All' },
            ]}
            value="all"
            onChange={() => {}}
            className="w-[166px]"
          />

          {/* Ellipsis Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
              style={{ boxShadow: 'var(--shadow-100)' }}
              aria-label="More options"
            >
              <Icon name="ellipsis" size={16} className="text-[var(--icon-neutral-x-strong)]" />
            </button>
            {isMenuOpen && (
              <div
                className="absolute right-0 z-50 mt-2 w-[200px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-small)] shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-4 py-3 text-left text-[15px] text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                >
                  Power Edit Employees
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-4 py-3 text-left text-[15px] text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                >
                  Download Forms
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-4 py-3 text-left text-[15px] text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                >
                  Customize View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div
        className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--surface-neutral-xx-weak)' }}>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                  borderTopLeftRadius: '8px',
                }}
              >
                Employee Photo
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Employee #
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Last Name, First Name
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Job Title
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Location
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Employment Status
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                  borderTopRightRadius: '8px',
                }}
              >
                Hire Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <EmployeeTableRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-[var(--border-neutral-x-weak)]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default PeopleListView;
