import { Button } from '../../components';

interface WizardStep {
  id: string;
  label: string;
  completed: boolean;
  active: boolean;
}

interface JobWizardSidebarProps {
  steps: WizardStep[];
  onNextStep: () => void;
  onSaveAndFinishLater: () => void;
  onCancel: () => void;
}

export function JobWizardSidebar({
  steps,
  onNextStep,
  onSaveAndFinishLater,
  onCancel,
}: JobWizardSidebarProps) {
  return (
    <div className="flex flex-col gap-6 w-[304px] shrink-0">
      {/* Steps */}
      <div className="flex flex-col gap-1">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`
              flex items-center gap-4 p-4 rounded-[var(--radius-small)]
              transition-colors
              ${step.active
                ? 'bg-[var(--surface-neutral-white)]'
                : ''
              }
            `}
            style={step.active ? { boxShadow: 'var(--shadow-300)' } : undefined}
          >
            <div className="flex items-center justify-center w-8 h-8 shrink-0">
              {step.active ? (
                // Green outline circle for active step
                <div
                  className="w-8 h-8 rounded-full border-[3px] border-[var(--color-primary-strong)]"
                />
              ) : (
                // Gray outline circle for inactive steps
                <div
                  className="w-8 h-8 rounded-full border-[3px] border-[var(--icon-neutral-x-strong)]"
                />
              )}
            </div>
            <span
              className={`
                flex-1 text-[16px] leading-[24px]
                ${step.active
                  ? 'font-bold text-[var(--color-primary-strong)]'
                  : 'font-medium text-[var(--text-neutral-strong)]'
                }
              `}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-neutral-x-weak)]" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-col gap-4">
          <Button variant="primary" onClick={onNextStep} className="w-full">
            Next Step
          </Button>
          <Button variant="standard" onClick={onSaveAndFinishLater} className="w-full">
            Save & Finish Later
          </Button>
        </div>
        <button
          onClick={onCancel}
          className="h-10 px-5 text-[15px] font-semibold text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default JobWizardSidebar;
