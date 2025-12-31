import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlacementTestIntro } from './PlacementTestIntro';
import { Task1AssessmentEditor } from './Task1AssessmentEditor';
import { Task2AssessmentEditor } from './Task2AssessmentEditor';
import { PlacementProcessing } from './PlacementProcessing';
import { PlacementResult } from './PlacementResult';
import { 
  task1Prompts, 
  task2Prompts, 
  generateMockTask1Result, 
  generateMockTask2Result,
  calculateOverallBandScore 
} from '../../mocks/placementTest';
import type { 
  PlacementTest, 
  PlacementTestStep, 
  Task1Assessment, 
  Task2Assessment 
} from '../../types/placementTest';

export function PlacementTestPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PlacementTestStep>('intro');
  const [task1Result, setTask1Result] = useState<Task1Assessment | null>(null);
  const [_task2Result, setTask2Result] = useState<Task2Assessment | null>(null);
  const [finalResult, setFinalResult] = useState<PlacementTest | null>(null);
  
  // Use first prompts for now (can randomize later)
  const task1Prompt = task1Prompts[0];
  const task2Prompt = task2Prompts[0];

  // Draft states for auto-save
  const [task1Draft, setTask1Draft] = useState('');
  const [task2Draft, setTask2Draft] = useState('');

  const handleStart = useCallback(() => {
    setCurrentStep('task1');
  }, []);

  const handleTask1Complete = useCallback((essayText: string, wordCount: number, timeTaken: number) => {
    // Generate mock result for Task 1
    const result = generateMockTask1Result(essayText, wordCount, timeTaken, task1Prompt);
    setTask1Result(result);
    setCurrentStep('task2');
  }, [task1Prompt]);

  const handleTask1SaveDraft = useCallback((essayText: string) => {
    setTask1Draft(essayText);
  }, []);

  const handleTask2Submit = useCallback(async (essayText: string, wordCount: number, timeTaken: number) => {
    setCurrentStep('processing');
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    // Generate mock result for Task 2
    const result = generateMockTask2Result(essayText, wordCount, timeTaken, task2Prompt);
    setTask2Result(result);
    
    // Calculate overall score
    const overallScore = calculateOverallBandScore(
      task1Result?.overallScore || 0,
      result.overallScore
    );
    
    // Create final placement test result
    const placementResult: PlacementTest = {
      id: `pt-${Date.now()}`,
      userId: 'user-001',
      overallBandScore: overallScore,
      completedAt: new Date(),
      createdAt: new Date(),
      task1Assessment: task1Result || undefined,
      task2Assessment: result
    };
    
    setFinalResult(placementResult);
    setCurrentStep('result');
  }, [task2Prompt, task1Result]);

  const handleTask2SaveDraft = useCallback((essayText: string) => {
    setTask2Draft(essayText);
  }, []);

  const handleRetake = useCallback(() => {
    // Reset all state
    setTask1Result(null);
    setTask2Result(null);
    setFinalResult(null);
    setTask1Draft('');
    setTask2Draft('');
    setCurrentStep('intro');
  }, []);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleStartLearning = useCallback(() => {
    navigate('/learning-path');
  }, [navigate]);

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'intro' && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <PlacementTestIntro onStart={handleStart} />
        </motion.div>
      )}

      {currentStep === 'task1' && (
        <motion.div
          key="task1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Task1AssessmentEditor
            prompt={task1Prompt}
            onComplete={handleTask1Complete}
            onSaveDraft={handleTask1SaveDraft}
            initialContent={task1Draft}
          />
        </motion.div>
      )}

      {currentStep === 'task2' && (
        <motion.div
          key="task2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Task2AssessmentEditor
            prompt={task2Prompt}
            onSubmit={handleTask2Submit}
            onSaveDraft={handleTask2SaveDraft}
            initialContent={task2Draft}
            task1Completed={!!task1Result}
          />
        </motion.div>
      )}

      {currentStep === 'processing' && (
        <motion.div
          key="processing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlacementProcessing />
        </motion.div>
      )}

      {currentStep === 'result' && finalResult && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PlacementResult
            result={finalResult}
            onRetake={handleRetake}
            onGoHome={handleGoHome}
            onStartLearning={handleStartLearning}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export index
export { PlacementTestIntro } from './PlacementTestIntro';
export { Task1AssessmentEditor } from './Task1AssessmentEditor';
export { Task2AssessmentEditor } from './Task2AssessmentEditor';
export { PlacementProcessing } from './PlacementProcessing';
export { PlacementResult } from './PlacementResult';
export { AssessmentScoreCard } from './AssessmentScoreCard';
export { RecommendationPanel } from './RecommendationPanel';
export { WritingTimer, WordCounter, TaskStatusIndicator } from './WritingComponents';
