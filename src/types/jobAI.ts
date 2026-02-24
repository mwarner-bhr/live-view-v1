export interface FieldReasoning {
  field: string;
  value: string;
  reason: string;
}

export interface JobSuggestion {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  workSchedule: string;
  compensationType: string;
  salaryMin: string;
  salaryMax: string;
  benefits: string[];
  requiredSkills: string[];
  responsibilities: string[];
  confidence: 'high' | 'medium' | 'low';
  matchCount: number;
  reasoning: FieldReasoning[];
}

export interface JobFormValues {
  postingTitle: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  workSchedule: string;
  compensationType: string;
  salaryMin: string;
  salaryMax: string;
  benefits: string[];
  requiredSkills: string[];
  responsibilities: string[];
}
