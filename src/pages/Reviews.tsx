
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import TransitionLayout from "@/components/TransitionLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FrownIcon,
  MehIcon,
  SmileIcon,
  SmilePlusIcon,
  HeartIcon,
  Send,
  Users,
  Code,
  Award,
  BadgeCheck,
} from "lucide-react";

const TeamMember = ({ name, role, description }: { name: string; role: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center p-4"
  >
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
      <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
    <p className="text-sm text-center mt-2 max-w-xs">{description}</p>
  </motion.div>
);

const RatingEmoji = ({
  value,
  currentRating,
  onSelect,
}: {
  value: number;
  currentRating: number;
  onSelect: (rating: number) => void;
}) => {
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

const Reviews = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [savedReviews, setSavedReviews] = useState<Array<{ rating: number; text: string }>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved reviews from localStorage
    const savedData = localStorage.getItem("sbh2025_reviews");
    if (savedData) {
      setSavedReviews(JSON.parse(savedData));
    }
  }, []);

  const handleRatingSelect = (value: number) => {
    setRating(value);
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

    const newReview = { rating, text: review };
    const updatedReviews = [...savedReviews, newReview];
    
    // Save to localStorage
    localStorage.setItem("sbh2025_reviews", JSON.stringify(updatedReviews));
    setSavedReviews(updatedReviews);
    
    // Reset form
    setRating(0);
    setReview("");
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });
  };

  const getRatingText = () => {
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
        return "Select a rating";
    }
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

            <Card className="mb-16 shadow-md bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Meet the Team
                </CardTitle>
                <CardDescription>
                  The talented students behind Career Compass
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TeamMember 
                    name="Pramit Datta" 
                    role="Team Lead & Developer" 
                    description="Responsible for project architecture and coordinating development efforts."
                  />
                  <TeamMember 
                    name="Oum Halder" 
                    role="UI/UX Designer & Developer" 
                    description="Created the user interface and implemented interactive components."
                  />
                  <TeamMember 
                    name="Sagnik Mondal" 
                    role="Content Strategist & Developer" 
                    description="Developed career guidance content and implemented data integration."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Code className="w-4 h-4 mr-2" />
                  Developed with passion for SBH Junior 2025
                </div>
              </CardFooter>
            </Card>

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

              <Card className="max-w-3xl mx-auto">
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
                    <div className="flex flex-wrap justify-center gap-3 mb-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <RatingEmoji
                          key={value}
                          value={value}
                          currentRating={rating}
                          onSelect={handleRatingSelect}
                        />
                      ))}
                    </div>
                    <p className="text-center text-sm font-medium mt-2">
                      {getRatingText()}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="review" className="block text-sm font-medium mb-2">
                      What did you think of our project?
                    </label>
                    <Textarea
                      id="review"
                      placeholder="Share your feedback, suggestions, or what you liked about the project..."
                      rows={5}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="w-full resize-none"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmitReview} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {savedReviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-xl font-medium mb-4">Previous Feedback</h3>
                <div className="space-y-4">
                  {savedReviews.map((item, index) => (
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
                          <span className="ml-2 text-sm font-medium">{getRatingText()}</span>
                        </div>
                        <p className="text-sm">{item.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default Reviews;
