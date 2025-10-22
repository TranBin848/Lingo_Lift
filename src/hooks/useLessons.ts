import { useEffect, useState } from 'react'
import type { LessonsBySkill } from '../models/lesson'
import { getLessons } from '../services/lessons'

export function useLessons() {
  const [data, setData] = useState<LessonsBySkill | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getLessons()
      .then((res) => {
        if (!mounted) return
        setData(res)
        setError(null)
      })
      .catch((e) => {
        if (!mounted) return
        setError(e?.message ?? 'Failed to load lessons')
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return { data, loading, error }
}
