import { NavLink } from 'react-router-dom'

export default function NavBar() {
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium'
  const active = 'bg-blue-600 text-white'
  const inactive = 'text-blue-600 hover:bg-blue-50'

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
        <div className="font-bold text-xl text-blue-600">DailyEnglish</div>
        <div className="flex-1" />
        <div className="flex gap-1">
          <NavLink className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`} to="/">
            Trang chủ
          </NavLink>
          <NavLink className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`} to="/listening">
            Listening
          </NavLink>
          <NavLink className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`} to="/speaking">
            Speaking
          </NavLink>
          <NavLink className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`} to="/reading">
            Reading
          </NavLink>
          <NavLink className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`} to="/writing">
            Writing
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
