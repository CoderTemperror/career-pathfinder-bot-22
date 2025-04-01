
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { RotateCcw, Lightbulb, PersonStanding } from 'lucide-react';

interface MBTIResultsProps {
  mbtiResult: {
    type: string;
    description: string;
    careers: string[];
  };
  onReset: () => void;
}

const MBTIResults = ({ mbtiResult, onReset }: MBTIResultsProps) => {
  const isMobile = useIsMobile();
  
  return (
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
            <Lightbulb className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Assessment is Complete</h2>
            <p className={`${isMobile ? 'text-lg' : ''} text-foreground mb-4`}>
              Your personality type is <span className="font-bold text-blue-500">{mbtiResult.type}</span>
            </p>
            <p className="mb-4 text-foreground">{mbtiResult.description}</p>
            
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 mt-2`}>
              <Button 
                variant="outline" 
                onClick={onReset} 
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
              >
                <PersonStanding className="h-4 w-4 text-blue-500" />
                <span>{career}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MBTIResults;
