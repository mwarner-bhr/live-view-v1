import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatSidebar } from '../../components/ChatSidebar';
import { ChatContent } from '../../components/ChatContent';
import { useChat } from '../../contexts/ChatContext';

export function Chat() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { selectConversation, conversations } = useChat();

  // Select conversation from URL param on mount
  useEffect(() => {
    if (conversationId) {
      // Check if conversation exists
      const exists = conversations.some(c => c.id === conversationId);
      if (exists) {
        selectConversation(conversationId);
      }
    }
  }, [conversationId, conversations, selectConversation]);

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--surface-neutral-white)]">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat Content */}
      <ChatContent />
    </div>
  );
}

export default Chat;
