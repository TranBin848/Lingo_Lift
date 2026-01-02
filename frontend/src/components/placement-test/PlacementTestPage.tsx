import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PlacementTestIntro } from "./PlacementTestIntro";
import { Task1AssessmentEditor } from "./Task1AssessmentEditor";
import { Task2AssessmentEditor } from "./Task2AssessmentEditor";
import { PlacementProcessing } from "./PlacementProcessing";
import { PlacementResult } from "./PlacementResult";
import { getRandomTask1Topic } from "../../services/task1Topic.service";
import { getRandomTask2Topic } from "../../services/task2Topic.service";
import {
  startPlacementTest,
  submitTask1,
  submitTask2,
  type StartTestResponse,
  type Task1Result,
  type Task2Result,
} from "../../api/placementTest";
import type { Task1Topic } from "../../types/task1-topic";
import type { Task2Topic } from "../../types/task2-topic";
import type {
  PlacementTest,
  PlacementTestStep,
  Task1Assessment,
  Task2Assessment,
} from "../../types/placementTest";

export function PlacementTestPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PlacementTestStep>("intro");
  const [task1Result, setTask1Result] = useState<Task1Assessment | null>(null);
  const [_task2Result, setTask2Result] = useState<Task2Assessment | null>(null);
  const [finalResult, setFinalResult] = useState<PlacementTest | null>(null);

  // API states
  const [placementTestId, setPlacementTestId] = useState<number | null>(null);
  const [task1Topic, setTask1Topic] = useState<Task1Topic | null>(null);
  const [task2Topic, setTask2Topic] = useState<Task2Topic | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Draft states for auto-save
  const [task1Draft, setTask1Draft] = useState("");
  const [task2Draft, setTask2Draft] = useState("");

  const handleStart = useCallback(async () => {
    try {
      setIsLoadingTopic(true);
      setError(null);

      // Always start a fresh placement test
      const testResponse = await startPlacementTest({ testType: "Placement" });
      setPlacementTestId(testResponse.id);

      console.log("Started new placement test with ID:", testResponse.id);

      // Fetch random Task 1 topic
      const topic = await getRandomTask1Topic();
      setTask1Topic(topic);

      setCurrentStep("task1");
    } catch (err: any) {
      console.error("Failed to start placement test:", err);
      const errorMsg =
        err?.response?.data?.detail || "Failed to load test. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoadingTopic(false);
    }
  }, []);

  const handleTask1Complete = useCallback(
    async (essayText: string, wordCount: number, timeTaken: number) => {
      if (!placementTestId || !task1Topic) return;

      try {
        setIsLoadingTopic(true);
        setError(null);

        // Submit Task 1 to API for grading
        const payload = {
          TaskType: task1Topic.taskType,
          Prompt: task1Topic.prompt,
          ImageUrl: task1Topic.imageUrl || task1Topic.title || "",
          EssayText: essayText,
          TimeTaken: timeTaken,
        };

        const apiResult = await submitTask1(placementTestId, payload);

        // Convert API result to UI format
        const result: Task1Assessment = {
          id: apiResult.id.toString(),
          essayText: apiResult.essayText,
          wordCount: apiResult.wordCount,
          timeTaken: apiResult.timeTaken,
          prompt: { ...task1Topic },
          taskAchievement: apiResult.taskAchievement,
          coherenceCohesion: apiResult.coherenceCohesion,
          lexicalResource: apiResult.lexicalResource,
          grammaticalRange: apiResult.grammaticalRange,
          overallScore: apiResult.overallScore,
          generalFeedback: apiResult.generalFeedback,
          strengths: apiResult.strengths
            ? apiResult.strengths.split("\n").filter(Boolean)
            : [],
          weaknesses: apiResult.weaknesses
            ? apiResult.weaknesses.split("\n").filter(Boolean)
            : [],
          completedAt: new Date(apiResult.createdAt),
        };

        setTask1Result(result);

        // Fetch random Task 2 topic
        const topic2 = await getRandomTask2Topic();
        setTask2Topic(topic2);

        setCurrentStep("task2");
      } catch (err: any) {
        console.error("Failed to submit Task 1:", err);

        // If Task 1 already submitted, skip to Task 2
        if (err?.response?.data?.detail?.includes("already submitted")) {
          console.log("Task 1 already submitted, moving to Task 2...");
          try {
            // Fetch Task 2 topic and move forward
            const topic2 = await getRandomTask2Topic();
            setTask2Topic(topic2);
            setCurrentStep("task2");
          } catch (e) {
            setError("Failed to load Task 2. Please refresh the page.");
          }
        } else {
          setError("Failed to submit Task 1. Please try again.");
        }
      } finally {
        setIsLoadingTopic(false);
      }
    },
    [placementTestId, task1Topic]
  );

  const handleTask1SaveDraft = useCallback((essayText: string) => {
    setTask1Draft(essayText);
  }, []);

  const handleTask2Submit = useCallback(
    async (essayText: string, wordCount: number, timeTaken: number) => {
      if (!placementTestId || !task2Topic || !task1Result) return;

      setCurrentStep("processing");

      try {
        // Submit Task 2 to API for grading
        const apiResult = await submitTask2(placementTestId, {
          Prompt: task2Topic.prompt,
          QuestionType: task2Topic.questionType || "opinion",
          EssayText: essayText,
          TimeTaken: timeTaken,
        });

        // Convert API result to UI format
        const result: Task2Assessment = {
          id: apiResult.id.toString(),
          essayText: apiResult.essayText,
          wordCount: apiResult.wordCount,
          timeTaken: apiResult.timeTaken,
          prompt: { ...task2Topic },
          taskResponse: apiResult.taskResponse,
          coherenceCohesion: apiResult.coherenceCohesion,
          lexicalResource: apiResult.lexicalResource,
          grammaticalRange: apiResult.grammaticalRange,
          overallScore: apiResult.overallScore,
          generalFeedback: apiResult.generalFeedback,
          strengths: apiResult.strengths
            ? apiResult.strengths.split("\n").filter(Boolean)
            : [],
          weaknesses: apiResult.weaknesses
            ? apiResult.weaknesses.split("\n").filter(Boolean)
            : [],
          completedAt: new Date(apiResult.createdAt),
        };

        setTask2Result(result);

        // Calculate overall score (average of task1 and task2)
        const overallScore =
          (task1Result.overallScore + result.overallScore) / 2;

        // Create final placement test result
        const placementResult: PlacementTest = {
          id: placementTestId.toString(),
          userId: "user-current", // Will be set by backend
          overallBandScore: overallScore,
          completedAt: new Date(),
          createdAt: new Date(),
          task1Assessment: task1Result,
          task2Assessment: result,
        };

        setFinalResult(placementResult);
        setCurrentStep("result");
      } catch (err) {
        console.error("Failed to submit Task 2:", err);
        setError("Failed to submit Task 2. Please try again.");
        setCurrentStep("task2"); // Go back to task2 on error
      }
    },
    [placementTestId, task2Topic, task1Result]
  );

  const handleTask2SaveDraft = useCallback((essayText: string) => {
    setTask2Draft(essayText);
  }, []);

  const handleRetake = useCallback(() => {
    // Reset all state
    setTask1Result(null);
    setTask2Result(null);
    setFinalResult(null);
    setTask1Draft("");
    setTask2Draft("");
    setPlacementTestId(null);
    setTask1Topic(null);
    setTask2Topic(null);
    setError(null);
    setCurrentStep("intro");
  }, []);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleStartLearning = useCallback(() => {
    navigate("/learning-path");
  }, [navigate]);

  return (
    <AnimatePresence mode="wait">
      {currentStep === "intro" && (
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

      {currentStep === "task1" && (
        <motion.div
          key="task1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {isLoadingTopic ? (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {/* Animated Loading Circle */}
                <motion.div className="relative inline-flex items-center justify-center mb-8">
                  {/* Outer ring */}
                  <motion.div
                    className="absolute w-24 h-24 rounded-full border-4 border-blue-200 dark:border-blue-800"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Inner circle */}
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl font-bold text-white">2</span>
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  Đang tải đề bài Task 2...
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-400"
                >
                  Chỉ mất vài giây thôi!
                </motion.p>
              </motion.div>
            </div>
          ) : task1Topic ? (
            <Task1AssessmentEditor
              prompt={task1Topic}
              onComplete={handleTask1Complete}
              onSaveDraft={handleTask1SaveDraft}
              initialContent={task1Draft}
            />
          ) : error ? (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-6 rounded-lg max-w-md">
                <p className="mb-4">{error}</p>
                <button
                  onClick={handleStart}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      )}

      {currentStep === "task2" && (
        <motion.div
          key="task2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {isLoadingTopic ? (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {/* Animated Loading Circle */}
                <motion.div className="relative inline-flex items-center justify-center mb-8">
                  {/* Outer ring */}
                  <motion.div
                    className="absolute w-24 h-24 rounded-full border-4 border-purple-200 dark:border-purple-800"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Inner circle */}
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl font-bold text-white">2</span>
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  Đang tải đề bài Task 2...
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-400"
                >
                  Bạn đã hoàn thành Task 1! Tiếp tục nào...
                </motion.p>
              </motion.div>
            </div>
          ) : task2Topic ? (
            <Task2AssessmentEditor
              prompt={task2Topic}
              onSubmit={handleTask2Submit}
              onSaveDraft={handleTask2SaveDraft}
              initialContent={task2Draft}
              task1Completed={!!task1Result}
            />
          ) : error ? (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-6 rounded-lg max-w-md">
                <p className="mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reload Page
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      )}

      {currentStep === "processing" && (
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

      {currentStep === "result" && finalResult && (
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
export { PlacementTestIntro } from "./PlacementTestIntro";
export { Task1AssessmentEditor } from "./Task1AssessmentEditor";
export { Task2AssessmentEditor } from "./Task2AssessmentEditor";
export { PlacementProcessing } from "./PlacementProcessing";
export { PlacementResult } from "./PlacementResult";
export { AssessmentScoreCard } from "./AssessmentScoreCard";
export { RecommendationPanel } from "./RecommendationPanel";
export {
  WritingTimer,
  WordCounter,
  TaskStatusIndicator,
} from "./WritingComponents";
