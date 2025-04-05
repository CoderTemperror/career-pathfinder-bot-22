
// Types for MBTI assessment
export type MBTIDimension = "I-E" | "S-N" | "T-F" | "J-P";
export type MBTIOption = "A" | "B";
export type MBTIPersonalityType = "ISTJ" | "ISFJ" | "INFJ" | "INTJ" | "ISTP" | "ISFP" | "INFP" | "INTP" | "ESTP" | "ESFP" | "ENFP" | "ENTP" | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export interface MBTIQuestion {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  dimension: MBTIDimension;
}

export interface MBTIAnswer {
  questionId: number;
  selectedOption: MBTIOption;
  dimension: MBTIDimension;
}

export interface MBTIDimensionResult {
  E?: number;
  I?: number;
  S?: number;
  N?: number;
  T?: number;
  F?: number;
  J?: number;
  P?: number;
  dominant: string;
}

export interface MBTIResult {
  type: string;
  dimensions: {
    IE: MBTIDimensionResult;
    SN: MBTIDimensionResult;
    TF: MBTIDimensionResult;
    JP: MBTIDimensionResult;
  };
}
