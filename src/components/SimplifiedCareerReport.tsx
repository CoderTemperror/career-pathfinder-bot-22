
import React from 'react';
import { 
  Card, CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserCircle, Briefcase, Lightbulb, Building2
} from 'lucide-react';
import type { CareerReport } from '@/utils/careerAssessmentCalculator';

interface SimplifiedCareerReportProps {
  report: CareerReport;
}

const SimplifiedCareerReport = ({ report }: SimplifiedCareerReportProps) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Career Assessment Report</h1>
        <p className="text-muted-foreground">
          Based on your responses to all 30 questions across personality traits, interests, strengths, and workplace scenarios
        </p>
      </div>
      
      {/* Summary Cards - Simplified version matching the screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-blue-400">
              <UserCircle className="h-5 w-5" />
              <span className="text-sm font-medium">MBTI Type</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">{report.mbti.type}</h2>
            <p className="text-sm text-gray-300 line-clamp-2">
              {report.mbti.description.split(' - ')[0]}
            </p>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
              {report.mbti.description.split(' - ')[1] || 'Caring, social, and process-oriented with a drive for connection'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-black text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-green-400">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm font-medium">RIASEC Type</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">{report.riasec.dominant}-{report.riasec.secondary}</h2>
            <p className="text-sm text-gray-300">
              {report.riasec.dominant === 'R' ? 'Realistic' : 
               report.riasec.dominant === 'I' ? 'Investigative' : 
               report.riasec.dominant === 'A' ? 'Artistic' : 
               report.riasec.dominant === 'S' ? 'Social' : 
               report.riasec.dominant === 'E' ? 'Enterprising' : 'Conventional'} & {' '}
              {report.riasec.secondary === 'R' ? 'Realistic' : 
               report.riasec.secondary === 'I' ? 'Investigative' : 
               report.riasec.secondary === 'A' ? 'Artistic' : 
               report.riasec.secondary === 'S' ? 'Social' : 
               report.riasec.secondary === 'E' ? 'Enterprising' : 'Conventional'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-black text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Lightbulb className="h-5 w-5" />
              <span className="text-sm font-medium">Top Strengths</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">
              {report.strengths.topStrengths.slice(0, 2).join(' & ')}
            </h2>
            <div className="flex flex-wrap gap-1 mt-2">
              {report.strengths.topStrengths.map(strength => (
                <Badge key={strength} variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-white">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-purple-400">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Workplace Fit</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">
              {report.scenario.workplaceTraits[0]}
            </h2>
            <p className="text-sm text-gray-300">
              {report.scenario.workplaceRecommendations[0].split('.')[0]}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Final Career Recommendations Section - Simplified */}
      <Card className="border-0 bg-transparent">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Recommended Career Paths</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-400" />
                Technology & Data
              </h4>
              <ul className="space-y-1">
                {report.finalRecommendations.slice(0, 3).map((career, index) => (
                  <li key={index} className="text-sm">{career}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-green-400" />
                Business & Analytics
              </h4>
              <ul className="space-y-1">
                {report.finalRecommendations.slice(3, 6).map((career, index) => (
                  <li key={index} className="text-sm">{career}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-400" />
                Creative & Independent
              </h4>
              <ul className="space-y-1">
                {report.finalRecommendations.slice(6, 9).map((career, index) => (
                  <li key={index} className="text-sm">{career}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplifiedCareerReport;
