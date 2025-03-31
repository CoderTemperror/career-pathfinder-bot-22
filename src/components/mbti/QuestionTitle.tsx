
import { motion } from 'framer-motion';

interface QuestionTitleProps {
  questionId: number;
}

const QuestionTitle = ({ questionId }: QuestionTitleProps) => {
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

  return (
    <motion.div
      key={`title-${questionId}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      className="text-center mb-6"
    >
      <h2 className="text-xl md:text-2xl font-semibold">
        Which statement describes you better?
      </h2>
    </motion.div>
  );
};

export default QuestionTitle;
