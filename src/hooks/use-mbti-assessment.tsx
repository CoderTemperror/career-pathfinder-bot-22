
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StorageService from '@/services/storage';
import { 
  mbtiQuestions, 
  calculateMBTIResult, 
  personalityDescriptions 
} from '@/utils/mbti';

export interface MBTIAnswer {
  [key: number]: 'A' | 'B';
}

export interface MBTIResult {
  type: string;
  description: string;
  careers: string[];
  timestamp?: string;
}

export const useMBTIAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<MBTIResult | null>(null);
  
  const currentQuestion = mbtiQuestions[currentQuestionIndex];
  
  // Load saved answers from storage on mount
  useEffect(() => {
    const savedMBTIAnswers = StorageService.get('mbti_answers');
    if (savedMBTIAnswers) {
      setAnswers(savedMBTIAnswers);
    }
    
    // Check if result already exists
    const savedResult = StorageService.get('mbti_result');
    if (savedResult) {
      setMbtiResult(savedResult);
    }
  }, []);
  
  // Save answers when they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      StorageService.set('mbti_answers', answers);
    }
  }, [answers]);
  
  const handleAnswer = (answer: 'A' | 'B') => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    // Only auto-advance if this is a new answer (not changing an existing one)
    if (!answers[currentQuestion.id]) {
      // Automatically move to the next question after answering
      if (currentQuestionIndex < mbtiQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleComplete = () => {
    if (Object.keys(answers).length < mbtiQuestions.length) {
      toast.warning("Please answer all questions before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    // Convert answers to format needed for calculation
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => {
      // Find the corresponding question to get the dimension
      const question = mbtiQuestions.find(q => q.id === parseInt(questionId));
      return {
        questionId: parseInt(questionId),
        selectedOption,
        dimension: question?.dimension || "I-E" // Fallback dimension
      };
    });
    
    // Calculate MBTI type
    const result = calculateMBTIResult(formattedAnswers);
    const mbtiType = result.type;
    
    // Get personality information
    const personalityInfo = personalityDescriptions[mbtiType] || {
      description: "Your personality type combines several traits.",
      careers: []
    };
    
    // Save MBTI results to storage for later use
    const resultData = {
      type: mbtiType,
      description: personalityInfo.description,
      careers: personalityInfo.careers,
      timestamp: new Date().toISOString()
    };
    
    StorageService.set('mbti_result', resultData);
    
    // Save MBTI type separately for persistent access from chat
    StorageService.saveMbtiType(mbtiType);
    
    setMbtiResult(resultData);
    setIsSubmitting(false);
    
    toast.success(`Your personality type is ${mbtiType}!`);
  };
  
  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setMbtiResult(null);
    StorageService.set('mbti_answers', {});
    // Also clear the MBTI result when assessment is reset
    StorageService.set('mbti_result', null);
    // Clear the MBTI type when assessment is reset
    StorageService.saveMbtiType(null);
    toast.info("Assessment reset", {
      description: "All answers have been cleared."
    });
  };
  
  return {
    currentQuestionIndex,
    currentQuestion,
    answers,
    isSubmitting,
    mbtiResult,
    totalQuestions: mbtiQuestions.length,
    handleAnswer,
    handleBack,
    jumpToQuestion,
    handleComplete,
    resetAssessment,
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === mbtiQuestions.length - 1,
    isCurrentQuestionAnswered: !!answers[currentQuestion?.id],
    hasAnswers: Object.keys(answers).length > 0,
    questions: mbtiQuestions
  };
};
