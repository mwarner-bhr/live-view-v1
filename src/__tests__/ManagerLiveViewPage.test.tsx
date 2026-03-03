import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ManagerLiveViewPage } from '../pages/ManagerLiveView/ManagerLiveViewPage';
import type { Alert, Employee, Insight } from '../types/managerLiveView';

jest.mock('../api/mockClockApi', () => ({
  fetchEmployees: jest.fn(),
  fetchAlerts: jest.fn(),
  fetchInsights: jest.fn(),
}));

import { fetchAlerts, fetchEmployees, fetchInsights } from '../api/mockClockApi';

const mockedFetchEmployees = fetchEmployees as jest.MockedFunction<typeof fetchEmployees>;
const mockedFetchAlerts = fetchAlerts as jest.MockedFunction<typeof fetchAlerts>;
const mockedFetchInsights = fetchInsights as jest.MockedFunction<typeof fetchInsights>;

const employees: Employee[] = [
  {
    id: 'e-1',
    name: 'Maria Chen',
    avatarUrl: null,
    role: 'Assoc',
    department: 'Operations',
    location: 'HQ',
    status: 'clocked_in',
    scheduledStart: '08:00',
    scheduledEnd: '16:00',
    todayMinutes: 300,
    weekMinutes: 1600,
    exceptions: [{ type: 'missed_punch' }],
    punches: [{ date: '2026-03-02', minutesLate: 8 }],
  },
  {
    id: 'e-2',
    name: 'Ari Brown',
    avatarUrl: null,
    role: 'Lead',
    department: 'Finance',
    location: 'HQ',
    status: 'clocked_in',
    scheduledStart: '08:00',
    scheduledEnd: '16:00',
    todayMinutes: 350,
    weekMinutes: 1700,
    punches: [{ date: '2026-03-02', minutesLate: 0 }],
  },
];

const alerts: Alert[] = [
  {
    id: 'a-1',
    employeeId: 'e-1',
    message: 'Missed clock-in',
    timestamp: '2026-03-02T08:16:00Z',
    severity: 'high',
    type: 'missed_clock_in',
    cta: 'fix_punch',
  },
];

const insights: Insight[] = [
  {
    id: 'i-1',
    employeeId: 'e-1',
    summary: 'Maria: 3 late arrivals this week',
    trend: 'worsening',
    impactNote: 'Shift handoff quality is dropping.',
    suggestedActions: ['send_reminder'],
    evidence: [{ date: '2026-02-26', note: 'Late by 8m' }],
  },
];

describe('ManagerLiveViewPage', () => {
  beforeEach(() => {
    mockedFetchEmployees.mockResolvedValue(employees);
    mockedFetchAlerts.mockResolvedValue(alerts);
    mockedFetchInsights.mockResolvedValue(insights);
  });

  test('renders data and keeps queue sorted by attention score', async () => {
    render(
      <MemoryRouter>
        <ManagerLiveViewPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Manager Live View')).toBeInTheDocument();

    const queue = screen.getByLabelText('Employee work queue');
    const names = within(queue).getAllByText(/Maria Chen|Ari Brown/).map((node) => node.textContent);
    expect(names[0]).toBe('Maria Chen');
  });

  test('supports only alerts toggle and evidence expansion', async () => {
    render(
      <MemoryRouter>
        <ManagerLiveViewPage />
      </MemoryRouter>,
    );

    await screen.findByText('Manager Live View');

    fireEvent.click(screen.getByLabelText('Only show Alerts'));

    await waitFor(() => {
      expect(screen.getByText('Maria Chen')).toBeInTheDocument();
      expect(screen.queryByText('Ari Brown')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('View evidence'));
    expect(await screen.findByText('2026-02-26: Late by 8m')).toBeInTheDocument();
  });

  test('opens fix time modal from alert cta', async () => {
    render(
      <MemoryRouter>
        <ManagerLiveViewPage />
      </MemoryRouter>,
    );

    await screen.findByText('Manager Live View');

    const alertArticle = screen.getByText('Missed clock-in').closest('article');
    expect(alertArticle).not.toBeNull();

    fireEvent.click(within(alertArticle as HTMLElement).getByRole('button', { name: 'Fix punch' }));

    expect(await screen.findByText('Fix time for Maria Chen')).toBeInTheDocument();
  });
});
