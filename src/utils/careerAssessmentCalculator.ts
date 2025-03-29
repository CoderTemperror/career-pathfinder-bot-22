
// Types for assessment sections
export type MBTIAnswer = 'A' | 'B';
export type RIASECAnswer = 'A' | 'B';
export type StrengthAnswer = 'A' | 'B' | 'C' | 'D';
export type ScenarioAnswer = 'A' | 'B' | 'C' | 'D' | 'E';

// Assessment types
export interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    A: string;
    B: string;
    C?: string;
    D?: string;
    E?: string;
  };
}

// MBTI Section (Section 1)
export const mbtiQuestions: Question[] = [
  {
    id: 1,
    text: "Do you prefer working:",
    category: "I/E",
    options: {
      A: "Alone (I prefer having my own space and time)",
      B: "In a group (I enjoy collaborating with others)"
    }
  },
  {
    id: 2,
    text: "When solving a problem, do you focus on:",
    category: "S/N",
    options: {
      A: "Details and facts (I pay attention to specifics)",
      B: "Concepts and possibilities (I look at the big picture)"
    }
  },
  {
    id: 3,
    text: "Do you make decisions based on:",
    category: "T/F",
    options: {
      A: "Logic and analysis (I prioritize objective reasoning)",
      B: "Feelings and empathy (I consider how decisions affect people)"
    }
  },
  {
    id: 4,
    text: "Are you more comfortable with:",
    category: "J/P",
    options: {
      A: "A structured plan (I like order and organization)",
      B: "Flexible spontaneity (I prefer to adapt as I go)"
    }
  },
  {
    id: 5,
    text: "After a social event, do you feel:",
    category: "I/E",
    options: {
      A: "Drained and need alone time (I need to recharge)",
      B: "Energized and refreshed (I gain energy from socializing)"
    }
  },
  {
    id: 6,
    text: "Do you rely on:",
    category: "S/N",
    options: {
      A: "Past experiences (I trust what has worked before)",
      B: "Future possibilities (I'm drawn to new options)"
    }
  },
  {
    id: 7,
    text: "Do you prioritize:",
    category: "T/F",
    options: {
      A: "Fairness and consistency (I value objective standards)",
      B: "Compassion and harmony (I value understanding individual needs)"
    }
  },
  {
    id: 8,
    text: "Do you prefer to:",
    category: "J/P",
    options: {
      A: "Plan and organize (I like knowing what comes next)",
      B: "Improvise and go with the flow (I enjoy spontaneity)"
    }
  }
];

// RIASEC Section (Section 2)
export const riasecQuestions: Question[] = [
  {
    id: 9,
    text: "Do you enjoy:",
    category: "R/I",
    options: {
      A: "Building and fixing things (hands-on activities)",
      B: "Analyzing data and solving problems (analytical thinking)"
    }
  },
  {
    id: 10,
    text: "Are you more interested in:",
    category: "A/S",
    options: {
      A: "Creative writing and arts (expressing yourself)",
      B: "Helping people and teaching (supporting others)"
    }
  },
  {
    id: 11,
    text: "Do you prefer:",
    category: "E/C",
    options: {
      A: "Leading and persuading others (taking charge)",
      B: "Working with structured data and organizing (creating order)"
    }
  },
  {
    id: 12,
    text: "Would you rather spend your day:",
    category: "R/I",
    options: {
      A: "Working with machinery or physical tools",
      B: "Conducting research or investigating complex issues"
    }
  },
  {
    id: 13,
    text: "Do you prefer:",
    category: "A/S",
    options: {
      A: "Expressing yourself through art",
      B: "Caring for others' well-being"
    }
  },
  {
    id: 14,
    text: "Are you drawn to:",
    category: "E/C",
    options: {
      A: "Entrepreneurship and business ventures",
      B: "Routine office tasks and record-keeping"
    }
  },
  {
    id: 15,
    text: "Do you enjoy:",
    category: "R/I",
    options: {
      A: "Outdoor physical activities",
      B: "Complex problem-solving challenges"
    }
  },
  {
    id: 16,
    text: "Would you rather work in:",
    category: "A/S",
    options: {
      A: "The creative industry",
      B: "Community service or healthcare"
    }
  }
];

// Strengths Section (Section 3)
export const strengthsQuestions: Question[] = [
  {
    id: 17,
    text: "When facing challenges, do you tend to:",
    category: "Resilience/Creativity",
    options: {
      A: "Keep pushing forward (Resilience)",
      B: "Seek creative alternatives (Creativity)"
    }
  },
  {
    id: 18,
    text: "Do you prefer:",
    category: "Organization/Creativity",
    options: {
      A: "Sticking to a detailed plan (Organization)",
      B: "Thinking outside the box (Creativity)"
    }
  },
  {
    id: 19,
    text: "When working in a team, are you more likely to:",
    category: "Leadership/Organization",
    options: {
      A: "Step up and take charge (Leadership)",
      B: "Ensure everything is on track (Organization)"
    }
  },
  {
    id: 20,
    text: "In stressful situations, do you:",
    category: "Resilience/Creativity",
    options: {
      A: "Remain calm and composed (Resilience)",
      B: "Rely on creative solutions (Creativity)"
    }
  },
  {
    id: 21,
    text: "Are you better at:",
    category: "Organization/Resilience",
    options: {
      A: "Meticulous planning and execution (Organization)",
      B: "Adapting quickly to changes (Resilience)"
    }
  },
  {
    id: 22,
    text: "When making decisions, do you prioritize:",
    category: "Leadership/Organization",
    options: {
      A: "Strategic vision and influence (Leadership)",
      B: "Practical and detailed execution (Organization)"
    }
  },
  {
    id: 23,
    text: "Do you thrive in:",
    category: "Leadership/Creativity",
    options: {
      A: "Leading and motivating others (Leadership)",
      B: "Coming up with innovative ideas (Creativity)"
    }
  }
];

// Scenario Section (Section 4)
export const scenarioQuestions: Question[] = [
  {
    id: 24,
    text: "You are assigned a group project. Do you:",
    category: "Workplace",
    options: {
      A: "Take charge and lead the team (Leadership)",
      B: "Support and collaborate with team members (Empathy)",
      C: "Organize the workflow efficiently (Organization)",
      D: "Suggest creative solutions (Creativity)",
      E: "Focus on practical, goal-oriented tasks (Realism)"
    }
  },
  {
    id: 25,
    text: "In a high-pressure situation, you are most likely to:",
    category: "Workplace",
    options: {
      A: "Calmly manage the situation (Resilience)",
      B: "Motivate and support your team (Empathy)",
      C: "Come up with creative solutions (Creativity)",
      D: "Stick to a structured plan (Organization)",
      E: "Focus on realistic and logical steps (Realism)"
    }
  },
  {
    id: 26,
    text: "Your manager gives you a new project with no guidelines. You:",
    category: "Workplace",
    options: {
      A: "Quickly take initiative and organize tasks (Leadership)",
      B: "Ask questions and collaborate with peers (Empathy)",
      C: "Think outside the box for creative solutions (Creativity)",
      D: "Create a step-by-step plan (Organization)",
      E: "Analyze the project goals pragmatically (Realism)"
    }
  },
  {
    id: 27,
    text: "When working on a team project, you prioritize:",
    category: "Workplace",
    options: {
      A: "Leading and guiding the team (Leadership)",
      B: "Supporting and collaborating with peers (Empathy)",
      C: "Bringing in innovative solutions (Creativity)",
      D: "Ensuring structure and order (Organization)",
      E: "Sticking to practical and achievable goals (Realism)"
    }
  },
  {
    id: 28,
    text: "During a conflict, you are more likely to:",
    category: "Workplace",
    options: {
      A: "Take charge and resolve it diplomatically (Leadership)",
      B: "Empathize and understand all perspectives (Empathy)",
      C: "Suggest creative compromises (Creativity)",
      D: "Rely on established processes (Organization)",
      E: "Focus on logical and practical solutions (Realism)"
    }
  },
  {
    id: 29,
    text: "When given a complex task, you:",
    category: "Workplace",
    options: {
      A: "Lead the project with confidence (Leadership)",
      B: "Work collaboratively with teammates (Empathy)",
      C: "Use innovative techniques to solve it (Creativity)",
      D: "Break it into clear, organized steps (Organization)",
      E: "Stay practical and goal-oriented (Realism)"
    }
  },
  {
    id: 30,
    text: "When presented with a new technology, you:",
    category: "Workplace",
    options: {
      A: "Experiment with creative uses (Creativity)",
      B: "Lead workshops or training (Leadership)",
      C: "Collaborate with others to learn (Empathy)",
      D: "Systematically organize the information (Organization)",
      E: "Test its practical applications (Realism)"
    }
  }
];

// All questions combined
export const allQuestions = [
  ...mbtiQuestions,
  ...riasecQuestions,
  ...strengthsQuestions,
  ...scenarioQuestions
];

// MBTI Type calculation
interface FormattedAnswer {
  questionId: number;
  answer: string;
}

export interface MBTIResult {
  type: string;
  description: string;
  details: {
    I: number;
    E: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  careers: string[];
}

export function calculateMBTIType(answers: { [key: number]: string }): MBTIResult {
  // Initialize counters for each dimension
  let I = 0, E = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;

  // Process each answer
  mbtiQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    switch (question.category) {
      case "I/E":
        answer === "A" ? I++ : E++;
        break;
      case "S/N":
        answer === "A" ? S++ : N++;
        break;
      case "T/F":
        answer === "A" ? T++ : F++;
        break;
      case "J/P":
        answer === "A" ? J++ : P++;
        break;
    }
  });

  // Determine the dominant type in each dimension
  const ieResult = I >= E ? "I" : "E";
  const snResult = S >= N ? "S" : "N";
  const tfResult = T >= F ? "T" : "F";
  const jpResult = J >= P ? "J" : "P";

  // Calculate percentages
  const iePercent = Math.round((Math.max(I, E) / (I + E)) * 100);
  const snPercent = Math.round((Math.max(S, N) / (S + N)) * 100);
  const tfPercent = Math.round((Math.max(T, F) / (T + F)) * 100);
  const jpPercent = Math.round((Math.max(J, P) / (J + P)) * 100);

  // Combine the results to get the full MBTI type
  const type = ieResult + snResult + tfResult + jpResult;
  
  // Return the result with details
  return {
    type,
    description: getMBTIDescription(type),
    details: { I, E, S, N, T, F, J, P },
    careers: getMBTICareers(type)
  };
}

// RIASEC calculation
export interface RIASECResult {
  dominant: string;
  secondary: string;
  scores: {
    R: number; // Realistic
    I: number; // Investigative
    A: number; // Artistic
    S: number; // Social
    E: number; // Enterprising
    C: number; // Conventional
  };
  careers: string[];
}

export function calculateRIASECType(answers: { [key: number]: string }): RIASECResult {
  // Initialize counters for each dimension
  let R = 0, I = 0, A = 0, S = 0, E = 0, C = 0;

  // Process each answer
  riasecQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    switch (question.category) {
      case "R/I":
        answer === "A" ? R++ : I++;
        break;
      case "A/S":
        answer === "A" ? A++ : S++;
        break;
      case "E/C":
        answer === "A" ? E++ : C++;
        break;
    }
  });

  // Find the dominant and secondary types
  const scores = { R, I, A, S, E, C };
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const dominant = sortedScores[0][0];
  const secondary = sortedScores[1][0];

  // Return the result
  return {
    dominant,
    secondary,
    scores,
    careers: getRIASECCareers(dominant, secondary)
  };
}

// Strengths calculation
export interface StrengthsResult {
  scores: {
    Resilience: number;
    Organization: number;
    Creativity: number;
    Leadership: number;
  };
  topStrengths: string[];
  careers: string[];
}

export function calculateStrengths(answers: { [key: number]: string }): StrengthsResult {
  // Initialize counters
  let Resilience = 0, Organization = 0, Creativity = 0, Leadership = 0;

  // Process each answer
  strengthsQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    switch (question.category) {
      case "Resilience/Creativity":
        answer === "A" ? Resilience++ : Creativity++;
        break;
      case "Organization/Creativity":
        answer === "A" ? Organization++ : Creativity++;
        break;
      case "Leadership/Organization":
        answer === "A" ? Leadership++ : Organization++;
        break;
      case "Resilience/Creativity":
        answer === "A" ? Resilience++ : Creativity++;
        break;
      case "Organization/Resilience":
        answer === "A" ? Organization++ : Resilience++;
        break;
      case "Leadership/Organization":
        answer === "A" ? Leadership++ : Organization++;
        break;
      case "Leadership/Creativity":
        answer === "A" ? Leadership++ : Creativity++;
        break;
    }
  });

  // Calculate top strengths
  const scores = { Resilience, Organization, Creativity, Leadership };
  const sortedStrengths = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topStrengths = sortedStrengths.slice(0, 2).map(s => s[0]);

  // Return the result
  return {
    scores,
    topStrengths,
    careers: getStrengthsCareers(topStrengths)
  };
}

// Scenario-based calculation
export interface ScenarioResult {
  scores: {
    Leadership: number;
    Empathy: number;
    Organization: number;
    Creativity: number;
    Realism: number;
  };
  workplaceTraits: string[];
  workplaceRecommendations: string[];
}

export function calculateScenarioResults(answers: { [key: number]: string }): ScenarioResult {
  // Initialize counters
  let Leadership = 0, Empathy = 0, Organization = 0, Creativity = 0, Realism = 0;

  // Process each answer for scenario questions
  scenarioQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    // Map answers to traits
    switch (answer) {
      case "A":
        question.id < 28 ? Leadership++ : Creativity++;
        break;
      case "B":
        question.id < 28 ? Empathy++ : Leadership++;
        break;
      case "C":
        question.id < 28 ? Creativity++ : Empathy++;
        break;
      case "D":
        question.id < 28 ? Organization++ : Organization++;
        break;
      case "E":
        question.id < 28 ? Realism++ : Realism++;
        break;
    }
  });

  // Calculate top workplace traits
  const scores = { Leadership, Empathy, Organization, Creativity, Realism };
  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const workplaceTraits = sortedTraits.slice(0, 3).map(t => t[0]);

  // Return the result
  return {
    scores,
    workplaceTraits,
    workplaceRecommendations: getWorkplaceRecommendations(workplaceTraits)
  };
}

// Final Career Report
export interface CareerReport {
  mbti: MBTIResult;
  riasec: RIASECResult;
  strengths: StrengthsResult;
  scenario: ScenarioResult;
  finalRecommendations: string[];
  timestamp: string;
}

export function generateCareerReport(answers: { [key: number]: string }): CareerReport {
  const mbti = calculateMBTIType(answers);
  const riasec = calculateRIASECType(answers);
  const strengths = calculateStrengths(answers);
  const scenario = calculateScenarioResults(answers);

  // Combine all career recommendations and get the most frequent ones
  const allCareers = [
    ...mbti.careers,
    ...riasec.careers,
    ...strengths.careers
  ];

  // Count occurrences of each career
  const careerCounts = allCareers.reduce((counts, career) => {
    counts[career] = (counts[career] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Sort by frequency and take the top 9
  const finalRecommendations = Object.entries(careerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9)
    .map(entry => entry[0]);

  return {
    mbti,
    riasec,
    strengths,
    scenario,
    finalRecommendations,
    timestamp: new Date().toISOString()
  };
}

// Helper functions for descriptions and career recommendations
function getMBTIDescription(type: string): string {
  const descriptions: Record<string, string> = {
    "INTJ": "The Architect - Strategic, innovative, and with a natural drive to improve systems and processes.",
    "INTP": "The Logician - Inventive, curious, and creative problem-solver with a strong desire for logical accuracy.",
    "ENTJ": "The Commander - Bold, decisive, and strategic leader with a talent for organization and long-term planning.",
    "ENTP": "The Debater - Quick-thinking, innovative, and adaptable with a passion for intellectual challenges.",
    "INFJ": "The Advocate - Idealistic, principled, and with deep insights into human connections and motivations.",
    "INFP": "The Mediator - Empathetic, creative, and driven by personal values and a desire for authenticity.",
    "ENFJ": "The Protagonist - Charismatic, empathetic leader who naturally inspires and supports others.",
    "ENFP": "The Campaigner - Enthusiastic, creative, and socially adept with a passion for possibilities.",
    "ISTJ": "The Logistician - Practical, detail-oriented, and reliable with a strong sense of duty.",
    "ISFJ": "The Defender - Dedicated, warm-hearted, and protective with a deep commitment to responsibility.",
    "ESTJ": "The Executive - Practical, decisive, and focused on creating order and enforcing standards.",
    "ESFJ": "The Consul - Caring, social, and process-oriented with a drive for harmony and connection.",
    "ISTP": "The Virtuoso - Practical problem-solver with a mastery of tools and an adventurous spirit.",
    "ISFP": "The Adventurer - Artistic, sensitive, and with a strong aesthetic sense and appreciation for experiences.",
    "ESTP": "The Entrepreneur - Energetic, action-oriented risk-taker with an eye for opportunity.",
    "ESFP": "The Entertainer - Spontaneous, energetic, and people-oriented with a talent for enjoyment.",
  };

  return descriptions[type] || "A unique combination of personality traits that influence your approach to work and life.";
}

function getMBTICareers(type: string): string[] {
  const careers: Record<string, string[]> = {
    "INTJ": ["Data Scientist", "Software Architect", "Management Consultant", "Financial Analyst", "Investment Banker"],
    "INTP": ["Research Scientist", "Software Developer", "Systems Analyst", "Mathematician", "Economist"],
    "ENTJ": ["Executive", "Management Consultant", "Lawyer", "Entrepreneur", "Business Analyst"],
    "ENTP": ["Entrepreneur", "Creative Director", "Marketing Strategist", "Business Developer", "Political Consultant"],
    "INFJ": ["Psychologist", "Writer", "HR Manager", "Social Worker", "Educational Consultant"],
    "INFP": ["Writer", "Counselor", "UX Designer", "Librarian", "Social Media Manager"],
    "ENFJ": ["Teacher", "HR Director", "Marketing Manager", "Public Relations Specialist", "Nonprofit Manager"],
    "ENFP": ["Creative Director", "Journalist", "Event Planner", "Marketing Specialist", "Career Counselor"],
    "ISTJ": ["Accountant", "Project Manager", "Financial Analyst", "Quality Assurance Specialist", "Database Administrator"],
    "ISFJ": ["Nurse", "Elementary Teacher", "HR Specialist", "Administrative Manager", "Social Worker"],
    "ESTJ": ["Operations Manager", "Financial Manager", "Sales Manager", "Insurance Agent", "Military Officer"],
    "ESFJ": ["Nurse", "School Teacher", "HR Manager", "Customer Service Manager", "Event Planner"],
    "ISTP": ["Engineer", "Forensic Scientist", "Mechanic", "Pilot", "Software Developer"],
    "ISFP": ["Graphic Designer", "Fashion Designer", "Photographer", "Physical Therapist", "Landscape Architect"],
    "ESTP": ["Sales Executive", "Marketing Manager", "Entrepreneur", "Project Manager", "Police Officer"],
    "ESFP": ["Event Planner", "Sales Representative", "Public Relations Specialist", "Tour Guide", "Fitness Trainer"]
  };

  return careers[type] || ["Analyst", "Consultant", "Researcher", "Creative Professional", "Specialist"];
}

function getRIASECCareers(primary: string, secondary: string): string[] {
  const combinedType = primary + secondary;
  const careers: Record<string, string[]> = {
    "RI": ["Research Scientist", "Medical Researcher", "Engineer", "Technical Analyst", "Systems Analyst"],
    "RA": ["Architect", "Technical Designer", "Audio Engineer", "Carpenter", "Photographer"],
    "RS": ["Athletic Trainer", "Physical Therapist", "Park Ranger", "Emergency Medical Technician", "Occupational Therapist"],
    "RE": ["Construction Manager", "Agricultural Manager", "Police Officer", "Military Officer", "Sports Coach"],
    "RC": ["Engineering Technician", "Quality Control Analyst", "Carpenter", "Surveyor", "Network Administrator"],
    "IR": ["Biomedical Engineer", "Environmental Scientist", "Robotics Engineer", "Software Developer", "Veterinarian"],
    "IA": ["Medical Illustrator", "Anthropologist", "Neuroscientist", "Technical Writer", "Game Designer"],
    "IS": ["Physician", "Psychologist", "Pharmacist", "Nutritionist", "Research Psychologist"],
    "IE": ["Medical Scientist", "Computer Systems Analyst", "Management Consultant", "Operations Research Analyst", "Environmental Engineer"],
    "IC": ["Mathematician", "Statistician", "Financial Analyst", "Actuary", "Database Administrator"],
    "AR": ["Landscape Architect", "Fashion Designer", "Chef", "Interior Designer", "Sculptor"],
    "AI": ["Film Director", "Music Composer", "Writer", "Multimedia Artist", "Art Director"],
    "AS": ["Art Therapist", "Music Therapist", "Drama Teacher", "Dance Instructor", "Speech Pathologist"],
    "AE": ["Creative Director", "Producer", "Public Relations Specialist", "Fashion Merchandiser", "Advertising Executive"],
    "AC": ["Web Designer", "Technical Writer", "Editor", "Court Reporter", "Medical Illustrator"],
    "SR": ["Dental Hygienist", "Massage Therapist", "Fitness Instructor", "Recreational Therapist", "Elementary School Teacher"],
    "SI": ["School Counselor", "Speech Pathologist", "Dietitian", "Occupational Therapist", "School Psychologist"],
    "SA": ["Special Education Teacher", "Dance Therapist", "Music Therapist", "Speech Pathologist", "Art Therapist"],
    "SE": ["Healthcare Administrator", "School Principal", "Social Service Manager", "Training Manager", "Public Health Educator"],
    "SC": ["School Administrator", "Medical Records Technician", "Dental Assistant", "Library Technician", "Insurance Claims Clerk"],
    "ER": ["Real Estate Agent", "Sports Agent", "Retail Store Manager", "Chef", "Flight Attendant"],
    "EI": ["Corporate Lawyer", "Economist", "Management Consultant", "Market Research Analyst", "Political Scientist"],
    "EA": ["Art Director", "Public Relations Manager", "Advertising Executive", "Entertainment Agent", "Marketing Manager"],
    "ES": ["Sales Manager", "Hospital Administrator", "Hotel Manager", "Retail Manager", "Restaurant Manager"],
    "EC": ["Executive Administrative Assistant", "Office Manager", "Project Manager", "Property Manager", "Retail Buyer"],
    "CR": ["Building Inspector", "Air Traffic Controller", "Dental Assistant", "Electrical Engineering Technician", "Food Service Manager"],
    "CI": ["Accountant", "Budget Analyst", "Actuary", "Financial Analyst", "Auditor"],
    "CA": ["Technical Writer", "Web Developer", "Desktop Publisher", "Legal Secretary", "Medical Transcriptionist"],
    "CS": ["Medical Records Technician", "Bookkeeper", "Library Assistant", "Paralegal", "Receptionist"],
    "CE": ["Office Manager", "Project Manager", "Court Reporter", "Administrative Services Manager", "Compensation Manager"]
  };

  // If no direct match, return some general careers for the primary type
  if (!careers[combinedType]) {
    const generalCareers: Record<string, string[]> = {
      "R": ["Engineer", "Carpenter", "Mechanic", "Electrician", "Construction Worker"],
      "I": ["Scientist", "Researcher", "Doctor", "Systems Analyst", "Professor"],
      "A": ["Artist", "Designer", "Writer", "Musician", "Actor"],
      "S": ["Teacher", "Counselor", "Nurse", "Social Worker", "Therapist"],
      "E": ["Manager", "Salesperson", "Entrepreneur", "Lawyer", "Real Estate Agent"],
      "C": ["Accountant", "Administrative Assistant", "Banker", "Data Entry Specialist", "Bookkeeper"]
    };
    
    return generalCareers[primary] || ["Analyst", "Specialist", "Technician", "Associate", "Coordinator"];
  }
  
  return careers[combinedType];
}

function getStrengthsCareers(topStrengths: string[]): string[] {
  const strengthCareers: Record<string, string[]> = {
    "Resilience": ["Emergency Services", "Crisis Manager", "Healthcare Professional", "Military Officer", "Entrepreneur"],
    "Organization": ["Project Manager", "Executive Assistant", "Operations Manager", "Event Planner", "Logistics Coordinator"],
    "Creativity": ["Designer", "Marketing Specialist", "Writer", "Innovation Consultant", "Product Developer"],
    "Leadership": ["Manager", "Director", "Team Lead", "Executive", "Business Owner"]
  };
  
  // Combine careers from top strengths
  const combinedCareers: string[] = [];
  topStrengths.forEach(strength => {
    if (strengthCareers[strength]) {
      combinedCareers.push(...strengthCareers[strength]);
    }
  });
  
  return combinedCareers;
}

function getWorkplaceRecommendations(traits: string[]): string[] {
  const traitRecommendations: Record<string, string[]> = {
    "Leadership": ["Management positions", "Team lead roles", "Strategic positions", "Entrepreneurial ventures"],
    "Empathy": ["Collaborative environments", "Support roles", "Customer-facing positions", "Mentorship opportunities"],
    "Organization": ["Structured environments", "Process-oriented roles", "Detail-focused positions", "Planning roles"],
    "Creativity": ["Innovation teams", "Design roles", "Research and development", "Creative industries"],
    "Realism": ["Practical, hands-on roles", "Implementation positions", "Operational roles", "Technical positions"]
  };
  
  // Combine recommendations from top traits
  const combinedRecommendations: string[] = [];
  traits.forEach(trait => {
    if (traitRecommendations[trait]) {
      combinedRecommendations.push(...traitRecommendations[trait]);
    }
  });
  
  return combinedRecommendations;
}

// Dictionary of personality descriptions for result page
export const personalityDescriptions: Record<string, { description: string, careers: string[] }> = {};
Object.keys(getMBTIDescription("")).forEach(type => {
  personalityDescriptions[type] = {
    description: getMBTIDescription(type),
    careers: getMBTICareers(type)
  };
});
