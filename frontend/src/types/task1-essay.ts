/**
 * Task 1 Essay Types
 * 
 * Types for IELTS Writing Task 1 essay submissions and responses
 */

/**
 * Task 1 Essay
 * Represents a submitted Task 1 essay
 */
export interface Task1Essay {
  id: number;
  task1TopicId: number;
  taskType?: string;
  essayText: string;
  wordCount: number;
  timeTaken?: number;
  version?: number;
  status: 'Draft' | 'Submitted' | 'Graded';
  submittedAt?: string;
  createdAt: string;
  updatedAt?: string;
  userId?: number;
  topicPrompt?: string;
  previousVersionId?: number | null;
  hasFeedback?: boolean;
  feedback?: Task1ApiFeedback;
}

/**
 * Create Task 1 Essay Payload
 * Request body for creating a new essay submission
 */
export interface CreateTask1EssayPayload {
  task1TopicId: number;
  taskType: 'Academic' | 'General';
  essayText: string;
  wordCount: number;
  timeTaken: number;
}

/**
 * Task 1 Essay with Topic Info (for UI display)
 * Extended type that includes topic information
 */
export interface Task1EssayWithTopic extends Task1Essay {
  topicTitle?: string;
  topicQuestion?: string;
}

/**
 * API Feedback Annotation
 */
export interface FeedbackAnnotation {
  id: number;
  type: 'Error' | 'Suggestion' | 'Highlight';
  startIndex: number;
  endIndex: number;
  originalText: string;
  category: string;
  severity: 'Minor' | 'Major' | 'Critical';
  message: string;
  suggestion: string;
}

/**
 * Score detail from API
 */
export interface ApiScoreDetail {
  score: number;
  comments: string;
  strengths: string;
  improvements: string;
}

/**
 * Task 1 API Feedback Response
 */
export interface Task1ApiFeedback {
  id: number;
  taskAchievement: ApiScoreDetail;
  coherenceCohesion: ApiScoreDetail;
  lexicalResource: ApiScoreDetail;
  grammaticalRange: ApiScoreDetail;
  overallScore: number;
  overallComments: string;
  recommendations: string;
  estimatedBandScore: number;
  aiModel: string;
  processingTimeMs: number | null;
  createdAt: string;
  annotations: FeedbackAnnotation[];
}

/**
 * Submit Essay Response
 */
export interface SubmitTask1EssayResponse {
  message: string;
  data: Task1Essay;
}
