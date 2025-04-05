
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingEmoji from "./RatingEmoji";
import { getRatingText } from "./utils";

interface ReviewFormProps {
  onReviewSubmit: (review: { rating: number; text: string }) => void;
}

const ReviewForm = ({ onReviewSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { toast } = useToast();

  const handleRatingSelect = (value: number) => {
    // If clicking the same rating twice, clear rating
    setRating(prevRating => prevRating === value ? 0 : value);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    onReviewSubmit({ rating, text: review });
    
    setRating(0);
    setReview("");
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });
  };

  return (
    <div className="mb-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-semibold text-center mb-8 flex items-center justify-center"
      >
        <BadgeCheck className="w-6 h-6 mr-2 text-blue-500" />
        Judge's Review
      </motion.h2>

      <Card className="max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
          <CardDescription>
            Help us improve by sharing your experience with Career Compass
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              How would you rate your experience?
            </label>
            <motion.div 
              className="flex justify-center gap-3 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <RatingEmoji
                  key={value}
                  value={value}
                  currentRating={rating}
                  onSelect={handleRatingSelect}
                />
              ))}
            </motion.div>
            <motion.p 
              className="text-center text-sm font-medium mt-2 min-h-[20px]"
              animate={{ 
                scale: rating > 0 ? [1, 1.1, 1] : 1,
                transition: { duration: 0.3 }
              }}
            >
              {getRatingText(rating)}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              What did you think of our project?
            </label>
            <Textarea
              id="review"
              placeholder="Share your feedback, suggestions, or what you liked about the project..."
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full resize-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
            />
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleSubmitReview}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewForm;
