
import { MBTIQuestion } from './types';

// New updated MBTI questions based on user input
export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    text: "How do you prefer to start your workday?",
    optionA: "With a to-do list and clear plan",
    optionB: "By diving into whatever feels most urgent or interesting",
    dimension: "J-P" // Judging vs Perceiving
  },
  {
    id: 2,
    text: "Which excites you more?",
    optionA: "Solving a challenging technical problem",
    optionB: "Brainstorming creative ideas for a project",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 3,
    text: "In a team setting, you prefer to:",
    optionA: "Take charge and organize tasks",
    optionB: "Support others and keep the team vibe positive",
    dimension: "T-F" // Thinking vs Feeling
  },
  {
    id: 4,
    text: "When working alone, you feel:",
    optionA: "Focused and productive",
    optionB: "Disconnected and unmotivated",
    dimension: "I-E" // Introversion vs Extraversion
  },
  {
    id: 5,
    text: "You prefer tasks that are:",
    optionA: "Structured and logical",
    optionB: "Open-ended and imaginative",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 6,
    text: "When deciding on a solution, you value:",
    optionA: "Practicality and data",
    optionB: "Feelings and potential impact on people",
    dimension: "T-F" // Thinking vs Feeling
  },
  {
    id: 7,
    text: "You'd rather spend your day:",
    optionA: "Analyzing data in Excel or coding",
    optionB: "Designing visuals or writing content",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 8,
    text: "Your ideal workplace is:",
    optionA: "Quiet, focused, minimal distractions",
    optionB: "Social, dynamic, full of energy",
    dimension: "I-E" // Introversion vs Extraversion
  },
  {
    id: 9,
    text: "When facing a deadline, you:",
    optionA: "Schedule your time to avoid last-minute stress",
    optionB: "Thrive under pressure and do your best work at the end",
    dimension: "J-P" // Judging vs Perceiving
  },
  {
    id: 10,
    text: "You feel more satisfied after:",
    optionA: "Completing all your tasks efficiently",
    optionB: "Creating something new or meaningful",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 11,
    text: "You're more drawn to:",
    optionA: "Startups and entrepreneurship",
    optionB: "Large organizations with clear roles",
    dimension: "J-P" // Judging vs Perceiving (entrepreneurship tends to be more P, structure more J)
  },
  {
    id: 12,
    text: "You prefer learning:",
    optionA: "Through books, tutorials, and solo study",
    optionB: "Through discussion, collaboration, and hands-on experience",
    dimension: "I-E" // Introversion vs Extraversion
  },
  {
    id: 13,
    text: "You would rather:",
    optionA: "Work with systems and processes",
    optionB: "Work with people and emotions",
    dimension: "T-F" // Thinking vs Feeling
  },
  {
    id: 14,
    text: "You trust:",
    optionA: "Logic over emotion",
    optionB: "Intuition over facts",
    dimension: "T-F" // Thinking vs Feeling
  },
  {
    id: 15,
    text: "In meetings, you tend to:",
    optionA: "Get straight to the point",
    optionB: "Enjoy exploring all perspectives",
    dimension: "J-P" // Judging vs Perceiving
  },
  {
    id: 16,
    text: "Which career sounds more appealing?",
    optionA: "Data analyst or software engineer",
    optionB: "Marketing strategist or UX designer",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 17,
    text: "You recharge by:",
    optionA: "Spending time alone or with close friends",
    optionB: "Being around lots of people or social events",
    dimension: "I-E" // Introversion vs Extraversion
  },
  {
    id: 18,
    text: "When working on a new idea, you:",
    optionA: "Evaluate feasibility and plan next steps",
    optionB: "Dream big and figure it out later",
    dimension: "S-N" // Sensing vs Intuition
  },
  {
    id: 19,
    text: "In conflict, you:",
    optionA: "Stay calm, seek logical resolution",
    optionB: "Read the room, prioritize harmony",
    dimension: "T-F" // Thinking vs Feeling
  },
  {
    id: 20,
    text: "Your long-term goal is to:",
    optionA: "Build expertise and be the best in your field",
    optionB: "Make a difference and inspire others",
    dimension: "T-F" // Thinking vs Feeling
  }
];
