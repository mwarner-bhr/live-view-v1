export interface FieldReasoning {
  field: string;
  value: string;
  reason: string;
}

export interface JobSuggestion {
  title: string;
  jobStatus: string;
  hiringLead: string;
  department: string;
  employmentType: string;
  minimumExperience: string;
  compensation: string;
  locationInOffice: boolean;
  locationHybrid: boolean;
  locationRemote: boolean;
  jobDescription: string;
  internalJobCode: string;
  // Metadata for conversational AI
  confidence: 'high' | 'medium' | 'low';
  matchCount: number; // How many similar roles found
  reasoning: FieldReasoning[]; // Explanation for each field
}

// Mock database of similar jobs (simulates what we'd get from BambooHR)
export const mockJobDatabase: Record<string, JobSuggestion> = {
  'Product Designer I': {
    title: 'Product Designer I',
    jobStatus: 'Draft',
    hiringLead: 'Leslie Knotts',
    department: 'Product',
    employmentType: 'Full-Time',
    minimumExperience: 'Entry Level (0-2 years)',
    compensation: '$75,000-85,000/yr',
    locationInOffice: false,
    locationHybrid: true,
    locationRemote: false,
    jobDescription: `Product Designer I

Location: Hybrid — in office 2 days/week, remote 3 days/week
Department: Product Design / UX
Level: Early Career

About the Role
We're seeking a Product Designer I to join our growing design team. You'll work closely with senior designers, product managers, and engineers to create intuitive, delightful user experiences for our HR platform used by thousands of companies.

Responsibilities
• Collaborate with cross-functional teams to understand user needs and business requirements
• Create wireframes, prototypes, and high-fidelity designs for new features
• Participate in user research and usability testing
• Maintain and evolve our design system
• Present design concepts and rationale to stakeholders

Requirements
• 0-2 years of experience in product design or related field
• Portfolio demonstrating UI/UX design skills
• Proficiency in Figma or similar design tools
• Understanding of design principles and user-centered design
• Strong communication and collaboration skills
• Bachelor's degree in Design, HCI, or related field (or equivalent experience)`,
    internalJobCode: 'PD-001-2026',
    confidence: 'high',
    matchCount: 3,
    reasoning: [
      { field: 'jobStatus', value: 'Draft', reason: 'All new job postings start as drafts until reviewed and approved' },
      { field: 'department', value: 'Product', reason: 'Based on 3 recent Product Designer postings in your Product department' },
      { field: 'hiringLead', value: 'Leslie Knotts', reason: 'Leslie has hired for 3 similar design roles in the past 6 months' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All Product Designer roles at your company are full-time positions' },
      { field: 'minimumExperience', value: 'Entry Level (0-2 years)', reason: 'Level I roles typically require 0-2 years based on your company\'s leveling system' },
      { field: 'compensation', value: '$75,000-85,000/yr', reason: 'Market rate for entry-level Product Designers in your region (Salt Lake City)' },
      { field: 'location', value: 'Hybrid', reason: 'Product department uses hybrid model: 2 days in office, 3 days remote' },
      { field: 'jobDescription', value: '...', reason: 'Generated from similar Product Designer I postings with your company\'s standard structure' },
      { field: 'internalJobCode', value: 'PD-001-2026', reason: 'Following your company\'s job code format: [DEPT]-[NUM]-[YEAR]' },
    ],
  },
  'Product Designer II': {
    title: 'Product Designer II',
    jobStatus: 'Draft',
    hiringLead: 'Leslie Knotts',
    department: 'Product',
    employmentType: 'Full-Time',
    minimumExperience: 'Mid Level (3-5 years)',
    compensation: '$105,000/yr',
    locationInOffice: false,
    locationHybrid: true,
    locationRemote: false,
    jobDescription: `Product Designer II (Hybrid)

Location: Hybrid — in office 2 days/week, remote 3 days/week
Department: Product Design / UX
Level: Early-Mid Career

About the Role
We're looking for a Product Designer II to help shape the future of our HR platform. You'll own entire feature areas, lead design initiatives, and mentor junior designers while working with a talented cross-functional team.

Responsibilities
• Lead design projects from concept to launch
• Conduct user research and translate insights into design solutions
• Create wireframes, prototypes, and production-ready designs
• Collaborate with engineers to ensure high-quality implementation
• Contribute to and maintain our design system
• Mentor junior designers and provide design feedback
• Present design work to leadership and stakeholders

Requirements
• 3-5 years of product design experience
• Strong portfolio showing end-to-end design process
• Expert proficiency in Figma and modern design tools
• Experience with user research and usability testing
• Deep understanding of interaction design and visual design
• Excellent communication and presentation skills
• Experience working in agile development environments
• Bachelor's degree in Design, HCI, or related field (or equivalent experience)`,
    internalJobCode: 'PD-002-2026',
    confidence: 'high',
    matchCount: 2,
    reasoning: [
      { field: 'jobStatus', value: 'Draft', reason: 'All new postings begin in draft status for review' },
      { field: 'department', value: 'Product', reason: 'Based on 2 recent Product Designer II postings in your Product department' },
      { field: 'hiringLead', value: 'Leslie Knotts', reason: 'Leslie manages the Product Design team and has hired for this role before' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All Product Designer roles at your company are full-time' },
      { field: 'minimumExperience', value: 'Mid Level (3-5 years)', reason: 'Level II roles require 3-5 years per your company\'s career ladder' },
      { field: 'compensation', value: '$105,000/yr', reason: 'Matches your company\'s mid-level designer compensation band' },
      { field: 'location', value: 'Hybrid', reason: 'Product department standard: 2 days in office, 3 remote' },
      { field: 'jobDescription', value: '...', reason: 'Based on your most recent Product Designer II posting with updated responsibilities' },
      { field: 'internalJobCode', value: 'PD-002-2026', reason: 'Next sequential code in Product Designer series' },
    ],
  },
  'Senior Software Engineer': {
    title: 'Senior Software Engineer',
    jobStatus: 'Draft',
    hiringLead: 'Michael Chen',
    department: 'Engineering',
    employmentType: 'Full-Time',
    minimumExperience: 'Senior Level (6-10 years)',
    compensation: '$140,000-160,000/yr',
    locationInOffice: false,
    locationHybrid: false,
    locationRemote: true,
    jobDescription: `Senior Software Engineer

Location: Remote (US-based)
Department: Engineering
Level: Senior

About the Role
Join our engineering team as a Senior Software Engineer building the next generation of HR technology. You'll architect and implement critical features, mentor engineers, and help shape our technical direction.

Responsibilities
• Design and build scalable, maintainable software solutions
• Lead technical decisions and architectural discussions
• Mentor junior and mid-level engineers
• Collaborate with product and design teams
• Participate in code reviews and maintain code quality
• Contribute to technical roadmap and planning
• Debug and resolve complex production issues

Requirements
• 6+ years of software engineering experience
• Strong proficiency in TypeScript/JavaScript and React
• Experience with Node.js and modern backend frameworks
• Deep understanding of web technologies, APIs, and databases
• Experience building and deploying cloud-based applications
• Excellent problem-solving and debugging skills
• Strong communication and collaboration abilities
• Bachelor's degree in Computer Science or equivalent experience`,
    internalJobCode: 'SE-003-2026',
    confidence: 'high',
    matchCount: 5,
    reasoning: [
      { field: 'jobStatus', value: 'Draft', reason: 'Standard draft status for new postings awaiting approval' },
      { field: 'department', value: 'Engineering', reason: 'Based on 5 recent Senior Software Engineer postings in Engineering' },
      { field: 'hiringLead', value: 'Michael Chen', reason: 'Michael is VP of Engineering and approves all senior engineering hires' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All engineering positions at your company are full-time' },
      { field: 'minimumExperience', value: 'Senior Level (6-10 years)', reason: 'Senior title requires 6+ years per your engineering career ladder' },
      { field: 'compensation', value: '$140,000-160,000/yr', reason: 'Competitive range for senior engineers based on your recent hires and market data' },
      { field: 'location', value: 'Remote', reason: 'Engineering department is fully remote with occasional team offsites' },
      { field: 'jobDescription', value: '...', reason: 'Generated from your company\'s standard senior engineer template with current tech stack' },
      { field: 'internalJobCode', value: 'SE-003-2026', reason: 'Following Engineering job code format' },
    ],
  },
  'Marketing Manager': {
    title: 'Marketing Manager',
    jobStatus: 'Draft',
    hiringLead: 'Jessica Martinez',
    department: 'Marketing',
    employmentType: 'Full-Time',
    minimumExperience: 'Mid Level (3-5 years)',
    compensation: '$95,000-110,000/yr',
    locationInOffice: true,
    locationHybrid: false,
    locationRemote: false,
    jobDescription: `Marketing Manager

Location: In Office (Salt Lake City, UT)
Department: Marketing
Level: Mid-Senior

About the Role
We're seeking an experienced Marketing Manager to lead our demand generation efforts. You'll develop and execute marketing campaigns, manage a small team, and drive growth for our HR platform.

Responsibilities
• Develop and execute integrated marketing campaigns
• Manage marketing team members and external agencies
• Analyze campaign performance and optimize for ROI
• Collaborate with sales to align on lead generation goals
• Own marketing budget and resource allocation
• Create compelling content and messaging
• Report on marketing metrics to leadership

Requirements
• 3-5 years of B2B marketing experience
• Proven track record of successful campaign execution
• Experience with marketing automation platforms (HubSpot, Marketo, etc.)
• Strong analytical skills and data-driven mindset
• Excellent project management abilities
• Strong written and verbal communication skills
• Bachelor's degree in Marketing, Business, or related field`,
    internalJobCode: 'MM-004-2026',
    confidence: 'medium',
    matchCount: 1,
    reasoning: [
      { field: 'jobStatus', value: 'Draft', reason: 'New postings require review before going live' },
      { field: 'department', value: 'Marketing', reason: 'Based on 1 recent Marketing Manager posting' },
      { field: 'hiringLead', value: 'Jessica Martinez', reason: 'Jessica is CMO and approves all marketing hires' },
      { field: 'employmentType', value: 'Full-Time', reason: 'All manager-level roles are full-time positions' },
      { field: 'minimumExperience', value: 'Mid Level (3-5 years)', reason: 'Manager title typically requires 3-5 years based on similar postings' },
      { field: 'compensation', value: '$95,000-110,000/yr', reason: 'Market rate for marketing managers in Salt Lake City area' },
      { field: 'location', value: 'In Office', reason: 'Marketing team primarily works in-office for collaboration' },
      { field: 'jobDescription', value: '...', reason: 'Generated from your previous Marketing Manager posting with current priorities' },
      { field: 'internalJobCode', value: 'MM-004-2026', reason: 'Following Marketing job code convention' },
    ],
  },
};

// Simulate AI thinking time
export const simulateAIDelay = () =>
  new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

// Generate suggestions based on partial input
export function generateSuggestions(partialTitle: string): JobSuggestion | null {
  if (!partialTitle || partialTitle.length < 3) return null;

  const titleLower = partialTitle.toLowerCase();

  // Check for exact or close matches
  for (const [key, suggestion] of Object.entries(mockJobDatabase)) {
    if (key.toLowerCase().includes(titleLower)) {
      return suggestion;
    }
  }

  // Fallback: intelligent defaults based on keywords
  if (titleLower.includes('design')) {
    return {
      ...mockJobDatabase['Product Designer II'],
      title: partialTitle,
      confidence: 'medium',
      matchCount: 1,
    };
  }

  if (titleLower.includes('engineer') || titleLower.includes('developer')) {
    return {
      ...mockJobDatabase['Senior Software Engineer'],
      title: partialTitle,
      confidence: 'medium',
      matchCount: 2,
    };
  }

  if (titleLower.includes('market')) {
    return {
      ...mockJobDatabase['Marketing Manager'],
      title: partialTitle,
      confidence: 'medium',
      matchCount: 1,
    };
  }

  // Generic fallback
  return {
    title: partialTitle,
    jobStatus: 'Draft',
    hiringLead: 'Sarah Johnson',
    department: 'Operations',
    employmentType: 'Full-Time',
    minimumExperience: 'Mid Level (3-5 years)',
    compensation: '$80,000-100,000/yr',
    locationInOffice: false,
    locationHybrid: true,
    locationRemote: false,
    jobDescription: `${partialTitle}

We're seeking a talented ${partialTitle} to join our growing team. This role will work cross-functionally to drive key initiatives and contribute to our company's success.

Responsibilities
• Collaborate with team members to achieve department goals
• Contribute to projects and initiatives
• Maintain high standards of quality and professionalism

Requirements
• 3-5 years of relevant experience
• Strong communication and collaboration skills
• Self-motivated with ability to work independently`,
    internalJobCode: '',
    confidence: 'low',
    matchCount: 0,
    reasoning: [
      { field: 'jobStatus', value: 'Draft', reason: 'Default status for all new job postings' },
      { field: 'department', value: 'Operations', reason: 'Best guess - no similar roles found in your company' },
      { field: 'hiringLead', value: 'Sarah Johnson', reason: 'Default hiring lead for Operations department' },
      { field: 'employmentType', value: 'Full-Time', reason: 'Most roles at your company are full-time' },
      { field: 'minimumExperience', value: 'Mid Level (3-5 years)', reason: 'Standard experience level for new roles' },
      { field: 'compensation', value: '$80,000-100,000/yr', reason: 'Estimated based on your company\'s general compensation ranges' },
      { field: 'location', value: 'Hybrid', reason: 'Most common work arrangement at your company' },
      { field: 'jobDescription', value: '...', reason: 'Generic template - should be customized' },
      { field: 'internalJobCode', value: '', reason: 'No job code pattern found for this role type' },
    ],
  };
}

export const getMatchingJobTitles = (input: string): string[] => {
  if (!input || input.length < 2) return [];

  const inputLower = input.toLowerCase();
  return Object.keys(mockJobDatabase)
    .filter(title => title.toLowerCase().includes(inputLower))
    .slice(0, 5);
};
