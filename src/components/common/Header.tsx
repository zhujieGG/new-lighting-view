import React from 'react';
import { ChevronLeft, Plus, SlidersHorizontal } from 'lucide-react';
import { useVesta } from '../../context/VestaContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  onBack?: () => void;
  brandHeader?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightAction,
  onBack,
  brandHeader = false,
}) => {
  const { goBack, navigateTo, spaces, selectedSpaceId, setSelectedSpaceId, language } = useVesta();

  const handleBack = () => {
    if (onBack) onBack();
    else goBack();
  };

  if (brandHeader) {
    const currentSpace = spaces.find((s) => s.id === selectedSpaceId) || spaces[0];

    return (
      <header className="sticky top-0 z-20 px-5 pt-3 pb-2 backdrop-blur-md bg-[#FFF8F3]/90 dark:bg-[#1D1511]/90 border-b border-[#F0D5C4]/60 dark:border-[#463328]/60 transition-colors">
        <div className="flex items-center justify-between h-11">
          {/* Brand Wordmark & Space Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#AD4215] dark:text-[#FF9E6C] font-sans">
              VESTA
            </span>
            <div className="h-4 w-[1px] bg-[#E2BFA9] dark:bg-[#5E4537]" />
            
            {/* Space Dropdown Selector */}
            <div className="relative group">
              <select
                value={selectedSpaceId}
                onChange={(e) => setSelectedSpaceId(e.target.value)}
                className="appearance-none bg-[#FFEADD] dark:bg-[#2C201A] text-xs font-medium text-[#302018] dark:text-[#FFEDE2] pl-2.5 pr-7 py-1 rounded-full border border-[#F0D5C4] dark:border-[#463328] focus:outline-none focus:ring-1 focus:ring-[#AD4215] dark:focus:ring-[#FF9E6C] cursor-pointer"
              >
                {spaces.map((s) => (
                  <option key={s.id} value={s.id} className="bg-white dark:bg-[#241A15] text-[#302018] dark:text-[#FFEDE2]">
                    {language === 'zh' ? s.name : s.nameEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#775A4C] dark:text-[#C2ABA0] text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigateTo('space_management')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A] active:scale-95 transition-all"
              title={language === 'zh' ? '空间管理' : 'Manage Spaces'}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('add_device')}
              className="h-9 px-3 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-semibold flex items-center gap-1 shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'zh' ? '添加' : 'Add'}</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 px-4 pt-3 pb-2.5 backdrop-blur-md bg-[#FFF8F3]/90 dark:bg-[#1D1511]/90 border-b border-[#F0D5C4]/60 dark:border-[#463328]/60 transition-colors">
      <div className="flex items-center justify-between min-h-[44px]">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={handleBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#302018] dark:text-[#FFEDE2] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A] active:scale-95 transition-all"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {title && (
            <h1 className="text-base font-semibold text-[#302018] dark:text-[#FFEDE2] truncate max-w-[220px]">
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">{rightAction}</div>
      </div>
    </header>
  );
};
