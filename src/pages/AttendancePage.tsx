import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  UserCheck,
  Building,
  Sparkles,
  Inbox,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { AttendanceRecord } from '../types';

export const AttendancePage: React.FC = () => {
  const { attendance, profile } = usePortal();

  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const months = ['All', 'October', 'September', 'August', 'July', 'June'];

  const filteredAttendance = useMemo(() => {
    return attendance.filter((item: AttendanceRecord) => {
      if (selectedMonth !== 'All' && item.month !== selectedMonth) return false;
      if (selectedStatus !== 'All' && item.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTopic = item.topic.toLowerCase().includes(q);
        const matchRoom = item.room.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchTopic && !matchRoom && !matchCategory) return false;
      }
      return true;
    });
  }, [attendance, selectedMonth, selectedStatus, searchQuery]);

  // Compute metrics
  const totalSessions = attendance.length;
  const presentSessions = attendance.filter((a: AttendanceRecord) => a.status === 'Present').length;
  const absentSessions = attendance.filter((a: AttendanceRecord) => a.status === 'Absent').length;
  const attendanceRate = totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 100;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Page Header */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Academic Attendance Register
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Attendance Records
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Verified session presence records under Lead Professor {profile.professor}.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Perfect Record</p>
              <p className="text-sm font-serif font-bold">100% Distinction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full Attendance Dashboard Key Metrics (Section 7) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Overall Attendance
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {attendanceRate}%
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Flawless Cohort Record
          </p>
        </div>

        {/* Present Sessions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Present Sessions
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-richblack dark:text-ivory-100">
            {presentSessions} Sessions
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            All Sessions Verified Present
          </p>
        </div>

        {/* Absent Sessions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Absent Sessions
            </span>
            <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-richblack dark:text-ivory-100">
            {absentSessions} Sessions
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Zero Unexcused Absences
          </p>
        </div>

        {/* Attendance Rate Indicator Gauge */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Rate Indicator
            </span>
            <span className="text-xs font-bold text-burgundy">Top 1%</span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden my-2">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
          <p className="text-[11px] text-neutral-500">
            Status: Fully Qualified for SHEIN Honors
          </p>
        </div>
      </section>

      {/* 3. Weekly Attendance Matrix Visualization */}
      <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
              Cohort Attendance Visualization
            </h3>
            <p className="text-xs text-neutral-500">
              Session presence distribution across 30 curriculum meetings
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <span className="w-3 h-3 rounded-md bg-emerald-500" /> Present (30)
            </span>
            <span className="inline-flex items-center gap-1 text-neutral-400">
              <span className="w-3 h-3 rounded-md bg-neutral-200 dark:bg-neutral-700" /> Absent (0)
            </span>
          </div>
        </div>

        {/* 30-session interactive grid blocks */}
        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-15 gap-2">
          {attendance.map((rec: AttendanceRecord) => (
            <div
              key={rec.id}
              className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center hover:scale-105 transition-transform group cursor-pointer relative"
              title={`Session ${rec.sessionNumber}: ${rec.topic} (${rec.date})`}
            >
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 block font-bold">
                S{rec.sessionNumber}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mx-auto mt-0.5" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Attendance History List with Date & Month Filters */}
      <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-4">
        {/* Filters Header */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
              Attendance History
            </h3>
            <p className="text-xs text-neutral-500">
              Showing {filteredAttendance.length} of {attendance.length} session logs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topic or room..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            {/* Month Filter Selector */}
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400 pointer-events-none" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-8 pr-8 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 font-medium focus:outline-none focus:ring-2 focus:ring-burgundy/40 appearance-none cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m === 'All' ? 'All Months' : m}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter Selector */}
            <div className="relative">
              <Filter className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400 pointer-events-none" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-8 pr-8 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 font-medium focus:outline-none focus:ring-2 focus:ring-burgundy/40 appearance-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Present">Present Only</option>
                <option value="Absent">Absent Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* History Table / Records */}
        {filteredAttendance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  <th className="py-3 px-3">Session</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Curriculum Topic</th>
                  <th className="py-3 px-3">Instructor</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Faculty Note</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {filteredAttendance.map((rec: AttendanceRecord) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-champagne-50/40 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-neutral-600 dark:text-neutral-400">
                      #{rec.sessionNumber.toString().padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <p className="font-semibold text-richblack dark:text-ivory-100">{rec.date}</p>
                      <p className="text-[10px] text-neutral-500">{rec.time}</p>
                    </td>
                    <td className="py-3.5 px-3 max-w-xs">
                      <p className="font-medium text-richblack dark:text-neutral-200">
                        {rec.topic}
                      </p>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                        {rec.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-neutral-600 dark:text-neutral-300">
                      Prof. {rec.professor}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-neutral-500">
                      <span className="inline-flex items-center gap-1">
                        <Building className="w-3 h-3 text-neutral-400" />
                        {rec.room}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-neutral-500 dark:text-neutral-400 italic max-w-xs truncate">
                      "{rec.notes}"
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-2">
            <Inbox className="w-10 h-10 mx-auto text-neutral-400" />
            <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
              No attendance records match your filter
            </h4>
            <p className="text-xs text-neutral-500">
              Please reset your search term, month selector, or status filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
