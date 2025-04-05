
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
  // Create an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      {stars.map((starValue) => {
        const isSelected = currentRating >= starValue;
        
        return (
          <motion.button
            key={starValue}
            type="button"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, 15, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            animate={isSelected ? { 
              scale: [1, 1.3, 1],
              rotate: [0, 20, 0],
              transition: { duration: 0.5 }
            } : {}}
            onClick={() => onSelect(starValue)}
            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
              isSelected
                ? "text-yellow-400"
                : "text-muted-foreground hover:text-yellow-300"
            }`}
            aria-label={`Rate ${starValue} stars`}
          >
            <Star 
              className="w-8 h-8" 
              fill={isSelected ? "currentColor" : "none"} 
              strokeWidth={isSelected ? 1 : 2} 
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default RatingEmoji;
