import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function InlineSuggestionChips() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);

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

  // Track dismissed suggestions
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      setDismissed(new Set());
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const newSuggestion = generateSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setDismissed(new Set());
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const acceptSuggestion = (field: string, value: any, setter: (val: any) => void) => {
    setter(value);
    setDismissed(prev => new Set([...prev, field]));
  };

  const dismissSuggestion = (field: string) => {
    setDismissed(prev => new Set([...prev, field]));
  };

  const regenerateAll = async () => {
    if (!postingTitle) return;
    setIsGenerating(true);
    setDismissed(new Set());
    await simulateAIDelay();
    const newSuggestion = generateSuggestions(postingTitle);
    setSuggestion(newSuggestion);
    setIsGenerating(false);
  };

  const SuggestionChip = ({
    field,
    value,
    onAccept,
    compact = false
  }: {
    field: string;
    value: string;
    onAccept: () => void;
    compact?: boolean;
  }) => {
    if (dismissed.has(field)) return null;

    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-[var(--color-primary-weak)] border border-[var(--color-primary-medium)] rounded-lg ${compact ? 'text-[13px]' : 'text-[14px]'}`}>
        <Icon name="sparkles" size={12} className="text-[var(--color-primary-strong)] flex-shrink-0" />
        <span className="text-[var(--color-primary-strong)] font-medium flex-1 truncate">
          {value}
        </span>
        <button
          onClick={onAccept}
          className="px-2 py-1 text-[12px] font-semibold text-[var(--color-primary-strong)] bg-[var(--surface-neutral-white)] rounded hover:bg-[var(--color-primary-medium)] transition-colors flex-shrink-0"
        >
          Accept
        </button>
        <button
          onClick={() => dismissSuggestion(field)}
          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--color-primary-medium)] text-[var(--color-primary-strong)] transition-colors flex-shrink-0"
        >
          <Icon name="xmark" size={12} />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)]">
            Variation 3: Inline Suggestion Chips
          </h2>
          {suggestion && (
            <button
              onClick={regenerateAll}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--color-primary-strong)] border border-[var(--color-primary-strong)] rounded-full hover:bg-[var(--color-primary-weak)] transition-colors disabled:opacity-50"
            >
              <Icon name="arrows-rotate" size={14} />
              Regenerate all
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
          <div className="flex flex-col gap-2 w-full max-w-[720px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <input
              type="text"
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            />
            {suggestion?.jobStatus && !jobStatus && (
              <SuggestionChip
                field="jobStatus"
                value={suggestion.jobStatus}
                onAccept={() => acceptSuggestion('jobStatus', suggestion.jobStatus, setJobStatus)}
              />
            )}
          </div>

          {/* Hiring Lead & Department */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-2 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <input
                type="text"
                value={hiringLead}
                onChange={(e) => setHiringLead(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion?.hiringLead && !hiringLead && (
                <SuggestionChip
                  field="hiringLead"
                  value={suggestion.hiringLead}
                  onAccept={() => acceptSuggestion('hiringLead', suggestion.hiringLead, setHiringLead)}
                  compact
                />
              )}
            </div>

            <div className="flex flex-col gap-2 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion?.department && !department && (
                <SuggestionChip
                  field="department"
                  value={suggestion.department}
                  onAccept={() => acceptSuggestion('department', suggestion.department, setDepartment)}
                  compact
                />
              )}
            </div>
          </div>

          {/* Employment Type & Minimum Experience */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-2 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <input
                type="text"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion?.employmentType && !employmentType && (
                <SuggestionChip
                  field="employmentType"
                  value={suggestion.employmentType}
                  onAccept={() => acceptSuggestion('employmentType', suggestion.employmentType, setEmploymentType)}
                  compact
                />
              )}
            </div>

            <div className="flex flex-col gap-2 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Minimum Experience
              </label>
              <input
                type="text"
                value={minimumExperience}
                onChange={(e) => setMinimumExperience(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion?.minimumExperience && !minimumExperience && (
                <SuggestionChip
                  field="minimumExperience"
                  value={suggestion.minimumExperience}
                  onAccept={() => acceptSuggestion('minimumExperience', suggestion.minimumExperience, setMinimumExperience)}
                  compact
                />
              )}
            </div>
          </div>

          {/* Compensation */}
          <div className="flex flex-col gap-2 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Compensation
            </label>
            <input
              type="text"
              value={compensation}
              onChange={(e) => setCompensation(e.target.value)}
              placeholder="e.g. $10-15 Hourly DOE"
              className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none focus:border-[var(--color-primary-strong)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            />
            {suggestion?.compensation && !compensation && (
              <SuggestionChip
                field="compensation"
                value={suggestion.compensation}
                onAccept={() => acceptSuggestion('compensation', suggestion.compensation, setCompensation)}
                compact
              />
            )}
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
            {suggestion && !locationInOffice && !locationHybrid && !locationRemote && !dismissed.has('location') && (
              <SuggestionChip
                field="location"
                value={
                  suggestion.locationHybrid ? 'Hybrid' :
                  suggestion.locationRemote ? 'Remote' :
                  'In Office'
                }
                onAccept={() => {
                  setLocationInOffice(suggestion.locationInOffice);
                  setLocationHybrid(suggestion.locationHybrid);
                  setLocationRemote(suggestion.locationRemote);
                  setDismissed(prev => new Set([...prev, 'location']));
                }}
              />
            )}
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Add your job description here..."
              className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none focus:border-[var(--color-primary-strong)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            />
            {suggestion?.jobDescription && !jobDescription && (
              <SuggestionChip
                field="jobDescription"
                value={`${suggestion.jobDescription.substring(0, 60)}...`}
                onAccept={() => acceptSuggestion('jobDescription', suggestion.jobDescription, setJobDescription)}
              />
            )}
          </div>

          {/* Internal Job Code */}
          <div className="flex flex-col gap-2 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Internal Job Code
            </label>
            <input
              type="text"
              value={internalJobCode}
              onChange={(e) => setInternalJobCode(e.target.value)}
              className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
              style={{ boxShadow: 'var(--shadow-100)' }}
            />
            {suggestion?.internalJobCode && !internalJobCode && (
              <SuggestionChip
                field="internalJobCode"
                value={suggestion.internalJobCode}
                onAccept={() => acceptSuggestion('internalJobCode', suggestion.internalJobCode, setInternalJobCode)}
                compact
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
