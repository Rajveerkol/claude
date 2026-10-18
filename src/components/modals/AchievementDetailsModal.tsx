import React from 'react';
import { X, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const AchievementDetailsModal: React.FC = () => {
  const { activeAchievementModal, setActiveAchievementModal } = usePortal();

  if (!activeAchievementModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl border border-champagne-300 dark:border-neutral-800 overflow-hidden text-center p-6">
        <button
          onClick={() => setActiveAchievementModal(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon Emblem */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-champagne-200 via-champagne-300 to-burgundy-100 dark:from-neutral-700 dark:to-burgundy-900 flex items-center justify-center shadow-luxury border-2 border-champagne-300 dark:border-champagne-800 mb-4 animate-slide-up">
          <Award className="w-10 h-10 text-burgundy dark:text-champagne-200" />
        </div>

        {/* Badge category tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-burgundy/10 text-burgundy dark:bg-burgundy/20 dark:text-burgundy-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          {activeAchievementModal.category} Honor
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-2xl text-richblack dark:text-ivory-100 mb-2">
          {activeAchievementModal.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
          {activeAchievementModal.description}
        </p>

        {/* Criteria & Credential Card */}
        <div className="p-4 rounded-xl bg-champagne-50/70 dark:bg-neutral-800/60 border border-champagne-200 dark:border-neutral-800 text-left space-y-2 mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Award Criteria
            </p>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-0.5">
              {activeAchievementModal.criteria}
            </p>
          </div>

          <div className="pt-2 border-t border-champagne-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Award Status</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified & Earned
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Registry Code</span>
            <span className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
              {activeAchievementModal.certificateCode}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveAchievementModal(null)}
          className="w-full py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold shadow-sm transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};
