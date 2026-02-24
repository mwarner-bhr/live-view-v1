import { useState } from 'react';
import { Icon } from '../../components';
import { useTheme } from '../../contexts/ThemeContext';
import { AutocompleteDropdown } from './variations/AutocompleteDropdown';
import { GhostTextSuggestions } from './variations/GhostTextSuggestions';
import { InlineSuggestionChips } from './variations/InlineSuggestionChips';
import { SidePanelReview } from './variations/SidePanelReview';
import { ProgressiveFillShimmer } from './variations/ProgressiveFillShimmer';
import { PreviewCard } from './variations/PreviewCard';
import { ConversationalConfirmation } from './variations/ConversationalConfirmation';
import { InlineContextual } from './variations/InlineContextual';

type Variation = 'autocomplete' | 'ghost' | 'chips' | 'panel' | 'progressive' | 'preview-card' | 'conversational' | 'contextual';

const variations = [
  { id: 'autocomplete' as Variation, label: 'Autocomplete Dropdown', description: 'Select from dropdown to fill all fields' },
  { id: 'ghost' as Variation, label: 'Ghost Text', description: 'Preview suggestions as ghost text in fields' },
  { id: 'chips' as Variation, label: 'Suggestion Chips', description: 'Accept individual field chips' },
  { id: 'panel' as Variation, label: 'Side Panel', description: 'Review all suggestions in panel' },
  { id: 'progressive' as Variation, label: 'Progressive Fill', description: 'Animated field-by-field population' },
  { id: 'preview-card' as Variation, label: 'Preview Card ⭐', description: 'Preview all before applying with granular control' },
  { id: 'conversational' as Variation, label: 'Conversational ⭐', description: 'AI asks permission then highlights changes' },
  { id: 'contextual' as Variation, label: 'Inline Contextual ⭐', description: 'Tab to accept field-by-field suggestions' },
];

export function JobAIPrototype() {
  const [activeVariation, setActiveVariation] = useState<Variation>('autocomplete');
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-full bg-[var(--surface-neutral-xx-weak)] flex flex-col">
      {/* Header */}
      <div className="bg-[var(--surface-neutral-white)] border-b border-[var(--border-neutral-x-weak)] px-10 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-['Fields'] text-[44px] font-bold leading-[52px] text-[var(--color-primary-strong)]">
              AI Job Description - Prototype
            </h1>
            <p className="text-[15px] text-[var(--text-neutral-medium)] mt-2">
              Exploring different patterns for AI-assisted job posting creation
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[var(--text-neutral-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
              aria-label="Toggle theme"
            >
              <Icon name={isDark ? 'sun' : 'moon'} size={16} />
              {isDark ? 'Light' : 'Dark'}
            </button>
            <a
              href="/hiring/new"
              className="flex items-center gap-2 text-[15px] font-medium text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-strong)] transition-colors"
            >
              <Icon name="arrow-left" size={16} />
              Back to normal flow
            </a>
          </div>
        </div>

        {/* Try These Suggestions Note */}
        <div className="flex items-start gap-3 px-4 py-3 bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-x-weak)] rounded-lg mt-4">
          <Icon name="circle-info" size={16} className="text-[var(--color-primary-strong)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold text-[var(--text-neutral-x-strong)] mb-1">
              Try these job titles:
            </div>
            <div className="text-[13px] text-[var(--text-neutral-medium)]">
              Product Designer I • Product Designer II • Senior Software Engineer • Marketing Manager
            </div>
          </div>
        </div>

        {/* Variation Tabs */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {variations.map((variation) => (
            <button
              key={variation.id}
              onClick={() => setActiveVariation(variation.id)}
              className={`
                px-3 py-2.5 rounded-lg transition-all text-left
                ${activeVariation === variation.id
                  ? 'bg-[var(--color-primary-strong)] text-white'
                  : 'bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] hover:border-[var(--color-primary-strong)]'
                }
              `}
            >
              <div className={`font-semibold text-[14px] ${activeVariation === variation.id ? 'text-white' : 'text-[var(--text-neutral-x-strong)]'}`}>
                {variation.label}
              </div>
              <div className={`text-[12px] mt-0.5 line-clamp-2 ${activeVariation === variation.id ? 'text-white/90' : 'text-[var(--text-neutral-medium)]'}`}>
                {variation.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {activeVariation === 'autocomplete' && <AutocompleteDropdown />}
        {activeVariation === 'ghost' && <GhostTextSuggestions />}
        {activeVariation === 'chips' && <InlineSuggestionChips />}
        {activeVariation === 'panel' && <SidePanelReview />}
        {activeVariation === 'progressive' && <ProgressiveFillShimmer />}
        {activeVariation === 'preview-card' && <PreviewCard />}
        {activeVariation === 'conversational' && <ConversationalConfirmation />}
        {activeVariation === 'contextual' && <InlineContextual />}
      </div>
    </div>
  );
}

export default JobAIPrototype;
