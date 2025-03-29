
import StorageService from '@/services/storage';
import type { ChatMessage } from '@/types';

/**
 * Chat-specific storage utilities
 */
export const chatStorage = {
  /**
   * Save chat messages to storage
   */
  saveMessages: (messages: ChatMessage[]): void => {
    if (messages.length > 0) {
      StorageService.set('chat_messages', messages);
    }
  },

  /**
   * Retrieve chat messages from storage
   */
  getMessages: (): ChatMessage[] => {
    return StorageService.get('chat_messages') || [];
  },

  /**
   * Clear chat messages from storage
   */
  clearMessages: (): void => {
    StorageService.remove('chat_messages');
  }
};
