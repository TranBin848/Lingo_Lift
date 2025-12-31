export type PhaseStatus = 'Pending' | 'InProgress' | 'Completed';
export type LearningPathStatus = 'Active' | 'Completed' | 'Cancelled';
export type PrimaryFocus = 
  | 'CoherenceCohesion' 
  | 'LexicalResource' 
  | 'TaskAchievement' 
  | 'GrammaticalRangeAccuracy'
  | 'AllAreas';

export interface Phase {
  id: number;
  phaseNumber: number;
  title: string;
  description: string;
  durationWeeks: number;
  startDate: string;
  endDate: string;
  status: PhaseStatus;
  primaryFocus: PrimaryFocus;
  expectedBandScore: number;
  actualBandScore: number | null;
  createdAt: string;
  learningPathId: number;
  totalLessons?: number;
  completedLessons?: number;
  totalTask1Topics?: number;
  totalTask2Topics?: number;
  lessonProgressPercentage?: number;
}

export interface LearningPath {
  id: number;
  currentBandScore: number;
  targetBandScore: number;
  targetDate: string;
  estimatedDurationWeeks: number;
  status: LearningPathStatus;
  createdAt: string;
  updatedAt: string;
  userId: number;
  placementTestId: number;
  phases: Phase[];
  totalPhases: number;
  completedPhases: number;
  currentPhaseNumber: number;
  progressPercentage: number;
  daysRemaining: number;
  isOnTrack: boolean;
}
