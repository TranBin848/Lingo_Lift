import type {
  Task1Topic,
  Task2Topic,
  Task1Essay,
  Task2Essay,
  Task1EssayWithTopic,
  Task2EssayWithTopic,
  Task1Feedback,
  Task2Feedback,
  Task1EssayWithFeedback,
  Task2EssayWithFeedback
} from '../types/essay';

// Mock Task 1 Topics
export const mockTask1Topics: Task1Topic[] = [
  {
    id: 'task1-topic-001',
    prompt: 'The bar chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.',
    taskType: 'Academic',
    chartType: 'bar',
    category: 'Demographics',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    imageUrl: '/images/charts/bar-housing.png',
    keywords: ['housing', 'accommodation', 'percentage', 'trend'],
    isPublished: true,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
  },
  {
    id: 'task1-topic-002',
    prompt: 'The line graph below shows changes in the amount and type of fast food consumed by Australian teenagers from 1975 to 2000.',
    taskType: 'Academic',
    chartType: 'line',
    category: 'Health',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    imageUrl: '/images/charts/line-fastfood.png',
    keywords: ['fast food', 'consumption', 'teenagers', 'Australia'],
    isPublished: true,
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
  },
  {
    id: 'task1-topic-003',
    prompt: 'The pie charts below compare water usage in San Diego, California and the rest of the world.',
    taskType: 'Academic',
    chartType: 'pie',
    category: 'Environment',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    imageUrl: '/images/charts/pie-water.png',
    keywords: ['water', 'usage', 'comparison', 'California'],
    isPublished: true,
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-22T12:00:00Z',
  },
  {
    id: 'task1-topic-004',
    prompt: 'The table below shows the proportion of different categories of families living in poverty in Australia in 1999.',
    taskType: 'Academic',
    chartType: 'table',
    category: 'Society',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Occasional',
    imageUrl: '/images/charts/table-poverty.png',
    keywords: ['poverty', 'families', 'proportion', 'Australia'],
    isPublished: true,
    createdAt: '2025-01-18T08:30:00Z',
    updatedAt: '2025-01-23T09:00:00Z',
  },
  {
    id: 'task1-topic-005',
    prompt: 'The maps below show the centre of a small town called Islip as it is now, and plans for its development.',
    taskType: 'Academic',
    chartType: 'map',
    category: 'Transportation',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.0,
    frequency: 'Occasional',
    imageUrl: '/images/charts/map-islip.png',
    keywords: ['town', 'development', 'changes', 'planning'],
    isPublished: true,
    createdAt: '2025-01-19T10:00:00Z',
    updatedAt: '2025-01-24T11:30:00Z',
  },
  {
    id: 'task1-topic-006',
    prompt: 'The diagram below shows how solar panels can be used to provide electricity for domestic use.',
    taskType: 'Academic',
    chartType: 'process',
    category: 'Energy',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.0,
    frequency: 'Occasional',
    imageUrl: '/images/charts/process-solar.png',
    keywords: ['solar', 'electricity', 'process', 'renewable'],
    isPublished: true,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
  },
  {
    id: 'task1-topic-007',
    prompt: 'You recently bought a piece of equipment for your kitchen but it did not work. You phoned the shop but no action was taken. Write a letter to the shop manager.',
    taskType: 'General',
    chartType: 'letter',
    category: 'Society',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    keywords: ['complaint', 'equipment', 'refund', 'formal'],
    isPublished: true,
    createdAt: '2025-01-21T08:00:00Z',
    updatedAt: '2025-01-26T09:30:00Z',
  },
  {
    id: 'task1-topic-008',
    prompt: 'You have seen an advertisement for a part-time job in a local company. Write a letter to the manager expressing your interest.',
    taskType: 'General',
    chartType: 'letter',
    category: 'Work',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    keywords: ['job application', 'part-time', 'interest', 'formal'],
    isPublished: true,
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-27T11:00:00Z',
  },
  {
    id: 'task1-topic-009',
    prompt: 'The charts below show the main reasons for study among students of different age groups and the amount of support they received from employers.',
    taskType: 'Academic',
    chartType: 'mixed',
    category: 'Education',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.5,
    frequency: 'Rare',
    imageUrl: '/images/charts/mixed-study.png',
    keywords: ['study', 'age groups', 'employer support', 'education'],
    isPublished: true,
    createdAt: '2025-01-23T09:00:00Z',
    updatedAt: '2025-01-28T10:00:00Z',
  },
  {
    id: 'task1-topic-010',
    prompt: 'The bar chart below shows the top ten countries for the production and consumption of electricity in 2014.',
    taskType: 'Academic',
    chartType: 'bar',
    category: 'Energy',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    imageUrl: '/images/charts/bar-electricity.png',
    keywords: ['electricity', 'production', 'consumption', 'countries'],
    isPublished: true,
    createdAt: '2025-01-24T08:00:00Z',
    updatedAt: '2025-01-29T09:00:00Z',
  },
];

// Mock Task 2 Topics
export const mockTask2Topics: Task2Topic[] = [
  {
    id: 'task2-topic-001',
    prompt: 'Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. What is your opinion?',
    questionType: 'opinion',
    category: 'Education',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    keywords: ['university', 'skills', 'knowledge', 'employment'],
    isPublished: true,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
  },
  {
    id: 'task2-topic-002',
    prompt: 'Some people believe that technology has made our lives too complex and the solution is to live a simpler life without technology. To what extent do you agree or disagree?',
    questionType: 'opinion',
    category: 'Technology',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    keywords: ['technology', 'simplicity', 'lifestyle', 'modern'],
    isPublished: true,
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z',
  },
  {
    id: 'task2-topic-003',
    prompt: 'Some people think that the government should spend money on railways. Others believe that there should be more investment in new roads. Discuss both views and give your opinion.',
    questionType: 'discussion',
    category: 'Transportation',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    keywords: ['transport', 'railways', 'roads', 'investment'],
    isPublished: true,
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-22T12:00:00Z',
  },
  {
    id: 'task2-topic-004',
    prompt: 'In many countries, the amount of crime is increasing. What do you think are the main causes of crime? What solutions can you suggest?',
    questionType: 'problem_solution',
    category: 'Society',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Occasional',
    keywords: ['crime', 'causes', 'solutions', 'society'],
    isPublished: true,
    createdAt: '2025-01-18T08:30:00Z',
    updatedAt: '2025-01-23T09:00:00Z',
  },
  {
    id: 'task2-topic-005',
    prompt: 'Some people say that advertising encourages us to buy things that we really do not need. Others say that advertisements tell us about new products that may improve our lives. Which viewpoint do you agree with?',
    questionType: 'discussion',
    category: 'Economy',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    keywords: ['advertising', 'consumerism', 'products', 'needs'],
    isPublished: true,
    createdAt: '2025-01-19T10:00:00Z',
    updatedAt: '2025-01-24T11:30:00Z',
  },
  {
    id: 'task2-topic-006',
    prompt: 'Many people believe that social networking sites (such as Facebook) have had a huge negative impact on both individuals and society. To what extent do you agree?',
    questionType: 'opinion',
    category: 'Technology',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    keywords: ['social media', 'Facebook', 'impact', 'society'],
    isPublished: true,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
  },
  {
    id: 'task2-topic-007',
    prompt: 'Global warming is one of the most serious issues that the world is facing today. What are the causes of global warming and what measures can governments and individuals take to tackle the issue?',
    questionType: 'problem_solution',
    category: 'Environment',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.0,
    frequency: 'Common',
    keywords: ['global warming', 'climate', 'environment', 'solutions'],
    isPublished: true,
    createdAt: '2025-01-21T08:00:00Z',
    updatedAt: '2025-01-26T09:30:00Z',
  },
  {
    id: 'task2-topic-008',
    prompt: 'Some people think that competitive sports are good for bringing together different people and cultures. Others think that such sports can cause problems between groups. Discuss both views and give your opinion.',
    questionType: 'discussion',
    category: 'Culture',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Occasional',
    keywords: ['sports', 'competition', 'culture', 'unity'],
    isPublished: true,
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-27T11:00:00Z',
  },
  {
    id: 'task2-topic-009',
    prompt: 'In some countries an increasing number of people are suffering from health problems as a result of eating too much fast food. It is therefore necessary for governments to impose a higher tax on this kind of food. To what extent do you agree or disagree?',
    questionType: 'opinion',
    category: 'Health',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.0,
    frequency: 'Occasional',
    keywords: ['fast food', 'health', 'tax', 'government'],
    isPublished: true,
    createdAt: '2025-01-23T09:00:00Z',
    updatedAt: '2025-01-28T10:00:00Z',
  },
  {
    id: 'task2-topic-010',
    prompt: 'Many governments think that economic progress is their most important goal. Some people, however, think that other types of progress are equally important for a country. Discuss both these views and give your own opinion.',
    questionType: 'discussion',
    category: 'Government',
    difficulty: 'Advanced',
    estimatedBandLevel: 7.5,
    frequency: 'Rare',
    keywords: ['economic', 'progress', 'government', 'development'],
    isPublished: true,
    createdAt: '2025-01-24T08:00:00Z',
    updatedAt: '2025-01-29T09:00:00Z',
  },
  {
    id: 'task2-topic-011',
    prompt: 'Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?',
    questionType: 'opinion',
    category: 'Education',
    difficulty: 'Beginner',
    estimatedBandLevel: 6.0,
    frequency: 'Common',
    keywords: ['community service', 'school', 'compulsory', 'volunteering'],
    isPublished: true,
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 'task2-topic-012',
    prompt: 'Nowadays, more people are choosing to socialise online rather than face to face. Is this a positive or negative development?',
    questionType: 'advantages_disadvantages',
    category: 'Society',
    difficulty: 'Intermediate',
    estimatedBandLevel: 6.5,
    frequency: 'Common',
    keywords: ['socialise', 'online', 'face to face', 'communication'],
    isPublished: true,
    createdAt: '2025-01-26T09:00:00Z',
    updatedAt: '2025-12-02T10:00:00Z',
  },
];

// Mock Task 1 Essays
export const mockTask1Essays: Task1Essay[] = [
  {
    id: 'task1-essay-001',
    userId: 'user-001',
    topicId: 'task1-topic-001',
    content: 'The bar chart illustrates the percentage of households living in owned and rented accommodation in England and Wales over a period of nearly a century, from 1918 to 2011.\n\nOverall, it is clear that the proportion of households owning their homes increased significantly over the period, while the percentage of those renting decreased correspondingly.\n\nIn 1918, approximately 23% of households owned their homes, while around 77% lived in rented accommodation. By 1971, these figures had almost reversed, with home ownership rising to about 50% and renting falling to 50%.\n\nFrom 1971 to 2001, the trend continued with home ownership peaking at approximately 69% in 2001. However, by 2011, there was a slight decline in home ownership to around 64%, with a corresponding increase in renting to 36%.',
    wordCount: 142,
    timeSpentSeconds: 1200,
    status: 'Submitted',
    version: 1,
    createdAt: '2025-12-28T14:00:00Z',
    updatedAt: '2025-12-28T14:20:00Z',
    submittedAt: '2025-12-28T14:20:00Z',
  },
  {
    id: 'task1-essay-002',
    userId: 'user-001',
    topicId: 'task1-topic-002',
    content: 'The line graph shows how the consumption of different types of fast food among Australian teenagers changed between 1975 and 2000.\n\nOverall, pizza consumption increased dramatically, while hamburgers showed a decline. Fish and chips remained relatively stable throughout the period.',
    wordCount: 45,
    timeSpentSeconds: 600,
    status: 'Draft',
    version: 1,
    createdAt: '2025-12-29T10:00:00Z',
    updatedAt: '2025-12-29T10:10:00Z',
  },
  {
    id: 'task1-essay-003',
    userId: 'user-001',
    topicId: 'task1-topic-003',
    content: 'The two pie charts compare water usage patterns in San Diego, California with global water consumption.\n\nOverall, residential use dominates water consumption in San Diego, whereas agricultural use is the primary consumer worldwide.\n\nIn San Diego, residential use accounts for 60% of total water consumption, followed by industrial use at 17%. Agriculture only uses 4% of water in this region. In contrast, globally, agriculture is the largest water consumer at 70%, with industrial use at 20% and residential use at only 10%.\n\nThis significant difference can be attributed to the urban nature of San Diego compared to the predominantly agricultural character of many regions worldwide.',
    wordCount: 102,
    timeSpentSeconds: 1500,
    status: 'Graded',
    version: 1,
    createdAt: '2025-12-27T15:00:00Z',
    updatedAt: '2025-12-27T15:30:00Z',
    submittedAt: '2025-12-27T15:25:00Z',
    gradedAt: '2025-12-27T16:00:00Z',
  },
  {
    id: 'task1-essay-004',
    userId: 'user-001',
    topicId: 'task1-topic-001',
    content: 'The bar chart presents data about housing tenure in England and Wales from 1918 to 2011, specifically comparing the proportions of households in owned versus rented properties.\n\nLooking at the overall trends, there was a dramatic shift from renting to home ownership over the 93-year period, although this trend showed signs of reversing in the final decade.\n\nAt the start of the period in 1918, the vast majority of households (approximately 77%) rented their homes, while only about 23% were owner-occupiers. This situation gradually changed, and by 1953, the gap had narrowed considerably, with roughly 32% owning and 68% renting.\n\nThe crossover point came around 1971 when both categories reached approximately 50%. After this, home ownership continued to rise, reaching its peak of about 69% in 2001. However, by 2011, there was a notable reversal, with ownership dropping to around 64% and renting increasing to 36%.',
    wordCount: 165,
    timeSpentSeconds: 1800,
    status: 'Submitted',
    version: 2,
    previousVersionId: 'task1-essay-001',
    createdAt: '2025-12-30T09:00:00Z',
    updatedAt: '2025-12-30T09:30:00Z',
    submittedAt: '2025-12-30T09:30:00Z',
  },
];

// Mock Task 2 Essays
export const mockTask2Essays: Task2Essay[] = [
  {
    id: 'task2-essay-001',
    userId: 'user-001',
    topicId: 'task2-topic-001',
    content: 'The purpose of universities has been debated for decades. Some argue that higher education should focus on preparing students for employment, while others believe that knowledge should be pursued for its own sake.\n\nIn my opinion, universities should primarily equip students with practical skills for the workplace, although academic exploration also has its merits.\n\nFirstly, most students attend university with the expectation of improving their career prospects. They invest significant time and money, and therefore expect a return on this investment in the form of employability. Universities that fail to provide relevant skills may leave graduates struggling in the job market.\n\nHowever, pure academic pursuit also has value. Research universities have produced groundbreaking discoveries that initially had no practical application but later transformed society. Additionally, studying subjects like philosophy or history develops critical thinking skills that are valuable in any profession.\n\nIn conclusion, while I believe universities should ensure graduates are employable, there should also be room for academic exploration and theoretical learning.',
    wordCount: 173,
    timeSpentSeconds: 2400,
    status: 'Graded',
    version: 1,
    createdAt: '2025-12-26T14:00:00Z',
    updatedAt: '2025-12-26T14:40:00Z',
    submittedAt: '2025-12-26T14:40:00Z',
    gradedAt: '2025-12-26T15:30:00Z',
  },
  {
    id: 'task2-essay-002',
    userId: 'user-001',
    topicId: 'task2-topic-002',
    content: 'Technology has become an integral part of modern life, leading some to argue that it has made our lives overly complicated. While I acknowledge the challenges that technology presents, I disagree that abandoning it is the solution.\n\nOn one hand, technology has indeed added complexity to our lives. We are constantly bombarded with notifications, emails, and social media updates. Many people feel overwhelmed by the need to keep up with technological changes and maintain multiple digital accounts.',
    wordCount: 77,
    timeSpentSeconds: 900,
    status: 'Draft',
    version: 1,
    createdAt: '2025-12-29T16:00:00Z',
    updatedAt: '2025-12-29T16:15:00Z',
  },
  {
    id: 'task2-essay-003',
    userId: 'user-001',
    topicId: 'task2-topic-003',
    content: 'The debate over whether government funds should be allocated to railways or roads is ongoing in many countries. This essay will discuss both perspectives before presenting my own view.\n\nAdvocates for railway investment argue that trains are more environmentally friendly than cars. Railways can transport large numbers of passengers efficiently, reducing carbon emissions per traveler. Additionally, high-speed rail can compete with short-haul flights, further decreasing environmental impact.\n\nOn the other hand, supporters of road investment point out that roads offer greater flexibility. Unlike railways, roads can reach virtually any destination. They serve not only passenger transport but also freight delivery, which is essential for economic activity.\n\nIn my opinion, governments should prioritize railway development in urban areas while maintaining and improving roads in rural regions. This balanced approach would maximize transportation efficiency while addressing environmental concerns.\n\nIn conclusion, both railways and roads have their merits, and the optimal solution is likely a combination of investments tailored to specific regional needs.',
    wordCount: 168,
    timeSpentSeconds: 2100,
    status: 'Submitted',
    version: 1,
    createdAt: '2025-12-28T10:00:00Z',
    updatedAt: '2025-12-28T10:35:00Z',
    submittedAt: '2025-12-28T10:35:00Z',
  },
  {
    id: 'task2-essay-004',
    userId: 'user-001',
    topicId: 'task2-topic-001',
    content: 'There is an ongoing debate about the primary function of universities. While some believe that higher education institutions should focus on providing practical, job-relevant skills, others argue that universities should be centers for pure knowledge acquisition. I firmly believe that universities should strike a balance between these two objectives.\n\nProponents of vocational education argue that students attend university primarily to enhance their career prospects. With rising tuition costs, it is reasonable for students to expect a return on their investment. Graduates who possess relevant workplace skills are more likely to secure employment and contribute meaningfully to the economy.\n\nHowever, limiting universities to job training centers would be shortsighted. Throughout history, many significant discoveries emerged from seemingly impractical academic pursuits. The internet, for instance, originated from theoretical computer science research. Moreover, subjects like philosophy, literature, and pure mathematics cultivate critical thinking and creativity—qualities that benefit any profession.\n\nFurthermore, reducing education to mere job preparation ignores its broader social function. Universities shape citizens who can think critically about society, politics, and ethics. This civic education is essential for healthy democracies.\n\nIn conclusion, universities should serve both purposes. They should prepare students for successful careers while also fostering intellectual curiosity and civic responsibility. A narrow focus on either extreme would impoverish higher education.',
    wordCount: 218,
    timeSpentSeconds: 2700,
    status: 'Submitted',
    version: 2,
    previousVersionId: 'task2-essay-001',
    createdAt: '2025-12-30T14:00:00Z',
    updatedAt: '2025-12-30T14:45:00Z',
    submittedAt: '2025-12-30T14:45:00Z',
  },
];

// Helper functions
export function getTask1TopicsPublished(): Task1Topic[] {
  return mockTask1Topics.filter(topic => topic.isPublished);
}

export function getTask2TopicsPublished(): Task2Topic[] {
  return mockTask2Topics.filter(topic => topic.isPublished);
}

export function getTask1EssaysWithTopics(): Task1EssayWithTopic[] {
  return mockTask1Essays.map(essay => {
    const topic = mockTask1Topics.find(t => t.id === essay.topicId);
    return {
      ...essay,
      topic: topic!,
    };
  });
}

export function getTask2EssaysWithTopics(): Task2EssayWithTopic[] {
  return mockTask2Essays.map(essay => {
    const topic = mockTask2Topics.find(t => t.id === essay.topicId);
    return {
      ...essay,
      topic: topic!,
    };
  });
}

export function getTask1TopicById(id: string): Task1Topic | undefined {
  return mockTask1Topics.find(t => t.id === id);
}

export function getTask2TopicById(id: string): Task2Topic | undefined {
  return mockTask2Topics.find(t => t.id === id);
}

export function getEssayStats() {
  const task1Essays = mockTask1Essays;
  const task2Essays = mockTask2Essays;
  const allEssays = [...task1Essays, ...task2Essays];
  
  return {
    totalEssays: allEssays.length,
    drafts: allEssays.filter(e => e.status === 'Draft').length,
    submitted: allEssays.filter(e => e.status === 'Submitted').length,
    graded: allEssays.filter(e => e.status === 'Graded').length,
    totalWords: allEssays.reduce((acc, e) => acc + e.wordCount, 0),
    totalTimeMinutes: Math.round(allEssays.reduce((acc, e) => acc + e.timeSpentSeconds, 0) / 60),
  };
}

// ===== MOCK FEEDBACK DATA =====

// Task 1 Feedback Examples
export const mockTask1Feedback: Record<string, Task1Feedback> = {
  'task1-essay-001': {
    essayId: 'task1-essay-001',
    taskAchievement: {
      score: 6.5,
      comments: 'Bài viết đã đáp ứng tốt yêu cầu của đề bài. Bạn đã mô tả chính xác các xu hướng chính và đưa ra so sánh hợp lý.',
      strengths: [
        'Giới thiệu rõ ràng về biểu đồ',
        'Nêu được các xu hướng chính',
        'Có so sánh giữa các dữ liệu',
        'Độ dài bài viết phù hợp (177 từ)',
      ],
      improvements: [
        'Cần thêm một số chi tiết cụ thể về số liệu',
        'Nên làm nổi bật hơn các điểm đặc biệt trong biểu đồ',
        'Phần tổng kết có thể chi tiết hơn',
      ],
    },
    coherenceCohesion: {
      score: 6.0,
      comments: 'Bài viết có cấu trúc hợp lý với phần mở bài, thân bài và kết bài rõ ràng. Tuy nhiên, cần cải thiện việc sử dụng từ nối.',
      strengths: [
        'Cấu trúc bài viết logic',
        'Chia đoạn văn hợp lý',
        'Các câu liên kết với nhau tương đối tốt',
      ],
      improvements: [
        'Cần đa dạng hơn trong việc sử dụng từ nối (linking words)',
        'Một số đoạn văn có thể được kết nối mượt mà hơn',
        'Nên sử dụng thêm các cụm từ chỉ xu hướng (trend phrases)',
      ],
    },
    lexicalResource: {
      score: 6.5,
      comments: 'Từ vựng sử dụng khá tốt với một số cụm từ học thuật phù hợp. Tuy nhiên, vẫn còn lặp từ ở một số chỗ.',
      strengths: [
        'Sử dụng từ vựng học thuật phù hợp',
        'Có paraphrase đề bài',
        'Từ vựng chính xác và phù hợp ngữ cảnh',
      ],
      improvements: [
        'Tránh lặp lại các từ như "show", "increase"',
        'Nên sử dụng thêm từ đồng nghĩa',
        'Có thể thêm các cụm từ mô tả số liệu chính xác hơn',
      ],
    },
    grammaticalRange: {
      score: 6.0,
      comments: 'Ngữ pháp tương đối chính xác với một số câu phức. Tuy nhiên, cần đa dạng hơn về cấu trúc câu.',
      strengths: [
        'Sử dụng đúng các thì (simple past, present perfect)',
        'Ít lỗi ngữ pháp nghiêm trọng',
        'Có một số câu phức hợp lý',
      ],
      improvements: [
        'Nên sử dụng thêm câu phức (complex sentences)',
        'Có thể đa dạng hóa cấu trúc câu hơn',
        'Một số lỗi nhỏ về mạo từ (articles)',
      ],
    },
    estimatedBandScore: 6.5,
    overallScore: 6.5,
    overallComments: 'Đây là một bài viết Task 1 ở mức tốt (band 6.5). Bạn đã hoàn thành nhiệm vụ và trình bày thông tin một cách rõ ràng. Để đạt điểm cao hơn, hãy tập trung vào việc sử dụng đa dạng từ vựng và cấu trúc câu, đồng thời thêm chi tiết cụ thể hơn về số liệu.',
    recommendations: [
      'Luyện tập thêm về cách mô tả xu hướng với các cụm từ đa dạng',
      'Học thêm từ vựng về so sánh và tương phản',
      'Thực hành viết câu phức với nhiều mệnh đề',
      'Học các lesson về "Describing Trends" và "Comparing Data"',
      'Thử viết lại bài này với nhiều chi tiết số liệu hơn',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 1247,
    gradedAt: '2025-12-29T10:20:00Z',
  },
  'task1-essay-002': {
    essayId: 'task1-essay-002',
    taskAchievement: {
      score: 7.0,
      comments: 'Bài viết xuất sắc trong việc đáp ứng yêu cầu. Bạn đã mô tả đầy đủ các xu hướng và cung cấp số liệu cụ thể.',
      strengths: [
        'Mô tả chi tiết và chính xác các xu hướng',
        'Có số liệu cụ thể để minh họa',
        'So sánh tốt giữa các category',
        'Overview rõ ràng và súc tích',
      ],
      improvements: [
        'Có thể thêm một vài điểm nổi bật khác',
        'Nên làm nổi bật hơn sự khác biệt lớn nhất',
      ],
    },
    coherenceCohesion: {
      score: 7.0,
      comments: 'Cấu trúc bài viết xuất sắc với sự kết nối mượt mà giữa các ý tưởng.',
      strengths: [
        'Sử dụng từ nối đa dạng và chính xác',
        'Các đoạn văn liên kết tốt',
        'Progression logic rõ ràng',
      ],
      improvements: [
        'Có thể tối ưu hơn một vài chỗ chuyển ý',
      ],
    },
    lexicalResource: {
      score: 7.0,
      comments: 'Từ vựng phong phú và chính xác, với nhiều collocations học thuật.',
      strengths: [
        'Sử dụng từ vựng học thuật cao cấp',
        'Paraphrase hiệu quả',
        'Không lặp từ',
      ],
      improvements: [
        'Có thể thêm một vài less common words',
      ],
    },
    grammaticalRange: {
      score: 6.5,
      comments: 'Ngữ pháp tốt với đa dạng cấu trúc câu, có vài lỗi nhỏ.',
      strengths: [
        'Sử dụng nhiều câu phức',
        'Thì sử dụng chính xác',
        'Ít lỗi ngữ pháp',
      ],
      improvements: [
        'Có một vài lỗi nhỏ về article',
        'Nên kiểm tra lại subject-verb agreement',
      ],
    },
    estimatedBandScore: 7.0,
    overallScore: 7.0,
    overallComments: 'Bài viết Task 1 xuất sắc ở band 7.0! Bạn đã thể hiện kỹ năng mô tả và phân tích dữ liệu rất tốt. Từ vựng và cấu trúc câu đa dạng. Chỉ cần chú ý một số chi tiết nhỏ về ngữ pháp là có thể đạt band 7.5.',
    recommendations: [
      'Tiếp tục duy trì cách viết overview chi tiết',
      'Học thêm các cấu trúc câu phức tạp hơn',
      'Ôn lại quy tắc sử dụng articles',
      'Thử thách với các đề bài map hoặc process diagram',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 1389,
    gradedAt: '2025-12-27T15:35:00Z',
  },
};

// Task 2 Feedback Examples
export const mockTask2Feedback: Record<string, Task2Feedback> = {
  'task2-essay-002': {
    essayId: 'task2-essay-002',
    taskResponse: {
      score: 6.5,
      comments: 'Bài viết đã trả lời câu hỏi một cách hợp lý và đưa ra quan điểm rõ ràng. Các lập luận được phát triển tốt.',
      strengths: [
        'Quan điểm cá nhân rõ ràng',
        'Có ví dụ cụ thể để minh họa',
        'Đáp ứng đầy đủ yêu cầu của đề bài',
        'Độ dài phù hợp (256 từ)',
      ],
      improvements: [
        'Một số lập luận có thể được phát triển sâu hơn',
        'Nên thêm ví dụ thực tế cho một số điểm',
        'Có thể phân tích counter-argument chi tiết hơn',
      ],
    },
    coherenceCohesion: {
      score: 6.5,
      comments: 'Bài viết có cấu trúc tốt với các đoạn văn được tổ chức logic. Sử dụng từ nối hiệu quả.',
      strengths: [
        'Cấu trúc bài viết rõ ràng (intro-body-conclusion)',
        'Mỗi đoạn có topic sentence rõ ràng',
        'Sử dụng linking words phù hợp',
      ],
      improvements: [
        'Có thể cải thiện internal coherence trong một số đoạn',
        'Nên sử dụng đa dạng hơn các discourse markers',
      ],
    },
    lexicalResource: {
      score: 7.0,
      comments: 'Từ vựng phong phú và chính xác với nhiều collocations học thuật. Paraphrase hiệu quả.',
      strengths: [
        'Sử dụng từ vựng academic một cách tự nhiên',
        'Có nhiều less common words',
        'Paraphrase đề bài tốt',
        'Collocations chính xác',
      ],
      improvements: [
        'Một vài từ có thể chọn chính xác hơn về nuance',
      ],
    },
    grammaticalRange: {
      score: 6.5,
      comments: 'Ngữ pháp tốt với nhiều cấu trúc câu đa dạng. Có một vài lỗi nhỏ nhưng không ảnh hưởng đến nghĩa.',
      strengths: [
        'Sử dụng nhiều câu phức',
        'Mix giữa simple và complex sentences hiệu quả',
        'Punctuation chính xác',
      ],
      improvements: [
        'Có một vài lỗi về relative clause',
        'Nên kiểm tra lại modal verbs',
        'Một số chỗ có thể dùng passive voice',
      ],
    },
    estimatedBandScore: 7.0,
    overallScore: 7.0,
    overallComments: 'Bài viết Task 2 ở mức tốt (band 7.0)! Bạn đã trình bày quan điểm rõ ràng và lập luận có logic. Từ vựng phong phú và ngữ pháp chính xác. Để đạt band 7.5-8.0, hãy tập trung phát triển lập luận sâu hơn và giảm thiểu các lỗi ngữ pháp nhỏ.',
    recommendations: [
      'Học cách phát triển ideas với more depth',
      'Thực hành thêm relative clauses và conditional sentences',
      'Học các essay structures nâng cao',
      'Đọc các bài mẫu band 8.0 để học cách lập luận',
      'Thử viết lại bài với more sophisticated arguments',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 1876,
    gradedAt: '2025-12-26T09:40:00Z',
  },
  'task2-essay-004': {
    essayId: 'task2-essay-004',
    taskResponse: {
      score: 7.0,
      comments: 'Bài viết trả lời câu hỏi một cách toàn diện với nhiều góc nhìn khác nhau. Quan điểm rõ ràng và được bảo vệ tốt.',
      strengths: [
        'Phân tích vấn đề từ nhiều góc độ',
        'Lập luận được phát triển đầy đủ',
        'Có ví dụ cụ thể và relevant',
        'Conclusion tổng hợp tốt các ý chính',
      ],
      improvements: [
        'Có thể thêm một counter-argument mạnh hơn',
        'Một số ví dụ có thể specific hơn',
      ],
    },
    coherenceCohesion: {
      score: 7.0,
      comments: 'Cấu trúc bài viết logic và mạch lạc. Các ý tưởng được kết nối tự nhiên.',
      strengths: [
        'Progression of ideas rất tốt',
        'Paragraphing hiệu quả',
        'Sử dụng cohesive devices đa dạng',
        'Topic sentences rõ ràng',
      ],
      improvements: [
        'Có thể improve một vài transitions giữa paragraphs',
      ],
    },
    lexicalResource: {
      score: 7.5,
      comments: 'Từ vựng xuất sắc với nhiều academic words và phrases. Paraphrase rất tốt.',
      strengths: [
        'Wide range of vocabulary',
        'Less common words được sử dụng chính xác',
        'Collocations tự nhiên',
        'Không có spelling errors',
      ],
      improvements: [
        'Duy trì level này!',
      ],
    },
    grammaticalRange: {
      score: 7.0,
      comments: 'Ngữ pháp chính xác với cấu trúc câu đa dạng và phức tạp.',
      strengths: [
        'Variety of complex structures',
        'Conditional sentences chính xác',
        'Passive voice sử dụng tốt',
        'Rất ít lỗi',
      ],
      improvements: [
        'Có một vài chỗ article không chính xác lắm',
        'Một subject-verb agreement minor',
      ],
    },
    estimatedBandScore: 7.5,
    overallScore: 7.5,
    overallComments: 'Bài viết Task 2 xuất sắc ở band 7.5! Bạn đã thể hiện kỹ năng lập luận và viết học thuật rất tốt. Từ vựng phong phú, ngữ pháp chính xác và ideas được phát triển đầy đủ. Để đạt band 8.0, chỉ cần hoàn thiện thêm một vài chi tiết nhỏ về grammar và thêm sophisticated arguments.',
    recommendations: [
      'Duy trì cách viết này!',
      'Thực hành với các đề bài khó hơn',
      'Học thêm idiomatic expressions',
      'Đọc academic journals để học cách lập luận cao cấp',
      'Thử các discussion essays và two-part questions',
    ],
    aiModel: 'GPT-4',
    processingTimeMs: 2103,
    gradedAt: '2025-12-30T15:10:00Z',
  },
};

// Helper functions to get feedback
export function getTask1Feedback(essayId: string): Task1Feedback | undefined {
  return mockTask1Feedback[essayId];
}

export function getTask2Feedback(essayId: string): Task2Feedback | undefined {
  return mockTask2Feedback[essayId];
}

export function getTask1EssaysWithFeedback(): Task1EssayWithFeedback[] {
  return mockTask1Essays.map(essay => {
    const topic = mockTask1Topics.find(t => t.id === essay.topicId);
    const feedback = essay.status === 'Graded' ? getTask1Feedback(essay.id) : undefined;
    return {
      ...essay,
      topic: topic!,
      feedback,
    };
  });
}

export function getTask2EssaysWithFeedback(): Task2EssayWithFeedback[] {
  return mockTask2Essays.map(essay => {
    const topic = mockTask2Topics.find(t => t.id === essay.topicId);
    const feedback = essay.status === 'Graded' ? getTask2Feedback(essay.id) : undefined;
    return {
      ...essay,
      topic: topic!,
      feedback,
    };
  });
}
