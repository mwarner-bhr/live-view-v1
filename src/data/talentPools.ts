import type { IconName } from '../components/Icon';

export interface TalentPool {
  id: string;
  title: string;
  icon: IconName;
  candidatesCount: number;
}

export const talentPools: TalentPool[] = [
  {
    id: '1',
    title: 'Finance',
    icon: 'piggy-bank',
    candidatesCount: 2,
  },
  {
    id: '2',
    title: 'Marketing',
    icon: 'megaphone',
    candidatesCount: 2,
  },
  {
    id: '3',
    title: 'Software Engineer',
    icon: 'computer',
    candidatesCount: 2,
  },
];
