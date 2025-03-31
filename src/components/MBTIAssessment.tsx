
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { mbtiQuestions, calculateMBTIType, personalityDescriptions } from '@/utils/mbtiCalculator';
import StorageService from '@/services/storage';

// Import our new components
import ProgressIndicator from './mbti/ProgressIndicator';
import QuestionNavigation from './mbti/QuestionNavigation';
import QuestionTitle from './mbti/QuestionTitle';
import AnswerOption from './mbti/AnswerOption';
import NavigationControls from './mbti/NavigationControls';
import AutoSaveIndicator from './mbti/AutoSaveIndicator';

const MBTIAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: 'A' | 'B'}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const currentQuestion = mbtiQuestions[currentQuestionIndex];
  
  // Load saved answers from storage on mount
  useEffect(() => {
    const savedMBTIAnswers = StorageService.get('mbti_answers');
    if (savedMBTIAnswers) {
      setAnswers(savedMBTIAnswers);
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
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer
    }));
    
    // Calculate MBTI type
    const mbtiType = calculateMBTIType(formattedAnswers);
    
    // Get personality information
    const personalityInfo = personalityDescriptions[mbtiType] || {
      description: "Your personality type combines several traits.",
      careers: []
    };
    
    // Save MBTI results to storage for later use
    StorageService.set('mbti_result', {
      type: mbtiType,
      description: personalityInfo.description,
      careers: personalityInfo.careers,
      timestamp: new Date().toISOString()
    });
    
    // Save MBTI type separately for persistent access from chat
    StorageService.saveMbtiType(mbtiType);
    
    toast.success(`Your personality type is ${mbtiType}!`, {
      description: personalityInfo.description,
    });
    
    // Delay navigation to let the user see the toast
    setTimeout(() => {
      // Navigate to chat with the MBTI type as a parameter
      navigate(`/chat?mbti=${mbtiType}`);
      setIsSubmitting(false);
    }, 2000);
  };
  
  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    StorageService.set('mbti_answers', {});
    // Also clear the MBTI result when assessment is reset
    StorageService.set('mbti_result', null);
    // Clear the MBTI type when assessment is reset
    StorageService.saveMbtiType(null);
    toast.info("Assessment reset", {
      description: "All answers have been cleared."
    });
  };
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ProgressIndicator 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={mbtiQuestions.length} 
      />
      
      <QuestionNavigation 
        questions={mbtiQuestions}
        currentIndex={currentQuestionIndex}
        answers={answers}
        onJumpToQuestion={jumpToQuestion}
      />
      
      <QuestionTitle questionId={currentQuestion.id} />
      
      {/* Side-by-side choice boxes */}
      <div className={`grid grid-cols-1 ${isMobile ? "gap-4" : "md:grid-cols-2 gap-6"} mb-8`}>
        <AnswerOption 
          optionType="A"
          optionText={currentQuestion.optionA}
          isSelected={answers[currentQuestion.id] === 'A'}
          onClick={() => handleAnswer('A')}
          color="blue"
        />
        
        <AnswerOption 
          optionType="B"
          optionText={currentQuestion.optionB}
          isSelected={answers[currentQuestion.id] === 'B'}
          onClick={() => handleAnswer('B')}
          color="green"
        />
      </div>
      
      <NavigationControls 
        onBack={handleBack}
        onNext={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        onComplete={handleComplete}
        onReset={resetAssessment}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === mbtiQuestions.length - 1}
        isCurrentQuestionAnswered={!!answers[currentQuestion.id]}
        isSubmitting={isSubmitting}
        hasAnswers={Object.keys(answers).length > 0}
      />
      
      <AutoSaveIndicator />
    </div>
  );
};

export default MBTIAssessment;
