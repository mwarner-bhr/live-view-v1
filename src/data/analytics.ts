export interface Insight {
  id: number;
  title: string;
  description: string;
  icon: 'document' | 'circle-info' | 'graduation-cap';
}

export interface RecentReport {
  id: number;
  name: string;
  owner: string;
  lastViewed: string;
  icon: 'chart' | 'users' | 'document';
}

export const insights: Insight[] = [
  {
    id: 1,
    title: 'Engineering Turnover Spike',
    description: 'Engineering department turnover is 23% higher this quarter than last.',
    icon: 'document',
  },
  {
    id: 2,
    title: 'Gender Pay Gap',
    description: '12% pay gap between male and female employees',
    icon: 'circle-info',
  },
  {
    id: 3,
    title: 'Training Completion Rates',
    description: 'Only 67% of employees have completed their trainings.',
    icon: 'graduation-cap',
  },
];

export const recentReports: RecentReport[] = [
  {
    id: 1,
    name: 'Pay by Location',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 2,
    name: 'Age Profile',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 3,
    name: 'Audit Trail',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 4,
    name: 'EEO-1',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'users',
  },
  {
    id: 5,
    name: 'ACA Benefit History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 6,
    name: 'Missing Data',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 7,
    name: 'Birthdays',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 8,
    name: 'Pay by Department',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 9,
    name: 'Employment Status History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 10,
    name: 'Change History',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 11,
    name: 'EEO Details',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'users',
  },
  {
    id: 12,
    name: 'Benefit Summary',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 13,
    name: 'Pay by Job Title',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'chart',
  },
  {
    id: 14,
    name: 'Point-In-Time',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 15,
    name: '2-Step Login Configuration',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
  {
    id: 16,
    name: 'ACA Monthly Totals',
    owner: 'BambooHR',
    lastViewed: '',
    icon: 'document',
  },
];

export const suggestionQuestions = [
  'What are the key factors of turnover?',
  'Do an analysis of compensation equity',
  'How happy are employees?',
  'What important trends should be aware of?',
];
