
import { useMBTIAssessment } from '@/hooks/use-mbti-assessment';
import MBTIResults from './mbti/MBTIResults';
import MBTIQuestionInterface from './mbti/MBTIQuestionInterface';
import { motion } from 'framer-motion';

const MBTIAssessment = () => {
  const {
    currentQuestionIndex,
    currentQuestion,
    totalQuestions,
    questions,
    answers,
    isSubmitting,
    mbtiResult,
    isFirstQuestion,
    isLastQuestion,
    isCurrentQuestionAnswered,
    hasAnswers,
    handleAnswer,
    handleBack,
    jumpToQuestion,
    handleComplete,
    resetAssessment
  } = useMBTIAssessment();
  
  // If there's a result, show the result component (without the assessment title)
  if (mbtiResult) {
    return <MBTIResults mbtiResult={mbtiResult} onReset={resetAssessment} />;
  }
  
  // Otherwise show the assessment interface
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          className="text-2xl font-semibold" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          MBTI Assessment
        </motion.h2>
        
        <motion.div 
          className="flex items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-amber-500 dark:text-amber-400">Σ</span>
          <span>{totalQuestions} Questions</span>
        </motion.div>
      </div>
      
      <MBTIQuestionInterface
        currentQuestionIndex={currentQuestionIndex}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        questions={questions}
        answers={answers}
        isSubmitting={isSubmitting}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        isCurrentQuestionAnswered={isCurrentQuestionAnswered}
        hasAnswers={hasAnswers}
        onAnswer={handleAnswer}
        onBack={handleBack}
        onJumpToQuestion={jumpToQuestion}
        onComplete={handleComplete}
        onReset={resetAssessment}
      />
    </>
  );
};

export default MBTIAssessment;
