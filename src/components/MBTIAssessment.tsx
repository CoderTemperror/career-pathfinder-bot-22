import { useMBTIAssessment } from '@/hooks/use-mbti-assessment';
import MBTIResults from './mbti/MBTIResults';
import MBTIQuestionInterface from './mbti/MBTIQuestionInterface';

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
  
  // If there's a result, show the result component
  if (mbtiResult) {
    return <MBTIResults mbtiResult={mbtiResult} onReset={resetAssessment} />;
  }
  
  // Otherwise show the assessment interface
  return (
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
  );
};

export default MBTIAssessment;
