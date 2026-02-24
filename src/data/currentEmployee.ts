export interface Passport {
  number: string;
  issued: string;
  expiry: string;
  country: string;
}

export interface Manager {
  name: string;
  title: string;
  avatar: string;
}

export interface CurrentEmployee {
  id: number;
  firstName: string;
  preferredName: string;
  lastName: string;
  middleName: string;
  pronouns: string;
  title: string;
  avatar: string;

  // Contact
  workPhone: string;
  mobilePhone: string;
  workEmail: string;
  personalEmail: string;
  linkedIn: string;

  // Location
  location: string;
  timezone: string;
  localTime: string;
  department: string;

  // Dates
  hireDate: string;
  tenure: string;
  birthDate: string;

  // Personal
  ssn: string;
  gender: string;
  genderIdentity: string;
  maritalStatus: string;
  tshirtSize: string;
  favoriteCereal: string;

  // Manager
  manager: Manager;

  // Direct Reports
  directReports: string[];
  moreReportsCount: number;

  // Passports
  passports: Passport[];
}

export const currentEmployee: CurrentEmployee = {
  id: 1,
  firstName: 'Jessica',
  preferredName: 'Jess',
  lastName: 'Cordova',
  middleName: '',
  pronouns: 'She/her',
  title: 'Director, Demand Generation in Marketing',
  avatar: 'https://i.pravatar.cc/300?img=32',

  // Contact
  workPhone: '801-763-1893 x 6109',
  mobilePhone: '801-344-1998',
  workEmail: 'jcordova@bamboohr.com',
  personalEmail: 'cordovathejess@gmail.com',
  linkedIn: 'LinkedIn',

  // Location
  location: 'Seattle, WA',
  timezone: 'PST',
  localTime: '7:49 am',
  department: 'Marketing',

  // Dates
  hireDate: 'Aug 28, 2015',
  tenure: '4y · 2m · 10d',
  birthDate: 'Apr 22, 1992',

  // Personal
  ssn: '648-55-2415',
  gender: 'Female',
  genderIdentity: 'Female',
  maritalStatus: 'Single',
  tshirtSize: 'Medium',
  favoriteCereal: 'Crispix',

  // Manager
  manager: {
    name: 'Lucy Samuels',
    title: 'VP, Marketing',
    avatar: 'https://i.pravatar.cc/300?img=48',
  },

  // Direct Reports
  directReports: [
    'Alan Nguyen',
    'Jeff Hawkins',
    'Melinda Pittman',
    'Tony Fonseca',
  ],
  moreReportsCount: 5,

  // Passports
  passports: [
    { number: '31195855', issued: '5/7/16', expiry: '5/7/26', country: 'United States' },
    { number: '54682-22272', issued: '7/18/17', expiry: '7/18/27', country: 'Italy' },
    { number: '622-555-4', issued: '1/28/17', expiry: '1/28/27', country: 'Germany' },
  ],
};
