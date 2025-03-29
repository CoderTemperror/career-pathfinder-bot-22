
import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import StorageService from '@/services/storage';
import GeminiService from '@/services/gemini';

interface UseChatMessagesProps {
  initialQuestion?: string;
  mbtiType?: string;
  resetOnRefresh?: boolean;
}

export const useChatMessages = ({ 
  initialQuestion, 
  mbtiType,
  resetOnRefresh = false 
}: UseChatMessagesProps = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const aiService = useRef(GeminiService);
  
  // Load chat messages from storage
  useEffect(() => {
    const storedMessages = StorageService.get('chat_messages');
    
    if (initialQuestion && (!storedMessages || resetOnRefresh)) {
      // If there's an initial question, create a new chat with it
      handleSendMessage(initialQuestion);
    } else if (storedMessages && !resetOnRefresh) {
      setMessages(storedMessages);
    } else if (mbtiType) {
      // If MBTI result is available, start with a personalized message
      const mbtiResult = StorageService.get('mbti_result');
      if (mbtiResult) {
        handleSendMessage(`Based on my MBTI type ${mbtiResult.type}, what careers would be a good match for me? Please explain why these careers fit my personality type.`);
      }
    }
  }, [initialQuestion, mbtiType, resetOnRefresh]);
  
  // Save messages to storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      StorageService.set('chat_messages', messages);
    }
  }, [messages]);
  
  const generateAssistantResponse = useCallback(async (userMessage: string, previousMessages: ChatMessage[]) => {
    if (!aiService.current.isInitialized()) {
      try {
        aiService.current.initialize();
      } catch (error) {
        console.error('Failed to initialize AI service:', error);
        toast({
          title: "Error",
          description: "Failed to connect to AI service",
          variant: "destructive",
        });
        return null;
      }
    }
    
    try {
      setIsLoading(true);
      
      // Format previous messages for context
      const formattedPreviousMessages = previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Get AI response
      const assistantResponse = await aiService.current.generateResponse(
        userMessage,
        formattedPreviousMessages
      );
      
      setIsLoading(false);
      
      if (!assistantResponse) {
        throw new Error('No response from AI service');
      }
      
      return assistantResponse;
    } catch (error) {
      setIsLoading(false);
      console.error('Error generating response:', error);
      
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  }, [toast]);
  
  const handleSendMessage = useCallback(async (messageContent?: string) => {
    const content = messageContent || inputValue;
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    
    // Update state with user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue(''); // Clear input field
    
    // Generate and add assistant response
    const assistantResponse = await generateAssistantResponse(
      content.trim(),
      messages // Pass current messages for context
    );
    
    if (assistantResponse) {
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }
  }, [inputValue, messages, generateAssistantResponse]);
  
  const handleEditMessage = useCallback(async (messageId: string, newContent: string) => {
    // Find the message to edit
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex === -1) return;
    
    // Create updated messages array with edited user message
    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: newContent,
      edited: true,
      timestamp: new Date().toISOString(),
    };
    
    // Check if there's an assistant response following this message
    const hasAssistantResponse = 
      messageIndex + 1 < messages.length && 
      messages[messageIndex + 1].role === 'assistant';
    
    if (hasAssistantResponse) {
      // Remove the assistant's response that followed
      updatedMessages.splice(messageIndex + 1, 1);
      setMessages(updatedMessages);
      
      // Show toast notification
      sonnerToast.info("Regenerating response...");
      
      // Generate a new response based on the edited message
      const assistantResponse = await generateAssistantResponse(
        newContent,
        updatedMessages.slice(0, messageIndex) // Context up to the edited message
      );
      
      if (assistantResponse) {
        const newAssistantMessage: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: assistantResponse,
          timestamp: new Date().toISOString(),
        };
        
        setMessages([...updatedMessages, newAssistantMessage]);
      }
    } else {
      // Just update the message if no assistant response follows
      setMessages(updatedMessages);
    }
  }, [messages, generateAssistantResponse]);
  
  const handleReuseMessage = useCallback((message: ChatMessage) => {
    setInputValue(message.content);
  }, []);
  
  const handleReset = useCallback(() => {
    if (window.confirm("Are you sure you want to clear this conversation?")) {
      setMessages([]);
      StorageService.set('chat_messages', []);
      sonnerToast.success("Conversation cleared", {
        description: "Starting a new conversation"
      });
    }
  }, []);
  
  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleEditMessage,
    handleReuseMessage,
    handleReset,
  };
};

