import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions } from '../mockData';

type FieldStatus = 'empty' | 'loading' | 'filled';

export function ProgressiveFillShimmer() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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

  // Field statuses
  const [fieldStatuses, setFieldStatuses] = useState<Record<string, FieldStatus>>({});

  // Track recently filled fields for highlight
  const [recentlyFilled, setRecentlyFilled] = useState<Set<string>>(new Set());

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setFieldStatuses({});
      setRecentlyFilled(new Set());
      return;
    }

    const timer = setTimeout(() => {
      progressiveFill();
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const progressiveFill = async () => {
    setIsGenerating(true);
    const suggestion = generateSuggestions(postingTitle);
    if (!suggestion) {
      setIsGenerating(false);
      return;
    }

    const fields = [
      { name: 'jobStatus', value: suggestion.jobStatus, setter: setJobStatus },
      { name: 'hiringLead', value: suggestion.hiringLead, setter: setHiringLead },
      { name: 'department', value: suggestion.department, setter: setDepartment },
      { name: 'employmentType', value: suggestion.employmentType, setter: setEmploymentType },
      { name: 'minimumExperience', value: suggestion.minimumExperience, setter: setMinimumExperience },
      { name: 'compensation', value: suggestion.compensation, setter: setCompensation },
      { name: 'location', value: suggestion, setter: null },
      { name: 'jobDescription', value: suggestion.jobDescription, setter: setJobDescription },
      { name: 'internalJobCode', value: suggestion.internalJobCode, setter: setInternalJobCode },
    ];

    for (const field of fields) {
      // Show loading
      setFieldStatuses(prev => ({ ...prev, [field.name]: 'loading' }));
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

      // Fill field
      if (field.name === 'location' && typeof field.value === 'object') {
        const locationSuggestion = field.value as JobSuggestion;
        setLocationInOffice(locationSuggestion.locationInOffice);
        setLocationHybrid(locationSuggestion.locationHybrid);
        setLocationRemote(locationSuggestion.locationRemote);
      } else if (field.setter) {
        field.setter(field.value as string);
      }

      setFieldStatuses(prev => ({ ...prev, [field.name]: 'filled' }));
      setRecentlyFilled(prev => new Set([...prev, field.name]));

      // Remove highlight after animation
      setTimeout(() => {
        setRecentlyFilled(prev => {
          const next = new Set(prev);
          next.delete(field.name);
          return next;
        });
      }, 1000);
    }

    setIsGenerating(false);
  };

  const undoField = (fieldName: string, setter: (val: any) => void, defaultValue: any = '') => {
    setter(defaultValue);
    setFieldStatuses(prev => {
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

  const undoLocation = () => {
    setLocationInOffice(false);
    setLocationHybrid(false);
    setLocationRemote(false);
    setFieldStatuses(prev => {
      const next = { ...prev };
      delete next.location;
      return next;
    });
  };

  const rerunGeneration = () => {
    if (!postingTitle) return;
    // Clear all fields first
    setJobStatus('');
    setHiringLead('');
    setDepartment('');
    setEmploymentType('');
    setMinimumExperience('');
    setCompensation('');
    setJobDescription('');
    setInternalJobCode('');
    setLocationInOffice(false);
    setLocationHybrid(false);
    setLocationRemote(false);
    setFieldStatuses({});
    setRecentlyFilled(new Set());

    // Trigger new generation
    progressiveFill();
  };

  const Shimmer = () => (
    <div className="absolute inset-0 rounded-[var(--radius-xx-small)] overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-primary-weak)] to-transparent animate-shimmer" />
    </div>
  );

  const FieldWrapper = ({ children, fieldName, className = '' }: { children: React.ReactNode; fieldName: string; className?: string }) => {
    const status = fieldStatuses[fieldName];
    const isRecent = recentlyFilled.has(fieldName);

    return (
      <div className={`relative ${className}`}>
        {children}
        {status === 'loading' && <Shimmer />}
        {status === 'filled' && isRecent && (
          <div className="absolute inset-0 rounded-[var(--radius-xx-small)] bg-[var(--color-primary-weak)] animate-pulse pointer-events-none" />
        )}
      </div>
    );
  };

  const UndoButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-[var(--color-primary-strong)] bg-[var(--surface-neutral-white)] border border-[var(--color-primary-medium)] rounded hover:bg-[var(--color-primary-weak)] transition-colors z-10"
    >
      <Icon name="rotate-left" size={10} />
      Undo
    </button>
  );

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)]">
            Variation 5: Progressive Fill with Shimmer
          </h2>
          {Object.keys(fieldStatuses).length > 0 && !isGenerating && (
            <button
              onClick={rerunGeneration}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--color-primary-strong)] border border-[var(--color-primary-strong)] rounded-full hover:bg-[var(--color-primary-weak)] transition-colors"
            >
              <Icon name="arrows-rotate" size={14} />
              Re-run generation
            </button>
          )}
        </div>

        {isGenerating && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-[var(--color-primary-weak)] rounded-lg">
            <Icon name="sparkles" size={16} className="text-[var(--color-primary-strong)] animate-pulse" />
            <span className="text-[14px] font-medium text-[var(--color-primary-strong)]">
              Filling fields progressively...
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
            <FieldWrapper fieldName="jobStatus" className="relative">
              <input
                type="text"
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {fieldStatuses.jobStatus === 'filled' && jobStatus && (
                <UndoButton onClick={() => undoField('jobStatus', setJobStatus)} />
              )}
            </FieldWrapper>
          </div>

          {/* Hiring Lead & Department */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <FieldWrapper fieldName="hiringLead" className="relative">
                <input
                  type="text"
                  value={hiringLead}
                  onChange={(e) => setHiringLead(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {fieldStatuses.hiringLead === 'filled' && hiringLead && (
                  <UndoButton onClick={() => undoField('hiringLead', setHiringLead)} />
                )}
              </FieldWrapper>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Department
              </label>
              <FieldWrapper fieldName="department" className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {fieldStatuses.department === 'filled' && department && (
                  <UndoButton onClick={() => undoField('department', setDepartment)} />
                )}
              </FieldWrapper>
            </div>
          </div>

          {/* Employment Type & Minimum Experience */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <FieldWrapper fieldName="employmentType" className="relative">
                <input
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {fieldStatuses.employmentType === 'filled' && employmentType && (
                  <UndoButton onClick={() => undoField('employmentType', setEmploymentType)} />
                )}
              </FieldWrapper>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Minimum Experience
              </label>
              <FieldWrapper fieldName="minimumExperience" className="relative">
                <input
                  type="text"
                  value={minimumExperience}
                  onChange={(e) => setMinimumExperience(e.target.value)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                {fieldStatuses.minimumExperience === 'filled' && minimumExperience && (
                  <UndoButton onClick={() => undoField('minimumExperience', setMinimumExperience)} />
                )}
              </FieldWrapper>
            </div>
          </div>

          {/* Compensation */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Compensation
            </label>
            <FieldWrapper fieldName="compensation" className="relative">
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="e.g. $10-15 Hourly DOE"
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {fieldStatuses.compensation === 'filled' && compensation && (
                <UndoButton onClick={() => undoField('compensation', setCompensation)} />
              )}
            </FieldWrapper>
          </div>

          {/* Job Location */}
          <div className="flex flex-col gap-[13px]">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              {fieldStatuses.location === 'filled' && (locationInOffice || locationHybrid || locationRemote) && (
                <button
                  onClick={undoLocation}
                  className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-[var(--color-primary-strong)] bg-[var(--surface-neutral-white)] border border-[var(--color-primary-medium)] rounded hover:bg-[var(--color-primary-weak)] transition-colors"
                >
                  <Icon name="rotate-left" size={10} />
                  Undo
                </button>
              )}
            </div>
            <FieldWrapper fieldName="location">
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
            </FieldWrapper>
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              {fieldStatuses.jobDescription === 'filled' && jobDescription && (
                <button
                  onClick={() => undoField('jobDescription', setJobDescription)}
                  className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-[var(--color-primary-strong)] bg-[var(--surface-neutral-white)] border border-[var(--color-primary-medium)] rounded hover:bg-[var(--color-primary-weak)] transition-colors"
                >
                  <Icon name="rotate-left" size={10} />
                  Undo
                </button>
              )}
            </div>
            <FieldWrapper fieldName="jobDescription">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Add your job description here..."
                className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
            </FieldWrapper>
          </div>

          {/* Internal Job Code */}
          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Internal Job Code
            </label>
            <FieldWrapper fieldName="internalJobCode" className="relative">
              <input
                type="text"
                value={internalJobCode}
                onChange={(e) => setInternalJobCode(e.target.value)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {fieldStatuses.internalJobCode === 'filled' && internalJobCode && (
                <UndoButton onClick={() => undoField('internalJobCode', setInternalJobCode)} />
              )}
            </FieldWrapper>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
