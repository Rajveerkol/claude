import React from 'react';
import {
  CalendarCheck,
  BookOpen,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Headphones,
  User,
  ChevronRight,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { SheinBanner } from '../components/common/SheinBanner';
import type { Course, Achievement } from '../types';

export const DashboardPage: React.FC = () => {
  const {
    profile,
    courses,
    achievements,
    setActivePage,
    support,
    supportCountdown,
    contactProfessor,
    setActiveCourseModal,
    setActiveAchievementModal,
    setIsEditProfileOpen,
  } = usePortal();

  // 4 Primary Stats from Requirements
  const stats = [
    {
      label: 'Attendance',
      value: '100%',
      subtext: '30 of 30 Sessions Present',
      icon: CalendarCheck,
      color: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
      onClick: () => setActivePage('attendance'),
    },
    {
      label: 'Courses Completed',
      value: '4',
      subtext: 'Full Core Collection Mastered',
      icon: BookOpen,
      color: 'text-burgundy dark:text-burgundy-200',
      bgColor: 'bg-burgundy/5 dark:bg-burgundy/20 border-burgundy/20',
      onClick: () => setActivePage('courses'),
    },
    {
      label: 'Learning Streak',
      value: '30 Days',
      subtext: 'Continuous Portal Engagement',
      icon: Flame,
      color: 'text-amber-700 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
      onClick: () => setActivePage('achievements'),
    },
    {
      label: 'Membership',
      value: '1 Year',
      subtext: profile.joinedNotice || 'Active Cohort Member',
      icon: Clock,
      color: 'text-neutral-700 dark:text-champagne-300',
      bgColor: 'bg-champagne-100/60 dark:bg-neutral-800 border-champagne-300 dark:border-neutral-700',
      onClick: () => setActivePage('profile'),
    },
  ];

  // Recent activity list
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Course Completed: Digital Business Foundations',
      category: 'Course Completion',
      time: 'Earlier today',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    {
      id: 'act-2',
      title: 'Achievement Unlocked: Perfect Attendance (100%)',
      category: 'Honors Milestone',
      time: 'Yesterday',
      icon: Award,
      iconColor: 'text-burgundy',
    },
    {
      id: 'act-3',
      title: 'Session 30 Verified: Capstone Defense Present',
      category: 'Attendance Milestone',
      time: '2 days ago',
      icon: CalendarCheck,
      iconColor: 'text-blue-600',
    },
    {
      id: 'act-4',
      title: 'Wardrobe Benefit Policy Guide Released',
      category: 'Student Benefit',
      time: '3 days ago',
      icon: Sparkles,
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 p-6 sm:p-8 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700">
              <Sparkles className="w-3.5 h-3.5" />
              CLAUDE × SHEIN Academy
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Welcome back, {profile.name.split(' ')[0]}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans max-w-xl">
              Your learning journey, all in one place.
            </p>
          </div>

          {/* Quick actions row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActivePage('courses')}
              className="px-4 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              My Courses
            </button>
            <button
              onClick={() => contactProfessor()}
              className="px-4 py-2.5 rounded-xl bg-champagne-200 hover:bg-champagne-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-neutral-100 text-xs sm:text-sm font-semibold transition-all border border-champagne-300 dark:border-neutral-700 flex items-center gap-1.5"
            >
              <Headphones className="w-4 h-4 text-burgundy" />
              Contact Professor
            </button>
          </div>
        </div>
      </section>

      {/* 2. Four Statistic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={stat.onClick}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-luxury-hover hover:-translate-y-0.5 bg-white dark:bg-[#1A1A1A] ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl bg-white/80 dark:bg-neutral-900/80 shadow-sm ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="font-serif text-3xl font-bold text-richblack dark:text-ivory-100">
                {stat.value}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center justify-between">
                <span>{stat.subtext}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </p>
            </div>
          );
        })}
      </section>

      {/* 3. Prominent SHEIN Clothing Benefits Promotional Banner */}
      <SheinBanner variant="dashboard" />

      {/* 4. Main Dashboard Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Course Progress & Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Progress Section */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
                  Course Progress
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  All 4 core foundational modules completed
                </p>
              </div>
              <button
                onClick={() => setActivePage('courses')}
                className="text-xs font-semibold text-burgundy dark:text-champagne-300 hover:underline flex items-center gap-1"
              >
                View Curriculum
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {courses.map((course: Course) => (
                <div
                  key={course.id}
                  onClick={() => setActiveCourseModal(course)}
                  className="p-4 rounded-xl border border-champagne-200/80 dark:border-neutral-800 bg-champagne-50/30 dark:bg-neutral-900/40 hover:bg-champagne-100/40 dark:hover:bg-neutral-800/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <h4 className="font-serif font-semibold text-sm text-richblack dark:text-ivory-100 group-hover:text-burgundy transition-colors">
                        {course.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Completed
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="bg-burgundy h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span>Category: {course.category}</span>
                    <span className="font-semibold text-richblack dark:text-neutral-300">
                      100% • Grade {course.gradeAchieved}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100 mb-1">
              Recent Activity
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Verified local timeline records of your academic milestones
            </p>

            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className="py-3 flex items-start gap-3 first:pt-0 last:pb-0"
                  >
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${act.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-richblack dark:text-ivory-100">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {act.category} • {act.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column (1 span): Student Profile Card, Professor Card & Support Status */}
        <div className="space-y-6">
          {/* Student Overview Card */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury text-center">
            <div className="relative inline-block mb-3">
              <div className="w-18 h-18 rounded-full bg-burgundy text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-md ring-4 ring-champagne-200 dark:ring-neutral-700">
                {profile.initials}
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1A1A1A]" title="Active Status" />
            </div>

            <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
              {profile.name}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {profile.role} • {profile.major}
            </p>

            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-3 text-left text-xs">
              <div>
                <p className="text-neutral-400 text-[10px] uppercase font-bold">Status</p>
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">{profile.status}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-[10px] uppercase font-bold">Attendance</p>
                <p className="font-semibold text-richblack dark:text-neutral-200">{profile.attendance}%</p>
              </div>
              <div>
                <p className="text-neutral-400 text-[10px] uppercase font-bold">Faculty Mentor</p>
                <p className="font-semibold text-richblack dark:text-neutral-200">Prof. {profile.professor}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-[10px] uppercase font-bold">Membership</p>
                <p className="font-semibold text-richblack dark:text-neutral-200">{profile.membershipDuration}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActivePage('profile')}
                className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold transition-all"
                title="View full profile"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Professor Information Card (Section 5) */}
          <section className="p-6 rounded-2xl bg-gradient-to-br from-champagne-100/70 via-ivory to-white dark:from-neutral-800/80 dark:via-neutral-900 dark:to-neutral-900 border border-champagne-300 dark:border-neutral-700/80 shadow-luxury">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-full bg-richblack dark:bg-burgundy text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm">
                B
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
                  Professor Burzin
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Professor / Student Mentor
                </p>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {support.status === 'online' ? '● Available in Support' : '○ Support taking short break'}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              Oversees curriculum mastery, capstone project critiques, and student eligibility verifications across the CLAUDE × SHEIN academic portal.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => contactProfessor('Advisory consultation with Professor Burzin')}
                className="w-full py-2.5 px-4 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Headphones className="w-3.5 h-3.5" />
                Contact Professor
              </button>
              <button
                onClick={() => setActivePage('courses')}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-neutral-200 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                View Learning Progress
              </button>
            </div>
          </section>

          {/* Support Status Card */}
          <section className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Support Availability
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  support.status === 'online'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                {support.status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {support.status === 'online'
                ? 'Support is now online. Simulated assistant replies are active.'
                : 'Support is currently offline. Our support team is taking a short break. Please check back later.'}
            </p>

            {support.status !== 'online' && (
              <p className="mt-2 text-xs font-mono text-burgundy font-semibold">
                Available in: {supportCountdown}
              </p>
            )}

            <button
              onClick={() => setActivePage('support')}
              className="mt-3 w-full py-2 text-xs font-semibold text-center text-burgundy dark:text-champagne-300 hover:underline"
            >
              Open Support Center &rarr;
            </button>
          </section>

          {/* Quick Honors Preview */}
          <section className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-bold text-sm text-richblack dark:text-ivory-100">
                Honors & Badges
              </h4>
              <button
                onClick={() => setActivePage('achievements')}
                className="text-xs text-burgundy dark:text-champagne-300 hover:underline font-medium"
              >
                View all (6)
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {achievements.slice(0, 3).map((ach: Achievement) => (
                <div
                  key={ach.id}
                  onClick={() => setActiveAchievementModal(ach)}
                  className="p-2.5 rounded-xl bg-champagne-50/50 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-700/60 text-center cursor-pointer hover:scale-105 transition-transform"
                  title={ach.title}
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy dark:bg-burgundy/20 dark:text-burgundy-200 mx-auto flex items-center justify-center mb-1">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-semibold text-richblack dark:text-neutral-200 truncate">
                    {ach.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
