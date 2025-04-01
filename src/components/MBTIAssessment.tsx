
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { mbtiQuestions, calculateMBTIType, personalityDescriptions } from '@/utils/mbtiCalculator';
import StorageService from '@/services/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Book, Briefcase, Heart, ChevronRight, RotateCcw, PersonStanding } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import our components
import ProgressIndicator from './mbti/ProgressIndicator';
import QuestionNavigation from './mbti/QuestionNavigation';
import QuestionTitle from './mbti/QuestionTitle';
import AnswerOption from './mbti/AnswerOption';
import NavigationControls from './mbti/NavigationControls';
import AutoSaveIndicator from './mbti/AutoSaveIndicator';
import { motion } from 'framer-motion';

const MBTIAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: 'A' | 'B'}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<{
    type: string;
    description: string;
    careers: string[];
  } | null>(null);
  const isMobile = useIsMobile();
  
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
    const result = {
      type: mbtiType,
      description: personalityInfo.description,
      careers: personalityInfo.careers,
      timestamp: new Date().toISOString()
    };
    
    StorageService.set('mbti_result', result);
    
    // Save MBTI type separately for persistent access from chat
    StorageService.saveMbtiType(mbtiType);
    
    setMbtiResult(result);
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
  
  // If there's a result, show the result in the context of the main page
  if (mbtiResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className={`bg-primary/10 border border-primary/20 rounded-lg p-6 ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className={`flex ${isMobile ? 'flex-col items-center text-center' : 'items-start'} gap-4`}>
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full"
            >
              <Lightbulb className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Assessment is Complete</h2>
              <p className={`${isMobile ? 'text-lg' : ''} text-foreground mb-4`}>
                Your personality type is <span className="font-bold text-blue-500">{mbtiResult.type}</span>
              </p>
              <p className="mb-4 text-foreground">{mbtiResult.description}</p>
              
              <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 mt-2`}>
                <Button 
                  variant="outline" 
                  onClick={resetAssessment} 
                  className={`hover:border-rose-400 hover:text-rose-500 transition-all duration-300 ${isMobile ? 'py-6' : ''}`}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {mbtiResult.careers && mbtiResult.careers.length > 0 && (
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Career Paths</h3>
            <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-3`}>
              {mbtiResult.careers.map((career: string, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                  className="bg-secondary/20 border rounded-md p-3 flex items-center gap-2 transition-all duration-200 cursor-pointer hover:border-blue-400"
                >
                  <PersonStanding className="h-4 w-4 text-blue-500" />
                  <span>{career}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }
  
  // Continue with the assessment flow
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
