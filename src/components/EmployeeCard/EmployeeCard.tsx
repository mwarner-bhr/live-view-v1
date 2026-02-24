import type { Employee } from '../../data/employees';
import { Icon } from '../Icon';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="flex items-start gap-6 p-6">
      {/* Avatar */}
      <img
        src={employee.avatar}
        alt={employee.name}
        className="w-[88px] h-[88px] rounded-[var(--radius-small)] object-cover shrink-0"
        style={{ boxShadow: 'var(--shadow-100)' }}
      />

      {/* Content */}
      <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-2">
        {/* Left Column */}
        <div className="flex flex-col gap-1">
          {/* Name */}
          <a
            href="#"
            className="font-semibold text-[15px] leading-[22px] text-[#2563eb] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            {employee.name}
          </a>

          {/* Department */}
          <p className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
            {employee.department}
          </p>

          {/* Location */}
          <p className="text-[14px] leading-[20px] text-[var(--text-neutral-weak)]">
            Location · {employee.location}
          </p>

          {/* Division */}
          <p className="text-[14px] leading-[20px] text-[var(--text-neutral-weak)]">
            {employee.division}
          </p>

          {/* LinkedIn Icon */}
          <div className="mt-1">
            <a
              href="#"
              className="inline-flex items-center justify-center w-6 h-6 text-[var(--icon-neutral-x-strong)] hover:text-[var(--icon-neutral-xx-strong)]"
              onClick={(e) => e.preventDefault()}
            >
              <Icon name="user-group" size={16} />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Icon name="inbox" size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
            <span className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
              {employee.email}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Icon name="circle-user" size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
            <span className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
              {employee.phone}
            </span>
          </div>

          {/* Reports To */}
          <div className="flex items-center gap-2 mt-2">
            <Icon name="user-group" size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
            <span className="text-[14px] leading-[20px] text-[var(--text-neutral-weak)]">
              Reports to {employee.reportsTo}
            </span>
          </div>

          {/* Direct Reports */}
          <div className="flex items-center gap-2">
            <Icon name="user-group" size={16} className="text-[var(--icon-neutral-strong)] shrink-0" />
            <span className="text-[14px] leading-[20px] text-[var(--text-neutral-weak)]">
              {employee.directReports} direct reports
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
