export type PageId =
  | 'dashboard'
  | 'profile'
  | 'id-card'
  | 'courses'
  | 'attendance'
  | 'achievements'
  | 'rewards'
  | 'notifications'
  | 'support'
  | 'settings';

export interface StudentProfile {
  name: string;
  dob: string;
  role: string;
  professor: string;
  attendance: number;
  membershipDuration: string;
  status: 'Active' | 'Inactive';
  initials: string;
  bio: string;
  email: string;
  studentId: string;
  phone: string;
  major: string;
  academicYear: string;
  joinedNotice: string;
  avatarBgColor?: string;
  photoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  category: 'Technology' | 'Programming' | 'Design' | 'Business' | string;
  progress: number;
  status: 'Completed' | 'In Progress';
  icon: string;
  description: string;
  syllabus: string[];
  learningOutcomes: string[];
  durationHours: number;
  modulesCount: number;
  gradeAchieved: string;
  certificateId: string;
  instructor: string;
  completionDateNotice: string;
}

export interface AttendanceRecord {
  id: string;
  sessionNumber: number;
  date: string;
  month: string;
  topic: string;
  time: string;
  professor: string;
  status: 'Present' | 'Absent';
  category: string;
  room: string;
  notes: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDateNotice: string;
  category: 'Academic' | 'Attendance' | 'Milestone' | 'Excellence';
  criteria: string;
  certificateCode: string;
}

export interface RewardBenefit {
  id: string;
  title: string;
  tier: string;
  category: string;
  description: string;
  highlight: string;
  policyNotes: string;
  status: 'Eligible' | 'Active' | 'In Review';
  actionLabel: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'course' | 'attendance' | 'anniversary' | 'announcement' | 'policy';
  targetPage?: PageId;
  priority?: 'high' | 'normal' | 'low';
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'burzin' | 'system' | 'assistant';
  senderName: string;
  text: string;
  timestamp: string;
  isNotice?: boolean;
  modelUsed?: string;
}

export interface SupportState {
  status: 'online' | 'offline';
  messages: ChatMessage[];
  lastCheckedAt?: number;
  isAiResponding?: boolean;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  emailDigest: boolean;
  courseAlerts: boolean;
  benefitsUpdates: boolean;
  compactSidebar: boolean;
}
