
import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import StorageService from '@/services/storage';
import type { ChatMessage } from '@/types';

interface UseChatMessagesProps {
  initialQuestion?: string;
  mbtiType?: string;
  resetOnRefresh?: boolean;
}

export const useChatMessages = ({ 
  initialQuestion, 
  mbtiType,
  resetOnRefresh = false,
}: UseChatMessagesProps = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  
  const isInitialRender = useRef(true);
  
  // Initialize with welcome message
  useEffect(() => {
    const savedMessages = StorageService.get('chat_messages') || [];
    
    // Check if it's the first render and if we should reset messages
    if (isInitialRender.current) {
      isInitialRender.current = false;
      
      // If initialQuestion, mbtiType, or query parameter is provided, start fresh
      const hasQueryParam = searchParams.get('q') || searchParams.get('mbti') || searchParams.get('career_assessment');
      const shouldResetHistory = hasQueryParam || resetOnRefresh || initialQuestion || mbtiType;
      
      if (shouldResetHistory) {
        // Clear saved messages and start fresh
        setMessages([
          {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm your Career Compass Assistant. I can help you explore career options, educational paths, and provide personalized guidance based on your interests and goals. How can I assist you today?`,
            timestamp: new Date().toISOString(),
          }
        ]);
      } else if (savedMessages.length > 0) {
        // Use saved messages
        setMessages(savedMessages);
      } else {
        // Default welcome message
        setMessages([
          {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm your Career Compass Assistant. I can help you explore career options, educational paths, and provide personalized guidance based on your interests and goals. How can I assist you today?`,
            timestamp: new Date().toISOString(),
          }
        ]);
      }
      
      // Process URL query parameters
      const queryParam = searchParams.get('q');
      const mbtiParam = searchParams.get('mbti');
      const careerAssessmentParam = searchParams.get('career_assessment');

      if (queryParam) {
        // If we have a search query, initialize with it
        setInputValue(queryParam);
        setTimeout(() => {
          handleSendMessage(queryParam);
        }, 500);
      } else if (mbtiParam) {
        // If MBTI type is provided via URL
        const mbtiResult = StorageService.get('mbti_result');
        if (mbtiResult) {
          setTimeout(() => {
            const message = `I've completed the MBTI assessment and my personality type is ${mbtiResult.type}. What careers would be good for me based on this result?`;
            handleSendMessage(message);
          }, 500);
        }
      } else if (careerAssessmentParam === 'completed') {
        // If career assessment is completed, load the results
        const careerReport = StorageService.get('career_assessment_result');
        if (careerReport) {
          setTimeout(() => {
            const message = `I've completed the Career Assessment Test. Based on my results (MBTI: ${careerReport.mbti.type}, RIASEC: ${careerReport.riasec.dominant}-${careerReport.riasec.secondary}), what career paths would be most suitable for me?`;
            handleSendMessage(message);
          }, 500);
        }
      } else if (initialQuestion) {
        // If initialQuestion is provided via props
        setTimeout(() => {
          handleSendMessage(initialQuestion);
        }, 500);
      } else if (mbtiType) {
        // If mbtiType is provided via props
        setTimeout(() => {
          const message = `I've completed the MBTI assessment and my personality type is ${mbtiType}. What careers would be good for me based on this result?`;
          handleSendMessage(message);
        }, 500);
      }
    }
  }, [initialQuestion, mbtiType, resetOnRefresh, searchParams]);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && !isInitialRender.current) {
      StorageService.set('chat_messages', messages);
    }
  }, [messages]);
  
  const generateAssistantResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate AI response generation
    return new Promise((resolve) => {
      const careerReport = StorageService.get('career_assessment_result');
      
      // Check for MBTI result references
      if (userMessage.toLowerCase().includes('mbti') || userMessage.toLowerCase().includes('personality type')) {
        const mbtiResult = StorageService.get('mbti_result');
        if (mbtiResult) {
          setTimeout(() => {
            resolve(`Based on your MBTI personality type (${mbtiResult.type}), you would likely excel in careers that match your preferences and strengths. 
            
${mbtiResult.type} individuals often thrive in roles such as: ${mbtiResult.careers.join(', ')}.

Would you like more specific information about any of these career paths?`);
          }, 1500);
          return;
        }
      }
      
      // Check for career assessment references
      if (userMessage.toLowerCase().includes('career assessment') || userMessage.toLowerCase().includes('assessment results')) {
        if (careerReport) {
          setTimeout(() => {
            resolve(`Based on your comprehensive Career Assessment results:

**MBTI Type:** ${careerReport.mbti.type} - ${careerReport.mbti.description.split(' - ')[1] || ''}

**RIASEC Profile:** ${careerReport.riasec.dominant}-${careerReport.riasec.secondary} (${careerReport.riasec.dominant === 'R' ? 'Realistic' : careerReport.riasec.dominant === 'I' ? 'Investigative' : careerReport.riasec.dominant === 'A' ? 'Artistic' : careerReport.riasec.dominant === 'S' ? 'Social' : careerReport.riasec.dominant === 'E' ? 'Enterprising' : 'Conventional'} & ${careerReport.riasec.secondary === 'R' ? 'Realistic' : careerReport.riasec.secondary === 'I' ? 'Investigative' : careerReport.riasec.secondary === 'A' ? 'Artistic' : careerReport.riasec.secondary === 'S' ? 'Social' : careerReport.riasec.secondary === 'E' ? 'Enterprising' : 'Conventional'})

**Top Strengths:** ${careerReport.strengths.topStrengths.join(', ')}

**Workplace Traits:** ${careerReport.scenario.workplaceTraits.slice(0, 3).join(', ')}

Your assessment suggests you would excel in these career areas:

1. Technology & Data: ${careerReport.finalRecommendations.slice(0, 3).join(', ')}
2. Business & Analytics: ${careerReport.finalRecommendations.slice(3, 6).join(', ')}
3. Creative & Independent: ${careerReport.finalRecommendations.slice(6, 9).join(', ')}

Would you like more specific information about education paths, skill requirements, or job prospects for any of these careers?`);
          }, 2000);
          return;
        }
      }
      
      // Career exploration and general guidance responses
      const responses = [
        "Based on your interests, you might want to explore careers in technology, healthcare, business, or creative fields. Each of these areas offers different opportunities that could align with your skills and preferences. Would you like me to elaborate on any specific field?",
        "When considering career options, it's important to think about your values, interests, skills, and personality. Have you taken any career assessments or personality tests that might provide insights into suitable career paths?",
        "Education and skill development are crucial for career success. Depending on your goals, you might consider traditional university education, vocational training, online courses, or certifications. What kind of educational path are you most interested in?",
        "The job market is constantly evolving with technological advancements. Some growing fields include data science, artificial intelligence, healthcare technology, renewable energy, and digital marketing. Are any of these areas interesting to you?",
        "Career planning involves setting both short-term and long-term goals. It's helpful to break down your career aspirations into achievable steps and milestones. Would you like some guidance on creating a career development plan?",
        "When exploring career options, it's valuable to conduct informational interviews with professionals in fields you're interested in. This can provide realistic insights about daily work, required skills, and industry trends. Is there a specific industry you'd like to learn more about?",
        "Work-life balance is an important consideration for career satisfaction. Different careers offer varying levels of flexibility, remote work options, and schedule demands. How important is work-life balance in your career decisions?",
        "Networking is a powerful tool for career development. Building professional relationships can lead to mentorship, job opportunities, and industry knowledge. Have you been actively networking in your fields of interest?",
        "Career transitions are increasingly common in today's workplace. If you're considering a change, identifying transferable skills and gaining relevant experience in your target field are key steps. Are you thinking about a career change?",
        "Entrepreneurship and self-employment are options worth considering if you value autonomy and have an innovative idea or service to offer. Is starting your own business something you've thought about?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setTimeout(() => {
        resolve(randomResponse);
      }, 1500);
    });
  }, []);
  
  const handleSendMessage = useCallback(async (messageText?: string) => {
    const content = messageText || inputValue;
    
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input after sending
    if (!messageText) {
      setInputValue('');
    }
    
    // Generate and add assistant response
    setIsLoading(true);
    
    try {
      const assistantResponse = await generateAssistantResponse(content);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, generateAssistantResponse]);
  
  const handleEditMessage = useCallback((messageId: string, newContent: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === messageId 
          ? { ...message, content: newContent } 
          : message
      )
    );
  }, []);
  
  const handleReuseMessage = useCallback((message: ChatMessage) => {
    setInputValue(message.content);
  }, []);
  
  const handleReset = useCallback(() => {
    // Reset the chat to initial state
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: `Hi there! I'm your Career Compass Assistant. I can help you explore career options, educational paths, and provide personalized guidance based on your interests and goals. How can I assist you today?`,
        timestamp: new Date().toISOString(),
      }
    ]);
    setInputValue('');
  }, []);
  
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
};
