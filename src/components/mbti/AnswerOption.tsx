
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface AnswerOptionProps {
  optionType: 'A' | 'B';
  optionText: string;
  isSelected: boolean;
  onClick: () => void;
  color: 'blue' | 'green';
}

const AnswerOption = ({
  optionType,
  optionText,
  isSelected,
  onClick,
  color
}: AnswerOptionProps) => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
  };

  // Changed the color selection logic to be more explicit about the selected state
  const getColorClasses = (isSelected: boolean, color: 'blue' | 'green') => {
    if (!isSelected) {
      return 'bg-secondary/70 hover:bg-slate-100 hover:text-slate-800 hover:shadow-md';
    }
    
    return color === 'blue' 
      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg ring-2 ring-blue-300'
      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg ring-2 ring-green-300';
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={onClick}
        className={`w-full h-full min-h-[150px] p-6 md:p-8 rounded-xl text-left flex flex-col justify-center transition-all duration-300 ${
          getColorClasses(isSelected, color)
        }`}
      >
        <div className="flex items-start gap-4">
          <motion.div 
            animate={isSelected ? { 
              scale: [1, 1.2, 1],
              transition: { duration: 0.5 }
            } : {}}
            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
              isSelected 
                ? `bg-white text-${color === 'blue' ? 'blue' : 'green'}-500` 
                : 'border border-primary/50'
            }`}
          >
            {isSelected ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm">{optionType}</span>}
          </motion.div>
          <span className="text-lg font-medium">{optionText}</span>
        </div>
      </button>
    </motion.div>
  );
};

export default AnswerOption;
