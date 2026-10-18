import React, { useState } from 'react';
import { usePortal } from './context/PortalContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { CoursesPage } from './pages/CoursesPage';
import { AttendancePage } from './pages/AttendancePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { RewardsPage } from './pages/RewardsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SupportPage } from './pages/SupportPage';
import { SettingsPage } from './pages/SettingsPage';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { CourseDetailsModal } from './components/modals/CourseDetailsModal';
import { AchievementDetailsModal } from './components/modals/AchievementDetailsModal';

export const AppContent: React.FC = () => {
  const { activePage } = usePortal();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'courses':
        return <CoursesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'rewards':
        return <RewardsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'support':
        return <SupportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] text-[#171717] dark:text-[#F5F5F4] flex flex-col transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        onToggleSidebarMobile={() => setIsMobileSidebarOpen((v) => !v)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Collapsible Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActivePage()}

          {/* Footer */}
          <footer className="mt-16 pt-8 pb-16 md:pb-8 border-t border-champagne-300/60 dark:border-neutral-800 text-center text-xs text-neutral-500 dark:text-neutral-400 space-y-1 select-none">
            <p className="font-serif tracking-widest uppercase font-bold text-richblack dark:text-ivory-100">
              CLAUDE <span className="text-burgundy">×</span> SHEIN
            </p>
            <p className="text-[11px] text-neutral-400">
              Haute Couture Academic Learning & Creative Technology Portal
            </p>
            <p className="text-[10px] text-neutral-400/80">
              Frontend Client Session • Verified Student: Rajveer Kol • Mentor: Professor Burzin
            </p>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Modals */}
      <EditProfileModal />
      <CourseDetailsModal />
      <AchievementDetailsModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
