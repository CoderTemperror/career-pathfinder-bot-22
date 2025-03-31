import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  PersonStanding, 
  Brain, 
  PanelRight, 
  Sigma, 
  ChevronRight, 
  BadgeCheck,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mbtiQuestions } from '@/utils/mbtiCalculator';
import MBTIAssessment from '@/components/MBTIAssessment';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import StorageService from '@/services/storage';

const MBTIPage = () => {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<any>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if assessment was completed
    const savedResult = StorageService.get('mbti_result');
    const savedAnswers = StorageService.get('mbti_answers') || {};
    const allQuestionsAnswered = Object.keys(savedAnswers).length === mbtiQuestions.length;
    
    // Only consider the assessment complete if we have a result AND all questions are answered
    if (savedResult && allQuestionsAnswered) {
      setHasCompletedAssessment(true);
      setMbtiResult(savedResult);
    } else {
      setHasCompletedAssessment(false);
      setMbtiResult(null);
    }
  }, []);
  
  const startTest = () => {
    setHasCompletedAssessment(false);
  };
  
  const retakeTest = () => {
    // Remove confirmation dialog and directly reset the test
    // Clear all MBTI data
    StorageService.set('mbti_answers', {});
    StorageService.set('mbti_result', null);
    StorageService.saveMbtiType(null);
    setHasCompletedAssessment(false);
    setMbtiResult(null);
  };
  
  return (
    <TransitionLayout>
      <Navbar />
      <div className="container max-w-6xl mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Personality Assessment</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your MBTI personality type to get career recommendations tailored to your natural strengths and preferences.
          </p>
        </div>
        
        {hasCompletedAssessment ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Assessment is Complete</h2>
                  <p className="text-muted-foreground mb-4">
                    Your personality type is <span className="font-bold text-primary">{mbtiResult.type}</span>
                  </p>
                  <p className="mb-4">{mbtiResult.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Button onClick={() => navigate('/chat')}>
                      Chat with Career Advisor
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={retakeTest}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mbtiResult.careers.map((career: string, index: number) => (
                    <div 
                      key={index} 
                      className="bg-secondary/20 border rounded-md p-3 flex items-center gap-2"
                    >
                      <PersonStanding className="h-4 w-4 text-primary" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">MBTI Assessment</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sigma className="h-4 w-4" />
                <span>{mbtiQuestions.length} Questions</span>
              </div>
            </div>
            
            <MBTIAssessment />
          </div>
        )}
      </div>
    </TransitionLayout>
  );
};

export default MBTIPage;
