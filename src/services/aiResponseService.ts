
import GeminiService from '@/services/gemini';

/**
 * Gets an AI response for a user message
 */
export const getAIResponse = async (userMessage: string, mbtiType?: string): Promise<string> => {
  try {
    // Create a system prompt with career guidance instructions
    const systemPrompt = `You are a helpful career advisor. Your goal is to help users explore career options based on their skills, interests, education, and preferences. 
      Provide thoughtful, personalized career guidance. Ask follow-up questions to better understand the user's situation. 
      Be concise but thorough, avoiding overly generic advice. Focus on providing actionable insights and specific career paths that might suit the user.
      
      Only answer questions related to careers, education, colleges, exams, and professional development. 
      If asked about unrelated topics, politely explain that you can only assist with career guidance and education-related questions.
      
      When providing career recommendations, include:
      1. Educational paths and qualifications
      2. Top colleges in India and worldwide
      3. Required entrance exams or qualifications
      4. Skills needed for success
      5. Job profiles and opportunities
      6. Future scope and growth potential
      7. Salary ranges in different countries
      8. Potential challenges and advantages
      
      ${mbtiType ? `\nThe user's MBTI type is ${mbtiType}. Consider this personality type when providing career advice and suggestions.` : ''}`;
    
    // Send the system prompt as a separate message for the API
    const messages = [
      {
        role: 'system' as 'system',
        content: systemPrompt
      },
      {
        role: 'user' as 'user',
        content: userMessage
      }
    ];
    
    const response = await GeminiService.generateChatCompletion(messages);
    
    return response;
  } catch (error) {
    console.error("Error with AI:", error);
    throw error;
  }
};
