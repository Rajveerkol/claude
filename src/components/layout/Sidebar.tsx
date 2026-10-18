import React from 'react';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarCheck,
  Award,
  Gift,
  Bell,
  Headphones,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import type { PageId } from '../../types';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  onCloseMobile,
}) => {
  const {
    activePage,
    setActivePage,
    notifications,
    support,
    contactProfessor,
  } = usePortal();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'courses', label: 'My Courses', icon: BookOpen, badge: '4 Done', badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: '100%', badgeColor: 'bg-burgundy/10 text-burgundy dark:text-burgundy-200' },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'rewards', label: 'Rewards & Benefits', icon: Gift, badge: 'SHEIN', badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined, badgeColor: 'bg-burgundy text-white' },
    { id: 'support', label: 'Support Center', icon: Headphones, badge: support.status === 'online' ? 'Online' : 'Offline', badgeColor: support.status === 'online' ? 'bg-emerald-500 text-white' : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-3 select-none">
      {/* Top section: Collapse toggle + Navigation list */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2 pt-1">
          {!isCollapsed && (
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-neutral-400 dark:text-neutral-500">
              Navigation
            </p>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="space-y-1.5" aria-label="Portal Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all group relative ${
                  isActive
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-champagne-100/60 dark:hover:bg-neutral-800 hover:text-richblack dark:hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isActive ? 'scale-105' : 'group-hover:scale-110'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left tracking-tight">
                    {item.label}
                  </span>
                )}
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                      item.badgeColor || 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isCollapsed && item.badge && item.id === 'notifications' && unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-burgundy" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: Professor Burzin card */}
      {!isCollapsed ? (
        <div className="mt-6 pt-4 border-t border-champagne-300/60 dark:border-neutral-800">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-champagne-100/80 to-champagne-50/50 dark:from-neutral-800 dark:to-neutral-900 border border-champagne-300/80 dark:border-neutral-700/80">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-richblack dark:bg-burgundy text-ivory-100 font-serif font-bold text-sm flex items-center justify-center shadow-sm ring-2 ring-champagne-300/50">
                B
              </div>
              <div className="overflow-hidden">
                <h4 className="font-serif font-semibold text-xs text-richblack dark:text-ivory-100 truncate">
                  Professor Burzin
                </h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                  Faculty Mentor
                </p>
              </div>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
              Available through the Support Center for curriculum reviews and styling policy inquiries.
            </p>
            <button
              onClick={() => contactProfessor()}
              className="w-full py-1.5 px-3 rounded-xl bg-richblack hover:bg-neutral-800 dark:bg-ivory-100 dark:hover:bg-white text-white dark:text-richblack text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-champagne-300 dark:text-burgundy" />
              Contact Professor
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-center">
          <button
            onClick={() => contactProfessor()}
            className="w-8 h-8 rounded-full bg-richblack dark:bg-burgundy text-white font-serif font-bold text-xs flex items-center justify-center hover:scale-105 transition-transform"
            title="Contact Professor Burzin"
          >
            B
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block sticky top-18 h-[calc(100vh-4.5rem)] bg-white/70 dark:bg-[#161616]/70 backdrop-blur-md border-r border-champagne-300/60 dark:border-neutral-800 transition-all duration-300 z-20 overflow-y-auto ${
          isCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full bg-white dark:bg-[#1A1A1A] border-r border-champagne-300 dark:border-neutral-800 z-10 flex flex-col shadow-2xl animate-fade-in">
            <div className="p-4 border-b border-champagne-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-serif tracking-widest text-base font-bold uppercase text-richblack dark:text-ivory-100">
                CLAUDE <span className="text-burgundy">×</span> SHEIN
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Close navigation"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
