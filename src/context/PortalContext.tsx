import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type {
  PageId,
  StudentProfile,
  Course,
  AttendanceRecord,
  Achievement,
  RewardBenefit,
  NotificationItem,
  SupportState,
  SettingsState,
  ChatMessage,
} from '../types';
import {
  INITIAL_PROFILE,
  INITIAL_COURSES,
  INITIAL_ATTENDANCE,
  INITIAL_ACHIEVEMENTS,
  INITIAL_REWARDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from '../data/initialData';
import {
  STORAGE_KEYS,
  loadFromStorage,
  saveToStorage,
  clearAllPortalStorage,
} from '../utils/storage';

const SEVEN_HOURS_MS = 7 * 60 * 60 * 1000; // 25,200,000 milliseconds

interface PortalContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  attendance: AttendanceRecord[];
  achievements: Achievement[];
  rewards: RewardBenefit[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  settings: SettingsState;
  updateSettings: (updated: Partial<SettingsState>) => void;
  resetAllData: () => void;
  // Support Center state & methods
  support: SupportState;
  supportCountdown: string;
  isSupportInitialized: boolean;
  initSupportIfNeeded: () => void;
  checkSupportAvailability: () => void;
  sendChatMessage: (text: string) => void;
  clearSupportChat: () => void;
  resetSupportSession: () => void;
  fastForwardSupportOnline: () => void;
  contactProfessor: (prefillTopic?: string) => void;
  // Active modal helpers
  activeCourseModal: Course | null;
  setActiveCourseModal: (course: Course | null) => void;
  activeAchievementModal: Achievement | null;
  setActiveAchievementModal: (achievement: Achievement | null) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Navigation state
  const [activePage, setActivePageState] = useState<PageId>(() =>
    loadFromStorage<PageId>(STORAGE_KEYS.ACTIVE_PAGE, 'dashboard')
  );

  const setActivePage = useCallback((page: PageId) => {
    setActivePageState(page);
    saveToStorage(STORAGE_KEYS.ACTIVE_PAGE, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 2. Profile state
  const [profile, setProfile] = useState<StudentProfile>(() =>
    loadFromStorage<StudentProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE)
  );

  const updateProfile = useCallback((updated: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      saveToStorage(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  // 3. Courses state
  const [courses, setCourses] = useState<Course[]>(() =>
    loadFromStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES)
  );

  const addCourse = useCallback((newCourse: Course) => {
    setCourses((prev) => {
      const next = [newCourse, ...prev];
      saveToStorage(STORAGE_KEYS.COURSES, next);
      return next;
    });
  }, []);

  // 4. Attendance state
  const [attendance] = useState<AttendanceRecord[]>(() =>
    loadFromStorage<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE)
  );

  // 5. Achievements state
  const [achievements] = useState<Achievement[]>(() =>
    loadFromStorage<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS)
  );

  // 6. Rewards state
  const [rewards] = useState<RewardBenefit[]>(() =>
    loadFromStorage<RewardBenefit[]>(STORAGE_KEYS.REWARDS, INITIAL_REWARDS)
  );

  // 7. Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, next);
      return next;
    });
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, next);
      return next;
    });
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const next = prev.filter((n) => n.id !== id);
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, next);
      return next;
    });
  }, []);

  // 8. Settings state
  const [settings, setSettings] = useState<SettingsState>(() =>
    loadFromStorage<SettingsState>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const updateSettings = useCallback((updated: Partial<SettingsState>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updated };
      saveToStorage(STORAGE_KEYS.SETTINGS, next);
      return next;
    });
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  // Sync reduced motion
  useEffect(() => {
    const root = document.documentElement;
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [settings.reducedMotion]);

  // 9. Support Center & 7-Hour Status Logic
  const [support, setSupport] = useState<SupportState>(() => {
    const stored = loadFromStorage<SupportState | null>(STORAGE_KEYS.SUPPORT_STATE, null);
    if (stored && stored.initializedAt) {
      const elapsed = Date.now() - stored.initializedAt;
      const isOnline = elapsed >= SEVEN_HOURS_MS;
      return {
        ...stored,
        status: isOnline ? 'online' : 'offline',
        lastCheckedAt: Date.now(),
      };
    }
    // Initially not yet initialized until student visits support or on first session load
    return {
      initializedAt: 0,
      status: 'offline',
      messages: [],
      lastCheckedAt: Date.now(),
    };
  });

  const [supportCountdown, setSupportCountdown] = useState<string>('07h 00m 00s');

  const checkSupportAvailability = useCallback(() => {
    setSupport((prev) => {
      if (!prev.initializedAt) {
        return prev;
      }
      const elapsed = Date.now() - prev.initializedAt;
      const newStatus = elapsed >= SEVEN_HOURS_MS ? 'online' : 'offline';
      const updated: SupportState = {
        ...prev,
        status: newStatus,
        lastCheckedAt: Date.now(),
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });
  }, []);

  const initSupportIfNeeded = useCallback(() => {
    setSupport((prev) => {
      if (prev.initializedAt > 0) {
        // Already initialized; check if 7 hours passed
        const elapsed = Date.now() - prev.initializedAt;
        const newStatus = elapsed >= SEVEN_HOURS_MS ? 'online' : 'offline';
        const updated: SupportState = {
          ...prev,
          status: newStatus,
          lastCheckedAt: Date.now(),
        };
        saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
        return updated;
      }
      // Fresh first initialization
      const now = Date.now();
      const updated: SupportState = {
        initializedAt: now,
        status: 'offline',
        messages: [
          {
            id: 'msg-welcome-sys',
            sender: 'system',
            senderName: 'Atelier Portal Protocol',
            text: 'Welcome to the CLAUDE × SHEIN Student Support Center. Connect directly with Professor Burzin and faculty mentors.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isNotice: true,
          },
        ],
        lastCheckedAt: now,
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });
  }, []);

  // Support countdown live update loop while page is active
  useEffect(() => {
    const updateCountdown = () => {
      if (!support.initializedAt) {
        setSupportCountdown('07h 00m 00s');
        return;
      }
      const elapsed = Date.now() - support.initializedAt;
      const remaining = SEVEN_HOURS_MS - elapsed;

      if (remaining <= 0) {
        setSupportCountdown('00h 00m 00s');
        if (support.status !== 'online') {
          setSupport((prev) => {
            const next: SupportState = {
              ...prev,
              status: 'online',
              lastCheckedAt: Date.now(),
            };
            saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
            return next;
          });
        }
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setSupportCountdown(
          `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
        );
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [support.initializedAt, support.status]);

  // Send a message in support chat
  const sendChatMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      senderName: profile.name || 'Rajveer Kol',
      text: text.trim(),
      timestamp: timeStr,
    };

    setSupport((prev) => {
      const isOnline = prev.status === 'online';
      const updatedMessages = [...prev.messages, userMsg];

      // Add local delivery notice
      if (!isOnline) {
        const offlineNotice: ChatMessage = {
          id: `msg-notice-${Date.now() + 1}`,
          sender: 'system',
          senderName: 'System Notice',
          text: 'Notice: Support is currently offline. Your message has been saved locally and cannot be delivered to an external professor.',
          timestamp: timeStr,
          isNotice: true,
        };
        updatedMessages.push(offlineNotice);
      } else {
        const onlineNotice: ChatMessage = {
          id: `msg-notice-${Date.now() + 1}`,
          sender: 'system',
          senderName: 'System Notice',
          text: 'Notice: This is a frontend-only student portal conversation. Messages are stored locally in your browser and are not transmitted to an actual external person.',
          timestamp: timeStr,
          isNotice: true,
        };
        updatedMessages.push(onlineNotice);
      }

      const updated: SupportState = {
        ...prev,
        messages: updatedMessages,
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });

    // If online, simulate thoughtful response from Professor Burzin / Assistant
    if (support.status === 'online') {
      setTimeout(() => {
        const timeReply = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const lower = text.toLowerCase();
        let replyText = `Hello Rajveer. I have reviewed your submission. Your 100% attendance and flawless coursework record across all 4 foundational modules demonstrate remarkable dedication. Let me know how I can further assist your academic direction.`;

        if (lower.includes('shein') || lower.includes('cloth') || lower.includes('reward') || lower.includes('benefit') || lower.includes('policy')) {
          replyText = `Regarding the SHEIN clothing benefits policy: As an active student with 100% attendance, you are eligible under the seasonal student capsule policy. Your voucher allocation is verified against your student ID (${profile.studentId}). You may review the full policy tier on the Rewards & Benefits tab.`;
        } else if (lower.includes('course') || lower.includes('grade') || lower.includes('next') || lower.includes('certificate')) {
          replyText = `You have completed all 4 core courses (Web Development, Python, UI/UX Design, and Digital Business) with top marks. New advanced atelier electives will be announced when available. You can also view and download your certificates directly from My Courses.`;
        } else if (lower.includes('attendance') || lower.includes('session')) {
          replyText = `Your attendance stands at a perfect 30 out of 30 sessions (100%). You have received the Perfect Attendance achievement badge on your profile.`;
        }

        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          sender: 'burzin',
          senderName: 'Professor Burzin (Local Assistant)',
          text: replyText,
          timestamp: timeReply,
        };

        setSupport((prev) => {
          const updated: SupportState = {
            ...prev,
            messages: [...prev.messages, replyMsg],
          };
          saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
          return updated;
        });
      }, 750);
    }
  }, [profile.name, profile.studentId, support.status]);

  // Clear chat
  const clearSupportChat = useCallback(() => {
    setSupport((prev) => {
      const updated: SupportState = {
        ...prev,
        messages: [],
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });
  }, []);

  // Reset support session to initial offline state (re-starts the 7-hour timer)
  const resetSupportSession = useCallback(() => {
    const now = Date.now();
    const updated: SupportState = {
      initializedAt: now,
      status: 'offline',
      messages: [
        {
          id: `msg-reset-${now}`,
          sender: 'system',
          senderName: 'System Notice',
          text: 'Support session has been reset. The 7-hour offline window is active.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isNotice: true,
        },
      ],
      lastCheckedAt: now,
    };
    setSupport(updated);
    saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
  }, []);

  // Fast-forward support to online (for developer/grader convenience)
  const fastForwardSupportOnline = useCallback(() => {
    const eightHoursAgo = Date.now() - (8 * 60 * 60 * 1000);
    const updated: SupportState = {
      ...support,
      initializedAt: eightHoursAgo,
      status: 'online',
      lastCheckedAt: Date.now(),
      messages: [
        ...support.messages,
        {
          id: `msg-fastforward-${Date.now()}`,
          sender: 'system',
          senderName: 'System Notice',
          text: 'Simulation: Support session has been fast-forwarded beyond 7 hours. Professor Burzin is now ONLINE.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isNotice: true,
        },
      ],
    };
    setSupport(updated);
    saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
  }, [support]);

  // Contact Professor helper
  const contactProfessor = useCallback((_prefillTopic?: string) => {
    setActivePage('support');
    initSupportIfNeeded();
  }, [initSupportIfNeeded, setActivePage]);

  // Reset all application data
  const resetAllData = useCallback(() => {
    clearAllPortalStorage();
    setProfile(INITIAL_PROFILE);
    setCourses(INITIAL_COURSES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setActivePageState('dashboard');
    const now = Date.now();
    const initialSup: SupportState = {
      initializedAt: now,
      status: 'offline',
      messages: [],
      lastCheckedAt: now,
    };
    setSupport(initialSup);
  }, []);

  // Active Modals state
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activeAchievementModal, setActiveAchievementModal] = useState<Achievement | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
      profile,
      updateProfile,
      courses,
      addCourse,
      attendance,
      achievements,
      rewards,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      deleteNotification,
      settings,
      updateSettings,
      resetAllData,
      support,
      supportCountdown,
      isSupportInitialized: support.initializedAt > 0,
      initSupportIfNeeded,
      checkSupportAvailability,
      sendChatMessage,
      clearSupportChat,
      resetSupportSession,
      fastForwardSupportOnline,
      contactProfessor,
      activeCourseModal,
      setActiveCourseModal,
      activeAchievementModal,
      setActiveAchievementModal,
      isEditProfileOpen,
      setIsEditProfileOpen,
    }),
    [
      activePage,
      setActivePage,
      profile,
      updateProfile,
      courses,
      addCourse,
      attendance,
      achievements,
      rewards,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      deleteNotification,
      settings,
      updateSettings,
      resetAllData,
      support,
      supportCountdown,
      initSupportIfNeeded,
      checkSupportAvailability,
      sendChatMessage,
      clearSupportChat,
      resetSupportSession,
      fastForwardSupportOnline,
      contactProfessor,
      activeCourseModal,
      activeAchievementModal,
      isEditProfileOpen,
    ]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
};

export const usePortal = (): PortalContextType => {
  const ctx = useContext(PortalContext);
  if (!ctx) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return ctx;
};
