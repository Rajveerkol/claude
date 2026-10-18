import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Filter,
  Sparkles,
  Award,
  Layers,
  Clock,
  Compass,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { Course } from '../types';

export const CoursesPage: React.FC = () => {
  const { courses, setActiveCourseModal } = usePortal();

  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Programming', 'Design', 'Business'];

  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      // Tab filter
      if (activeTab === 'in-progress' && course.status !== 'In Progress') return false;
      if (activeTab === 'completed' && course.status !== 'Completed') return false;

      // Category filter
      if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchCategory = course.category.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchDesc) return false;
      }

      return true;
    });
  }, [courses, activeTab, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Header Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curriculum Registry
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
            My Learning
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
            Track your progress and celebrate what you've completed.
          </p>
        </div>

        {/* Tabs, Search & Filters */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Working Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-burgundy dark:text-champagne-200 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-richblack dark:hover:text-white'
              }`}
            >
              All Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'in-progress'
                  ? 'bg-white dark:bg-neutral-900 text-burgundy dark:text-champagne-200 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-richblack dark:hover:text-white'
              }`}
            >
              In Progress (0)
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'completed'
                  ? 'bg-white dark:bg-neutral-900 text-burgundy dark:text-champagne-200 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-richblack dark:hover:text-white'
              }`}
            >
              Completed ({courses.filter((c: Course) => c.status === 'Completed').length})
            </button>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            {/* Category Filter Select */}
            <div className="relative">
              <Filter className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-8 pr-8 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 font-medium focus:outline-none focus:ring-2 focus:ring-burgundy/40 appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Course Cards Grid */}
      <section>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((course: Course) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-champagne-100 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 rounded-full border border-champagne-200 dark:border-neutral-700">
                      {course.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100 group-hover:text-burgundy transition-colors mb-2">
                    {course.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Meta specs */}
                  <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {course.durationHours} Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-neutral-400" />
                      {course.modulesCount} Modules
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                      <Award className="w-3.5 h-3.5" />
                      {course.gradeAchieved}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 mb-5">
                    <div className="flex justify-between text-[11px] font-medium text-neutral-500">
                      <span>Curriculum Progress</span>
                      <span className="text-burgundy font-bold">100%</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-burgundy h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* View Details Action Button */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Instructor: Prof. {course.instructor}
                  </span>
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="px-4 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-burgundy" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 text-center">
            <Compass className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
            <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
              No matching courses found
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        )}
      </section>

      {/* 3. Empty State Prominently Beneath Completed Courses (REQUIRED) */}
      <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-champagne-50/50 via-white to-ivory dark:from-neutral-900 dark:via-[#1A1A1A] dark:to-neutral-900 border border-dashed border-champagne-400 dark:border-neutral-800 text-center max-w-3xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-champagne-200/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 mx-auto flex items-center justify-center mb-4 ring-8 ring-champagne-100/50 dark:ring-neutral-800/40">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-richblack dark:text-ivory-100 mb-2">
          No New Courses Yet
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
          You've completed your current learning collection. New learning opportunities will appear here when available.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          4 of 4 Foundational Modules Mastered with Distinction
        </div>
      </section>
    </div>
  );
};
