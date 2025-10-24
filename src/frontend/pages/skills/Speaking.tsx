import { useEffect, useMemo, useRef, useState } from 'react'
import { useLessons } from '../../hooks/useLessons'

// Minimal local typings for Web Speech API (to avoid using 'any')
type SRResultItem = { transcript: string }
type SRResult = { 0: SRResultItem }
interface SREvent extends Event { results: ArrayLike<SRResult> }
interface ISpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: (e: SREvent) => void
  onend: () => void
  onerror: (e: unknown) => void
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => ISpeechRecognition
    SpeechRecognition?: new () => ISpeechRecognition
  }
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function Speaking() {
  const { data, loading, error } = useLessons()
  const lesson = useMemo(() => data?.speaking[0], [data])
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const recRef = useRef<ISpeechRecognition | null>(null)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SR) {
      setSupported(true)
      recRef.current = new SR()
      recRef.current.lang = 'en-US'
      recRef.current.continuous = false
      recRef.current.interimResults = false
      recRef.current.onresult = (e: SREvent) => {
        const text = Array.from(e.results).map((r) => r[0].transcript).join(' ')
        setTranscript(text)
        setListening(false)
      }
      recRef.current.onend = () => setListening(false)
      recRef.current.onerror = () => setListening(false)
    }
  }, [])

  const start = () => {
    if (!recRef.current) return
    setTranscript('')
    setResult('idle')
    setListening(true)
    recRef.current.start()
  }

  const check = () => {
    if (!lesson?.prompt) return
    const ok = normalize(transcript) === normalize(lesson.prompt.replace(/^Say:\s*/i, ''))
    setResult(ok ? 'correct' : 'incorrect')
  }

  if (loading) return <div className="p-6">Đang tải…</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!lesson) return <div className="p-6">Không có bài nói.</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">Speaking • {lesson.title}</h2>
      <p className="text-gray-600 mb-4">{lesson.prompt}</p>

      {!supported ? (
        <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
          Trình duyệt của bạn chưa hỗ trợ Speech Recognition. Hãy dùng Chrome hoặc Edge mới.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={start}
              disabled={listening}
              className={`px-4 py-2 rounded-md text-white ${listening ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {listening ? 'Đang ghi…' : 'Bắt đầu nói'}
            </button>
            <button onClick={check} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
              Kiểm tra
            </button>
          </div>

          <div className="border rounded-md p-3 bg-gray-50 min-h-16">
            <div className="text-xs text-gray-500">Bạn đã nói:</div>
            <div>{transcript || '—'}</div>
          </div>

          {result !== 'idle' && (
            <div className={`text-sm ${result === 'correct' ? 'text-emerald-700' : 'text-red-600'}`}>
              {result === 'correct' ? 'Phát âm đúng nội dung! 🎉' : 'Chưa khớp nội dung, thử lại nhé.'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
