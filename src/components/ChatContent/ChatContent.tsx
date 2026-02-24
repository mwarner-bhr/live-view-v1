import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { useChat } from '../../contexts/ChatContext';
import type { ChatMessage } from '../../data/chatData';
import MarkdownContent from '../MarkdownContent';

interface ChatContentProps {
  className?: string;
}

export function ChatContent({ className = '' }: ChatContentProps) {
  const { selectedConversation, addMessage, selectedConversationId } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = selectedConversation?.messages || [];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && selectedConversationId) {
      addMessage(selectedConversationId, {
        type: 'user',
        text: inputValue.trim(),
      });
      setInputValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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

  if (!selectedConversation) {
    return (
      <div className={`flex-1 flex flex-col bg-[var(--surface-neutral-white)] p-6 ${className}`}>
        <div className="flex-1 flex items-center justify-center bg-[var(--surface-neutral-xx-weak)] rounded-[20px]">
          <p className="text-[var(--text-neutral-medium)]">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col min-h-0 bg-[var(--surface-neutral-white)] p-6 ${className}`}>
      <div className="flex-1 flex flex-col min-h-0 bg-[var(--surface-neutral-xx-weak)] rounded-[20px] overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-[800px] mx-auto px-8 py-6 flex flex-col gap-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-8 py-6">
          <div className="max-w-[800px] mx-auto flex items-center gap-3 bg-[var(--surface-neutral-white)] border border-[var(--border-neutral-weak)] rounded-full px-6 py-3 shadow-sm">
            <textarea
              ref={textareaRef}
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
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-[var(--surface-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px]">
          <p className="text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)] whitespace-pre-line">
            {message.text}
          </p>
        </div>
      </div>
    );
  }

  return (
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
  );
}

export default ChatContent;
