import type { Employee } from '../../data/employees';

interface EmployeeTableRowProps {
  employee: Employee;
}

export function EmployeeTableRow({ employee }: EmployeeTableRowProps) {
  return (
    <tr
      className="group hover:bg-[var(--surface-neutral-xx-weak)] transition-colors border-b border-[var(--border-neutral-x-weak)]"
    >
      {/* Employee Photo */}
      <td className="px-6 py-4">
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-100)',
          }}
        >
          <img
            src={employee.avatar}
            alt={employee.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </td>

      {/* Employee # */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--text-neutral-strong)',
        }}
      >
        {employee.employeeNumber}
      </td>

      {/* Last Name First Name */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
        }}
      >
        <a
          href="#"
          className="text-blue-600 dark:text-blue-400 no-underline hover:underline"
        >
          {employee.lastName}, {employee.firstName}
        </a>
      </td>

      {/* Job Title */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--text-neutral-medium)',
        }}
      >
        {employee.jobTitle}
      </td>

      {/* Location */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--text-neutral-medium)',
        }}
      >
        {employee.location}
      </td>

      {/* Employment Status */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--text-neutral-medium)',
        }}
      >
        {employee.employmentStatus}
      </td>

      {/* Hire Date */}
      <td
        className="px-6 py-4"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--text-neutral-medium)',
        }}
      >
        {employee.hireDate}
      </td>
    </tr>
  );
}

export default EmployeeTableRow;
