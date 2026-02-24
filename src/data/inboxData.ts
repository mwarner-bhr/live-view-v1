// TypeScript interfaces for Inbox data
export interface InboxRequest {
  id: string;
  // New fields matching Figma design
  title: string; // Main title on line 1
  date: string; // Date on line 1
  subtitleType: 'requester' | 'description'; // Type of subtitle on line 2
  requesterName?: string; // For requester subtitle type
  description?: string; // For description subtitle type
  dueStatus?: 'past-due' | 'due-soon' | null; // Due status badge
  iconType: 'avatar' | 'document' | 'user'; // Icon variant
  avatarUrl?: string; // For avatar icon type
  // Legacy fields (keeping for backward compatibility during transition)
  employeeName: string;
  employeeAvatar: string;
  requestType: string;
  requestTitle: string;
  timeAgo: string;
  status: 'pending' | 'approved' | 'denied';
  category?: string; // For filtering by category
}

export interface InboxSubItem {
  id: string;
  label: string;
  count: number;
  icon?: string;
  subItems?: InboxSubItem[]; // For nested sub-items like under Approvals
}

export interface InboxTab {
  id: string;
  label: string;
  count?: number;
  badge?: number;
  hasDropdown?: boolean;
  subItems?: InboxSubItem[];
  icon?: string;
}

// Mock data for inbox requests
export const mockInboxRequests: InboxRequest[] = [
  {
    id: '1',
    title: 'Vacation Request - Dec 20-27',
    date: 'Dec 15, 2024',
    subtitleType: 'requester',
    requesterName: 'Sarah Johnson',
    dueStatus: 'past-due',
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    // Legacy fields
    employeeName: 'Sarah Johnson',
    employeeAvatar: 'https://i.pravatar.cc/150?img=1',
    requestType: 'Time Off',
    requestTitle: 'Vacation Request - Dec 20-27',
    timeAgo: '2 hours ago',
    status: 'pending',
    category: 'time-off-requests',
  },
  {
    id: '2',
    title: 'Personal Day - Dec 15',
    date: 'Dec 16, 2024',
    subtitleType: 'requester',
    requesterName: 'Michael Chen',
    dueStatus: 'due-soon',
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    // Legacy fields
    employeeName: 'Michael Chen',
    employeeAvatar: 'https://i.pravatar.cc/150?img=2',
    requestType: 'Time Off',
    requestTitle: 'Personal Day - Dec 15',
    timeAgo: '5 hours ago',
    status: 'pending',
    category: 'time-off-requests',
  },
  {
    id: '3',
    title: 'Budget Approval Request',
    date: 'Dec 17, 2024',
    subtitleType: 'description',
    description: 'Q1 2025 Marketing Budget Review and Approval',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Emily Rodriguez',
    employeeAvatar: 'https://i.pravatar.cc/150?img=3',
    requestType: 'Approval',
    requestTitle: 'Budget Approval Request',
    timeAgo: '1 day ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '4',
    title: 'Policy Change Approval',
    date: 'Dec 18, 2024',
    subtitleType: 'requester',
    requesterName: 'James Wilson',
    dueStatus: null,
    iconType: 'user',
    // Legacy fields
    employeeName: 'James Wilson',
    employeeAvatar: 'https://i.pravatar.cc/150?img=4',
    requestType: 'Approval',
    requestTitle: 'Policy Change Approval',
    timeAgo: '1 day ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '5',
    title: 'Address Change',
    date: 'Dec 19, 2024',
    subtitleType: 'description',
    description: 'Update home address for benefits and payroll',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Lisa Anderson',
    employeeAvatar: 'https://i.pravatar.cc/150?img=5',
    requestType: 'Information Update',
    requestTitle: 'Address Change',
    timeAgo: '2 days ago',
    status: 'pending',
    category: 'information-updates',
  },
  {
    id: '6',
    title: 'New Laptop Request',
    date: 'Dec 20, 2024',
    subtitleType: 'requester',
    requesterName: 'David Kim',
    dueStatus: 'due-soon',
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    // Legacy fields
    employeeName: 'David Kim',
    employeeAvatar: 'https://i.pravatar.cc/150?img=6',
    requestType: 'Asset Request',
    requestTitle: 'New Laptop Request',
    timeAgo: '2 days ago',
    status: 'pending',
    category: 'asset-request',
  },
  {
    id: '7',
    title: 'Monitor Request',
    date: 'Dec 21, 2024',
    subtitleType: 'requester',
    requesterName: 'Jennifer Martinez',
    dueStatus: null,
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    // Legacy fields
    employeeName: 'Jennifer Martinez',
    employeeAvatar: 'https://i.pravatar.cc/150?img=7',
    requestType: 'Asset Request',
    requestTitle: 'Monitor Request',
    timeAgo: '3 days ago',
    status: 'pending',
    category: 'asset-request',
  },
  {
    id: '8',
    title: 'Office Chair Request',
    date: 'Dec 22, 2024',
    subtitleType: 'description',
    description: 'Ergonomic chair for remote work setup',
    dueStatus: null,
    iconType: 'user',
    // Legacy fields
    employeeName: 'Robert Taylor',
    employeeAvatar: 'https://i.pravatar.cc/150?img=8',
    requestType: 'Asset Request',
    requestTitle: 'Office Chair Request',
    timeAgo: '3 days ago',
    status: 'pending',
    category: 'asset-request',
  },
  {
    id: '9',
    title: 'Salary Review Request',
    date: 'Dec 23, 2024',
    subtitleType: 'requester',
    requesterName: 'Amanda Brown',
    dueStatus: 'past-due',
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    // Legacy fields
    employeeName: 'Amanda Brown',
    employeeAvatar: 'https://i.pravatar.cc/150?img=9',
    requestType: 'Compensation',
    requestTitle: 'Salary Review Request',
    timeAgo: '4 days ago',
    status: 'pending',
    category: 'compensation',
  },
  {
    id: '10',
    title: 'Bonus Adjustment',
    date: 'Dec 24, 2024',
    subtitleType: 'description',
    description: 'Year-end performance bonus adjustment review',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Christopher Lee',
    employeeAvatar: 'https://i.pravatar.cc/150?img=10',
    requestType: 'Compensation',
    requestTitle: 'Bonus Adjustment',
    timeAgo: '4 days ago',
    status: 'pending',
    category: 'compensation',
  },
  {
    id: '11',
    title: 'Contract Extension',
    date: 'Dec 25, 2024',
    subtitleType: 'requester',
    requesterName: 'Michelle Garcia',
    dueStatus: 'due-soon',
    iconType: 'user',
    // Legacy fields
    employeeName: 'Michelle Garcia',
    employeeAvatar: 'https://i.pravatar.cc/150?img=11',
    requestType: 'Employment Status',
    requestTitle: 'Contract Extension',
    timeAgo: '5 days ago',
    status: 'pending',
    category: 'employment-status',
  },
  {
    id: '12',
    title: 'Job Title Update',
    date: 'Dec 26, 2024',
    subtitleType: 'description',
    description: 'Update job title to Senior Software Engineer',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Daniel White',
    employeeAvatar: 'https://i.pravatar.cc/150?img=12',
    requestType: 'Job Information',
    requestTitle: 'Job Title Update',
    timeAgo: '5 days ago',
    status: 'pending',
    category: 'job-information',
  },
  {
    id: '13',
    title: 'Department Transfer',
    date: 'Dec 27, 2024',
    subtitleType: 'requester',
    requesterName: 'Jessica Harris',
    dueStatus: null,
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    // Legacy fields
    employeeName: 'Jessica Harris',
    employeeAvatar: 'https://i.pravatar.cc/150?img=13',
    requestType: 'Job Information',
    requestTitle: 'Department Transfer',
    timeAgo: '6 days ago',
    status: 'pending',
    category: 'job-information',
  },
  {
    id: '14',
    title: 'Training Program Approval',
    date: 'Dec 28, 2024',
    subtitleType: 'description',
    description: 'Leadership development program for Q1',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Thomas Clark',
    employeeAvatar: 'https://i.pravatar.cc/150?img=14',
    requestType: 'Approval',
    requestTitle: 'Training Program Approval',
    timeAgo: '1 week ago',
    status: 'approved',
    category: 'approvals',
  },
  {
    id: '15',
    title: 'Equipment Purchase',
    date: 'Dec 29, 2024',
    subtitleType: 'requester',
    requesterName: 'Ashley Lewis',
    dueStatus: null,
    iconType: 'user',
    // Legacy fields
    employeeName: 'Ashley Lewis',
    employeeAvatar: 'https://i.pravatar.cc/150?img=15',
    requestType: 'Approval',
    requestTitle: 'Equipment Purchase',
    timeAgo: '1 week ago',
    status: 'approved',
    category: 'approvals',
  },
  {
    id: '16',
    title: 'Remote Work Policy',
    date: 'Dec 30, 2024',
    subtitleType: 'description',
    description: 'Updated remote work policy for 2025',
    dueStatus: 'due-soon',
    iconType: 'document',
    // Legacy fields
    employeeName: 'Brandon Scott',
    employeeAvatar: 'https://i.pravatar.cc/150?img=16',
    requestType: 'Approval',
    requestTitle: 'Remote Work Policy',
    timeAgo: '1 week ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '17',
    title: 'Project Approval',
    date: 'Dec 31, 2024',
    subtitleType: 'requester',
    requesterName: 'Rachel Green',
    dueStatus: null,
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    // Legacy fields
    employeeName: 'Rachel Green',
    employeeAvatar: 'https://i.pravatar.cc/150?img=17',
    requestType: 'Approval',
    requestTitle: 'Project Approval',
    timeAgo: '1 week ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '18',
    title: 'Expense Report',
    date: 'Jan 1, 2025',
    subtitleType: 'description',
    description: 'Q4 2024 business travel expenses',
    dueStatus: 'past-due',
    iconType: 'document',
    // Legacy fields
    employeeName: 'Kevin Brown',
    employeeAvatar: 'https://i.pravatar.cc/150?img=18',
    requestType: 'Approval',
    requestTitle: 'Expense Report',
    timeAgo: '2 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '19',
    title: 'Leave of Absence',
    date: 'Jan 2, 2025',
    subtitleType: 'requester',
    requesterName: 'Sophia Martinez',
    dueStatus: null,
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=19',
    // Legacy fields
    employeeName: 'Sophia Martinez',
    employeeAvatar: 'https://i.pravatar.cc/150?img=19',
    requestType: 'Approval',
    requestTitle: 'Leave of Absence',
    timeAgo: '2 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '20',
    title: 'Hiring Approval',
    date: 'Jan 3, 2025',
    subtitleType: 'description',
    description: 'New developer position for engineering team',
    dueStatus: 'due-soon',
    iconType: 'user',
    // Legacy fields
    employeeName: 'Oliver Davis',
    employeeAvatar: 'https://i.pravatar.cc/150?img=20',
    requestType: 'Approval',
    requestTitle: 'Hiring Approval',
    timeAgo: '2 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '21',
    title: 'Team Restructure',
    date: 'Jan 4, 2025',
    subtitleType: 'requester',
    requesterName: 'Ava Wilson',
    dueStatus: null,
    iconType: 'avatar',
    avatarUrl: 'https://i.pravatar.cc/150?img=21',
    // Legacy fields
    employeeName: 'Ava Wilson',
    employeeAvatar: 'https://i.pravatar.cc/150?img=21',
    requestType: 'Approval',
    requestTitle: 'Team Restructure',
    timeAgo: '3 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '22',
    title: 'Performance Review',
    date: 'Jan 5, 2025',
    subtitleType: 'description',
    description: 'Annual performance review and rating approval',
    dueStatus: null,
    iconType: 'document',
    // Legacy fields
    employeeName: 'Ethan Moore',
    employeeAvatar: 'https://i.pravatar.cc/150?img=22',
    requestType: 'Approval',
    requestTitle: 'Performance Review',
    timeAgo: '3 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
  {
    id: '23',
    title: 'Vendor Contract',
    date: 'Jan 6, 2025',
    subtitleType: 'requester',
    requesterName: 'Isabella Taylor',
    dueStatus: null,
    iconType: 'user',
    // Legacy fields
    employeeName: 'Isabella Taylor',
    employeeAvatar: 'https://i.pravatar.cc/150?img=23',
    requestType: 'Approval',
    requestTitle: 'Vendor Contract',
    timeAgo: '3 weeks ago',
    status: 'pending',
    category: 'approvals',
  },
];

// Inbox tabs configuration - Updated for vertical sidebar
export const inboxTabs: InboxTab[] = [
  {
    id: 'assigned-to-me',
    label: 'Assigned to Me',
    hasDropdown: true,
    icon: 'circle-user',
    subItems: [
      {
        id: 'inbox',
        label: 'Inbox',
        count: 69,
        icon: 'inbox',
        subItems: [
          {
            id: 'approvals',
            label: 'Approvals',
            count: 66,
            icon: 'thumbs-up',
            subItems: [
              { id: 'timesheets', label: 'Timesheets', count: 63 },
              { id: 'time-off-requests', label: 'Time Off Requests', count: 1 },
              { id: 'asset-request', label: 'Asset Request', count: 1 },
              { id: 'job-information', label: 'Job Information', count: 1 },
            ]
          },
          { id: 'onboarding', label: 'Onboarding', count: 3, icon: 'id-badge' },
        ]
      },
      { id: 'completed', label: 'Completed', count: 0, icon: 'check-circle' },
      { id: 'sent', label: 'Sent', count: 0, icon: 'paper-plane' },
    ]
  },
];

// Helper function to filter requests by tab or category
export const getRequestsByTab = (tabId: string): InboxRequest[] => {
  // Handle main inbox - show all pending requests
  if (tabId === 'inbox') {
    return mockInboxRequests.filter(req => req.status === 'pending');
  }

  // Handle sub-categories
  if (tabId === 'approvals' || tabId === 'time-off-requests' ||
      tabId === 'information-updates' || tabId === 'asset-request' ||
      tabId === 'compensation' || tabId === 'employment-status' ||
      tabId === 'job-information') {
    return mockInboxRequests.filter(req => req.category === tabId && req.status === 'pending');
  }

  // Handle other tabs
  switch (tabId) {
    case 'assigned-to-me':
      return mockInboxRequests.filter(req => req.status === 'pending');
    case 'completed':
      return mockInboxRequests.filter(req => req.status === 'approved');
    case 'sent':
      return []; // No sent items in mock data
    case 'onboarding':
      return mockInboxRequests.slice(0, 1); // Mock onboarding items
    default:
      return mockInboxRequests;
  }
};

// Pagination settings
export const ITEMS_PER_PAGE = 10;
