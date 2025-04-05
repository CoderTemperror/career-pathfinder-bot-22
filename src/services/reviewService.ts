
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import emailService from './emailService';

export interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
  source: string;
}

const STORAGE_KEY = 'career_compass_reviews';

// Get all reviews
export const getAllReviews = (): Review[] => {
  try {
    const storedReviews = localStorage.getItem(STORAGE_KEY);
    return storedReviews ? JSON.parse(storedReviews) : [];
  } catch (error) {
    console.error('Error reading reviews from storage:', error);
    return [];
  }
};

// Save a new review, send it via email, and return the updated list
export const saveReview = async (reviewData: Omit<Review, 'id' | 'date'>): Promise<Review[]> => {
  try {
    // Create a new review with ID and date
    const newReview: Review = {
      ...reviewData,
      id: uuidv4(),
      date: new Date().toISOString(),
    };

    // Get existing reviews
    const existingReviews = getAllReviews();
    
    // Add the new review to the list
    const updatedReviews = [newReview, ...existingReviews];
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
    
    // Send email silently (user doesn't see this part)
    await emailService.sendEmailSilently({
      name: reviewData.name,
      email: reviewData.email,
      rating: reviewData.rating,
      feedback: reviewData.feedback,
      source: reviewData.source,
    });
    
    return updatedReviews;
  } catch (error) {
    console.error('Error saving review:', error);
    toast({
      title: "Error saving feedback",
      description: "We couldn't save your feedback at this time. Please try again later.",
      variant: "destructive",
    });
    return getAllReviews();
  }
};

export default {
  getAllReviews,
  saveReview,
};
