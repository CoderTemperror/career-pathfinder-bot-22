
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserCircle, Briefcase, Brain, Building2, TrendingUp, 
  Lightbulb, Target, CheckCircle, MessageSquareText, BarChart3
} from 'lucide-react';
import type { CareerReport } from '@/utils/careerAssessmentCalculator';

interface CareerReportDisplayProps {
  report: CareerReport;
}

// Helper function to render progress bars with rating values
const RatingBar = ({ value, max, label, color = "bg-blue-500" }: { 
  value: number; 
  max: number; 
  label: string;
  color?: string;
}) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}/{max}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// Helper function to render star ratings
const StarRating = ({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, i) => (
        <span key={i} className={i < rating ? "text-amber-500" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
};

const CareerReportDisplay = ({ report }: CareerReportDisplayProps) => {
  const navigate = useNavigate();
  
  const navigateToChat = (query: string) => {
    navigate(`/chat?q=${encodeURIComponent(query)}`);
  };
  
  // Calculate MBTI percentages
  const mbtiDetails = report.mbti.details;
  const iPercentage = Math.round((mbtiDetails.I / (mbtiDetails.I + mbtiDetails.E)) * 100);
  const sPercentage = Math.round((mbtiDetails.S / (mbtiDetails.S + mbtiDetails.N)) * 100);
  const tPercentage = Math.round((mbtiDetails.T / (mbtiDetails.T + mbtiDetails.F)) * 100);
  const jPercentage = Math.round((mbtiDetails.J / (mbtiDetails.J + mbtiDetails.P)) * 100);
  
  // RIASEC sorting for visualization
  const riasecEntries = Object.entries(report.riasec.scores) as [string, number][];
  const sortedRiasec = [...riasecEntries].sort((a, b) => b[1] - a[1]);
  
  // Strengths sorting for visualization
  const strengthEntries = Object.entries(report.strengths.scores) as [string, number][];
  const sortedStrengths = [...strengthEntries].sort((a, b) => b[1] - a[1]);
  
  // Workplace traits sorting for visualization
  const workplaceEntries = Object.entries(report.scenario.scores) as [string, number][];
  const sortedWorkplace = [...workplaceEntries].sort((a, b) => b[1] - a[1]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Career Assessment Report</h1>
        <p className="text-muted-foreground">
          Based on your responses to all 30 questions across personality traits, interests, strengths, and workplace scenarios
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <UserCircle className="mr-2 h-4 w-4 text-blue-500" />
              MBTI Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.mbti.type}</div>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{report.mbti.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-green-500" />
              RIASEC Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.riasec.dominant}-{report.riasec.secondary}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {report.riasec.dominant === 'R' && 'Realistic'}
              {report.riasec.dominant === 'I' && 'Investigative'}
              {report.riasec.dominant === 'A' && 'Artistic'}
              {report.riasec.dominant === 'S' && 'Social'}
              {report.riasec.dominant === 'E' && 'Enterprising'}
              {report.riasec.dominant === 'C' && 'Conventional'}
              {' & '}
              {report.riasec.secondary === 'R' && 'Realistic'}
              {report.riasec.secondary === 'I' && 'Investigative'}
              {report.riasec.secondary === 'A' && 'Artistic'}
              {report.riasec.secondary === 'S' && 'Social'}
              {report.riasec.secondary === 'E' && 'Enterprising'}
              {report.riasec.secondary === 'C' && 'Conventional'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
              Top Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{report.strengths.topStrengths.join(' & ')}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {report.strengths.topStrengths.map(strength => (
                <Badge key={strength} variant="secondary" className="text-xs">
                  {strength}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Building2 className="mr-2 h-4 w-4 text-purple-500" />
              Workplace Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {report.scenario.workplaceTraits.length > 0 ? report.scenario.workplaceTraits[0] : 'Balanced'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {report.scenario.workplaceRecommendations[0]}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* MBTI Personality Type Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-blue-500" />
            MBTI Personality Type: {report.mbti.type}
          </CardTitle>
          <CardDescription>
            Your personality breakdown and how it influences your career preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p>{report.mbti.description}</p>
          
          {/* MBTI Chart */}
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Introversion (I)</span>
                  <span className="font-medium">Extraversion (E)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-l-full" style={{ width: `${iPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{iPercentage}%</span>
                  <span>{100 - iPercentage}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Sensing (S)</span>
                  <span className="font-medium">Intuition (N)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-l-full" style={{ width: `${sPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{sPercentage}%</span>
                  <span>{100 - sPercentage}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Thinking (T)</span>
                  <span className="font-medium">Feeling (F)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-l-full" style={{ width: `${tPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{tPercentage}%</span>
                  <span>{100 - tPercentage}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Judging (J)</span>
                  <span className="font-medium">Perceiving (P)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-l-full" style={{ width: `${jPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{jPercentage}%</span>
                  <span>{100 - jPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* MBTI Suited Careers */}
          <div>
            <h3 className="font-semibold mb-2">MBTI-Suited Careers:</h3>
            <div className="flex flex-wrap gap-2">
              {report.mbti.careers.map((career, index) => (
                <Badge key={index} variant="outline" className="px-2 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {career}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* RIASEC Career Interests Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-green-500" />
            RIASEC Career Interests: {report.riasec.dominant}-{report.riasec.secondary}
          </CardTitle>
          <CardDescription>
            Your Holland Code (RIASEC) career interest profile
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p>
            Your dominant interest areas are <strong>
              {report.riasec.dominant === 'R' && 'Realistic (practical, hands-on)'}
              {report.riasec.dominant === 'I' && 'Investigative (analytical, scientific)'}
              {report.riasec.dominant === 'A' && 'Artistic (creative, expressive)'}
              {report.riasec.dominant === 'S' && 'Social (helpful, people-oriented)'}
              {report.riasec.dominant === 'E' && 'Enterprising (leadership, business)'}
              {report.riasec.dominant === 'C' && 'Conventional (organized, detail-oriented)'}
            </strong> and <strong>
              {report.riasec.secondary === 'R' && 'Realistic (practical, hands-on)'}
              {report.riasec.secondary === 'I' && 'Investigative (analytical, scientific)'}
              {report.riasec.secondary === 'A' && 'Artistic (creative, expressive)'}
              {report.riasec.secondary === 'S' && 'Social (helpful, people-oriented)'}
              {report.riasec.secondary === 'E' && 'Enterprising (leadership, business)'}
              {report.riasec.secondary === 'C' && 'Conventional (organized, detail-oriented)'}
            </strong>, which indicates you prefer careers that combine these elements.
          </p>
          
          {/* RIASEC Chart */}
          <div className="space-y-4 mt-4">
            {sortedRiasec.map(([type, score]) => (
              <RatingBar 
                key={type} 
                value={score} 
                max={8/3} 
                label={
                  type === 'R' ? 'Realistic (R)' :
                  type === 'I' ? 'Investigative (I)' :
                  type === 'A' ? 'Artistic (A)' :
                  type === 'S' ? 'Social (S)' :
                  type === 'E' ? 'Enterprising (E)' :
                  'Conventional (C)'
                }
                color={
                  type === 'R' ? 'bg-blue-500' :
                  type === 'I' ? 'bg-purple-500' :
                  type === 'A' ? 'bg-pink-500' :
                  type === 'S' ? 'bg-green-500' :
                  type === 'E' ? 'bg-amber-500' :
                  'bg-cyan-500'
                }
              />
            ))}
          </div>
          
          {/* RIASEC Suited Careers */}
          <div>
            <h3 className="font-semibold mb-2">RIASEC-Suited Careers:</h3>
            <div className="flex flex-wrap gap-2">
              {report.riasec.careers.map((career, index) => (
                <Badge key={index} variant="outline" className="px-2 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {career}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Strengths Profile Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            Strengths Profile: {report.strengths.topStrengths.join(' & ')} Thinker
          </CardTitle>
          <CardDescription>
            Your core strengths and personal competencies
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p>
            Your assessment reveals that your strongest traits are {report.strengths.topStrengths.join(' and ')},
            which are valuable in careers that require these competencies.
          </p>
          
          {/* Strengths Chart */}
          <div className="space-y-4 mt-4">
            {sortedStrengths.map(([strength, score], index) => (
              <div key={strength} className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0 font-medium">{strength}</div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <StarRating rating={Math.round((score / 7) * 5)} maxStars={5} />
                    <span className="text-xs text-muted-foreground ml-2">{Math.round((score / 7) * 5)}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Strength-Driven Careers */}
          <div>
            <h3 className="font-semibold mb-2">Strength-Driven Careers:</h3>
            <div className="flex flex-wrap gap-2">
              {report.strengths.careers.slice(0, 5).map((career, index) => (
                <Badge key={index} variant="outline" className="px-2 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {career}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Workplace Suitability Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-purple-500" />
            Workplace Suitability: {report.scenario.workplaceTraits.slice(0, 2).join(' & ')}
          </CardTitle>
          <CardDescription>
            Your workplace behavior, adaptability, and decision-making style
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p>
            Based on your responses to workplace scenarios, you thrive in environments that value 
            {report.scenario.workplaceTraits.map((trait, index) => (
              <span key={index}>
                {index === 0 ? ' ' : index === report.scenario.workplaceTraits.length - 1 ? ' and ' : ', '}
                <strong>{trait.toLowerCase()}</strong>
              </span>
            ))}.
          </p>
          
          {/* Workplace Traits Chart */}
          <div className="space-y-4 mt-4">
            {sortedWorkplace.map(([trait, score]) => (
              <RatingBar 
                key={trait} 
                value={score} 
                max={7} 
                label={trait}
                color={
                  trait === 'Leadership' ? 'bg-blue-500' :
                  trait === 'Empathy' ? 'bg-green-500' :
                  trait === 'Organization' ? 'bg-purple-500' :
                  trait === 'Creativity' ? 'bg-pink-500' :
                  'bg-amber-500'
                }
              />
            ))}
          </div>
          
          {/* Workplace Recommendations */}
          <div>
            <h3 className="font-semibold mb-2">Workplace Suitability:</h3>
            <div className="space-y-2">
              {report.scenario.workplaceRecommendations.slice(0, 4).map((rec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Final Career Recommendations Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
            Final Career Recommendations
          </CardTitle>
          <CardDescription>
            Based on your MBTI, RIASEC, Strengths, and Workplace Suitability
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technology & Data */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                Technology & Data
              </h3>
              <div className="space-y-2">
                {report.finalRecommendations.slice(0, 3).map((career, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => navigateToChat(`Tell me more about careers in technology like ${report.finalRecommendations[0]} based on my assessment results`)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Tech Careers
              </Button>
            </div>
            
            {/* Business & Analytics */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-green-500" />
                Business & Analytics
              </h3>
              <div className="space-y-2">
                {report.finalRecommendations.slice(3, 6).map((career, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => navigateToChat(`Tell me more about business careers like ${report.finalRecommendations[3]} based on my assessment results`)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Business Careers
              </Button>
            </div>
            
            {/* Creative & Independent */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-amber-500" />
                Creative & Independent
              </h3>
              <div className="space-y-2">
                {report.finalRecommendations.slice(6, 9).map((career, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => navigateToChat(`Tell me more about creative careers like ${report.finalRecommendations[6]} based on my assessment results`)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Creative Careers
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col items-stretch gap-4 pt-6">
          <Button 
            onClick={() => navigateToChat("Based on my career assessment results, what are the next steps I should take for career planning?")}
            className="w-full"
          >
            <MessageSquareText className="h-4 w-4 mr-2" />
            Get Personalized Career Advice
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Use the chat to ask detailed questions about your career path, education options, or skill development based on these results
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CareerReportDisplay;
