import { useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { JobLocationOption } from '../../../components/JobLocationOption';
import type { JobSuggestion } from '../mockData';
import { generateSuggestions, simulateAIDelay } from '../mockData';

export function ConversationalConfirmation() {
  const [postingTitle, setPostingTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<JobSuggestion | null>(null);
  const [showAssistantBubble, setShowAssistantBubble] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const [thinkingDots, setThinkingDots] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  // Animate thinking dots
  useEffect(() => {
    if (!isGenerating) {
      setThinkingDots('');
      return;
    }

    const interval = setInterval(() => {
      setThinkingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Generate suggestions after user pauses typing
  useEffect(() => {
    if (postingTitle.length < 3) {
      setSuggestion(null);
      setShowAssistantBubble(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGenerating(true);
      await simulateAIDelay();
      const newSuggestion = generateSuggestions(postingTitle);
      setSuggestion(newSuggestion);
      setShowAssistantBubble(true);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [postingTitle]);

  const fillItIn = async () => {
    if (!suggestion) return;

    setShowAssistantBubble(false);

    // Fill all fields
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

    setFilledFields(new Set(['jobStatus', 'hiringLead', 'department', 'employmentType', 'minimumExperience', 'compensation', 'location', 'jobDescription', 'internalJobCode']));

    // Show toast (doesn't auto-hide anymore)
    setShowToast(true);
  };

  const undoField = (fieldName: string, setter: (val: any) => void, defaultValue: any = '') => {
    setter(defaultValue);
    setFilledFields(prev => {
      const next = new Set(prev);
      next.delete(fieldName);
      return next;
    });
  };

  const undoLocation = () => {
    setLocationInOffice(false);
    setLocationHybrid(false);
    setLocationRemote(false);
    setFilledFields(prev => {
      const next = new Set(prev);
      next.delete('location');
      return next;
    });
  };

  const getFieldReasoning = (fieldName: string) => {
    if (!suggestion?.reasoning) return null;
    return suggestion.reasoning.find(r => r.field === fieldName);
  };

  const FieldHighlight = ({ isHighlighted }: { isHighlighted: boolean }) =>
    isHighlighted ? (
      <div className="absolute inset-0 rounded-[var(--radius-xx-small)] border-2 border-[var(--color-primary-strong)] bg-[var(--color-primary-weak)]/20 pointer-events-none animate-pulse" />
    ) : null;

  const FieldExplanation = ({ fieldName }: { fieldName: string }) => {
    const reasoning = getFieldReasoning(fieldName);
    if (!reasoning || focusedField !== fieldName || !filledFields.has(fieldName)) return null;

    return (
      <div className="absolute left-0 top-full mt-2 z-50 w-[280px] p-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-lg shadow-lg animate-fadeIn">
        <div className="flex items-start gap-2">
          <Icon name="sparkles" size={14} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
          <span className="text-[13px] text-[var(--text-neutral-strong)] leading-relaxed">{reasoning.reason}</span>
        </div>
      </div>
    );
  };

  const UndoLink = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary-strong)] hover:underline z-10"
    >
      <Icon name="rotate-left" size={10} />
      Undo
    </button>
  );

  return (
    <div className="max-w-5xl">
      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] p-8" style={{ boxShadow: 'var(--shadow-300)' }}>
        <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)] mb-6">
          Option B: Conversational Confirmation
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

            {/* Assistant Bubble */}
            {isGenerating && (
              <div className="mt-3 flex items-start gap-3 p-4 bg-[var(--color-primary-weak)] rounded-lg border border-[var(--color-primary-medium)] animate-fadeIn">
                <Icon name="sparkles" size={20} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5 animate-pulse" />
                <div className="text-[14px] text-[var(--text-neutral-strong)] font-medium">
                  Looking at similar roles{thinkingDots}
                </div>
              </div>
            )}

            {showAssistantBubble && !isGenerating && suggestion && (
              <div className="mt-3 flex items-start gap-3 p-4 bg-[var(--color-primary-weak)] rounded-xl border border-[var(--color-primary-medium)] animate-fadeIn">
                <Icon name="sparkles" size={20} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[14px] text-[var(--text-neutral-strong)] mb-1">
                    {suggestion.confidence === 'high' && suggestion.matchCount > 0 && (
                      <>I can fill this out based on <strong>{suggestion.matchCount} similar {postingTitle}</strong> {suggestion.matchCount === 1 ? 'role' : 'roles'} in your {suggestion.department} department.</>
                    )}
                    {suggestion.confidence === 'medium' && suggestion.matchCount > 0 && (
                      <>I can fill this out based on <strong>{suggestion.matchCount} similar {suggestion.matchCount === 1 ? 'role' : 'roles'}</strong> at your company.</>
                    )}
                    {suggestion.confidence === 'low' && (
                      <>I can suggest some defaults for this role, but I don't have similar postings to reference.</>
                    )}
                  </p>
                  <p className="text-[12px] text-[var(--text-neutral-medium)] mb-3">
                    {suggestion.confidence === 'high' && 'High confidence'}
                    {suggestion.confidence === 'medium' && 'Medium confidence - review carefully'}
                    {suggestion.confidence === 'low' && 'Low confidence - best guess based on your company patterns'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={fillItIn}
                      className="px-4 py-2 text-[14px] font-semibold text-white bg-[var(--color-primary-strong)] rounded-full hover:opacity-90 transition-opacity"
                    >
                      Fill it in
                    </button>
                    <button
                      onClick={() => setShowAssistantBubble(false)}
                      className="px-4 py-2 text-[14px] font-medium text-[var(--text-neutral-strong)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                    >
                      Let me do it myself
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Toast */}
          {showToast && (
            <div className="fixed top-6 right-6 z-50 flex items-center gap-3 p-4 bg-[var(--surface-neutral-white)] rounded-lg border border-[var(--border-neutral-medium)] animate-slideIn" style={{ boxShadow: 'var(--shadow-400)' }}>
              <Icon name="check-circle" size={20} className="text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-[var(--text-neutral-x-strong)]">
                  Filled {filledFields.size} fields
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="text-[13px] text-[var(--color-primary-strong)] hover:underline"
                >
                  Review changes
                </button>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)]"
              >
                <Icon name="xmark" size={12} />
              </button>
            </div>
          )}

          {/* Form fields with highlights */}
          <div className="flex flex-col gap-1 w-full max-w-[720px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Job Status<span className="text-[var(--text-neutral-strong)]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                onFocus={() => setFocusedField('jobStatus')}
                onBlur={() => setFocusedField(null)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              <FieldHighlight isHighlighted={filledFields.has('jobStatus')} />
              {filledFields.has('jobStatus') && jobStatus && (
                <UndoLink onClick={() => undoField('jobStatus', setJobStatus)} />
              )}
              <FieldExplanation fieldName="jobStatus" />
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Hiring Lead<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hiringLead}
                  onChange={(e) => setHiringLead(e.target.value)}
                  onFocus={() => setFocusedField('hiringLead')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                <FieldHighlight isHighlighted={filledFields.has('hiringLead')} />
                {filledFields.has('hiringLead') && hiringLead && (
                  <UndoLink onClick={() => undoField('hiringLead', setHiringLead)} />
                )}
                <FieldExplanation fieldName="hiringLead" />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  onFocus={() => setFocusedField('department')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                <FieldHighlight isHighlighted={filledFields.has('department')} />
                {filledFields.has('department') && department && (
                  <UndoLink onClick={() => undoField('department', setDepartment)} />
                )}
                <FieldExplanation fieldName="department" />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Employment Type<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  onFocus={() => setFocusedField('employmentType')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                <FieldHighlight isHighlighted={filledFields.has('employmentType')} />
                {filledFields.has('employmentType') && employmentType && (
                  <UndoLink onClick={() => undoField('employmentType', setEmploymentType)} />
                )}
                <FieldExplanation fieldName="employmentType" />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-[248px]">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Minimum Experience
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={minimumExperience}
                  onChange={(e) => setMinimumExperience(e.target.value)}
                  onFocus={() => setFocusedField('minimumExperience')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                  style={{ boxShadow: 'var(--shadow-100)' }}
                />
                <FieldHighlight isHighlighted={filledFields.has('minimumExperience')} />
                {filledFields.has('minimumExperience') && minimumExperience && (
                  <UndoLink onClick={() => undoField('minimumExperience', setMinimumExperience)} />
                )}
                <FieldExplanation fieldName="minimumExperience" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Compensation
            </label>
            <div className="relative">
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                onFocus={() => setFocusedField('compensation')}
                onBlur={() => setFocusedField(null)}
                placeholder="e.g. $10-15 Hourly DOE"
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[#878280] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              <FieldHighlight isHighlighted={filledFields.has('compensation')} />
              {filledFields.has('compensation') && compensation && (
                <UndoLink onClick={() => undoField('compensation', setCompensation)} />
              )}
              <FieldExplanation fieldName="compensation" />
            </div>
          </div>

          <div className="flex flex-col gap-[13px]">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Job Location<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              {filledFields.has('location') && (
                <button
                  onClick={undoLocation}
                  className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary-strong)] hover:underline"
                >
                  <Icon name="rotate-left" size={10} />
                  Undo
                </button>
              )}
            </div>
            <div
              className="relative"
              onFocus={() => setFocusedField('location')}
              onBlur={() => setFocusedField(null)}
            >
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
              {filledFields.has('location') && (
                <div className="absolute inset-0 rounded-lg border-2 border-[var(--color-primary-strong)] bg-[var(--color-primary-weak)]/10 pointer-events-none animate-pulse" />
              )}
              <FieldExplanation fieldName="location" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
                Job Description<span className="text-[var(--text-neutral-strong)]">*</span>
              </label>
              {filledFields.has('jobDescription') && jobDescription && (
                <button
                  onClick={() => undoField('jobDescription', setJobDescription)}
                  className="flex items-center gap-1 text-[12px] font-medium text-[var(--color-primary-strong)] hover:underline"
                >
                  <Icon name="rotate-left" size={10} />
                  Undo
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onFocus={() => setFocusedField('jobDescription')}
                onBlur={() => setFocusedField(null)}
                placeholder="Add your job description here..."
                className="w-full h-[300px] px-4 py-[9px] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              {filledFields.has('jobDescription') && (
                <div className="absolute inset-0 rounded-[var(--radius-xx-small)] border-2 border-[var(--color-primary-strong)] bg-[var(--color-primary-weak)]/10 pointer-events-none animate-pulse" />
              )}
              <FieldExplanation fieldName="jobDescription" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-[248px]">
            <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
              Internal Job Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={internalJobCode}
                onChange={(e) => setInternalJobCode(e.target.value)}
                onFocus={() => setFocusedField('internalJobCode')}
                onBlur={() => setFocusedField(null)}
                className="w-full h-10 px-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-xx-small)] text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none focus:border-[var(--color-primary-strong)]"
                style={{ boxShadow: 'var(--shadow-100)' }}
              />
              <FieldHighlight isHighlighted={filledFields.has('internalJobCode')} />
              {filledFields.has('internalJobCode') && internalJobCode && (
                <UndoLink onClick={() => undoField('internalJobCode', setInternalJobCode)} />
              )}
              <FieldExplanation fieldName="internalJobCode" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && suggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8" onClick={() => setShowReviewModal(false)}>
          <div className="bg-[var(--surface-neutral-white)] rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-neutral-x-weak)]">
              <h3 className="text-[20px] font-semibold text-[var(--color-primary-strong)]">
                AI-Filled Fields
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-strong)]"
              >
                <Icon name="xmark" size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Job Status</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.jobStatus}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Hiring Lead</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.hiringLead}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Department</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.department}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Employment Type</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.employmentType}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Experience Level</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.minimumExperience}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Compensation</div>
                  <div className="text-[15px] text-[var(--text-neutral-x-strong)]">{suggestion.compensation}</div>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-[var(--text-neutral-medium)] mb-1">Job Description</div>
                <pre className="whitespace-pre-wrap font-sans text-[14px] leading-[22px] text-[var(--text-neutral-strong)] bg-[var(--surface-neutral-xx-weak)] p-4 rounded">
                  {suggestion.jobDescription}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
