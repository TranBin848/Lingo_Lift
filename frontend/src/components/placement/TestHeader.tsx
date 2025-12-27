import { Clock, BookOpen } from "lucide-react";

interface TestHeaderProps {
  title: string;
  description: string;
  timeLimit?: number;
  questionCount: number;
}

export default function TestHeader({ title, description, timeLimit, questionCount }: TestHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">
            <span className="font-semibold">{questionCount}</span> câu hỏi
          </span>
        </div>
        
        {timeLimit && (
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-gray-700">
              <span className="font-semibold">{timeLimit}</span> phút
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
