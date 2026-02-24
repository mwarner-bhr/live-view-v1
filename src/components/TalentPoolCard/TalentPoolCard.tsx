import { Icon, type IconName } from '../Icon';

interface TalentPoolCardProps {
  icon: IconName;
  title: string;
  candidatesCount: number;
  onClick?: () => void;
}

export function TalentPoolCard({ icon, title, candidatesCount, onClick }: TalentPoolCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-small)] p-5 flex flex-col gap-4 items-start w-[224px] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors cursor-pointer text-left"
      style={{ boxShadow: '1px 1px 0px 2px rgba(56, 49, 47, 0.03)' }}
    >
      {/* Icon box */}
      <div className="w-12 h-12 bg-[var(--surface-neutral-x-weak)] rounded-[12px] flex items-center justify-center">
        <Icon name={icon} size={24} className="text-[var(--color-primary-strong)]" />
      </div>

      {/* Content */}
      <div className="w-full">
        <p className="text-[18px] font-semibold leading-[26px] text-[var(--color-primary-strong)] mb-0">
          {title}
        </p>
        <p className="text-[13px] font-normal leading-[19px] text-[var(--text-neutral-strong)] mt-0">
          {candidatesCount} Candidate{candidatesCount !== 1 ? 's' : ''}
        </p>
      </div>
    </button>
  );
}

export default TalentPoolCard;
