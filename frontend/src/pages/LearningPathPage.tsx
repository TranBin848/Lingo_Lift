import { useState } from 'react';
import { LearningSidebar } from '../components/learning/LearningSidebar';
import { OverviewTab } from '../components/learning/OverviewTab';
import { CoursesTab } from '../components/learning/CoursesTab';
import { PracticeTab } from '../components/learning/PracticeTab';
import { useNavigate } from 'react-router-dom';

export default function LearningPathPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('overview');

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewTab />;
      case 'courses':
        return <CoursesTab />;
      case 'practice':
        return <PracticeTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <LearningSidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
