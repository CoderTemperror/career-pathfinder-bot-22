export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date | string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  matchScore: number; // 0-100
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  outlook: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  skills: {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }[];
}

export interface PathwayStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'Education' | 'Training' | 'Experience' | 'Certification';
  required: boolean;
}

export interface CareerPathway {
  careerId: string;
  careerTitle: string;
  steps: PathwayStep[];
}

export interface UserProfile {
  education: string;
  skills: string[];
  interests: string[];
  strengths: string[];
  workPreferences: {
    remote: boolean;
    flexible: boolean;
    travel: boolean;
  };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Article' | 'Course' | 'Tool' | 'Community';
  tags: string[];
}

export type StorageKey = 
  | 'mbti_answers' 
  | 'mbti_result' 
  | 'chat_messages'
  | 'career_assessment_answers'
  | 'career_assessment_result'
  | 'gemini_config';
