
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import type { ChatMessage } from '@/types';

/**
 * Creates a new user message object
 */
export const createUserMessage = (content: string): ChatMessage => {
  return {
    id: uuidv4(),
    role: 'user' as 'user',
    content,
    timestamp: new Date(),
  };
};

/**
 * Creates a new assistant message object
 */
export const createAssistantMessage = (content: string): ChatMessage => {
  return {
    id: uuidv4(),
    role: 'assistant' as 'assistant',
    content,
    timestamp: new Date(),
  };
};

/**
 * Creates a welcome message based on MBTI type
 */
export const createWelcomeMessage = (mbtiType?: string): ChatMessage => {
  const content = mbtiType ? 
    `Based on your assessment, your MBTI type is ${mbtiType}. This personality type has specific career strengths and preferences. How can I help you explore career paths that align with your ${mbtiType} personality type?` :
    "Hi there! I'm your Career Pathfinder assistant. I can help you discover suitable careers based on your background, skills, and interests. What would you like to explore today?";
  
  return createAssistantMessage(content);
};

/**
 * Creates an error message when AI response fails
 */
export const createErrorMessage = (customMessage?: string): ChatMessage => {
  return createAssistantMessage(
    customMessage || "I'm sorry, I'm having trouble responding right now. Please try again later."
  );
};

/**
 * Shows a success toast for a new conversation
 */
export const showNewConversationToast = () => {
  toast.success("Started a new conversation");
};

/**
 * Shows a success toast for regenerated response
 */
export const showRegeneratedResponseToast = () => {
  toast.success("Generated new response based on edited message");
};

/**
 * Shows an error toast for failed response
 */
export const showResponseErrorToast = () => {
  toast.error("Failed to get a new response. Please try again.");
};
