type MBTIQuestion = {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  optionA: string;
  optionB: string;
  directionA: 'E' | 'S' | 'T' | 'J';
  directionB: 'I' | 'N' | 'F' | 'P';
};

type MBTIAnswer = {
  questionId: number;
  answer: 'A' | 'B';
};

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    dimension: 'EI',
    optionA: "I feel energized after spending time with a group of people.",
    optionB: "I feel drained after spending time with a group of people and need alone time to recharge.",
    directionA: 'E',
    directionB: 'I'
  },
  {
    id: 2,
    dimension: 'EI',
    optionA: "I prefer to work out ideas with others rather than thinking through them alone.",
    optionB: "I prefer to think through ideas thoroughly before sharing them with others.",
    directionA: 'E',
    directionB: 'I'
  },
  {
    id: 3,
    dimension: 'EI',
    optionA: "I tend to speak first and think later.",
    optionB: "I tend to think first and speak later.",
    directionA: 'E',
    directionB: 'I'
  },
  {
    id: 4,
    dimension: 'EI',
    optionA: "I have a wide circle of friends and acquaintances.",
    optionB: "I have a small circle of close friends.",
    directionA: 'E',
    directionB: 'I'
  },
  {
    id: 5,
    dimension: 'EI',
    optionA: "I prefer environments with lots of activity and interaction.",
    optionB: "I prefer quiet environments where I can focus without interruption.",
    directionA: 'E',
    directionB: 'I'
  },
  {
    id: 6,
    dimension: 'SN',
    optionA: "I focus on the concrete reality and what I can directly observe.",
    optionB: "I focus on patterns, possibilities, and the meaning behind information.",
    directionA: 'S',
    directionB: 'N'
  },
  {
    id: 7,
    dimension: 'SN',
    optionA: "I trust experience and what has worked in the past.",
    optionB: "I trust inspiration and theoretical insights for future possibilities.",
    directionA: 'S',
    directionB: 'N'
  },
  {
    id: 8,
    dimension: 'SN',
    optionA: "I prefer detailed, step-by-step instructions.",
    optionB: "I prefer general guidelines that allow for creative interpretation.",
    directionA: 'S',
    directionB: 'N'
  },
  {
    id: 9,
    dimension: 'SN',
    optionA: "When reading, I focus on the specific facts and details presented.",
    optionB: "When reading, I look for the overall meaning and connections to other concepts.",
    directionA: 'S',
    directionB: 'N'
  },
  {
    id: 10,
    dimension: 'SN',
    optionA: "I'm more interested in practical applications than theoretical concepts.",
    optionB: "I'm more interested in exploring abstract ideas and theoretical concepts.",
    directionA: 'S',
    directionB: 'N'
  },
  {
    id: 11,
    dimension: 'TF',
    optionA: "When making decisions, I prioritize logic and objective analysis.",
    optionB: "When making decisions, I prioritize values and how people will be affected.",
    directionA: 'T',
    directionB: 'F'
  },
  {
    id: 12,
    dimension: 'TF',
    optionA: "I tend to notice logical inconsistencies in what others say or do.",
    optionB: "I tend to notice when someone's feelings might be hurt in a conversation.",
    directionA: 'T',
    directionB: 'F'
  },
  {
    id: 13,
    dimension: 'TF',
    optionA: "I prefer giving honest feedback even if it might upset someone.",
    optionB: "I prefer being tactful over being brutally honest if it prevents hurt feelings.",
    directionA: 'T',
    directionB: 'F'
  },
  {
    id: 14,
    dimension: 'TF',
    optionA: "I tend to analyze problems objectively, without considering personal feelings.",
    optionB: "I consider how a decision will impact the harmony and well-being of everyone involved.",
    directionA: 'T',
    directionB: 'F'
  },
  {
    id: 15,
    dimension: 'TF',
    optionA: "I value truth and fairness over tact and harmony.",
    optionB: "I value harmony and compassion over objective truth.",
    directionA: 'T',
    directionB: 'F'
  },
  {
    id: 16,
    dimension: 'JP',
    optionA: "I prefer having a clear schedule and sticking to it.",
    optionB: "I prefer keeping my options open and deciding things as they come.",
    directionA: 'J',
    directionB: 'P'
  },
  {
    id: 17,
    dimension: 'JP',
    optionA: "I find it satisfying to complete projects and make final decisions.",
    optionB: "I enjoy the process of exploring possibilities more than reaching conclusions.",
    directionA: 'J',
    directionB: 'P'
  },
  {
    id: 18,
    dimension: 'JP',
    optionA: "I prefer environments that are organized and structured.",
    optionB: "I prefer environments that are flexible and spontaneous.",
    directionA: 'J',
    directionB: 'P'
  },
  {
    id: 19,
    dimension: 'JP',
    optionA: "I like to plan activities well in advance.",
    optionB: "I like to be spontaneous and go with the flow.",
    directionA: 'J',
    directionB: 'P'
  },
  {
    id: 20,
    dimension: 'JP',
    optionA: "I feel stressed when deadlines or plans change unexpectedly.",
    optionB: "I easily adapt to changing circumstances and new information.",
    directionA: 'J',
    directionB: 'P'
  }
];

export function calculateMBTIType(answers: MBTIAnswer[]): string {
  const scores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };

  answers.forEach(answer => {
    const question = mbtiQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    const { dimension } = question;
    
    if (answer.answer === 'A') {
      switch (question.directionA) {
        case 'E': scores.EI += 1; break;
        case 'S': scores.SN += 1; break;
        case 'T': scores.TF += 1; break;
        case 'J': scores.JP += 1; break;
      }
    } else {
      switch (question.directionB) {
        case 'I': scores.EI -= 1; break;
        case 'N': scores.SN -= 1; break;
        case 'F': scores.TF -= 1; break;
        case 'P': scores.JP -= 1; break;
      }
    }
  });

  const E_or_I = scores.EI >= 0 ? 'E' : 'I';
  const S_or_N = scores.SN >= 0 ? 'S' : 'N';
  const T_or_F = scores.TF >= 0 ? 'T' : 'F';
  const J_or_P = scores.JP >= 0 ? 'J' : 'P';

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
  
  const personalityInfo = personalityDescriptions[mbtiType] || { careers: [] };
  
  const careerPrompts = personalityInfo.careers.map(career => 
    `Tell me more about a career as a ${career}`
  ).slice(0, 3);
  
  return [...generalPrompts, ...careerPrompts];
}
