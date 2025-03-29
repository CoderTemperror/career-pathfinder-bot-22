
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import OpenAIService from '@/services/openai';

const OpenAIConfig = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      try {
        OpenAIService.initialize({ apiKey: storedApiKey });
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize OpenAI service:', error);
      }
    }
  }, []);

  return (
    <Button variant={isInitialized ? "outline" : "default"} className="ml-2 relative" size="sm">
      <Key className="h-4 w-4 mr-2" />
      {isInitialized ? "API Key Set" : "Set API Key"}
      {isInitialized && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500">
          <span className="sr-only">OpenAI connected</span>
        </span>
      )}
    </Button>
  );
};

export default OpenAIConfig;
