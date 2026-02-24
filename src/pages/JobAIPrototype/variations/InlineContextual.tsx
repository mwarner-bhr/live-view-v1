import { useState, useEffect, useRef } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function InlineContextual() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [acceptedFields, setAcceptedFields] = useState<Set<string>>(new Set());

  // Form field values
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

  const fieldRefs = {
    jobStatus: useRef<HTMLInputElement>(null),
    hiringLead: useRef<HTMLInputElement>(null),
    department: useRef<HTMLInputElement>(null),
    employmentType: useRef<HTMLInputElement>(null),
    minimumExperience: useRef<HTMLInputElement>(null),
    compensation: useRef<HTMLInputElement>(null),
    jobDescription: useRef<HTMLTextAreaElement>(null),
    internalJobCode: useRef<HTMLInputElement>(null),
  };

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const newSuggestion = generateSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const acceptSuggestion = (field: string, value: any, setter: (val: any) => void) => {
    setter(value);
    setAcceptedFields(prev => new Set([...prev, field]));

    // Focus next field
    const fieldOrder = ['jobStatus', 'hiringLead', 'department', 'employmentType', 'minimumExperience', 'compensation', 'jobDescription', 'internalJobCode'];
    const currentIndex = fieldOrder.indexOf(field);
    if (currentIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentIndex + 1];
      const nextRef = fieldRefs[nextField as keyof typeof fieldRefs];
      if (nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: string, value: any, setter: (val: any) => void) => {
    if (e.key === 'Tab' && !e.shiftKey && suggestion && !acceptedFields.has(field)) {
      e.preventDefault();
      acceptSuggestion(field, value, setter);
    }
  };

  const generateDescription = async () => {
    if (!suggestion) return;
    setJobDescription(suggestion.jobDescription);
    setAcceptedFields(prev => new Set([...prev, 'jobDescription']));
  };

  const SuggestionDropdown = ({
    field,
    value,
    reason,
    onAccept
  }: {
    field: string;
    value: string;
    reason: string;
    onAccept: () => void;
  }) => {
    if (focusedField !== field || acceptedFields.has(field)) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-[var(--surface-neutral-white)] border-2 border-[var(--color-primary-strong)] rounded-lg z-10 animate-fadeIn" style={{ boxShadow: 'var(--shadow-300)' }}>
        <div className="flex items-start gap-2 mb-2">
          <Icon name="sparkles" size={14} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[14px] font-semibold text-[var(--color-primary-strong)] mb-0.5">
              Suggested: {value}
            </div>
            <div className="text-[12px] text-[var(--text-neutral-medium)]">
              {reason}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[var(--text-neutral-medium)]">
          <kbd className="px-1.5 py-0.5 bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-medium)] rounded text-[11px] font-mono">Tab</kbd>
          <span>to accept</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)] mb-6">
          Option C: Inline Contextual Suggestions
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
            {suggestion && (
              <div className="text-[13px] text-[var(--text-neutral-medium)] mt-1">
                💡 Tab through fields to see and accept AI suggestions
              </div>
            )}
          </div>

          {/* Job Status */}
          <div className="flex flex-col gap-1 w-full max-w-[720px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <div className="relative">
              <input
                ref={fieldRefs.jobStatus}
                type="text"
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                onFocus={() => setFocusedField('jobStatus')}
                onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                onKeyDown={(e) => handleKeyDown(e, 'jobStatus', suggestion?.jobStatus, setJobStatus)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion && (
                <SuggestionDropdown
                  field="jobStatus"
                  value={suggestion.jobStatus}
                  reason="Based on similar postings"
                  onAccept={() => acceptSuggestion('jobStatus', suggestion.jobStatus, setJobStatus)}
                />
              )}
            </div>
          </div>

          {/* Hiring Lead & Department */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <div className="relative">
                <input
                  ref={fieldRefs.hiringLead}
                  type="text"
                  value={hiringLead}
                  onChange={(e) => setHiringLead(e.target.value)}
                  onFocus={() => setFocusedField('hiringLead')}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  onKeyDown={(e) => handleKeyDown(e, 'hiringLead', suggestion?.hiringLead, setHiringLead)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {suggestion && (
                  <SuggestionDropdown
                    field="hiringLead"
                    value={suggestion.hiringLead}
                    reason="Most common lead for this role"
                    onAccept={() => acceptSuggestion('hiringLead', suggestion.hiringLead, setHiringLead)}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Department
              </label>
              <div className="relative">
                <input
                  ref={fieldRefs.department}
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  onFocus={() => setFocusedField('department')}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  onKeyDown={(e) => handleKeyDown(e, 'department', suggestion?.department, setDepartment)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {suggestion && (
                  <SuggestionDropdown
                    field="department"
                    value={suggestion.department}
                    reason="Based on job title"
                    onAccept={() => acceptSuggestion('department', suggestion.department, setDepartment)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Employment Type & Minimum Experience */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <div className="relative">
                <input
                  ref={fieldRefs.employmentType}
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  onFocus={() => setFocusedField('employmentType')}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  onKeyDown={(e) => handleKeyDown(e, 'employmentType', suggestion?.employmentType, setEmploymentType)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {suggestion && (
                  <SuggestionDropdown
                    field="employmentType"
                    value={suggestion.employmentType}
                    reason="Most common for this role"
                    onAccept={() => acceptSuggestion('employmentType', suggestion.employmentType, setEmploymentType)}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Minimum Experience
              </label>
              <div className="relative">
                <input
                  ref={fieldRefs.minimumExperience}
                  type="text"
                  value={minimumExperience}
                  onChange={(e) => setMinimumExperience(e.target.value)}
                  onFocus={() => setFocusedField('minimumExperience')}
                  onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                  onKeyDown={(e) => handleKeyDown(e, 'minimumExperience', suggestion?.minimumExperience, setMinimumExperience)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {suggestion && (
                  <SuggestionDropdown
                    field="minimumExperience"
                    value={suggestion.minimumExperience}
                    reason="Typical for this position level"
                    onAccept={() => acceptSuggestion('minimumExperience', suggestion.minimumExperience, setMinimumExperience)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Compensation
            </label>
            <div className="relative">
              <input
                ref={fieldRefs.compensation}
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                onFocus={() => setFocusedField('compensation')}
                onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                onKeyDown={(e) => handleKeyDown(e, 'compensation', suggestion?.compensation, setCompensation)}
                placeholder="e.g. $10-15 Hourly DOE"
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion && (
                <SuggestionDropdown
                  field="compensation"
                  value={suggestion.compensation}
                  reason="Market rate for similar roles"
                  onAccept={() => acceptSuggestion('compensation', suggestion.compensation, setCompensation)}
                />
              )}
            </div>
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
            <div className="relative">
              <textarea
                ref={fieldRefs.jobDescription}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onFocus={() => setFocusedField('jobDescription')}
                onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                placeholder="Add your job description here..."
                className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {focusedField === 'jobDescription' && suggestion && !acceptedFields.has('jobDescription') && !jobDescription && (
                <div className="absolute top-3 left-4 right-4">
                  <button
                    onClick={generateDescription}
                    className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--color-primary-strong)] bg-[var(--color-primary-weak)] border border-[var(--color-primary-medium)] rounded-lg hover:bg-[var(--color-primary-medium)] transition-colors"
                  >
                    <Icon name="sparkles" size={14} />
                    Generate description based on role →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Internal Job Code */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Internal Job Code
            </label>
            <div className="relative">
              <input
                ref={fieldRefs.internalJobCode}
                type="text"
                value={internalJobCode}
                onChange={(e) => setInternalJobCode(e.target.value)}
                onFocus={() => setFocusedField('internalJobCode')}
                onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                onKeyDown={(e) => handleKeyDown(e, 'internalJobCode', suggestion?.internalJobCode, setInternalJobCode)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {suggestion?.internalJobCode && (
                <SuggestionDropdown
                  field="internalJobCode"
                  value={suggestion.internalJobCode}
                  reason="Auto-generated code"
                  onAccept={() => acceptSuggestion('internalJobCode', suggestion.internalJobCode, setInternalJobCode)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
