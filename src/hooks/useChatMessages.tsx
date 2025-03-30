
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import storageService from '@/services/storage';
import { getAIResponse } from '@/services/aiResponseService';
import { 
  createUserMessage, 
  createAssistantMessage, 
  createWelcomeMessage,
  createErrorMessage,
  showNewConversationToast,
  showResponseErrorToast
} from '@/utils/chatMessageUtils';
import type { ChatMessage } from '@/types';

interface UseChatMessagesOptions {
  initialQuestion?: string;
  mbtiType?: string; 
  resetOnRefresh?: boolean;
}

export function useChatMessages({ initialQuestion, mbtiType, resetOnRefresh = false }: UseChatMessagesOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState(initialQuestion || "");
  const [isLoading, setIsLoading] = useState(false);
  const initialQuestionSent = useRef(false);
  
  // Check for session identifier in localStorage
  useEffect(() => {
    // If resetOnRefresh is true, we'll create a new session ID on each page load
    if (resetOnRefresh) {
      const currentSessionId = sessionStorage.getItem('chat_session_id');
      const newSessionId = uuidv4();
      
      // If there's no session ID or it's different (page was refreshed), reset the chat
      if (!currentSessionId) {
        sessionStorage.setItem('chat_session_id', newSessionId);
        handleReset();
        return;
      }
    }
    
    // If we're not resetting or the session is the same, load saved messages
    const savedMessages = storageService.getChatHistory();
    
    if (savedMessages && savedMessages.length > 0) {
      // Convert date strings back to Date objects
      const processedMessages = savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(processedMessages);
    } else {
      // Set default welcome message if no history exists
      setMessages([createWelcomeMessage(mbtiType)]);
    }
  }, [mbtiType, resetOnRefresh]);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      storageService.saveChatHistory(messages);
    }
  }, [messages]);
  
  useEffect(() => {
    // Update input value if initialQuestion changes
    if (initialQuestion) {
      setInputValue(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    // Send initial question only once when component mounts
    if (initialQuestion && !initialQuestionSent.current) {
      initialQuestionSent.current = true;
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        handleSendMessage();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initialQuestion]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = createUserMessage(inputValue);
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      const aiResponseText = await getAIResponse(inputValue, mbtiType);
      const aiMessage = createAssistantMessage(aiResponseText);
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, createErrorMessage()]);
      showResponseErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const newWelcomeMessage = createWelcomeMessage(mbtiType);
    
    setMessages([newWelcomeMessage]);
    storageService.clearChatHistory();
    storageService.saveChatHistory([newWelcomeMessage]);
    
    showNewConversationToast();
  };
  
  const handleEditMessage = async (messageId: string, content: string) => {
    if (content.trim() === "") return;
    
    // Find the edited message index
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;
    
    // Check if this is a user message
    const editedMessage = messages[messageIndex];
    if (editedMessage.role !== 'user') return;
    
    // Create a new array with the edited message
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...editedMessage,
      content: content,
      timestamp: new Date(),
    };
    
    // Remove AI response that came after this message (if any)
    if (messageIndex + 1 < messages.length && updatedMessages[messageIndex + 1].role === 'assistant') {
      updatedMessages.splice(messageIndex + 1, 1);
    }
    
    // Update messages state
    setMessages(updatedMessages);
    
    // Now generate a new AI response for the edited message
    setIsLoading(true);
    
    try {
      const aiResponseText = await getAIResponse(content, mbtiType);
      const aiMessage = createAssistantMessage(aiResponseText);
      
      // Insert the new AI message after the edited user message
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.splice(messageIndex + 1, 0, aiMessage);
        return newMessages;
      });
      
      // Removed the toast notification here
    } catch (error) {
      console.error("Error getting AI response for edited message:", error);
      
      showResponseErrorToast();
      
      const errorMessage = createErrorMessage("I'm sorry, I'm having trouble responding to your edited message right now. Please try again later.");
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.splice(messageIndex + 1, 0, errorMessage);
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReuseMessage = (message: ChatMessage) => {
    if (isLoading) return;
    setInputValue(message.content);
    // Don't immediately send to allow user to edit if needed
  };

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
}
