import { useState } from 'react';
import { Icon } from '../../components/Icon';

type ReflowOption = 'none' | 'fade-partial' | 'fade-full' | 'blur' | 'fixed-width';

export function TextReflowDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reflowOption, setReflowOption] = useState<ReflowOption>('none');
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleExpand = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    // Animation takes 900ms (normal speed for testing)
    setTimeout(() => setIsAnimating(false), 900);
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--surface-neutral-white)]">
      {/* Controls */}
      <div className="shrink-0 p-6 border-b-2 border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] relative z-50">
        <h1 className="text-[20px] font-bold text-[var(--text-neutral-xx-strong)] mb-4">
          Text Reflow Handling Demo
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[14px] font-semibold text-[var(--text-neutral-strong)]">
            Reflow Option:
          </span>
          {[
            { value: 'none', label: 'None (Current)' },
            { value: 'fade-partial', label: 'Fade 40%' },
            { value: 'fade-full', label: 'Fade Out/In' },
            { value: 'blur', label: 'Motion Blur' },
            { value: 'fixed-width', label: 'Fixed Width' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setReflowOption(value as ReflowOption)}
              className={`px-6 py-3 rounded-full text-[14px] font-medium transition-colors border-2 ${
                reflowOption === value
                  ? 'bg-[var(--color-primary-strong)] text-white border-[var(--color-primary-strong)]'
                  : 'bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-strong)] border-[var(--border-neutral-medium)] hover:bg-[var(--surface-neutral-x-weak)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[var(--text-neutral-medium)]">
          Click the expand icon to see how text reflow is handled during the transition.
          (Using Expand transition at normal speed)
        </p>
      </div>

      {/* Demo Area */}
      <div className="flex-1 relative overflow-hidden bg-[var(--surface-neutral-x-weak)]">
        {/* Simulated App Background */}
        <div className="absolute inset-0 p-8">
          <div className="h-full bg-[var(--surface-neutral-white)] rounded-lg shadow-sm p-6">
            <h2 className="text-[20px] font-semibold text-[var(--text-neutral-xx-strong)] mb-4">
              Main App Content
            </h2>
            <p className="text-[var(--text-neutral-medium)]">
              Watch the text in the chat messages as the panel expands/collapses.
            </p>
          </div>
        </div>

        {/* Expand Transition with Different Reflow Options */}
        <ExpandTransition
          isExpanded={isExpanded}
          onToggle={toggleExpand}
          reflowOption={reflowOption}
          isAnimating={isAnimating}
        />
      </div>
    </div>
  );
}

interface ExpandTransitionProps {
  isExpanded: boolean;
  onToggle: () => void;
  reflowOption: ReflowOption;
  isAnimating: boolean;
}

function ExpandTransition({ isExpanded, onToggle, reflowOption, isAnimating }: ExpandTransitionProps) {
  // Determine content styles based on reflow option
  const getContentStyles = () => {
    if (!isAnimating) return {};

    switch (reflowOption) {
      case 'fade-partial':
        return { opacity: 0.4 };
      case 'fade-full':
        return { opacity: 0 };
      case 'blur':
        return { filter: 'blur(2px)' };
      default:
        return {};
    }
  };

  const contentTransitionClass = isAnimating
    ? 'transition-all duration-[450ms] ease-out'
    : '';

  return (
    <div
      className="absolute transition-all duration-[900ms] ease-out"
      style={{
        top: isExpanded ? 0 : 16,
        bottom: isExpanded ? 0 : 16,
        right: 16,
        width: isExpanded ? 'calc(100% - 16px)' : 380,
      }}
    >
      <div
        className={`h-full bg-[var(--surface-neutral-white)] shadow-xl flex overflow-hidden transition-all duration-[900ms] ease-out ${
          isExpanded ? 'rounded-none' : 'rounded-[20px]'
        }`}
      >
        {/* Sidebar - only visible when expanded */}
        <div
          className={`shrink-0 bg-[var(--surface-neutral-white)] border-r border-[var(--border-neutral-xx-weak)] transition-all duration-[900ms] ease-out overflow-hidden ${
            isExpanded ? 'w-[280px] opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <SidebarContent onToggle={onToggle} showCollapse={isExpanded} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header - only when not expanded */}
          {!isExpanded && (
            <div className="shrink-0 flex items-center justify-between px-5 py-4 bg-[var(--surface-neutral-xx-weak)]">
              <span className="text-[16px] font-medium text-[var(--text-neutral-x-strong)]">
                Employee Onboarding
              </span>
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
              >
                <Icon name="expand" size={16} className="text-[var(--icon-neutral-x-strong)]" />
              </button>
            </div>
          )}

          {/* Chat Content */}
          <ChatContentArea
            reflowOption={reflowOption}
            contentStyles={getContentStyles()}
            contentTransitionClass={contentTransitionClass}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ onToggle, showCollapse }: { onToggle: () => void; showCollapse: boolean }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-md">
          <Icon name="sparkles" size={14} className="text-white" />
        </div>
        {showCollapse && (
          <div className="flex items-center gap-2">
            <button
              onClick={onToggle}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            >
              <Icon name="down-left-and-up-right-to-center" size={16} className="text-[var(--icon-neutral-x-strong)]" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
              <Icon name="xmark" size={16} className="text-[var(--icon-neutral-x-strong)]" />
            </button>
          </div>
        )}
      </div>

      {/* New Chat */}
      <div className="px-4 py-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-xx-small)]">
          <Icon name="pen-to-square" size={16} className="text-[var(--icon-neutral-x-strong)]" />
          New Chat
        </button>
      </div>

      {/* Chats */}
      <div className="px-5 py-2">
        <span className="text-[13px] font-semibold text-[var(--text-neutral-medium)]">Chats</span>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        {['Employee Onboarding', 'PTO Policy Updates', 'Benefits Enrollment'].map((title, i) => (
          <button
            key={title}
            className={`w-full text-left px-4 py-3 rounded-[var(--radius-xx-small)] text-[15px] truncate ${
              i === 0
                ? 'bg-[var(--surface-neutral-x-weak)] font-medium text-[var(--text-neutral-x-strong)]'
                : 'text-[var(--text-neutral-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
            }`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ChatContentAreaProps {
  reflowOption: ReflowOption;
  contentStyles: React.CSSProperties;
  contentTransitionClass: string;
}

function ChatContentArea({ reflowOption, contentStyles, contentTransitionClass }: ChatContentAreaProps) {
  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4">
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className={`max-w-[600px] mx-auto flex flex-col gap-4 ${
              reflowOption === 'fixed-width' ? 'w-[600px]' : ''
            }`}
          >
            {/* User Message */}
            <div className="flex justify-end">
              <div
                className={`bg-[var(--surface-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] max-w-[80%] ${contentTransitionClass}`}
                style={contentStyles}
              >
                <p className="text-[15px] text-[var(--text-neutral-x-strong)]">
                  How can we improve our employee onboarding process to make it more effective and engaging for new hires?
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-full">
                  <Icon name="sparkles" size={12} className="text-white" />
                </div>
                <span className="text-[13px] font-semibold text-[var(--text-neutral-medium)]">
                  BambooHR Assistant
                </span>
              </div>
              <div className={`pl-8 ${contentTransitionClass}`} style={contentStyles}>
                <p className="text-[15px] text-[var(--text-neutral-xx-strong)]">
                  Here are several key improvements you can make to enhance your employee onboarding experience:
                </p>
                <ul className="mt-2 text-[15px] text-[var(--text-neutral-xx-strong)] list-disc pl-5 space-y-1">
                  <li>Personalize the onboarding journey based on role and department to make it more relevant</li>
                  <li>Streamline administrative tasks with digital forms and automated workflows</li>
                  <li>Strengthen human connection through buddy programs and team introductions</li>
                  <li>Provide clear milestones and progress tracking so new hires know what to expect</li>
                  <li>Create interactive training modules instead of lengthy documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="px-6 py-4">
          <div className="max-w-[600px] mx-auto flex items-center gap-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-weak)] rounded-full px-6 py-3 shadow-sm">
            <span className="flex-1 text-[15px] text-[var(--text-neutral-medium)]">Ask Anything</span>
            <Icon name="paper-plane" size={20} className="text-[var(--icon-neutral-medium)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextReflowDemo;
