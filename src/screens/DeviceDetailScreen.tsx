import React, { useState } from 'react';
import { Power, Sun, Palette, Sliders, Cpu, Info, WifiOff, Check, RotateCcw } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const DeviceDetailScreen: React.FC = () => {
  const {
    devices,
    selectedDeviceId,
    toggleDevicePower,
    setDeviceBrightness,
    setDeviceColorTemp,
    setDeviceRgb,
    goBack,
    language,
    navigateTo,
  } = useVesta();

  const device = devices.find((d) => d.id === selectedDeviceId) || devices[1]; // default to first light
  const [controlMode, setControlMode] = useState<'cct' | 'rgb'>('cct');

  if (!device) return null;

  // Color temperature Kelvin to visual RGB approximation
  const getKelvinColor = (kelvin: number) => {
    // 2200K -> warm amber (#FFA454), 4000K -> neutral warm white (#FFEACC), 6500K -> crisp cool daylight (#E6F0FF)
    if (kelvin < 3000) return '#FF9B42';
    if (kelvin < 4500) return '#FFD7A8';
    return '#E1ECFA';
  };

  const cctColor = getKelvinColor(device.colorTemp);

  const rgbPresets = [
    { name: '暖夕金', rgb: { r: 255, g: 154, b: 66 } },
    { name: '朝霞粉', rgb: { r: 255, g: 130, b: 120 } },
    { name: '翡翠森', rgb: { r: 60, g: 190, b: 120 } },
    { name: '极光蓝', rgb: { r: 70, g: 160, b: 255 } },
    { name: '静谧紫', rgb: { r: 180, g: 120, b: 255 } },
    { name: '烛光微醺', rgb: { r: 255, g: 110, b: 40 } },
  ];

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? device.name : device.nameEn}
        showBack
        onBack={goBack}
        rightAction={
          <button
            onClick={() => navigateTo('firmware_update')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A]"
            title="设备信息"
          >
            <Info className="w-4 h-4" />
          </button>
        }
      />

      <div className="px-5 pt-4 space-y-6">
        {/* Offline Warning Banner if Offline */}
        {!device.online && (
          <div className="p-3.5 rounded-2xl bg-[#C23326]/10 border border-[#C23326]/20 text-[#C23326] dark:text-[#F87171] text-xs flex items-center gap-2.5">
            <WifiOff className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-semibold">
                {language === 'zh' ? '设备连接已断开' : 'Device Offline'}
              </div>
              <div className="text-[11px] opacity-90">
                {language === 'zh'
                  ? '请检查物理供电开关是否开启，或 Mesh 中继节点信号。'
                  : 'Check fixture power switch or BLE Mesh signal relay.'}
              </div>
            </div>
          </div>
        )}

        {/* Central Luminous Visualizer & Master Switch */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative flex items-center justify-center">
            {/* Soft Ambient Radiance Aura */}
            {device.online && device.power && (
              <div
                className="absolute w-52 h-52 rounded-full blur-2xl opacity-60 transition-all duration-300 pointer-events-none"
                style={{
                  backgroundColor:
                    controlMode === 'rgb' && device.rgb
                      ? `rgb(${device.rgb.r}, ${device.rgb.g}, ${device.rgb.b})`
                      : cctColor,
                  transform: `scale(${0.6 + (device.brightness / 100) * 0.5})`,
                }}
              />
            )}

            {/* Central Master Switch Button */}
            <button
              onClick={() => toggleDevicePower(device.id)}
              disabled={!device.online}
              className={`relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 border-2 ${
                !device.online
                  ? 'bg-[#E8DCD3] dark:bg-[#251B16] border-[#C2ABA0]/40 text-[#8A7B73] cursor-not-allowed'
                  : device.power
                  ? 'bg-[#FFF8F3] dark:bg-[#2C201A] border-[#AD4215] dark:border-[#FF9E6C] text-[#AD4215] dark:text-[#FF9E6C]'
                  : 'bg-[#FFF3EB] dark:bg-[#1D1511] border-[#E2BFA9] dark:border-[#463328] text-[#775A4C] dark:text-[#C2ABA0]'
              }`}
            >
              <Power className="w-8 h-8 stroke-[2.2]" />
              <span className="text-[11px] font-semibold mt-1">
                {!device.online
                  ? language === 'zh'
                    ? '离线'
                    : 'Offline'
                  : device.power
                  ? language === 'zh'
                    ? '已开启'
                    : 'ON'
                  : language === 'zh'
                  ? '已关闭'
                  : 'OFF'}
              </span>
            </button>
          </div>

          {/* Quick status label */}
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold tracking-tight text-[#302018] dark:text-[#FFEDE2] font-mono">
              {device.power && device.online ? `${device.brightness}%` : '0%'}
            </span>
            <div className="text-xs text-[#775A4C] dark:text-[#C2ABA0]">
              {device.power && device.online
                ? controlMode === 'cct'
                  ? `${device.colorTemp}K 暖白光`
                  : 'RGB 氛围色彩模式'
                : language === 'zh'
                ? '轻触中心开启'
                : 'Tap center to turn on'}
            </div>
          </div>
        </div>

        {/* Tactile Brightness Slider */}
        <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
            <span className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
              <span>{language === 'zh' ? '照度调节' : 'Brightness'}</span>
            </span>
            <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">
              {device.brightness}%
            </span>
          </div>

          <div className="pt-2">
            <input
              type="range"
              min="1"
              max="100"
              value={device.brightness}
              disabled={!device.online || !device.power}
              onChange={(e) => setDeviceBrightness(device.id, Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer disabled:opacity-40"
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#775A4C] dark:text-[#C2ABA0] px-0.5">
            <span>微光 1%</span>
            <span>柔和 50%</span>
            <span>满载 100%</span>
          </div>
        </div>

        {/* Color Mode Switcher (CCT vs RGB) */}
        <div className="flex items-center p-1 rounded-2xl bg-[#FFEADD] dark:bg-[#241A15] border border-[#F0D5C4] dark:border-[#463328]">
          <button
            onClick={() => setControlMode('cct')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              controlMode === 'cct'
                ? 'bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '色温光谱 (CCT)' : 'Color Temp (CCT)'}</span>
          </button>
          <button
            onClick={() => setControlMode('rgb')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              controlMode === 'rgb'
                ? 'bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? 'RGB 全彩氛围' : 'RGB Full Color'}</span>
          </button>
        </div>

        {/* CCT Temperature Slider */}
        {controlMode === 'cct' ? (
          <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
              <span>{language === 'zh' ? '色温 (2200K - 6500K)' : 'Color Temperature'}</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">
                {device.colorTemp}K
              </span>
            </div>

            {/* Gradient Track Bar */}
            <div className="pt-2">
              <input
                type="range"
                min="2200"
                max="6500"
                step="50"
                value={device.colorTemp}
                disabled={!device.online || !device.power}
                onChange={(e) => setDeviceColorTemp(device.id, Number(e.target.value))}
                className="w-full h-4 rounded-full appearance-none cursor-pointer disabled:opacity-40"
                style={{
                  background:
                    'linear-gradient(to right, #FF8C33 0%, #FFAE66 25%, #FFE0B2 50%, #FFF8E7 75%, #D6E8FF 100%)',
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-[#775A4C] dark:text-[#C2ABA0] px-0.5">
              <span>2200K 暖琥珀</span>
              <span>4000K 自然光</span>
              <span>6500K 晨白光</span>
            </div>
          </div>
        ) : (
          /* RGB Color Presets */
          <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-3">
            <div className="text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
              {language === 'zh' ? '常用光色预设' : 'Color Presets'}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {rgbPresets.map((preset) => {
                const isSelected =
                  device.rgb &&
                  device.rgb.r === preset.rgb.r &&
                  device.rgb.g === preset.rgb.g &&
                  device.rgb.b === preset.rgb.b;

                return (
                  <button
                    key={preset.name}
                    onClick={() => setDeviceRgb(device.id, preset.rgb)}
                    disabled={!device.online || !device.power}
                    className="p-2.5 rounded-2xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] flex items-center gap-2 text-xs font-medium text-[#302018] dark:text-[#FFEDE2] active:scale-95 transition-all disabled:opacity-40"
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-xs flex items-center justify-center"
                      style={{
                        backgroundColor: `rgb(${preset.rgb.r}, ${preset.rgb.g}, ${preset.rgb.b})`,
                      }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </span>
                    <span className="truncate">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Technical Specification Accordion */}
        <div className="p-4 rounded-3xl bg-[#FFF3EB] dark:bg-[#241A15] border border-[#F0D5C4]/70 dark:border-[#463328]/70 text-xs space-y-2">
          <div className="font-semibold text-[#302018] dark:text-[#FFEDE2] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
            <span>{language === 'zh' ? '设备连接参数' : 'Hardware Telemetry'}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#775A4C] dark:text-[#C2ABA0] pt-1">
            <div>通讯协议: <strong className="text-[#302018] dark:text-[#FFEDE2]">{device.protocol === 'matter' ? 'Matter over Thread' : 'BLE Mesh 5.0'}</strong></div>
            <div>固件版本: <span className="font-mono text-[#302018] dark:text-[#FFEDE2]">{device.firmwareVersion}</span></div>
            <div>信号强度: <span className="text-[#2E8B57] dark:text-[#48C78E]">极佳 (-48 dBm)</span></div>
            <div>所属网关: <span className="text-[#302018] dark:text-[#FFEDE2]">Matter Gateway Pro</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
