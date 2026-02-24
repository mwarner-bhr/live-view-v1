export interface JobCandidate {
  id: string;
  name: string;
  location: string;
  phone: string;
  status: string;
  statusTimestamp: string;
  rating: number;
  appliedDate: string;
  lastEmail: string;
  lastEmailTimestamp: string;
  jobOpeningId: number;
}

export const jobCandidates: JobCandidate[] = [
  {
    id: '1',
    name: 'Miracle Gouse',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Reviewed',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
  {
    id: '2',
    name: 'Corey Dorwart',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Interviewed',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
  {
    id: '3',
    name: 'Marley George',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Checking References',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
  {
    id: '4',
    name: 'Tiana Botosh',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
  {
    id: '5',
    name: 'Adison Donin',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
  {
    id: '6',
    name: 'Abram Franci',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 0,
    appliedDate: 'Dec 28, 2023',
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
    jobOpeningId: 1,
  },
];
