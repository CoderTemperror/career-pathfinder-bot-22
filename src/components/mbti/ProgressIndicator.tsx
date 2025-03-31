
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ProgressIndicator = ({ 
  currentQuestionIndex, 
  totalQuestions 
}: ProgressIndicatorProps) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressIndicator;
