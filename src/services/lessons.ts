import type { Lesson, LessonsBySkill } from '../models/lesson'

const mockLessons: LessonsBySkill = {
  listening: [
    {
      id: 'lis-1',
      skill: 'listening',
      title: 'Greetings',
      prompt: 'Hello, how are you today?'
    }
  ],
  speaking: [
    {
      id: 'spk-1',
      skill: 'speaking',
      title: 'Introduce Yourself',
      prompt: "Say: 'My name is Anna. I am from Vietnam.'"
    }
  ],
  reading: [
    {
      id: 'read-1',
      skill: 'reading',
      title: 'Short Passage',
      passage:
        'Tom is a student. He wakes up at 6 a.m. and goes to school by bus. He loves playing football after class.',
      options: [
        'Tom goes to school by car.',
        'Tom goes to school by bus.',
        'Tom goes to school on foot.'
      ],
      answerIndex: 1
    }
  ],
  writing: [
    {
      id: 'wrt-1',
      skill: 'writing',
      title: 'Daily Routine',
      prompt: 'Write 50+ words about your morning routine.',
      keywords: ['wake', 'breakfast', 'school']
    }
  ]
}

export async function getLessons(): Promise<LessonsBySkill> {
  // Simulate a small delay as if fetching from API
  await new Promise((r) => setTimeout(r, 200))
  return mockLessons
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  const all = await getLessons()
  return (
    all.listening.find((l) => l.id === id) ||
    all.speaking.find((l) => l.id === id) ||
    all.reading.find((l) => l.id === id) ||
    all.writing.find((l) => l.id === id)
  )
}
