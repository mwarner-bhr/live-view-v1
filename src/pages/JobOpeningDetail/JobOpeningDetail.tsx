import { useParams, useNavigate } from 'react-router-dom';
import { Button, Icon, Avatar, StarRating } from '../../components';
import { jobOpenings } from '../../data/jobOpenings';
import { jobCandidates } from '../../data/jobCandidates';

export function JobOpeningDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const jobId = parseInt(id || '0', 10);
  const job = jobOpenings.find((j) => j.id === jobId);
  const candidates = jobCandidates.filter((c) => c.jobOpeningId === jobId);

  if (!job) {
    return <div className="p-10">Job opening not found</div>;
  }

  // Find next job for navigation
  const currentIndex = jobOpenings.findIndex((j) => j.id === jobId);
  const nextJob = jobOpenings[currentIndex + 1];

  const newCandidatesCount = 5; // Mock value

  return (
    <div className="p-10">
      {/* Back link and title */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/hiring')}
          className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] transition-colors mb-4"
        >
          <Icon name="chevron-left" size={16} className="text-[var(--icon-neutral-strong)]" />
          Job Openings
        </button>

        <div className="flex items-start justify-between mb-3">
          <h1 className="text-[52px] font-bold leading-[62px] text-[var(--color-primary-strong)] mb-0">
            {job.title}
          </h1>

          {nextJob && (
            <button
              onClick={() => navigate(`/hiring/job/${nextJob.id}`)}
              className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] transition-colors"
            >
              <div className="text-right">
                <div className="font-semibold text-[var(--text-neutral-strong)]">{nextJob.title}</div>
                <div>{nextJob.location}</div>
              </div>
              <Icon name="chevron-right" size={16} className="text-[var(--icon-neutral-strong)]" />
            </button>
          )}
        </div>

        <p className="text-[15px] text-[var(--text-neutral-strong)]">
          Engineering – {job.location}
        </p>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border-neutral-x-weak)]">
        <div className="flex items-center gap-3">
          <Button variant="primary" icon="pen-to-square">
            Edit Job Opening
          </Button>
          <button className="h-10 w-10 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors flex items-center justify-center">
            <Icon name="users" size={16} className="text-[var(--text-neutral-strong)]" />
          </button>
          <button className="h-10 px-4 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors flex items-center justify-center gap-2">
            <Icon name="chart-line" size={16} className="text-[var(--text-neutral-strong)]" />
            <Icon name="caret-down" size={10} className="text-[var(--text-neutral-strong)]" />
          </button>
          <Button variant="standard">Share Job Link</Button>
          <a
            href="#"
            className="text-[13px] font-semibold text-[#0b4fd1] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            View Job Description
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Hiring Lead Badge */}
          <div className="flex items-center gap-3">
            <Avatar size={40} />
            <div>
              <div className="text-[14px] text-[var(--text-neutral-weak)]">Hiring Lead</div>
              <div className="text-[15px] font-semibold text-[var(--text-neutral-x-strong)]">
                {job.hiringLead}
              </div>
            </div>
          </div>

          <div className="w-px h-12 bg-[var(--border-neutral-x-weak)]" />

          {/* Status */}
          <div>
            <div className="text-[14px] text-[var(--text-neutral-weak)]">Status</div>
            <div className="text-[15px] font-medium text-[var(--text-neutral-x-strong)]">
              {job.status}
            </div>
          </div>

          <div className="w-px h-12 bg-[var(--border-neutral-x-weak)]" />

          {/* Days open */}
          <div>
            <div className="text-[14px] text-[var(--text-neutral-weak)]">Open</div>
            <div className="text-[15px] font-medium text-[var(--text-neutral-x-strong)]">
              23 days
            </div>
          </div>
        </div>
      </div>

      {/* Candidates table */}
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden" style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--border-neutral-x-weak)]">
          <h2 className="text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)] m-0">
            {candidates.length} Candidates ({newCandidatesCount} New)
          </h2>

          <div className="flex items-center gap-3">
            <button className="h-8 px-3 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: 'var(--shadow-100)' }}>
              <Icon name="gear" size={16} className="text-[var(--text-neutral-strong)]" />
              <Icon name="caret-down" size={10} className="text-[var(--text-neutral-strong)]" />
            </button>
            <button className="h-8 px-3 rounded-[var(--radius-full)] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors flex items-center justify-center gap-2" style={{ boxShadow: 'var(--shadow-100)' }}>
              <Icon name="envelope" size={16} className="text-[var(--text-neutral-strong)]" />
              <Icon name="caret-down" size={10} className="text-[var(--text-neutral-strong)]" />
            </button>
            <Button size="small" variant="standard" icon="circle-user">
              New Candidate
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="px-8">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--surface-neutral-xx-weak)] h-12">
                <th className="w-12 text-left pl-4 rounded-tl-[8px] rounded-bl-[8px]">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-4 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Candidate Info
                </th>
                <th className="px-4 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Status
                </th>
                <th className="px-4 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Rating
                </th>
                <th className="px-4 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)]">
                  Applied
                </th>
                <th className="px-4 text-left text-[15px] font-semibold text-[var(--text-neutral-strong)] rounded-tr-[8px] rounded-br-[8px]">
                  Last Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="h-24 hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                  <td className="pl-4">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="px-4">
                    <a
                      href="#"
                      className="text-[15px] font-medium text-[#0b4fd1] hover:underline block mb-1"
                      onClick={(e) => e.preventDefault()}
                    >
                      {candidate.name}
                    </a>
                    <div className="text-[13px] text-[var(--text-neutral-medium)]">
                      {candidate.location}
                    </div>
                    <div className="text-[13px] text-[var(--text-neutral-medium)]">
                      {candidate.phone}
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="text-[15px] text-[var(--text-neutral-x-strong)] mb-1">
                      {candidate.status}
                    </div>
                    <div className="text-[13px] text-[var(--text-neutral-medium)]">
                      {candidate.statusTimestamp}
                    </div>
                  </td>
                  <td className="px-4">
                    <StarRating rating={candidate.rating} />
                  </td>
                  <td className="px-4">
                    <div className="text-[15px] text-[var(--text-neutral-x-strong)]">
                      {candidate.appliedDate}
                    </div>
                  </td>
                  <td className="px-4">
                    <div className="text-[15px] text-[var(--text-neutral-x-strong)] mb-1">
                      {candidate.lastEmail}
                    </div>
                    <div className="text-[13px] text-[var(--text-neutral-medium)]">
                      {candidate.lastEmailTimestamp}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobOpeningDetail;
