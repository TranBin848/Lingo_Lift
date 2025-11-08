export type PronQuestion =
  | {
      id: number;
      type: "word";
      word: string;
      prompt?: string;
    }
  | {
      id: number;
      type: "linking";
      passage: string;
      options: string[];
      answer: number; // index
    }
  | {
      id: number;
      type: "sentence";
      sentence: string;
    };

const pronunciationQuestions: PronQuestion[] = [
  { id: 1, type: "word", word: "schedule" },
  { id: 2, type: "word", word: "comfortable" },
  { id: 3, type: "word", word: "recipe" },
  {
    id: 4,
    type: "linking",
    passage: "I want to eat now.",
    options: ["I want", "want to", "to eat", "eat now"],
    answer: 1,
  },
  { id: 5, type: "sentence", sentence: "Can you recommend a good restaurant?" },
  { id: 6, type: "sentence", sentence: "She didn't know the answer." },
  { id: 7, type: "sentence", sentence: "They've been working on it for weeks." },
];

export default pronunciationQuestions;
