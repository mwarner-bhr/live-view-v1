import { useState } from 'react';
import { Icon, Dropdown, AssessmentBlock } from '../../components';

interface AssessmentsTabContentProps {
  employeeName: string;
}

export function AssessmentsTabContent({ employeeName }: AssessmentsTabContentProps) {
  const [dateRange, setDateRange] = useState('jan-apr-2024');

  // Date range options
  const dateRangeOptions = [
    { value: 'jan-apr-2024', label: 'January 21, 2024 - Apr 20, 2024' },
    { value: 'last-6-months', label: 'Last 6 months' },
    { value: 'last-12-months', label: 'Last 12 months' },
    { value: 'all-time', label: 'All time' },
  ];

  // Mock assessment data
  const assessmentData = {
    selfAssessment: {
      completedBy: 'Jess Cordova',
      completedDate: 'Dec 18 at 12:43 PM',
      questions: [
        {
          question: 'How well does Initech recognize my value?',
          answer: 'I feel I am highly valued.',
        },
        {
          question: 'What would have the greatest impact on my ability to do my best work more often?',
          answer: 'Nothing, I have all I need.',
        },
        {
          question: 'What are some things I do well?',
          answer:
            '"Quantum mechanics" is the descriptor of the behavior of matter and light in all its details and, in particular, of the happenings on an atomic scale.',
        },
        {
          question: 'How could I improve?',
          answer: 'We know how large objects will act, but things on a small scale just do not act that way.',
        },
      ],
    },
    managerAssessment: {
      completedBy: 'Lucy Samuels',
      completedDate: 'Dec 21 at 9:00 AM',
      hiddenQuestions: [
        {
          question: 'If Jess got a job offer elsewhere, I would...',
          rating: 3,
          answer: 'Convince Jess to stay. Jess would be difficult to replace.',
        },
        {
          question: 'How engaged is Jess at work?',
          rating: 3,
          answer: 'High engagement and great attitude.',
        },
      ],
      visibleQuestions: [
        {
          question: 'What are some things Jess does well?',
          answer:
            '"Quantum mechanics" is the descriptor of the behavior of matter and light in all its details and, in particular, of the happenings on an atomic scale.',
        },
        {
          question: 'How could Jess improve?',
          answer: 'We know how large objects will act, but things on a small scale just do not act that way.',
        },
      ],
    },
  };

  return (
    <div className="flex flex-col">
      {/* Top Bar: Date Range and Start Assessment */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Label and Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-[var(--text-neutral-x-strong)]">Assessments</span>
          <Dropdown
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            className="w-[371px] [&>button]:h-8"
          />
        </div>

        {/* Right: Start Assessment Button */}
        <button className="inline-flex items-center gap-2 text-[15px] font-normal text-[var(--color-link)] hover:underline">
          <Icon name="temperature-half" size={16} className="text-current" />
          Start Assessment
        </button>
      </div>

      {/* Assessment Block */}
      <AssessmentBlock
        selfAssessment={assessmentData.selfAssessment}
        managerAssessment={assessmentData.managerAssessment}
      />
    </div>
  );
}

export default AssessmentsTabContent;
