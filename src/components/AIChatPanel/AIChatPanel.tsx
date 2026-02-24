import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { recentConversations } from '../../data/chatData';
import type { ChatConversation } from '../../data/chatData';
import MarkdownContent from '../MarkdownContent';

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export function AIChatPanel({ isOpen, onClose, isExpanded, onExpandChange }: AIChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation>(recentConversations[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const messages = selectedConversation.messages;
  const title = selectedConversation.title;

  // Filter conversations based on search
  const filteredConversations = recentConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExpand = () => {
    onExpandChange(true);
  };

  const handleCollapse = () => {
    onExpandChange(false);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // In a real app, this would send the message
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  };

  // Don't render if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed z-50"
      style={{
        top: isExpanded ? 0 : 106,
        bottom: isExpanded ? 0 : 40,
        right: 16,
        width: isExpanded ? 'calc(100% - 32px)' : 383,
        transition: 'all 700ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <div
        className="w-full h-full bg-[var(--surface-neutral-white)] shadow-xl flex overflow-hidden"
        style={{
          borderRadius: isExpanded ? 0 : 20,
          transition: 'border-radius 700ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        {/* Sidebar - only visible when expanded */}
        <div
          className="shrink-0 bg-[var(--surface-neutral-white)] flex flex-col overflow-hidden"
          style={{
            width: isExpanded ? 280 : 0,
            opacity: isExpanded ? 1 : 0,
            transition: 'width 700ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 700ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-md">
              <Icon name="sparkles" size={14} className="text-white" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCollapse}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                aria-label="Collapse to panel"
              >
                <Icon name="down-left-and-up-right-to-center" size={16} className="text-[var(--icon-neutral-x-strong)]" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                aria-label="Close chat"
              >
                <Icon name="xmark" size={16} className="text-[var(--icon-neutral-x-strong)]" />
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="px-4 py-3">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-xx-small)] transition-colors"
            >
              <Icon name="pen-to-square" size={16} className="text-[var(--icon-neutral-x-strong)]" />
              New Chat
            </button>
          </div>

          {/* Chats Section Header */}
          <div className="px-5 py-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[var(--text-neutral-medium)]">
              Chats
            </span>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
              aria-label="Search chats"
            >
              <Icon name="magnifying-glass" size={14} className="text-[var(--icon-neutral-strong)]" />
            </button>
          </div>

          {/* Search Input */}
          {isSearchOpen && (
            <div className="px-4 pb-2">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-[14px] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-weak)] rounded-[var(--radius-xx-small)] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none focus:border-[var(--color-primary-strong)]"
                autoFocus
              />
            </div>
          )}

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto px-2">
            {filteredConversations.map((conversation) => {
              const isActive = conversation.id === selectedConversation.id;
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`
                    w-full text-left px-4 py-3 rounded-[var(--radius-xx-small)]
                    text-[15px] text-[var(--text-neutral-x-strong)]
                    transition-colors duration-150
                    truncate
                    ${isActive
                      ? 'bg-[var(--surface-neutral-x-weak)] font-medium'
                      : 'hover:bg-[var(--surface-neutral-xx-weak)]'
                    }
                  `}
                >
                  {conversation.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Panel Header - only when not expanded */}
          {!isExpanded && (
            <div className="relative shrink-0 bg-[var(--surface-neutral-xx-weak)] rounded-tl-[20px]" ref={dropdownRef}>
              <div className="h-[62px] px-5 py-4 flex items-center justify-between">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[var(--text-neutral-x-strong)]">
                    {title}
                  </span>
                  <Icon
                    name="caret-down"
                    size={10}
                    className={`text-[var(--icon-neutral-medium)] transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div className="flex items-center gap-[6px]">
                  <button
                    onClick={handleExpand}
                    className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                    aria-label="Expand"
                  >
                    <Icon name="expand" size={16} className="text-[var(--icon-neutral-x-strong)]" />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <Icon name="xmark" size={16} className="text-[var(--icon-neutral-x-strong)]" />
                  </button>
                </div>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mx-1 mb-1 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-[var(--radius-small)] shadow-lg overflow-hidden">
                  {recentConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        w-full px-5 py-3 text-left text-[15px]
                        hover:bg-[var(--surface-neutral-xx-weak)]
                        transition-colors duration-150
                        ${
                          conversation.id === selectedConversation.id
                            ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-xx-strong)] font-medium'
                            : 'text-[var(--text-neutral-strong)]'
                        }
                      `}
                    >
                      {conversation.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat Content Area */}
          <div className={`flex-1 flex flex-col min-h-0 ${isExpanded ? 'bg-[var(--surface-neutral-white)] p-6' : 'bg-[var(--surface-neutral-white)]'}`}>
            {isExpanded ? (
              /* Expanded view - grey rounded container */
              <div className="flex-1 flex flex-col min-h-0 bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <div className="max-w-[800px] mx-auto px-8 py-6 flex flex-col gap-6">
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.type === 'user' ? (
                          <div className="flex justify-end">
                            <div className="max-w-[70%] bg-[var(--surface-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px]">
                              <p className="text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)] whitespace-pre-line">
                                {message.text}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {/* AI Label */}
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-full">
                                <Icon name="sparkles" size={12} className="text-white" />
                              </div>
                              <span className="text-[13px] font-semibold text-[var(--text-neutral-medium)]">
                                BambooHR Assistant
                              </span>
                            </div>
                            {/* AI Message */}
                            <div className="pl-8">
                              <MarkdownContent text={message.text} />
                              {/* Suggestion Chips */}
                              {message.suggestions && message.suggestions.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {message.suggestions.map((suggestion, index) => (
                                    <button
                                      key={index}
                                      className="px-4 py-2 text-[14px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                                      style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
                                    >
                                      {suggestion}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expanded Input Area */}
                <div className="px-8 py-6">
                  <div className="max-w-[800px] mx-auto flex items-center gap-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-weak)] rounded-full px-6 py-3 shadow-sm">
                    <textarea
                      placeholder="Ask Anything"
                      value={inputValue}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-medium)] outline-none resize-none overflow-hidden"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-70"
                      aria-label="Send message"
                    >
                      <Icon
                        name="paper-plane"
                        size={20}
                        className="text-[var(--icon-neutral-medium)]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Panel view - original layout */
              <>
                {/* Content Area */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <div className="flex flex-col gap-5 p-5">
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.type === 'user' ? (
                          <div className="flex justify-end pl-[34px]">
                            <div className="bg-[var(--surface-neutral-xx-weak)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px]">
                              <p className="text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
                                {message.text}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <MarkdownContent text={message.text} />
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="flex flex-col gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    className="self-start px-4 py-2 text-[14px] leading-[20px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-medium)] rounded-full hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
                                    style={{ boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04)' }}
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Input - Panel mode */}
                <div className="bg-[var(--surface-neutral-white)] px-5 pt-4 pb-5 rounded-b-[20px] shrink-0">
                  {/* AI gradient border wrapper */}
                  <div
                    className="relative rounded-lg p-[2px] min-h-[86px]"
                    style={{
                      background: 'linear-gradient(93deg, #87C276 0%, #7AB8EE 33.65%, #C198D4 66.83%, #F2A766 96.15%)',
                      boxShadow: '1px 1px 0px 1px rgba(56, 49, 47, 0.04), 2px 2px 0px 2px rgba(56, 49, 47, 0.05)',
                    }}
                  >
                    <div className="bg-[var(--surface-neutral-white)] rounded-[6px] px-5 pt-4 pb-3 flex flex-col gap-3">
                      {/* Input field - Top row */}
                      <textarea
                        placeholder="Reply..."
                        value={inputValue}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="w-full bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-medium)] outline-none resize-none overflow-hidden"
                      />

                      {/* Icons row - Bottom */}
                      <div className="flex items-center justify-between">
                        {/* Left action icons */}
                        <div className="flex items-center gap-4">
                          <button className="hover:opacity-70 transition-opacity" aria-label="Attach file">
                            <Icon name="paperclip" size={16} className="text-[var(--icon-neutral-xx-strong)]" />
                          </button>
                          <button className="hover:opacity-70 transition-opacity" aria-label="Add image">
                            <Icon name="image" size={16} className="text-[var(--icon-neutral-xx-strong)]" />
                          </button>
                        </div>

                        {/* Right icons */}
                        <div className="flex items-center gap-4">
                          <button className="hover:opacity-70 transition-opacity" aria-label="Voice input">
                            <Icon name="microphone" size={16} className="text-[var(--icon-neutral-xx-strong)]" />
                          </button>
                          <button
                            type="button"
                            className="flex items-center justify-center"
                            onClick={handleSend}
                            aria-label="Send message"
                          >
                            <Icon
                              name="circle-arrow-up"
                              size={16}
                              className="text-[var(--icon-neutral-xx-strong)]"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChatPanel;
