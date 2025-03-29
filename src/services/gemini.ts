
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

      // For Lovable, we're simulating AI responses
      // This would be a real API call in a production app
      const result = await Promise.resolve({
        response: {
          text: () => this.generateCareerAdvice(userInput),
        },
      });

      return result.response.text();
    } catch (error) {
      console.error('Error generating response with Gemini:', error);
      throw error;
    }
  }

  // Simulate AI response generation with career advice
  private generateCareerAdvice(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Simulate different responses based on input
    if (input.includes('mbti') || input.includes('personality')) {
      return "Based on your personality type, here are some career paths that might be a good fit:\n\n" +
        "1. **Software Development** - Your analytical nature and attention to detail would be valuable in this field.\n" +
        "2. **Data Science** - Your ability to recognize patterns and solve complex problems aligns well with this career.\n" +
        "3. **UX Research** - Your empathetic approach and systematic thinking would help you understand user needs.\n\n" +
        "Remember that personality type is just one factor to consider when choosing a career. Your interests, skills, and values are equally important.";
    }
    
    if (input.includes('engineering') || input.includes('tech')) {
      return "## Engineering & Technology Careers\n\n" +
        "Engineering offers diverse opportunities across many industries. Here are some options to consider:\n\n" +
        "### Software Engineering\n" +
        "- **Salary Range**: ₹5-40 LPA (India), $70-150K (US)\n" +
        "- **Growth Outlook**: Excellent\n" +
        "- **Key Skills**: Programming, problem-solving, communication\n\n" +
        "### Data Science\n" +
        "- **Salary Range**: ₹6-30 LPA (India), $80-160K (US)\n" +
        "- **Growth Outlook**: Excellent\n" +
        "- **Key Skills**: Statistics, machine learning, programming\n\n" +
        "Would you like more information about education requirements or specific specializations within these fields?";
    }
    
    if (input.includes('medicine') || input.includes('doctor') || input.includes('healthcare')) {
      return "# Medical & Healthcare Careers\n\n" +
        "Healthcare careers are rewarding and offer stability. Here are some options:\n\n" +
        "1. **General Medicine**\n" +
        "   - **Path**: MBBS (5.5 years) → MD/MS (3 years) → Super-specialization (optional)\n" +
        "   - **Exams**: NEET-UG, NEET-PG\n" +
        "   - **Top Colleges**: AIIMS, CMC Vellore\n\n" +
        "2. **Allied Health Sciences**\n" +
        "   - **Options**: Physiotherapy, Occupational Therapy, Medical Lab Technology\n" +
        "   - **Duration**: 3-4 years bachelor's + specialization\n" +
        "   - **Advantage**: Better work-life balance than doctors\n\n" +
        "3. **Public Health**\n" +
        "   - **Focus**: Disease prevention, health policy, epidemiology\n" +
        "   - **Path**: Any bachelor's → MPH (2 years)\n" +
        "   - **Growth**: Increasing importance post-pandemic\n\n" +
        "Would you like me to elaborate on any of these paths or discuss other healthcare options?";
    }
    
    if (input.includes('business') || input.includes('management') || input.includes('mba')) {
      return "# Business & Management Careers\n\n" +
        "Business careers span multiple industries and functions. Here are some popular paths:\n\n" +
        "### Management Consulting\n" +
        "- **What they do**: Help organizations solve complex business problems\n" +
        "- **Education**: MBA from top schools preferred\n" +
        "- **Salary**: ₹12-40 LPA (entry-level in India)\n" +
        "- **Pros**: Intellectual challenge, fast growth, prestige\n" +
        "- **Cons**: Long hours, extensive travel\n\n" +
        "### Investment Banking\n" +
        "- **What they do**: Financial advisory, capital raising, M&A\n" +
        "- **Education**: Finance degree, MBA advantage\n" +
        "- **Salary**: ₹15-40 LPA (entry-level in India)\n" +
        "- **Pros**: Extremely high earning potential\n" +
        "- **Cons**: Notoriously demanding work schedule\n\n" +
        "### Marketing Management\n" +
        "- **What they do**: Brand strategy, consumer insights, digital marketing\n" +
        "- **Education**: Business/Marketing degree, MBA helpful\n" +
        "- **Salary**: ₹6-25 LPA (entry-level in India)\n" +
        "- **Pros**: Creative aspects, variety of industries\n" +
        "- **Cons**: High pressure for results, budget constraints\n\n" +
        "Would you like me to elaborate on preparation for MBA entrance exams or discuss more business specializations?";
    }
    
    // Default response for other queries
    return "Thank you for your question about career guidance. I'd be happy to help you explore different career paths based on your interests and strengths.\n\n" +
      "To provide you with the most relevant advice, it would be helpful if you could share:\n\n" +
      "1. What subjects or activities do you enjoy the most?\n" +
      "2. Are you looking for information about a specific field (like engineering, medicine, business)?\n" +
      "3. What factors are most important to you in a career (salary, work-life balance, growth opportunities)?\n\n" +
      "Once I have this information, I can offer more personalized guidance about educational requirements, career paths, and future prospects in fields that align with your interests.";
  }
}

// Export as singleton
export default new GeminiService();

