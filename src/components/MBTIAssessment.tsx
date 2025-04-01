
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { mbtiQuestions, calculateMBTIType, personalityDescriptions } from '@/utils/mbtiCalculator';
import StorageService from '@/services/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Book, Briefcase, Heart } from 'lucide-react';

// Import our components
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
  
  // If there's a result, show the result page
  if (mbtiResult) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-center text-2xl flex flex-col items-center">
              <span className="bg-primary/10 p-3 rounded-full mb-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </span>
              Your Personality Type: {mbtiResult.type}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <p className="text-lg leading-relaxed">{mbtiResult.description}</p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                Recommended Careers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mbtiResult.careers.map((career, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary/20 p-3 rounded-lg border border-secondary/30 flex items-center"
                  >
                    <Book className="h-4 w-4 mr-2 text-primary/70" />
                    {career}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex flex-col items-center">
              <p className="text-muted-foreground text-center mb-4">
                Want to take the assessment again?
              </p>
              <button 
                onClick={resetAssessment}
                className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
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
