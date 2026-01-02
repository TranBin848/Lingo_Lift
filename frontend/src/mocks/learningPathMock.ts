import type { 
  LearningPath, 
  Phase, 
  PathAdjustment, 
  ProgressRecord, 
  TodayTask 
} from '../types/learningPathTypes';

// Helper to create dates relative to today
const today = new Date();
const daysAgo = (days: number) => new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
const daysFromNow = (days: number) => new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
const weeksFromNow = (weeks: number) => daysFromNow(weeks * 7);
const weeksAgo = (weeks: number) => daysAgo(weeks * 7);

// Mock Phases
export const mockPhases: Phase[] = [
  {
    id: 'phase-1',
    learningPathId: 'lp-001',
    phaseNumber: 1,
    title: 'Xây dựng nền tảng',
    description: 'Củng cố kiến thức cơ bản về cấu trúc bài viết IELTS, từ vựng học thuật và ngữ pháp nền tảng.',
    durationWeeks: 3,
    startDate: weeksAgo(4),
    endDate: weeksAgo(1),
    primaryFocus: 'GrammaticalRange',
    expectedBandScore: 5.5,
    status: 'Completed',
    task1Topics: [
      { id: 't1-1', phaseId: 'phase-1', topicId: 'task1-topic-002', orderIndex: 1, topicName: 'Mô tả xu hướng cơ bản', topicType: 'LineGraph', isRecommended: false, isCompleted: true, status: 'completed' },
      { id: 't1-2', phaseId: 'phase-1', topicId: 'task1-topic-001', orderIndex: 2, topicName: 'So sánh dữ liệu đơn giản', topicType: 'BarChart', isRecommended: false, isCompleted: true, status: 'completed' },
      { id: 't1-3', phaseId: 'phase-1', topicId: 'task1-topic-003', orderIndex: 3, topicName: 'Mô tả tỷ lệ phần trăm', topicType: 'PieChart', isRecommended: false, isCompleted: true, status: 'completed' },
    ],
    task2Topics: [
      { id: 't2-1', phaseId: 'phase-1', topicId: 'task2-topic-001', orderIndex: 1, topicName: 'Cấu trúc bài Opinion Essay', questionType: 'Opinion', isRecommended: false, isCompleted: true, status: 'completed' },
      { id: 't2-2', phaseId: 'phase-1', topicId: 'task2-topic-003', orderIndex: 2, topicName: 'Viết mở bài hiệu quả', questionType: 'Discussion', isRecommended: false, isCompleted: true, status: 'completed' },
    ]
  },
  {
    id: 'phase-2',
    learningPathId: 'lp-001',
    phaseNumber: 2,
    title: 'Phát triển Coherence & Cohesion',
    description: 'Tập trung vào việc liên kết ý, sử dụng từ nối và tổ chức đoạn văn mạch lạc.',
    durationWeeks: 4,
    startDate: weeksAgo(1),
    endDate: weeksFromNow(3),
    primaryFocus: 'CoherenceCohesion',
    expectedBandScore: 6.0,
    status: 'InProgress',
    task1Topics: [
      { id: 't1-4', phaseId: 'phase-2', topicId: 'task1-topic-009', orderIndex: 1, topicName: 'Phân tích biểu đồ phức hợp', topicType: 'Mixed', isRecommended: true, isCompleted: false, status: 'in-progress' },
      { id: 't1-5', phaseId: 'phase-2', topicId: 'task1-topic-006', orderIndex: 2, topicName: 'Mô tả quy trình', topicType: 'Process', isRecommended: true, isCompleted: false, status: 'not-started' },
      { id: 't1-6', phaseId: 'phase-2', topicId: 'task1-topic-005', orderIndex: 3, topicName: 'So sánh bản đồ', topicType: 'Map', isRecommended: false, isCompleted: false, status: 'not-started' },
    ],
    task2Topics: [
      { id: 't2-3', phaseId: 'phase-2', topicId: 'task2-topic-008', orderIndex: 1, topicName: 'Sử dụng từ nối nâng cao', questionType: 'Discussion', isRecommended: true, isCompleted: false, status: 'in-progress' },
      { id: 't2-4', phaseId: 'phase-2', topicId: 'task2-topic-004', orderIndex: 2, topicName: 'Phát triển đoạn văn thân bài', questionType: 'ProblemSolution', isRecommended: true, isCompleted: false, status: 'not-started' },
      { id: 't2-5', phaseId: 'phase-2', topicId: 'task2-topic-002', orderIndex: 3, topicName: 'Viết kết luận ấn tượng', questionType: 'Opinion', isRecommended: false, isCompleted: false, status: 'not-started' },
    ]
  },
  {
    id: 'phase-3',
    learningPathId: 'lp-001',
    phaseNumber: 3,
    title: 'Mở rộng Lexical Resource',
    description: 'Nâng cao vốn từ vựng học thuật, học cách paraphrase và sử dụng collocations.',
    durationWeeks: 4,
    startDate: weeksFromNow(3),
    endDate: weeksFromNow(7),
    primaryFocus: 'LexicalResource',
    expectedBandScore: 6.5,
    status: 'Pending',
    task1Topics: [
      { id: 't1-7', phaseId: 'phase-3', topicId: 'task1-topic-004', orderIndex: 1, topicName: 'Từ vựng mô tả số liệu', topicType: 'Table', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't1-8', phaseId: 'phase-3', topicId: 'task1-topic-010', orderIndex: 2, topicName: 'Paraphrase trong Task 1', topicType: 'LineGraph', isRecommended: false, isCompleted: false, status: 'not-started' },
    ],
    task2Topics: [
      { id: 't2-6', phaseId: 'phase-3', topicId: 'task2-topic-007', orderIndex: 1, topicName: 'Từ vựng chủ đề Environment', questionType: 'ProblemSolution', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't2-7', phaseId: 'phase-3', topicId: 'task2-topic-011', orderIndex: 2, topicName: 'Từ vựng chủ đề Education', questionType: 'Discussion', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't2-8', phaseId: 'phase-3', topicId: 'task2-topic-006', orderIndex: 3, topicName: 'Từ vựng chủ đề Technology', questionType: 'AdvantagesDisadvantages', isRecommended: false, isCompleted: false, status: 'not-started' },
    ]
  },
  {
    id: 'phase-4',
    learningPathId: 'lp-001',
    phaseNumber: 4,
    title: 'Hoàn thiện & Luyện thi',
    description: 'Luyện viết bài hoàn chỉnh trong thời gian thực, phân tích lỗi và tối ưu hóa điểm số.',
    durationWeeks: 3,
    startDate: weeksFromNow(7),
    endDate: weeksFromNow(10),
    primaryFocus: 'Overall',
    expectedBandScore: 7.0,
    status: 'Pending',
    task1Topics: [
      { id: 't1-9', phaseId: 'phase-4', topicId: 'task1-topic-009', orderIndex: 1, topicName: 'Mock Test Task 1 - Set 1', topicType: 'Mixed', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't1-10', phaseId: 'phase-4', topicId: 'task1-topic-010', orderIndex: 2, topicName: 'Mock Test Task 1 - Set 2', topicType: 'Mixed', isRecommended: false, isCompleted: false, status: 'not-started' },
    ],
    task2Topics: [
      { id: 't2-9', phaseId: 'phase-4', topicId: 'task2-topic-009', orderIndex: 1, topicName: 'Mock Test Task 2 - Opinion', questionType: 'Opinion', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't2-10', phaseId: 'phase-4', topicId: 'task2-topic-010', orderIndex: 2, topicName: 'Mock Test Task 2 - Discussion', questionType: 'Discussion', isRecommended: false, isCompleted: false, status: 'not-started' },
      { id: 't2-11', phaseId: 'phase-4', topicId: 'task2-topic-012', orderIndex: 3, topicName: 'Full Mock Test', questionType: 'TwoPartQuestion', isRecommended: false, isCompleted: false, status: 'not-started' },
    ]
  }
];

// Mock Path Adjustments
export const mockAdjustments: PathAdjustment[] = [
  {
    id: 'adj-1',
    learningPathId: 'lp-001',
    adjustmentDate: weeksAgo(2),
    reason: 'FasterProgress',
    changesSummary: 'Bạn đã hoàn thành Phase 1 sớm hơn 1 tuần. AI đã điều chỉnh để bắt đầu Phase 2 sớm hơn.',
    oldTargetDate: weeksFromNow(12),
    newTargetDate: weeksFromNow(10),
  },
  {
    id: 'adj-2',
    learningPathId: 'lp-001',
    adjustmentDate: weeksAgo(3),
    reason: 'WeakAreaIdentified',
    changesSummary: 'Phát hiện điểm yếu về Coherence & Cohesion. Đã thêm bài tập bổ sung vào Phase 2.',
  }
];

// Mock Learning Path
export const mockLearningPath: LearningPath = {
  id: 'lp-001',
  userId: 'user-001',
  currentBandScore: 5.5,
  targetBandScore: 7.0,
  targetDate: weeksFromNow(10),
  estimatedDurationWeeks: 14,
  status: 'Active',
  createdAt: weeksAgo(4),
  updatedAt: daysAgo(1),
  phases: mockPhases,
  adjustments: mockAdjustments
};

// Mock Progress Records (last 14 days)
export const mockProgressRecords: ProgressRecord[] = [
  { id: 'pr-1', learningPathId: 'lp-001', recordDate: daysAgo(13), essaysWritten: 1, totalWordCount: 280, studyTimeMinutes: 45, lessonsCompleted: 2, averageBandScore: 5.0, task1Score: 5.0, task2Score: 5.0 },
  { id: 'pr-2', learningPathId: 'lp-001', recordDate: daysAgo(12), essaysWritten: 2, totalWordCount: 520, studyTimeMinutes: 60, lessonsCompleted: 1, averageBandScore: 5.0, task1Score: 5.0, task2Score: 5.0 },
  { id: 'pr-3', learningPathId: 'lp-001', recordDate: daysAgo(11), essaysWritten: 1, totalWordCount: 310, studyTimeMinutes: 50, lessonsCompleted: 3, averageBandScore: 5.5, task1Score: 5.0, task2Score: 5.5 },
  { id: 'pr-4', learningPathId: 'lp-001', recordDate: daysAgo(10), essaysWritten: 0, totalWordCount: 0, studyTimeMinutes: 30, lessonsCompleted: 2, averageBandScore: 5.5 },
  { id: 'pr-5', learningPathId: 'lp-001', recordDate: daysAgo(9), essaysWritten: 2, totalWordCount: 480, studyTimeMinutes: 75, lessonsCompleted: 1, averageBandScore: 5.5, task1Score: 5.5, task2Score: 5.5 },
  { id: 'pr-6', learningPathId: 'lp-001', recordDate: daysAgo(8), essaysWritten: 1, totalWordCount: 260, studyTimeMinutes: 40, lessonsCompleted: 2, averageBandScore: 5.5, task1Score: 5.5, task2Score: 5.5 },
  { id: 'pr-7', learningPathId: 'lp-001', recordDate: daysAgo(7), essaysWritten: 2, totalWordCount: 550, studyTimeMinutes: 90, lessonsCompleted: 2, averageBandScore: 6.0, task1Score: 5.5, task2Score: 6.0 },
  { id: 'pr-8', learningPathId: 'lp-001', recordDate: daysAgo(6), essaysWritten: 1, totalWordCount: 290, studyTimeMinutes: 55, lessonsCompleted: 1, averageBandScore: 5.5, task1Score: 5.5, task2Score: 5.5 },
  { id: 'pr-9', learningPathId: 'lp-001', recordDate: daysAgo(5), essaysWritten: 2, totalWordCount: 510, studyTimeMinutes: 80, lessonsCompleted: 3, averageBandScore: 6.0, task1Score: 6.0, task2Score: 6.0 },
  { id: 'pr-10', learningPathId: 'lp-001', recordDate: daysAgo(4), essaysWritten: 1, totalWordCount: 320, studyTimeMinutes: 45, lessonsCompleted: 2, averageBandScore: 6.0, task1Score: 5.5, task2Score: 6.0 },
  { id: 'pr-11', learningPathId: 'lp-001', recordDate: daysAgo(3), essaysWritten: 2, totalWordCount: 580, studyTimeMinutes: 95, lessonsCompleted: 2, averageBandScore: 6.0, task1Score: 6.0, task2Score: 6.0 },
  { id: 'pr-12', learningPathId: 'lp-001', recordDate: daysAgo(2), essaysWritten: 1, totalWordCount: 270, studyTimeMinutes: 50, lessonsCompleted: 1, averageBandScore: 6.0, task1Score: 6.0, task2Score: 6.0 },
  { id: 'pr-13', learningPathId: 'lp-001', recordDate: daysAgo(1), essaysWritten: 2, totalWordCount: 540, studyTimeMinutes: 85, lessonsCompleted: 2, averageBandScore: 6.0, task1Score: 6.0, task2Score: 6.0 },
  { id: 'pr-14', learningPathId: 'lp-001', recordDate: today, essaysWritten: 1, totalWordCount: 290, studyTimeMinutes: 40, lessonsCompleted: 1, averageBandScore: 6.0, task1Score: 6.0, task2Score: 6.0 },
];

// Mock Today's Tasks
export const mockTodayTasks: TodayTask[] = [
  {
    id: 'task-1',
    type: 'essay',
    title: 'Viết 1 bài Task 2 - Discussion Essay',
    description: 'Chủ đề: Ưu nhược điểm của làm việc từ xa',
    estimatedMinutes: 40,
    priority: 'high',
    relatedPhase: 'Phase 2',
    relatedTopicId: 'task2-topic-008',
    actionUrl: '/essays?type=task2'
  },
  {
    id: 'task-2',
    type: 'lesson',
    title: 'Hoàn thành bài học về từ nối',
    description: 'Lesson: Sử dụng linking words hiệu quả trong Task 2',
    estimatedMinutes: 20,
    priority: 'high',
    relatedPhase: 'Phase 2',
    relatedTopicId: 'lesson-linking-words'
  },
  {
    id: 'task-3',
    type: 'practice',
    title: 'Luyện tập Task 1 - Process Diagram',
    description: 'Mô tả quy trình sản xuất chocolate',
    estimatedMinutes: 25,
    priority: 'medium',
    relatedPhase: 'Phase 2',
    relatedTopicId: 'task1-topic-006',
    actionUrl: '/essays?type=task1'
  },
  {
    id: 'task-4',
    type: 'lesson',
    title: 'Ôn tập vocabulary chủ đề Environment',
    description: '25 từ vựng quan trọng về môi trường',
    estimatedMinutes: 15,
    priority: 'low',
    relatedPhase: 'Phase 3',
    relatedTopicId: 'lesson-env-vocab'
  }
];

// Helper to get current phase
export function getCurrentPhase(phases: Phase[]): Phase | undefined {
  return phases.find(p => p.status === 'InProgress');
}

// Helper to calculate progress percentage
export function calculateProgressPercentage(learningPath: LearningPath): number {
  const { currentBandScore, targetBandScore } = learningPath;
  const phases = learningPath.phases || [];
  // Get starting band from first phase expected score minus improvement
  const startingBand = phases[0]?.expectedBandScore - 0.5 || currentBandScore - 0.5;
  const totalImprovement = targetBandScore - startingBand;
  const currentImprovement = currentBandScore - startingBand;
  return Math.min(Math.max((currentImprovement / totalImprovement) * 100, 0), 100);
}

// Get score trend insight
export function getScoreTrendInsight(progressRecords: ProgressRecord[]): { text: string; isPositive: boolean } {
  if (progressRecords.length < 7) {
    return { text: 'Cần thêm dữ liệu để phân tích xu hướng', isPositive: true };
  }
  
  const recent7Days = progressRecords.slice(-7);
  const previous7Days = progressRecords.slice(-14, -7);
  
  const recentAvg = recent7Days.reduce((sum, r) => sum + r.averageBandScore, 0) / recent7Days.length;
  const previousAvg = previous7Days.reduce((sum, r) => sum + r.averageBandScore, 0) / previous7Days.length;
  
  if (recentAvg > previousAvg + 0.2) {
    return { text: 'Tiến độ hiện tại đang nhanh hơn kế hoạch! Tuyệt vời!', isPositive: true };
  } else if (recentAvg < previousAvg - 0.2) {
    return { text: 'Bạn đang chậm hơn dự kiến một chút. Hãy cố gắng thêm!', isPositive: false };
  }
  return { text: 'Bạn đang đi đúng tiến độ. Tiếp tục phát huy!', isPositive: true };
}
