import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuth.Store";
import { useState, useRef, useEffect } from "react";

export default function NavBar() {
  const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
  const active = "bg-blue-600 text-white";
  const inactive = "text-blue-600 hover:bg-blue-50";

  const { accessToken, user, signOut, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

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
            to="/placement-tests"
          >
            Kiểm tra đầu vào
          </NavLink>

          {/* Admin & Teacher - Placement Test Management */}
          {(user?.role === "admin" || user?.role === "teacher") && (
            <NavLink
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
              to="/placement-tests"
            >
              Quản lý kiểm tra
            </NavLink>
          )}

          {/* User Only - Start Learning */}
          {user?.role === "user" && (
            <NavLink
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
              to="/user/dashboard"
            >
              Bắt đầu học
            </NavLink>
          )}

          {/* Teacher Only - Student Progress */}
          {user?.role === "teacher" && (
            <NavLink
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
              to="/teacher/students"
            >
              Theo dõi tiến trình học sinh
            </NavLink>
          )}

          {/* Admin Only - User Management */}
          {user?.role === "admin" && (
            <NavLink
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
              to="/admin/users"
            >
              Quản lý tài khoản
            </NavLink>
          )}

          {/* Auth Section */}
          <div className="ml-4 flex gap-2 items-center border-l border-gray-200 pl-4">
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-500">...</div>
            ) : !accessToken ? (
              <>
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
              </>
            ) : (
              <UserDropdown user={user} onSignOut={handleSignOut} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// UserDropdown Component
interface User {
  id?: string;
  username?: string;
  displayName?: string;
  email?: string;
  role?: string;
}

interface UserDropdownProps {
  user: User | null;
  onSignOut: () => void;
}

function UserDropdown({ user, onSignOut }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (displayName: string) => {
    return (
      displayName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
          {getInitials(user?.displayName || user?.username || "User")}
        </div>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user?.displayName || user?.username}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
              {user?.role === "admin"
                ? "Quản trị viên"
                : user?.role === "teacher"
                ? "Giáo viên"
                : "Học viên"}
            </span>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Thông tin tài khoản
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
