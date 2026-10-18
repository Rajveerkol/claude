import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Headphones,
  RotateCw,
  Trash2,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  BookOpen,
  CreditCard,
  Gift,
  CalendarCheck,
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import type { ChatMessage } from '../types';

export const SupportPage: React.FC = () => {
  const {
    profile,
    support,
    initSupportIfNeeded,
    checkSupportAvailability,
    sendChatMessage,
    clearSupportChat,
  } = usePortal();

  const [inputMessage, setInputMessage] = useState('');
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize support session on mount if needed
  useEffect(() => {
    initSupportIfNeeded();
  }, [initSupportIfNeeded]);

  // Recheck status on mount
  useEffect(() => {
    checkSupportAvailability();
  }, [checkSupportAvailability]);

  // Auto scroll chat to bottom when messages or typing state changes
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [support.messages, support.isAiResponding]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || support.isAiResponding) return;

    const messageText = inputMessage.trim();
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendChatMessage(messageText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCheckAvailability = () => {
    setIsChecking(true);
    checkSupportAvailability();
    setTimeout(() => {
      setIsChecking(false);
    }, 400);
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const suggestedPrompts = [
    { label: 'What have I learned?', text: 'What have I learned so far across my completed courses?', icon: BookOpen },
    { label: 'Who is Professor Burzin?', text: 'Who is Professor Burzin and what is his role?', icon: User },
    { label: 'Explain my clothing benefits', text: 'Can you explain my SHEIN clothing benefits and how the policy works?', icon: Gift },
    { label: 'Show my completed courses', text: 'Show me details of my completed courses and grades.', icon: BookOpen },
    { label: 'Explain my attendance', text: 'Explain my attendance record and perfect attendance achievement.', icon: CalendarCheck },
    { label: 'How do I download my Student ID?', text: 'How do I download and print my Student ID Card?', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Header with Always-Online Status Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100/70 dark:bg-neutral-800 text-burgundy dark:text-champagne-300 text-xs font-semibold uppercase tracking-wider border border-champagne-300/50 dark:border-neutral-700 mb-2">
              <Headphones className="w-3.5 h-3.5" />
              Live AI Support Center
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-richblack dark:text-ivory-100">
              Support & Mentorship
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans mt-1">
              Direct AI assistance powered by Gemini with full knowledge of your student records and curriculum.
            </p>
          </div>

          {/* Status Badge & Check Availability Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Support Online</span>
            </div>

            <button
              onClick={handleCheckAvailability}
              disabled={isChecking}
              className="px-4 py-2 rounded-xl bg-champagne-100 hover:bg-champagne-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-richblack dark:text-neutral-200 text-xs font-semibold border border-champagne-300/80 dark:border-neutral-700 transition-all flex items-center gap-1.5"
              title="Refresh support connection status"
            >
              <RotateCw className={`w-3.5 h-3.5 text-burgundy ${isChecking ? 'animate-spin' : ''}`} />
              Check Availability
            </button>
          </div>
        </div>

        {/* Live Status Line */}
        <div className="mt-6 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-emerald-50/80 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-sm">
                AI Assistant · Available
              </p>
              <p className="text-[11px] opacity-90 mt-0.5">
                Our AI Support Assistant is online 24/7 with automatic multi-model fallback. Ready to answer coursework, attendance, Student ID card, and SHEIN clothing benefits questions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold bg-white/80 dark:bg-neutral-900/80 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Always Online</span>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Interface: Mentor Info & Prompts + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Professor Card & Suggested Prompt Chips */}
        <div className="space-y-6">
          <section className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-richblack dark:bg-burgundy text-white font-serif font-bold text-xl flex items-center justify-center shadow-sm ring-2 ring-champagne-300/60">
                B
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
                  Professor Burzin
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Senior Developer & Mentor
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-champagne-100 text-burgundy dark:bg-neutral-800 dark:text-champagne-300 border border-champagne-200 dark:border-neutral-700">
                  Faculty Director
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4">
              <p>
                Professor Burzin directs curriculum excellence and capstone advisory. The AI Support Assistant is trained on his syllabus and portal guidelines to assist you instantly.
              </p>
              <div className="p-3 rounded-xl bg-champagne-50/60 dark:bg-neutral-800/40 border border-champagne-200/50 dark:border-neutral-700/50 space-y-1 text-[11px]">
                <p className="text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Student:</span> {profile.name} (ID: {profile.studentId})
                </p>
                <p className="text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Attendance:</span> {profile.attendance}% Verified
                </p>
                <p className="text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Completed Courses:</span> 4 Modules (100%)
                </p>
              </div>
            </div>

            {/* Quick suggested prompt chips */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Suggested Prompts
              </p>
              <div className="space-y-2">
                {suggestedPrompts.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(p.text)}
                      className="w-full text-left p-2.5 rounded-xl bg-neutral-50 hover:bg-champagne-100/70 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-xs text-neutral-700 dark:text-neutral-300 transition-all flex items-center gap-2 group"
                    >
                      <Icon className="w-3.5 h-3.5 text-burgundy dark:text-champagne-300 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* AI Knowledge Base Architecture Card */}
          <div className="p-4 rounded-xl bg-champagne-50/50 dark:bg-neutral-900 border border-champagne-200 dark:border-neutral-800 text-[11px] text-neutral-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 font-semibold">
              <Bot className="w-3.5 h-3.5 text-burgundy" />
              <span>AI Support Architecture</span>
            </div>
            <p>
              Equipped with Google Gemini API & automatic model fallback (gemini-2.5-flash, 2.0-flash, 1.5-flash). Dedicated strictly to CLAUDE × SHEIN student records and policies.
            </p>
          </div>
        </div>

        {/* Right Column (2 Spans): Chat Interface */}
        <div className="lg:col-span-2 flex flex-col h-[680px] rounded-2xl bg-white dark:bg-[#1A1A1A] border border-champagne-300/80 dark:border-neutral-800 shadow-luxury overflow-hidden">
          {/* Chat Header Bar */}
          <div className="p-4 bg-champagne-50/50 dark:bg-neutral-900/60 border-b border-champagne-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white font-serif font-bold text-xs flex items-center justify-center shadow-sm">
                AI
              </div>
              <div>
                <h4 className="font-serif font-semibold text-xs text-richblack dark:text-ivory-100 flex items-center gap-1.5">
                  CLAUDE × SHEIN AI Support Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[10px] text-neutral-500">
                  AI Assistant · Available • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmClearOpen(true)}
                className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors"
                title="Clear conversation history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {support.messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-champagne-100 dark:bg-neutral-800 text-burgundy flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-richblack dark:text-ivory-100">
                  CLAUDE × SHEIN AI Assistant
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Ask any question regarding your coursework, attendance milestones, Student ID card, or SHEIN clothing benefits.
                </p>
              </div>
            ) : (
              support.messages.map((msg: ChatMessage) => {
                // System Notice Style
                if (msg.sender === 'system' || msg.isNotice) {
                  return (
                    <div
                      key={msg.id}
                      className="mx-auto max-w-lg p-3 rounded-xl bg-champagne-100/60 dark:bg-neutral-800/60 border border-champagne-200 dark:border-neutral-700 text-center text-xs text-neutral-600 dark:text-neutral-300 space-y-1"
                    >
                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-burgundy dark:text-champagne-300">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {msg.senderName}
                      </div>
                      <p className="text-[11px] leading-relaxed">{msg.text}</p>
                      <span className="text-[9px] text-neutral-400 block">{msg.timestamp}</span>
                    </div>
                  );
                }

                const isUser = msg.sender === 'student';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm ${
                        isUser ? 'bg-burgundy' : 'bg-richblack dark:bg-burgundy ring-1 ring-champagne-300'
                      }`}
                    >
                      {isUser ? profile.initials || 'RK' : 'AI'}
                    </div>

                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-burgundy text-white rounded-tr-none'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-richblack dark:text-neutral-100 rounded-tl-none border border-neutral-200/60 dark:border-neutral-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 mb-1.5">
                        <span className="font-semibold flex items-center gap-1">
                          {!isUser && <Sparkles className="w-3 h-3 text-burgundy dark:text-champagne-300" />}
                          {msg.senderName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {msg.modelUsed && (
                            <span className="px-1.5 py-0.2 rounded bg-champagne-200/60 dark:bg-neutral-700 text-richblack dark:text-neutral-300 text-[9px] font-mono">
                              {msg.modelUsed}
                            </span>
                          )}
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                );
              })
            )}

            {/* Typing Indicator */}
            {support.isAiResponding && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-richblack dark:bg-burgundy text-white font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm ring-1 ring-champagne-300">
                  AI
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-none p-3.5 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-2 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span className="font-sans italic">AI Assistant is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Message Input Form */}
          <div className="p-3 sm:p-4 bg-white dark:bg-[#1A1A1A] border-t border-champagne-200 dark:border-neutral-800">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your courses, attendance, Student ID, or SHEIN clothing benefits... (Enter to send)"
                  disabled={support.isAiResponding}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-richblack dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-burgundy/40 resize-none leading-relaxed disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || support.isAiResponding}
                className="p-3 rounded-xl bg-burgundy hover:bg-burgundy-600 disabled:opacity-40 disabled:hover:bg-burgundy text-white shadow-sm transition-all flex items-center justify-center flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400">
              <span>Shift + Enter for new line • Enter to send</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live AI Support Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Clearing Chat */}
      {isConfirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-2xl border border-champagne-300 dark:border-neutral-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-richblack dark:text-ivory-100">
                Clear Conversation?
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                This will clear your local chat history stored in this browser.
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
                  clearSupportChat();
                  setIsConfirmClearOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Yes, Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
