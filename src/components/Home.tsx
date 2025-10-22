import SkillGradientCard from './SkillGradientCard'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Học tiếng Anh mỗi ngày</h1>
      <p className="text-gray-600 mb-6">Chọn một kỹ năng để bắt đầu luyện tập.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SkillGradientCard
          title="Listening"
          description="Nghe câu mẫu và gõ lại, luyện khả năng nhận diện âm thanh."
          to="/listening"
          gradientClass="from-blue-500 to-blue-700"
        />
        <SkillGradientCard
          title="Speaking"
          description="Nói theo câu mẫu và kiểm tra phát âm bằng AI."
          to="/speaking"
          gradientClass="from-fuchsia-500 to-rose-600"
        />
        <SkillGradientCard
          title="Reading"
          description="Đọc hiểu đoạn văn ngắn và trả lời câu hỏi."
          to="/reading"
          gradientClass="from-green-500 to-emerald-700"
        />
        <SkillGradientCard
          title="Writing"
          description="Viết đoạn văn ngắn theo gợi ý và từ khoá."
          to="/writing"
          gradientClass="from-amber-400 to-orange-600"
        />
      </div>
    </div>
  )
}
