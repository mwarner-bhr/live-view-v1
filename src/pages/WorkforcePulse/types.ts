export type EmployeeStatus = 'CLOCKED_IN' | 'ON_BREAK' | 'CLOCKED_OUT';

export type Severity = 'LOW' | 'MED' | 'HIGH';
export type ConfidenceLevel = 'LOW' | 'MED' | 'HIGH';

export type ExceptionType =
  | 'BEHAVIOR_DEVIATION'
  | 'OVERTIME_RISK'
  | 'PRESENCE_CONFIDENCE'
  | 'TIME_INTEGRITY'
  | 'BREAK_RISK'
  | 'COVERAGE_GAP'
  | 'LATE_VS_SCHEDULE';

export type ImpactTag = 'Cost' | 'Compliance' | 'Coverage' | 'Pattern';

export interface SessionLocation {
  lat: number;
  lng: number;
  label: string;
}

export interface EmployeeSession {
  clockInTime?: string;
  breakStartTime?: string;
  method: 'MOBILE' | 'KIOSK';
  location?: SessionLocation;
  photoUrl?: string;
  faceMatchScore?: number;
  locationConsistencyScore?: number;
  deviceFamiliarityScore?: number;
}

export interface EmployeeBaselines {
  startWindow: {
    start: string;
    end: string;
  };
  shiftLengthMinutes: number;
  breakLengthMinutes: number;
  usualLocationLabel: string;
}

export interface OvertimeState {
  thresholdHours: number;
  workedThisWeekHours: number;
}

export interface TimeIntegrityState {
  unassignedHours: number;
  editsCount: number;
  submittedHours: number;
}

export interface HistoricalAnomaly {
  type: ExceptionType;
  happenedAt: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  scheduleTag?: 'UNSCHEDULED' | 'PTO';
  status: EmployeeStatus;
  currentSession: EmployeeSession;
  baselines: EmployeeBaselines;
  overtime: OvertimeState;
  timeIntegrity: TimeIntegrityState;
  history: {
    recentAnomalies: HistoricalAnomaly[];
  };
  lastClockOutAt?: string;
}

export interface OrgSettings {
  schedulingEnabled: boolean;
  overtimeEnabled: boolean;
  kioskPhotoEnabled: boolean;
  geofenceEnabled: boolean;
}

export interface ExceptionAction {
  id: string;
  label: string;
  intent?: 'primary' | 'secondary' | 'danger';
  actionKey: 'REVIEW' | 'MESSAGE' | 'ADJUST' | 'VERIFY' | 'APPROVE';
}

export interface WorkforceException {
  id: string;
  type: ExceptionType;
  title: string;
  summary: string;
  severity: Severity;
  confidence: ConfidenceLevel;
  impactTags: ImpactTag[];
  employee: {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string;
  };
  createdAt: string;
  repetitionCount: number;
  triggers: string[];
  actions: ExceptionAction[];
}

export interface HeaderCounts {
  clockedIn: number;
  onBreak: number;
  clockedOutRecently: number;
  approachingOvertime: number;
}

export interface WorkforceSnapshot {
  employees: EmployeeRecord[];
  settings: OrgSettings;
  exceptions: WorkforceException[];
  header: HeaderCounts;
  statusSentence: string;
  lastUpdated: string;
}
