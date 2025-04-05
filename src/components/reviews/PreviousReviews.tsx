
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getRatingText } from "./utils";

interface ReviewItem {
  rating: number;
  text: string;
}

interface PreviousReviewsProps {
  reviews: ReviewItem[];
}

const PreviousReviews = ({ reviews }: PreviousReviewsProps) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-xl font-medium mb-4">Previous Feedback</h3>
      <div className="space-y-4">
        {reviews.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-muted/40 hover:bg-muted/60 transition-colors duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-5 h-5 mr-1"
                      initial={{ rotate: 0 }}
                      animate={i < item.rating ? { 
                        rotate: [0, 15, 0],
                        transition: { 
                          delay: i * 0.1,
                          duration: 0.5,
                          ease: "easeInOut"
                        }
                      } : {}}
                    >
                      <Star 
                        className={`w-full h-full ${i < item.rating ? "text-yellow-400" : "text-muted-foreground/20"}`}
                        fill={i < item.rating ? "currentColor" : "none"}
                      />
                    </motion.div>
                  ))}
                  <span className="ml-2 text-sm font-medium">{getRatingText(item.rating)}</span>
                </div>
                <p className="text-sm">{item.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PreviousReviews;
