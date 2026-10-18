import React from 'react';
import {
  User,
  CreditCard,
  Award,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Edit3,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { Course, Achievement } from '../types';

export const ProfilePage: React.FC = () => {
  const {
    profile,
    courses,
    achievements,
    setIsEditProfileOpen,
    contactProfessor,
    setActivePage,
    idPhoto,
  } = usePortal();

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <User className="w-3.5 h-3.5" />
              Student Dossier
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Student Profile
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Academic credentials, faculty mentor assignment, and cohort verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActivePage('id-card')}
              className="px-4 py-2.5 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs sm:text-sm font-semibold transition-all border border-champagne-300 dark:border-neutral-700 flex items-center justify-center gap-2 shadow-sm"
            >
              <CreditCard className="w-4 h-4 text-burgundy" />
              View Digital Student ID
            </button>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* 2. Premium Student Profile Card (Section 3) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-champagne-50/40 to-ivory dark:from-[#1E1E1E] dark:via-[#1A1A1A] dark:to-[#161616] border border-champagne-300 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-champagne-200/80 dark:border-neutral-800">
          {/* Avatar & Key Identifiers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-burgundy text-white font-serif font-bold text-3xl flex items-center justify-center shadow-lg ring-4 ring-champagne-200 dark:ring-neutral-700 select-none">
                {idPhoto ? (
                  <img
                    src={idPhoto}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  profile.initials || 'RK'
                )}
              </div>
              <span
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-3 border-white dark:border-[#1E1E1E]"
                title="Active Student Status"
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-richblack dark:text-ivory-100">
                  {profile.name}
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-burgundy text-white rounded-full">
                  {profile.role}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {profile.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {profile.major} • ID: <span className="font-mono">{profile.studentId}</span>
              </p>

              <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 pt-1">
                <span>{profile.joinedNotice}</span>
                <span>•</span>
                <span>Academic Division: Upper Division Atelier</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-champagne-200 dark:border-neutral-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Attendance
              </p>
              <p className="text-lg font-serif font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                {profile.attendance}%
              </p>
              <p className="text-[10px] text-neutral-400">30 / 30 Sessions</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-champagne-200 dark:border-neutral-700 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Membership
              </p>
              <p className="text-lg font-serif font-bold text-richblack dark:text-ivory-100 mt-0.5">
                {profile.membershipDuration}
              </p>
              <p className="text-[10px] text-neutral-400">Good Standing</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-champagne-200 dark:border-neutral-700 text-center col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Professor
              </p>
              <p className="text-lg font-serif font-bold text-burgundy dark:text-champagne-200 mt-0.5">
                {profile.professor}
              </p>
              <p className="text-[10px] text-neutral-400">Faculty Mentor</p>
            </div>
          </div>
        </div>

        {/* Bio statement */}
        <div className="pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Academic Focus & Statement
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
            "{profile.bio}"
          </p>
        </div>
      </section>

      {/* 3. Detailed Academic Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Completed Curricula & Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Completed Courses Record */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
                  Completed Academic Collection
                </h3>
                <p className="text-xs text-neutral-500">
                  4 core courses completed with distinction under Professor Burzin
                </p>
              </div>
              <button
                onClick={() => setActivePage('courses')}
                className="text-xs font-semibold text-burgundy dark:text-champagne-300 hover:underline"
              >
                View Catalog &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {courses.map((c: Course) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-xs sm:text-sm text-richblack dark:text-ivory-100">
                        {c.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {c.category} • {c.durationHours} Hours • Grade {c.gradeAchieved}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-champagne-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {c.certificateId}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Unlocked Honors Showcase */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
                  Honors & Badges Showcase
                </h3>
                <p className="text-xs text-neutral-500">
                  Official badge registry recognized by the CLAUDE × SHEIN academy
                </p>
              </div>
              <button
                onClick={() => setActivePage('achievements')}
                className="text-xs font-semibold text-burgundy dark:text-champagne-300 hover:underline"
              >
                All Badges &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((ach: Achievement) => (
                <div
                  key={ach.id}
                  className="p-3.5 rounded-xl bg-champagne-50/40 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-800 text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy mx-auto flex items-center justify-center mb-1.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="font-serif font-semibold text-xs text-richblack dark:text-ivory-100 truncate">
                    {ach.title}
                  </p>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-0.5">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Faculty Mentor Card & Contact Details */}
        <div className="space-y-6">
          {/* Assigned Faculty Mentor Card */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-full bg-richblack dark:bg-burgundy text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm">
                B
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
                  Professor {profile.professor}
                </h4>
                <p className="text-xs text-neutral-500">
                  Assigned Faculty Mentor
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Mentoring Rajveer Kol across web technology, design architecture, and SHEIN wardrobe benefit qualification.
            </p>

            <button
              onClick={() => contactProfessor('Mentorship consultation')}
              className="w-full py-2.5 px-4 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Headphones className="w-3.5 h-3.5" />
              Contact Professor
            </button>
          </section>

          {/* Student Contact & Registry Details */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-3">
            <h4 className="font-serif font-bold text-sm text-richblack dark:text-ivory-100">
              Registry Information
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Date of Birth:</span>
                <span className="font-mono font-medium text-richblack dark:text-neutral-200">11/06/2012</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Email:</span>
                <span className="font-medium text-richblack dark:text-neutral-200">{profile.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Phone:</span>
                <span className="font-medium text-richblack dark:text-neutral-200">{profile.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Academic Standing:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Distinction Honors</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Attendance:</span>
                <span className="font-semibold text-richblack dark:text-neutral-200">100% (30 Sessions)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Wardrobe Eligibility:</span>
                <span className="font-semibold text-burgundy dark:text-champagne-300">Policy Qualified</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="mt-3 w-full py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold transition-all"
            >
              Update Preferences
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
