
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import CareerAssessment from '@/components/CareerAssessment';
import StorageService from '@/services/storage';
import type { CareerReport } from '@/utils/careerAssessmentCalculator';
import SimplifiedCareerReport from '@/components/SimplifiedCareerReport';
import { Button } from '@/components/ui/button';
import { RefreshCcw, MessageSquareText } from 'lucide-react';

const CareerAssessmentPage = () => {
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if there's a saved report
    const savedReport = StorageService.get('career_assessment_result');
    if (savedReport) {
      setCareerReport(savedReport);
      setShowResults(true);
    }
  }, []);
  
  const handleRetakeAssessment = () => {
    // Clear the saved report and answers
    StorageService.remove('career_assessment_result');
    StorageService.remove('career_assessment_answers');
    setCareerReport(null);
    setShowResults(false);
  };
  
  const handleContinueToChat = () => {
    navigate('/chat?career_assessment=completed');
  };

  return (
    <TransitionLayout>
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-5xl pt-24 pb-16 px-4">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {showResults && careerReport ? (
              <div className="space-y-6">
                <SimplifiedCareerReport report={careerReport} />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handleRetakeAssessment}
                    className="flex items-center gap-2"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Retake Assessment
                  </Button>
                  
                  <Button 
                    onClick={handleContinueToChat}
                    className="flex items-center gap-2"
                  >
                    <MessageSquareText className="h-4 w-4" />
                    Continue with Career Assistant
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold mb-3">Career Assessment Test</h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Complete this 30-question assessment to discover your ideal career path based on your personality traits, interests, strengths, and workplace preferences.
                  </p>
                </div>
                
                <CareerAssessment />
              </>
            )}
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default CareerAssessmentPage;
