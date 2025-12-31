import { motion } from 'framer-motion';
import { 
  Rocket, 
  BookOpen, 
  Target, 
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface RecommendationPanelProps {
  overallScore: number;
  onStartLearning: () => void;
}

export function RecommendationPanel({ overallScore, onStartLearning }: RecommendationPanelProps) {
  // Determine recommended phase based on score
  const getRecommendation = () => {
    if (overallScore >= 7.0) {
      return {
        phase: 'Phase 3 - Nâng cao',
        level: 'Cao cấp',
        description: 'Bạn đã có nền tảng vững chắc. Tập trung vào chiến lược làm bài và từ vựng học thuật.',
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        target: 'Band 7.5 - 8.5',
        duration: '2-3 tháng'
      };
    } else if (overallScore >= 5.5) {
      return {
        phase: 'Phase 2 - Trung cấp',
        level: 'Trung cấp',
        description: 'Củng cố ngữ pháp, mở rộng từ vựng và luyện viết có cấu trúc.',
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        target: 'Band 6.5 - 7.0',
        duration: '3-4 tháng'
      };
    } else {
      return {
        phase: 'Phase 1 - Cơ bản',
        level: 'Cơ bản',
        description: 'Xây dựng nền tảng ngữ pháp, từ vựng cơ bản và làm quen với format IELTS.',
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        textColor: 'text-amber-700 dark:text-amber-300',
        target: 'Band 5.5 - 6.0',
        duration: '4-6 tháng'
      };
    }
  };

  const recommendation = getRecommendation();

  const skills = [
    { icon: BookOpen, label: 'Grammar & Vocabulary', progress: Math.min(overallScore / 9 * 100, 100) },
    { icon: Target, label: 'Task Achievement', progress: Math.min((overallScore + 0.5) / 9 * 100, 100) },
    { icon: TrendingUp, label: 'Writing Structure', progress: Math.min((overallScore - 0.5) / 9 * 100, 100) }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-xl">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${recommendation.color}`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Lộ trình học đề xuất</h3>
              <p className="text-white/80">
                Dựa trên kết quả kiểm tra của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recommended Phase */}
          <div className={`p-4 rounded-xl ${recommendation.bgColor}`}>
            <div className="flex items-center gap-3 mb-2">
              <Star className={`w-5 h-5 ${recommendation.textColor}`} />
              <span className={`font-semibold ${recommendation.textColor}`}>
                {recommendation.phase}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {recommendation.description}
            </p>
          </div>

          {/* Target & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {recommendation.target}
              </div>
              <div className="text-xs text-gray-500">Mục tiêu đề xuất</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {recommendation.duration}
              </div>
              <div className="text-xs text-gray-500">Thời gian ước tính</div>
            </div>
          </div>

          {/* Skills to develop */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Kỹ năng cần phát triển
            </h4>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <skill.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">{skill.label}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${recommendation.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              onClick={onStartLearning}
              className={`w-full bg-gradient-to-r ${recommendation.color} hover:opacity-90 text-white shadow-lg py-6 text-lg rounded-xl`}
            >
              Bắt đầu lộ trình học cá nhân hóa
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
