import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  CalendarCheck2,
  GraduationCap,
  Flame,
  Gem,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { Achievement } from '../types';

export const AchievementsPage: React.FC = () => {
  const { achievements, setActiveAchievementModal } = usePortal();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Attendance', 'Milestone', 'Academic', 'Excellence'];

  const filteredAchievements = achievements.filter((ach: Achievement) => {
    if (filterCategory === 'All') return true;
    return ach.category === filterCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return Award;
      case 'CalendarCheck2':
        return CalendarCheck2;
      case 'GraduationCap':
        return GraduationCap;
      case 'Flame':
        return Flame;
      case 'Gem':
        return Gem;
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
              <Award className="w-3.5 h-3.5" />
              Honors & Distinctions
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Student Achievements
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Celebrating verified milestones across attendance, coursework, and academy commitment.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-champagne-100/70 dark:bg-neutral-800 border border-champagne-300 dark:border-neutral-700">
            <Sparkles className="w-4 h-4 text-burgundy" />
            <span className="text-xs font-bold text-richblack dark:text-ivory-100">
              {achievements.filter((a: Achievement) => a.earned).length} of {achievements.length} Badges Unlocked
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Badge Grid (Section 10) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((badge: Achievement) => {
          const Icon = getIcon(badge.icon);

          return (
            <div
              key={badge.id}
              onClick={() => setActiveAchievementModal(badge)}
              className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Emblem & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne-100 via-champagne-200 to-burgundy-100 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center shadow-sm text-burgundy dark:text-champagne-200 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Earned
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                  {badge.category}
                </div>

                <h3 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100 group-hover:text-burgundy transition-colors mb-2">
                  {badge.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400 font-mono">
                  {badge.earnedDateNotice}
                </span>
                <span className="text-burgundy dark:text-champagne-300 font-semibold flex items-center gap-1 group-hover:underline">
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
