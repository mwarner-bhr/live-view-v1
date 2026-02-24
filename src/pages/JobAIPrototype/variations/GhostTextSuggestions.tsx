import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function GhostTextSuggestions() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ghostSuggestion, setGhostSuggestion] = useState<JobSuggestion | null>(null);

  // Actual field values
  const [jobStatus, setJobStatus] = useState('');
  const [hiringLead, setHiringLead] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [minimumExperience, setMinimumExperience] = useState('');
  const [compensation, setCompensation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [internalJobCode, setInternalJobCode] = useState('');
  const [locationInOffice, setLocationInOffice] = useState(false);
  const [locationHybrid, setLocationHybrid] = useState(false);
  const [locationRemote, setLocationRemote] = useState(false);

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setGhostSuggestion(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const suggestion = generateSuggestions(postingTitle);
      setGhostSuggestion(suggestion);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const acceptField = (field: keyof JobSuggestion, setter: (value: any) => void) => {
    if (!ghostSuggestion) return;
    setter(ghostSuggestion[field]);
  };

  const dismissGhost = () => {
    setGhostSuggestion(null);
  };

  const GhostInput = ({
    value,
    ghostValue,
    onChange,
    onAccept,
    placeholder
  }: {
    value: string;
    ghostValue?: string;
    onChange: (val: string) => void;
    onAccept: () => void;
    placeholder?: string;
  }) => (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none focus:border-[var(--color-primary-strong)]"
        style={{ boxShadow: 'var(--shadow-100)' }}
      />
      {!value && ghostValue && (
        <>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[15px] text-[var(--text-neutral-weak)] italic">
            {ghostValue}
          </div>
          <button
            type="button"
            onClick={onAccept}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-[12px] font-medium text-[var(--color-primary-strong)] bg-[var(--color-primary-weak)] rounded hover:bg-[var(--color-primary-medium)] transition-colors"
          >
            Accept
          </button>
        </>
      )}
    </div>
  );

  const GhostTextarea = ({
    value,
    ghostValue,
    onChange,
    onAccept
  }: {
    value: string;
    ghostValue?: string;
    onChange: (val: string) => void;
    onAccept: () => void;
  }) => (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add your job description here..."
        className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none focus:border-[var(--color-primary-strong)]"
        style={{ boxShadow: 'var(--shadow-100)' }}
      />
      {!value && ghostValue && (
        <>
          <div className="absolute left-4 top-3 right-20 pointer-events-none text-[15px] text-[var(--text-neutral-weak)] italic whitespace-pre-wrap">
            {ghostValue.substring(0, 200)}...
          </div>
          <button
            type="button"
            onClick={onAccept}
            className="absolute right-3 top-3 px-3 py-1.5 text-[13px] font-medium text-[var(--color-primary-strong)] bg-[var(--color-primary-weak)] rounded hover:bg-[var(--color-primary-medium)] transition-colors"
          >
            Accept
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)]">
            Variation 2: Ghost Text Suggestions
          </h2>
          {ghostSuggestion && (
            <button
              onClick={dismissGhost}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--text-neutral-strong)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
            >
              <Icon name="xmark" size={14} />
              Dismiss all
            </button>
          )}
        </div>

        {isGenerating && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-[var(--color-primary-weak)] rounded-lg">
            <Icon name="sparkles" size={16} className="text-[var(--color-primary-strong)] animate-pulse" />
            <span className="text-[14px] font-medium text-[var(--color-primary-strong)]">
              Generating suggestions...
            </span>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Posting Title */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Posting Title<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <input
              type="text"
              value={postingTitle}
              onChange={(e) => setPostingTitle(e.target.value)}
              placeholder="Start typing job title..."
              className="w-full h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none focus:border-[var(--color-primary-strong)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            />
          </div>

          {/* Job Status */}
          <div className="flex flex-col gap-1 w-full max-w-[720px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <GhostInput
              value={jobStatus}
              ghostValue={ghostSuggestion?.jobStatus}
              onChange={setJobStatus}
              onAccept={() => acceptField('jobStatus', setJobStatus)}
            />
          </div>

          {/* Hiring Lead & Department */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <GhostInput
                value={hiringLead}
                ghostValue={ghostSuggestion?.hiringLead}
                onChange={setHiringLead}
                onAccept={() => acceptField('hiringLead', setHiringLead)}
              />
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Department
              </label>
              <GhostInput
                value={department}
                ghostValue={ghostSuggestion?.department}
                onChange={setDepartment}
                onAccept={() => acceptField('department', setDepartment)}
              />
            </div>
          </div>

          {/* Employment Type & Minimum Experience */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <GhostInput
                value={employmentType}
                ghostValue={ghostSuggestion?.employmentType}
                onChange={setEmploymentType}
                onAccept={() => acceptField('employmentType', setEmploymentType)}
              />
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Minimum Experience
              </label>
              <GhostInput
                value={minimumExperience}
                ghostValue={ghostSuggestion?.minimumExperience}
                onChange={setMinimumExperience}
                onAccept={() => acceptField('minimumExperience', setMinimumExperience)}
              />
            </div>
          </div>

          {/* Compensation */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Compensation
            </label>
            <GhostInput
              value={compensation}
              ghostValue={ghostSuggestion?.compensation}
              onChange={setCompensation}
              onAccept={() => acceptField('compensation', setCompensation)}
              placeholder="e.g. $10-15 Hourly DOE"
            />
          </div>

          {/* Job Location */}
          <div className="flex flex-col gap-[13px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <JobLocationOption
                icon="building"
                label="In Office"
                checked={locationInOffice}
                onChange={setLocationInOffice}
              />
              <JobLocationOption
                icon="house-building"
                label="Hybrid"
                checked={locationHybrid}
                onChange={setLocationHybrid}
              />
              <JobLocationOption
                icon="house-laptop"
                label="Remote"
                checked={locationRemote}
                onChange={setLocationRemote}
              />
            </div>
            {ghostSuggestion && !locationInOffice && !locationHybrid && !locationRemote && (
              <button
                onClick={() => {
                  setLocationInOffice(ghostSuggestion.locationInOffice);
                  setLocationHybrid(ghostSuggestion.locationHybrid);
                  setLocationRemote(ghostSuggestion.locationRemote);
                }}
                className="self-start px-3 py-1.5 text-[13px] font-medium text-[var(--color-primary-strong)] bg-[var(--color-primary-weak)] rounded hover:bg-[var(--color-primary-medium)] transition-colors"
              >
                Accept suggested location
              </button>
            )}
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <GhostTextarea
              value={jobDescription}
              ghostValue={ghostSuggestion?.jobDescription}
              onChange={setJobDescription}
              onAccept={() => acceptField('jobDescription', setJobDescription)}
            />
          </div>

          {/* Internal Job Code */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Internal Job Code
            </label>
            <GhostInput
              value={internalJobCode}
              ghostValue={ghostSuggestion?.internalJobCode}
              onChange={setInternalJobCode}
              onAccept={() => acceptField('internalJobCode', setInternalJobCode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
