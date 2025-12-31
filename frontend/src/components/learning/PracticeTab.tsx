import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  ClipboardCheck, 
  FileText, 
  Target, 
  Clock, 
  Play, 
  Sparkles, 
  TrendingUp, 
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  History,
  Brain,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

interface TestCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  testCount: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  completedCount?: number;
}

function TestCategoryCard({ 
  icon, 
  title, 
  description, 
  testCount, 
  color, 
  gradientFrom, 
  gradientTo,
  completedCount = 0 
}: TestCategoryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative p-6 overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
        {/* Gradient glow on hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.05 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />

        <div className="relative flex items-start gap-4">
          <motion.div 
            className={`p-4 rounded-xl ${color} shadow-lg`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">{completedCount}/{testCount} hoàn thành</span>
                  <span className="font-medium text-blue-600">{Math.round((completedCount/testCount)*100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedCount/testCount)*100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {testCount} bài test
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm" className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:opacity-90 text-white shadow-md`}>
                  <Play className="w-4 h-4 mr-1" />
                  Luyện tập
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Recent Practice Item Component
function RecentPracticeItem({ 
  title, 
  score, 
  date, 
  type 
}: { 
  title: string; 
  score: number; 
  date: string; 
  type: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        {type === 'task1' ? (
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        ) : (
          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      </div>
      <div className="text-right">
        <p className={`font-bold ${score >= 7 ? 'text-green-600' : score >= 5.5 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score.toFixed(1)}
        </p>
        <p className="text-xs text-gray-500">Band</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
    </motion.div>
  );
}

export function PracticeTab() {
  const testCategories = [
    {
      id: 1,
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: 'IELTS Writing Task 1',
      description: 'Luyện tập mô tả biểu đồ, bảng số liệu, quy trình',
      testCount: 50,
      completedCount: 12,
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 2,
      icon: <FileText className="w-6 h-6 text-white" />,
      title: 'IELTS Writing Task 2',
      description: 'Luyện tập viết luận, phát triển ý tưởng',
      testCount: 60,
      completedCount: 8,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 3,
      icon: <Target className="w-6 h-6 text-white" />,
      title: 'Full Mock Tests',
      description: 'Bài test mô phỏng đầy đủ như kỳ thi thật',
      testCount: 20,
      completedCount: 3,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-600',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6 text-white" />,
      title: 'Timed Practice',
      description: 'Luyện tập theo thời gian, tăng tốc độ viết',
      testCount: 30,
      completedCount: 5,
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-amber-600',
      color: 'bg-gradient-to-br from-orange-500 to-amber-600',
    },
  ];

  // Mock recent practice data
  const recentPractice = [
    { id: 1, title: 'Task 1: Line Graph - Population Growth', score: 6.5, date: '2 giờ trước', type: 'task1' },
    { id: 2, title: 'Task 2: Education - Online Learning', score: 7.0, date: 'Hôm qua', type: 'task2' },
    { id: 3, title: 'Task 1: Bar Chart - Energy Sources', score: 6.0, date: '2 ngày trước', type: 'task1' },
  ];

  // Mock stats
  const stats = {
    totalCompleted: 28,
    averageScore: 6.8,
    accuracy: 85,
    practiceHours: 24,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section - Daily Practice */}
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 text-yellow-300" />
              </motion.div>
              <span className="text-sm font-medium text-purple-100">Luyện tập hôm nay</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl lg:text-4xl font-bold mb-3"
            >
              Sẵn sàng luyện tập? 🎯
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-purple-100 text-lg max-w-lg mb-6"
            >
              AI đề xuất bạn nên luyện tập <span className="font-semibold text-white">Task 2: Opinion Essay</span> để cải thiện kỹ năng phát triển ý tưởng.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl shadow-purple-900/30">
                  <Brain className="w-4 h-4 mr-2" />
                  Bắt đầu ngay
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Đề xuất khác
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Streak card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[180px]"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-3"
              >
                <Flame className="w-8 h-8 text-orange-300" />
              </motion.div>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-purple-200">ngày liên tiếp 🔥</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: 'Bài đã làm', value: stats.totalCompleted, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
          { icon: TrendingUp, label: 'Điểm trung bình', value: stats.averageScore.toFixed(1), color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
          { icon: Target, label: 'Độ chính xác', value: `${stats.accuracy}%`, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
          { icon: Clock, label: 'Giờ luyện tập', value: `${stats.practiceHours}h`, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Categories - 2 columns */}
        <motion.div variants={cardVariants} className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Các dạng bài luyện tập
            </h2>
          </div>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {testCategories.map((category) => (
              <TestCategoryCard key={category.id} {...category} />
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Practice History - 1 column */}
        <motion.div variants={cardVariants}>
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <History className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Lịch sử luyện tập
              </h3>
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {recentPractice.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <RecentPracticeItem {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Button 
                variant="outline" 
                className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Xem tất cả lịch sử
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* Coming Soon Banner */}
      <motion.div variants={cardVariants}>
        <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-amber-800/50">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 dark:bg-amber-700/20 rounded-full blur-2xl" />
          
          <div className="relative flex items-center gap-6">
            <motion.div 
              className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                Tính năng mới sắp ra mắt
                <span className="px-2 py-0.5 text-xs font-medium bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full">
                  Coming Soon
                </span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                AI Writing Coach, Speaking Practice, và nhiều tính năng thú vị khác đang được phát triển. Hãy chờ đón nhé!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
