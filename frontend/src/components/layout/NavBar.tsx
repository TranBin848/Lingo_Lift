import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuth.Store";

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
            to="/placement"
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

          {/* Auth Buttons */}
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
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
