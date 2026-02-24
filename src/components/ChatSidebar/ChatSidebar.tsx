import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { useChat } from '../../contexts/ChatContext';

interface ChatSidebarProps {
  className?: string;
}

export function ChatSidebar({ className = '' }: ChatSidebarProps) {
  const navigate = useNavigate();
  const {
    filteredConversations,
    selectedConversationId,
    searchQuery,
    setSearchQuery,
    selectConversation,
    createNewChat,
  } = useChat();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCollapse = () => {
    // Open the slide-in chat panel
    localStorage.setItem('bhr-chat-panel-open', 'true');
    // Navigate to home page
    navigate('/');
  };

  const handleClose = () => {
    // Close the slide-in chat panel (if it was open)
    localStorage.setItem('bhr-chat-panel-open', 'false');
    // Navigate to home page
    navigate('/');
  };

  const handleNewChat = () => {
    const newChat = createNewChat();
    selectConversation(newChat.id);
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <aside
      className={`w-[280px] h-full flex flex-col bg-[var(--surface-neutral-white)] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="w-6 h-6 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-md">
          <Icon name="sparkles" size={14} className="text-white" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCollapse}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-xx-small)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            aria-label="Collapse to slide-in"
          >
            <Icon name="down-left-and-up-right-to-center" size={16} className="text-[var(--icon-neutral-x-strong)]" />
          </button>
          <button
            onClick={handleClose}
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
          onClick={handleNewChat}
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
          const isActive = conversation.id === selectedConversationId;
          return (
            <button
              key={conversation.id}
              onClick={() => {
                selectConversation(conversation.id);
                navigate(`/chat/${conversation.id}`);
              }}
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
        {filteredConversations.length === 0 && searchQuery && (
          <p className="px-4 py-3 text-[14px] text-[var(--text-neutral-weak)]">
            No conversations found
          </p>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;
