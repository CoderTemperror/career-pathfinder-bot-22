
import { useState } from 'react';
import { format } from 'date-fns';
import { Star, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Review } from '@/services/reviewService';

interface PreviousReviewsProps {
  reviews: Review[];
}

const PreviousReviews = ({ reviews }: PreviousReviewsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  
  const displayedReviews = reviews.slice(
    currentPage * reviewsPerPage, 
    (currentPage + 1) * reviewsPerPage
  );
  
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // If we have no reviews, show a placeholder
  if (reviews.length === 0) {
    return (
      <Card className="shadow-md h-full">
        <CardHeader>
          <CardTitle className="text-xl">Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first to leave feedback!
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Feedback</CardTitle>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentPage + 1}/{totalPages}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(review.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(review.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                {review.feedback}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousReviews;
