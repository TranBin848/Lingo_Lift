import { Link } from 'react-router-dom'

interface Props {
  title: string
  description: string
  to: string
  gradientClass: string // e.g., 'from-blue-500 to-blue-700'
}

export default function SkillGradientCard({ title, description, to, gradientClass }: Props) {
  return (
    <Link
      to={to}
      className={`relative block rounded-3xl p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] min-h-64 bg-gradient-to-br ${gradientClass}`}
    >
      <div className="text-2xl font-extrabold tracking-wide mb-3 drop-shadow-sm">{title}</div>
      <p className="text-white/90 leading-relaxed pr-8">
        {description}
      </p>
      <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/20 grid place-items-center">
        <span className="text-xl">↗</span>
      </div>
    </Link>
  )
}
