import React, { useState, useRef } from 'react';
import {
  Download,
  Printer,
  Upload,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRightLeft,
  Check,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { compressImage } from '../utils/storage';

export const StudentIdPage: React.FC = () => {
  const { profile, idPhoto, updateIdPhoto, resetIdPhoto } = usePortal();

  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [cardTheme, setCardTheme] = useState<'ivory' | 'obsidian'>('ivory');
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file, 800, 0.88);
      updateIdPhoto(compressedDataUrl);
      showToast('Student photograph updated and saved locally!');
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#8D2635', '#E8DDCF', '#171717'],
      });
    } catch (err) {
      console.error('Error processing uploaded image:', err);
      showToast('Could not process the selected image.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle Reset Photo
  const handleResetPhoto = () => {
    resetIdPhoto();
    showToast('Student photo reset to initial portrait.');
  };

  // Handle Download as PNG
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      // Small pause to ensure images and fonts are fully settled
      await new Promise((res) => setTimeout(res, 150));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High-resolution export
        backgroundColor: cardTheme === 'ivory' ? '#FAF9F6' : '#141414',
      });

      const link = document.createElement('a');
      link.download = `CLAUDE_SHEIN_ID_${profile.name.replace(/\s+/g, '_')}_${activeSide}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8D2635', '#E8DDCF', '#171717', '#FAF9F6'],
      });

      showToast(`Student ID (${activeSide.toUpperCase()}) exported as high-resolution PNG!`);
    } catch (error) {
      console.error('Failed to export ID card image:', error);
      showToast('Failed to generate image download. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Print
  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* 1. Header Section */}
      <section className="no-print p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Institutional Credential
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              My Student ID Card
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Official digital student identification card for the CLAUDE × SHEIN learning portal.
            </p>
          </div>

          {/* Quick status feedback toast */}
          {feedbackToast && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              {feedbackToast}
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          {/* Card View Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSide('front')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSide === 'front'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              Front Side
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSide === 'back'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              Back Side
            </button>

            {/* Theme switcher for card */}
            <div className="hidden sm:flex items-center ml-2 pl-3 border-l border-neutral-200 dark:border-neutral-700 gap-1.5 text-xs text-neutral-500">
              <span>Card Finish:</span>
              <button
                onClick={() => setCardTheme('ivory')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                  cardTheme === 'ivory'
                    ? 'bg-[#FAF9F6] text-richblack border-champagne-400 shadow-sm'
                    : 'text-neutral-400 border-transparent hover:text-neutral-700'
                }`}
              >
                Ivory Atelier
              </button>
              <button
                onClick={() => setCardTheme('obsidian')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                  cardTheme === 'obsidian'
                    ? 'bg-[#171717] text-ivory-100 border-neutral-600 shadow-sm'
                    : 'text-neutral-400 border-transparent hover:text-neutral-700'
                }`}
              >
                Obsidian Noir
              </button>
            </div>
          </div>

          {/* Action Buttons: Download, Print, Photo Upload */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center gap-1.5"
              title="Upload your photograph for this ID card"
            >
              <Upload className="w-3.5 h-3.5 text-burgundy" />
              Change Photo
            </button>

            <button
              onClick={handleResetPhoto}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all"
              title="Reset photo to original portrait"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrintCard}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-richblack dark:text-neutral-200 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center gap-1.5 shadow-sm"
              title="Print standard credit-card sized ID"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
              Print ID Card
            </button>

            <button
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-burgundy hover:bg-burgundy-600 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              {isDownloading ? 'Generating PNG...' : 'Download ID Card (PNG)'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive ID Card Display Container */}
      <div className="print-only-card-wrapper flex flex-col items-center justify-center p-4 sm:p-8">
        {/* The Card Element */}
        <div
          ref={cardRef}
          className={`id-card-element relative w-full max-w-[620px] rounded-3xl overflow-hidden border transition-all duration-300 shadow-2xl ${
            cardTheme === 'ivory'
              ? 'bg-[#FAF9F6] text-[#171717] border-[#E8DDCF]'
              : 'bg-[#161616] text-[#FAF9F6] border-[#2E2E2E]'
          }`}
          style={{ minHeight: '380px' }}
        >
          {/* Subtle Guilloche / Geometric lattice background pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] select-none"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2%, transparent 0%), radial-gradient(circle at 75px 75px, currentColor 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
            }}
          />

          {/* Luxury Metallic Holographic Foil Strip Accent on top edge */}
          <div className="h-2 w-full bg-gradient-to-r from-[#8D2635] via-[#E8DDCF] via-[#B29272] to-[#8D2635]" />

          {activeSide === 'front' ? (
            /* ================= FRONT SIDE ================= */
            <div className="p-6 sm:p-8 relative flex flex-col justify-between h-full min-h-[380px]">
              {/* Card Header Bar */}
              <div className="flex items-start justify-between border-b pb-4 border-[#E8DDCF]/70 dark:border-neutral-800">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif tracking-widest text-lg sm:text-xl font-bold uppercase text-richblack dark:text-ivory-100">
                      CLAUDE
                    </span>
                    <span className="text-[#8D2635] font-light text-base select-none px-0.5">
                      ×
                    </span>
                    <span className="font-sans tracking-[0.22em] text-sm sm:text-base font-semibold uppercase text-neutral-800 dark:text-neutral-200">
                      SHEIN
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                    Haute Couture Academic Atelier • Student Identification
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8D2635] text-white shadow-sm">
                    STUDENT
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>

              {/* Card Body: Left Photo + Right Details */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
                {/* Left: Photograph Frame */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-[#E8DDCF] to-[#8D2635]/30 shadow-md">
                    <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">
                      <img
                        src={idPhoto}
                        alt="Rajveer Kol"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          // Fallback to initials if image ever fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    {/* Subtle Holographic security watermark badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-[#E8DDCF] to-white dark:to-neutral-900 border border-[#8D2635]/40 shadow-sm flex items-center justify-center text-[10px] font-serif font-black text-[#8D2635]">
                      C×S
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] font-mono tracking-wider uppercase text-neutral-400">
                    ID: {profile.studentId}
                  </p>
                </div>

                {/* Right: Student Information Details */}
                <div className="sm:col-span-7 space-y-3.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                      Full Student Name
                    </span>
                    <h2 className="font-serif text-2xl font-bold tracking-tight text-richblack dark:text-ivory-100 leading-tight">
                      {profile.name}
                    </h2>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {profile.major}
                    </p>
                  </div>

                  {/* 2-Column Info Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs pt-1 border-t border-neutral-200/60 dark:border-neutral-800">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Date of Birth
                      </span>
                      {/* REQUIRED: Exactly 11/06/2012 */}
                      <span className="font-semibold text-richblack dark:text-ivory-100 font-mono text-sm">
                        {profile.dob || '11/06/2012'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Role
                      </span>
                      <span className="font-semibold text-richblack dark:text-ivory-100">
                        {profile.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Faculty Mentor
                      </span>
                      <span className="font-semibold text-richblack dark:text-ivory-100">
                        Prof. {profile.professor}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Attendance
                      </span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {profile.attendance}% Verified
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Membership
                      </span>
                      <span className="font-semibold text-richblack dark:text-ivory-100">
                        {profile.membershipDuration}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 block">
                        Institute
                      </span>
                      <span className="font-semibold text-burgundy dark:text-champagne-300">
                        CLAUDE × SHEIN
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Reference Number + Design QR Code */}
              <div className="pt-3 border-t border-[#E8DDCF]/70 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  {/* Clean SVG Vector QR Design Element */}
                  <div
                    className="p-1 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center"
                    title="Design element for digital student identification"
                  >
                    <svg
                      viewBox="0 0 40 40"
                      className="w-8 h-8 text-richblack dark:text-ivory-100 fill-current"
                    >
                      {/* Stylized QR Matrix Pattern */}
                      <rect x="0" y="0" width="12" height="12" rx="2" />
                      <rect x="2" y="2" width="8" height="8" fill="#FAF9F6" />
                      <rect x="4" y="4" width="4" height="4" />

                      <rect x="28" y="0" width="12" height="12" rx="2" />
                      <rect x="30" y="2" width="8" height="8" fill="#FAF9F6" />
                      <rect x="32" y="4" width="4" height="4" />

                      <rect x="0" y="28" width="12" height="12" rx="2" />
                      <rect x="2" y="30" width="8" height="8" fill="#FAF9F6" />
                      <rect x="4" y="32" width="4" height="4" />

                      <rect x="16" y="4" width="4" height="4" />
                      <rect x="22" y="4" width="4" height="4" />
                      <rect x="16" y="10" width="4" height="4" />
                      <rect x="16" y="16" width="8" height="8" fill="#8D2635" rx="1" />
                      <rect x="4" y="16" width="4" height="4" />
                      <rect x="10" y="22" width="4" height="4" />
                      <rect x="28" y="16" width="4" height="4" />
                      <rect x="34" y="22" width="4" height="4" />
                      <rect x="16" y="28" width="4" height="4" />
                      <rect x="22" y="34" width="4" height="4" />
                      <rect x="28" y="28" width="4" height="4" />
                      <rect x="34" y="34" width="4" height="4" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono uppercase font-bold text-neutral-600 dark:text-neutral-300 block">
                      REF: CS-8842-RK
                    </span>
                    <span className="text-[9px] text-neutral-400">
                      Visual QR Token • Academic Session 2025–2027
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#8D2635] dark:text-[#E8DDCF] block">
                    CLAUDE × SHEIN
                  </span>
                  <span className="text-[9px] text-neutral-400">
                    Official Student Identifier
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* ================= BACK SIDE ================= */
            <div className="p-6 sm:p-8 relative flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Magnetic tape visual bar */}
                <div className="-mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 h-12 bg-neutral-900 border-b border-neutral-700 flex items-center px-6">
                  <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                    MAGNETIC ATELIER CREDENTIAL ENCODED • CS-ATELIER-2025
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">
                  <span className="font-serif text-sm font-bold tracking-widest uppercase text-richblack dark:text-ivory-100">
                    CLAUDE <span className="text-burgundy">×</span> SHEIN
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    CARD ID: CS-2025-8842
                  </span>
                </div>

                {/* Terms & Guidance */}
                <div className="mt-4 space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <p>
                    <strong className="text-richblack dark:text-ivory-100">Terms of Portal Use:</strong> This digital credential confirms that the holder, <span className="underline decoration-burgundy font-semibold">Rajveer Kol</span>, is an active enrolled student within the CLAUDE × SHEIN curriculum under the mentorship of <span className="font-semibold">Professor Burzin</span>.
                  </p>
                  <p>
                    <strong className="text-richblack dark:text-ivory-100">Wardrobe Privileges:</strong> Active status and verified 100% attendance entitle the holder to SHEIN student clothing benefits in accordance with established portal policy. Contact Professor Burzin in the Support Center for term eligibility discussions.
                  </p>
                </div>
              </div>

              {/* Barcode & Signature Strip */}
              <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-400">Student Signature</span>
                  <span className="font-serif italic text-base text-richblack dark:text-ivory-100 pr-4">
                    Rajveer Kol
                  </span>
                </div>

                {/* Vector Barcode Design */}
                <div className="bg-white dark:bg-neutral-900 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center">
                  <div className="flex items-center justify-center gap-[3px] h-9 overflow-hidden">
                    {[
                      2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4,
                      2, 1, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 1,
                    ].map((w, idx) => (
                      <span
                        key={idx}
                        className="bg-black dark:bg-white inline-block h-full"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 tracking-[0.3em] block mt-1">
                    *CS8842-RK-2026*
                  </span>
                </div>

                <div className="text-center text-[9px] text-neutral-400">
                  Frontend-generated academic identification credential • Subject to CLAUDE × SHEIN terms
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Flip Card Helper Button beneath card */}
        <div className="no-print mt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
            className="px-4 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-burgundy" />
            Flip to {activeSide === 'front' ? 'Back Side' : 'Front Side'}
          </button>
        </div>
      </div>

      {/* 3. Card Specification & Disclaimers Section */}
      <section className="no-print p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-burgundy" />
          <h3 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
            Card Data & Verification Specs
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-700 space-y-1">
            <span className="text-neutral-400 font-bold uppercase text-[10px]">
              Verified Student Name
            </span>
            <p className="font-serif font-bold text-sm text-richblack dark:text-ivory-100">
              {profile.name}
            </p>
            <p className="text-neutral-500 text-[11px]">Role: {profile.role}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-700 space-y-1">
            <span className="text-neutral-400 font-bold uppercase text-[10px]">
              Exact Date of Birth
            </span>
            <p className="font-mono font-bold text-sm text-richblack dark:text-ivory-100">
              11/06/2012
            </p>
            <p className="text-neutral-500 text-[11px]">Format: DD/MM/YYYY</p>
          </div>

          <div className="p-3.5 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-700 space-y-1">
            <span className="text-neutral-400 font-bold uppercase text-[10px]">
              Faculty & Academic Status
            </span>
            <p className="font-serif font-bold text-sm text-richblack dark:text-ivory-100">
              Professor {profile.professor}
            </p>
            <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
              {profile.attendance}% Attendance • {profile.membershipDuration} Membership
            </p>
          </div>
        </div>

        {/* Clear Institutional Disclaimer */}
        <div className="p-4 rounded-xl bg-champagne-50/40 dark:bg-neutral-900 border border-champagne-200/60 dark:border-neutral-800 text-[11px] text-neutral-500 leading-relaxed flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-burgundy flex-shrink-0 mt-0.5" />
          <p>
            <strong>Identification Notice:</strong> This digital student ID card is generated locally for the CLAUDE × SHEIN student portal to reflect your enrolled academic status, verified attendance, and faculty mentorship with Professor Burzin. It is not an officially issued government identity document. The QR element is provided for design purposes only.
          </p>
        </div>
      </section>
    </div>
  );
};
