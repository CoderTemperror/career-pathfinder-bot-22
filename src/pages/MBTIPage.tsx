
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sigma } from 'lucide-react';
import MBTIAssessment from '@/components/MBTIAssessment';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import StorageService from '@/services/storage';
import { mbtiQuestions } from '@/utils/mbtiCalculator';

const MBTIPage = () => {
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<any>(null);
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
  
  return (
    <TransitionLayout>
      <Navbar />
      <div className="container max-w-6xl mx-auto pt-24 pb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Personality Assessment
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your MBTI personality type to get career recommendations tailored to your natural strengths and preferences.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">MBTI Assessment</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sigma className="h-4 w-4 text-amber-500" />
              <span>{mbtiQuestions.length} Questions</span>
            </div>
          </div>
          
          <MBTIAssessment />
        </motion.div>
      </div>
    </TransitionLayout>
  );
};

export default MBTIPage;
