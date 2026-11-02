import React, { useState } from 'react';
import { Clock, Sunrise, Sunset, Calendar, Check, Save, ChevronLeft } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';
import { TriggerType } from '../types/vesta';

export const CreateScheduleScreen: React.FC = () => {
  const { goBack, scenes, showToast, language } = useVesta();

  const [scheduleName, setScheduleName] = useState('黄昏渐变暖调迎宾');
  const [triggerType, setTriggerType] = useState<TriggerType>('sunset');
  const [specificTime, setSpecificTime] = useState('18:45');
  const [offsetMinutes, setOffsetMinutes] = useState<number>(-20); // -20 min before sunset
  const [repeatDays, setRepeatDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 0]);
  const [selectedSceneId, setSelectedSceneId] = useState(scenes[0]?.id || 'scene-1');

  const daysLabelsZh = ['日', '一', '二', '三', '四', '五', '六'];
  const daysLabelsEn = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const toggleDay = (dayIndex: number) => {
    setRepeatDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  const handleSave = () => {
    showToast(language === 'zh' ? `日程「${scheduleName}」已开启并保存` : `Schedule "${scheduleName}" created`);
    goBack();
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '新建/编辑自动化日程' : 'Create Schedule'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-5">
        {/* Basic Name */}
        <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328]">
          <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
            {language === 'zh' ? '日程名称' : 'Schedule Name'}
          </label>
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            className="w-full h-11 mt-1 px-3.5 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] font-semibold focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
          />
        </div>

        {/* Trigger Condition (Time vs Sunrise vs Sunset) */}
        <div className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-3">
          <div className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '触发时机 (Trigger)' : 'Trigger Type'}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 'sunset' as TriggerType, label: '日落时分', icon: Sunset },
              { type: 'sunrise' as TriggerType, label: '日出朝霞', icon: Sunrise },
              { type: 'time' as TriggerType, label: '指定时刻', icon: Clock },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = triggerType === t.type;
              return (
                <button
                  key={t.type}
                  onClick={() => setTriggerType(t.type)}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                    isSelected
                      ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] border-transparent shadow-xs'
                      : 'bg-white/60 dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0] border-[#F0D5C4] dark:border-[#463328]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px] font-bold">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Time Picker or Offset Slider */}
          {triggerType === 'time' ? (
            <div className="pt-2">
              <label className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                指定执行具体时间 (24小时制)
              </label>
              <input
                type="time"
                value={specificTime}
                onChange={(e) => setSpecificTime(e.target.value)}
                className="w-full h-11 mt-1 px-3 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-sm font-mono text-[#302018] dark:text-[#FFEDE2] font-bold"
              />
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
                <span>
                  {triggerType === 'sunset' ? '与日落时刻的相对偏移' : '与日出时刻的相对偏移'}
                </span>
                <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">
                  {offsetMinutes === 0
                    ? '正当其时'
                    : offsetMinutes < 0
                    ? `提前 ${Math.abs(offsetMinutes)} 分钟`
                    : `延后 ${offsetMinutes} 分钟`}
                </span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                step="5"
                value={offsetMinutes}
                onChange={(e) => setOffsetMinutes(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#775A4C] dark:text-[#C2ABA0]">
                <span>提前 60 分钟</span>
                <span>日落/出时刻 (0m)</span>
                <span>延后 60 分钟</span>
              </div>
            </div>
          )}
        </div>

        {/* Repetition Weekday Chips */}
        <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-2.5">
          <div className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '重复周期 (Weekly Repeat)' : 'Repeat Days'}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
              const isSelected = repeatDays.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggleDay(idx)}
                  className={`h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] shadow-xs'
                      : 'bg-white/60 dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0] border border-[#F0D5C4] dark:border-[#463328]'
                  }`}
                >
                  {language === 'zh' ? daysLabelsZh[idx] : daysLabelsEn[idx]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bound Action / Scene Picker */}
        <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-2.5">
          <div className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '触发执行动作' : 'Trigger Action'}
          </div>

          <div className="space-y-2">
            {scenes.map((scene) => {
              const isSelected = selectedSceneId === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => setSelectedSceneId(scene.id)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between border text-left transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-[#34241B] border-[#AD4215] dark:border-[#FF9E6C] text-[#302018] dark:text-[#FFEDE2]'
                      : 'bg-[#FFF3EB] dark:bg-[#241A15] border-[#F0D5C4] dark:border-[#463328] text-[#775A4C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: scene.color }}
                    />
                    <span className="text-xs font-bold">{scene.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save CTA */}
        <button
          onClick={handleSave}
          className="w-full h-12 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>{language === 'zh' ? '保存并启用自动化日程' : 'Save & Enable Schedule'}</span>
        </button>
      </div>
    </div>
  );
};
