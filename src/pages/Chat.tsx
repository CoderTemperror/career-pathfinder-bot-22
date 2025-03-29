
import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import { Bot, PanelLeftOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import ChatInterface from '@/components/ChatInterface';
import SuggestedPromptsSidebar from '@/components/SuggestedPromptsSidebar';
import { Button } from '@/components/ui/button';

const Chat = () => {
  const [isPromptSidebarOpen, setIsPromptSidebarOpen] = useState(false);
  
  const togglePromptSidebar = () => {
    setIsPromptSidebarOpen(!isPromptSidebarOpen);
  };
  
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
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Chat;
