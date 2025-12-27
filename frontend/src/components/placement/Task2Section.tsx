import { useState, useEffect } from "react";
import { Clock, AlertCircle, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

interface Task2Question {
  prompt: string;
  questionType: 'OpinionEssay' | 'DiscussionEssay' | 'ProblemSolutionEssay' | 'AdvantageDisadvantageEssay';
  minWords: number;
  timeLimit: number; // in seconds
}

interface Task2SectionProps {
  question: Task2Question;
  onComplete: (essayText: string, timeTaken: number) => void;
  onBack?: () => void;
}

export default function Task2Section({ question, onComplete, onBack }: Task2SectionProps) {
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
    if (wordCount >= question.minWords && wordCount <= question.minWords + 100) return "text-green-600";
    return "text-blue-600";
  };

  const getQuestionTypeLabel = () => {
    switch (question.questionType) {
      case 'OpinionEssay': return 'Bài luận quan điểm';
      case 'DiscussionEssay': return 'Bài luận thảo luận';
      case 'ProblemSolutionEssay': return 'Bài luận vấn đề - giải pháp';
      case 'AdvantageDisadvantageEssay': return 'Bài luận ưu - nhược điểm';
      default: return 'Bài luận';
    }
  };

  const getTips = () => {
    switch (question.questionType) {
      case 'OpinionEssay':
        return [
          '✓ Nêu rõ quan điểm của bạn ngay trong phần mở bài',
          '✓ Đưa ra 2-3 lý do hỗ trợ quan điểm',
          '✓ Cung cấp ví dụ cụ thể cho mỗi lý do',
          '✓ Kết luận khẳng định lại quan điểm'
        ];
      case 'DiscussionEssay':
        return [
          '✓ Thảo luận cả hai quan điểm một cách công bằng',
          '✓ Đưa ra quan điểm cá nhân (thường ở phần kết)',
          '✓ Cân bằng số lượng ý tưởng cho mỗi quan điểm',
          '✓ Sử dụng từ nối để chuyển tiếp giữa các quan điểm'
        ];
      case 'ProblemSolutionEssay':
        return [
          '✓ Phân tích rõ các vấn đề trong một đoạn',
          '✓ Đề xuất giải pháp khả thi trong đoạn tiếp theo',
          '✓ Giải thích tại sao giải pháp đó hiệu quả',
          '✓ Có thể kết hợp nhiều giải pháp'
        ];
      case 'AdvantageDisadvantageEssay':
        return [
          '✓ Liệt kê các ưu điểm với ví dụ',
          '✓ Phân tích các nhược điểm một cách khách quan',
          '✓ So sánh mức độ quan trọng của ưu/nhược điểm',
          '✓ Đưa ra kết luận dựa trên phân tích'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Timer and Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timeRemaining < 600 ? "text-red-600" : "text-blue-600"}`} />
              <span className="font-medium text-gray-700">Thời gian còn lại:</span>
            </div>
            <span className={`text-2xl font-bold ${timeRemaining < 600 ? "text-red-600" : "text-blue-600"}`}>
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              IELTS Writing Task 2 - {getQuestionTypeLabel()}
            </h2>
            <p className="text-purple-50">
              Bạn nên dành khoảng 40 phút cho nhiệm vụ này. Viết ít nhất {question.minWords} từ.
            </p>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Đề bài:</h3>
        <p className="text-gray-700 leading-relaxed text-base">{question.prompt}</p>
        
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800 font-medium">
            Hãy đưa ra những lý do cho câu trả lời của bạn và bao gồm bất kỳ ví dụ liên quan nào từ kiến thức hoặc kinh nghiệm của riêng bạn.
          </p>
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
          placeholder="Bắt đầu viết bài luận của bạn tại đây..."
          className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
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
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-purple-900 mb-2">
          💡 Lưu ý khi viết {getQuestionTypeLabel()}:
        </h4>
        <ul className="space-y-1 text-sm text-purple-800">
          {getTips().map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
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
            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang nộp bài...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Nộp Task 2 & Hoàn thành
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
