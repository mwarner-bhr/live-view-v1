import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { recentConversations } from '../data/chatData';
import type { ChatConversation, ChatMessage } from '../data/chatData';

const SELECTED_CONVERSATION_KEY = 'bhr-selected-conversation';

interface ChatContextType {
  conversations: ChatConversation[];
  selectedConversationId: string | null;
  selectedConversation: ChatConversation | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectConversation: (id: string) => void;
  createNewChat: () => ChatConversation;
  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id'>) => void;
  filteredConversations: ChatConversation[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>(recentConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(() => {
    const stored = localStorage.getItem(SELECTED_CONVERSATION_KEY);
    return stored || recentConversations[0]?.id || null;
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Get the currently selected conversation object
  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectConversation = useCallback((id: string) => {
    setSelectedConversationId(id);
    localStorage.setItem(SELECTED_CONVERSATION_KEY, id);
  }, []);

  const createNewChat = useCallback(() => {
    const newId = String(Date.now());
    const newConversation: ChatConversation = {
      id: newId,
      title: 'New Chat',
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversationId(newId);
    localStorage.setItem(SELECTED_CONVERSATION_KEY, newId);
    return newConversation;
  }, []);

  const addMessage = useCallback((conversationId: string, message: Omit<ChatMessage, 'id'>) => {
    setConversations(prev => prev.map(conversation => {
      if (conversation.id === conversationId) {
        const newMessage: ChatMessage = {
          ...message,
          id: String(Date.now()),
        };
        // Update title if this is the first user message in a new chat
        const isFirstUserMessage = conversation.messages.length === 0 && message.type === 'user';
        return {
          ...conversation,
          title: isFirstUserMessage ? message.text.slice(0, 50) : conversation.title,
          messages: [...conversation.messages, newMessage],
        };
      }
      return conversation;
    }));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        selectedConversationId,
        selectedConversation,
        searchQuery,
        setSearchQuery,
        selectConversation,
        createNewChat,
        addMessage,
        filteredConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
