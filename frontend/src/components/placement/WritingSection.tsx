import { useState, useEffect } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface WritingQuestion {
  id: number;
  type: "essay" | "paragraph" | "sentence";
  prompt: string;
  minWords?: number;
  maxWords?: number;
  timeLimit?: number;
}

interface WritingSectionProps {
  questions: WritingQuestion[];
  onComplete: (answers: Record<number, string>) => void;
  onTimeUp?: () => void;
}

export default function WritingSection({ questions, onComplete, onTimeUp }: WritingSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || "";
  const wordCount = currentAnswer.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Timer
  useEffect(() => {
    if (currentQuestion.timeLimit) {
      setTimeRemaining(currentQuestion.timeLimit * 60); // Convert to seconds
    } else {
      setTimeRemaining(null);
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setShowWarning(false);
  };

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      setShowWarning(true);
      return;
    }

    if (currentQuestion.minWords && wordCount < currentQuestion.minWords) {
      setShowWarning(true);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowWarning(false);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowWarning(false);
    }
  };

  const handleSubmit = () => {
    // Check all answers are provided
    const unanswered = questions.filter(q => !answers[q.id]?.trim());
    if (unanswered.length > 0) {
      if (!confirm(`Bạn còn ${unanswered.length} câu chưa trả lời. Bạn có chắc muốn nộp bài?`)) {
        return;
      }
    }
    onComplete(answers);
  };

  const getWordCountColor = () => {
    if (!currentQuestion.minWords) return "text-gray-600";
    if (wordCount < currentQuestion.minWords) return "text-red-600";
    if (currentQuestion.maxWords && wordCount > currentQuestion.maxWords) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Timer */}
      {timeRemaining !== null && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timeRemaining < 60 ? "text-red-600" : "text-blue-600"}`} />
              <span className="font-medium text-gray-700">Thời gian còn lại:</span>
            </div>
            <span className={`text-2xl font-bold ${timeRemaining < 60 ? "text-red-600" : "text-blue-600"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      )}

      {/* Question Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Câu hỏi {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {currentQuestion.type === "essay" && "Bài luận"}
            {currentQuestion.type === "paragraph" && "Đoạn văn"}
            {currentQuestion.type === "sentence" && "Câu văn"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Đề bài:</h3>
          <p className="text-gray-700 leading-relaxed">{currentQuestion.prompt}</p>
          
          {(currentQuestion.minWords || currentQuestion.maxWords) && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                {currentQuestion.minWords && `Tối thiểu ${currentQuestion.minWords} từ`}
                {currentQuestion.minWords && currentQuestion.maxWords && " - "}
                {currentQuestion.maxWords && `Tối đa ${currentQuestion.maxWords} từ`}
              </p>
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Câu trả lời của bạn:
          </label>
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Nhập câu trả lời của bạn tại đây..."
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{ fontFamily: "inherit" }}
          />
        </div>

        {/* Word Count */}
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium ${getWordCountColor()}`}>
            Số từ: {wordCount}
            {currentQuestion.minWords && ` / ${currentQuestion.minWords}`}
          </div>
          
          {showWarning && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">
                {!currentAnswer.trim() 
                  ? "Vui lòng nhập câu trả lời"
                  : `Cần thêm ${(currentQuestion.minWords || 0) - wordCount} từ`
                }
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
          className="px-6"
        >
          ← Câu trước
        </Button>

        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-10 h-10 rounded-full font-medium transition-all ${
                idx === currentQuestionIndex
                  ? "bg-blue-600 text-white"
                  : answers[questions[idx].id]
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            className="px-6 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Nộp bài
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="px-6"
          >
            Câu tiếp theo →
          </Button>
        )}
      </div>
    </div>
  );
}
