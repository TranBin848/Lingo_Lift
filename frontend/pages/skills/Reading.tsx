import { useMemo, useState } from 'react'
import { useLessons } from '../../hooks/useLessons'

export default function Reading() {
  const { data, loading, error } = useLessons()
  const lesson = useMemo(() => data?.reading[0], [data])
  const [choice, setChoice] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  if (loading) return <div className="p-6">Đang tải…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!lesson) return <div className="p-6">Không có bài đọc.</div>

  const correct = checked && choice === lesson.answerIndex

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Reading • {lesson.title}</h2>
      <p className="text-gray-600 mb-4">Đọc đoạn văn và chọn câu đúng.</p>

      <div className="p-4 border rounded-md bg-white mb-4 leading-relaxed">{lesson.passage}</div>

      <div className="space-y-2 mb-3">
        {lesson.options?.map((opt, idx) => (
          <label key={idx} className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${choice === idx ? 'border-blue-400 bg-blue-50' : ''}`}>
            <input
              type="radio"
              name="reading"
              checked={choice === idx}
              onChange={() => {
                setChoice(idx)
                setChecked(false)
              }}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setChecked(true)}
          className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          disabled={choice === null}
        >
          Kiểm tra
        </button>
        {checked && (
          <span className={correct ? 'text-emerald-700' : 'text-red-600'}>
            {correct ? 'Chính xác! 🎉' : 'Chưa đúng, thử lại nhé.'}
          </span>
        )}
      </div>
    </div>
  )
}
