
import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { createUserMessage, createAssistantMessage, createWelcomeMessage, createErrorMessage } from '@/utils/chatMessages';
import { chatStorage } from '@/utils/chatStorage';
import { useResponseGenerator } from '@/hooks/useResponseGenerator';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { ChatMessage } from '@/types';

interface UseChatMessagesProps {
  initialQuestion?: string;
  mbtiType?: string;
  resetOnRefresh?: boolean;
}

export const useChatMessages = ({ 
  initialQuestion, 
  mbtiType,
  resetOnRefresh = false,
}: UseChatMessagesProps = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const isInitialRender = useRef(true);
  const { generateResponse } = useResponseGenerator();
  const { getInitialMessage } = useQueryParams();
  
  // Initialize chat messages
  useEffect(() => {
    const savedMessages = chatStorage.getMessages();
    
    // Check if it's the first render and if we should reset messages
    if (isInitialRender.current) {
      isInitialRender.current = false;
      
      // Get message from URL params
      const initialMessage = getInitialMessage();
      
      // If initialQuestion, mbtiType, or query parameter is provided, start fresh
      const shouldResetHistory = initialMessage || resetOnRefresh || initialQuestion || mbtiType;
      
      if (shouldResetHistory) {
        // Clear saved messages and start fresh
        setMessages([createWelcomeMessage()]);
      } else if (savedMessages.length > 0) {
        // Use saved messages
        setMessages(savedMessages);
      } else {
        // Default welcome message
        setMessages([createWelcomeMessage()]);
      }
      
      // Process initial message if available
      if (initialMessage) {
        setTimeout(() => {
          handleSendMessage(initialMessage);
        }, 500);
      } else if (initialQuestion) {
        setTimeout(() => {
          handleSendMessage(initialQuestion);
        }, 500);
      } else if (mbtiType) {
        setTimeout(() => {
          const message = `I've completed the MBTI assessment and my personality type is ${mbtiType}. What careers would be good for me based on this result?`;
          handleSendMessage(message);
        }, 500);
      }
    }
  }, [initialQuestion, mbtiType, resetOnRefresh, getInitialMessage]);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && !isInitialRender.current) {
      chatStorage.saveMessages(messages);
    }
  }, [messages]);
  
  const handleSendMessage = useCallback(async (messageText?: string) => {
    const content = messageText || inputValue;
    
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = createUserMessage(content);
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input after sending
    if (!messageText) {
      setInputValue('');
    }
    
    // Generate and add assistant response
    setIsLoading(true);
    
    try {
      const assistantResponse = await generateResponse(content);
      const assistantMessage = createAssistantMessage(assistantResponse);
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, generateResponse]);
  
  const handleEditMessage = useCallback((messageId: string, newContent: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === messageId 
          ? { ...message, content: newContent } 
          : message
      )
    );
  }, []);
  
  const handleReuseMessage = useCallback((message: ChatMessage) => {
    setInputValue(message.content);
  }, []);
  
  const handleReset = useCallback(() => {
    // Reset the chat to initial state
    const welcomeMessage = createWelcomeMessage();
    setMessages([welcomeMessage]);
    chatStorage.saveMessages([welcomeMessage]);
    setInputValue('');
  }, []);
  
  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleReset,
    handleEditMessage,
    handleReuseMessage
  };
};
