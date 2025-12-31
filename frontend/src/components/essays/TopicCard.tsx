import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Target, 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  PieChart,
  Table,
  Map,
  RefreshCw,
  Shuffle,
  Mail,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Scale
} from 'lucide-react';
import type { 
  Task1Topic, 
  Task2Topic,
  ChartType,
  QuestionType
} from '../../types/essay';
import {
  task1TypeLabels,
  task1TypeColors,
  chartTypeLabels,
  questionTypeLabels,
  topicDifficultyLabels,
  topicDifficultyColors,
  topicFrequencyLabels,
  topicFrequencyColors,
  topicCategoryLabels
} from '../../types/essay';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      delay: index * 0.08,
    },
  }),
};

// Chart type icon component
function ChartTypeIcon({ type, className = '' }: { type: ChartType; className?: string }) {
  const iconClass = `${className}`;
  
  switch (type) {
    case 'bar':
      return <BarChart3 className={iconClass} />;
    case 'line':
      return <TrendingUp className={iconClass} />;
    case 'pie':
      return <PieChart className={iconClass} />;
    case 'table':
      return <Table className={iconClass} />;
    case 'map':
      return <Map className={iconClass} />;
    case 'process':
      return <RefreshCw className={iconClass} />;
    case 'mixed':
      return <Shuffle className={iconClass} />;
    case 'letter':
      return <Mail className={iconClass} />;
    default:
      return <BarChart3 className={iconClass} />;
  }
}

// Question type icon component
function QuestionTypeIcon({ type, className = '' }: { type: QuestionType; className?: string }) {
  const iconClass = `${className}`;
  
  switch (type) {
    case 'opinion':
      return <MessageSquare className={iconClass} />;
    case 'discussion':
      return <Scale className={iconClass} />;
    case 'problem_solution':
      return <Lightbulb className={iconClass} />;
    case 'advantages_disadvantages':
      return <Scale className={iconClass} />;
    case 'two_part':
      return <HelpCircle className={iconClass} />;
    case 'direct_question':
      return <HelpCircle className={iconClass} />;
    default:
      return <MessageSquare className={iconClass} />;
  }
}

// Task 1 Topic Card
interface Task1TopicCardProps {
  topic: Task1Topic;
  index: number;
  onSelect: (topic: Task1Topic) => void;
}

export function Task1TopicCard({ topic, index, onSelect }: Task1TopicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const typeColor = task1TypeColors[topic.taskType];
  const difficultyColor = topicDifficultyColors[topic.difficulty];
  const frequencyColor = topicFrequencyColors[topic.frequency];

  // Shorten prompt for card display
  const shortPrompt = topic.prompt.length > 120 
    ? topic.prompt.substring(0, 120) + '...' 
    : topic.prompt;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card 
          className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => onSelect(topic)}
        >
          {/* Top gradient accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${typeColor.gradient}`} />

          {/* Hover glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${typeColor.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 0.03 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative p-5">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Task Type badge */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                {task1TypeLabels[topic.taskType]}
              </span>
              
              {/* Chart Type badge */}
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <ChartTypeIcon type={topic.chartType} className="w-3.5 h-3.5" />
                {chartTypeLabels[topic.chartType]}
              </span>

              {/* Frequency badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${frequencyColor.bg} ${frequencyColor.text}`}>
                {topicFrequencyLabels[topic.frequency]}
              </span>
            </div>

            {/* Prompt */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
              {shortPrompt}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${difficultyColor.bg} ${difficultyColor.text}`}>
                {topicDifficultyLabels[topic.difficulty]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {topicCategoryLabels[topic.category]}
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                <Target className="w-3 h-3" />
                Band {topic.estimatedBandLevel}+
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-1 flex-wrap">
                {topic.keywords.slice(0, 3).map((keyword, i) => (
                  <span key={i} className="text-xs text-gray-400 dark:text-gray-500">
                    #{keyword}
                  </span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0.8, x: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="sm" 
                  className={`bg-gradient-to-r ${typeColor.gradient} hover:opacity-90 text-white shadow-md`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(topic);
                  }}
                >
                  Chọn đề này
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Task 2 Topic Card
interface Task2TopicCardProps {
  topic: Task2Topic;
  index: number;
  onSelect: (topic: Task2Topic) => void;
}

export function Task2TopicCard({ topic, index, onSelect }: Task2TopicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const difficultyColor = topicDifficultyColors[topic.difficulty];
  const frequencyColor = topicFrequencyColors[topic.frequency];

  // Shorten prompt for card display
  const shortPrompt = topic.prompt.length > 150 
    ? topic.prompt.substring(0, 150) + '...' 
    : topic.prompt;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card 
          className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => onSelect(topic)}
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600" />

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0"
            animate={{ opacity: isHovered ? 0.03 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative p-5">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Question Type badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                <QuestionTypeIcon type={topic.questionType} className="w-3.5 h-3.5" />
                {questionTypeLabels[topic.questionType]}
              </span>

              {/* Frequency badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${frequencyColor.bg} ${frequencyColor.text}`}>
                {topicFrequencyLabels[topic.frequency]}
              </span>
            </div>

            {/* Prompt */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-4 leading-relaxed">
              {shortPrompt}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${difficultyColor.bg} ${difficultyColor.text}`}>
                {topicDifficultyLabels[topic.difficulty]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {topicCategoryLabels[topic.category]}
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                <Target className="w-3 h-3" />
                Band {topic.estimatedBandLevel}+
              </div>
            </div>

            {/* Keywords */}
            <div className="flex gap-2 flex-wrap mb-4">
              {topic.keywords.slice(0, 4).map((keyword, i) => (
                <span 
                  key={i} 
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-gray-100 dark:border-gray-700">
              <motion.div
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0.8, x: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 text-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(topic);
                  }}
                >
                  Chọn đề này
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
