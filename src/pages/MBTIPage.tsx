
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import MBTIAssessment from "@/components/MBTIAssessment";
import TransitionLayout from "@/components/TransitionLayout";

const MBTIPage = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <TransitionLayout>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container max-w-6xl mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-blue-600 dark:text-blue-500 mb-4">
              Personality Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover your MBTI personality type to get career recommendations tailored to your 
              natural strengths and preferences.
            </p>
          </motion.div>
          
          {/* This component handles conditional rendering internally */}
          <MBTIAssessment />
        </div>
      </div>
    </TransitionLayout>
  );
};

export default MBTIPage;
