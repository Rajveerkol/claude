import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  Headphones,
  CheckCheck,
  Trash2,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import type { PageId } from '../../types';

interface NavbarProps {
  onToggleSidebarMobile: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebarMobile,
  isMobileSidebarOpen,
}) => {
  const {
    activePage,
    setActivePage,
    profile,
    settings,
    updateSettings,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    support,
    setIsEditProfileOpen,
  } = usePortal();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'dashboard':
        return 'Overview';
      case 'profile':
        return 'Student Profile';
      case 'courses':
        return 'My Courses';
      case 'attendance':
        return 'Attendance Register';
      case 'achievements':
        return 'Honors & Badges';
      case 'rewards':
        return 'Rewards & Benefits';
      case 'notifications':
        return 'Notification Center';
      case 'support':
        return 'Support & Mentorship';
      case 'settings':
        return 'Preferences & Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#181818]/90 backdrop-blur-md border-b border-champagne-300/60 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Wordmark */}
        <div className="flex items-center gap-3 md:gap-6">
          <button
            type="button"
            onClick={onToggleSidebarMobile}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition-colors"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Luxury Brand Wordmark */}
          <div
            onClick={() => setActivePage('dashboard')}
            className="cursor-pointer select-none group flex items-baseline gap-1.5"
            title="CLAUDE × SHEIN Student Portal"
          >
            <span className="font-serif tracking-widest text-lg md:text-xl font-bold uppercase text-richblack dark:text-ivory-100 group-hover:text-burgundy transition-colors">
              CLAUDE
            </span>
            <span className="text-burgundy text-sm md:text-base font-light select-none px-0.5">
              ×
            </span>
            <span className="font-sans tracking-[0.25em] text-sm md:text-base font-semibold uppercase text-neutral-800 dark:text-neutral-200 group-hover:text-burgundy transition-colors">
              SHEIN
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-champagne-200/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 rounded-full border border-champagne-300/50 dark:border-neutral-700">
              Atelier
            </span>
          </div>

          {/* Breadcrumb separator on desktop */}
          <div className="hidden lg:flex items-center text-xs text-neutral-400 dark:text-neutral-500 pl-4 border-l border-neutral-200 dark:border-neutral-800">
            <span className="text-neutral-500 dark:text-neutral-400">Portal</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-richblack dark:text-neutral-200">
              {getPageTitle(activePage)}
            </span>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Support status pill in header */}
          <button
            onClick={() => setActivePage('support')}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              support.status === 'online'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700'
            }`}
            title={`Professor Burzin is ${support.status === 'online' ? 'Online' : 'Offline'}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                support.status === 'online'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-neutral-400'
              }`}
            />
            <span className="font-sans text-[11px] uppercase tracking-wider">
              Prof. Burzin: {support.status === 'online' ? 'Online' : 'Offline'}
            </span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-softgray dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-105"
            title={`Switch to ${settings.theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Notification Popover Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen((v) => !v)}
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-softgray dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-burgundy text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-luxury-lg border border-champagne-300 dark:border-neutral-800 p-4 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-richblack dark:text-ivory-100">
                      Notifications
                    </h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-burgundy/10 text-burgundy dark:text-burgundy-200 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-burgundy hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 max-h-72 overflow-y-auto my-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-500">
                      No notifications at this time
                    </div>
                  ) : (
                    notifications.slice(0, 4).map((notif) => (
                      <div
                        key={notif.id}
                        className={`py-2.5 px-2 rounded-xl transition-colors flex items-start justify-between gap-2 ${
                          notif.read
                            ? 'opacity-70 hover:opacity-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                            : 'bg-champagne-50/60 dark:bg-neutral-800/60'
                        }`}
                      >
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.targetPage) {
                              setActivePage(notif.targetPage);
                              setIsNotifOpen(false);
                            }
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            {!notif.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0" />
                            )}
                            <p className="text-xs font-semibold text-richblack dark:text-neutral-200 line-clamp-1">
                              {notif.title}
                            </p>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                            {notif.timestamp}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          aria-label="Delete notification"
                          className="p-1 text-neutral-400 hover:text-red-600 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                  <button
                    onClick={() => {
                      setActivePage('notifications');
                      setIsNotifOpen(false);
                    }}
                    className="text-xs text-burgundy dark:text-champagne-300 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    View All Notifications
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Avatar Chip & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((v) => !v)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-champagne-300/80 dark:border-neutral-700 bg-champagne-50/50 dark:bg-neutral-800 hover:bg-champagne-100 dark:hover:bg-neutral-700 transition-all select-none"
              aria-label="Student profile menu"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-burgundy text-white font-serif font-bold text-xs flex items-center justify-center shadow-sm">
                {profile.initials || 'RK'}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-semibold text-richblack dark:text-ivory-100">
                  {profile.name}
                </p>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans tracking-wider">
                  {profile.role}
                </p>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-luxury-lg border border-champagne-300 dark:border-neutral-800 p-2 z-50 animate-slide-up">
                {/* Profile Header */}
                <div className="p-3 bg-champagne-50/80 dark:bg-neutral-800/80 rounded-xl mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-burgundy text-white font-serif font-bold text-sm flex items-center justify-center">
                      {profile.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-richblack dark:text-ivory-100">
                        {profile.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Mentor: Prof. {profile.professor}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                        Attendance: {profile.attendance}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActivePage('profile');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-neutral-500" />
                    My Student Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsEditProfileOpen(true);
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-burgundy" />
                    Edit Profile Details
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('support');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-neutral-500" />
                    Contact Prof. Burzin
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-softgray dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-neutral-500" />
                    Portal Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
