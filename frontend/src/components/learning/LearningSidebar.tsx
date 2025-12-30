import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardCheck, Award } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Tổng quan',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: 'overview',
  },
  {
    id: 'courses',
    label: 'Các khóa học',
    icon: <BookOpen className="w-5 h-5" />,
    path: 'courses',
  },
  {
    id: 'practice',
    label: 'Test Practice',
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: 'practice',
  },
];

interface LearningSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function LearningSidebar({ currentTab, onTabChange }: LearningSidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">Học tập</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Cá nhân hóa</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
