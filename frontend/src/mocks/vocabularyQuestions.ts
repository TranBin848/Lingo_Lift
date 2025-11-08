export type VocabularyQuestion =
  | {
      id: number;
      type: "multiple-choice";
      question: string;
      options: string[];
      answer: number; // index of correct answer
      explanation?: string;
    }
  | {
      id: number;
      type: "synonym";
      sentence: string;
      underlinedWord: string;
      options: string[];
      answer: number; // index of correct synonym
      explanation?: string;
    }
  | {
      id: number;
      type: "antonym";
      sentence: string;
      underlinedWord: string;
      options: string[];
      answer: number; // index of correct antonym
      explanation?: string;
    };

const vocabularyQuestions: VocabularyQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "She was _____ when she heard the good news.",
    options: ["delighted", "disappointed", "angry", "sad"],
    answer: 0,
    explanation: "'Delighted' means very pleased or happy, fitting the context of good news.",
  },
  {
    id: 2,
    type: "synonym",
    sentence: "The weather was terrible yesterday.",
    underlinedWord: "terrible",
    options: ["wonderful", "awful", "pleasant", "nice"],
    answer: 1,
    explanation: "'Awful' is a synonym of 'terrible', both mean very bad.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "He decided to _____ his old car for a new one.",
    options: ["change", "exchange", "switch", "replace"],
    answer: 3,
    explanation: "'Replace' means to take the place of something old with something new.",
  },
  {
    id: 4,
    type: "antonym",
    sentence: "The instructions were very clear.",
    underlinedWord: "clear",
    options: ["obvious", "simple", "confusing", "easy"],
    answer: 2,
    explanation: "'Confusing' is the opposite of 'clear'.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "The meeting was _____ until next week.",
    options: ["delayed", "postponed", "canceled", "finished"],
    answer: 1,
    explanation: "'Postponed' means rescheduled to a later time.",
  },
  {
    id: 6,
    type: "synonym",
    sentence: "She is an intelligent student.",
    underlinedWord: "intelligent",
    options: ["stupid", "smart", "lazy", "slow"],
    answer: 1,
    explanation: "'Smart' is a synonym of 'intelligent', both mean having good mental ability.",
  },
  {
    id: 7,
    type: "antonym",
    sentence: "The movie was extremely boring.",
    underlinedWord: "boring",
    options: ["dull", "tedious", "exciting", "tiring"],
    answer: 2,
    explanation: "'Exciting' is the opposite of 'boring'.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "They need to _____ the problem before it gets worse.",
    options: ["ignore", "avoid", "solve", "create"],
    answer: 2,
    explanation: "'Solve' means to find a solution to a problem.",
  },
];

export default vocabularyQuestions;
