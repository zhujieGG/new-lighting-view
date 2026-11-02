import React from 'react';
import { Plus, Sparkles, Clock, Sunrise, Sunset, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const SchedulesScreen: React.FC = () => {
  const { schedules, toggleSchedule, navigateTo, language } = useVesta();

  const getDayNames = (days: number[]) => {
    if (days.length === 7) return language === 'zh' ? '每天' : 'Everyday';
    if (days.length === 5 && !days.includes(0) && !days.includes(6)) {
      return language === 'zh' ? '工作日 (周一至周五)' : 'Weekdays (Mon-Fri)';
    }
    const namesZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const namesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((d) => (language === 'zh' ? namesZh[d] : namesEn[d])).join(', ');
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '智能联动' : 'Smart'}
        rightAction={
          <button
            onClick={() => navigateTo('create_schedule')}
            className="w-9 h-9 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] flex items-center justify-center shadow-xs active:scale-95 transition-all"
            title="新建日程"
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
            className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-[#775A4C] dark:text-[#C2ABA0] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'zh' ? '灯光场景' : 'Scenes'}</span>
          </button>
          <button
            onClick={() => navigateTo('smart_schedules')}
            className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'zh' ? '自动化日程' : 'Schedules'} ({schedules.length})</span>
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map((schedule) => {
            return (
              <div
                key={schedule.id}
                className={`rounded-3xl p-4.5 border transition-all ${
                  schedule.enabled
                    ? 'bg-[#FFEADD] dark:bg-[#2C201A] border-[#FFDFCA] dark:border-[#463328] shadow-xs'
                    : 'bg-[#FFF3EB]/60 dark:bg-[#241A15]/60 border-[#F0D5C4]/60 dark:border-[#3D2C23]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Trigger Icon */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        schedule.enabled
                          ? 'bg-[#FFDFCA] dark:bg-[#3D2C23] text-[#AD4215] dark:text-[#FF9E6C]'
                          : 'bg-[#E8DCD3] dark:bg-[#2F211A] text-[#775A4C] dark:text-[#C2ABA0]'
                      }`}
                    >
                      {schedule.triggerType === 'sunset' ? (
                        <Sunset className="w-5 h-5" />
                      ) : schedule.triggerType === 'sunrise' ? (
                        <Sunrise className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[#302018] dark:text-[#FFEDE2]">
                          {language === 'zh' ? schedule.name : schedule.nameEn}
                        </h4>
                      </div>

                      {/* Trigger Timing */}
                      <div className="text-xs font-mono font-medium text-[#AD4215] dark:text-[#FF9E6C] mt-1">
                        {schedule.triggerType === 'sunset' &&
                          (schedule.offsetMinutes && schedule.offsetMinutes < 0
                            ? `日落前 ${Math.abs(schedule.offsetMinutes)} 分钟`
                            : '日落时刻')}
                        {schedule.triggerType === 'sunrise' && '日出时刻'}
                        {schedule.triggerType === 'time' && schedule.time}
                      </div>

                      {/* Repetition */}
                      <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{getDayNames(schedule.repeatDays)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Switch (44x44 hitbox) */}
                  <button
                    onClick={() => toggleSchedule(schedule.id)}
                    aria-label={schedule.enabled ? 'Disable schedule' : 'Enable schedule'}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 -mt-1 active:scale-95 transition-transform"
                  >
                    <div
                      className={`w-12 h-6.5 rounded-full p-1 transition-colors ${
                        schedule.enabled
                          ? 'bg-[#AD4215] dark:bg-[#FF9E6C]'
                          : 'bg-[#D6C5B8] dark:bg-[#433128]'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                          schedule.enabled ? 'translate-x-5.5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* Bound Action Summary */}
                <div className="mt-3 pt-2.5 border-t border-[#F0D5C4]/60 dark:border-[#463328]/60 flex items-center justify-between text-xs text-[#775A4C] dark:text-[#C2ABA0]">
                  <span className="line-clamp-1">
                    {language === 'zh' ? schedule.actionSummary : schedule.actionSummaryEn}
                  </span>
                  <button
                    onClick={() => navigateTo('create_schedule')}
                    className="text-[11px] font-medium text-[#AD4215] dark:text-[#FF9E6C] hover:underline shrink-0 ml-2"
                  >
                    {language === 'zh' ? '编辑规则' : 'Edit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
