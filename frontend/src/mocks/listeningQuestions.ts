export type ListeningQuestion =
  | {
      id: number;
      type: "fill-in-blank";
      audioText: string; // Text that will be spoken
      sentence: string; // Sentence with _____ for the blank
      answer: string; // The missing word
      explanation?: string;
    }
  | {
      id: number;
      type: "image-question";
      imageUrl: string; // URL to image
      audioText: string; // Question that will be spoken
      question: string; // Written question
      options: string[]; // A, B, C options
      answer: number; // index of correct answer
      explanation?: string;
    }
  | {
      id: number;
      type: "conversation";
      audioText: string; // Conversation that will be spoken
      question: string; // Question about the conversation
      options: string[]; // A, B, C options
      answer: number; // index of correct answer
      explanation?: string;
    };

const listeningQuestions: ListeningQuestion[] = [
  // Fill-in-blank questions
  {
    id: 1,
    type: "fill-in-blank",
    audioText: "She likes to read books in the library.",
    sentence: "She likes to _____ books in the library.",
    answer: "read",
    explanation: "The audio says 'read books', so the missing word is 'read'.",
  },
  {
    id: 2,
    type: "fill-in-blank",
    audioText: "The weather is beautiful today.",
    sentence: "The _____ is beautiful today.",
    answer: "weather",
    explanation: "The audio mentions 'weather', which is the missing word.",
  },
  {
    id: 3,
    type: "fill-in-blank",
    audioText: "He wants to travel around the world.",
    sentence: "He wants to _____ around the world.",
    answer: "travel",
    explanation: "The verb 'travel' is the missing word in this sentence.",
  },

  // Image-based questions
  {
    id: 4,
    type: "image-question",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400",
    audioText: "What are the people doing in this picture?",
    question: "What are the people doing in this picture?",
    options: [
      "They are studying in a classroom",
      "They are eating at a restaurant",
      "They are shopping at a store",
    ],
    answer: 0,
    explanation: "The image shows people in a classroom setting, studying.",
  },
  {
    id: 5,
    type: "image-question",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    audioText: "How many people can you see?",
    question: "How many people can you see?",
    options: ["One person", "Two people", "Three people"],
    answer: 0,
    explanation: "Looking at the image, there is one person visible.",
  },

  // Conversation questions
  {
    id: 6,
    type: "conversation",
    audioText:
      "A: Hi, what time does the movie start? B: It starts at 7:30 PM. A: Great, I'll see you there!",
    question: "What time does the movie start?",
    options: ["6:30 PM", "7:00 PM", "7:30 PM"],
    answer: 2,
    explanation: "Person B clearly states that the movie starts at 7:30 PM.",
  },
  {
    id: 7,
    type: "conversation",
    audioText:
      "A: Where did you go on vacation? B: I went to Paris last summer. A: That sounds amazing!",
    question: "Where did person B go on vacation?",
    options: ["London", "Paris", "Rome"],
    answer: 1,
    explanation: "Person B mentions going to Paris last summer.",
  },
  {
    id: 8,
    type: "conversation",
    audioText:
      "A: Can I help you find something? B: Yes, I'm looking for a blue sweater. A: We have some over here.",
    question: "What is person B looking for?",
    options: ["A red shirt", "A blue sweater", "A green jacket"],
    answer: 1,
    explanation: "Person B clearly says they are looking for a blue sweater.",
  },
];

export default listeningQuestions;
