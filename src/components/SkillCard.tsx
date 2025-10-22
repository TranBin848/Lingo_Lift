import { Link } from 'react-router-dom'

interface Props {
  title: string
  description: string
  to: string
  colorClass?: string // e.g., 'bg-blue-100 text-blue-700'
}

export default function SkillCard({ title, description, to, colorClass = 'bg-blue-100 text-blue-700' }: Props) {
  return (
    <Link
      to={to}
      className={`block rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition bg-white`}
    >
      <div className={`h-10 w-10 rounded-md grid place-items-center mb-3 font-bold ${colorClass}`}>
        {title[0]}
      </div>
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-gray-600 text-sm mt-1">{description}</div>
    </Link>
  )
}
