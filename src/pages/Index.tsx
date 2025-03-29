
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import { MessageCircle, CheckCircle, ArrowRight, Target, Award, Lightbulb, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import SuggestedPrompts from '@/components/SuggestedPrompts';
import TransitionLayout from '@/components/TransitionLayout';
import CareerExplorer from '@/components/CareerExplorer';

const ExploreCard = ({ 
  title, 
  description, 
  icon, 
  buttonText = "Explore", 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  buttonText?: string;
  onClick: () => void;
}) => (
  <Card className="h-full flex flex-col justify-between">
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-end">
      <Button onClick={onClick} className="mt-4 w-full">
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explore');
  
  const navigateToChat = (initialPrompt?: string) => {
    if (initialPrompt) {
      navigate(`/chat?q=${encodeURIComponent(initialPrompt)}`);
    } else {
      navigate('/chat');
    }
  };
  
  const handlePromptSelect = (prompt: string) => {
    navigateToChat(prompt);
  };
  
  return (
    <TransitionLayout>
      <div className="min-h-screen">
        <Navbar />
        <main className="container pt-24 pb-16 px-4">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Discover Your Ideal Career Path</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Personalized guidance for students and career changers to find their perfect career match
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ExploreCard
                title="Take the Career Assessment"
                description="Complete our 30-question assessment to discover careers that match your personality, interests, and strengths."
                icon={<Target className="h-6 w-6 text-blue-500" />}
                buttonText="Start Assessment"
                onClick={() => navigate('/career-assessment')}
              />
              
              <ExploreCard
                title="Chat with Career Assistant"
                description="Get personalized career advice, educational guidance, and answers to your career questions."
                icon={<MessageCircle className="h-6 w-6 text-green-500" />}
                buttonText="Start Chatting"
                onClick={() => navigateToChat()}
              />
              
              <ExploreCard
                title="Explore Career Options"
                description="Explore diverse career paths across different streams, industries, and educational backgrounds."
                icon={<Briefcase className="h-6 w-6 text-amber-500" />}
                buttonText="Explore Careers"
                onClick={() => setActiveTab('options')}
              />
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="explore">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Career Explorer
                </TabsTrigger>
                <TabsTrigger value="options">
                  <Award className="h-4 w-4 mr-2" />
                  Suggested Questions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="explore" className="mt-0">
                <CareerExplorer />
              </TabsContent>
              
              <TabsContent value="options" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                      Suggested Career Questions
                    </CardTitle>
                    <CardDescription>
                      Explore these questions or ask your own to get personalized career guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SuggestedPrompts onSelectPrompt={handlePromptSelect} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-12">
              <div className="max-w-2xl flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4 text-center">Why use Career Compass?</h2>
                <div className="space-y-4 text-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p>Personalized career recommendations based on your unique profile and preferences</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p>Expert guidance on educational pathways, required qualifications, and upskilling opportunities</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p>Comprehensive information on emerging career options and future job market trends</p>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="mt-6" 
                  onClick={() => navigate('/career-assessment')}
                >
                  Start Your Career Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Index;
