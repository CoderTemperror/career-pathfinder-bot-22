
import { personalityDescriptions } from './personalityDescriptions';
import { MBTIPersonalityInfo } from './types';

export function getSuggestedPrompts(mbtiType: string): string[] {
  const generalPrompts = [
    `What careers best suit an ${mbtiType} personality type?`,
    `What skills should I develop as an ${mbtiType}?`,
    `What are the work environment preferences for ${mbtiType}?`,
    `What careers should I avoid as an ${mbtiType}?`,
    `How can I balance my ${mbtiType} strengths and weaknesses in my career?`,
  ];
  
  const personalityInfo = personalityDescriptions[mbtiType] as MBTIPersonalityInfo | undefined || { careers: [] };
  
  const careerPrompts = personalityInfo.careers.map(career => 
    `Tell me more about a career as a ${career}`
  ).slice(0, 3);
  
  return [...generalPrompts, ...careerPrompts];
}
