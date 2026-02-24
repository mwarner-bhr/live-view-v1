import { useState } from 'react';
import { Icon, Tabs, Dropdown } from '../../components';
import { FeedbackTabContent } from './FeedbackTabContent';
import { GoalsTabContent } from './GoalsTabContent';
import { AssessmentsTabContent } from './AssessmentsTabContent';

interface PerformanceTabContentProps {
  employeeName: string;
}

export function PerformanceTabContent({ employeeName }: PerformanceTabContentProps) {
  // State for sub-tabs (Goals, Feedback, Assessments)
  const [activeSubTab, setActiveSubTab] = useState<'goals' | 'feedback' | 'assessments'>('assessments');

  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('last-6-months');

  // Sub-tab configuration
  const subTabs = [
    { id: 'goals', label: 'Goals', icon: 'bullseye' },
    { id: 'feedback', label: 'Feedback', icon: 'bullhorn' },
    { id: 'assessments', label: 'Assessments', icon: 'clipboard' },
  ];

  // Time period options
  const timePeriodOptions = [
    { value: 'last-6-months', label: 'Last 6 months' },
    { value: 'last-12-months', label: 'Last 12 months' },
    { value: 'last-year', label: 'Last year' },
    { value: 'all-time', label: 'All time' },
  ];

  return (
    <>
      {/* Performance Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <Icon name="chart-line" size={24} className="text-[var(--color-primary-strong)]" />
        <h2
          className="text-[26px] font-semibold text-[var(--color-primary-strong)]"
          style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
        >
          Performance
        </h2>
      </div>

      {/* White Card Container */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6">
        {/* Sub-navigation Tabs */}
        <Tabs
          tabs={subTabs}
          activeTab={activeSubTab}
          onTabChange={(id) => setActiveSubTab(id as 'goals' | 'feedback' | 'assessments')}
          variant="default"
        />

        {/* Time Period Dropdown - Only show for Feedback and Assessments */}
        {(activeSubTab === 'feedback' || activeSubTab === 'assessments') && (
          <div className="mt-4">
            <Dropdown
              options={timePeriodOptions}
              value={timePeriod}
              onChange={setTimePeriod}
              className="w-[212px] [&>button]:h-8"
            />
          </div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border-neutral-x-weak)] my-4" />

        {/* Sub-tab Content */}
        <div className="mt-4">
          {activeSubTab === 'feedback' && (
            <FeedbackTabContent employeeName={employeeName} />
          )}
          {activeSubTab === 'goals' && (
            <GoalsTabContent employeeName={employeeName} />
          )}
          {activeSubTab === 'assessments' && (
            <AssessmentsTabContent employeeName={employeeName} />
          )}
        </div>
      </div>
    </>
  );
}

export default PerformanceTabContent;
