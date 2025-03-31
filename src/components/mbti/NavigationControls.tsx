
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

interface NavigationControlsProps {
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  onReset: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isCurrentQuestionAnswered: boolean;
  isSubmitting: boolean;
  hasAnswers: boolean;
}

const NavigationControls = ({
  onBack,
  onNext,
  onComplete,
  onReset,
  isFirstQuestion,
  isLastQuestion,
  isCurrentQuestionAnswered,
  isSubmitting,
  hasAnswers,
}: NavigationControlsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstQuestion || isSubmitting}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onReset} 
          disabled={isSubmitting || !hasAnswers}
          className="text-destructive border-destructive hover:bg-destructive/10"
        >
          Reset
        </Button>
      </div>
      
      {isLastQuestion ? (
        <Button 
          onClick={onComplete} 
          disabled={isSubmitting || !isCurrentQuestionAnswered}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              See Results
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!isCurrentQuestionAnswered}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;
