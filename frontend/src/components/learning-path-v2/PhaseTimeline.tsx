import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  Play,
  Eye,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type {
  Phase,
  PhaseTask1Topic,
  PhaseTask2Topic,
} from "../../types/learningPathTypes";
import {
  getPhaseStatusColor,
  getPhaseStatusBg,
  getPhaseStatusLabel,
  getPrimaryFocusLabel,
} from "../../types/learningPathTypes";

interface PhaseTimelineProps {
  phases: Phase[];
  onStartTopic: (topicId: string, type: "task1" | "task2") => void;
}

export function PhaseTimeline({ phases, onStartTopic }: PhaseTimelineProps) {
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>(
    phases.find((p) => p.status === "InProgress")?.id || null
  );

  const togglePhase = (phaseId: string) => {
    setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-gray-300 dark:to-gray-700" />

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <PhaseCardItem
            key={phase.id}
            phase={phase}
            index={index}
            isExpanded={expandedPhaseId === phase.id}
            onToggle={() => togglePhase(phase.id)}
            onStartTopic={onStartTopic}
          />
        ))}
      </div>
    </div>
  );
}

interface PhaseCardItemProps {
  phase: Phase;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onStartTopic: (topicId: string, type: "task1" | "task2") => void;
}

function PhaseCardItem({
  phase,
  index,
  isExpanded,
  onToggle,
  onStartTopic,
}: PhaseCardItemProps) {
  const [activeTab, setActiveTab] = useState<"task1" | "task2">("task1");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", { day: "numeric", month: "short" });
  };

  const getTimelineIconBg = () => {
    switch (phase.status) {
      case "Completed":
        return "bg-emerald-500";
      case "InProgress":
        return "bg-indigo-500 ring-4 ring-indigo-200 dark:ring-indigo-900";
      case "Pending":
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-14"
    >
      {/* Timeline node */}
      <div
        className={`absolute left-4 w-5 h-5 rounded-full ${getTimelineIconBg()} flex items-center justify-center z-10`}
      >
        {phase.status === "Completed" && (
          <CheckCircle className="w-3 h-3 text-white" />
        )}
        {phase.status === "InProgress" && (
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      <Card
        className={`overflow-hidden border-0 shadow-lg transition-all duration-300 ${
          phase.status === "InProgress"
            ? "ring-2 ring-indigo-500 dark:ring-indigo-400"
            : ""
        } ${phase.status === "Pending" ? "opacity-70" : ""}`}
      >
        {/* Header - Always visible */}
        <button
          onClick={onToggle}
          className="w-full px-5 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                phase.status === "Completed"
                  ? "bg-emerald-500"
                  : phase.status === "InProgress"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            >
              {phase.phaseNumber}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {phase.title}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPhaseStatusBg(
                    phase.status
                  )} ${getPhaseStatusColor(phase.status)}`}
                >
                  {getPhaseStatusLabel(phase.status)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {phase.durationWeeks} tuần
                </span>
                <span>•</span>
                <span>
                  {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mục tiêu
              </div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400">
                Band {phase.expectedBandScore.toFixed(1)}
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 bg-gray-50 dark:bg-gray-900/50">
                {/* Phase Goals */}
                <div className="py-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-500" />
                    Mục tiêu Phase
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {phase.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                      🎯 Trọng tâm: {getPrimaryFocusLabel(phase.primaryFocus)}
                    </span>
                  </div>
                </div>

                {/* Topics Tabs */}
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab("task1")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "task1"
                          ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Task 1 ({phase.task1Topics.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("task2")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "task2"
                          ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Task 2 ({phase.task2Topics.length})
                    </button>
                  </div>

                  {/* Topics List */}
                  <div className="space-y-2">
                    {activeTab === "task1"
                      ? phase.task1Topics.map((topic) => (
                          <TopicItem
                            key={topic.id}
                            topic={topic}
                            type="task1"
                            onStart={() => onStartTopic(topic.topicId, "task1")}
                          />
                        ))
                      : phase.task2Topics.map((topic) => (
                          <TopicItem
                            key={topic.id}
                            topic={topic}
                            type="task2"
                            onStart={() => onStartTopic(topic.topicId, "task2")}
                          />
                        ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

interface TopicItemProps {
  topic: PhaseTask1Topic | PhaseTask2Topic;
  type: "task1" | "task2";
  onStart: () => void;
}

function TopicItem({ topic, type, onStart }: TopicItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${
        topic.isCompleted
          ? "bg-emerald-50 dark:bg-emerald-900/20"
          : "bg-white dark:bg-gray-800"
      } border border-gray-100 dark:border-gray-700`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
            topic.isCompleted
              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
              : type === "task1"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
              : "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400"
          }`}
        >
          {topic.isCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            topic.orderIndex
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${
                topic.isCompleted
                  ? "text-gray-500 dark:text-gray-400 line-through"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {topic.topicName}
            </span>
            {topic.isRecommended && !topic.isCompleted && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-medium">
                <Star className="w-3 h-3" />
                Đề xuất
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {"topicType" in topic ? topic.topicType : topic.questionType}
          </div>
        </div>
      </div>

      {!topic.isCompleted && (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Eye className="w-4 h-4 mr-1" />
            Hướng dẫn
          </Button>
          <Button
            size="sm"
            onClick={onStart}
            className={
              type === "task1"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }
          >
            <Play className="w-3.5 h-3.5 mr-1" />
            Luyện tập
          </Button>
        </div>
      )}
    </div>
  );
}
