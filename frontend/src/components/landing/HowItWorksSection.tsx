import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCheck,
  BarChart3,
  Map,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Bài test đầu vào AI",
    description:
      "Làm bài test IELTS Speaking & Writing. AI đánh giá và ước tính band điểm hiện tại của bạn một cách chính xác.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Phân tích điểm số chi tiết",
    description:
      "AI chỉ ra điểm mạnh, điểm yếu với feedback chi tiết. Phân tích rõ ràng về Fluency, Grammar, Vocabulary và Coherence.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Map,
    title: "Lộ trình học cá nhân hóa",
    description:
      "AI tạo lộ trình học tập chia theo từng giai đoạn. Mỗi giai đoạn có thời gian và mục tiêu band điểm cụ thể.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: MessageSquare,
    title: "Luyện tập hàng ngày với AI",
    description:
      "Luyện tập với các bài test IELTS mini mỗi ngày. AI cho feedback ngay lập tức và gợi ý cách cải thiện.",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="py-24 bg-white" ref={ref} id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Cách thức hoạt động
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Hành trình chinh phục IELTS của bạn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            4 bước đơn giản để nâng cao trình độ IELTS với công nghệ AI cá nhân
            hóa
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
                )}

                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
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

export default HowItWorksSection;
