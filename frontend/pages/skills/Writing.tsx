import { useMemo, useState } from 'react'
import { useLessons } from '../../hooks/useLessons'

export default function Writing() {
  const { data, loading, error } = useLessons()
  const lesson = useMemo(() => data?.writing[0], [data])
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)

  if (loading) return <div className="p-6">Đang tải…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!lesson) return <div className="p-6">Không có bài viết.</div>

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const keywords = lesson.keywords || []
  const lower = text.toLowerCase()
  const covered = keywords.filter((k) => lower.includes(k.toLowerCase()))
  const ok = checked && wordCount >= 50 && covered.length === keywords.length

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Writing • {lesson.title}</h2>
      <p className="text-gray-600 mb-4">{lesson.prompt}</p>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setChecked(false) }}
        rows={10}
        className="w-full border rounded-md p-3 mb-3"
        placeholder="Viết bài của bạn tại đây…"
      />

      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-700">
        <span>Từ: <b>{wordCount}</b> / 50+</span>
        <span>•</span>
        <span>Từ khoá: {keywords.map((k) => (
          <b key={k} className={lower.includes(k.toLowerCase()) ? 'text-emerald-700 ml-1' : 'text-gray-500 ml-1'}>#{k}</b>
        ))}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setChecked(true)}
          className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Nộp bài
        </button>
        {checked && (
          <span className={ok ? 'text-emerald-700' : 'text-amber-600'}>
            {ok
              ? 'Bài viết đạt yêu cầu cơ bản! 🎉'
              : 'Hãy đạt ít nhất 50 từ và chứa đủ từ khoá.'}
          </span>
        )}
      </div>
    </div>
  )
}
 
