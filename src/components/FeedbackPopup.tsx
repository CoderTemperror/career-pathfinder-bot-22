
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const FeedbackPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if we're on the home page
    const isHomePage = location.pathname === '/';
    
    // Check if the user has previously closed the popup
    const hasClosedPopup = localStorage.getItem('feedbackPopupClosed') === 'true';
    
    // Only show the popup if we're not on the home page and it hasn't been closed
    setIsVisible(!isHomePage && !hasClosedPopup);
  }, [location.pathname]);
  
  const handleClose = () => {
    setIsVisible(false);
    // Save to localStorage that the user has closed the popup
    localStorage.setItem('feedbackPopupClosed', 'true');
  };
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 right-4 z-40"
        >
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg w-[140px]">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-blue-500 hover:bg-gray-200 hover:text-blue-600"
              onClick={handleClose}
            >
              <X className="h-3 w-3" />
            </Button>
            
            <Link 
              to="/feedback" 
              className="block text-center font-semibold hover:text-gray-100 transition-colors"
            >
              Feedback
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackPopup;
