import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

interface SheinBannerProps {
  variant?: 'dashboard' | 'compact' | 'editorial';
}

export const SheinBanner: React.FC<SheinBannerProps> = ({ variant = 'dashboard' }) => {
  const { contactProfessor, setActivePage } = usePortal();

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FAF9F6] via-[#F4EFE7] to-[#FAF9F6] dark:from-[#1E1C1A] dark:via-[#26221E] dark:to-[#1E1C1A] border border-champagne-300 dark:border-champagne-900/60 shadow-luxury transition-all duration-300 hover:shadow-luxury-hover group">
      {/* Subtle luxury watermark / geometric accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none overflow-hidden select-none flex items-center justify-center">
        <span className="font-serif text-[180px] font-black tracking-tighter text-burgundy dark:text-champagne-200">
          ×
        </span>
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          {/* Tag & Policy indicator */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-burgundy/10 text-burgundy dark:bg-burgundy/20 dark:text-burgundy-200 border border-burgundy/20">
              <Sparkles className="w-3.5 h-3.5" />
              SHEIN × Student Benefit
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Academic Policy Benefit
            </span>
          </div>

          {/* Banner Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
            Your Style. Your Rewards.
          </h2>

          {/* Required Banner Text */}
          <p className="text-base sm:text-lg font-medium text-richblack/90 dark:text-neutral-200">
            You will get free clothes from SHEIN as per our policy.
          </p>

          {/* Required Supporting Text */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Your clothing benefits are subject to the applicable policy and eligibility requirements. Connect with Professor Burzin in the Support Center to verify cohort terms and review fulfillment schedules.
          </p>
        </div>

        {/* Action Button & Details Link */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto flex-shrink-0">
          <button
            onClick={() => contactProfessor('Inquiry regarding SHEIN student clothing benefits policy')}
            className="px-6 py-3.5 rounded-xl bg-burgundy hover:bg-burgundy-600 active:bg-burgundy-700 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn"
          >
            <span>Contact Your Professor</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>

          {variant === 'dashboard' && (
            <button
              onClick={() => setActivePage('rewards')}
              className="text-xs text-neutral-600 hover:text-burgundy dark:text-neutral-400 dark:hover:text-champagne-300 transition-colors font-medium text-center py-1"
            >
              View Full Policy & Tiers &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
