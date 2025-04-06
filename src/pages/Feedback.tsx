
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import ReviewForm from '@/components/reviews/ReviewForm';
import PreviousReviews from '@/components/reviews/PreviousReviews';
import TeamSection from '@/components/reviews/TeamSection';
import reviewService, { Review } from '@/services/reviewService';
import { fadeIn } from '@/utils/animations';

const Feedback = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load existing reviews on mount
    const storedReviews = reviewService.getAllReviews();
    setReviews(storedReviews);
  }, []);

  const handleSubmitReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
    setIsSubmitting(true);
    try {
      // Save the review and get updated list
      const updatedReviews = await reviewService.saveReview(reviewData);
      setReviews(updatedReviews);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
        <Navbar />
        
        <main className="container py-20 px-4 min-h-screen">
          <div className="pt-10 max-w-5xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center mb-2"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              Your Feedback Matters
            </motion.h1>
            
            <motion.p 
              className="text-center text-muted-foreground mb-12"
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={1}
            >
              Help us improve Career Compass with your valuable insights
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
              <div className="md:col-span-3">
                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <ReviewForm onSubmit={handleSubmitReview} isSubmitting={isSubmitting} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <PreviousReviews reviews={reviews} />
              </div>
            </div>
            
            <TeamSection />
          </div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Feedback;
