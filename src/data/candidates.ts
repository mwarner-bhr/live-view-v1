export interface Candidate {
  id: string;
  name: string;
  location: string;
  phone: string;
  jobTitle: string;
  jobLocation: string;
  status: string;
  statusTimestamp: string;
  rating: number; // 1-5 stars
  lastEmail: string;
  lastEmailTimestamp: string;
}

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Miracle Gouse',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'Medical Assistant',
    jobLocation: 'Northridge, CA',
    status: 'Reviewed',
    statusTimestamp: 'Sent 2 days ago',
    rating: 4,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
  {
    id: '2',
    name: 'Corey Dorwart',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'Web Designer',
    jobLocation: 'Northridge, CA',
    status: 'Interviewed',
    statusTimestamp: 'Sent 2 days ago',
    rating: 3,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
  {
    id: '3',
    name: 'Marley George',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'President of Sales',
    jobLocation: 'Northridge, CA',
    status: 'Checking References',
    statusTimestamp: 'Sent 2 days ago',
    rating: 3,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
  {
    id: '4',
    name: 'Tiana Botosh',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'Dog Trainer',
    jobLocation: 'Henderson, NV',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 2,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
  {
    id: '5',
    name: 'Adison Donin',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'Marketing Coordinator',
    jobLocation: 'Sacramento, CA',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 3,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
  {
    id: '6',
    name: 'Abram Franci',
    location: 'Lindon, UT',
    phone: '801-724-6600',
    jobTitle: 'Nursing Assistant',
    jobLocation: 'Seattle, WA',
    status: 'Offer Sent',
    statusTimestamp: 'Sent 2 days ago',
    rating: 3,
    lastEmail: 'Request for follow-up',
    lastEmailTimestamp: 'Sent 2 days ago',
  },
];
