
import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { createUserMessage, createAssistantMessage, createWelcomeMessage, createErrorMessage, editMessage } from '@/utils/chatMessages';
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
  
  const handleEditMessage = useCallback(async (messageId: string, newContent: string) => {
    // Find message to edit
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;
    
    const message = messages[messageIndex];
    const updatedMessage = editMessage(message, newContent);
    
    // Update the message
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = updatedMessage;
    
    // If it's an assistant message, just update it
    if (message.role === 'assistant') {
      setMessages(updatedMessages);
      return;
    }
    
    // If it's a user message, update it and regenerate the assistant response
    setMessages(updatedMessages);
    
    // If there's an assistant response after this message, remove it and generate a new one
    if (messageIndex + 1 < messages.length && messages[messageIndex + 1].role === 'assistant') {
      // Remove the assistant message
      updatedMessages.splice(messageIndex + 1, 1);
      setMessages(updatedMessages);
      
      // Generate a new response
      setIsLoading(true);
      
      try {
        const assistantResponse = await generateResponse(newContent);
        const assistantMessage = createAssistantMessage(assistantResponse);
        
        // Add the new assistant message
        updatedMessages.splice(messageIndex + 1, 0, assistantMessage);
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error regenerating response:", error);
        toast.error("Failed to update response", {
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [messages, generateResponse]);
  
  const handleDeleteMessage = useCallback(async (messageId: string) => {
    // Find the message to delete
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;
    
    const message = messages[messageIndex];
    
    // Only allow deleting assistant messages
    if (message.role !== 'assistant') return;
    
    // Find the user message that triggered this response
    let userMessageIndex = messageIndex - 1;
    while (userMessageIndex >= 0 && messages[userMessageIndex].role !== 'user') {
      userMessageIndex--;
    }
    
    if (userMessageIndex < 0) return; // No user message found
    
    const userMessage = messages[userMessageIndex];
    
    // Remove the assistant message
    const updatedMessages = [...messages];
    updatedMessages.splice(messageIndex, 1);
    setMessages(updatedMessages);
    
    // Generate a new response
    setIsLoading(true);
    
    try {
      const assistantResponse = await generateResponse(userMessage.content);
      const assistantMessage = createAssistantMessage(assistantResponse);
      
      // Add the new assistant message where the old one was
      updatedMessages.splice(messageIndex, 0, assistantMessage);
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error regenerating response:", error);
      toast.error("Failed to generate new response", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, generateResponse]);
  
  const handleReuseMessage = useCallback((message: ChatMessage) => {
    setInputValue(message.content);
  }, []);
  
  const handleReset = useCallback(() => {
    // Reset the chat to initial state
    const welcomeMessage = createWelcomeMessage();
    setMessages([welcomeMessage]);
    chatStorage.saveMessages([welcomeMessage]);
    setInputValue('');
    toast.success("Started a new conversation");
  }, []);
  
  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleReset,
    handleEditMessage,
    handleDeleteMessage,
    handleReuseMessage
  };
};
