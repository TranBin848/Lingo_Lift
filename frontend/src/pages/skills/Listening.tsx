import { useMemo, useState } from 'react'
import { useLessons } from '../../hooks/useLessons'
import { toast } from 'sonner'

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function Listening() {
  const { data, loading, error } = useLessons()
  const lesson = useMemo(() => data?.listening[0], [data])
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'idle' | 'correct' | 'incorrect'>('idle')

  const speak = () => {
    if (!lesson?.prompt) return
    const utterance = new SpeechSynthesisUtterance(lesson.prompt)
    utterance.lang = 'en-US'
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
    toast.info('🔊 Đang phát âm thanh...')
  }

  const check = () => {
    if (!lesson?.prompt) return
    const ok = normalize(input) === normalize(lesson.prompt)
    setResult(ok ? 'correct' : 'incorrect')
    
    if (ok) {
      toast.success('🎉 Chính xác! Bạn đã nghe đúng!', {
        description: 'Tiếp tục phát huy nhé!'
      })
    } else {
      toast.error('❌ Chưa đúng rồi!', {
        description: 'Hãy nghe lại và thử lần nữa nhé.'
      })
    }
  }

  if (loading) return <div className="p-6">Đang tải…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!lesson) return <div className="p-6">Không có bài nghe.</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Listening • {lesson.title}</h2>
      <p className="text-gray-600 mb-4">Nghe câu sau và gõ lại chính xác.</p>

      {/* Demo Toast Buttons */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm font-semibold mb-2">🧪 Demo Toast:</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => toast('Đây là toast thông thường')} className="px-3 py-1 text-sm rounded bg-gray-600 text-white hover:bg-gray-700">
            Default
          </button>
          <button onClick={() => toast.success('Thành công!')} className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700">
            Success
          </button>
          <button onClick={() => toast.error('Có lỗi xảy ra!')} className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700">
            Error
          </button>
          <button onClick={() => toast.info('Thông tin')} className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
            Info
          </button>
          <button onClick={() => toast.warning('Cảnh báo!')} className="px-3 py-1 text-sm rounded bg-yellow-600 text-white hover:bg-yellow-700">
            Warning
          </button>
          <button onClick={() => toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: 'Đang xử lý...',
              success: 'Hoàn thành!',
              error: 'Thất bại!'
            }
          )} className="px-3 py-1 text-sm rounded bg-purple-600 text-white hover:bg-purple-700">
            Promise
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={speak} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Nghe lại
        </button>
        <button onClick={() => { setInput(''); setResult('idle') }} className="px-3 py-2 rounded-md border">Xoá</button>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border rounded-md p-3 mb-3"
        placeholder="Nhập lại câu bạn nghe được…"
      />

      <div className="flex items-center gap-2">
        <button onClick={check} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
          Kiểm tra
        </button>
        {result !== 'idle' && (
          <span className={result === 'correct' ? 'text-emerald-600' : 'text-red-600'}>
            {result === 'correct' ? 'Chính xác! 🎉' : 'Chưa đúng, thử lại nhé.'}
          </span>
        )}
      </div>
    </div>
  )
}
