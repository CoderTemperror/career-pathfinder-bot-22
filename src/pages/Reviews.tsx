
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import TransitionLayout from "@/components/TransitionLayout";
import TeamSection from "@/components/reviews/TeamSection";
import ReviewForm from "@/components/reviews/ReviewForm";
import PreviousReviews from "@/components/reviews/PreviousReviews";
import { saveReviews, loadReviews } from "@/components/reviews/utils";

const Reviews = () => {
  const [savedReviews, setSavedReviews] = useState<Array<{ rating: number; text: string }>>([]);

  useEffect(() => {
    setSavedReviews(loadReviews());
  }, []);

  const handleSubmitReview = (newReview: { rating: number; text: string }) => {
    const updatedReviews = [...savedReviews, newReview];
    saveReviews(updatedReviews);
    setSavedReviews(updatedReviews);
  };

  return (
    <TransitionLayout>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container py-16 px-4 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-3xl font-bold mb-4">Smart Bengal Hackathon Junior 2025</h1>
              <div className="flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-amber-500 mr-2" />
                <h2 className="text-xl font-semibold">Team Credits & Feedback</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Career Compass was developed to help teenagers make informed career decisions
                by providing personalized guidance, assessments, and expert advice tailored to their interests and strengths.
              </p>
            </div>

            <TeamSection />
            <ReviewForm onReviewSubmit={handleSubmitReview} />
            <PreviousReviews reviews={savedReviews} />
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Reviews;
