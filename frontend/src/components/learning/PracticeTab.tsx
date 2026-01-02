import { BookOpen, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LessonsPage } from "../lessons";
import { EssaysPage } from "../essays";

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

export function PracticeTab() {
  const [activeTab, setActiveTab] = useState<"essays" | "lessons">("lessons");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Tab Navigation */}
      <motion.div
        variants={cardVariants}
        className="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit"
      >
        <button
          onClick={() => setActiveTab("lessons")}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
            ${
              activeTab === "lessons"
                ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }
          `}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bài học</span>
        </button>
        <button
          onClick={() => setActiveTab("essays")}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
            ${
              activeTab === "essays"
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }
          `}
        >
          <PenTool className="w-4 h-4" />
          <span>Luyện viết</span>
        </button>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "lessons" ? (
          <motion.div
            key="lessons"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <LessonsPage />
          </motion.div>
        ) : (
          <motion.div
            key="essays"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EssaysPage />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
