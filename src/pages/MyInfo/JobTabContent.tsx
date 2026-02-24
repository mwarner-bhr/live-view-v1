import { Icon, Button, TextInput, Checkbox } from '../../components';

interface JobTabContentProps {
  employeeName: string;
}

export function JobTabContent({ employeeName }: JobTabContentProps) {
  // Mock data for job information
  const jobData = {
    hireDate: '11/1/2021',
    ethnicity: 'White',
    eeoJobCategory: 'Professional',
    workerStatus: {
      activeDutyMilitary: false,
      armedForcesService: true,
      disabled: false,
      protectedVeteran: false,
    },
    directReports: ['Alan Nguyen', 'Jeff Hawkins', 'Melinda Pittman', 'Tony Fonseca'],
    employmentStatus: [
      { effectiveDate: '01/01/2023', status: 'Full-Time', comment: 'N/A' },
    ],
    jobInformation: [
      {
        effective: '12/01/2024',
        location: 'Lindon, UT United States of America',
        division: 'Sales',
        department: 'Sales',
        teams: 'Sales Dept 1 + 1 more',
        jobTitle: 'Sales Rep',
        reportsTo: 'Lucy Samuels',
      },
      {
        effective: '04/21/2023',
        location: 'Lindon, UT United States of America',
        division: 'Sales',
        department: 'Sales Rep',
        teams: '+ 1 more',
        jobTitle: 'Sales Rep',
        reportsTo: 'Thomas Davis',
      },
    ],
    compensation: [
      {
        effectiveDate: '01/01/2023',
        paySchedule: 'Twice a month',
        payType: 'Salary',
        payRate: '$125,000.00 / Year',
        overtime: 'Exempt',
        changeReason: 'Promotion',
        comment: 'Promoted',
      },
    ],
    bonus: [
      { date: '01/01/2023', amount: '$10,000.00', reason: 'Engineering Home', comment: 'Top Performer Award' },
      { date: '01/01/2023', amount: '$5,000.00', reason: 'Performance', comment: '' },
    ],
    commission: [
      { date: '01/01/2023', amount: '$93.00', comment: 'Demo-Referral' },
      { date: '01/01/2023', amount: '$100.00', comment: 'N/A' },
    ],
    equity: [
      { grantType: 'ISO', grantDate: '04/17/2024', grantQty: '50,000', vestingStart: '04/17/2024', vestingMonths: '48', strikePrice: '$120', vestingSchedule: 'Monthly', callMonths: '24' },
    ],
  };

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="id-badge" size={24} className="text-[var(--color-primary-strong)]" />
          <h2
            className="text-[26px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '34px' }}
          >
            Job
          </h2>
        </div>
        <Button variant="text" icon="grid-2-plus" iconPosition="left" showCaret={true}>
          Customize Layout
        </Button>
      </div>

      {/* Main Job Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="mb-6 max-w-[200px]">
          <TextInput label="Hire Date" value={jobData.hireDate} type="date" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 max-w-[416px]">
          <TextInput label="Ethnicity" value={jobData.ethnicity} type="dropdown" />
          <TextInput label="EEO Job Category" value={jobData.eeoJobCategory} type="dropdown" />
        </div>

        <div className="mb-6">
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)] mb-4 block">
            Veteran Status
          </label>
          <div className="flex flex-col gap-3">
            <Checkbox
              label="Active Duty Wartime or Campaign Badge Veteran"
              checked={jobData.workerStatus.activeDutyMilitary}
            />
            <Checkbox
              label="Armed Forces Service Medal Veteran"
              checked={jobData.workerStatus.armedForcesService}
            />
            <Checkbox
              label="Disabled Veteran"
              checked={jobData.workerStatus.disabled}
            />
            <Checkbox
              label="Recently Separated Veteran"
              checked={jobData.workerStatus.protectedVeteran}
            />
          </div>
        </div>

        <div>
          <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)] mb-4 block">
            Direct Reports
          </label>
          <div className="flex flex-col gap-2">
            {jobData.directReports.map((report, index) => (
              <a
                key={index}
                href="#"
                className="text-[15px] text-blue-600 hover:underline cursor-pointer"
              >
                {report}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Employment Status Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="id-badge" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Employment Status
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Effective Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Employment Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.employmentStatus.map((status, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Icon name="circle" size={6} className="text-[var(--color-primary-strong)]" />}
                      {status.effectiveDate}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {status.status}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {status.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Information Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="id-badge" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Job Information
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Effective
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Division
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Teams
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Reports To
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.jobInformation.map((job, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Icon name="circle" size={6} className="text-[var(--color-primary-strong)]" />}
                      {job.effective}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)] max-w-[200px] truncate">
                    {job.location}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {job.division}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {job.department}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {job.teams}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {job.jobTitle}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-blue-600 hover:underline cursor-pointer">
                    {job.reportsTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compensation Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="circle-dollar" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Compensation
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Effective Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Pay Schedule
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Pay Type
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Pay Rate
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Overtime
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Change Reason
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.compensation.map((comp, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Icon name="circle" size={6} className="text-[var(--color-primary-strong)]" />}
                      {comp.effectiveDate}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.paySchedule}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.payType}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.payRate}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.overtime}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.changeReason}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comp.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Potential Bonus Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="circle-dollar" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <h3
            className="text-[22px] font-semibold text-[var(--color-primary-strong)]"
            style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
          >
            Potential Bonus
          </h3>
        </div>

        <div className="mb-4 max-w-[200px]">
          <TextInput label="Hire Level" value="25" type="dropdown" />
        </div>

        <div className="max-w-[200px]">
          <TextInput label="Annual Amount" value="" placeholder="Enter amount" />
        </div>
      </div>

      {/* Bonus Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="circle-dollar" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Bonus
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.bonus.map((bonus, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {bonus.date}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {bonus.amount}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {bonus.reason}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {bonus.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="circle-dollar" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Commission
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.commission.map((comm, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comm.date}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comm.amount}
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {comm.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equity Section */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-x-small)] shrink-0">
            <Icon name="chart-line" size={16} className="text-[var(--color-primary-strong)]" />
          </div>
          <div className="flex items-center justify-between flex-1">
            <h3
              className="text-[24px] font-semibold text-[var(--color-primary-strong)]"
              style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}
            >
              Equity
            </h3>
            <Button variant="outlined" size="small">
              Add Entry
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-8 px-8">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--surface-neutral-x-weak)]">
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-l-[var(--radius-xx-small)]">
                  Grant Type
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Current Grant...
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Grant Date
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Grant Qty
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Vesting Start
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  # of Grant...
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Strike Price
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Vesting Sche...
                </th>
                <th className="px-3 py-3 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-r-[var(--radius-xx-small)]">
                  Call Months
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-xx-weak)]">
              {jobData.equity.map((eq, index) => (
                <tr key={index} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.grantType}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.grantType}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.grantDate}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.grantQty}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.vestingStart}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.vestingMonths}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.strikePrice}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.vestingSchedule}
                  </td>
                  <td className="px-3 py-3 text-[15px] text-[var(--text-neutral-x-strong)]">
                    {eq.callMonths}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default JobTabContent;
