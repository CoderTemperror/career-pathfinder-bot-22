import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import storageService from '@/services/storage';
import { getAIResponse } from '@/services/aiResponseService';
import { 
  createUserMessage, 
  createAssistantMessage, 
  createWelcomeMessage,
  createErrorMessage,
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
  const [persistentMbtiType, setPersistentMbtiType] = useState<string | null>(null);
  
  useEffect(() => {
    if (mbtiType) {
      setPersistentMbtiType(mbtiType);
    } else {
      const savedType = storageService.getMbtiType();
      if (savedType) {
        setPersistentMbtiType(savedType);
      }
    }
  }, [mbtiType]);
  
  useEffect(() => {
    if (resetOnRefresh) {
      const currentSessionId = sessionStorage.getItem('chat_session_id');
      const newSessionId = uuidv4();
      
      if (!currentSessionId) {
        sessionStorage.setItem('chat_session_id', newSessionId);
        handleReset();
        return;
      }
    }
    
    const savedMessages = storageService.getChatHistory();
    
    if (savedMessages && savedMessages.length > 0) {
      const processedMessages = savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(processedMessages);
    } else {
      const savedType = storageService.getMbtiType();
      setMessages([createWelcomeMessage(savedType || undefined)]);
    }
  }, [resetOnRefresh]);

  useEffect(() => {
    if (initialQuestion) {
      setInputValue(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (initialQuestion && !initialQuestionSent.current) {
      initialQuestionSent.current = true;
      const timer = setTimeout(() => {
        handleSendMessage();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initialQuestion]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = createUserMessage(inputValue);
    
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      storageService.saveChatHistory(newMessages);
      return newMessages;
    });
    
    setInputValue("");
    setIsLoading(true);
    
    try {
      const currentMbtiType = storageService.getMbtiType() || persistentMbtiType;
      const aiResponseText = await getAIResponse(inputValue, currentMbtiType || undefined);
      const aiMessage = createAssistantMessage(aiResponseText);
      
      setMessages(prev => {
        const newMessages = [...prev, aiMessage];
        storageService.saveChatHistory(newMessages);
        return newMessages;
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      setMessages(prev => {
        const newMessages = [...prev, createErrorMessage()];
        storageService.saveChatHistory(newMessages);
        return newMessages;
      });
      
      showResponseErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const currentMbtiType = storageService.getMbtiType();
    const newWelcomeMessage = createWelcomeMessage(currentMbtiType || undefined);
    
    setMessages([newWelcomeMessage]);
    storageService.clearChatHistory();
    storageService.saveChatHistory([newWelcomeMessage]);
  };
  
  const handleEditMessage = async (messageId: string, content: string) => {
    if (content.trim() === "") return;
    
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;
    
    const editedMessage = messages[messageIndex];
    if (editedMessage.role !== 'user') return;
    
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...editedMessage,
      content: content,
      timestamp: new Date(),
    };
    
    if (messageIndex + 1 < messages.length && updatedMessages[messageIndex + 1].role === 'assistant') {
      updatedMessages.splice(messageIndex + 1, 1);
    }
    
    setMessages(updatedMessages);
    
    setIsLoading(true);
    
    try {
      const currentMbtiType = storageService.getMbtiType() || persistentMbtiType;
      const aiResponseText = await getAIResponse(content, currentMbtiType || undefined);
      const aiMessage = createAssistantMessage(aiResponseText);
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.splice(messageIndex + 1, 0, aiMessage);
        return newMessages;
      });
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
