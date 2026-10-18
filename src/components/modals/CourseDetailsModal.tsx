import React, { useState } from 'react';
import { X, CheckCircle2, Award, Download, Clock, Layers } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import confetti from 'canvas-confetti';

export const CourseDetailsModal: React.FC = () => {
  const { activeCourseModal, setActiveCourseModal } = usePortal();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!activeCourseModal) return null;

  const handleDownloadCertificate = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8D2635', '#E8DDCF', '#171717', '#FAF9F6'],
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl border border-champagne-300 dark:border-neutral-800 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-champagne-100/80 via-ivory to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-900 border-b border-champagne-200 dark:border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-burgundy/10 text-burgundy dark:bg-burgundy/20 dark:text-burgundy-200 rounded-full border border-burgundy/20">
                {activeCourseModal.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Completed (100%)
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-richblack dark:text-ivory-100">
              {activeCourseModal.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Lead Instructor: Professor {activeCourseModal.instructor} • {activeCourseModal.completionDateNotice}
            </p>
          </div>
          <button
            onClick={() => setActiveCourseModal(null)}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/60 border border-champagne-200 dark:border-neutral-800 text-center">
            <div>
              <p className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                Total Hours
              </p>
              <p className="text-base font-serif font-bold text-richblack dark:text-ivory-100 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-burgundy" />
                {activeCourseModal.durationHours}h
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                Modules
              </p>
              <p className="text-base font-serif font-bold text-richblack dark:text-ivory-100 flex items-center justify-center gap-1 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-burgundy" />
                {activeCourseModal.modulesCount}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                Final Grade
              </p>
              <p className="text-base font-serif font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                {activeCourseModal.gradeAchieved}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                Progress
              </p>
              <p className="text-base font-serif font-bold text-burgundy flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100%
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5">
              Course Overview
            </h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {activeCourseModal.description}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2.5">
              Key Learning Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeCourseModal.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Syllabus */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2.5">
              Syllabus & Milestones
            </h4>
            <div className="space-y-2">
              {activeCourseModal.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-champagne-50/40 dark:bg-neutral-800/40 border border-champagne-200/50 dark:border-neutral-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-burgundy/10 text-burgundy dark:bg-burgundy/20 dark:text-burgundy-200 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {item}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    Mastered
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Credential Box */}
          <div className="p-4 rounded-xl border border-dashed border-champagne-400 dark:border-neutral-700 bg-champagne-50/50 dark:bg-neutral-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-champagne-200 dark:bg-neutral-700 flex items-center justify-center text-burgundy dark:text-champagne-200">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-richblack dark:text-ivory-100">
                  Official Completion Credential
                </p>
                <p className="text-[11px] text-neutral-500 font-mono">
                  {activeCourseModal.certificateId}
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadCertificate}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              {downloadSuccess ? 'Certificate Verified!' : 'View Credential'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
          <button
            onClick={() => setActiveCourseModal(null)}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
