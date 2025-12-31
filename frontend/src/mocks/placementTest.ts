import type { 
  PlacementTest, 
  Task1Assessment, 
  Task2Assessment,
  Task1Prompt,
  Task2Prompt
} from '../types/placementTest';

// Task 1 Prompts (Academic with charts/graphs)
export const task1Prompts: Task1Prompt[] = [
  {
    id: 'task1-1',
    taskType: 'Academic',
    prompt: `The bar chart below shows the number of international students enrolled in universities in four different countries from 2015 to 2020.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
  {
    id: 'task1-2',
    taskType: 'Academic',
    prompt: `The line graph below shows the percentage of households with access to the internet in three different regions between 2000 and 2020.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
  }
];

// Task 2 Prompts
export const task2Prompts: Task2Prompt[] = [
  {
    id: 'task2-1',
    questionType: 'opinion',
    prompt: `Some people believe that the best way to learn a language is to live in the country where it is spoken. Others think that there are other ways to learn a language effectively.

Discuss both views and give your own opinion.

Write at least 250 words.`
  },
  {
    id: 'task2-2',
    questionType: 'problem_solution',
    prompt: `In many cities, traffic congestion is becoming a major problem. This results in increased pollution and longer commuting times.

What are the causes of this problem? What solutions can be implemented to address it?

Write at least 250 words.`
  },
  {
    id: 'task2-3',
    questionType: 'discussion',
    prompt: `Some people think that young people should follow the traditions of their society. Others believe that young people should be free to behave as individuals.

Discuss both views and give your opinion.

Write at least 250 words.`
  }
];

// Mock completed placement test result
export const mockPlacementTestResult: PlacementTest = {
  id: 'pt-001',
  userId: 'user-001',
  overallBandScore: 6.5,
  completedAt: new Date('2026-01-01T10:30:00'),
  createdAt: new Date('2026-01-01T09:00:00'),
  task1Assessment: {
    id: 'task1-assess-001',
    placementTestId: 'pt-001',
    userId: 'user-001',
    taskType: 'Academic',
    prompt: task1Prompts[0].prompt,
    imageUrl: task1Prompts[0].imageUrl,
    essayText: `The bar chart illustrates the enrollment figures of international students in universities across four countries from 2015 to 2020.

Overall, there was a significant increase in international student numbers in all countries during this period, with Country A showing the most dramatic growth.

In 2015, Country A had approximately 200,000 international students, which steadily increased to nearly 400,000 by 2020. This represents a doubling of the student population over five years. Similarly, Country B experienced consistent growth from about 150,000 to 250,000 students.

Countries C and D showed more modest increases. Country C's figures rose from 100,000 to 150,000, while Country D remained relatively stable, increasing only from 80,000 to 100,000 international students.

In conclusion, while all four countries attracted more international students over the period, the rate of growth varied significantly, with developed nations showing stronger performance in attracting foreign students.`,
    wordCount: 156,
    timeTaken: 1080, // 18 minutes
    taskAchievement: 6.5,
    coherenceCohesion: 7.0,
    lexicalResource: 6.0,
    grammaticalRange: 6.5,
    overallScore: 6.5,
    generalFeedback: 'Bài viết của bạn đã đáp ứng được yêu cầu cơ bản của Task 1. Bạn đã mô tả được xu hướng chính và thực hiện so sánh giữa các quốc gia. Tuy nhiên, cần bổ sung thêm số liệu cụ thể để tăng tính thuyết phục.',
    strengths: 'Cấu trúc bài viết rõ ràng với mở bài, thân bài và kết luận. Sử dụng từ vựng mô tả xu hướng tốt như "steadily increased", "dramatic growth". Có so sánh giữa các dữ liệu.',
    weaknesses: 'Thiếu một số số liệu cụ thể trong phần phân tích. Một số câu có thể viết phức tạp hơn để thể hiện grammatical range. Cần đa dạng hóa từ vựng hơn.',
    createdAt: new Date('2026-01-01T09:25:00')
  },
  task2Assessment: {
    id: 'task2-assess-001',
    placementTestId: 'pt-001',
    userId: 'user-001',
    prompt: task2Prompts[0].prompt,
    questionType: 'opinion',
    essayText: `The question of whether living in a country is the best way to learn its language has been debated for many years. While some argue that immersion is the most effective method, others believe alternative approaches can be equally successful. This essay will examine both perspectives before presenting my own view.

Those who advocate for living abroad argue that constant exposure to native speakers accelerates language acquisition. When surrounded by the language daily, learners are forced to practice in real-life situations, from ordering food to navigating public transport. This immersive environment creates countless opportunities for authentic practice that cannot be replicated in a classroom.

On the other hand, many successful language learners have achieved fluency without ever visiting the target country. With modern technology, learners can access native content through streaming platforms, engage with native speakers via video calls, and practice with AI-powered applications. Furthermore, structured learning in one's home country often provides a stronger grammatical foundation.

In my opinion, while living abroad offers undeniable advantages, it is not the only path to language mastery. The key factors are motivation, consistent practice, and exposure to authentic materials. A dedicated learner with access to quality resources can achieve excellent results regardless of their location.

In conclusion, both approaches have their merits. The most effective method depends on individual circumstances, learning styles, and access to resources. What matters most is the learner's commitment to consistent practice and improvement.`,
    wordCount: 245,
    timeTaken: 2160, // 36 minutes
    taskResponse: 7.0,
    coherenceCohesion: 6.5,
    lexicalResource: 6.5,
    grammaticalRange: 6.0,
    overallScore: 6.5,
    generalFeedback: 'Bạn đã trả lời đầy đủ câu hỏi và trình bày quan điểm rõ ràng. Bài viết có cấu trúc logic với các đoạn văn được phân chia hợp lý. Cần cải thiện thêm về mặt ngữ pháp và đa dạng hóa cấu trúc câu.',
    strengths: 'Trả lời đúng yêu cầu đề bài, thảo luận cả hai quan điểm và đưa ra ý kiến cá nhân. Sử dụng từ nối tốt (Furthermore, On the other hand). Có ví dụ cụ thể để minh họa.',
    weaknesses: 'Một số câu còn đơn giản về mặt cấu trúc. Có thể sử dụng thêm từ vựng học thuật. Phần kết luận có thể phát triển thêm ý.',
    createdAt: new Date('2026-01-01T10:05:00')
  }
};

// Generate mock AI grading result
export function generateMockTask1Result(
  essayText: string,
  wordCount: number,
  timeTaken: number,
  prompt: Task1Prompt
): Task1Assessment {
  // Calculate scores based on word count and randomness
  const baseScore = Math.min(5.0 + (wordCount / 100) * 0.5, 7.5);
  const variation = () => (Math.random() - 0.5) * 1.0;
  
  const taskAchievement = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const coherenceCohesion = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const lexicalResource = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const grammaticalRange = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  
  const avgScore = (taskAchievement + coherenceCohesion + lexicalResource + grammaticalRange) / 4;
  const overallScore = Math.round(avgScore * 2) / 2;

  const feedbacks = [
    {
      general: 'Bài viết của bạn đã đáp ứng được yêu cầu cơ bản của Task 1. Bạn đã mô tả được xu hướng chính và có so sánh giữa các dữ liệu.',
      strengths: 'Cấu trúc bài viết rõ ràng. Sử dụng từ vựng mô tả xu hướng tốt. Có overview tổng quan.',
      weaknesses: 'Cần bổ sung thêm số liệu cụ thể. Một số câu còn đơn giản. Có thể sử dụng thêm từ đồng nghĩa.'
    },
    {
      general: 'Bạn đã phân tích biểu đồ một cách có hệ thống. Cách tổ chức ý rõ ràng và logic.',
      strengths: 'Mô tả được các xu hướng chính. Sử dụng đa dạng cấu trúc câu. Có so sánh giữa các mục.',
      weaknesses: 'Phần kết luận có thể mạnh mẽ hơn. Cần thêm liên kết giữa các đoạn. Độ chính xác ngữ pháp cần cải thiện.'
    }
  ];
  
  const selectedFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];

  return {
    id: `task1-${Date.now()}`,
    placementTestId: 'pt-new',
    userId: 'user-001',
    taskType: prompt.taskType,
    prompt: prompt.prompt,
    imageUrl: prompt.imageUrl,
    essayText,
    wordCount,
    timeTaken,
    taskAchievement,
    coherenceCohesion,
    lexicalResource,
    grammaticalRange,
    overallScore,
    generalFeedback: selectedFeedback.general,
    strengths: selectedFeedback.strengths,
    weaknesses: selectedFeedback.weaknesses,
    createdAt: new Date()
  };
}

export function generateMockTask2Result(
  essayText: string,
  wordCount: number,
  timeTaken: number,
  prompt: Task2Prompt
): Task2Assessment {
  const baseScore = Math.min(5.0 + (wordCount / 150) * 0.5, 7.5);
  const variation = () => (Math.random() - 0.5) * 1.0;
  
  const taskResponse = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const coherenceCohesion = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const lexicalResource = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  const grammaticalRange = Math.max(4.0, Math.min(9.0, Math.round((baseScore + variation()) * 2) / 2));
  
  const avgScore = (taskResponse + coherenceCohesion + lexicalResource + grammaticalRange) / 4;
  const overallScore = Math.round(avgScore * 2) / 2;

  const feedbacks = [
    {
      general: 'Bạn đã trả lời đầy đủ câu hỏi và trình bày quan điểm rõ ràng. Bài viết có cấu trúc logic.',
      strengths: 'Trả lời đúng yêu cầu đề bài. Sử dụng từ nối tốt. Có ví dụ cụ thể để minh họa.',
      weaknesses: 'Một số câu còn đơn giản. Có thể sử dụng thêm từ vựng học thuật. Phần kết luận có thể phát triển thêm.'
    },
    {
      general: 'Bài viết thể hiện khả năng lập luận tốt. Các ý được phát triển logic và có chiều sâu.',
      strengths: 'Cấu trúc bài rõ ràng. Sử dụng đa dạng cấu trúc câu. Lập luận thuyết phục.',
      weaknesses: 'Cần cải thiện độ chính xác ngữ pháp. Một số chỗ chuyển ý chưa mượt. Có thể thêm ví dụ cụ thể hơn.'
    }
  ];
  
  const selectedFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];

  return {
    id: `task2-${Date.now()}`,
    placementTestId: 'pt-new',
    userId: 'user-001',
    prompt: prompt.prompt,
    questionType: prompt.questionType,
    essayText,
    wordCount,
    timeTaken,
    taskResponse,
    coherenceCohesion,
    lexicalResource,
    grammaticalRange,
    overallScore,
    generalFeedback: selectedFeedback.general,
    strengths: selectedFeedback.strengths,
    weaknesses: selectedFeedback.weaknesses,
    createdAt: new Date()
  };
}

// Calculate overall band score from both tasks
export function calculateOverallBandScore(
  task1Score: number,
  task2Score: number
): number {
  // Task 2 is weighted more (2:1 ratio like real IELTS)
  const weightedScore = (task1Score + task2Score * 2) / 3;
  return Math.round(weightedScore * 2) / 2;
}
