const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export type ChatMessage = {
  id?: string
  role: 'user' | 'model'
  content: string
}

export async function sendMessage(message: string, history: ChatMessage[] = []) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  if (!res.ok) throw new Error(`AI chat failed: ${res.status}`)
  const data = await res.json()
  return data as { text: string }
}

export function streamMessage(
  message: string,
  history: ChatMessage[] = [],
  onChunk: (text: string) => void,
  onComplete?: () => void,
  onError?: (err: unknown) => void
) {
  const controller = new AbortController()
  const signal = controller.signal

  fetch(`${API_BASE}/api/ai/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
    signal,
  })
    .then(async (res) => {
      if (!res.ok || !res.body) throw new Error(`Stream failed: ${res.status}`)
      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() || ''
        for (const part of parts) {
          const lines = part.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const payload = JSON.parse(line.slice(6)) as { text?: string }
                if (payload.text) onChunk(payload.text)
              } catch {
                // ignore JSON parse errors
              }
            }
          }
        }
      }
      // Stream completed successfully
      onComplete?.()
    })
    .catch((err) => {
      onError?.(err)
    })

  return {
    cancel: () => controller.abort(),
  }
}
