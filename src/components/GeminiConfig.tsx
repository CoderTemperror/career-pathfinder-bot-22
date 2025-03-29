
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import GeminiService from '@/services/gemini';

const GeminiConfig = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if AI service is initialized
    const isInit = GeminiService.isInitialized();
    setIsInitialized(isInit);
    
    // Initialize if not already initialized
    if (!isInit) {
      GeminiService.initialize();
    }
  }, []);

  return (
    <Button variant="outline" className="ml-2 relative" size="sm">
      <Key className="h-4 w-4 mr-2" />
      AI Status
      <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`}>
        <span className="sr-only">AI {isInitialized ? 'connected' : 'disconnected'}</span>
      </span>
    </Button>
  );
};

export default GeminiConfig;
