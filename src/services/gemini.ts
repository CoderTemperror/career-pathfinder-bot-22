
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private apiKey: string = 'not-needed-for-this-lovable-project';
  private model: any = null;
  private genAI: any = null;
  private modelName: string = 'gemini-2.0-flash';

  initialize(config?: { apiKey?: string }) {
    try {
      // For Lovable, we don't need to use a real API key
      this.apiKey = config?.apiKey || this.apiKey;
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: this.modelName });
      console.info(`Initializing model: ${this.modelName}`);
      return true;
    } catch (error) {
      console.error('Error initializing GeminiService:', error);
      return false;
    }
  }

  isInitialized(): boolean {
    return this.model !== null;
  }

  async generateResponse(
    userInput: string,
    previousMessages: { role: string; content: string }[] = []
  ): Promise<string> {
    if (!this.isInitialized()) {
      throw new Error('GeminiService not initialized');
    }

    try {
      // Convert previous messages to Google's chat format
      const chatHistory = previousMessages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      // Create a chat session
      const chat = this.model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      });

      // For Lovable's demo, we'll simulate the AI response
      // In a real-world scenario, this would call the actual API
      // return (await chat.sendMessage(userInput)).response.text();
      
      // Simulate AI response for demonstration purposes
      return "This is a simulated AI response for the career guidance app. In a production environment, this would be a response from the Gemini API with information about career paths, educational requirements, and personalized guidance based on your query.";
    } catch (error) {
      console.error('Error generating response with Gemini:', error);
      throw error;
    }
  }

  // Helper function to generate chat completions (for the useChatMessages.tsx hook)
  async generateChatCompletion(
    messages: { role: string; content: string }[]
  ): Promise<string> {
    if (!this.isInitialized()) {
      this.initialize();
    }

    try {
      // Extract the user's message (last message in the array)
      const userMessage = messages.find(msg => msg.role === 'user')?.content || '';
      
      // In a real implementation, we would format the chat history and call the API
      // For demo purposes, return a simulated response
      return "This is a simulated AI response for the career guidance app. In a production environment, this would be a response from the Gemini API with information about career paths, educational requirements, and personalized guidance based on your query.";
    } catch (error) {
      console.error('Error generating chat completion:', error);
      throw error;
    }
  }
}

// Export as singleton
export default new GeminiService();
