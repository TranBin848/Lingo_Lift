import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Award,
  History,
  FileText,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  type: "tab" | "link";
  to?: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "overview",
    label: "Tổng quan",
    icon: LayoutDashboard,
    path: "overview",
    type: "tab",
  },
  {
    id: "courses",
    label: "Khóa học của bạn",
    icon: BookOpen,
    type: "link",
    to: "/mycourse",
  },
  {
    id: "practice",
    label: "Luyện tập",
    icon: ClipboardCheck,
    path: "practice",
    type: "tab",
    badge: "Mới",
  },
  {
    id: "placement-test",
    label: "Kiểm tra đầu vào",
    icon: FileText,
    type: "link",
    to: "/placement-test",
  },
  // {
  //   id: "test-history",
  //   label: "Lịch sử kiểm tra",
  //   icon: History,
  //   type: "link",
  //   to: "/placement-test-history",
  // },
];

// Animation variants
const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

interface LearningSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

// Sidebar Item Button Component
function SidebarButton({
  item,
  isActive,
  onClick,
}: {
  item: SidebarItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        isActive
          ? "text-white font-medium"
          : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/80"
      }`}
    >
      {/* Active background with animation */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25"
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <span className="relative z-10">
        <Icon
          className={`w-5 h-5 transition-transform duration-300 ${
            isActive ? "text-white" : "group-hover:scale-110"
          }`}
        />
      </span>

      {/* Label */}
      <span className="relative z-10 flex-1 text-left">{item.label}</span>

      {/* Badge */}
      {item.badge && (
        <span
          className={`relative z-10 px-2 py-0.5 text-xs font-semibold rounded-full ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {item.badge}
        </span>
      )}

      {/* Arrow indicator */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <ChevronRight className="w-4 h-4 text-white/80" />
        </motion.span>
      )}
    </motion.button>
  );
}

// Sidebar Link Component
function SidebarLink({ item }: { item: SidebarItem }) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants}>
      <NavLink
        to={item.to!}
        className={({ isActive }) =>
          `relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/80"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`w-5 h-5 transition-transform duration-300 ${
                !isActive && "group-hover:scale-110"
              }`}
            />
            <span className="flex-1">{item.label}</span>
            {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

export function LearningSidebar({
  currentTab,
  onTabChange,
}: LearningSidebarProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 min-h-screen sticky top-0 z-50"
    >
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25"
          >
            <Award className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Học tập</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Cá nhân hóa với AI</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Tiến độ hôm nay</p>
              <p className="text-sm font-bold text-gray-900">3/5 bài học</p>
            </div>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="space-y-1">
          {/* Learning Section */}
          <motion.div variants={itemVariants} className="mb-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Học tập
            </p>
          </motion.div>

          <div className="space-y-1">
            {sidebarItems
              .filter((item) => item.type === "tab")
              .map((item) => (
                <SidebarButton
                  key={item.id}
                  item={item}
                  isActive={currentTab === item.id}
                  onClick={() => onTabChange(item.id)}
                />
              ))}
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-4 border-t border-gray-100"
          />

          {/* Test Section */}
          <motion.div variants={itemVariants} className="mb-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Kiểm tra
            </p>
          </motion.div>

          <div className="space-y-1">
            {sidebarItems
              .filter((item) => item.type === "link")
              .map((item) => (
                <SidebarLink key={item.id} item={item} />
              ))}
          </div>
        </nav>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-gray-900">
              Mẹo học tập
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Học đều đặn 30 phút mỗi ngày sẽ giúp bạn tiến bộ nhanh hơn!
          </p>
        </motion.div>
      </div>
    </motion.aside>
  );
}
