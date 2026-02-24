import { useState } from 'react';
import { Icon } from '../../components/Icon';

type ReflowOption = 'none' | 'no-reflow' | 'slide-away' | 'scale' | 'delayed-reveal' | 'shell-only' | 'crossfade' | 'settled-reflow';

export function TextReflowDemo2() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reflowOption, setReflowOption] = useState<ReflowOption>('none');
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleExpand = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    // Animation takes 850ms
    setTimeout(() => setIsAnimating(false), 850);
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--surface-neutral-white)]">
      {/* Controls */}
      <div className="shrink-0 p-6 border-b-2 border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] relative z-50">
        <h1 className="text-[20px] font-bold text-[var(--text-neutral-xx-strong)] mb-4">
          Text Reflow Solutions Demo
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[14px] font-semibold text-[var(--text-neutral-strong)]">
            Solution:
          </span>
          {[
            { value: 'none', label: 'None (Current)' },
            { value: 'no-reflow', label: 'Never Reflow' },
            { value: 'slide-away', label: 'Slide Away/Back' },
            { value: 'scale', label: 'Scale Transform' },
            { value: 'delayed-reveal', label: 'Delayed Reveal' },
            { value: 'shell-only', label: 'Shell Only' },
            { value: 'crossfade', label: 'Crossfade Layouts' },
            { value: 'settled-reflow', label: 'Settled Reflow' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setReflowOption(value as ReflowOption)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors border-2 ${
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
          Click the expand icon to see how each solution handles text during the transition.
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
  return (
    <div
      className="absolute transition-all duration-[850ms] cubic-bezier(0.25, 0.8, 0.25, 1)"
      style={{
        top: isExpanded ? 0 : 16,
        bottom: isExpanded ? 0 : 16,
        right: 16,
        width: isExpanded ? 'calc(100% - 16px)' : 380,
      }}
    >
      <div
        className={`h-full bg-[var(--surface-neutral-white)] shadow-xl flex overflow-hidden transition-all duration-[850ms] cubic-bezier(0.25, 0.8, 0.25, 1) ${
          isExpanded ? 'rounded-none' : 'rounded-[20px]'
        }`}
      >
        {/* Sidebar - only visible when expanded */}
        <div
          className={`shrink-0 bg-[var(--surface-neutral-white)] border-r border-[var(--border-neutral-xx-weak)] transition-all duration-[850ms] cubic-bezier(0.25, 0.8, 0.25, 1) overflow-hidden ${
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

          {/* Chat Content with different reflow handling */}
          <ChatContentArea
            reflowOption={reflowOption}
            isAnimating={isAnimating}
            isExpanded={isExpanded}
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
  isAnimating: boolean;
  isExpanded: boolean;
}

function ChatContentArea({ reflowOption, isAnimating, isExpanded }: ChatContentAreaProps) {
  // Get styles based on reflow option
  const getContentWrapperClass = () => {
    if (reflowOption === 'no-reflow') {
      return 'w-[600px] mx-auto'; // Fixed width, never reflows
    }
    if (reflowOption === 'shell-only' && isAnimating) {
      return isExpanded ? 'w-[600px] mx-auto' : 'max-w-[600px] mx-auto';
    }
    return 'max-w-[600px] mx-auto';
  };

  const getContentTransform = () => {
    if (reflowOption === 'slide-away' && isAnimating) {
      return { transform: 'translateX(-100%)', opacity: 0 };
    }
    if (reflowOption === 'scale' && isAnimating) {
      return { transform: 'scale(0.95)' };
    }
    if (reflowOption === 'delayed-reveal' && isAnimating) {
      return { opacity: 0 };
    }
    return {};
  };

  const contentTransitionClass = isAnimating
    ? 'transition-all duration-[425ms] cubic-bezier(0.25, 0.8, 0.25, 1)'
    : 'transition-all duration-[425ms] cubic-bezier(0.25, 0.8, 0.25, 1)';

  // Settled Reflow: Hold width for first half, then naturally reflow during second half
  if (reflowOption === 'settled-reflow') {
    // Panel animation: 850ms total
    // Text delay: 425ms (50%), Text duration: 425ms
    // Result: text reflows from 425ms-850ms, finishing with the panel animation
    const targetWidth = isExpanded ? 'max-w-[600px]' : 'max-w-[320px]';

    return (
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4">
        <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div
              className={`${targetWidth} mx-auto`}
              style={{
                transition: 'max-width 425ms cubic-bezier(0.25, 0.8, 0.25, 1) 425ms', // duration, easing, delay
              }}
            >
              <MessageContent />
            </div>
          </div>
          <InputArea />
        </div>
      </div>
    );
  }

  // For crossfade option, render both layouts
  if (reflowOption === 'crossfade') {
    return (
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4 relative">
        <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
          {/* Narrow layout */}
          <div
            className={`absolute inset-0 transition-opacity duration-[425ms] ${
              isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <MessageContent maxWidth="400px" />
          </div>

          {/* Wide layout */}
          <div
            className={`absolute inset-0 transition-opacity duration-[425ms] ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <MessageContent maxWidth="600px" />
          </div>
        </div>
      </div>
    );
  }

  // Shell-only: content "snaps" at end
  if (reflowOption === 'shell-only') {
    return (
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4">
        <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className={getContentWrapperClass()}>
              <MessageContent />
            </div>
          </div>
          <InputArea />
        </div>
      </div>
    );
  }

  // All other options
  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4">
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className={`${getContentWrapperClass()} ${contentTransitionClass}`}
            style={getContentTransform()}
          >
            <MessageContent />
          </div>
        </div>
        <InputArea />
      </div>
    </div>
  );
}

function MessageContent({ maxWidth }: { maxWidth?: string }) {
  return (
    <div className="flex flex-col gap-4" style={{ maxWidth }}>
      {/* User Message */}
      <div className="flex justify-end">
        <div className="bg-[var(--surface-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] max-w-[80%]">
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
        <div className="pl-8">
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
  );
}

function InputArea() {
  return (
    <div className="px-6 py-4">
      <div className="max-w-[600px] mx-auto flex items-center gap-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-weak)] rounded-full px-6 py-3 shadow-sm">
        <span className="flex-1 text-[15px] text-[var(--text-neutral-medium)]">Ask Anything</span>
        <Icon name="paper-plane" size={20} className="text-[var(--icon-neutral-medium)]" />
      </div>
    </div>
  );
}

export default TextReflowDemo2;
