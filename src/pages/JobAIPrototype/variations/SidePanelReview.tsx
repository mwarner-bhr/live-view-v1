import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function SidePanelReview() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);
  const [showPanel, setShowPanel] = useState(false);

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

  // Track which suggestions are selected
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      setShowPanel(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const newSuggestion = generateSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setSelected(new Set(['jobStatus', 'hiringLead', 'department', 'employmentType', 'minimumExperience', 'compensation', 'location', 'jobDescription', 'internalJobCode']));
      setShowPanel(true);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const toggleSelection = (field: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(field)) {
        next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const acceptSelected = () => {
    if (!suggestion) return;

    if (selected.has('jobStatus')) setJobStatus(suggestion.jobStatus);
    if (selected.has('hiringLead')) setHiringLead(suggestion.hiringLead);
    if (selected.has('department')) setDepartment(suggestion.department);
    if (selected.has('employmentType')) setEmploymentType(suggestion.employmentType);
    if (selected.has('minimumExperience')) setMinimumExperience(suggestion.minimumExperience);
    if (selected.has('compensation')) setCompensation(suggestion.compensation);
    if (selected.has('jobDescription')) setJobDescription(suggestion.jobDescription);
    if (selected.has('internalJobCode')) setInternalJobCode(suggestion.internalJobCode);
    if (selected.has('location')) {
      setLocationInOffice(suggestion.locationInOffice);
      setLocationHybrid(suggestion.locationHybrid);
      setLocationRemote(suggestion.locationRemote);
    }

    setShowPanel(false);
  };

  const acceptAll = () => {
    setSelected(new Set(['jobStatus', 'hiringLead', 'department', 'employmentType', 'minimumExperience', 'compensation', 'location', 'jobDescription', 'internalJobCode']));
  };

  const deselectAll = () => {
    setSelected(new Set());
  };

  const SuggestionItem = ({ field, label, value }: { field: string; label: string; value: string }) => (
    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-neutral-x-weak)] cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={selected.has(field)}
        onChange={() => toggleSelection(field)}
        className="mt-1 w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)] cursor-pointer flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-[var(--text-neutral-strong)] mb-1">
          {label}
        </div>
        <div className="text-[14px] text-[var(--text-neutral-x-strong)] break-words">
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      </div>
    </label>
  );

  return (
    <div className="flex gap-6 max-w-7xl">
      {/* Main Form */}
      <div className="flex-1">
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
          <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)] mb-6">
            Variation 4: Side Panel Review
          </h2>

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
              <input
                type="text"
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
            </div>

            {/* Hiring Lead & Department */}
            <div className="flex gap-8">
              <div className="flex flex-col gap-1 w-[248px]">
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
              </div>

              <div className="flex flex-col gap-1 w-[248px]">
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
              </div>
            </div>

            {/* Employment Type & Minimum Experience */}
            <div className="flex gap-8">
              <div className="flex flex-col gap-1 w-[248px]">
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
              </div>

              <div className="flex flex-col gap-1 w-[248px]">
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
              </div>
            </div>

            {/* Compensation */}
            <div className="flex flex-col gap-1 w-[248px]">
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
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-1 w-full">
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
            </div>

            {/* Internal Job Code */}
            <div className="flex flex-col gap-1 w-[248px]">
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
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {showPanel && suggestion && (
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-6 sticky top-6" style={{ boxShadow: 'var(--shadow-300)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="sparkles" size={20} className="text-[var(--color-primary-strong)]" />
              <h3 className="font-semibold text-[18px] text-[var(--color-primary-strong)]">
                AI Suggestions
              </h3>
            </div>

            <p className="text-[14px] text-[var(--text-neutral-medium)] mb-4">
              Review and select which suggestions to apply
            </p>

            <div className="flex gap-2 mb-4">
              <button
                onClick={acceptAll}
                className="flex-1 px-3 py-2 text-[13px] font-medium text-[var(--color-primary-strong)] border border-[var(--color-primary-strong)] rounded hover:bg-[var(--color-primary-weak)] transition-colors"
              >
                Select all
              </button>
              <button
                onClick={deselectAll}
                className="flex-1 px-3 py-2 text-[13px] font-medium text-[var(--text-neutral-strong)] border border-[var(--border-neutral-medium)] rounded hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-6 max-h-[600px] overflow-y-auto">
              <SuggestionItem field="jobStatus" label="Job Status" value={suggestion.jobStatus} />
              <SuggestionItem field="hiringLead" label="Hiring Lead" value={suggestion.hiringLead} />
              <SuggestionItem field="department" label="Department" value={suggestion.department} />
              <SuggestionItem field="employmentType" label="Employment Type" value={suggestion.employmentType} />
              <SuggestionItem field="minimumExperience" label="Minimum Experience" value={suggestion.minimumExperience} />
              <SuggestionItem field="compensation" label="Compensation" value={suggestion.compensation} />
              <SuggestionItem
                field="location"
                label="Job Location"
                value={
                  suggestion.locationHybrid ? 'Hybrid' :
                  suggestion.locationRemote ? 'Remote' :
                  'In Office'
                }
              />
              <SuggestionItem field="jobDescription" label="Job Description" value={suggestion.jobDescription} />
              {suggestion.internalJobCode && (
                <SuggestionItem field="internalJobCode" label="Internal Job Code" value={suggestion.internalJobCode} />
              )}
            </div>

            <button
              onClick={acceptSelected}
              disabled={selected.size === 0}
              className="w-full h-[44px] px-6 text-[16px] font-semibold text-white bg-[var(--color-primary-strong)] rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Accept {selected.size > 0 && `(${selected.size})`}
            </button>

            <button
              onClick={() => setShowPanel(false)}
              className="w-full mt-2 px-4 py-2 text-[14px] font-medium text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-x-weak)] rounded transition-colors"
            >
              Close panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
