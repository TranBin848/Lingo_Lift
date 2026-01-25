import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlacementTestIntro } from "../components/placement-test/PlacementTestIntro";
import { Task1AssessmentEditor } from "../components/placement-test/Task1AssessmentEditor";
import { Task2AssessmentEditor } from "../components/placement-test/Task2AssessmentEditor";
import { PlacementProcessing } from "../components/placement-test/PlacementProcessing";
import { PlacementResult } from "../components/placement-test/PlacementResult";
import { getRandomTask1Topic } from "../services/task1Topic.service";
import { getRandomTask2Topic } from "../services/task2Topic.service";
import {
  startPlacementTest,
  submitTask1,
  submitTask2,
} from "../api/placementTest";
import type { Task1Topic } from "../types/task1-topic";
import type { Task2Topic } from "../types/task2-topic";
import type {
  PlacementTest,
  PlacementTestStep,
  Task1Assessment,
  Task2Assessment,
} from "../types/placementTest";

export default function ProgressTest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PlacementTestStep>("intro");
  const [task1Result, setTask1Result] = useState<Task1Assessment | null>(null);
  const [_task2Result, setTask2Result] = useState<Task2Assessment | null>(null);
  const [finalResult, setFinalResult] = useState<PlacementTest | null>(null);

  const [placementTestId, setPlacementTestId] = useState<number | null>(null);
  const [task1Topic, setTask1Topic] = useState<Task1Topic | null>(null);
  const [task2Topic, setTask2Topic] = useState<Task2Topic | null>(null);
  const [_isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  const [task1Draft, setTask1Draft] = useState("");
  const [task2Draft, setTask2Draft] = useState("");

  const handleStart = useCallback(async () => {
    try {
      setIsLoadingTopic(true);
      setError(null);

      const testResponse = await startPlacementTest({ testType: "Progress" });
      setPlacementTestId(testResponse.id);

      const topic = await getRandomTask1Topic();
      setTask1Topic(topic);

      setCurrentStep("task1");
    } catch (err: unknown) {
      console.error("Failed to start progress test:", err);
      const apiError = (err as any)?.response?.data;
      
      // Xử lý validation error từ API
      if (apiError?.errors?.LearningPath) {
        const errorMessage = apiError.errors.LearningPath[0];
        toast.error("Không thể bắt đầu bài kiểm tra", {
          description: errorMessage,
        });
        setError(errorMessage);
      } else {
        const errorMsg = apiError?.detail || "Không thể tải bài kiểm tra. Vui lòng thử lại.";
        toast.error("Có lỗi xảy ra", {
          description: errorMsg,
        });
        setError(errorMsg);
      }
    } finally {
      setIsLoadingTopic(false);
    }
  }, []);

  const handleTask1Complete = useCallback(
    async (essayText: string, _wordCount: number, timeTaken: number) => {
      if (!placementTestId || !task1Topic) return;

      try {
        setIsLoadingTopic(true);
        setError(null);

        const payload = {
          TaskType: task1Topic.taskType,
          Prompt: task1Topic.prompt,
          ImageUrl: task1Topic.imageUrl || task1Topic.title || "",
          EssayText: essayText,
          TimeTaken: timeTaken,
        };

        const apiResult = await submitTask1(placementTestId, payload);

        const result: Task1Assessment = {
          id: apiResult.id.toString(),
          essayText: apiResult.essayText,
          wordCount: apiResult.wordCount,
          timeTaken: apiResult.timeTaken,
          prompt: task1Topic.prompt,
          taskAchievement: apiResult.taskAchievement,
          coherenceCohesion: apiResult.coherenceCohesion,
          lexicalResource: apiResult.lexicalResource,
          grammaticalRange: apiResult.grammaticalRange,
          overallScore: apiResult.overallScore,
          generalFeedback: apiResult.generalFeedback,
          strengths: apiResult.strengths || "",
          weaknesses: apiResult.weaknesses || "",
          completedAt: new Date(apiResult.createdAt),
        };

        setTask1Result(result);

        const topic2 = await getRandomTask2Topic();
        setTask2Topic(topic2);

        setCurrentStep("task2");
      } catch (err: unknown) {
        console.error("Failed to submit Task 1:", err);

        if ((err as any)?.response?.data?.detail?.includes("already submitted")) {
          try {
            const topic2 = await getRandomTask2Topic();
            setTask2Topic(topic2);
            setCurrentStep("task2");
          } catch (_e) {
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
    async (essayText: string, _wordCount: number, timeTaken: number) => {
      if (!placementTestId || !task2Topic || !task1Result) return;

      setCurrentStep("processing");

      try {
        const apiResult = await submitTask2(placementTestId, {
          Prompt: task2Topic.prompt,
          QuestionType: task2Topic.questionType || "opinion",
          EssayText: essayText,
          TimeTaken: timeTaken,
        });

        const result: Task2Assessment = {
          id: apiResult.id.toString(),
          essayText: apiResult.essayText,
          wordCount: apiResult.wordCount,
          timeTaken: apiResult.timeTaken,
          prompt: task2Topic.prompt,
          taskResponse: apiResult.taskResponse,
          coherenceCohesion: apiResult.coherenceCohesion,
          lexicalResource: apiResult.lexicalResource,
          grammaticalRange: apiResult.grammaticalRange,
          overallScore: apiResult.overallScore,
          generalFeedback: apiResult.generalFeedback,
          strengths: apiResult.strengths || "",
          weaknesses: apiResult.weaknesses || "",
          completedAt: new Date(apiResult.createdAt),
        };

        setTask2Result(result);

        const overallScore =
          (task1Result.overallScore + result.overallScore) / 2;

        const placementResult: PlacementTest = {
          id: placementTestId.toString(),
          userId: "user-current",
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
        setCurrentStep("task2");
      }
    },
    [placementTestId, task2Topic, task1Result]
  );

  const handleTask2SaveDraft = useCallback((essayText: string) => {
    setTask2Draft(essayText);
  }, []);

  const handleRetake = useCallback(() => {
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
          <PlacementTestIntro 
            onStart={handleStart}
            title="Bài kiểm tra thường xuyên"
            description="Đánh giá tiến độ học tập của bạn qua các chặng, giúp AI điều chỉnh lộ trình học phù hợp hơn."
          />
        </motion.div>
      )}

      {currentStep === "task1" && task1Topic && (
        <motion.div
          key="task1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Task1AssessmentEditor
            onComplete={handleTask1Complete}
            onSaveDraft={handleTask1SaveDraft}
            initialDraft={task1Draft}
          />
        </motion.div>
      )}

      {currentStep === "task2" && task2Topic && (
        <motion.div
          key="task2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Task2AssessmentEditor
            onSubmit={handleTask2Submit}
            onSaveDraft={handleTask2SaveDraft}
            initialDraft={task2Draft}
          />
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
