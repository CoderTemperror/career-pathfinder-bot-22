
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
  
  const handleCareerClick = (career: string) => {
    // Navigate to chat with a specific question about the selected career
    const question = `Tell me more about a career as a ${career}`;
    navigate(`/chat?question=${encodeURIComponent(question)}`);
  };
  
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
        
        {hasCompletedAssessment ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className={`bg-primary/10 border border-primary/20 rounded-lg p-6 ${isMobile ? 'mb-6' : 'mb-8'}`}>
              <div className={`flex ${isMobile ? 'flex-col items-center text-center' : 'items-start'} gap-4`}>
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                  }}
                  className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full"
                >
                  <BadgeCheck className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Assessment is Complete</h2>
                  <p className={`${isMobile ? 'text-lg' : ''} text-muted-foreground mb-4`}>
                    Your personality type is <span className="font-bold text-blue-500">{mbtiResult.type}</span>
                  </p>
                  <p className="mb-4">{mbtiResult.description}</p>
                  
                  <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 mt-2`}>
                    <Button 
                      onClick={() => navigate('/chat')} 
                      className={`bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 ${isMobile ? 'py-6' : ''}`}
                    >
                      Chat with Career Advisor
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={retakeTest} 
                      className={`hover:border-rose-400 hover:text-rose-500 transition-all duration-300 ${isMobile ? 'py-6' : ''}`}
                    >
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
                <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-3`}>
                  {mbtiResult.careers.map((career: string, index: number) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                      className="bg-secondary/20 border rounded-md p-3 flex items-center gap-2 transition-all duration-200 cursor-pointer hover:border-blue-400"
                      onClick={() => handleCareerClick(career)}
                    >
                      <PersonStanding className="h-4 w-4 text-blue-500" />
                      <span>{career}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
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
        )}
      </div>
    </TransitionLayout>
  );
};

export default MBTIPage;
