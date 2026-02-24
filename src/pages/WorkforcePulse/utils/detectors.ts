import type {
  ConfidenceLevel,
  EmployeeRecord,
  ExceptionAction,
  ExceptionType,
  HeaderCounts,
  ImpactTag,
  OrgSettings,
  Severity,
  WorkforceException,
} from '../types';

const IMPACT_PRIORITY: ImpactTag[] = ['Compliance', 'Cost', 'Coverage', 'Pattern'];

function toMinutes(iso?: string): number | null {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
}

function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function confidenceFromScore(score: number): ConfidenceLevel {
  if (score >= 0.75) return 'HIGH';
  if (score >= 0.45) return 'MED';
  return 'LOW';
}

function combineConfidence(employee: EmployeeRecord): ConfidenceLevel {
  const pieces = [
    employee.currentSession.deviceFamiliarityScore ?? 0.5,
    employee.currentSession.locationConsistencyScore ?? 0.5,
    employee.currentSession.faceMatchScore ?? 0.5,
  ];
  const avg = pieces.reduce((a, b) => a + b, 0) / pieces.length;
  return confidenceFromScore(avg);
}

function repetitionCount(employee: EmployeeRecord, type: ExceptionType): number {
  return employee.history.recentAnomalies.filter((a) => a.type === type).length;
}

function escalateSeverity(base: Severity, repetition: number): Severity {
  if (repetition >= 3) return 'HIGH';
  if (repetition >= 2 && base === 'LOW') return 'MED';
  if (repetition >= 2 && base === 'MED') return 'HIGH';
  return base;
}

function defaultActions(type: ExceptionType): ExceptionAction[] {
  switch (type) {
    case 'OVERTIME_RISK':
      return [
        { id: 'approve-adjustment', label: 'Adjust Shift', actionKey: 'ADJUST', intent: 'primary' },
        { id: 'msg-employee', label: 'Message Employee', actionKey: 'MESSAGE', intent: 'secondary' },
      ];
    case 'TIME_INTEGRITY':
      return [
        { id: 'review-timecard', label: 'Review Timecard', actionKey: 'REVIEW', intent: 'primary' },
        { id: 'ask-clarify', label: 'Request Clarification', actionKey: 'MESSAGE', intent: 'secondary' },
      ];
    case 'PRESENCE_CONFIDENCE':
      return [
        { id: 'verify-presence', label: 'Verify Presence', actionKey: 'VERIFY', intent: 'primary' },
        { id: 'message-location', label: 'Message Employee', actionKey: 'MESSAGE', intent: 'secondary' },
      ];
    case 'BREAK_RISK':
      return [
        { id: 'nudge-return', label: 'Nudge Return', actionKey: 'MESSAGE', intent: 'primary' },
      ];
    default:
      return [
        { id: 'review', label: 'Review', actionKey: 'REVIEW', intent: 'primary' },
      ];
  }
}

function pushException(
  bucket: WorkforceException[],
  employee: EmployeeRecord,
  opts: {
    type: ExceptionType;
    title: string;
    summary: string;
    severity: Severity;
    confidence: ConfidenceLevel;
    impactTags: ImpactTag[];
    triggers: string[];
    createdAt: string;
    actions?: ExceptionAction[];
  },
) {
  const repetition = repetitionCount(employee, opts.type);
  bucket.push({
    id: `${employee.id}-${opts.type}-${Math.floor(new Date(opts.createdAt).getTime() / 1000)}`,
    type: opts.type,
    title: opts.title,
    summary: opts.summary,
    severity: escalateSeverity(opts.severity, repetition),
    confidence: opts.confidence,
    impactTags: opts.impactTags,
    employee: {
      id: employee.id,
      name: employee.name,
      role: employee.role,
      avatarUrl: employee.avatarUrl,
    },
    createdAt: opts.createdAt,
    repetitionCount: repetition,
    triggers: opts.triggers,
    actions: opts.actions ?? defaultActions(opts.type),
  });
}

export function detectWorkforceExceptions(
  employees: EmployeeRecord[],
  settings: OrgSettings,
  nowIso: string,
): WorkforceException[] {
  const now = new Date(nowIso);
  const exceptions: WorkforceException[] = [];

  employees.forEach((employee) => {
    const confidence = combineConfidence(employee);
    const minsSinceClockIn = toMinutes(employee.currentSession.clockInTime);
    const minsOnBreak = toMinutes(employee.currentSession.breakStartTime);

    if (employee.status !== 'CLOCKED_OUT' && minsSinceClockIn !== null) {
      const currentMinutes = minsSinceClockIn;
      const expected = employee.baselines.shiftLengthMinutes;
      if (currentMinutes > expected + 90) {
        pushException(exceptions, employee, {
          type: 'BEHAVIOR_DEVIATION',
          title: 'Unusual shift length detected',
          summary: `${employee.name} is ${currentMinutes - expected} minutes beyond typical shift length.`,
          severity: 'MED',
          confidence,
          impactTags: ['Pattern', 'Cost'],
          triggers: ['Shift duration exceeded personal baseline', 'Repetition over recent period'],
          createdAt: now.toISOString(),
        });
      }
    }

    if (employee.status === 'CLOCKED_IN' && minsSinceClockIn !== null && settings.overtimeEnabled) {
      const projected = employee.overtime.workedThisWeekHours + minsSinceClockIn / 60;
      const threshold = employee.overtime.thresholdHours;
      const minutesToOvertime = Math.round((threshold - projected) * 60);
      if (minutesToOvertime <= 60 && minutesToOvertime > 0) {
        pushException(exceptions, employee, {
          type: 'OVERTIME_RISK',
          title: 'Approaching overtime threshold',
          summary: `${employee.name} is projected to hit overtime in ~${minutesToOvertime} minutes.`,
          severity: minutesToOvertime <= 20 ? 'HIGH' : 'MED',
          confidence: 'HIGH',
          impactTags: ['Cost', 'Compliance'],
          triggers: ['Overtime velocity projection', 'Current shift trend'],
          createdAt: now.toISOString(),
        });
      }
    }

    if (employee.status === 'ON_BREAK' && minsOnBreak !== null) {
      const allowed = employee.baselines.breakLengthMinutes;
      if (minsOnBreak > allowed + 10) {
        pushException(exceptions, employee, {
          type: 'BREAK_RISK',
          title: 'Break duration outside baseline',
          summary: `${employee.name} has been on break ${minsOnBreak}m (typical ${allowed}m).`,
          severity: minsOnBreak > allowed + 25 ? 'HIGH' : 'MED',
          confidence,
          impactTags: ['Coverage', 'Pattern'].filter((tag) => settings.schedulingEnabled || tag !== 'Coverage') as ImpactTag[],
          triggers: ['Personal break baseline deviation'],
          createdAt: now.toISOString(),
        });
      }
    }

    if (confidence === 'LOW') {
      const locationLabel = employee.currentSession.location?.label ?? 'Unknown location';
      pushException(exceptions, employee, {
        type: 'PRESENCE_CONFIDENCE',
        title: 'Low confidence in clock-in evidence',
        summary: `Signal confidence is low due to unusual device/location pattern (${locationLabel}).`,
        severity: 'MED',
        confidence,
        impactTags: ['Compliance', 'Pattern'],
        triggers: ['Device familiarity score below threshold', 'Location consistency drift'],
        createdAt: now.toISOString(),
      });
    }

    const unassignedPct = employee.timeIntegrity.submittedHours > 0
      ? (employee.timeIntegrity.unassignedHours / employee.timeIntegrity.submittedHours) * 100
      : 0;

    if (unassignedPct >= 5 || employee.timeIntegrity.editsCount >= 4) {
      pushException(exceptions, employee, {
        type: 'TIME_INTEGRITY',
        title: 'Time integrity health slipping',
        summary: `${unassignedPct.toFixed(1)}% unassigned time and ${employee.timeIntegrity.editsCount} post-submission edits.`,
        severity: unassignedPct >= 10 ? 'HIGH' : 'MED',
        confidence: 'HIGH',
        impactTags: ['Compliance', 'Cost'],
        triggers: ['Unassigned hours ratio exceeded threshold', 'Frequent post-submission edits'],
        createdAt: now.toISOString(),
      });
    }

    if (settings.schedulingEnabled) {
      if (employee.scheduleTag === 'UNSCHEDULED' || employee.scheduleTag === 'PTO') {
        return;
      }
      if (employee.status === 'CLOCKED_OUT' && employee.currentSession.clockInTime == null) {
        const start = hhmmToMinutes(employee.baselines.startWindow.start);
        const end = hhmmToMinutes(employee.baselines.startWindow.end);
        const nowMins = now.getHours() * 60 + now.getMinutes();
        if (nowMins > end + 20 && nowMins < end + 180) {
          pushException(exceptions, employee, {
            type: 'LATE_VS_SCHEDULE',
            title: 'Late against scheduled start',
            summary: `${employee.name} has not clocked in within scheduled window (${employee.baselines.startWindow.start}-${employee.baselines.startWindow.end}).`,
            severity: nowMins > end + 60 ? 'HIGH' : 'MED',
            confidence: 'MED',
            impactTags: ['Coverage', 'Compliance'],
            triggers: ['No clock-in against schedule window'],
            createdAt: now.toISOString(),
          });
        }
        if (nowMins > start && nowMins < end + 120) {
          pushException(exceptions, employee, {
            type: 'COVERAGE_GAP',
            title: 'Coverage gap predicted',
            summary: `Potential coverage impact if ${employee.name} remains unavailable.`,
            severity: 'MED',
            confidence: 'MED',
            impactTags: ['Coverage', 'Cost'],
            triggers: ['Schedule allocation risk'],
            createdAt: now.toISOString(),
          });
        }
      }
    }
  });

  return rankExceptions(exceptions);
}

export function rankExceptions(exceptions: WorkforceException[]): WorkforceException[] {
  const sevRank: Record<Severity, number> = { HIGH: 3, MED: 2, LOW: 1 };

  return [...exceptions].sort((a, b) => {
    if (sevRank[b.severity] !== sevRank[a.severity]) {
      return sevRank[b.severity] - sevRank[a.severity];
    }

    const aImpact = IMPACT_PRIORITY.findIndex((p) => a.impactTags.includes(p));
    const bImpact = IMPACT_PRIORITY.findIndex((p) => b.impactTags.includes(p));
    if (aImpact !== bImpact) return aImpact - bImpact;

    if (b.repetitionCount !== a.repetitionCount) {
      return b.repetitionCount - a.repetitionCount;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function summarizeHeader(employees: EmployeeRecord[], exceptions: WorkforceException[]): { counts: HeaderCounts; statusSentence: string } {
  const now = Date.now();
  const counts: HeaderCounts = {
    clockedIn: employees.filter((e) => e.status === 'CLOCKED_IN').length,
    onBreak: employees.filter((e) => e.status === 'ON_BREAK').length,
    clockedOutRecently: employees.filter((e) => e.lastClockOutAt && now - new Date(e.lastClockOutAt).getTime() < 60 * 60 * 1000).length,
    approachingOvertime: exceptions.filter((e) => e.type === 'OVERTIME_RISK').length,
  };

  let statusSentence = 'Stable';
  const highIssues = exceptions.filter((e) => e.severity === 'HIGH').length;

  if (counts.approachingOvertime >= 2) {
    statusSentence = 'Overtime risk building';
  } else if (highIssues > 0) {
    statusSentence = `${highIssues} high-priority issues need attention`;
  } else if (exceptions.length > 0) {
    statusSentence = `${exceptions.length} issues need attention`;
  }

  return { counts, statusSentence };
}

export function mutateEmployeesForSimulation(employees: EmployeeRecord[], settings: OrgSettings): EmployeeRecord[] {
  const next = structuredClone(employees);
  const pick = next[Math.floor(Math.random() * next.length)];
  const now = new Date();

  if (!pick) return next;

  if (pick.status === 'CLOCKED_IN') {
    if (Math.random() > 0.6) {
      pick.status = 'ON_BREAK';
      pick.currentSession.breakStartTime = now.toISOString();
    } else {
      pick.overtime.workedThisWeekHours = Math.min(42, pick.overtime.workedThisWeekHours + 0.15);
      pick.timeIntegrity.unassignedHours = Math.max(0, pick.timeIntegrity.unassignedHours + (Math.random() - 0.4) * 0.3);
      if (settings.geofenceEnabled && Math.random() > 0.7 && pick.currentSession.location) {
        pick.currentSession.location = {
          ...pick.currentSession.location,
          label: pick.currentSession.location.label.includes('HQ') ? 'Parking Lot - East' : 'Draper HQ',
        };
        pick.currentSession.locationConsistencyScore = Math.max(0.2, (pick.currentSession.locationConsistencyScore ?? 0.7) - 0.12);
      }
    }
  } else if (pick.status === 'ON_BREAK') {
    if (Math.random() > 0.5) {
      pick.status = 'CLOCKED_IN';
      pick.currentSession.breakStartTime = undefined;
    }
  } else {
    if (Math.random() > 0.5) {
      pick.status = 'CLOCKED_IN';
      pick.currentSession.clockInTime = now.toISOString();
      pick.lastClockOutAt = undefined;
    } else {
      pick.lastClockOutAt = now.toISOString();
    }
  }

  // TODO: Replace this simulation with websocket / streaming updates from backend.
  return next;
}
