import React, { useState } from 'react';
import {
  Gift,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Headphones,
  Check,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { SheinBanner } from '../components/common/SheinBanner';
import type { RewardBenefit } from '../types';

export const RewardsPage: React.FC = () => {
  const { rewards, contactProfessor, profile } = usePortal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the SHEIN student clothing benefit policy work?',
      a: 'Under the CLAUDE × SHEIN academic portal guidelines, qualifying enrolled students in good academic standing are eligible for complimentary clothing benefits. All clothing benefits are subject to the applicable policy and eligibility requirements.',
    },
    {
      q: 'How do I confirm my eligibility and receive my wardrobe benefits?',
      a: 'To confirm eligibility, click "Contact Your Professor". Professor Burzin verifies academic standing (such as your 100% attendance record and completed coursework) and guides you through the fulfillment protocol.',
    },
    {
      q: 'Are delivery dates and piece quantities guaranteed?',
      a: 'No. Delivery schedules, wardrobe allocations, and capsule styles are governed strictly by the active portal terms and cohort availability. Contact Professor Burzin to discuss applicable terms.',
    },
    {
      q: 'What prerequisites must I maintain to remain eligible?',
      a: 'Students must maintain an Active student status, attend scheduled curriculum sessions (your attendance is currently 100%), and complete core academic coursework.',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Page Header */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
            <Gift className="w-3.5 h-3.5" />
            Atelier Privileges
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
            Rewards & Benefits
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
            Exclusive editorial perks, styling stipends, and wardrobe privileges for CLAUDE × SHEIN students.
          </p>
        </div>
      </section>

      {/* 2. Prominent SHEIN Clothing Benefits Banner (Section 8) */}
      <SheinBanner variant="editorial" />

      {/* 3. Student Eligibility Status Card */}
      <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Student Eligibility Verification
            </span>
            <h3 className="font-serif font-bold text-2xl text-richblack dark:text-ivory-100 mt-1">
              {profile.name} — Qualified Candidate
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified Student ID: {profile.studentId} • Mentor: Professor {profile.professor}
            </p>
          </div>

          <button
            onClick={() => contactProfessor('Student benefits eligibility confirmation')}
            className="px-5 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Headphones className="w-4 h-4" />
            Discuss Terms with Prof. Burzin
          </button>
        </div>

        {/* 3 Qualification criteria checkmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-emerald-500 text-white">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                100% Attendance Verified
              </p>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400 mt-0.5">
                30 of 30 sessions recorded present with Professor Burzin.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-emerald-500 text-white">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                Core Curriculum Mastered
              </p>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400 mt-0.5">
                All 4 foundational courses completed with distinction.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-emerald-500 text-white">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                1-Year Membership Standing
              </p>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400 mt-0.5">
                Continuous active student status maintained for 12 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Rewards & Benefits Catalog Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="font-serif font-bold text-2xl text-richblack dark:text-ivory-100">
            Available Benefits Collection
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Select a benefit below to review specific policy guidelines or inquire with faculty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((benefit: RewardBenefit) => (
            <div
              key={benefit.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-champagne-100 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 rounded-full border border-champagne-200 dark:border-neutral-700">
                    {benefit.tier}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {benefit.status}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100 group-hover:text-burgundy transition-colors mb-2">
                  {benefit.title}
                </h4>

                <p className="text-xs font-semibold text-burgundy dark:text-champagne-300 mb-2">
                  {benefit.highlight}
                </p>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {benefit.description}
                </p>

                {/* Policy note disclosure */}
                <div className="p-3 rounded-xl bg-champagne-50/50 dark:bg-neutral-900/40 border border-champagne-200/60 dark:border-neutral-800 text-[11px] text-neutral-500 leading-relaxed mb-4">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Policy: </span>
                  {benefit.policyNotes}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  {benefit.category}
                </span>
                <button
                  onClick={() => contactProfessor(`Inquiry regarding ${benefit.title}`)}
                  className="px-4 py-2 rounded-xl bg-richblack hover:bg-neutral-800 dark:bg-ivory-100 dark:hover:bg-white text-white dark:text-richblack text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-champagne-300 dark:text-burgundy" />
                  {benefit.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Policy Guidelines FAQ Accordion */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-burgundy" />
          <div>
            <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
              Student Benefit Policy Guidelines
            </h3>
            <p className="text-xs text-neutral-500">
              Frequently asked questions regarding wardrobe capsules and eligibility
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-champagne-200/80 dark:border-neutral-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-champagne-50/30 dark:bg-neutral-800/40 hover:bg-champagne-50/70 transition-colors"
                >
                  <span className="font-serif font-semibold text-xs sm:text-sm text-richblack dark:text-ivory-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-180 text-burgundy' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed bg-white dark:bg-[#1A1A1A] border-t border-neutral-100 dark:border-neutral-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
