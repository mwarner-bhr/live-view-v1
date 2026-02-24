import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Dropdown } from '../../components';
import { jobOpenings } from '../../data/jobOpenings';
import { CandidatesTabContent } from './CandidatesTabContent';
import { TalentPoolsTabContent } from './TalentPoolsTabContent';

export function Hiring() {
  const [activeTab, setActiveTab] = useState<'openings' | 'candidates' | 'pools'>('openings');
  const [filterStatus, setFilterStatus] = useState('draft-and-open');

  // Filter job openings based on status
  const filteredOpenings = jobOpenings.filter((job) => {
    if (filterStatus === 'open-only') return job.status === 'Open';
    if (filterStatus === 'draft-only') return job.status === 'Draft';
    return true; // draft-and-open shows all
  });

  const openCount = jobOpenings.filter((j) => j.status === 'Open').length;
  const totalCount = jobOpenings.length;

  const statusOptions = [
    { value: 'draft-and-open', label: 'Draft and open' },
    { value: 'open-only', label: 'Open only' },
    { value: 'draft-only', label: 'Draft only' },
  ];

  return (
    <div className="p-10">
      {/* Page Header */}
      <div className="mb-6">
        <h1>Hiring</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6 border-b border-[var(--border-neutral-x-weak)]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('openings')}
            className={`pb-3 px-1 text-[15px] font-medium transition-colors ${
              activeTab === 'openings'
                ? 'text-[var(--color-primary-strong)] border-b-2 border-[var(--color-primary-strong)]'
                : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)]'
            }`}
          >
            Job openings
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`pb-3 px-1 text-[15px] font-medium transition-colors ${
              activeTab === 'candidates'
                ? 'text-[var(--color-primary-strong)] border-b-2 border-[var(--color-primary-strong)]'
                : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)]'
            }`}
          >
            Candidates
          </button>
          <button
            onClick={() => setActiveTab('pools')}
            className={`pb-3 px-1 text-[15px] font-medium transition-colors ${
              activeTab === 'pools'
                ? 'text-[var(--color-primary-strong)] border-b-2 border-[var(--color-primary-strong)]'
                : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)]'
            }`}
          >
            Talent pools
          </button>
        </div>

        <div className="flex items-center gap-2 text-[14px] text-[var(--text-neutral-medium)] pb-3">
          <span>View Careers Website</span>
          <span>·</span>
          <span>Get Embed Code</span>
        </div>
      </div>

      {/* Render Candidates Tab Content */}
      {activeTab === 'candidates' && <CandidatesTabContent />}

      {/* Card with Table - Job Openings */}
      {activeTab === 'openings' && (
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden">
        {/* Actions Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/hiring/new">
            <Button icon="circle-user" variant="standard">
              New job opening
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[15px] text-[var(--text-neutral-medium)]">
              {openCount} of {totalCount} open · Show
            </span>
            <Dropdown options={statusOptions} value={filterStatus} onChange={setFilterStatus} />
            <button className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 11L8 2M8 11L5 8M8 11L11 8M2 14L14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="px-6">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-xx-weak)]">
                <th className="px-4 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tl-[8px] rounded-bl-[8px]">
                  Candidates
                </th>
                <th className="px-4 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                  Job opening
                </th>
                <th className="px-4 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                  Hiring lead
                </th>
                <th className="px-4 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                  Created on
                </th>
                <th className="px-4 py-4 text-left text-[15px] font-semibold text-[var(--text-neutral-x-strong)] rounded-tr-[8px] rounded-br-[8px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
              {filteredOpenings.map((job) => (
                <tr key={job.id} className="hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-primary-strong)] text-white text-[13px] font-semibold">
                      <Icon name="circle-user" size={14} className="text-white" />
                    </div>
                    <span className="text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                      {job.candidatesCount}
                    </span>
                    {job.newCandidatesCount > 0 && (
                      <span className="text-[13px] font-medium text-[var(--color-primary-strong)]">
                        {job.newCandidatesCount} new
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link
                    to={`/hiring/job/${job.id}`}
                    className="block text-[15px] font-medium text-[#2563eb] hover:underline"
                  >
                    {job.title}
                  </Link>
                  <span className="text-[14px] text-[var(--text-neutral-medium)]">{job.location}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[15px] text-[var(--text-neutral-strong)]">{job.hiringLead}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[15px] text-[var(--text-neutral-strong)]">{job.createdOn}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[15px] text-[var(--text-neutral-strong)]">{job.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      )}

      {/* Talent Pools Tab */}
      {activeTab === 'pools' && <TalentPoolsTabContent />}
    </div>
  );
}

export default Hiring;
