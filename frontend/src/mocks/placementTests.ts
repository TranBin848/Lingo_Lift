// Mock placement tests data for development
export const MOCK_PLACEMENT_TESTS = [
  {
    _id: "writing-basic-001",
    title: "Bài Kiểm Tra Viết Cơ Bản",
    description: "Đánh giá khả năng viết câu và đoạn văn đơn giản. Phù hợp cho người mới bắt đầu.",
    version: "1.0",
    isActive: true,
    totalQuestions: 5,
    totalTimeLimit: 30,
    sections: [
      { type: "writing", title: "Viết câu" },
      { type: "writing", title: "Viết đoạn văn" },
    ],
    scoringCriteria: {
      bandScores: [],
    },
    createdBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    updatedBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "writing-intermediate-001",
    title: "Bài Kiểm Tra Viết Trung Cấp",
    description: "Đánh giá khả năng viết đoạn văn và bài luận ngắn. Dành cho học viên trung cấp.",
    version: "1.0",
    isActive: true,
    totalQuestions: 4,
    totalTimeLimit: 45,
    sections: [
      { type: "writing", title: "Viết đoạn văn" },
      { type: "writing", title: "Viết bài luận" },
    ],
    scoringCriteria: {
      bandScores: [],
    },
    createdBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    updatedBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "writing-advanced-001",
    title: "Bài Kiểm Tra Viết Nâng Cao",
    description: "Đánh giá khả năng viết bài luận học thuật và phân tích. Dành cho học viên nâng cao.",
    version: "1.0",
    isActive: true,
    totalQuestions: 3,
    totalTimeLimit: 60,
    sections: [
      { type: "writing", title: "Bài luận học thuật" },
      { type: "writing", title: "Phân tích văn bản" },
    ],
    scoringCriteria: {
      bandScores: [],
    },
    createdBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    updatedBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "writing-ielts-task1",
    title: "IELTS Writing Task 1 Practice",
    description: "Practice test for IELTS Academic Writing Task 1. Describe graphs, charts, and diagrams.",
    version: "1.0",
    isActive: true,
    totalQuestions: 1,
    totalTimeLimit: 20,
    sections: [
      { type: "writing", title: "Task 1 - Data Description" },
    ],
    scoringCriteria: {
      bandScores: [],
    },
    createdBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    updatedBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "writing-business-email",
    title: "Business Email Writing Test",
    description: "Assess your ability to write professional business emails in various scenarios.",
    version: "1.0",
    isActive: false,
    totalQuestions: 3,
    totalTimeLimit: 40,
    sections: [
      { type: "writing", title: "Formal Email" },
      { type: "writing", title: "Request Email" },
      { type: "writing", title: "Complaint Email" },
    ],
    scoringCriteria: {
      bandScores: [],
    },
    createdBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    updatedBy: {
      _id: "admin-001",
      displayName: "Admin",
      username: "admin",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
