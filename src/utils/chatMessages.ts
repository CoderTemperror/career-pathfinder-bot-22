
import { v4 as uuidv4 } from 'uuid';
import type { ChatMessage } from '@/types';

/**
 * Creates a new user message
 */
export const createUserMessage = (content: string): ChatMessage => {
  return {
    id: uuidv4(),
    role: 'user',
    content: content.trim(),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Creates a new assistant message
 */
export const createAssistantMessage = (content: string): ChatMessage => {
  return {
    id: uuidv4(),
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Creates a welcome message based on context
 */
export const createWelcomeMessage = (): ChatMessage => {
  return createAssistantMessage(
    "Hi there! I'm your Career Compass Assistant. I can help you explore career options, educational paths, and provide personalized guidance based on your interests and goals. How can I assist you today?"
  );
};

/**
 * Creates an error message when response generation fails
 */
export const createErrorMessage = (customMessage?: string): ChatMessage => {
  return createAssistantMessage(
    customMessage || "I'm sorry, I'm having trouble responding right now. Please try again later."
  );
};
