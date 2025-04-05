
import { motion } from "framer-motion";
import { SmilePlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

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

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Great";
      case 5:
        return "Excellent";
      default:
        return "No rating";
    }
  };

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
          <Card key={index} className="bg-muted/40">
            <CardContent className="pt-6">
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 mr-1">
                    {i < item.rating ? (
                      <SmilePlusIcon className="w-full h-full text-yellow-500" />
                    ) : (
                      <SmilePlusIcon className="w-full h-full text-muted-foreground/20" />
                    )}
                  </div>
                ))}
                <span className="ml-2 text-sm font-medium">{getRatingText(item.rating)}</span>
              </div>
              <p className="text-sm">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default PreviousReviews;
