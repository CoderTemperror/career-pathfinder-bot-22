
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import { Bot, PanelLeftOpen, ListFilter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import ChatInterface from '@/components/ChatInterface';
import SuggestedPromptsSidebar from '@/components/SuggestedPromptsSidebar';
import CareerReportDisplay from '@/components/CareerReportDisplay';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import StorageService from '@/services/storage';
import type { CareerReport } from '@/utils/careerAssessmentCalculator';

const Chat = () => {
  const [isPromptSidebarOpen, setIsPromptSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [showResults, setShowResults] = useState(false);
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null);
  
  const togglePromptSidebar = () => {
    setIsPromptSidebarOpen(!isPromptSidebarOpen);
  };
  
  // Check for career assessment parameter
  useEffect(() => {
    const careerAssessmentParam = searchParams.get('career_assessment');
    if (careerAssessmentParam === 'completed') {
      const savedReport = StorageService.get('career_assessment_result');
      if (savedReport) {
        setCareerReport(savedReport);
        setShowResults(true);
      }
    }
  }, [searchParams]);
  
  const handlePromptSelect = (prompt: string) => {
    // This will be handled by the ChatInterface component
    console.log("Selected prompt:", prompt);
  };
  
  return (
    <TransitionLayout>
      <div className="min-h-screen">
        <Navbar />
        
        <SuggestedPromptsSidebar 
          onSelectPrompt={handlePromptSelect}
          isOpen={isPromptSidebarOpen}
          onToggle={togglePromptSidebar}
        />
        
        <main className="container pt-20 pb-4 px-0 md:px-4 h-[calc(100vh-80px)] flex flex-col">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-blue-500 mr-2" />
                <h1 className="text-lg font-medium">Career Assistant</h1>
              </div>
              
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={togglePromptSidebar}
                  className="flex items-center gap-2"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Suggested Prompts</span>
                </Button>
                
                {careerReport && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowResults(!showResults)}
                    className="ml-2 flex items-center gap-2"
                  >
                    <ListFilter className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {showResults ? "Hide Assessment Results" : "Show Assessment Results"}
                    </span>
                  </Button>
                )}
              </div>
            </div>
            
            {showResults && careerReport ? (
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <CareerReportDisplay report={careerReport} />
              </div>
            ) : (
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Chat;
