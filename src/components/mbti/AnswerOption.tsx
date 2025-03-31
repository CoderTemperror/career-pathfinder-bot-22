
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
        duration: 0.3,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.19, 1, 0.22, 1],
      } 
    },
  };

  const colorClasses = {
    blue: {
      selected: 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300',
      default: 'bg-secondary/70 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md'
    },
    green: {
      selected: 'bg-green-500 text-white shadow-lg ring-2 ring-green-300',
      default: 'bg-secondary/70 hover:bg-green-100 hover:text-green-700 hover:shadow-md'
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={onClick}
        className={`w-full h-full min-h-[150px] p-6 md:p-8 rounded-xl text-left flex flex-col justify-center transition-all duration-200 ${
          isSelected 
            ? colorClasses[color].selected
            : colorClasses[color].default
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
            isSelected ? `bg-white text-${color}-500` : 'border border-primary/50'
          }`}>
            {isSelected ? <CheckCircle className="h-5 w-5" /> : <span className="text-sm">{optionType}</span>}
          </div>
          <span className="text-lg">{optionText}</span>
        </div>
      </button>
    </motion.div>
  );
};

export default AnswerOption;
