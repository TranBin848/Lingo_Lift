export type ReadingQuestion =
  | {
      id: number;
      type: "comprehension";
      passage: string;
      questions: {
        id: number;
        question: string;
        options: string[]; // For Yes/No/Not Given or multiple choice
        answer: number; // index of correct answer
      }[];
      explanation?: string;
    }
  | {
      id: number;
      type: "fill-in-blank-passage";
      passage: string; // Passage with {{1}}, {{2}}, etc. as placeholders
      wordBank: string[]; // List of words (more than needed)
      answers: string[]; // Correct words in order for each blank
      explanation?: string;
    };

const readingQuestions: ReadingQuestion[] = [
  // Comprehension question with Yes/No/Not Given
  {
    id: 1,
    type: "comprehension",
    passage:
      "The Great Wall of China is one of the most famous landmarks in the world. Construction began in the 7th century BC and continued for over 2,000 years. The wall stretches over 13,000 miles across northern China. It was originally built to protect Chinese states from invasions. Today, millions of tourists visit the Great Wall every year, making it one of the most popular tourist destinations in China.",
    questions: [
      {
        id: 1,
        question: "The Great Wall of China was built in one century.",
        options: ["Yes", "No", "Not Given"],
        answer: 1, // No
      },
      {
        id: 2,
        question: "The Great Wall is longer than 10,000 miles.",
        options: ["Yes", "No", "Not Given"],
        answer: 0, // Yes
      },
      {
        id: 3,
        question: "The wall was built to protect against natural disasters.",
        options: ["Yes", "No", "Not Given"],
        answer: 1, // No
      },
    ],
    explanation:
      "The passage states construction took over 2,000 years (not one century), the wall is over 13,000 miles, and it was built to protect against invasions (not natural disasters).",
  },

  // Comprehension question with multiple choice
  {
    id: 2,
    type: "comprehension",
    passage:
      "Climate change is one of the biggest challenges facing humanity today. Rising temperatures are causing ice caps to melt, leading to higher sea levels. Scientists predict that if current trends continue, many coastal cities could be underwater by 2100. To combat climate change, countries around the world are working to reduce carbon emissions and switch to renewable energy sources like solar and wind power.",
    questions: [
      {
        id: 1,
        question: "What is causing ice caps to melt?",
        options: [
          "Rising temperatures",
          "Heavy rainfall",
          "Strong winds",
          "Ocean currents",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "By when could coastal cities be underwater?",
        options: ["2050", "2075", "2100", "2150"],
        answer: 2,
      },
      {
        id: 3,
        question: "What are renewable energy sources mentioned in the passage?",
        options: [
          "Coal and oil",
          "Solar and wind",
          "Nuclear and gas",
          "Wood and charcoal",
        ],
        answer: 1,
      },
    ],
    explanation:
      "The passage clearly states rising temperatures cause ice melting, coastal cities could be underwater by 2100, and solar and wind are renewable energy sources.",
  },

  // Fill-in-blank passage
  {
    id: 3,
    type: "fill-in-blank-passage",
    passage:
      "Exercise is {{1}} for maintaining good health. Regular physical activity helps to {{2}} your muscles and improve cardiovascular fitness. It also plays a crucial role in {{3}} stress and boosting mental well-being. Experts recommend at least 30 minutes of {{4}} exercise five times per week.",
    wordBank: [
      "essential",
      "strengthen",
      "reducing",
      "moderate",
      "optional",
      "weaken",
      "increasing",
      "intense",
      "dangerous",
      "harmful",
    ],
    answers: ["essential", "strengthen", "reducing", "moderate"],
    explanation:
      "The correct words logically complete the passage about the benefits of exercise and recommended activity levels.",
  },

  // Fill-in-blank passage with more complex vocabulary
  {
    id: 4,
    type: "fill-in-blank-passage",
    passage:
      "The ancient city of Rome was once the {{1}} of a vast empire that stretched across three continents. Roman {{2}} influenced many aspects of modern society, including law, government, and architecture. The Romans were known for their impressive {{3}} projects, such as aqueducts and roads. Today, Rome remains a popular tourist {{4}} with millions of visitors each year.",
    wordBank: [
      "capital",
      "civilization",
      "engineering",
      "destination",
      "village",
      "destruction",
      "failure",
      "location",
      "culture",
      "building",
      "place",
      "society",
    ],
    answers: ["capital", "civilization", "engineering", "destination"],
    explanation:
      "These words correctly describe Rome's historical significance and modern status as a tourist destination.",
  },
];

export default readingQuestions;
