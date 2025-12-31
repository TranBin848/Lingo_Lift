import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    band: "IELTS 7.5",
    avatar: "MA",
    avatarColor: "from-pink-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote:
      "AI chấm bài viết cực kỳ chi tiết, chỉ rõ từng lỗi nhỏ mà trước đây mình không để ý. Feedback về coherence và cohesion giúp mình cải thiện đáng kể.",
    improvement: "+1.5 band",
    duration: "3 tháng",
  },
  {
    name: "Trần Hoàng Long",
    band: "IELTS 6.5",
    avatar: "HL",
    avatarColor: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote:
      "Lần đầu tiên mình hiểu vì sao mãi kẹt band 6 và cần cải thiện kỹ năng nào. AI phân tích rất rõ điểm yếu về vocabulary range của mình.",
    improvement: "+1.0 band",
    duration: "2 tháng",
  },
  {
    name: "Lê Thu Trang",
    band: "IELTS 8.0",
    avatar: "TT",
    avatarColor: "from-violet-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote:
      "Luyện nói với AI mỗi ngày giúp mình tự tin hơn rất nhiều trước khi thi thật. Pronunciation feedback cực kỳ chính xác và dễ hiểu.",
    improvement: "+1.5 band",
    duration: "4 tháng",
  },
  {
    name: "Phạm Quốc Huy",
    band: "IELTS 7.0",
    avatar: "QH",
    avatarColor: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote:
      "Lộ trình chia theo phase rất rõ ràng, học đúng trọng tâm. Mình biết chính xác mỗi tuần cần làm gì để tiến bộ.",
    improvement: "+1.5 band",
    duration: "3 tháng",
  },
  {
    name: "Võ Thanh Hà",
    band: "IELTS 7.5",
    avatar: "TH",
    avatarColor: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    quote:
      "Là người đi làm bận rộn, mình cần giờ học linh hoạt. AI có thể hỗ trợ 24/7 và feedback ngay lập tức, rất phù hợp với lịch trình của mình.",
    improvement: "+2.0 band",
    duration: "5 tháng",
  },
  {
    name: "Bùi Quang Minh",
    band: "IELTS 6.5",
    avatar: "QM",
    avatarColor: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote:
      "Đề thi thử giống thật đến bất ngờ. Khi vào phòng thi IELTS, mình cảm thấy hoàn toàn tự tin vì đã luyện rất nhiều với AI.",
    improvement: "+1.0 band",
    duration: "2 tháng",
  },
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex-shrink-0 w-[350px] sm:w-[400px] bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mx-3">
      {/* Quote icon */}
      <div className="mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
          <Quote className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-600 leading-relaxed mb-6 text-base line-clamp-4">
        "{testimonial.quote}"
      </p>

      {/* Improvement stats */}
      <div className="flex items-center gap-4 mb-6 text-sm">
        <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-semibold">
          {testimonial.improvement}
        </span>
        <span className="text-gray-400">trong {testimonial.duration}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        {!imageError ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover shadow-md"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-14 h-14 bg-gradient-to-r ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}
          >
            {testimonial.avatar}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 text-base">
            {testimonial.name}
          </h4>
          <span className="text-sm font-medium text-indigo-600">
            {testimonial.band}
          </span>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-indigo-50 overflow-hidden"
      ref={ref}
      id="testimonials"
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
            Câu chuyện thành công
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Học viên yêu thích kết quả của họ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tham gia cùng hàng nghìn học viên đã đạt band điểm mơ ước với AI
          </p>
        </motion.div>
      </div>

      {/* Sliding Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-indigo-50 via-indigo-50/80 to-transparent z-10 pointer-events-none" />

        {/* First row - moves left */}
        <div className="mb-8">
          <motion.div
            className="flex"
            animate={{
              x: isPaused ? 0 : [0, -50 * testimonials.length * 6.5],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            style={{ width: "fit-content" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Second row - moves right (reversed) */}
        <div>
          <motion.div
            className="flex"
            animate={{
              x: isPaused ? 0 : [-50 * testimonials.length * 6.5, 0],
            }}
            transition={{
              x: {
                duration: 45,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            style={{ width: "fit-content" }}
          >
            {[...duplicatedTestimonials].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-gray-400 text-sm mt-8 lg:hidden"
      >
        ← Vuốt để xem thêm →
      </motion.p>
    </section>
  );
};

export default TestimonialsSection;
