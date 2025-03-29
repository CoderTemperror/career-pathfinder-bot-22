
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import StorageService from '@/services/storage';

/**
 * Hook for handling URL query parameters in chat
 */
export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  /**
   * Get initial message based on URL parameters
   */
  const getInitialMessage = useCallback(() => {
    const queryParam = searchParams.get('q');
    const mbtiParam = searchParams.get('mbti');
    const careerAssessmentParam = searchParams.get('career_assessment');
    
    if (queryParam) {
      return queryParam;
    } 
    
    if (mbtiParam) {
      const mbtiResult = StorageService.get('mbti_result');
      if (mbtiResult) {
        return `I've completed the MBTI assessment and my personality type is ${mbtiResult.type}. What careers would be good for me based on this result?`;
      }
    } 
    
    if (careerAssessmentParam === 'completed') {
      const careerReport = StorageService.get('career_assessment_result');
      if (careerReport) {
        return `I've completed the Career Assessment Test. Based on my results (MBTI: ${careerReport.mbti.type}, RIASEC: ${careerReport.riasec.dominant}-${careerReport.riasec.secondary}), what career paths would be most suitable for me?`;
      }
    }
    
    return null;
  }, [searchParams]);

  return { getInitialMessage };
};
