import React from 'react';
import { Plus, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';
import { SceneCard } from '../components/common/SceneCard';

export const ScenesScreen: React.FC = () => {
  const { scenes, navigateTo, language } = useVesta();

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '智能联动' : 'Smart'}
        rightAction={
          <button
            onClick={() => navigateTo('create_scene')}
            className="w-9 h-9 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] flex items-center justify-center shadow-xs active:scale-95 transition-all"
            title="创建场景"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-5 pt-3 space-y-4">
        {/* Sub-tab Navigation (Scenes vs Schedules) */}
        <div className="flex items-center p-1 rounded-2xl bg-[#FFEADD] dark:bg-[#241A15] border border-[#F0D5C4] dark:border-[#463328]">
          <button
            onClick={() => navigateTo('smart_scenes')}
            className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'zh' ? '灯光场景' : 'Scenes'} ({scenes.length})</span>
          </button>
          <button
            onClick={() => navigateTo('smart_schedules')}
            className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-[#775A4C] dark:text-[#C2ABA0] transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'zh' ? '自动化日程' : 'Schedules'}</span>
          </button>
        </div>

        {/* Scene Guidance Banner */}
        <div className="p-4 rounded-3xl bg-[#FFDFCA] dark:bg-[#38261E] border border-[#E2BFA9] dark:border-[#523A2C] text-xs">
          <div className="font-bold text-[#AD4215] dark:text-[#FF9E6C]">
            {language === 'zh' ? '一键光境流转' : 'One-Tap Lighting Atmosphere'}
          </div>
          <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] mt-0.5">
            {language === 'zh'
              ? '通过预置设备组合、色温与亮度策略，一键切换全屋或局部空间的光线氛围。'
              : 'Preset fixture arrangements, color temperature, and brightness for instant room mood switches.'}
          </p>
        </div>

        {/* Scene Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      </div>
    </div>
  );
};
