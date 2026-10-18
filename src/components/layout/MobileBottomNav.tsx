import React from 'react';
import { LayoutDashboard, CreditCard, BookOpen, Gift, Headphones } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import type { PageId } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage, support } = usePortal();

  const items: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'id-card', label: 'ID Card', icon: CreditCard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border-t border-champagne-300/80 dark:border-neutral-800 px-2 py-1.5 flex items-center justify-around shadow-lg"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl text-[10px] font-medium transition-all relative ${
              isActive
                ? 'text-burgundy dark:text-champagne-200 font-bold'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-richblack dark:hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
              {item.id === 'support' && (
                <span
                  className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                    support.status === 'online' ? 'bg-emerald-500' : 'bg-neutral-400'
                  }`}
                />
              )}
            </div>
            <span>{item.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-burgundy dark:bg-champagne-200 mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
