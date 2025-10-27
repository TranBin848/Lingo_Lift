import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
  const active = "bg-blue-600 text-white";
  const inactive = "text-blue-600 hover:bg-blue-50";

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        <Link
          to="/"
          className="font-bold text-xl text-blue-600 hover:text-blue-700"
        >
          DailyEnglish
        </Link>
        <div className="flex-1" />
        <div className="flex gap-1 items-center">
          <NavLink
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            to="/"
          >
            Trang chủ
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            to="/listening"
          >
            Listening
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            to="/speaking"
          >
            Speaking
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            to="/reading"
          >
            Reading
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
            to="/writing"
          >
            Writing
          </NavLink>

          {/* Auth Buttons */}
          <div className="ml-4 flex gap-2 items-center border-l border-gray-200 pl-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-sm"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
