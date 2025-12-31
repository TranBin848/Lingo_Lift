import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mic,
  PenTool,
  GitBranch,
  Calendar,
  TrendingUp,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Chấm điểm Speaking bằng AI",
    description:
      "Nhận band điểm chính xác cùng tips chi tiết về phát âm, độ trôi chảy và cách dùng từ vựng.",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
  },
  {
    icon: PenTool,
    title: "Chấm bài Writing tự động",
    description:
      "Feedback ngay lập tức cho Task 1 & 2 với ước tính band, sửa lỗi ngữ pháp và phân tích coherence.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: GitBranch,
    title: "Lộ trình học theo giai đoạn",
    description:
      "Chương trình học được thiết kế riêng dựa trên trình độ hiện tại và mục tiêu band điểm của bạn.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
  },
  {
    icon: Calendar,
    title: "Đề thi thử IELTS hàng ngày",
    description:
      "Luyện tập với các câu hỏi chuẩn IELTS mỗi ngày để xây dựng thói quen và sự tự tin.",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến độ chi tiết",
    description:
      "Trực quan hóa hành trình cải thiện với biểu đồ phân tích và thống kê hiệu suất.",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: Bell,
    title: "Nhắc nhở & chuỗi ngày học",
    description:
      "Duy trì động lực với thông báo nhắc học và theo dõi streak để giữ vững thói quen.",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-50 to-blue-50",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      ref={ref}
      id="features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Tính năng nổi bật
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Mọi thứ bạn cần để thành công
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bộ công cụ AI mạnh mẽ được thiết kế đặc biệt cho việc luyện thi IELTS
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-300"
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
