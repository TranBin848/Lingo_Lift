// Learning Path Types based on database schema

export type LearningPathStatus = 'Active' | 'Paused' | 'Completed';
export type PhaseStatus = 'Pending' | 'InProgress' | 'Completed';
export type PrimaryFocus = 
  | 'TaskAchievement' 
  | 'TaskResponse'
  | 'CoherenceCohesion' 
  | 'LexicalResource' 
  | 'GrammaticalRange'
  | 'Overall';

export interface LearningPath {
  id: string;
  userId: string;
  currentBandScore: number;
  targetBandScore: number;
  targetDate: Date;
  estimatedDurationWeeks: number;
  status: LearningPathStatus;
  createdAt: Date;
  updatedAt: Date;
  phases: Phase[];
  adjustments: PathAdjustment[];
}

export interface Phase {
  id: string;
  learningPathId: string;
  phaseNumber: number;
  title: string;
  description: string;
  durationWeeks: number;
  startDate: Date;
  endDate: Date;
  primaryFocus: PrimaryFocus;
  expectedBandScore: number;
  status: PhaseStatus;
  task1Topics: PhaseTask1Topic[];
  task2Topics: PhaseTask2Topic[];
}

export interface PhaseTask1Topic {
  id: string;
  phaseId: string;
  topicId: string; // Links to Task1Topic.id in essays
  orderIndex: number;
  topicName: string;
  topicType: 'LineGraph' | 'BarChart' | 'PieChart' | 'Table' | 'Process' | 'Map' | 'Mixed';
  isRecommended: boolean;
  isCompleted: boolean;
  status?: 'not-started' | 'in-progress' | 'completed';
}

export interface PhaseTask2Topic {
  id: string;
  phaseId: string;
  topicId: string; // Links to Task2Topic.id in essays
  orderIndex: number;
  topicName: string;
  questionType: 'Opinion' | 'Discussion' | 'ProblemSolution' | 'AdvantagesDisadvantages' | 'TwoPartQuestion';
  isRecommended: boolean;
  isCompleted: boolean;
  status?: 'not-started' | 'in-progress' | 'completed';
}

export type AdjustmentReason = 
  | 'SlowerProgress' 
  | 'FasterProgress' 
  | 'WeakAreaIdentified' 
  | 'ScheduleChange'
  | 'TargetChange';

export interface PathAdjustment {
  id: string;
  learningPathId: string;
  adjustmentDate: Date;
  reason: AdjustmentReason;
  changesSummary: string;
  oldTargetDate?: Date;
  newTargetDate?: Date;
  oldTargetBand?: number;
  newTargetBand?: number;
}

export interface ProgressRecord {
  id: string;
  learningPathId: string;
  recordDate: Date;
  essaysWritten: number;
  totalWordCount: number;
  studyTimeMinutes: number;
  lessonsCompleted: number;
  averageBandScore: number;
  task1Score?: number;
  task2Score?: number;
}

export interface TodayTask {
  id: string;
  type: 'essay' | 'lesson' | 'practice';
  title: string;
  description: string;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  relatedPhase?: string;
  relatedTopicId?: string; // Links to Task1Topic.id or Task2Topic.id
  actionUrl?: string;
}

// Helper functions
export function getPhaseStatusColor(status: PhaseStatus): string {
  switch (status) {
    case 'Completed': return 'text-emerald-600 dark:text-emerald-400';
    case 'InProgress': return 'text-blue-600 dark:text-blue-400';
    case 'Pending': return 'text-gray-500 dark:text-gray-400';
  }
}

export function getPhaseStatusBg(status: PhaseStatus): string {
  switch (status) {
    case 'Completed': return 'bg-emerald-100 dark:bg-emerald-900/40';
    case 'InProgress': return 'bg-blue-100 dark:bg-blue-900/40';
    case 'Pending': return 'bg-gray-100 dark:bg-gray-800';
  }
}

export function getPrimaryFocusLabel(focus: PrimaryFocus): string {
  const labels: Record<PrimaryFocus, string> = {
    TaskAchievement: 'Task Achievement',
    TaskResponse: 'Task Response',
    CoherenceCohesion: 'Coherence & Cohesion',
    LexicalResource: 'Lexical Resource',
    GrammaticalRange: 'Grammatical Range & Accuracy',
    Overall: 'Tổng hợp các kỹ năng'
  };
  return labels[focus];
}

export function getAdjustmentReasonLabel(reason: AdjustmentReason): string {
  const labels: Record<AdjustmentReason, string> = {
    SlowerProgress: 'Tiến độ chậm hơn dự kiến',
    FasterProgress: 'Tiến độ nhanh hơn dự kiến',
    WeakAreaIdentified: 'Phát hiện điểm yếu cần tập trung',
    ScheduleChange: 'Thay đổi lịch học',
    TargetChange: 'Thay đổi mục tiêu'
  };
  return labels[reason];
}

export function getLearningPathStatusLabel(status: LearningPathStatus): string {
  const labels: Record<LearningPathStatus, string> = {
    Active: 'Đang học',
    Paused: 'Tạm dừng',
    Completed: 'Hoàn thành'
  };
  return labels[status];
}

export function getPhaseStatusLabel(status: PhaseStatus): string {
  const labels: Record<PhaseStatus, string> = {
    Pending: 'Chưa bắt đầu',
    InProgress: 'Đang học',
    Completed: 'Hoàn thành'
  };
  return labels[status];
}
