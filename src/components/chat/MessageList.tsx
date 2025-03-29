
import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { chatMessageAnimation } from '@/utils/animations';
import UserMessage from './UserMessage';
import EditableAssistantMessage from './EditableAssistantMessage';
import ThinkingIndicator from './ThinkingIndicator';
import type { ChatMessage } from '@/types';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onEditMessage: (messageId: string, content: string) => void;
  onReuseMessage: (message: ChatMessage) => void;
  onDeleteMessage: (messageId: string) => void;
}

const MessageList = ({ 
  messages, 
  isLoading, 
  onEditMessage, 
  onReuseMessage,
  onDeleteMessage
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-28 pt-4 w-full">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={chatMessageAnimation}
            className={`mb-6 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            {message.role === 'user' ? (
              <UserMessage 
                message={message}
                onEdit={onEditMessage}
                onReuse={onReuseMessage}
              />
            ) : (
              <EditableAssistantMessage 
                message={message} 
                onEdit={onEditMessage} 
                onDelete={onDeleteMessage}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isLoading && <ThinkingIndicator />}
      
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

export default MessageList;
