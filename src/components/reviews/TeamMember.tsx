
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
}

const TeamMember = ({ name, role, description, imageSrc }: TeamMemberProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center p-4"
  >
    <Avatar className="w-24 h-24 border-2 border-blue-200 dark:border-blue-800 mb-3">
      <AvatarImage src={imageSrc} alt={name} className="object-cover" />
      <AvatarFallback>
        <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      </AvatarFallback>
    </Avatar>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
    <p className="text-sm text-center mt-2 max-w-xs">{description}</p>
  </motion.div>
);

export default TeamMember;
