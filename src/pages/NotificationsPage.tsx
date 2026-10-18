import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  BookOpen,
  CalendarCheck,
  Gift,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    setActivePage,
  } = usePortal();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>('all');

  const unreadCount = notifications.filter((n: NotificationItem) => !n.read).length;

  const filteredNotifications = notifications.filter((notif: NotificationItem) => {
    if (activeFilter === 'unread') return !notif.read;
    if (activeFilter === 'read') return notif.read;
    return true;
  });

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'attendance':
        return CalendarCheck;
      case 'policy':
        return Gift;
      case 'anniversary':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <Bell className="w-3.5 h-3.5" />
              Portal Dispatch
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Notification Center
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Curriculum notices, milestone credentials, and student benefit policy updates.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="px-4 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-neutral-200 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4 text-burgundy" />
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'unread'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveFilter('read')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'read'
                ? 'bg-burgundy text-white shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>
      </section>

      {/* 2. Notification Items List */}
      <section className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif: NotificationItem) => {
            const Icon = getNotificationIcon(notif.type);

            return (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start justify-between gap-4 ${
                  notif.read
                    ? 'bg-white/80 dark:bg-[#1A1A1A]/80 border-champagne-200/80 dark:border-neutral-800/80 opacity-80 hover:opacity-100'
                    : 'bg-white dark:bg-[#1A1A1A] border-burgundy/30 shadow-luxury'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div
                    className={`p-2.5 rounded-xl flex-shrink-0 mt-0.5 ${
                      notif.read
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                        : 'bg-champagne-200 text-burgundy dark:bg-neutral-800 dark:text-champagne-200 ring-2 ring-burgundy/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-serif font-bold text-sm sm:text-base ${
                          notif.read
                            ? 'text-neutral-700 dark:text-neutral-300'
                            : 'text-richblack dark:text-ivory-100'
                        }`}
                      >
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-burgundy" title="Unread" />
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{notif.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Notification Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  {notif.targetPage && (
                    <button
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        setActivePage(notif.targetPage!);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {!notif.read && (
                    <button
                      onClick={() => markNotificationAsRead(notif.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Mark as read"
                    >
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 text-center space-y-2">
            <Inbox className="w-10 h-10 mx-auto text-neutral-400" />
            <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
              No notifications in this filter
            </h4>
            <p className="text-xs text-neutral-500">
              You are all caught up on your portal updates.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
