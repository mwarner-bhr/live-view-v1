import { useState } from 'react';
import { Icon } from '../../components/Icon';

type TransitionStyle = 'expand' | 'slide-handoff' | 'slide-fade' | 'zoom' | 'crossfade';

export function ChatTransitionsDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('expand');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="h-screen flex flex-col bg-[var(--surface-neutral-white)]">
      {/* Controls */}
      <div className="shrink-0 p-6 border-b-2 border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] relative z-50">
        <h1 className="text-[20px] font-bold text-[var(--text-neutral-xx-strong)] mb-4">
          Chat Transition Demo
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[14px] font-semibold text-[var(--text-neutral-strong)]">
            Transition Style:
          </span>
          {(['expand', 'slide-handoff', 'slide-fade', 'zoom', 'crossfade'] as TransitionStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setTransitionStyle(style)}
              className={`px-6 py-3 rounded-full text-[14px] font-medium transition-colors border-2 ${
                transitionStyle === style
                  ? 'bg-[var(--color-primary-strong)] text-white border-[var(--color-primary-strong)]'
                  : 'bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-strong)] border-[var(--border-neutral-medium)] hover:bg-[var(--surface-neutral-x-weak)]'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[var(--text-neutral-medium)]">
          Click the expand icon in the chat panel (bottom right) to see the transition to full-screen.
          Then click the collapse icon to return.
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
              This represents your main application. The chat panel appears on the right.
            </p>
          </div>
        </div>

        {/* Transition Style: Expand/Contract */}
        {transitionStyle === 'expand' && (
          <ExpandTransition isExpanded={isExpanded} onToggle={toggleExpand} />
        )}

        {/* Transition Style: Slide Handoff */}
        {transitionStyle === 'slide-handoff' && (
          <SlideHandoffTransition isExpanded={isExpanded} onToggle={toggleExpand} />
        )}

        {/* Transition Style: Slide Fade */}
        {transitionStyle === 'slide-fade' && (
          <SlideFadeTransition isExpanded={isExpanded} onToggle={toggleExpand} />
        )}

        {/* Transition Style: Zoom */}
        {transitionStyle === 'zoom' && (
          <ZoomTransition isExpanded={isExpanded} onToggle={toggleExpand} />
        )}

        {/* Transition Style: Crossfade */}
        {transitionStyle === 'crossfade' && (
          <CrossfadeTransition isExpanded={isExpanded} onToggle={toggleExpand} />
        )}
      </div>
    </div>
  );
}

// ============================================
// Transition Style 1: Expand/Contract
// ============================================
function ExpandTransition({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      className="absolute"
      style={{
        top: isExpanded ? 0 : 16,
        bottom: isExpanded ? 0 : 16,
        right: 16,
        width: isExpanded ? 'calc(100% - 16px)' : 380,
        transition: 'all 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <div
        className={`h-full bg-[var(--surface-neutral-white)] shadow-xl flex overflow-hidden ${
          isExpanded ? 'rounded-none' : 'rounded-[20px]'
        }`}
        style={{
          transition: 'border-radius 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        {/* Sidebar - only visible when expanded */}
        <div
          className={`shrink-0 bg-[var(--surface-neutral-white)] border-r border-[var(--border-neutral-xx-weak)] overflow-hidden ${
            isExpanded ? 'w-[280px] opacity-100' : 'w-0 opacity-0'
          }`}
          style={{
            transition: 'width 850ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
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
          <ChatContentArea />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Transition Style 2: Slide Handoff
// Panel exits LEFT, Full-screen enters from RIGHT
// ============================================
function SlideHandoffTransition({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Slide-in Panel - exits to the LEFT */}
      <div
        className={`absolute top-4 bottom-4 right-4 w-[380px] ${
          isExpanded ? '-translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{
          transition: 'transform 850ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] rounded-[20px] shadow-xl flex flex-col overflow-hidden">
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
          <ChatContentArea />
        </div>
      </div>

      {/* Full Screen View - enters from the RIGHT */}
      <div
        className={`absolute inset-0 ${
          isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'
        }`}
        style={{
          transition: 'transform 850ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] flex overflow-hidden">
          <div className="w-[280px] shrink-0 bg-[var(--surface-neutral-white)]">
            <SidebarContent onToggle={onToggle} showCollapse={true} />
          </div>
          <div className="flex-1">
            <ChatContentArea />
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Transition Style 3: Slide Fade
// Panel fades in place, Full-screen slides over from RIGHT
// ============================================
function SlideFadeTransition({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Slide-in Panel - stays in place but fades out */}
      <div
        className={`absolute top-4 bottom-4 right-4 w-[380px] ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          transition: 'opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] rounded-[20px] shadow-xl flex flex-col overflow-hidden">
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
          <ChatContentArea />
        </div>
      </div>

      {/* Full Screen View - slides in from the RIGHT */}
      <div
        className={`absolute inset-0 ${
          isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'transform 850ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] flex overflow-hidden">
          <div className="w-[280px] shrink-0 bg-[var(--surface-neutral-white)]">
            <SidebarContent onToggle={onToggle} showCollapse={true} />
          </div>
          <div className="flex-1">
            <ChatContentArea />
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Transition Style 3: Zoom
// ============================================
function ZoomTransition({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      className="absolute"
      style={{
        top: isExpanded ? 0 : 16,
        bottom: isExpanded ? 0 : 16,
        right: 16,
        width: isExpanded ? 'calc(100% - 16px)' : 380,
        transformOrigin: 'right center',
        transform: isExpanded ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <div
        className={`h-full bg-[var(--surface-neutral-white)] shadow-xl flex overflow-hidden ${
          isExpanded ? 'rounded-none' : 'rounded-[20px]'
        }`}
        style={{
          transition: 'border-radius 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        {/* Sidebar */}
        <div
          className={`shrink-0 bg-[var(--surface-neutral-white)] border-r border-[var(--border-neutral-xx-weak)] overflow-hidden ${
            isExpanded ? 'w-[280px] opacity-100' : 'w-0 opacity-0'
          }`}
          style={{
            transition: 'width 850ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
        >
          <SidebarContent onToggle={onToggle} showCollapse={isExpanded} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
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
          <ChatContentArea />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Transition Style 4: Crossfade
// ============================================
function CrossfadeTransition({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Slide-in Panel */}
      <div
        className={`absolute top-4 bottom-4 right-4 w-[380px] ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          transition: 'opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] rounded-[20px] shadow-xl flex flex-col overflow-hidden">
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
          <ChatContentArea />
        </div>
      </div>

      {/* Full Screen View */}
      <div
        className={`absolute inset-0 ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'opacity 850ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div className="h-full bg-[var(--surface-neutral-white)] flex overflow-hidden">
          <div className="w-[280px] shrink-0 bg-[var(--surface-neutral-white)]">
            <SidebarContent onToggle={onToggle} showCollapse={true} />
          </div>
          <div className="flex-1">
            <ChatContentArea />
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Shared Components
// ============================================
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
        {['Employee Onboarding', 'PTO Policy Updates', 'Benefits Enrollment', 'Performance Reviews'].map((title, i) => (
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

function ChatContentArea() {
  return (
    <div className="flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-4">
      <div className="flex-1 flex flex-col bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[600px] mx-auto flex flex-col gap-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-[var(--surface-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] max-w-[80%]">
                <p className="text-[15px] text-[var(--text-neutral-x-strong)]">
                  How can we improve employee onboarding?
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
                  Here are key improvements for onboarding:
                </p>
                <ul className="mt-2 text-[15px] text-[var(--text-neutral-xx-strong)] list-disc pl-5">
                  <li>Personalize the onboarding journey</li>
                  <li>Streamline administrative tasks</li>
                  <li>Strengthen human connection</li>
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

export default ChatTransitionsDemo;
