
export type MBTIQuestion = {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  optionA: string;
  optionB: string;
  directionA: 'E' | 'S' | 'T' | 'J';
  directionB: 'I' | 'N' | 'F' | 'P';
};

export type MBTIAnswer = {
  questionId: number;
  answer: 'A' | 'B';
};

export type MBTIPersonalityInfo = {
  description: string;
  careers: string[];
};
