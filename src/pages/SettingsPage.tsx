import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Zap,
  Trash2,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  User,
  Bot,
  MessageSquare,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetAllData,
    clearSupportChat,
    setActivePage,
    setIsEditProfileOpen,
    profile,
  } = usePortal();

  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [isConfirmClearChat, setIsConfirmClearChat] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* 1. Header Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <Settings className="w-3.5 h-3.5" />
              Portal Preferences
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Settings & Environment
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Customize appearance, manage local storage data, and inspect AI support services.
            </p>
          </div>

          {successToast && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              {successToast}
            </div>
          )}
        </div>
      </section>

      {/* 2. Appearance & Accessibility (Dark Mode & Reduced Motion) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-6">
        <div>
          <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
            Appearance & Accessibility
          </h3>
          <p className="text-xs text-neutral-500">
            Controls how the portal renders across your local browser environment
          </p>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {/* Light / Dark Mode Toggle */}
          <div className="py-4 flex items-center justify-between gap-4 first:pt-0">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                {settings.theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <h4 className="font-medium text-sm text-richblack dark:text-ivory-100">
                  Interface Theme
                </h4>
              </div>
              <p className="text-xs text-neutral-500">
                Switch between warm ivory daylight and dark obsidian mode
              </p>
            </div>

            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  updateSettings({ theme: 'light' });
                  showToast('Light mode activated');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  settings.theme === 'light'
                    ? 'bg-white text-burgundy shadow-sm'
                    : 'text-neutral-500 hover:text-richblack dark:hover:text-white'
                }`}
              >
                Light Ivory
              </button>
              <button
                type="button"
                onClick={() => {
                  updateSettings({ theme: 'dark' });
                  showToast('Dark obsidian mode activated');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-neutral-900 text-ivory-100 shadow-sm'
                    : 'text-neutral-500 hover:text-richblack dark:hover:text-white'
                }`}
              >
                Dark Mode
              </button>
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-neutral-400" />
                <h4 className="font-medium text-sm text-richblack dark:text-ivory-100">
                  Reduced Motion
                </h4>
              </div>
              <p className="text-xs text-neutral-500">
                Minimizes UI micro-animations and transition durations for accessibility
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextVal = !settings.reducedMotion;
                updateSettings({ reducedMotion: nextVal });
                showToast(nextVal ? 'Reduced motion enabled' : 'Reduced motion disabled');
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                settings.reducedMotion ? 'bg-burgundy' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Student Profile Quick Action */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-burgundy text-white font-serif font-bold text-lg flex items-center justify-center">
            {profile.initials}
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
              Student Profile Fields
            </h4>
            <p className="text-xs text-neutral-500">
              {profile.name} • {profile.email} • {profile.major}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="px-4 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold border border-champagne-300 dark:border-neutral-700 transition-all flex items-center gap-1.5"
        >
          <User className="w-4 h-4 text-burgundy" />
          Edit Profile Information
        </button>
      </section>

      {/* 4. Notification Preferences */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
            Notification Preferences
          </h3>
          <p className="text-xs text-neutral-500">
            Choose what alerts appear in your local portal notification center
          </p>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="py-3 flex items-center justify-between">
            <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              Course Completion & Grade Commendations
            </span>
            <input
              type="checkbox"
              checked={settings.courseAlerts}
              onChange={(e) => updateSettings({ courseAlerts: e.target.checked })}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              SHEIN Clothing Benefits & Policy Updates
            </span>
            <input
              type="checkbox"
              checked={settings.benefitsUpdates}
              onChange={(e) => updateSettings({ benefitsUpdates: e.target.checked })}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              Faculty Mentor Broadcasts & Office Hours Notices
            </span>
            <input
              type="checkbox"
              checked={settings.emailDigest}
              onChange={(e) => updateSettings({ emailDigest: e.target.checked })}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 5. Live AI Support Service & Diagnostics */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-richblack dark:text-ivory-100">
              AI Support Service & Status
            </h3>
            <p className="text-xs text-neutral-500">
              Gemini AI integration status, candidate model fallback, and conversation management
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            AI Support Online
          </span>
        </div>

        <div className="p-4 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/40 border border-champagne-200/80 dark:border-neutral-700 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Operational Mode:</span>
            <span className="font-bold text-richblack dark:text-neutral-100">
              Always Online (24/7)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Model Router Architecture:</span>
            <span className="font-mono text-burgundy dark:text-champagne-300 text-[11px] font-semibold">
              Automatic Model Fallback
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Supported Model Pool:</span>
            <span className="font-mono text-neutral-600 dark:text-neutral-300 text-[11px]">
              gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-flash
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">API Security & Proxy:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              Server-side Protected (/api/chat)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
            The Support Center status is permanently online. When a question is submitted, the server router evaluates the preferred candidate model, applying jittered backoff and cooldown tracking for retryable errors.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setActivePage('support')}
            className="px-4 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Open Live Support Center
          </button>

          <button
            onClick={() => setIsConfirmClearChat(true)}
            className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-ivory-100 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
            Clear Support Chat History
          </button>
        </div>
      </section>

      {/* 6. Danger Zone: Clear Local Application Data */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-red-200/80 dark:border-red-950/60 shadow-luxury space-y-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-red-700 dark:text-red-400">
            Local Data Storage Management
          </h3>
          <p className="text-xs text-neutral-500">
            Erase local browser storage entries used by this portal
          </p>
        </div>

        <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 text-xs text-neutral-600 dark:text-neutral-400 space-y-1 leading-relaxed">
          <p className="font-semibold text-red-800 dark:text-red-300">
            Local Storage Boundary Disclosure:
          </p>
          <p>
            Clearing local application data will reset your customized display preferences, stored chat logs, and local notification states to their initial defaults. Only this website's locally stored browser data will be reset. No server databases are involved.
          </p>
        </div>

        <button
          onClick={() => setIsConfirmClearOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          Clear Local Application Data
        </button>
      </section>

      {/* Clear Chat Confirmation Modal */}
      {isConfirmClearChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-2xl border border-champagne-300 dark:border-neutral-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-champagne-200 dark:bg-neutral-800 text-burgundy mx-auto flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
                Clear Support Conversation?
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                This will reset your local AI Support conversation history in this browser back to the welcome message.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setIsConfirmClearChat(false)}
                className="flex-1 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearSupportChat();
                  setIsConfirmClearChat(false);
                  showToast('AI Support conversation reset');
                }}
                className="flex-1 py-2 rounded-xl bg-burgundy hover:bg-burgundy-600 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Yes, Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Local Data Confirmation Modal */}
      {isConfirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-2xl border border-champagne-300 dark:border-neutral-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
                Confirm Local Data Reset
              </h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                This website stores preferences and illustrative records in your local browser storage. Clearing will reset your portal to the initial preloaded student state for Rajveer Kol.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setIsConfirmClearOpen(false)}
                className="flex-1 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setIsConfirmClearOpen(false);
                  showToast('Local application storage successfully reset');
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Reset Browser Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
