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
  removeFromStorage,
  clearAllPortalStorage,
} from '../utils/storage';

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
  // Live AI Support Center state & methods
  support: SupportState;
  isSupportInitialized: boolean;
  initSupportIfNeeded: () => void;
  checkSupportAvailability: () => void;
  sendChatMessage: (text: string) => Promise<void>;
  clearSupportChat: () => void;
  contactProfessor: (prefillTopic?: string) => void;
  // Active modal helpers
  activeCourseModal: Course | null;
  setActiveCourseModal: (course: Course | null) => void;
  activeAchievementModal: Achievement | null;
  setActiveAchievementModal: (achievement: Achievement | null) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  // Student ID Photo management
  idPhoto: string;
  updateIdPhoto: (dataUrl: string) => void;
  resetIdPhoto: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome-sys',
  sender: 'assistant',
  senderName: 'AI Support Assistant',
  text: 'Welcome to the CLAUDE × SHEIN AI Student Support Center. I am your academic AI assistant. How can I assist you today with your courses, attendance, Student ID card, or SHEIN clothing benefits?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

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

  // Student ID Photo state with local persistence
  const [idPhoto, setIdPhoto] = useState<string>(() =>
    loadFromStorage<string>(STORAGE_KEYS.ID_PHOTO, '/rajveer-photo.jpg')
  );

  const updateIdPhoto = useCallback((dataUrl: string) => {
    setIdPhoto(dataUrl);
    saveToStorage(STORAGE_KEYS.ID_PHOTO, dataUrl);
    setProfile((prev) => {
      const next = { ...prev, photoUrl: dataUrl };
      saveToStorage(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  const resetIdPhoto = useCallback(() => {
    setIdPhoto('/rajveer-photo.jpg');
    removeFromStorage(STORAGE_KEYS.ID_PHOTO);
    setProfile((prev) => {
      const next = { ...prev, photoUrl: '/rajveer-photo.jpg' };
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

  // 9. Live AI Support Center State (Always Online)
  const [support, setSupport] = useState<SupportState>(() => {
    const stored = loadFromStorage<SupportState | null>(STORAGE_KEYS.SUPPORT_STATE, null);
    if (stored && Array.isArray(stored.messages) && stored.messages.length > 0) {
      return {
        ...stored,
        status: 'online',
        isAiResponding: false,
        lastCheckedAt: Date.now(),
      };
    }
    return {
      status: 'online',
      isAiResponding: false,
      messages: [INITIAL_WELCOME_MESSAGE],
      lastCheckedAt: Date.now(),
    };
  });

  const checkSupportAvailability = useCallback(() => {
    setSupport((prev) => {
      if (prev.status === 'online') return prev;
      const updated: SupportState = {
        ...prev,
        status: 'online',
        lastCheckedAt: Date.now(),
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });
  }, []);

  const initSupportIfNeeded = useCallback(() => {
    setSupport((prev) => {
      if (prev.messages && prev.messages.length > 0) return prev;
      const updated: SupportState = {
        status: 'online',
        isAiResponding: false,
        messages: [INITIAL_WELCOME_MESSAGE],
        lastCheckedAt: Date.now(),
      };
      saveToStorage(STORAGE_KEYS.SUPPORT_STATE, updated);
      return updated;
    });
  }, []);

  // Send a message in support chat with Gemini AI response
  const sendChatMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || support.isAiResponding) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'student',
        senderName: profile.name || 'Rajveer Kol',
        text: text.trim(),
        timestamp: timeStr,
      };

      const updatedHistory = [...support.messages, userMsg];

      // Optimistically update with student's message
      setSupport((prev) => {
        const next: SupportState = {
          ...prev,
          status: 'online',
          isAiResponding: true,
          messages: updatedHistory,
        };
        saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
        return next;
      });

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: updatedHistory.map((m) => ({
              sender: m.sender,
              text: m.text,
            })),
          }),
        });

        const data = await response.json();
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (response.ok && data.success && data.text) {
          const aiMsg: ChatMessage = {
            id: `msg-ai-${Date.now()}`,
            sender: 'assistant',
            senderName: 'AI Support Assistant',
            text: data.text,
            timestamp: replyTime,
            modelUsed: data.modelUsed,
          };

          setSupport((prev) => {
            const next: SupportState = {
              ...prev,
              status: 'online',
              isAiResponding: false,
              messages: [...prev.messages, aiMsg],
            };
            saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
            return next;
          });
        } else {
          // Failure message: friendly service message without falsely claiming AI responded
          const errorNotice: ChatMessage = {
            id: `msg-err-${Date.now()}`,
            sender: 'system',
            senderName: 'AI Support Service Notice',
            text:
              data?.error ||
              'Our AI assistant is temporarily unavailable. Please try again shortly.',
            timestamp: replyTime,
            isNotice: true,
          };

          setSupport((prev) => {
            const next: SupportState = {
              ...prev,
              status: 'online',
              isAiResponding: false,
              messages: [...prev.messages, errorNotice],
            };
            saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
            return next;
          });
        }
      } catch (err: any) {
        console.error('Chat error:', err);
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const fallbackNotice: ChatMessage = {
          id: `msg-err-${Date.now()}`,
          sender: 'system',
          senderName: 'AI Support Service Notice',
          text: 'Our AI assistant is temporarily unavailable. Please try again shortly.',
          timestamp: replyTime,
          isNotice: true,
        };

        setSupport((prev) => {
          const next: SupportState = {
            ...prev,
            status: 'online',
            isAiResponding: false,
            messages: [...prev.messages, fallbackNotice],
          };
          saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
          return next;
        });
      }
    },
    [profile.name, support.isAiResponding, support.messages]
  );

  // Clear chat
  const clearSupportChat = useCallback(() => {
    const next: SupportState = {
      status: 'online',
      isAiResponding: false,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'assistant',
          senderName: 'AI Support Assistant',
          text: 'Welcome to the CLAUDE × SHEIN AI Student Support Center. I am your academic AI assistant. How can I assist you today with your courses, attendance, Student ID card, or SHEIN clothing benefits?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      lastCheckedAt: Date.now(),
    };
    setSupport(next);
    saveToStorage(STORAGE_KEYS.SUPPORT_STATE, next);
  }, []);

  // Contact Professor helper: navigates to support page
  const contactProfessor = useCallback(
    (_prefillTopic?: string) => {
      setActivePage('support');
      initSupportIfNeeded();
    },
    [initSupportIfNeeded, setActivePage]
  );

  // Reset all application data
  const resetAllData = useCallback(() => {
    clearAllPortalStorage();
    setProfile(INITIAL_PROFILE);
    setIdPhoto('/rajveer-photo.jpg');
    setCourses(INITIAL_COURSES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setActivePageState('dashboard');
    const initialSup: SupportState = {
      status: 'online',
      isAiResponding: false,
      messages: [INITIAL_WELCOME_MESSAGE],
      lastCheckedAt: Date.now(),
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
      isSupportInitialized: true,
      initSupportIfNeeded,
      checkSupportAvailability,
      sendChatMessage,
      clearSupportChat,
      contactProfessor,
      activeCourseModal,
      setActiveCourseModal,
      activeAchievementModal,
      setActiveAchievementModal,
      isEditProfileOpen,
      setIsEditProfileOpen,
      idPhoto,
      updateIdPhoto,
      resetIdPhoto,
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
      initSupportIfNeeded,
      checkSupportAvailability,
      sendChatMessage,
      clearSupportChat,
      contactProfessor,
      activeCourseModal,
      activeAchievementModal,
      isEditProfileOpen,
      idPhoto,
      updateIdPhoto,
      resetIdPhoto,
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
