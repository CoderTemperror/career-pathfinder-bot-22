
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

  // Base styles that don't have color effects
  const baseStyles = isSelected 
    ? 'bg-white border-2 shadow-lg' 
    : 'bg-secondary/70 hover:shadow-md';
  
  // Selected state styling
  const selectedStyles = isSelected
    ? (color === 'blue' 
        ? 'border-blue-500 ring-2 ring-blue-300' 
        : 'border-green-500 ring-2 ring-green-300')
    : '';
  
  // Hover state styling (only shows on hover/touch)
  const hoverStyles = !isSelected
    ? (color === 'blue' 
        ? 'hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-200/50' 
        : 'hover:border-green-500 hover:bg-green-50 hover:text-green-700 hover:shadow-green-200/50')
    : '';

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
        className={`w-full h-full min-h-[150px] p-6 md:p-8 rounded-xl text-left flex flex-col justify-center transition-all duration-300 border ${
          baseStyles
        } ${selectedStyles} ${hoverStyles}`}
      >
        <div className="flex items-start gap-4">
          <motion.div 
            animate={isSelected ? { 
              scale: [1, 1.2, 1],
              transition: { duration: 0.5 }
            } : {}}
            className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
              isSelected 
                ? `bg-${color === 'blue' ? 'blue' : 'green'}-100 text-${color === 'blue' ? 'blue' : 'green'}-500` 
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
