
// Simple service to handle localStorage storage
// This handles both get and set operations with typed data

/**
 * Storage keys used in the application
 */
type StorageKey = 
  | 'mbti_answers' 
  | 'mbti_result' 
  | 'chat_messages'
  | 'career_assessment_answers'
  | 'career_assessment_result';

/**
 * Storage Service for managing browser localStorage with type safety
 */
const StorageService = {
  /**
   * Store a value in localStorage
   * @param key Storage key
   * @param value Value to store
   */
  set: (key: StorageKey, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
    }
  },

  /**
   * Retrieve a value from localStorage
   * @param key Storage key
   * @returns The stored value, or null if not found
   */
  get: (key: StorageKey): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return null;
    }
  },

  /**
   * Remove a value from localStorage
   * @param key Storage key
   */
  remove: (key: StorageKey): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  /**
   * Clear all application data from localStorage
   */
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

export default StorageService;
