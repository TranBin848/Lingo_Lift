export type Skill = 'listening' | 'speaking' | 'reading' | 'writing'

export interface Lesson {
  id: string
  skill: Skill
  title: string
  prompt?: string
  content?: string
  passage?: string
  options?: string[]
  answerIndex?: number
  keywords?: string[]
}

export interface LessonsBySkill {
  listening: Lesson[]
  speaking: Lesson[]
  reading: Lesson[]
  writing: Lesson[]
}
