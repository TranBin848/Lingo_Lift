import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Clock,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  FileEdit,
  Target,
  Sparkles,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateLearningPathModal } from "./CreateLearningPathModal";

interface PlacementTestIntroProps {
  onStart: () => void;
}

export function PlacementTestIntro({ onStart }: PlacementTestIntroProps) {
  const navigate = useNavigate();

  // ===== PREVIEW MODAL - DELETE THIS SECTION LATER =====
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const handlePreviewSubmit = (targetBandScore: number, targetDate: string) => {
    console.log("Preview - Target Band Score:", targetBandScore);
    console.log("Preview - Target Date:", targetDate);
    setShowPreviewModal(false);
    alert(`Preview: Target ${targetBandScore}, Date ${targetDate}`);
  };
  // ===== END PREVIEW SECTION =====

  const features = [
    {
      icon: FileEdit,
      title: "Gồm 2 phần",
      description: "Task 1 & Task 2",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Clock,
      title: "Thời gian ước tính",
      description: "60 phút",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: RefreshCw,
      title: "Không giới hạn",
      description: "Số lần làm lại",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center justify-between"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/learning-path")}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Learning Path
          </Button>

          {/* ===== PREVIEW BUTTON - DELETE THIS LATER ===== */}
          {/* <Button
            variant="outline"
            onClick={() => setShowPreviewModal(true)}
            className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900/20"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Modal (Dev Only)
          </Button> */}
          {/* ===== END PREVIEW BUTTON ===== */}
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-6"
          >
            <ClipboardCheck className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Bài kiểm tra đầu vào
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              IELTS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
          >
            Bài kiểm tra này giúp AI đánh giá chính xác trình độ Writing hiện
            tại của bạn, từ đó xây dựng lộ trình học cá nhân hóa phù hợp nhất.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="p-6 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} shadow-md mb-1`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Test Structure Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-white dark:bg-gray-800 border-0 shadow-lg mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Cấu trúc bài kiểm tra
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-base mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Task 1 - Mô tả biểu đồ
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Viết ít nhất 150 từ mô tả và phân tích thông tin từ biểu đồ
                    hoặc hình ảnh. Thời gian khuyến nghị: 20 phút.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-base mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Task 2 - Bài luận
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Viết ít nhất 250 từ trình bày quan điểm về một chủ đề. Thời
                    gian khuyến nghị: 40 phút.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Badge & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
              Chấm điểm bằng AI thông minh
            </span>
          </div>

          <div>
            <Button
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/30 px-8 py-6 text-lg rounded-xl"
            >
              Bắt đầu làm bài
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Bạn có thể tạm dừng và tiếp tục bất cứ lúc nào
            </p>
          </div>
        </motion.div>

        {/* ===== PREVIEW MODAL - DELETE THIS SECTION LATER ===== */}
        <CreateLearningPathModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          onSubmit={handlePreviewSubmit}
          currentBandScore={6.5}
          isLoading={false}
        />
        {/* ===== END PREVIEW SECTION ===== */}
      </motion.div>
    </div>
  );
}
