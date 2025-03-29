
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  allQuestions, mbtiQuestions, riasecQuestions, strengthsQuestions, scenarioQuestions,
  generateCareerReport
} from '@/utils/careerAssessmentCalculator';
import StorageService from '@/services/storage';
import { useIsMobile } from '@/hooks/use-mobile';

const CareerAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  
  // Calculate section boundaries
  const sectionBoundaries = {
    1: { start: 0, end: mbtiQuestions.length - 1 },
    2: { start: mbtiQuestions.length, end: mbtiQuestions.length + riasecQuestions.length - 1 },
    3: { start: mbtiQuestions.length + riasecQuestions.length, end: mbtiQuestions.length + riasecQuestions.length + strengthsQuestions.length - 1 },
    4: { start: mbtiQuestions.length + riasecQuestions.length + strengthsQuestions.length, end: allQuestions.length - 1 }
  };
  
  // Update section based on current question index
  useEffect(() => {
    Object.entries(sectionBoundaries).forEach(([section, { start, end }]) => {
      if (currentQuestionIndex >= start && currentQuestionIndex <= end) {
        setCurrentSection(Number(section));
      }
    });
  }, [currentQuestionIndex]);
  
  // Load saved answers from storage on mount
  useEffect(() => {
    const savedAnswers = StorageService.get('career_assessment_answers');
    if (savedAnswers) {
      setAnswers(savedAnswers);
      toast.info("Previous answers loaded", {
        description: "You can continue from where you left off."
      });
    }
  }, []);
  
  // Save answers when they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      StorageService.set('career_assessment_answers', answers);
    }
  }, [answers]);
  
  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    // Only auto-advance if this is a new answer (not changing an existing one)
    if (!answers[currentQuestion.id]) {
      // Automatically move to the next question after answering
      if (currentQuestionIndex < allQuestions.length - 1) {
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
    if (Object.keys(answers).length < allQuestions.length) {
      toast.warning("Please answer all questions before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate the career assessment report
    const report = generateCareerReport(answers);
    
    // Save the report to storage for later use
    StorageService.set('career_assessment_result', report);
    
    toast.success(`Assessment completed!`, {
      description: `Your career report is ready to view.`,
    });
    
    // Delay navigation to let the user see the toast
    setTimeout(() => {
      // Navigate to results page
      navigate(`/chat?career_assessment=completed`);
      setIsSubmitting(false);
    }, 2000);
  };
  
  const resetAssessment = () => {
    if (confirm("Are you sure you want to reset all your answers?")) {
      setAnswers({});
      setCurrentQuestionIndex(0);
      StorageService.set('career_assessment_answers', {});
      toast.info("Assessment reset", {
        description: "All answers have been cleared."
      });
    }
  };
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
  };
  
  // Helper function to get button color based on answer
  const getQuestionButtonStyles = (questionIndex: number) => {
    const question = allQuestions[questionIndex];
    
    if (currentQuestionIndex === questionIndex) {
      return "pointer-events-none";
    }
    
    if (answers[question.id]) {
      return "border-blue-500 bg-blue-100 text-blue-700 hover:bg-blue-200";
    }
    
    return ""; 
  };

  // Get section title based on current section
  const getSectionTitle = () => {
    switch (currentSection) {
      case 1:
        return "Personality Assessment";
      case 2:
        return "Career Interests Assessment";
      case 3:
        return "Strengths & Behavioral Traits";
      case 4:
        return "Workplace Scenarios";
      default:
        return "Career Assessment";
    }
  };
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2">
          <div className="flex items-center justify-between sm:justify-start gap-2 mb-2 sm:mb-0">
            <span className="font-medium">Section {currentSection}/4:</span>
            <span className="text-blue-600 dark:text-blue-400">{getSectionTitle()}</span>
          </div>
          <div className="flex justify-between sm:justify-start gap-4">
            <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Question Navigation */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max py-2">
          {allQuestions.map((q, index) => (
            <Button
              key={q.id}
              variant={currentQuestionIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => jumpToQuestion(index)}
              className={`text-xs px-3 transition-colors ${getQuestionButtonStyles(index)}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Question Title */}
      <motion.div
        key={`title-${currentQuestion.id}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
        className="text-center mb-6"
      >
        <h2 className="text-xl md:text-2xl font-semibold">
          {currentQuestion.text}
        </h2>
      </motion.div>
      
      {/* Options */}
      <div className={`grid grid-cols-1 ${
        Object.keys(currentQuestion.options).length > 2 
          ? "gap-4" 
          : isMobile ? "gap-4" : "md:grid-cols-2 gap-6"
      } mb-8`}>
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <motion.div
            key={`option-${currentQuestion.id}-${key}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => handleAnswer(key)}
              className={`w-full h-full min-h-[100px] p-6 rounded-xl text-left flex flex-col justify-center transition-all duration-200 ${
                answers[currentQuestion.id] === key 
                  ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300' 
                  : 'bg-secondary/70 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                  answers[currentQuestion.id] === key ? 'bg-white text-blue-500' : 'border border-primary/50'
                }`}>
                  {answers[currentQuestion.id] === key ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm">{key}</span>}
                </div>
                <span className="text-lg">{value}</span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetAssessment} 
            disabled={isSubmitting || Object.keys(answers).length === 0}
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            Reset
          </Button>
        </div>
        
        {currentQuestionIndex === allQuestions.length - 1 ? (
          <Button 
            onClick={handleComplete} 
            disabled={isSubmitting || !answers[currentQuestion.id]}
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
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={!answers[currentQuestion.id]}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Progress Saving Indicator */}
      <div className="flex justify-center mt-4">
        <div className="text-xs text-muted-foreground flex items-center">
          <Save className="h-3 w-3 mr-1" />
          Progress auto-saved. You can continue later.
        </div>
      </div>
    </div>
  );
};

export default CareerAssessment;
