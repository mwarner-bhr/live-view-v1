import type { Employee } from '../../types/managerLiveView';
import { getEmployeeAttentionScore } from '../../utils/attentionScore';
import { EmployeeRow } from './EmployeeRow';

interface EmployeeQueueProps {
  employees: Employee[];
  onMessage: (employee: Employee) => void;
  onFixTime: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

export function EmployeeQueue({ employees, onMessage, onFixTime, onView }: EmployeeQueueProps) {
  return (
    <section className="space-y-3" aria-label="Employee work queue">
      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          attentionScore={getEmployeeAttentionScore(employee)}
          onMessage={onMessage}
          onFixTime={onFixTime}
          onView={onView}
        />
      ))}
    </section>
  );
}
