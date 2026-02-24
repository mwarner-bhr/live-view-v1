interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface GoalCardProps {
  goalText: string;
  progress: number;
  dueDate: string;
  collaborators: Collaborator[];
}

export function GoalCard({ goalText, progress, dueDate, collaborators }: GoalCardProps) {
  const percentage = Math.min(Math.max(progress, 0), 100);
  const displayedCollaborators = collaborators.slice(0, 2);
  const remainingCount = Math.max(collaborators.length - 2, 0);

  return (
    <div className="bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-small)] p-6 hover:border-[var(--border-neutral-weak)] transition-colors cursor-pointer">
      {/* Goal Text */}
      <p className="text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)] mb-6">
        {goalText}
      </p>

      {/* Progress Section */}
      <div className="mb-4">
        {/* Progress Percentage */}
        <div className="text-[22px] font-semibold text-[var(--color-primary-strong)] mb-2" style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '30px' }}>
          {percentage}%{' '}
          <span className="text-[15px] font-normal text-[var(--text-neutral-medium)]" style={{ fontFamily: 'system-ui, sans-serif' }}>
            complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-[var(--surface-neutral-xx-weak)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5CA55A] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Due Date and Collaborators */}
      <div className="flex items-center justify-between">
        {/* Due Date */}
        <div className="text-[13px] text-[var(--text-neutral-medium)]">
          <span className="font-semibold">Due:</span> {dueDate}
        </div>

        {/* Collaborator Avatars */}
        <div className="flex items-center -space-x-2">
          {displayedCollaborators.map((collaborator) => (
            <img
              key={collaborator.id}
              src={collaborator.avatar}
              alt={collaborator.name}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--surface-neutral-weak)] flex items-center justify-center text-[13px] font-medium text-[var(--text-neutral-strong)]">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
