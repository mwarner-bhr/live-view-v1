import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAlerts, fetchEmployees, fetchInsights } from '../../api/mockClockApi';
import { EmployeeQueue } from '../../components/manager-live-view/EmployeeQueue';
import { FilterBar } from '../../components/manager-live-view/FilterBar';
import { TeamHealthPanel } from '../../components/manager-live-view/TeamHealthPanel';
import { FixTimeModal } from '../../components/manager-live-view/modals/FixTimeModal';
import { MessageComposerModal } from '../../components/manager-live-view/modals/MessageComposerModal';
import type { Alert, Employee, EmployeeStatus, Insight } from '../../types/managerLiveView';
import { sortByAttentionScore } from '../../utils/attentionScore';

interface ManagerLiveViewPageProps {
  embedded?: boolean;
}

export function ManagerLiveViewPage({ embedded = false }: ManagerLiveViewPageProps) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);

  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [showRisks, setShowRisks] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [messageTarget, setMessageTarget] = useState<Employee | null>(null);
  const [fixTimeTarget, setFixTimeTarget] = useState<Employee | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [employeesResult, alertsResult, insightsResult] = await Promise.all([
          fetchEmployees(),
          fetchAlerts(),
          fetchInsights(),
        ]);

        if (!isMounted) return;
        setEmployees(employeesResult);
        setAlerts(alertsResult);
        setInsights(insightsResult);
      } catch {
        if (!isMounted) return;
        setError('Failed to load manager live view data.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const employeesById = useMemo<Record<string, Employee>>(
    () => employees.reduce((accumulator, employee) => ({ ...accumulator, [employee.id]: employee }), {}),
    [employees],
  );

  const departments = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.department))).sort((a, b) => a.localeCompare(b)),
    [employees],
  );

  const locations = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.location))).sort((a, b) => a.localeCompare(b)),
    [employees],
  );

  const alertedEmployeeIds = useMemo(() => new Set(alerts.map((alert) => alert.employeeId)), [alerts]);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) => (statusFilter === 'all' ? true : employee.status === statusFilter))
      .filter((employee) => (departmentFilter === 'all' ? true : employee.department === departmentFilter))
      .filter((employee) => (locationFilter === 'all' ? true : employee.location === locationFilter))
      .filter((employee) => (onlyAlerts ? alertedEmployeeIds.has(employee.id) : true))
      .filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort(sortByAttentionScore);
  }, [
    alertedEmployeeIds,
    departmentFilter,
    employees,
    locationFilter,
    onlyAlerts,
    searchQuery,
    statusFilter,
  ]);

  const handleAlertCta = (alert: Alert) => {
    const employee = employeesById[alert.employeeId];
    if (!employee) return;

    if (alert.cta === 'message') {
      setMessageTarget(employee);
      return;
    }

    if (alert.cta === 'fix_punch') {
      setFixTimeTarget(employee);
      return;
    }

    setAlerts((current) => current.filter((item) => item.id !== alert.id));
  };

  const handleIgnoreAllAlerts = () => {
    setAlerts([]);
  };

  if (isLoading) {
    return <div className="p-6 text-sm text-[var(--text-neutral-medium)]">Loading manager live view...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-rose-700">{error}</div>;
  }

  return (
    <div className={`h-full space-y-4 ${embedded ? '' : 'p-4 sm:p-6'}`}>
      {!embedded && (
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text-neutral-xx-strong)]">Manager Live View</h1>
            <p className="text-sm text-[var(--text-neutral-medium)]">Prioritized work queue, live alerts, and risk insights.</p>
          </div>
        </header>
      )}

      <FilterBar
        departments={departments}
        locations={locations}
        statusFilter={statusFilter}
        departmentFilter={departmentFilter}
        locationFilter={locationFilter}
        searchQuery={searchQuery}
        onlyAlerts={onlyAlerts}
        showRisks={showRisks}
        onStatusFilterChange={setStatusFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        onLocationFilterChange={setLocationFilter}
        onSearchChange={setSearchQuery}
        onOnlyAlertsChange={setOnlyAlerts}
        onShowRisksChange={setShowRisks}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <EmployeeQueue
          employees={filteredEmployees}
          onMessage={setMessageTarget}
          onFixTime={setFixTimeTarget}
          onView={(employee) => navigate(`/people?employeeId=${employee.id}`)}
        />

        <TeamHealthPanel
          alerts={alerts}
          insights={insights}
          employeesById={employeesById}
          showRisks={showRisks}
          onAlertCta={handleAlertCta}
          onIgnoreAllAlerts={handleIgnoreAllAlerts}
        />
      </div>

      <MessageComposerModal employee={messageTarget} onClose={() => setMessageTarget(null)} />
      <FixTimeModal employee={fixTimeTarget} onClose={() => setFixTimeTarget(null)} />
    </div>
  );
}

export default ManagerLiveViewPage;
