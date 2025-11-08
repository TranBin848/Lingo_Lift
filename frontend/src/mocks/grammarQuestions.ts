export type GrammarQuestion =
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
      type: "error-correction";
      sentence: string;
      words: string[]; // 4 word options to choose from
      errorIndex: number; // index of the incorrect word
      correctWord: string; // the correct replacement
      explanation?: string;
    };

const grammarQuestions: GrammarQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "She _____ to the market every Sunday.",
    options: ["go", "goes", "going", "gone"],
    answer: 1,
    explanation: "Use 'goes' with third person singular (she/he/it) in present simple.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "I have _____ finished my homework.",
    options: ["yet", "already", "still", "never"],
    answer: 1,
    explanation: "'Already' is used in affirmative sentences with present perfect.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "If I _____ rich, I would travel the world.",
    options: ["am", "was", "were", "be"],
    answer: 2,
    explanation: "Use 'were' in second conditional for all subjects.",
  },
  {
    id: 4,
    type: "error-correction",
    sentence: "He don't like coffee.",
    words: ["He", "don't", "like", "coffee"],
    errorIndex: 1,
    correctWord: "doesn't",
    explanation: "Use 'doesn't' (does not) with third person singular.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "They _____ playing football when it started to rain.",
    options: ["are", "were", "was", "is"],
    answer: 1,
    explanation: "Use 'were' with plural subjects in past continuous.",
  },
  {
    id: 6,
    type: "error-correction",
    sentence: "She have been working here for five years.",
    words: ["She", "have", "been", "working"],
    errorIndex: 1,
    correctWord: "has",
    explanation: "Use 'has' with third person singular in present perfect continuous.",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "This is the _____ book I have ever read.",
    options: ["good", "better", "best", "well"],
    answer: 2,
    explanation: "Use superlative 'best' when comparing more than two things.",
  },
  {
    id: 8,
    type: "error-correction",
    sentence: "There is many students in the classroom.",
    words: ["There", "is", "many", "students"],
    errorIndex: 1,
    correctWord: "are",
    explanation: "Use 'are' with plural nouns (students).",
  },
];

export default grammarQuestions;
