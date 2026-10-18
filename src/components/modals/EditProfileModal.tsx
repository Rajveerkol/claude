import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, User, Mail, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const EditProfileModal: React.FC = () => {
  const { profile, updateProfile, isEditProfileOpen, setIsEditProfileOpen } = usePortal();

  const [name, setName] = useState(profile.name);
  const [initials, setInitials] = useState(profile.initials);
  const [bio, setBio] = useState(profile.bio);
  const [email, setEmail] = useState(profile.email);
  const [major, setMajor] = useState(profile.major);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isEditProfileOpen) {
      setName(profile.name);
      setInitials(profile.initials);
      setBio(profile.bio);
      setEmail(profile.email);
      setMajor(profile.major);
      setSavedSuccess(false);
    }
  }, [isEditProfileOpen, profile]);

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Auto calculate initials if left empty
    let computedInitials = initials.trim().toUpperCase();
    if (!computedInitials) {
      const parts = name.trim().split(/\s+/);
      computedInitials = parts.length > 1
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
    }

    updateProfile({
      name: name.trim(),
      initials: computedInitials,
      bio: bio.trim(),
      email: email.trim(),
      major: major.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setIsEditProfileOpen(false);
      setSavedSuccess(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl border border-champagne-300 dark:border-neutral-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-champagne-100/70 to-ivory dark:from-neutral-800 dark:to-neutral-900 border-b border-champagne-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-burgundy text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
                Edit Student Profile
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Changes will be saved locally in your browser
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              Profile updated and stored in localStorage!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Full Student Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                  placeholder="e.g. Rajveer Kol"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Initials Fallback
              </label>
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 font-serif font-bold text-center uppercase focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                placeholder="RK"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Academic Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                placeholder="student@claude-shein.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Major / Specialization
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                placeholder="Digital Fashion & Creative Technology"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Personal Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-richblack dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-burgundy/40 resize-none leading-relaxed"
              placeholder="Tell your faculty mentor about your learning goals..."
            />
          </div>

          {/* Locked parameters for internal consistency */}
          <div className="p-3 rounded-xl bg-champagne-50/70 dark:bg-neutral-800/40 border border-champagne-200/60 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1">
            <p>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Cohort Mentor:</span> Professor {profile.professor} (Assigned)
            </p>
            <p>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Attendance:</span> {profile.attendance}% Verified Record
            </p>
            <p>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Membership:</span> {profile.membershipDuration} ({profile.joinedNotice})
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-burgundy hover:bg-burgundy-600 text-white shadow-sm transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
