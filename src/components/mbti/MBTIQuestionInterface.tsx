
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { MBTIAnswer } from '@/hooks/use-mbti-assessment';
import ProgressIndicator from './ProgressIndicator';
import QuestionNavigation from './QuestionNavigation';
import QuestionTitle from './QuestionTitle';
import AnswerOption from './AnswerOption';
import NavigationControls from './NavigationControls';
import AutoSaveIndicator from './AutoSaveIndicator';

interface MBTIQuestionInterfaceProps {
  currentQuestionIndex: number;
  currentQuestion: any;
  totalQuestions: number;
  questions: any[];
  answers: MBTIAnswer;
  isSubmitting: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isCurrentQuestionAnswered: boolean;
  hasAnswers: boolean;
  onAnswer: (answer: 'A' | 'B') => void;
  onBack: () => void;
  onJumpToQuestion: (index: number) => void;
  onComplete: () => void;
  onReset: () => void;
}

const MBTIQuestionInterface = ({
  currentQuestionIndex,
  currentQuestion,
  totalQuestions,
  questions,
  answers,
  isSubmitting,
  isFirstQuestion,
  isLastQuestion,
  isCurrentQuestionAnswered,
  hasAnswers,
  onAnswer,
  onBack,
  onJumpToQuestion,
  onComplete,
  onReset,
}: MBTIQuestionInterfaceProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ProgressIndicator 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={totalQuestions} 
      />
      
      <QuestionNavigation 
        questions={questions}
        currentIndex={currentQuestionIndex}
        answers={answers}
        onJumpToQuestion={onJumpToQuestion}
      />
      
      <QuestionTitle questionId={currentQuestion.id} />
      
      {/* Side-by-side choice boxes */}
      <div className={`grid grid-cols-1 ${isMobile ? "gap-4" : "md:grid-cols-2 gap-6"} mb-8`}>
        <AnswerOption 
          key={`optionA-${currentQuestion.id}`}
          optionType="A"
          optionText={currentQuestion.optionA}
          isSelected={answers[currentQuestion.id] === 'A'}
          onClick={() => onAnswer('A')}
          color="blue"
          questionId={currentQuestion.id} // Pass the questionId
        />
        
        <AnswerOption 
          key={`optionB-${currentQuestion.id}`}
          optionType="B"
          optionText={currentQuestion.optionB}
          isSelected={answers[currentQuestion.id] === 'B'}
          onClick={() => onAnswer('B')}
          color="green"
          questionId={currentQuestion.id} // Pass the questionId
        />
      </div>
      
      <NavigationControls 
        onBack={onBack}
        onNext={() => onJumpToQuestion(currentQuestionIndex + 1)}
        onComplete={onComplete}
        onReset={onReset}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        isCurrentQuestionAnswered={isCurrentQuestionAnswered}
        isSubmitting={isSubmitting}
        hasAnswers={hasAnswers}
      />
      
      <AutoSaveIndicator />
    </div>
  );
};

export default MBTIQuestionInterface;
