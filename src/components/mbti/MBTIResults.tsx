
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface MBTIResultsProps {
  mbtiResult: {
    type: string;
    description: string;
    careers: string[];
  };
  onReset: () => void;
}

const MBTIResults = ({ mbtiResult, onReset }: MBTIResultsProps) => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const handleCareerClick = (career: string) => {
    setSelectedCareer(career === selectedCareer ? null : career);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="bg-emerald-500 h-16 w-16 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">Your Assessment is Complete</h2>
          <p className="text-lg text-foreground mb-4">
            Your personality type is <span className="font-bold text-blue-500">{mbtiResult.type}</span>
          </p>
          <p className="mb-6 text-muted-foreground">{mbtiResult.description}</p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px]">
                Chat with Career Advisor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={onReset} 
              className="min-w-[150px]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Test
            </Button>
          </div>
        </div>
      </div>
      
      {mbtiResult.careers && mbtiResult.careers.length > 0 && (
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recommended Career Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mbtiResult.careers.map((career: string, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-secondary/20 border rounded-md p-3 cursor-pointer flex justify-between items-center gap-2 transition-all duration-200 hover:border-blue-400 ${
                  selectedCareer === career ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => handleCareerClick(career)}
              >
                <span>{career}</span>
                <ExternalLink className="h-4 w-4 text-blue-500" />
              </motion.div>
            ))}
          </div>
          
          {selectedCareer && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-medium text-lg text-blue-600 dark:text-blue-400 mb-2">{selectedCareer}</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn more about careers in {selectedCareer} and explore education pathways, job outlook, and skill requirements.
              </p>
              <div className="flex gap-3">
                <Link to={`/chat?prompt=Tell me about ${encodeURIComponent(selectedCareer)} careers`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Ask for Details
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(`${selectedCareer} career information`)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline">
                    Search Online
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MBTIResults;
