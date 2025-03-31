
import { Button } from "@/components/ui/button";

interface QuestionNavigationProps {
  questions: Array<{ id: number }>;
  currentIndex: number;
  answers: {[key: number]: 'A' | 'B'};
  onJumpToQuestion: (index: number) => void;
}

const QuestionNavigation = ({ 
  questions, 
  currentIndex, 
  answers, 
  onJumpToQuestion 
}: QuestionNavigationProps) => {
  
  // Helper function to get button color based on answer
  const getQuestionButtonStyles = (questionIndex: number) => {
    const question = questions[questionIndex];
    
    if (currentIndex === questionIndex) {
      return "pointer-events-none";
    }
    
    if (answers[question.id] === 'A') {
      return "border-blue-500 bg-blue-100 text-blue-700 hover:bg-blue-200";
    } else if (answers[question.id] === 'B') {
      return "border-green-500 bg-green-100 text-green-700 hover:bg-green-200";
    }
    
    return ""; 
  };
  
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max py-2">
        {questions.map((q, index) => (
          <Button
            key={q.id}
            variant={currentIndex === index ? "default" : "outline"}
            size="sm"
            onClick={() => onJumpToQuestion(index)}
            className={`text-xs px-3 transition-colors ${getQuestionButtonStyles(index)}`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
