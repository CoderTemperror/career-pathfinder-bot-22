
import { motion } from "framer-motion";
import { FrownIcon, MehIcon, SmileIcon, SmilePlusIcon, HeartIcon } from "lucide-react";

interface RatingEmojiProps {
  value: number;
  currentRating: number;
  onSelect: (rating: number) => void;
}

const RatingEmoji = ({
  value,
  currentRating,
  onSelect,
}: RatingEmojiProps) => {
  const getEmoji = () => {
    switch (value) {
      case 1:
        return <FrownIcon className="w-full h-full" />;
      case 2:
        return <MehIcon className="w-full h-full" />;
      case 3:
        return <SmileIcon className="w-full h-full" />;
      case 4:
        return <SmilePlusIcon className="w-full h-full" />;
      case 5:
        return <HeartIcon className="w-full h-full" />;
      default:
        return null;
    }
  };

  const isSelected = currentRating === value;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isSelected ? { 
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0, -10, 0],
        transition: { duration: 0.5 }
      } : {}}
      onClick={() => onSelect(value)}
      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
        isSelected
          ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 ring-2 ring-yellow-300 dark:ring-yellow-600"
          : "text-muted-foreground hover:text-yellow-500 bg-secondary"
      }`}
    >
      {getEmoji()}
    </motion.button>
  );
};

export default RatingEmoji;
