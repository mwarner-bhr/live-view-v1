import { Icon, RatingCircles } from '../index';

interface Question {
  question: string;
  answer: string;
}

interface RatingQuestion {
  question: string;
  rating: number;
  answer: string;
}

interface AssessmentBlockProps {
  selfAssessment: {
    completedBy: string;
    completedDate: string;
    questions: Question[];
  };
  managerAssessment: {
    completedBy: string;
    completedDate: string;
    hiddenQuestions: RatingQuestion[];
    visibleQuestions: Question[];
  };
}

export function AssessmentBlock({ selfAssessment, managerAssessment }: AssessmentBlockProps) {
  return (
    <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] p-8 relative">
      {/* Two Column Layout */}
      <div className="flex gap-8">
        {/* Left Column: Self Assessment */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            <Icon name="compass" size={20} className="text-[var(--color-primary-strong)] mt-0.5" />
            <div className="flex-1">
              <h3
                className="text-[18px] font-semibold text-[var(--color-primary-strong)] leading-[26px]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Self Assessment
              </h3>
              <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
                Completed: {selfAssessment.completedDate} by {selfAssessment.completedBy}
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {selfAssessment.questions.map((q, index) => (
              <div key={index}>
                <p className="text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-x-strong)] mb-2">
                  {q.question}
                </p>
                <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-[var(--border-neutral-weak)] shrink-0" />

        {/* Right Column: Manager Assessment */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            <Icon name="compass" size={20} className="text-[var(--color-primary-strong)] mt-0.5" />
            <div className="flex-1">
              <h3
                className="text-[18px] font-semibold text-[var(--color-primary-strong)] leading-[26px]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Manager Assessment
              </h3>
              <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
                Completed: {managerAssessment.completedDate} by {managerAssessment.completedBy}
              </p>
            </div>
          </div>

          {/* Hidden Section */}
          <div className="mb-6">
            {/* Visibility Indicator */}
            <div className="flex items-start gap-2 mb-4">
              <Icon name="eye-slash" size={16} className="text-[var(--icon-neutral-strong)] mt-0.5" />
              <p className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
                Jess will <span className="font-bold">NOT</span> be able to see the following:
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[var(--border-neutral-x-weak)] mb-4" />

            {/* Hidden Questions */}
            <div className="space-y-6">
              {managerAssessment.hiddenQuestions.map((q, index) => (
                <div key={index}>
                  <p className="text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-x-strong)] mb-2">
                    {q.question}
                  </p>
                  <RatingCircles selectedRating={q.rating} className="mb-2" />
                  <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visible Section */}
          <div>
            {/* Divider */}
            <div className="w-full h-px bg-[var(--border-neutral-x-weak)] mb-4" />

            {/* Visibility Indicator */}
            <div className="flex items-start gap-2 mb-4">
              <Icon name="eye" size={16} className="text-[var(--icon-neutral-strong)] mt-0.5" />
              <p className="text-[14px] leading-[20px] text-[var(--text-neutral-medium)]">
                Jess <span className="font-bold">will</span> be able to see the following:
              </p>
            </div>

            {/* Visible Questions */}
            <div className="space-y-6">
              {managerAssessment.visibleQuestions.map((q, index) => (
                <div key={index}>
                  <p className="text-[15px] font-semibold leading-[22px] text-[var(--text-neutral-x-strong)] mb-2">
                    {q.question}
                  </p>
                  <p className="text-[14px] leading-[20px] text-[var(--text-neutral-strong)]">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentBlock;
