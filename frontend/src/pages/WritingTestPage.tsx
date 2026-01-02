import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import Task1Section from "../components/placement/Task1Section";
import Task2Section from "../components/placement/Task2Section";
import { startPlacementTest, submitTask1, submitTask2 } from "../api/placementTest";
import type { StartTestResponse, Task1Result, Task2Result } from "../api/placementTest";
import { getRandomTask1Topic } from "../services/task1Topic.service";
import { getRandomTask2Topic } from "../services/task2Topic.service";
import type { Task1Topic } from "../types/task1-topic";
import type { Task2Topic } from "../types/task2-topic";

type TestStage = 'start' | 'task1' | 'task2' | 'results';

export default function WritingTestPage() {
  const navigate = useNavigate();
  
  const [stage, setStage] = useState<TestStage>('start');
  const [loading, setLoading] = useState(false);
  const [testSession, setTestSession] = useState<StartTestResponse | null>(null);
  const [task1Result, setTask1Result] = useState<Task1Result | null>(null);
  const [task2Result, setTask2Result] = useState<Task2Result | null>(null);
  
  // Random topics from API
  const [task1Topic, setTask1Topic] = useState<Task1Topic | null>(null);
  const [task2Topic, setTask2Topic] = useState<Task2Topic | null>(null);
  const [topicsLoading, setTopicsLoading] = useState(false);

  // Fetch random topics when test starts
  useEffect(() => {
    if (stage === 'task1' && !task1Topic) {
      fetchTask1Topic();
    }
    if (stage === 'task2' && !task2Topic) {
      fetchTask2Topic();
    }
  }, [stage]);

  const fetchTask1Topic = async () => {
    try {
      setTopicsLoading(true);
      const topic = await getRandomTask1Topic();
      setTask1Topic(topic);
    } catch (error) {
      console.error('Error fetching Task 1 topic:', error);
      toast.error('Không thể tải đề Task 1. Vui lòng thử lại.');
    } finally {
      setTopicsLoading(false);
    }
  };

  const fetchTask2Topic = async () => {
    try {
      setTopicsLoading(true);
      const topic = await getRandomTask2Topic();
      setTask2Topic(topic);
    } catch (error) {
      console.error('Error fetching Task 2 topic:', error);
      toast.error('Không thể tải đề Task 2. Vui lòng thử lại.');
    } finally {
      setTopicsLoading(false);
    }
  };

  const handleStartTest = async () => {
    try {
      setLoading(true);
      const response = await startPlacementTest({ testType: 'Placement' });
      setTestSession(response);
      setStage('task1');
      toast.success("Bài kiểm tra đã bắt đầu!");
    } catch (error) {
      console.error("Error starting test:", error);
      toast.error("Không thể bắt đầu bài kiểm tra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleTask1Complete = async (essayText: string, timeTaken: number) => {
    if (!testSession || !task1Topic) return;

    try {
      setLoading(true);
      const result = await submitTask1(testSession.id, {
        taskType: task1Topic.task_type || 'Academic',
        prompt: task1Topic.description || '',
        imageUrl: task1Topic.image_url || '',
        essayText,
        timeTaken,
      });
      
      setTask1Result(result);
      setStage('task2');
      toast.success("Task 1 đã được nộp thành công!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting task 1:", error);
      toast.error("Không thể nộp bài. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleTask2Complete = async (essayText: string, timeTaken: number) => {
    if (!testSession || !task2Topic) return;

    try {
      setLoading(true);
      const result = await submitTask2(testSession.id, {
        prompt: task2Topic.question || '',
        questionType: task2Topic.question_type || 'Opinion',
        essayText,
        timeTaken,
      });
      
      setTask2Result(result);
      setStage('results');
      toast.success("Hoàn thành bài kiểm tra!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting task 2:", error);
      toast.error("Không thể nộp bài. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Start Screen
  if (stage === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate("/placement-tests")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại danh sách</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">IELTS Writing Test</h1>
              <p className="text-blue-100 text-lg">
                Bài kiểm tra gồm 2 Task với tổng thời gian 60 phút
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Task 1</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Writing</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Mô tả biểu đồ/bảng/đồ thị</li>
                    <li>• Tối thiểu 150 từ</li>
                    <li>• Thời gian: 20 phút</li>
                    <li>• Chiếm 33% điểm số</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Task 2</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Essay Writing</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Thảo luận quan điểm</li>
                    <li>• Tối thiểu 250 từ</li>
                    <li>• Thời gian: 40 phút</li>
                    <li>• Chiếm 67% điểm số</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-yellow-900 mb-3">📌 Lưu ý quan trọng:</h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>✓ Làm đầy đủ cả 2 Task để nhận kết quả</li>
                  <li>✓ Không thể quay lại Task trước sau khi nộp</li>
                  <li>✓ Bài viết sẽ được AI chấm điểm tự động</li>
                  <li>✓ Kết quả bao gồm điểm chi tiết và nhận xét</li>
                </ul>
              </div>

              <button
                onClick={handleStartTest}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang chuẩn bị...
                  </span>
                ) : (
                  "Bắt đầu làm bài"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Task 1
  if (stage === 'task1') {
    if (topicsLoading || !task1Topic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Đang tải đề bài Task 1...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Task1Section
            question={{
              taskType: task1Topic.task_type || 'Academic',
              prompt: task1Topic.description || '',
              imageUrl: task1Topic.image_url || '',
              minWords: 150,
              timeLimit: 1200, // 20 minutes
            }}
            onComplete={handleTask1Complete}
          />
        </div>
      </div>
    );
  }

  // Task 2
  if (stage === 'task2') {
    if (topicsLoading || !task2Topic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">Đang tải đề bài Task 2...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Task2Section
            question={{
              prompt: task2Topic.question || '',
              questionType: 'DiscussionEssay' as const,
              minWords: 250,
              timeLimit: 2400, // 40 minutes
            }}
            onComplete={handleTask2Complete}
          />
        </div>
      </div>
    );
  }

  // Results
  if (stage === 'results' && task1Result && task2Result) {
    const overallScore = ((task1Result.overallScore + task2Result.overallScore * 2) / 3).toFixed(1);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 text-white text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                <Trophy className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Hoàn thành bài kiểm tra!</h1>
              <p className="text-green-100 text-lg">Kết quả chi tiết của bạn</p>
            </div>

            {/* Overall Score */}
            <div className="p-8 border-b border-gray-200">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {overallScore}
                </div>
                <div className="text-gray-600 text-lg">Overall Band Score</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {task1Result.overallScore}
                  </div>
                  <div className="text-gray-700 font-medium">Task 1 Score</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {task2Result.overallScore}
                  </div>
                  <div className="text-gray-700 font-medium">Task 2 Score</div>
                </div>
              </div>
            </div>

            {/* Task 1 Details */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Task 1 - Chi tiết điểm</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <ScoreCard label="Task Achievement" score={task1Result.taskAchievement} />
                <ScoreCard label="Coherence & Cohesion" score={task1Result.coherenceCohesion} />
                <ScoreCard label="Lexical Resource" score={task1Result.lexicalResource} />
                <ScoreCard label="Grammatical Range" score={task1Result.grammaticalRange} />
              </div>

              <FeedbackSection
                feedback={task1Result.generalFeedback}
                strengths={task1Result.strengths}
                weaknesses={task1Result.weaknesses}
              />
            </div>

            {/* Task 2 Details */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ Task 2 - Chi tiết điểm</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <ScoreCard label="Task Response" score={task2Result.taskResponse} />
                <ScoreCard label="Coherence & Cohesion" score={task2Result.coherenceCohesion} />
                <ScoreCard label="Lexical Resource" score={task2Result.lexicalResource} />
                <ScoreCard label="Grammatical Range" score={task2Result.grammaticalRange} />
              </div>

              <FeedbackSection
                feedback={task2Result.generalFeedback}
                strengths={task2Result.strengths}
                weaknesses={task2Result.weaknesses}
              />
            </div>

            {/* Actions */}
            <div className="p-8 flex gap-4 justify-center">
              <button
                onClick={() => navigate("/placement-tests")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Quay về danh sách
              </button>
              <button
                onClick={() => {
                  setStage('start');
                  setTestSession(null);
                  setTask1Result(null);
                  setTask2Result(null);
                }}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Làm lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Helper Components
function ScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200">
      <div className="flex items-center justify-center gap-1 mb-2">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="text-2xl font-bold text-gray-900">{score}</span>
      </div>
      <div className="text-xs text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function FeedbackSection({ feedback, strengths, weaknesses }: { 
  feedback: string; 
  strengths: string; 
  weaknesses: string; 
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💬 Nhận xét chung:</h3>
        <p className="text-sm text-blue-800">{feedback}</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">✅ Điểm mạnh:</h3>
        <p className="text-sm text-green-800">{strengths}</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-900 mb-2">⚠️ Cần cải thiện:</h3>
        <p className="text-sm text-orange-800">{weaknesses}</p>
      </div>
    </div>
  );
}
