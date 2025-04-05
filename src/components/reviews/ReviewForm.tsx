
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import RatingEmoji from './RatingEmoji';
import { Review } from '@/services/reviewService';

// Validation schema for the form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  rating: z.number().min(1, { message: 'Please select a rating' }).max(5),
  feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters' }).max(500),
  source: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReviewFormProps {
  onSubmit: (data: Omit<Review, 'id' | 'date'>) => void;
  isSubmitting: boolean;
}

const ReviewForm = ({ onSubmit, isSubmitting }: ReviewFormProps) => {
  const { toast } = useToast();
  const [showSuccessState, setShowSuccessState] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 0,
      feedback: '',
      source: 'Website Review Form',
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit(data);
    
    // Show success state
    setShowSuccessState(true);
    
    // Show toast
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });
    
    // Reset form after a delay
    setTimeout(() => {
      form.reset();
      setShowSuccessState(false);
    }, 3000);
  };

  return (
    <>
      {showSuccessState ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-center text-muted-foreground">
            Your feedback has been submitted and will help us improve.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base">How would you rate your experience?</FormLabel>
                  <FormControl>
                    <RatingEmoji value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your experience..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ReviewForm;
