import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Zap, Trophy, Clock, BookOpen, Award } from "lucide-react";

const phases = [
  {
    phase: "Giai đoạn 1",
    title: "Xây dựng nền tảng",
    bandRange: "Band 5.0 → 6.0",
    duration: "4-6 tuần",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500",
    icon: Target,
    skills: [
      "Cấu trúc ngữ pháp cơ bản",
      "Xây dựng vốn từ vựng thiết yếu",
      "Hình thành câu đơn giản",
      "Kỹ năng đọc hiểu căn bản",
    ],
    outcome: "Xây dựng nền tảng tiếng Anh vững chắc",
  },
  {
    phase: "Giai đoạn 2",
    title: "Nâng cao kỹ năng",
    bandRange: "Band 6.0 → 6.5",
    duration: "6-8 tuần",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500",
    icon: Zap,
    skills: [
      "Cấu trúc câu phức tạp",
      "Mở rộng từ vựng học thuật",
      "Luyện nói trôi chảy",
      "Chiến lược làm bài Writing",
    ],
    outcome: "Phát triển kỹ năng ngôn ngữ nâng cao",
  },
  {
    phase: "Giai đoạn 3",
    title: "Chinh phục kỳ thi",
    bandRange: "Band 6.5 → 7.0+",
    duration: "4-6 tuần",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500",
    icon: Trophy,
    skills: [
      "Chiến lược làm bài thi",
      "Kỹ năng quản lý thời gian",
      "Coherence & cohesion nâng cao",
      "Luyện đề thi thử thực tế",
    ],
    outcome: "Đạt được mục tiêu band điểm",
  },
];

const LearningPhasesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="py-24 bg-white" ref={ref} id="roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">
            Lộ trình học tập
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Hành trình đến Band 7.0+
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Lộ trình có cấu trúc đưa bạn từ trình độ hiện tại đến mục tiêu band
            điểm mong muốn
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 -translate-x-1/2 rounded-full" />

          {/* Phases */}
          <div className="space-y-12 lg:space-y-0">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative lg:flex lg:items-center ${
                    index !== phases.length - 1 ? "lg:pb-24" : ""
                  }`}
                >
                  {/* Desktop: Alternating layout */}
                  <div
                    className={`lg:w-1/2 ${
                      isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:ml-auto"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                        isEven ? "lg:ml-auto" : ""
                      } max-w-lg`}
                    >
                      {/* Phase header */}
                      <div
                        className={`flex items-center gap-4 mb-6 ${
                          isEven ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${phase.color} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className={isEven ? "lg:text-right" : ""}>
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            {phase.phase}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      {/* Band range badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${phase.color} rounded-full text-white font-semibold text-sm mb-6`}
                      >
                        <Award className="w-4 h-4" />
                        {phase.bandRange}
                      </div>

                      {/* Meta info */}
                      <div
                        className={`flex items-center gap-6 mb-6 text-gray-500 ${
                          isEven ? "lg:justify-end" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{phase.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm">
                            {phase.skills.length} kỹ năng trọng tâm
                          </span>
                        </div>
                      </div>

                      {/* Skills list */}
                      <ul
                        className={`space-y-2 mb-6 ${
                          isEven ? "lg:text-right" : ""
                        }`}
                      >
                        {phase.skills.map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className={`flex items-center gap-2 text-gray-600 ${
                              isEven ? "lg:flex-row-reverse" : ""
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 ${phase.bgColor} rounded-full`}
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>

                      {/* Outcome */}
                      <div
                        className={`pt-4 border-t border-gray-100 ${
                          isEven ? "lg:text-right" : ""
                        }`}
                      >
                        <span className="text-sm text-gray-400">Kết quả:</span>
                        <p className="text-gray-900 font-medium">
                          {phase.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot for desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-indigo-500 rounded-full z-10 shadow-lg" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningPhasesSection;
