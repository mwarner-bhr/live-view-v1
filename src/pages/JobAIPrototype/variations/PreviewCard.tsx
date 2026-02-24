import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function PreviewCard() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);
  const [showPreviewCard, setShowPreviewCard] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

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

  // Track which fields are selected in preview
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      setShowPreviewCard(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const newSuggestion = generateSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setSelectedFields(new Set(['jobStatus', 'hiringLead', 'department', 'employmentType', 'minimumExperience', 'compensation', 'location', 'jobDescription', 'internalJobCode']));
      setShowPreviewCard(true);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const toggleField = (field: string) => {
    setSelectedFields(prev => {
      const next = new Set(prev);
      if (next.has(field)) {
        next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const applySelected = () => {
    if (!suggestion) return;

    if (selectedFields.has('jobStatus')) setJobStatus(suggestion.jobStatus);
    if (selectedFields.has('hiringLead')) setHiringLead(suggestion.hiringLead);
    if (selectedFields.has('department')) setDepartment(suggestion.department);
    if (selectedFields.has('employmentType')) setEmploymentType(suggestion.employmentType);
    if (selectedFields.has('minimumExperience')) setMinimumExperience(suggestion.minimumExperience);
    if (selectedFields.has('compensation')) setCompensation(suggestion.compensation);
    if (selectedFields.has('jobDescription')) setJobDescription(suggestion.jobDescription);
    if (selectedFields.has('internalJobCode')) setInternalJobCode(suggestion.internalJobCode);
    if (selectedFields.has('location')) {
      setLocationInOffice(suggestion.locationInOffice);
      setLocationHybrid(suggestion.locationHybrid);
      setLocationRemote(suggestion.locationRemote);
    }

    setShowPreviewCard(false);
  };

  const PreviewRow = ({ field, label, value }: { field: string; label: string; value: string }) => (
    <label className="flex items-center gap-3 p-3 rounded hover:bg-[var(--surface-neutral-x-weak)] cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={selectedFields.has(field)}
        onChange={() => toggleField(field)}
        className="w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)] cursor-pointer flex-shrink-0"
      />
      <div className="flex-1 flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-[var(--text-neutral-strong)]">
          {label}:
        </span>
        <span className="text-[14px] text-[var(--text-neutral-x-strong)] font-medium">
          {value}
        </span>
      </div>
    </label>
  );

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)] mb-6">
          Option A: Preview Card with Smart Defaults
        </h2>

        <div className="flex flex-col gap-6">
          {/* Posting Title */}
          <div className="flex flex-col gap-1 relative">
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

            {/* Preview Card */}
            {isGenerating && (
              <div className="mt-2 p-4 bg-[var(--color-primary-weak)] rounded-lg border border-[var(--color-primary-medium)]">
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" size={16} className="text-[var(--color-primary-strong)] animate-pulse" />
                  <span className="text-[14px] font-medium text-[var(--color-primary-strong)]">
                    Analyzing similar roles...
                  </span>
                </div>
              </div>
            )}

            {showPreviewCard && suggestion && (
              <div className="mt-2 p-5 bg-[var(--surface-neutral-white)] rounded-lg border-2 border-[var(--color-primary-medium)]" style={{ boxShadow: 'var(--shadow-300)' }}>
                <div className="flex items-start gap-2 mb-4">
                  <Icon name="sparkles" size={18} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[15px] font-semibold text-[var(--color-primary-strong)] mb-1">
                      Based on similar roles at your company
                    </div>
                    <div className="text-[13px] text-[var(--text-neutral-medium)]">
                      Select which fields to auto-fill
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <PreviewRow field="jobStatus" label="Job Status" value={suggestion.jobStatus} />
                  <PreviewRow field="hiringLead" label="Hiring Lead" value={suggestion.hiringLead} />
                  <PreviewRow field="department" label="Department" value={suggestion.department} />
                  <PreviewRow field="employmentType" label="Employment Type" value={suggestion.employmentType} />
                  <PreviewRow field="minimumExperience" label="Experience Level" value={suggestion.minimumExperience} />
                  <PreviewRow field="compensation" label="Compensation" value={suggestion.compensation} />
                  <PreviewRow
                    field="location"
                    label="Location"
                    value={
                      suggestion.locationHybrid ? 'Hybrid' :
                      suggestion.locationRemote ? 'Remote' :
                      'In Office'
                    }
                  />
                  {suggestion.internalJobCode && (
                    <PreviewRow field="internalJobCode" label="Job Code" value={suggestion.internalJobCode} />
                  )}

                  {/* Job Description - Special */}
                  <label className="flex items-center gap-3 p-3 rounded hover:bg-[var(--surface-neutral-x-weak)] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedFields.has('jobDescription')}
                      onChange={() => toggleField('jobDescription')}
                      className="w-4 h-4 rounded border-[var(--border-neutral-medium)] text-[var(--color-primary-strong)] focus:ring-[var(--color-primary-strong)] cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-medium text-[var(--text-neutral-strong)]">
                          Job Description:
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowDescriptionModal(true);
                          }}
                          className="text-[13px] font-medium text-[var(--color-primary-strong)] hover:underline"
                        >
                          Preview full description →
                        </button>
                      </div>
                      <div className="text-[13px] text-[var(--text-neutral-medium)] line-clamp-2">
                        {suggestion.jobDescription}
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={applySelected}
                    disabled={selectedFields.size === 0}
                    className="flex-1 h-[44px] px-6 text-[16px] font-semibold text-white bg-[var(--color-primary-strong)] rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply Selected ({selectedFields.size})
                  </button>
                  <button
                    onClick={() => setShowPreviewCard(false)}
                    className="px-6 h-[44px] text-[15px] font-medium text-[var(--text-neutral-strong)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rest of the form */}
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

      {/* Job Description Modal */}
      {showDescriptionModal && suggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8" onClick={() => setShowDescriptionModal(false)}>
          <div className="bg-[var(--surface-neutral-white)] rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-neutral-x-weak)]">
              <h3 className="text-[20px] font-semibold text-[var(--color-primary-strong)]">
                Job Description Preview
              </h3>
              <button
                onClick={() => setShowDescriptionModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-strong)]"
              >
                <Icon name="xmark" size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-[24px] text-[var(--text-neutral-strong)]">
                {suggestion.jobDescription}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
