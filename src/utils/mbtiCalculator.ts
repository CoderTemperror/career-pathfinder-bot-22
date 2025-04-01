
type MBTIQuestion = {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  optionA: string; // Maps to the first letter (E, S, T, J)
  optionB: string; // Maps to the second letter (I, N, F, P)
};

type MBTIAnswer = {
  questionId: number;
  answer: 'A' | 'B';
};

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    dimension: 'SN',
    optionA: "I remember past events vividly and assign personal meanings to information I gather.",
    optionB: "I take information at face value and focus on observing things as they are through my senses.",
  },
  {
    id: 2,
    dimension: 'SN',
    optionA: "I naturally think of multiple possibilities and alternatives when predicting outcomes.",
    optionB: "I focus on the most likely and probable outcome when making predictions.",
  },
  {
    id: 3,
    dimension: 'TF',
    optionA: "I prioritize harmony and meeting others' needs, often keeping my opinions to myself to maintain peace.",
    optionB: "I prioritize authenticity and my values, even if it means disrupting harmony to express them.",
  },
  {
    id: 4,
    dimension: 'TF',
    optionA: "I trust external data and proof. If something isn't backed by evidence, I may dismiss it.",
    optionB: "I analyze things myself and form my own conclusions, trusting ideas that make sense to me regardless of proof.",
  },
  {
    id: 5,
    dimension: 'SN',
    optionA: "When hiking, I'm focused on my surroundings - observing trees, plants, colors, and textures.",
    optionB: "When hiking, I'm often caught in my thoughts, walking on autopilot while thinking about various topics.",
  },
  {
    id: 6,
    dimension: 'SN',
    optionA: "I enjoy researching topics I'm interested in, regardless of whether it benefits me practically.",
    optionB: "I prefer not to research subjects deeply unless I can see a practical use or end result.",
  },
  {
    id: 7,
    dimension: 'TF',
    optionA: "I prioritize efficiency, logic, and objective facts over feelings and social harmony.",
    optionB: "I prioritize values, ethics, and others' feelings over efficiency and objective logic.",
  },
  {
    id: 8,
    dimension: 'EI',
    optionA: "I'm more focused on my inner world and feel energized when thinking and planning by myself.",
    optionB: "I'm more focused on the external world and feel energized through action and interacting with others.",
  },
  {
    id: 9,
    dimension: 'SN',
    optionA: "I often get lost in thoughts and may miss things in my physical surroundings or feel awkward in my body.",
    optionB: "I easily focus on my surroundings, have good reflexes, and enjoy physical activities.",
  },
  {
    id: 10,
    dimension: 'JP',
    optionA: "I often have sudden realizations or 'epiphanies' that seem to come from nowhere with solutions or predictions.",
    optionB: "I reach answers through conscious effort, by exploring possibilities or reviewing past information.",
  },
  {
    id: 11,
    dimension: 'JP',
    optionA: "I tend to act quickly without overthinking, saying things as soon as they come to mind.",
    optionB: "I think things through thoroughly before acting, sometimes missing opportunities to speak up.",
  },
  {
    id: 12,
    dimension: 'EI',
    optionA: "I prefer working in a quiet environment where I can focus deeply without interruptions.",
    optionB: "I enjoy working in vibrant environments with lots of activity and opportunities to interact.",
  },
  {
    id: 13,
    dimension: 'JP',
    optionA: "I like to plan my day in advance and prefer to stick to that plan.",
    optionB: "I prefer to be spontaneous and adapt to circumstances as they arise.",
  },
  {
    id: 14,
    dimension: 'TF',
    optionA: "When making decisions, I consider people's feelings and work to create harmony.",
    optionB: "When making decisions, I focus on what makes logical sense regardless of how others feel.",
  },
  {
    id: 15,
    dimension: 'SN',
    optionA: "I'm more curious about abstract ideas and theoretical concepts.",
    optionB: "I'm more interested in facts, details, and practical applications.",
  },
  {
    id: 16,
    dimension: 'EI',
    optionA: "After a busy day, I recharge by spending time alone or with a close friend.",
    optionB: "After a busy day, I recharge by meeting friends or attending social events.",
  },
  {
    id: 17,
    dimension: 'JP',
    optionA: "I prefer clear expectations and deadlines for projects I'm working on.",
    optionB: "I prefer open-ended projects where I can adjust the process as I go.",
  },
  {
    id: 18,
    dimension: 'TF',
    optionA: "I typically make decisions based on how I feel about the situation and the people involved.",
    optionB: "I typically make decisions by analyzing facts and considering cause-and-effect relationships.",
  },
  {
    id: 19,
    dimension: 'SN',
    optionA: "I prefer thinking about real things that can be verified through my senses.",
    optionB: "I prefer thinking about possibilities and what could be rather than what is.",
  },
  {
    id: 20,
    dimension: 'EI',
    optionA: "I tend to think out loud and talk through problems with others to solve them.",
    optionB: "I prefer to think through problems in my head before sharing my thoughts.",
  },
];

type DimensionCount = {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
};

export function calculateMBTIType(answers: MBTIAnswer[]): string {
  const counts: DimensionCount = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  answers.forEach(answer => {
    const question = mbtiQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    const { dimension } = question;
    
    if (answer.answer === 'A') {
      // First letter of dimension
      if (dimension === 'EI') counts.E += 1;
      if (dimension === 'SN') counts.N += 1;
      if (dimension === 'TF') counts.T += 1;
      if (dimension === 'JP') counts.J += 1;
    } else {
      // Second letter of dimension
      if (dimension === 'EI') counts.I += 1;
      if (dimension === 'SN') counts.S += 1;
      if (dimension === 'TF') counts.F += 1;
      if (dimension === 'JP') counts.P += 1;
    }
  });

  // Calculate each dimension based on which has more counts
  const E_or_I = counts.E >= counts.I ? 'E' : 'I';
  const S_or_N = counts.S >= counts.N ? 'S' : 'N';
  const T_or_F = counts.T >= counts.F ? 'T' : 'F';
  const J_or_P = counts.J >= counts.P ? 'J' : 'P';

  return `${E_or_I}${S_or_N}${T_or_F}${J_or_P}`;
}

export const personalityDescriptions: Record<string, { description: string, careers: string[] }> = {
  'ISTJ': {
    description: 'Responsible, organized, and practical. Values tradition and works systematically.',
    careers: ['Accountant', 'Auditor', 'Project Manager', 'Financial Analyst', 'Systems Administrator', 'Quality Assurance Specialist']
  },
  'ISFJ': {
    description: 'Caring, loyal, and detail-oriented. Enjoys serving others and maintaining harmony.',
    careers: ['Nurse', 'Teacher', 'Healthcare Administrator', 'Social Worker', 'HR Specialist', 'Dietitian']
  },
  'INFJ': {
    description: 'Insightful, creative, and principled. Seeks meaning and connection in all things.',
    careers: ['Counselor', 'Psychologist', 'Writer', 'Professor', 'Non-profit Director', 'Medical Researcher']
  },
  'INTJ': {
    description: 'Strategic, independent, and innovative. Driven by ideas and skeptical of authority.',
    careers: ['Scientist', 'Software Architect', 'Investment Banker', 'Strategic Planner', 'Management Consultant', 'Biomedical Engineer']
  },
  'ISTP': {
    description: 'Practical problem-solver with exceptional technical skills. Values efficiency and logic.',
    careers: ['Engineer', 'Mechanic', 'Pilot', 'Forensic Scientist', 'Technical Specialist', 'Surgeon']
  },
  'ISFP': {
    description: 'Artistic, sensitive, and in tune with surroundings. Enjoys creating beautiful experiences.',
    careers: ['Artist', 'Designer', 'Composer', 'Veterinarian', 'Physical Therapist', 'Landscape Architect']
  },
  'INFP': {
    description: 'Idealistic, compassionate, and authentic. Seeks to understand people and help them fulfill their potential.',
    careers: ['Writer', 'Therapist', 'Non-profit Worker', 'Professor', 'UX Designer', 'Environmental Scientist']
  },
  'INTP': {
    description: 'Analytical, objective, and theoretical. Enjoys pursuing complex ideas and possibilities.',
    careers: ['Software Developer', 'Researcher', 'Mathematician', 'Professor', 'Systems Analyst', 'Economist']
  },
  'ESTP': {
    description: 'Energetic, adaptable, and observant. Thrives on solving immediate problems and taking risks.',
    careers: ['Entrepreneur', 'Police Officer', 'Sales Manager', 'Marketing Executive', 'Sports Coach', 'Emergency Room Physician']
  },
  'ESFP': {
    description: 'Outgoing, spontaneous, and supportive. Lives in the moment and brings joy to others.',
    careers: ['Event Planner', 'Public Relations Specialist', 'Performer', 'Sales Representative', 'Flight Attendant', 'Tour Guide']
  },
  'ENFP': {
    description: 'Enthusiastic, creative, and people-oriented. Seeks to inspire others and explore possibilities.',
    careers: ['Marketing Specialist', 'Entrepreneur', 'Teacher', 'Coach', 'Consultant', 'Creative Director']
  },
  'ENTP': {
    description: 'Quick-witted, curious, and versatile. Enjoys intellectual challenges and exploring new ideas.',
    careers: ['Entrepreneur', 'Lawyer', 'Creative Director', 'Consultant', 'Software Developer', 'Startup Founder']
  },
  'ESTJ': {
    description: 'Efficient, logical, and traditional. Thrives on creating order and following procedures.',
    careers: ['Manager', 'Military Officer', 'Judge', 'Financial Officer', 'School Principal', 'Executive']
  },
  'ESFJ': {
    description: 'Warm, cooperative, and organized. Values harmony and puts effort into meeting others\' needs.',
    careers: ['Healthcare Administrator', 'Teacher', 'Sales Representative', 'Event Planner', 'HR Manager', 'Registered Nurse']
  },
  'ENFJ': {
    description: 'Charismatic, empathetic, and decisive. Natural leaders who inspire others to grow.',
    careers: ['Teacher', 'HR Director', 'Sales Manager', 'Non-profit Leader', 'Counselor', 'Corporate Trainer']
  },
  'ENTJ': {
    description: 'Strategic, logical, and assertive. Natural leaders who drive toward efficiency and results.',
    careers: ['Executive', 'Entrepreneur', 'Lawyer', 'Management Consultant', 'Business Developer', 'University Professor']
  }
};

export function getSuggestedPrompts(mbtiType: string): string[] {
  const generalPrompts = [
    `What careers best suit an ${mbtiType} personality type?`,
    `What skills should I develop as an ${mbtiType}?`,
    `What are the work environment preferences for ${mbtiType}?`,
    `What careers should I avoid as an ${mbtiType}?`,
    `How can I balance my ${mbtiType} strengths and weaknesses in my career?`,
  ];
  
  // Get personality-specific careers from our database
  const personalityInfo = personalityDescriptions[mbtiType] || { careers: [] };
  
  // Add career-specific prompts based on MBTI type
  const careerPrompts = personalityInfo.careers.map(career => 
    `Tell me more about a career as a ${career}`
  ).slice(0, 3); // Take up to 3 career-specific prompts
  
  return [...generalPrompts, ...careerPrompts];
}
