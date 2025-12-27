import { useState, useEffect } from "react";
import { Clock, AlertCircle, CheckCircle, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Task1Question {
  taskType: string;
  prompt: string;
  imageUrl: string;
  minWords: number;
  timeLimit: number; // in seconds
}

interface Task1SectionProps {
  question: Task1Question;
  onComplete: (essayText: string, timeTaken: number) => void;
  onBack?: () => void;
}

export default function Task1Section({ question, onComplete, onBack }: Task1SectionProps) {
  const [essayText, setEssayText] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = essayText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const timeRemaining = question.timeLimit - timeElapsed;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= question.timeLimit) {
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question.timeLimit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (wordCount < question.minWords) {
      setShowWarning(true);
      return;
    }

    if (timeElapsed >= question.timeLimit) {
      if (!confirm("Đã hết thời gian! Bạn có chắc muốn nộp bài?")) {
        return;
      }
    }

    setIsSubmitting(true);
    await onComplete(essayText, timeElapsed);
    setIsSubmitting(false);
  };

  const getWordCountColor = () => {
    if (wordCount < question.minWords) return "text-red-600";
    if (wordCount >= question.minWords && wordCount <= question.minWords + 50) return "text-green-600";
    return "text-blue-600";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Timer and Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timeRemaining < 300 ? "text-red-600" : "text-blue-600"}`} />
              <span className="font-medium text-gray-700">Thời gian còn lại:</span>
            </div>
            <span className={`text-2xl font-bold ${timeRemaining < 300 ? "text-red-600" : "text-blue-600"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Số từ:</span>
            <span className={`text-2xl font-bold ${getWordCountColor()}`}>
              {wordCount} / {question.minWords}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                wordCount >= question.minWords ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min((wordCount / question.minWords) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">IELTS Writing Task 1 - {question.taskType}</h2>
            <p className="text-blue-50">
              Bạn nên dành khoảng 20 phút cho nhiệm vụ này. Viết ít nhất {question.minWords} từ.
            </p>
          </div>
        </div>
      </div>

      {/* Question and Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Prompt */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Đề bài:</h3>
          <p className="text-gray-700 leading-relaxed">{question.prompt}</p>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              Hãy tóm tắt thông tin bằng cách chọn và báo cáo các đặc điểm chính, 
              đồng thời thực hiện so sánh khi có liên quan.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Biểu đồ/Bảng:</h3>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {question.imageUrl ? (
              <img 
                src={question.imageUrl} 
                alt="Chart/Graph/Table" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Biểu đồ sẽ được hiển thị ở đây</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Essay Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ✍️ Bài viết của bạn:
        </label>
        <textarea
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            setShowWarning(false);
          }}
          placeholder="Bắt đầu viết bài của bạn tại đây..."
          className="w-full h-80 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />

        {showWarning && (
          <div className="flex items-center gap-2 mt-3 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Bạn cần viết thêm {question.minWords - wordCount} từ để đạt yêu cầu tối thiểu
            </span>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Lưu ý khi viết Task 1:</h4>
        <ul className="space-y-1 text-sm text-yellow-800">
          <li>✓ Viết phần mở bài paraphrase lại đề bài</li>
          <li>✓ Tổng quan (overview) các xu hướng chính</li>
          <li>✓ Mô tả chi tiết với số liệu cụ thể</li>
          <li>✓ So sánh và đối chiếu các thông tin</li>
          <li>✓ KHÔNG đưa ra ý kiến cá nhân</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="px-6"
          >
            ← Quay lại
          </Button>
        )}

        <div className="flex gap-3 ml-auto">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || wordCount === 0}
            className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang nộp bài...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Nộp Task 1
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
