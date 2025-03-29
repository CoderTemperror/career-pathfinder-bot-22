
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import TransitionLayout from '@/components/TransitionLayout';
import CareerAssessment from '@/components/CareerAssessment';
import StorageService from '@/services/storage';
import type { CareerReport } from '@/utils/careerAssessmentCalculator';

const CareerAssessmentPage = () => {
  return (
    <TransitionLayout>
      <div className="min-h-screen">
        <Navbar />
        <main className="container max-w-5xl pt-24 pb-16 px-4">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-3">Career Assessment Test</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete this 30-question assessment to discover your ideal career path based on your personality traits, interests, strengths, and workplace preferences.
              </p>
            </div>
            
            <CareerAssessment />
          </motion.div>
        </main>
      </div>
    </TransitionLayout>
  );
};

export default CareerAssessmentPage;
