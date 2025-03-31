
import { useRef, useEffect, useState } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { useIsMobile } from '@/hooks/use-mobile';
import StorageService from '@/services/storage';

interface ChatInterfaceProps {
  className?: string;
  initialQuestion?: string;
  mbtiType?: string;
}

const ChatInterface = ({ className = "", initialQuestion, mbtiType }: ChatInterfaceProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [persistentMbtiType, setPersistentMbtiType] = useState<string | null>(null);
  
  // Load the persistent MBTI type on mount and when the prop changes
  useEffect(() => {
    if (mbtiType) {
      setPersistentMbtiType(mbtiType);
    } else {
      const savedType = StorageService.getMbtiType();
      setPersistentMbtiType(savedType);
    }
  }, [mbtiType]);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleReset,
    handleEditMessage,
    handleReuseMessage
  } = useChatMessages({ 
    initialQuestion, 
    mbtiType: persistentMbtiType || undefined, 
    resetOnRefresh: true 
  });

  // Only scroll to bottom when user sends a new message or when assistant replies
  useEffect(() => {
    // Don't auto-scroll on component mount - only on new messages
    if (messages.length > 0 && messagesContainerRef.current) {
      // Use smooth scrolling for better UX
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Chat messages area */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-thin bg-background" 
        ref={messagesContainerRef}
        tabIndex={-1}
      >
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          onEditMessage={handleEditMessage}
          onReuseMessage={handleReuseMessage}
        />
      </div>
      
      {/* Chat input area - fixed at bottom */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        onReset={handleReset}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface;
