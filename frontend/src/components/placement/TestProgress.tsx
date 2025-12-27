interface TestProgressProps {
  current: number;
  total: number;
  label?: string;
}

export default function TestProgress({ current, total, label = "Tiến độ" }: TestProgressProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-blue-600">
          {current}/{total}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-1 text-right">
        <span className="text-xs text-gray-500">{percentage}% hoàn thành</span>
      </div>
    </div>
  );
}
