import { Button, TalentPoolCard } from '../../components';
import { talentPools } from '../../data/talentPools';

export function TalentPoolsTabContent() {
  return (
    <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden" style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}>
      {/* Actions Bar */}
      <div className="px-8 py-5">
        <Button icon="circle-plus" variant="standard">
          New Talent Pool
        </Button>
      </div>

      {/* Talent Pool Cards */}
      <div className="px-8 pb-6">
        <div className="flex items-start gap-6">
          {talentPools.map((pool) => (
            <TalentPoolCard
              key={pool.id}
              icon={pool.icon}
              title={pool.title}
              candidatesCount={pool.candidatesCount}
              onClick={() => console.log(`Clicked ${pool.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TalentPoolsTabContent;
