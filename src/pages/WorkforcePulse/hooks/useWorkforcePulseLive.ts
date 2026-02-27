import { useMemo, useState } from 'react';
import { workforceEmployees, workforceSettings } from '../mockData';
import type { EmployeeRecord, WorkforceException } from '../types';
import { detectWorkforceExceptions, summarizeHeader } from '../utils/detectors';

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
  const [employees] = useState<EmployeeRecord[]>(() => structuredClone(workforceEmployees));
  const [lastUpdated] = useState(() => new Date().toISOString());

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
