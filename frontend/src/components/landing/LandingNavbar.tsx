import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronDown, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuth.Store";

// UserDropdown Component
interface UserData {
  id?: string;
  username?: string;
  displayName?: string;
  email?: string;
  role?: string;
}

interface UserDropdownProps {
  user: UserData | null;
  onSignOut: () => void;
  isScrolled: boolean;
}

function UserDropdown({ user, onSignOut, isScrolled }: UserDropdownProps) {
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
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-md">
          {getInitials(user?.displayName || user?.username || "User")}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isScrolled ? "text-gray-600" : "text-gray-600"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <p className="text-sm font-semibold text-gray-900">
                {user?.displayName || user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mt-2">
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
                to="/learning-path"
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <GraduationCap className="w-4 h-4 mr-3" />
                Bắt đầu học
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4 mr-3" />
                Thông tin tài khoản
              </Link>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Đăng xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Tính năng",
      href: "#features",
      dropdown: [
        { label: "AI Speaking", href: "#features" },
        { label: "AI Writing", href: "#features" },
        { label: "Đề thi thử", href: "#features" },
      ],
    },
    { label: "Cách hoạt động", href: "#how-it-works" },
    { label: "Lộ trình", href: "#roadmap" },
    { label: "Đánh giá", href: "#testimonials" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transition-transform hover:scale-105`}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-xl font-bold transition-colors ${
                  isScrolled ? "text-gray-900" : "text-gray-900"
                }`}
              >
                LingoLift
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-600 ${
                      isScrolled ? "text-gray-700" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className="w-4 h-4 opacity-60" />
                    )}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[180px]">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {loading ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !accessToken ? (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                      isScrolled ? "text-gray-700" : "text-gray-700"
                    }`}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Dùng thử miễn phí
                  </Link>
                </>
              ) : (
                <UserDropdown
                  user={user}
                  onSignOut={handleSignOut}
                  isScrolled={isScrolled}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      LingoLift
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-6 py-3 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {item.label}
                      </a>
                      {item.dropdown && (
                        <div className="pl-6">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-6 py-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="p-4 border-t border-gray-100 space-y-3">
                  {loading ? (
                    <div className="flex justify-center py-3">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : !accessToken ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-3 text-center text-gray-700 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl"
                      >
                        Dùng thử miễn phí
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* User Info */}
                      <div className="flex items-center gap-3 px-2 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {(user?.displayName || user?.username || "U")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.displayName || user?.username}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <Link
                        to="/learning-path"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl"
                      >
                        <GraduationCap className="w-5 h-5" />
                        Bắt đầu học
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 text-center text-gray-700 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-5 h-5" />
                        Thông tin tài khoản
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleSignOut();
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 text-center text-red-600 font-medium border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Đăng xuất
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
