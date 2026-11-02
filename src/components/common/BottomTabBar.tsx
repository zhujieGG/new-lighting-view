import React from 'react';
import { Home, Layers, Sparkles, Compass, User } from 'lucide-react';
import { useVesta } from '../../context/VestaContext';
import { MainTab } from '../../types/vesta';

export const BottomTabBar: React.FC = () => {
  const { currentTab, setCurrentTab, language } = useVesta();

  const tabs: { key: MainTab; labelZh: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'home', labelZh: '首页', labelEn: 'Home', icon: Home },
    { key: 'devices', labelZh: '设备', labelEn: 'Devices', icon: Layers },
    { key: 'smart', labelZh: '智能', labelEn: 'Smart', icon: Sparkles },
    { key: 'discover', labelZh: '探索', labelEn: 'Discover', icon: Compass },
    { key: 'profile', labelZh: '我的', labelEn: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-[#FFF8F3]/95 dark:bg-[#1D1511]/95 backdrop-blur-md border-t border-[#F0D5C4]/70 dark:border-[#463328]/70 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-colors">
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => setCurrentTab(tab.key)}
              className={`flex flex-col items-center justify-center h-full transition-all duration-150 select-none ${
                isActive
                  ? 'text-[#AD4215] dark:text-[#FF9E6C]'
                  : 'text-[#775A4C] dark:text-[#C2ABA0] hover:text-[#302018] dark:hover:text-[#FFEDE2]'
              }`}
            >
              <div className="relative flex items-center justify-center w-7 h-6">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-semibold' : 'opacity-85'
                }`}
              >
                {language === 'zh' ? tab.labelZh : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
