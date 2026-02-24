import { useEffect, useMemo, useState } from 'react';
import { workforceEmployees, workforceSettings } from '../mockData';
import type { EmployeeRecord, WorkforceException } from '../types';
import { detectWorkforceExceptions, mutateEmployeesForSimulation, summarizeHeader } from '../utils/detectors';

export interface WorkforceLiveState {
  employees: EmployeeRecord[];
  exceptions: WorkforceException[];
  counts: {
    clockedIn: number;
    onBreak: number;
    clockedOutRecently: number;
    approachingOvertime: number;
  };
  statusSentence: string;
  lastUpdated: string;
  settings: typeof workforceSettings;
}

export function useWorkforcePulseLive(): WorkforceLiveState {
  const [employees, setEmployees] = useState<EmployeeRecord[]>(() => structuredClone(workforceEmployees));
  const [lastUpdated, setLastUpdated] = useState(() => new Date().toISOString());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setEmployees((prev) => mutateEmployeesForSimulation(prev, workforceSettings));
      setLastUpdated(new Date().toISOString());
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const exceptions = useMemo(
    () => detectWorkforceExceptions(employees, workforceSettings, lastUpdated),
    [employees, lastUpdated],
  );

  const { counts, statusSentence } = useMemo(
    () => summarizeHeader(employees, exceptions),
    [employees, exceptions],
  );

  return {
    employees,
    exceptions,
    counts,
    statusSentence,
    lastUpdated,
    settings: workforceSettings,
  };
}

export default useWorkforcePulseLive;
