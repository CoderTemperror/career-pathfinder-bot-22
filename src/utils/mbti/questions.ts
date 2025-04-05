
import { MBTIQuestion } from './types';

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    text: "Which describes you better?",
    optionA: "I plan my day ahead",
    optionB: "I go with the flow",
    dimension: "J-P"
  },
  {
    id: 2,
    text: "Which describes you better?",
    optionA: "I love solving problems",
    optionB: "I love creating ideas",
    dimension: "T-F" // This maps to Thinking vs Feeling
  },
  {
    id: 3,
    text: "Which describes you better?",
    optionA: "I organize the group",
    optionB: "I support the group",
    dimension: "T-F" // Changed from J-F to T-F as J-F is not a valid dimension
  },
  {
    id: 4,
    text: "Which describes you better?",
    optionA: "I enjoy working alone",
    optionB: "I enjoy working with others",
    dimension: "I-E"
  },
  {
    id: 5,
    text: "Which describes you better?",
    optionA: "I like clear instructions",
    optionB: "I like open-ended tasks",
    dimension: "S-N"
  },
  {
    id: 6,
    text: "Which describes you better?",
    optionA: "I decide with logic",
    optionB: "I decide with empathy",
    dimension: "T-F"
  },
  {
    id: 7,
    text: "Which describes you better?",
    optionA: "I prefer technical tasks",
    optionB: "I prefer creative tasks",
    dimension: "T-F" // Changed from T-N to T-F as T-N is not a valid dimension
  },
  {
    id: 8,
    text: "Which describes you better?",
    optionA: "I like quiet workspaces",
    optionB: "I like buzzing environments",
    dimension: "I-E"
  },
  {
    id: 9,
    text: "Which describes you better?",
    optionA: "I finish early",
    optionB: "I work best under pressure",
    dimension: "J-P"
  },
  {
    id: 10,
    text: "Which describes you better?",
    optionA: "I feel great checking things off",
    optionB: "I feel great starting something new",
    dimension: "S-N"
  },
  {
    id: 11,
    text: "Which describes you better?",
    optionA: "I'd start my own thing",
    optionB: "I'd join a stable company",
    dimension: "J-P" // Changed from P-J to J-P as P-J is not a valid dimension
  },
  {
    id: 12,
    text: "Which describes you better?",
    optionA: "I like learning alone",
    optionB: "I learn better with people",
    dimension: "I-E"
  },
  {
    id: 13,
    text: "Which describes you better?",
    optionA: "I prefer systems",
    optionB: "I prefer people",
    dimension: "T-F"
  },
  {
    id: 14,
    text: "Which describes you better?",
    optionA: "I trust facts",
    optionB: "I trust gut feeling",
    dimension: "S-N"
  },
  {
    id: 15,
    text: "Which describes you better?",
    optionA: "I keep meetings short and clear",
    optionB: "I enjoy exploring ideas in meetings",
    dimension: "T-F"
  },
  {
    id: 16,
    text: "Which describes you better?",
    optionA: "I'd rather be a data analyst or engineer",
    optionB: "I'd rather be a designer or content creator",
    dimension: "T-F" // Changed from T-N to T-F as T-N is not a valid dimension
  },
  {
    id: 17,
    text: "Which describes you better?",
    optionA: "I recharge alone",
    optionB: "I recharge with people",
    dimension: "I-E"
  },
  {
    id: 18,
    text: "Which describes you better?",
    optionA: "I ask \"Will it work?\"",
    optionB: "I ask \"What if?\"",
    dimension: "S-N"
  },
  {
    id: 19,
    text: "Which describes you better?",
    optionA: "I stay calm in conflict",
    optionB: "I read emotions in conflict",
    dimension: "T-F"
  },
  {
    id: 20,
    text: "Which describes you better?",
    optionA: "I want to master my field",
    optionB: "I want to make an impact",
    dimension: "T-F" // Changed from J-F to T-F as J-F is not a valid dimension
  }
];
