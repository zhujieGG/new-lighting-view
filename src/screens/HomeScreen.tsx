import React from 'react';
import { Power, SunMedium, Moon, Sparkles, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';
import { DeviceCard } from '../components/common/DeviceCard';
import { SceneCard } from '../components/common/SceneCard';

export const HomeScreen: React.FC = () => {
  const {
    spaces,
    selectedSpaceId,
    devices,
    scenes,
    allLightsOnInSpace,
    allLightsOffInSpace,
    navigateTo,
    language,
  } = useVesta();

  const currentSpace = spaces.find((s) => s.id === selectedSpaceId) || spaces[0];

  // Filter devices in current space (or all if space-1)
  const spaceDevices =
    selectedSpaceId === 'space-1'
      ? devices
      : devices.filter((d) => d.spaceId === selectedSpaceId);

  const activeLightsCount = spaceDevices.filter(
    (d) => d.type !== 'gateway' && d.online && d.power
  ).length;

  const totalLightsCount = spaceDevices.filter((d) => d.type !== 'gateway').length;
  const gateway = devices.find((d) => d.type === 'gateway');

  // Filter 4 top scenes
  const quickScenes = scenes.slice(0, 4);

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Brand Header with Space Selector */}
      <Header brandHeader />

      <main className="px-5 pt-4 space-y-6">
        {/* Real-time Status Strip & Fast All-On / All-Off Execution */}
        <section className="rounded-3xl p-4 bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                  {language === 'zh' ? currentSpace.name : currentSpace.nameEn}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#AD4215]/10 dark:bg-[#FF9E6C]/15 text-[#AD4215] dark:text-[#FF9E6C]">
                  {activeLightsCount} / {totalLightsCount} {language === 'zh' ? '已点亮' : 'active'}
                </span>
              </div>
              <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-1">
                {gateway?.online
                  ? language === 'zh'
                    ? 'Matter 边缘网关协同工作中 · 延迟 <15ms'
                    : 'Matter Gateway Synced · <15ms'
                  : language === 'zh'
                  ? '网关离线中'
                  : 'Gateway offline'}
              </p>
            </div>

            {/* Quick Switch Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => allLightsOnInSpace()}
                className="h-9 px-3 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                title={language === 'zh' ? '开启当前空间全部灯具' : 'Turn all on'}
              >
                <SunMedium className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '全开' : 'All On'}</span>
              </button>

              <button
                onClick={() => allLightsOffInSpace()}
                className="h-9 px-3 rounded-full bg-[#FFF3EB] dark:bg-[#3D2C23] text-[#775A4C] dark:text-[#FFEDE2] border border-[#E2BFA9] dark:border-[#5E4537] text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                title={language === 'zh' ? '关闭当前空间全部灯具' : 'Turn all off'}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{language === 'zh' ? '全关' : 'All Off'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quick Scenes Carousel / Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-[#302018] dark:text-[#FFEDE2] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
              <span>{language === 'zh' ? '常用场景' : 'Favorite Scenes'}</span>
            </h2>
            <button
              onClick={() => navigateTo('smart_scenes')}
              className="text-xs font-medium text-[#AD4215] dark:text-[#FF9E6C] flex items-center gap-0.5 hover:underline"
            >
              <span>{language === 'zh' ? '全部场景' : 'All'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickScenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        </section>

        {/* Space Devices Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-tight text-[#302018] dark:text-[#FFEDE2]">
              {language === 'zh' ? '空间设备' : 'Devices in Space'} ({spaceDevices.length})
            </h2>
            <button
              onClick={() => navigateTo('devices')}
              className="text-xs font-medium text-[#AD4215] dark:text-[#FF9E6C] flex items-center gap-0.5 hover:underline"
            >
              <span>{language === 'zh' ? '管理设备' : 'Manage'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spaceDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </section>

        {/* Matter Gateway Health Badge */}
        {gateway && (
          <section className="rounded-2xl p-3.5 bg-[#FFF3EB] dark:bg-[#241A15] border border-[#F0D5C4]/70 dark:border-[#463328]/70 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2E8B57]/15 dark:bg-[#48C78E]/20 text-[#2E8B57] dark:text-[#48C78E] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-[#302018] dark:text-[#FFEDE2]">
                  {gateway.name}
                </div>
                <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
                  Matter / Thread 局域网自组网 · 正常运行
                </div>
              </div>
            </div>
            <button
              onClick={() => navigateTo('firmware_update')}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FFEADD] dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] border border-[#F0D5C4] dark:border-[#463328]"
            >
              {language === 'zh' ? '网关详情' : 'Details'}
            </button>
          </section>
        )}
      </main>
    </div>
  );
};
