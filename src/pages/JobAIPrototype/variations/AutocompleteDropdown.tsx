import { useState, useEffect, useRef } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import { generateSuggestions, simulateAIDelay, getMatchingJobTitles } from '../mockData';

export function AutocompleteDropdown() {
  const [postingTitle, setPostingTitle] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [matchingTitles, setMatchingTitles] = useState<string[]>([]);

  // Form fields with AI-filled indicator
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

  // Track which fields were AI-filled
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Show dropdown when typing
  useEffect(() => {
    if (postingTitle.length >= 2) {
      const matches = getMatchingJobTitles(postingTitle);
      setMatchingTitles(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setShowDropdown(false);
      setMatchingTitles([]);
    }
  }, [postingTitle]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fillWithAI = async (selectedTitle: string) => {
    setIsLoading(true);
    setShowDropdown(false);

    await simulateAIDelay();

    const suggestion = generateSuggestions(selectedTitle);
    if (suggestion) {
      setPostingTitle(suggestion.title);
      setJobStatus(suggestion.jobStatus);
      setHiringLead(suggestion.hiringLead);
      setDepartment(suggestion.department);
      setEmploymentType(suggestion.employmentType);
      setMinimumExperience(suggestion.minimumExperience);
      setCompensation(suggestion.compensation);
      setJobDescription(suggestion.jobDescription);
      setInternalJobCode(suggestion.internalJobCode);
      setLocationInOffice(suggestion.locationInOffice);
      setLocationHybrid(suggestion.locationHybrid);
      setLocationRemote(suggestion.locationRemote);

      // Mark all fields as AI-filled
      setAiFilledFields(new Set([
        'jobStatus', 'hiringLead', 'department', 'employmentType',
        'minimumExperience', 'compensation', 'jobDescription', 'internalJobCode', 'location'
      ]));
    }

    setIsLoading(false);
  };

  const clearField = (fieldName: string, setter: (value: any) => void, defaultValue: any = '') => {
    setter(defaultValue);
    setAiFilledFields(prev => {
      const next = new Set(prev);
      next.delete(fieldName);
      return next;
    });
  };

  const regenerate = async () => {
    if (postingTitle) {
      await fillWithAI(postingTitle);
    }
  };

  const FieldLabel = ({ children, aiField }: { children: React.ReactNode; aiField?: string }) => (
    <div className="flex items-center gap-2">
      <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
        {children}
      </label>
      {aiField && aiFilledFields.has(aiField) && (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-primary-weak)] text-[11px] font-semibold text-[var(--color-primary-strong)]">
          <Icon name="sparkles" size={10} />
          AI
        </div>
      )}
    </div>
  );

  const ClearButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)]"
    >
      <Icon name="xmark" size={12} />
    </button>
  );

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)]">
            Variation 1: Autocomplete Dropdown
          </h2>
          {aiFilledFields.size > 0 && (
            <button
              onClick={regenerate}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--color-primary-strong)] border border-[var(--color-primary-strong)] rounded-full hover:bg-[var(--color-primary-weak)] transition-colors disabled:opacity-50"
            >
              <Icon name="arrows-rotate" size={14} />
              Regenerate
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* Posting Title with Autocomplete */}
          <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Posting Title<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={postingTitle}
                onChange={(e) => setPostingTitle(e.target.value)}
                placeholder="Start typing job title..."
                className="w-full h-10 px-3 py-2 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Icon name="spinner" size={16} className="text-[var(--color-primary-strong)] animate-spin" />
                </div>
              )}
            </div>

            {/* Dropdown */}
            {showDropdown && matchingTitles.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-small)] shadow-lg z-10 overflow-hidden">
                {matchingTitles.map((title) => (
                  <button
                    key={title}
                    onClick={() => fillWithAI(title)}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--surface-neutral-xx-weak)] transition-colors border-b border-[var(--border-neutral-x-weak)] last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="sparkles" size={14} className="text-[var(--color-primary-strong)]" />
                      <span className="text-[15px] font-medium text-[var(--text-neutral-x-strong)]">{title}</span>
                    </div>
                    <div className="text-[13px] text-[var(--text-neutral-medium)] mt-1 ml-6">
                      Fill out with AI
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Job Status */}
          <div className="flex flex-col gap-1 w-full max-w-[720px]">
            <FieldLabel aiField="jobStatus">
              Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
            </FieldLabel>
            <div className="relative">
              <select
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                className="w-full h-10 pl-3 pr-10 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none appearance-none cursor-pointer"
                style={{ boxShadow: 'var(--shadow-100)' }}
              >
                <option value="">-Select-</option>
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="On Hold">On Hold</option>
                <option value="Closed">Closed</option>
              </select>
              {aiFilledFields.has('jobStatus') && jobStatus && (
                <ClearButton onClick={() => clearField('jobStatus', setJobStatus)} />
              )}
            </div>
          </div>

          {/* Hiring Lead & Department */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <FieldLabel aiField="hiringLead">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={hiringLead}
                  onChange={(e) => setHiringLead(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {aiFilledFields.has('hiringLead') && hiringLead && (
                  <ClearButton onClick={() => clearField('hiringLead', setHiringLead)} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <FieldLabel aiField="department">Department</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {aiFilledFields.has('department') && department && (
                  <ClearButton onClick={() => clearField('department', setDepartment)} />
                )}
              </div>
            </div>
          </div>

          {/* Employment Type & Minimum Experience */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <FieldLabel aiField="employmentType">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {aiFilledFields.has('employmentType') && employmentType && (
                  <ClearButton onClick={() => clearField('employmentType', setEmploymentType)} />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <FieldLabel aiField="minimumExperience">Minimum Experience</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={minimumExperience}
                  onChange={(e) => setMinimumExperience(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {aiFilledFields.has('minimumExperience') && minimumExperience && (
                  <ClearButton onClick={() => clearField('minimumExperience', setMinimumExperience)} />
                )}
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="flex flex-col gap-1 w-[248px]">
            <FieldLabel aiField="compensation">Compensation</FieldLabel>
            <div className="relative">
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="e.g. $10-15 Hourly DOE"
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {aiFilledFields.has('compensation') && compensation && (
                <ClearButton onClick={() => clearField('compensation', setCompensation)} />
              )}
            </div>
          </div>

          {/* Job Location */}
          <div className="flex flex-col gap-[13px]">
            <FieldLabel aiField="location">
              Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
            </FieldLabel>
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
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1 w-full">
            <FieldLabel aiField="jobDescription">
              Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
            </FieldLabel>
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Add your job description here..."
                className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {aiFilledFields.has('jobDescription') && jobDescription && (
                <button
                  type="button"
                  onClick={() => clearField('jobDescription', setJobDescription)}
                  className="absolute right-3 top-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)]"
                >
                  <Icon name="xmark" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Internal Job Code */}
          <div className="flex flex-col gap-1 w-[248px]">
            <FieldLabel aiField="internalJobCode">Internal Job Code</FieldLabel>
            <div className="relative">
              <input
                type="text"
                value={internalJobCode}
                onChange={(e) => setInternalJobCode(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {aiFilledFields.has('internalJobCode') && internalJobCode && (
                <ClearButton onClick={() => clearField('internalJobCode', setInternalJobCode)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
