import mongoose from 'mongoose';
import { PlacementTest } from '../models/PlacementTest.model.js';
import { User } from '../models/User.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Mock data from frontend
const pronunciationQuestions = [
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

const grammarQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "She _____ to the market every Sunday.",
    options: ["go", "goes", "going", "gone"],
    answer: 1,
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "I have _____ finished my homework.",
    options: ["yet", "already", "still", "never"],
    answer: 1,
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "If I _____ rich, I would travel the world.",
    options: ["am", "was", "were", "be"],
    answer: 2,
  },
  {
    id: 4,
    type: "error-correction",
    sentence: "He don't like coffee.",
    words: ["He", "don't", "like", "coffee"],
    errorIndex: 1,
    correctWord: "doesn't",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "They _____ playing football when it started to rain.",
    options: ["are", "were", "was", "is"],
    answer: 1,
  },
  {
    id: 6,
    type: "error-correction",
    sentence: "She have been working here for five years.",
    words: ["She", "have", "been", "working"],
    errorIndex: 1,
    correctWord: "has",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "This is the _____ book I have ever read.",
    options: ["good", "better", "best", "well"],
    answer: 2,
  },
  {
    id: 8,
    type: "error-correction",
    sentence: "There is many students in the classroom.",
    words: ["There", "is", "many", "students"],
    errorIndex: 1,
    correctWord: "are",
  },
];

const vocabularyQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "She was _____ when she heard the good news.",
    options: ["delighted", "disappointed", "angry", "sad"],
    answer: 0,
  },
  {
    id: 2,
    type: "synonym",
    sentence: "The weather was terrible yesterday.",
    underlinedWord: "terrible",
    options: ["wonderful", "awful", "pleasant", "nice"],
    answer: 1,
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "He decided to _____ his old car for a new one.",
    options: ["change", "exchange", "switch", "replace"],
    answer: 3,
  },
  {
    id: 4,
    type: "antonym",
    sentence: "The instructions were very clear.",
    underlinedWord: "clear",
    options: ["obvious", "simple", "confusing", "easy"],
    answer: 2,
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "The meeting was _____ until next week.",
    options: ["delayed", "postponed", "canceled", "finished"],
    answer: 1,
  },
  {
    id: 6,
    type: "synonym",
    sentence: "She is an intelligent student.",
    underlinedWord: "intelligent",
    options: ["stupid", "smart", "lazy", "slow"],
    answer: 1,
  },
  {
    id: 7,
    type: "antonym",
    sentence: "The movie was extremely boring.",
    underlinedWord: "boring",
    options: ["dull", "tedious", "exciting", "tiring"],
    answer: 2,
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "They need to _____ the problem before it gets worse.",
    options: ["ignore", "avoid", "solve", "create"],
    answer: 2,
  },
];

const listeningQuestions = [
  {
    id: 1,
    type: "fill-in-blank",
    audioText: "She likes to read books in the library.",
    sentence: "She likes to _____ books in the library.",
    answer: "read",
  },
  {
    id: 2,
    type: "fill-in-blank",
    audioText: "The weather is beautiful today.",
    sentence: "The _____ is beautiful today.",
    answer: "weather",
  },
  {
    id: 3,
    type: "fill-in-blank",
    audioText: "He wants to travel around the world.",
    sentence: "He wants to _____ around the world.",
    answer: "travel",
  },
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
  },
  {
    id: 5,
    type: "image-question",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    audioText: "How many people can you see?", 
    question: "How many people can you see?",
    options: ["One person", "Two people", "Three people"],
    answer: 0,
  },
  {
    id: 6,
    type: "conversation",
    audioText: "A: Hi, what time does the movie start? B: It starts at 7:30 PM. A: Great, I'll see you there!",
    question: "What time does the movie start?",
    options: ["6:30 PM", "7:00 PM", "7:30 PM"],
    answer: 2,
  },
  {
    id: 7,
    type: "conversation",
    audioText: "A: Where did you go on vacation? B: I went to Paris last summer. A: That sounds amazing!",
    question: "Where did person B go on vacation?",
    options: ["London", "Paris", "Rome"],
    answer: 1,
  },
  {
    id: 8,
    type: "conversation",
    audioText: "A: Can I help you find something? B: Yes, I'm looking for a blue sweater. A: We have some over here.",
    question: "What is person B looking for?",
    options: ["A red shirt", "A blue sweater", "A green jacket"],
    answer: 1,
  },
];

const readingQuestions = [
  {
    id: 1,
    type: "comprehension",
    passage: "The Great Wall of China is one of the most famous landmarks in the world. Construction began in the 7th century BC and continued for over 2,000 years. The wall stretches over 13,000 miles across northern China. It was originally built to protect Chinese states from invasions. Today, millions of tourists visit the Great Wall every year, making it one of the most popular tourist destinations in China.",
    questions: [
      {
        id: 1,
        question: "The Great Wall of China was built in one century.",
        options: ["Yes", "No", "Not Given"],
        answer: 1,
      },
      {
        id: 2,
        question: "The Great Wall is longer than 10,000 miles.",
        options: ["Yes", "No", "Not Given"],
        answer: 0,
      },
      {
        id: 3,
        question: "The wall was built to protect against natural disasters.",
        options: ["Yes", "No", "Not Given"],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    type: "comprehension",
    passage: "Climate change is one of the biggest challenges facing humanity today. Rising temperatures are causing ice caps to melt, leading to higher sea levels. Scientists predict that if current trends continue, many coastal cities could be underwater by 2100. To combat climate change, countries around the world are working to reduce carbon emissions and switch to renewable energy sources like solar and wind power.",
    questions: [
      {
        id: 1,  
        question: "What is causing ice caps to melt?",
        options: ["Rising temperatures", "Heavy rainfall", "Strong winds", "Ocean currents"],
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
        options: ["Coal and oil", "Solar and wind", "Nuclear and gas", "Wood and charcoal"],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    type: "fill-in-blank-passage",
    passage: "Exercise is {{1}} for maintaining good health. Regular physical activity helps to {{2}} your muscles and improve cardiovascular fitness. It also plays a crucial role in {{3}} stress and boosting mental well-being. Experts recommend at least 30 minutes of {{4}} exercise five times per week.",
    wordBank: ["essential", "strengthen", "reducing", "moderate", "optional", "weaken", "increasing", "intense", "dangerous", "harmful"],
    answers: ["essential", "strengthen", "reducing", "moderate"],
  },
  {
    id: 4,
    type: "fill-in-blank-passage", 
    passage: "The ancient city of Rome was once the {{1}} of a vast empire that stretched across three continents. Roman {{2}} influenced many aspects of modern society, including law, government, and architecture. The Romans were known for their impressive {{3}} projects, such as aqueducts and roads. Today, Rome remains a popular tourist {{4}} with millions of visitors each year.",
    wordBank: ["capital", "civilization", "engineering", "destination", "village", "destruction", "failure", "location", "culture", "building", "place", "society"],
    answers: ["capital", "civilization", "engineering", "destination"],
  },
];

// Convert mock data to backend format
function convertPronunciationQuestions() {
  return pronunciationQuestions.map(q => ({
    type: "pronunciation",
    id: q.id,
    text: q.type === "word" ? `Say the word: ${q.word}` : 
          q.type === "sentence" ? q.sentence :
          q.passage,
    correctAnswer: q.type === "word" ? q.word :
                   q.type === "sentence" ? q.sentence :
                   q.options[q.answer],
    subType: q.type
  }));
}

function convertGrammarQuestions() {
  return grammarQuestions.map(q => ({
    type: "grammar",
    id: q.id,
    question: q.type === "multiple-choice" ? q.question : 
              `Find the error in: "${q.sentence}"`,
    options: q.type === "multiple-choice" ? q.options : q.words,
    correctAnswer: q.type === "multiple-choice" ? q.options[q.answer] : q.correctWord,
    subType: q.type
  }));
}

function convertVocabularyQuestions() {
  return vocabularyQuestions.map(q => ({
    type: "vocabulary",
    id: q.id,
    question: q.type === "multiple-choice" ? q.question :
              q.type === "synonym" ? `Find a synonym for "${q.underlinedWord}" in: ${q.sentence}` :
              `Find an antonym for "${q.underlinedWord}" in: ${q.sentence}`,
    options: q.options,
    correctAnswer: q.options[q.answer],
    subType: q.type
  }));
}

function convertListeningQuestions() {
  return listeningQuestions.map(q => ({
    type: "listening",
    id: q.id,
    audioUrl: `/audio/listening_${q.id}.mp3`,
    question: q.type === "fill-in-blank" ? q.sentence :
              q.question,
    options: q.options || undefined,
    correctAnswer: q.type === "fill-in-blank" ? q.answer :
                   q.options[q.answer],
    subType: q.type
  }));
}

function convertReadingQuestions() {
  const convertedQuestions = [];
  
  readingQuestions.forEach(q => {
    if (q.type === "comprehension") {
      q.questions.forEach((subQ, index) => {
        convertedQuestions.push({
          type: "reading",
          id: q.id * 10 + subQ.id,
          passage: q.passage,
          question: subQ.question,
          options: subQ.options,
          correctAnswer: subQ.options[subQ.answer],
          subType: "comprehension"
        });
      });
    } else {
      convertedQuestions.push({
        type: "reading",
        id: q.id,
        passage: q.passage,
        question: "Fill in the blanks:",
        wordBank: q.wordBank,
        correctAnswer: q.answers.join(", "),
        subType: "fill-blank"
      });
    }
  });
  
  return convertedQuestions;
}

const defaultPlacementTest = {
  title: "English Placement Test",
  description: "Comprehensive English placement test to assess your current level",
  version: "1.0.0",
  isActive: true,
  sections: [
    {
      type: "pronunciation",
      title: "Pronunciation Assessment",
      description: "Read the given sentences and words clearly",
      passingScore: 60,
      questions: convertPronunciationQuestions()
    },
    {
      type: "grammar",
      title: "Grammar Assessment", 
      description: "Test your understanding of English grammar",
      passingScore: 70,
      questions: convertGrammarQuestions()
    },
    {
      type: "vocabulary",
      title: "Vocabulary Assessment",
      description: "Test your English vocabulary knowledge",
      passingScore: 65,
      questions: convertVocabularyQuestions()
    },
    {
      type: "listening",
      title: "Listening Comprehension",
      description: "Listen to audio clips and answer questions",
      passingScore: 60,
      questions: convertListeningQuestions()
    },
    {
      type: "reading",
      title: "Reading Comprehension",
      description: "Read passages and answer questions",
      passingScore: 70,
      questions: convertReadingQuestions()
    }
  ],
  totalTimeLimit: 60,
  scoringCriteria: {
    bandScores: [
      { band: 1, minScore: 0, maxScore: 20, description: "Beginner - Start with basic fundamentals" },
      { band: 2, minScore: 21, maxScore: 35, description: "Elementary - Focus on basic grammar and vocabulary" },
      { band: 3, minScore: 36, maxScore: 45, description: "Pre-Intermediate - Build conversational skills" },
      { band: 4, minScore: 46, maxScore: 55, description: "Intermediate - Develop fluency and accuracy" },
      { band: 5, minScore: 56, maxScore: 65, description: "Upper-Intermediate - Refine advanced skills" },
      { band: 6, minScore: 66, maxScore: 75, description: "Advanced - Perfect pronunciation and style" },
      { band: 7, minScore: 76, maxScore: 85, description: "Proficient - Focus on specialized topics" },
      { band: 8, minScore: 86, maxScore: 100, description: "Expert - Native-like proficiency" }
    ]
  }
};

async function seedPlacementTest() {
  try {
    // Connect to database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dailyenglish';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Find an admin user to assign as creator
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found, creating one...');
      // Create a default admin user
      adminUser = new User({
        username: 'admin',
        email: 'admin@dailyenglish.com',
        password: 'admin123', // This will be hashed by the pre-save hook
        displayName: 'System Admin',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Default admin user created');
    }

    // Check if placement test already exists
    const existingTest = await PlacementTest.findOne({ title: defaultPlacementTest.title });
    
    if (existingTest) {
      console.log('Placement test already exists');
      await mongoose.disconnect();
      return;
    }

    // Calculate total questions
    const totalQuestions = defaultPlacementTest.sections.reduce(
      (total, section) => total + section.questions.length, 0
    );

    // Create placement test
    const placementTest = new PlacementTest({
      ...defaultPlacementTest,
      totalQuestions,
      createdBy: adminUser._id,
      updatedBy: adminUser._id
    });

    await placementTest.save();
    
    console.log('✅ Default placement test created successfully');
    console.log(`Test ID: ${placementTest._id}`);
    console.log(`Total Questions: ${placementTest.totalQuestions}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding placement test:', error);
    process.exit(1);
  }
}

seedPlacementTest();