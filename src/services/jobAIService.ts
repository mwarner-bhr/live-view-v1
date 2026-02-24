import type { JobSuggestion } from '../types/jobAI';

// Mock database of similar jobs (simulates what we'd get from BambooHR API)
const mockJobDatabase: Record<string, any> = {
  'Product Designer I': {
    title: 'Product Designer I',
    department: 'Product',
    location: 'Salt Lake City, UT',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry Level',
    workSchedule: 'Hybrid',
    compensationType: 'Salary',
    salaryMin: '75000',
    salaryMax: '85000',
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)', 'Flexible PTO'],
    requiredSkills: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
    responsibilities: [
      'Collaborate with cross-functional teams to understand user needs and business requirements',
      'Create wireframes, prototypes, and high-fidelity designs for new features',
      'Participate in user research and usability testing',
      'Maintain and evolve our design system',
      'Present design concepts and rationale to stakeholders'
    ],
    confidence: 'high' as const,
    matchCount: 3,
    reasoning: [
      { field: 'department', value: 'Product', reason: 'Based on 3 recent Product Designer postings in your Product department' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All Product Designer roles at your company are full-time positions' },
      { field: 'experienceLevel', value: 'Entry Level', reason: 'Level I roles typically require 0-2 years based on your company\'s leveling system' },
      { field: 'workSchedule', value: 'Hybrid', reason: 'Product department uses hybrid model: 2 days in office, 3 days remote' },
      { field: 'salaryRange', value: '$75,000-85,000/yr', reason: 'Market rate for entry-level Product Designers in your region (Salt Lake City)' },
      { field: 'location', value: 'Salt Lake City, UT', reason: 'Your company\'s main office location where Product team is based' },
    ],
  },
  'Product Designer II': {
    title: 'Product Designer II',
    department: 'Product',
    location: 'Salt Lake City, UT',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid Level',
    workSchedule: 'Hybrid',
    compensationType: 'Salary',
    salaryMin: '95000',
    salaryMax: '110000',
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)', 'Flexible PTO', 'Professional Development Budget'],
    requiredSkills: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems', 'Mentorship'],
    responsibilities: [
      'Lead design projects from concept to launch',
      'Conduct user research and translate insights into design solutions',
      'Create wireframes, prototypes, and production-ready designs',
      'Collaborate with engineers to ensure high-quality implementation',
      'Contribute to and maintain our design system',
      'Mentor junior designers and provide design feedback'
    ],
    confidence: 'high' as const,
    matchCount: 2,
    reasoning: [
      { field: 'department', value: 'Product', reason: 'Based on 2 recent Product Designer II postings in your Product department' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All Product Designer roles at your company are full-time' },
      { field: 'experienceLevel', value: 'Mid Level', reason: 'Level II roles require 3-5 years per your company\'s career ladder' },
      { field: 'workSchedule', value: 'Hybrid', reason: 'Product department standard: 2 days in office, 3 remote' },
      { field: 'salaryRange', value: '$95,000-110,000/yr', reason: 'Matches your company\'s mid-level designer compensation band' },
      { field: 'location', value: 'Salt Lake City, UT', reason: 'Product team is based in Salt Lake City office' },
    ],
  },
  'Senior Software Engineer': {
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'Full-Time',
    experienceLevel: 'Senior Level',
    workSchedule: 'Remote',
    compensationType: 'Salary',
    salaryMin: '140000',
    salaryMax: '160000',
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)', 'Unlimited PTO', 'Home Office Stipend'],
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'API Design'],
    responsibilities: [
      'Design and build scalable, maintainable software solutions',
      'Lead technical decisions and architectural discussions',
      'Mentor junior and mid-level engineers',
      'Collaborate with product and design teams',
      'Participate in code reviews and maintain code quality',
      'Contribute to technical roadmap and planning'
    ],
    confidence: 'high' as const,
    matchCount: 5,
    reasoning: [
      { field: 'department', value: 'Engineering', reason: 'Based on 5 recent Senior Software Engineer postings in Engineering' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All engineering positions at your company are full-time' },
      { field: 'experienceLevel', value: 'Senior Level', reason: 'Senior title requires 6+ years per your engineering career ladder' },
      { field: 'workSchedule', value: 'Remote', reason: 'Engineering department is fully remote with occasional team offsites' },
      { field: 'salaryRange', value: '$140,000-160,000/yr', reason: 'Competitive range for senior engineers based on your recent hires and market data' },
      { field: 'location', value: 'Remote', reason: 'Engineering roles are remote-first across the United States' },
    ],
  },
  'Marketing Manager': {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Salt Lake City, UT',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid Level',
    workSchedule: 'In Office',
    compensationType: 'Salary',
    salaryMin: '95000',
    salaryMax: '110000',
    benefits: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k)', 'Flexible PTO'],
    requiredSkills: ['Marketing Strategy', 'Campaign Management', 'Analytics', 'HubSpot', 'Content Marketing'],
    responsibilities: [
      'Develop and execute integrated marketing campaigns',
      'Manage marketing team members and external agencies',
      'Analyze campaign performance and optimize for ROI',
      'Collaborate with sales to align on lead generation goals',
      'Own marketing budget and resource allocation',
      'Create compelling content and messaging'
    ],
    confidence: 'medium' as const,
    matchCount: 1,
    reasoning: [
      { field: 'department', value: 'Marketing', reason: 'Based on 1 recent Marketing Manager posting' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All manager-level roles are full-time positions' },
      { field: 'experienceLevel', value: 'Mid Level', reason: 'Manager title typically requires 3-5 years based on similar postings' },
      { field: 'workSchedule', value: 'In Office', reason: 'Marketing team primarily works in-office for collaboration' },
      { field: 'salaryRange', value: '$95,000-110,000/yr', reason: 'Market rate for marketing managers in Salt Lake City area' },
      { field: 'location', value: 'Salt Lake City, UT', reason: 'Marketing team is based in the Salt Lake City office' },
    ],
  },
};

// Simulate AI thinking time
const simulateAIDelay = () =>
  new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

// Generate suggestions based on partial input
export async function fetchJobSuggestions(title: string): Promise<JobSuggestion | null> {
  if (!title || title.length < 3) return null;

  // Simulate API delay
  await simulateAIDelay();

  const titleLower = title.toLowerCase();

  // Check for exact or close matches
  for (const [key, suggestion] of Object.entries(mockJobDatabase)) {
    if (key.toLowerCase().includes(titleLower)) {
      return suggestion as JobSuggestion;
    }
  }

  // Fallback: intelligent defaults based on keywords
  if (titleLower.includes('design')) {
    return {
      ...mockJobDatabase['Product Designer II'],
      title,
      confidence: 'medium' as const,
      matchCount: 1,
    };
  }

  if (titleLower.includes('engineer') || titleLower.includes('developer')) {
    return {
      ...mockJobDatabase['Senior Software Engineer'],
      title,
      confidence: 'medium' as const,
      matchCount: 2,
    };
  }

  if (titleLower.includes('market')) {
    return {
      ...mockJobDatabase['Marketing Manager'],
      title,
      confidence: 'medium' as const,
      matchCount: 1,
    };
  }

  // Generic fallback
  return {
    title,
    department: 'Operations',
    location: 'Salt Lake City, UT',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid Level',
    workSchedule: 'Hybrid',
    compensationType: 'Salary',
    salaryMin: '80000',
    salaryMax: '100000',
    benefits: ['Health Insurance', 'Dental Insurance', '401(k)', 'PTO'],
    requiredSkills: [],
    responsibilities: [],
    confidence: 'low' as const,
    matchCount: 0,
    reasoning: [
      { field: 'department', value: 'Operations', reason: 'Best guess - no similar roles found in your company' },
      { field: 'employmentType', value: 'Full-Time', reason: 'Most roles at your company are full-time' },
      { field: 'experienceLevel', value: 'Mid Level', reason: 'Standard experience level for new roles' },
      { field: 'workSchedule', value: 'Hybrid', reason: 'Most common work arrangement at your company' },
      { field: 'salaryRange', value: '$80,000-100,000/yr', reason: 'Estimated based on your company\'s general compensation ranges' },
      { field: 'location', value: 'Salt Lake City, UT', reason: 'Your company\'s main office location' },
    ],
  };
}
