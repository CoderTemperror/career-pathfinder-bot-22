
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailService from '@/services/emailService';
import { getPersonalityImage, getCategoryColor } from '@/utils/mbti/personalityImages';

interface MBTIResultsProps {
  mbtiResult: {
    type: string;
    description: string;
    careers: string[];
  };
  onReset: () => void;
}

const MBTIResults = ({ mbtiResult, onReset }: MBTIResultsProps) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isUnsatisfied, setIsUnsatisfied] = useState(false);
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [personalityType, setPersonalityType] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  
  const personalityInfo = getPersonalityImage(mbtiResult.type);
  const categoryColorClass = getCategoryColor(personalityInfo.category);
  
  const handleSubmitFeedback = async () => {
    // Check if at least one field is filled
    if (name.trim() === '' && qualification.trim() === '' && 
        (isUnsatisfied && personalityType.trim() === '')) {
      toast.error("Please provide some information before submitting");
      return;
    }
    
    setIsSendingFeedback(true);
    
    try {
      // Prepare feedback data
      const feedbackData = {
        name: name || "Anonymous",
        email: "futureflowpos@gmail.com", // Updated email
        rating: isUnsatisfied ? 3 : 5, // 5 for satisfied, 3 for unsatisfied
        feedback: `
          User ${isUnsatisfied ? 'is not satisfied' : 'is satisfied'} with MBTI results.
          Name: ${name || 'Not provided'}
          Qualification: ${qualification || 'Not provided'}
          ${isUnsatisfied ? `Suggested Personality Type: ${personalityType || 'Not provided'}` : ''}
          MBTI Result: ${mbtiResult.type}
        `,
        source: "MBTI Results Feedback",
      };
      
      // Send feedback using the email service
      await emailService.sendEmailSilently(feedbackData);
      
      toast.success("Thank you for your feedback!");
      setShowFeedbackForm(false);
    } catch (error) {
      toast.error("Failed to send feedback. Please try again.");
      console.error("Error sending MBTI feedback:", error);
    } finally {
      setIsSendingFeedback(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-card border border-border rounded-lg p-8 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="mb-4"
            >
              <Badge className={`${categoryColorClass} text-xs px-3 py-1 mb-3`}>
                {personalityInfo.category}
              </Badge>
              
              {personalityInfo.imageUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={personalityInfo.imageUrl}
                    alt={`${mbtiResult.type} personality type`}
                    className="w-32 h-32 object-cover rounded-full border-2 border-primary/20"
                  />
                </div>
              )}
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">Your Assessment is Complete</h2>
          <p className="text-lg text-foreground mb-4">
            Your personality type is <span className="font-bold text-blue-500">{mbtiResult.type}</span>
          </p>
          <p className="mb-6 text-muted-foreground">{personalityInfo.description}</p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px]">
                Chat with Career Advisor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={onReset} 
              className="min-w-[150px]"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Test
            </Button>
          </div>
        </div>
      </div>
      
      {mbtiResult.careers && mbtiResult.careers.length > 0 && (
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recommended Career Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mbtiResult.careers.map((career: string, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-secondary/20 border rounded-md p-3 flex items-center gap-2 transition-all duration-200 
                  hover:border-blue-400 cursor-pointer hover:bg-secondary/30"
              >
                <Link 
                  to={`/chat?question=Tell me more about pursuing a career as a ${career} for someone with ${mbtiResult.type} personality type. What skills do I need, what education is required, and what's the job outlook?`}
                  className="w-full"
                >
                  <span>{career}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Feedback section */}
          <div className="mt-8 border-t pt-6">
            <h4 className="text-lg font-medium mb-4">Are you satisfied with these results?</h4>
            
            {!showFeedbackForm ? (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  variant="default"
                  onClick={() => {
                    setShowFeedbackForm(true);
                    setIsUnsatisfied(false);
                  }}
                  className="min-w-[120px]"
                >
                  Yes
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowFeedbackForm(true);
                    setIsUnsatisfied(true);
                  }}
                  className="min-w-[120px]"
                >
                  No
                </Button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="qualification" className="text-sm font-medium">
                    Your Qualification
                  </label>
                  <Input 
                    id="qualification"
                    placeholder="Enter your qualification" 
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  />
                </div>
                
                {isUnsatisfied && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="personality-type" className="text-sm font-medium">
                      What do you think your personality type is?
                    </label>
                    <Input 
                      id="personality-type"
                      placeholder="e.g., INFJ, ENTP, etc." 
                      value={personalityType}
                      onChange={(e) => setPersonalityType(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex gap-3 justify-end pt-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowFeedbackForm(false)}
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    onClick={handleSubmitFeedback}
                    disabled={isSendingFeedback}
                  >
                    {isSendingFeedback ? "Sending..." : "Submit Feedback"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MBTIResults;
