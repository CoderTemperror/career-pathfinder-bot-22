
import { motion } from "framer-motion";
import { Users, Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamMember from "./TeamMember";

const TeamSection = () => {
  return (
    <Card className="mb-16 shadow-md bg-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary" />
          Meet the Team
        </CardTitle>
        <CardDescription>
          The talented students behind Career Compass
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TeamMember 
            name="Oum Halder" 
            role="UI/UX Designer & Developer" 
            description="Created the user interface and implemented interactive components."
            imageSrc="/lovable-uploads/de1cc39d-3c96-48cf-8e95-09fe3eb4613f.png"
          />
          <TeamMember 
            name="Pramit Datta" 
            role="Team Lead & Developer" 
            description="Responsible for project architecture and coordinating development efforts."
            imageSrc="/lovable-uploads/d318be02-eb09-4942-9467-8a197ba182a6.png"
          />
          <TeamMember 
            name="Sagnik Mondal" 
            role="Content Strategist & Developer" 
            description="Developed career guidance content and implemented data integration."
            imageSrc="/lovable-uploads/6d9928bf-39b2-4cda-98ea-7f47bed22e1b.png"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Code className="w-4 h-4 mr-2" />
          Developed with passion for SBH Junior 2025
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamSection;
