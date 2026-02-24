import { useState } from 'react';
import {
  Button,
  FormSectionHeader,
  InfoBanner,
  TextInput,
  FormDropdown,
  Checkbox,
  Icon,
} from '../../components';
import { employees } from '../../data/employees';

// Dropdown options
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const payScheduleOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'semi-monthly', label: 'Semi-Monthly' },
  { value: 'monthly', label: 'Monthly' },
];

const payTypeOptions = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'salary', label: 'Salary' },
];

const payRateTypeOptions = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'annual', label: 'Annual' },
];

const payPeriodOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const employmentStatusOptions = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'intern', label: 'Intern' },
];

const jobTitleOptions = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'senior-software-engineer', label: 'Senior Software Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'designer', label: 'Designer' },
  { value: 'data-analyst', label: 'Data Analyst' },
  { value: 'hr-manager', label: 'HR Manager' },
  { value: 'accountant', label: 'Accountant' },
];

// Generate Reports To options from employees with direct reports
const reportsToOptions = employees
  .filter(emp => emp.directReports > 0 && !emp.isTBH)
  .map(emp => ({
    value: emp.id.toString(),
    label: `${emp.name} - ${emp.title}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
];

const divisionOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'operations', label: 'Operations' },
  { value: 'corporate', label: 'Corporate' },
];

const locationOptions = [
  { value: 'ny-office', label: 'New York Office' },
  { value: 'sf-office', label: 'San Francisco Office' },
  { value: 'austin-office', label: 'Austin Office' },
  { value: 'remote', label: 'Remote' },
];

const relationshipOptions = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'friend', label: 'Friend' },
  { value: 'other', label: 'Other' },
];

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
];

const degreeOptions = [
  { value: 'high-school', label: 'High School' },
  { value: 'associates', label: 'Associate\'s Degree' },
  { value: 'bachelors', label: 'Bachelor\'s Degree' },
  { value: 'masters', label: 'Master\'s Degree' },
  { value: 'doctorate', label: 'Doctorate' },
];

export default function NewEmployeePage() {
  const [sendPacket, setSendPacket] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'allow' | 'none'>('allow');
  const [formData, setFormData] = useState({
    // Personal
    employeeNumber: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    birthDate: '',
    ssn: '',
    gender: '',
    maritalStatus: '',

    // Address
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',

    // Compensation
    paySchedule: '',
    payType: '',
    payRate: '',
    payRateType: '',
    payPeriod: '',
    payGrade: '',

    // Contact
    workPhone: '',
    mobilePhone: '',
    homePhone: '',
    workEmail: '',
    homeEmail: '',

    // Job
    hireDate: '',

    // Employment Status
    employmentStatus: '',

    // Job Information
    jobTitle: '',
    reportsTo: '',
    department: '',
    division: '',
    location: '',

    // Dependents
    dependentFirstName: '',
    dependentMiddleName: '',
    dependentLastName: '',
    dependentBirthDate: '',
    dependentSSN: '',
    dependentGender: '',
    dependentRelationship: '',

    // Emergency Contact
    emergencyFirstName: '',
    emergencyLastName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    emergencyStreet1: '',
    emergencyStreet2: '',
    emergencyCity: '',
    emergencyState: '',
    emergencyPostalCode: '',
    emergencyCountry: '',

    // Education
    institution: '',
    degree: '',
    major: '',
    gpa: '',
    startDate: '',
    endDate: '',
    secondaryLanguage: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full overflow-y-auto bg-[var(--surface-neutral-xx-weak)]">
      {/* Page Header */}
      <div className="px-8 pt-8">
        <div className="max-w-[1248px] mx-auto">
          <div className="flex items-center justify-between">
            <h1
              className="
                font-bold text-[48px] leading-[58px]
                text-[var(--color-primary-strong)]
              "
              style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
            >
              New Employee
            </h1>
            <Button variant="text">
              Customize Add Employee Form
            </Button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-6">
        <div className="max-w-[1248px] mx-auto space-y-5">
        {/* New Hire Packet Banner */}
        <InfoBanner
          title="Make everyone's life a little bit easier and send a New Hire Packet."
          description="Your new employee will be able to enter their own personal information, sign paperwork, see their team, and more."
          checkboxLabel="Send this new employee a new hire packet"
          checked={sendPacket}
          onCheckboxChange={setSendPacket}
        />

        {/* Personal Section */}
        <FormSectionHeader title="Personal" icon="circle-user">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Employee #"
                  value={formData.employeeNumber}
                  onChange={(value) => handleInputChange('employeeNumber', value)}
                  placeholder="Employee #"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange('firstName', value)}
                  placeholder="First Name"
                />
              </div>
              <div className="w-[248px]">
                <TextInput
                  label="Middle Name"
                  value={formData.preferredName}
                  onChange={(value) => handleInputChange('preferredName', value)}
                  placeholder="Middle Name"
                />
              </div>
              <div className="w-[248px]">
                <TextInput
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  placeholder="Last Name"
                />
              </div>
              <div className="w-[248px]">
                <TextInput
                  label="Preferred Name"
                  value={formData.preferredName}
                  onChange={(value) => handleInputChange('preferredName', value)}
                  placeholder="Preferred Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  type="date"
                  label="Birth Date"
                  value={formData.birthDate}
                  onChange={(value) => handleInputChange('birthDate', value)}
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Gender"
                  options={genderOptions}
                  value={formData.gender}
                  onChange={(value) => handleInputChange('gender', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Marital Status"
                  options={maritalStatusOptions}
                  value={formData.maritalStatus}
                  onChange={(value) => handleInputChange('maritalStatus', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="SSN"
                  value={formData.ssn}
                  onChange={(value) => handleInputChange('ssn', value)}
                  placeholder="SSN"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Address Section */}
        <FormSectionHeader title="Address" icon="home">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Street 1"
                  value={formData.street1}
                  onChange={(value) => handleInputChange('street1', value)}
                  placeholder="Street 1"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Street 2"
                  value={formData.street2}
                  onChange={(value) => handleInputChange('street2', value)}
                  placeholder="Street 2"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <TextInput
                  label="City"
                  value={formData.city}
                  onChange={(value) => handleInputChange('city', value)}
                  placeholder="City"
                />
              </div>
              <div className="w-[180px]">
                <FormDropdown
                  label="State"
                  options={stateOptions}
                  value={formData.state}
                  onChange={(value) => handleInputChange('state', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[180px]">
                <TextInput
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={(value) => handleInputChange('postalCode', value)}
                  placeholder="Postal Code"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Compensation Section */}
        <FormSectionHeader title="Compensation" icon="circle-dollar">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Pay Schedule"
                  options={payScheduleOptions}
                  value={formData.paySchedule}
                  onChange={(value) => handleInputChange('paySchedule', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Pay Type"
                  options={payTypeOptions}
                  value={formData.payType}
                  onChange={(value) => handleInputChange('payType', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Pay Rate"
                  value={formData.payRate}
                  onChange={(value) => handleInputChange('payRate', value)}
                  placeholder="Pay Rate"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Pay Rate Type"
                  options={payRateTypeOptions}
                  value={formData.payRateType}
                  onChange={(value) => handleInputChange('payRateType', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Pay Period"
                  options={payPeriodOptions}
                  value={formData.payPeriod}
                  onChange={(value) => handleInputChange('payPeriod', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Pay Grade"
                  value={formData.payGrade}
                  onChange={(value) => handleInputChange('payGrade', value)}
                  placeholder="Pay Grade"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Contact Section */}
        <FormSectionHeader title="Contact" icon="phone">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Work Phone"
                  value={formData.workPhone}
                  onChange={(value) => handleInputChange('workPhone', value)}
                  placeholder="Work Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Mobile Phone"
                  value={formData.mobilePhone}
                  onChange={(value) => handleInputChange('mobilePhone', value)}
                  placeholder="Mobile Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[325px]">
                <TextInput
                  label="Home Phone"
                  value={formData.homePhone}
                  onChange={(value) => handleInputChange('homePhone', value)}
                  placeholder="Home Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Work Email"
                  value={formData.workEmail}
                  onChange={(value) => handleInputChange('workEmail', value)}
                  placeholder="Work Email"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Home Email"
                  value={formData.homeEmail}
                  onChange={(value) => handleInputChange('homeEmail', value)}
                  placeholder="Home Email"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Job Section */}
        <FormSectionHeader title="Job" icon="building">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  type="date"
                  label="Hire Date"
                  value={formData.hireDate}
                  onChange={(value) => handleInputChange('hireDate', value)}
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Employment Status Section */}
        <FormSectionHeader title="Employment Status" icon="id-badge">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Employment Status"
                  options={employmentStatusOptions}
                  value={formData.employmentStatus}
                  onChange={(value) => handleInputChange('employmentStatus', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Job Information Section */}
        <FormSectionHeader title="Job Information" icon="building">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Job Title"
                  options={jobTitleOptions}
                  value={formData.jobTitle}
                  onChange={(value) => handleInputChange('jobTitle', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Reports To"
                  options={reportsToOptions}
                  value={formData.reportsTo}
                  onChange={(value) => handleInputChange('reportsTo', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Department"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={(value) => handleInputChange('department', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Division"
                  options={divisionOptions}
                  value={formData.division}
                  onChange={(value) => handleInputChange('division', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Location"
                  options={locationOptions}
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Dependents Section */}
        <FormSectionHeader title="Dependents" icon="users">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="First Name"
                  value={formData.dependentFirstName}
                  onChange={(value) => handleInputChange('dependentFirstName', value)}
                  placeholder="First Name"
                />
              </div>
              <div className="w-[248px]">
                <TextInput
                  label="Middle Name"
                  value={formData.dependentMiddleName}
                  onChange={(value) => handleInputChange('dependentMiddleName', value)}
                  placeholder="Middle Name"
                />
              </div>
              <div className="w-[248px]">
                <TextInput
                  label="Last Name"
                  value={formData.dependentLastName}
                  onChange={(value) => handleInputChange('dependentLastName', value)}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  type="date"
                  label="Birth Date"
                  value={formData.dependentBirthDate}
                  onChange={(value) => handleInputChange('dependentBirthDate', value)}
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="SSN"
                  value={formData.dependentSSN}
                  onChange={(value) => handleInputChange('dependentSSN', value)}
                  placeholder="SSN"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <FormDropdown
                  label="Gender"
                  options={genderOptions}
                  value={formData.dependentGender}
                  onChange={(value) => handleInputChange('dependentGender', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Relationship"
                  options={relationshipOptions}
                  value={formData.dependentRelationship}
                  onChange={(value) => handleInputChange('dependentRelationship', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="pt-4">
              <Button variant="text" icon="circle-plus">
                Add Dependent
              </Button>
            </div>
          </div>
        </FormSectionHeader>

        {/* Emergency Contact Section */}
        <FormSectionHeader title="Emergency Contact" icon="phone">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="First Name"
                  value={formData.emergencyFirstName}
                  onChange={(value) => handleInputChange('emergencyFirstName', value)}
                  placeholder="First Name"
                />
              </div>
              <div className="w-[248px]">
                <FormDropdown
                  label="Relationship"
                  options={relationshipOptions}
                  value={formData.emergencyRelationship}
                  onChange={(value) => handleInputChange('emergencyRelationship', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Last Name"
                  value={formData.emergencyLastName}
                  onChange={(value) => handleInputChange('emergencyLastName', value)}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Mobile Phone"
                  value={formData.emergencyPhone}
                  onChange={(value) => handleInputChange('emergencyPhone', value)}
                  placeholder="Mobile Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[325px]">
                <TextInput
                  label="Work Phone"
                  value={formData.emergencyPhone}
                  onChange={(value) => handleInputChange('emergencyPhone', value)}
                  placeholder="Work Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Email"
                  value={formData.emergencyEmail}
                  onChange={(value) => handleInputChange('emergencyEmail', value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[369px]">
                <TextInput
                  label="Home Phone"
                  value={formData.emergencyPhone}
                  onChange={(value) => handleInputChange('emergencyPhone', value)}
                  placeholder="Home Phone"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <TextInput
                  label="City"
                  value={formData.emergencyCity}
                  onChange={(value) => handleInputChange('emergencyCity', value)}
                  placeholder="City"
                />
              </div>
              <div className="w-[180px]">
                <FormDropdown
                  label="State"
                  options={stateOptions}
                  value={formData.emergencyState}
                  onChange={(value) => handleInputChange('emergencyState', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[180px]">
                <TextInput
                  label="Postal Code"
                  value={formData.emergencyPostalCode}
                  onChange={(value) => handleInputChange('emergencyPostalCode', value)}
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <FormDropdown
                  label="Country"
                  options={countryOptions}
                  value={formData.emergencyCountry}
                  onChange={(value) => handleInputChange('emergencyCountry', value)}
                  placeholder="-Select-"
                />
              </div>
            </div>
            <div className="pt-4">
              <Button variant="text" icon="circle-plus">
                Add Contact
              </Button>
            </div>
          </div>
        </FormSectionHeader>

        {/* Education Section */}
        <FormSectionHeader title="Education" icon="graduation-cap">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="College/Institution"
                  value={formData.institution}
                  onChange={(value) => handleInputChange('institution', value)}
                  placeholder="College/Institution"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <FormDropdown
                  label="Degree"
                  options={degreeOptions}
                  value={formData.degree}
                  onChange={(value) => handleInputChange('degree', value)}
                  placeholder="-Select-"
                />
              </div>
              <div className="w-[369px]">
                <TextInput
                  label="Major/Specialization"
                  value={formData.major}
                  onChange={(value) => handleInputChange('major', value)}
                  placeholder="Major/Specialization"
                />
              </div>
              <div className="w-[112px]">
                <TextInput
                  label="GPA"
                  value={formData.gpa}
                  onChange={(value) => handleInputChange('gpa', value)}
                  placeholder="GPA"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-[248px]">
                <TextInput
                  type="date"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(value) => handleInputChange('startDate', value)}
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <span className="text-[24px] text-[var(--text-neutral-strong)] pt-6">-</span>
              <div className="w-[248px]">
                <TextInput
                  type="date"
                  label="End Date"
                  value={formData.endDate}
                  onChange={(value) => handleInputChange('endDate', value)}
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="pt-4">
              <Button variant="text" icon="circle-plus">
                Add Education
              </Button>
            </div>
            <div className="flex gap-4">
              <div className="w-[248px]">
                <TextInput
                  label="Secondary Language"
                  value={formData.secondaryLanguage}
                  onChange={(value) => handleInputChange('secondaryLanguage', value)}
                  placeholder="Secondary Language"
                />
              </div>
            </div>
          </div>
        </FormSectionHeader>

        {/* Self-Service Access Section */}
        <FormSectionHeader title="Self-Service Access" icon="user-lock">
          <div className="space-y-4">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setAccessLevel('allow')}
                className={`
                  w-[380px] h-[102px]
                  bg-[var(--surface-neutral-white)]
                  border
                  ${accessLevel === 'allow' ? 'border-[var(--color-primary-medium)]' : 'border-[var(--border-neutral-x-weak)]'}
                  rounded-[var(--radius-small)]
                  p-5
                  flex items-start gap-4
                  cursor-pointer
                `}
                style={{ boxShadow: '1px 1px 0px 2px rgba(56, 49, 47, 0.03)' }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--color-primary-strong)] rounded-[var(--radius-small)] shrink-0">
                  <Icon name="user-check" size={24} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-[16px] leading-[24px] text-[var(--color-primary-strong)] mb-0.5">
                    Allow Access to BambooHR
                  </div>
                  <p className="text-[13px] leading-[19px] text-[var(--text-neutral-strong)]">
                    They will be able to login to BambooHR using the access level you choose
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setAccessLevel('none')}
                className={`
                  w-[380px] h-[102px]
                  bg-[var(--surface-neutral-white)]
                  border
                  ${accessLevel === 'none' ? 'border-[var(--color-primary-medium)]' : 'border-[var(--border-neutral-x-weak)]'}
                  rounded-[var(--radius-small)]
                  p-5
                  flex items-start gap-4
                  cursor-pointer
                `}
                style={{ boxShadow: '1px 1px 0px 2px rgba(56, 49, 47, 0.03)' }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-small)] shrink-0">
                  <Icon name="ban" size={24} className="text-[var(--color-primary-strong)]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-[16px] leading-[24px] text-[var(--color-primary-strong)] mb-0.5">
                    No Access
                  </div>
                  <p className="text-[13px] leading-[19px] text-[var(--text-neutral-strong)]">
                    They won't have access and will not be able to login to BambooHR.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </FormSectionHeader>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button variant="primary">
            Save
          </Button>
          <Button variant="standard">
            Save & Create New Hire Packet
          </Button>
          <Button variant="text">
            Cancel
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
