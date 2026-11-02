import React, { useState } from 'react';
import { Sun, Palette, Sparkles, Sliders, ChevronLeft } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const LightingDemoScreen: React.FC = () => {
  const { goBack, language } = useVesta();

  const [brightness, setBrightness] = useState<number>(75);
  const [colorTemp, setColorTemp] = useState<number>(2700);
  const [rgbColor, setRgbColor] = useState<{ r: number; g: number; b: number }>({
    r: 255,
    g: 170,
    b: 90,
  });
  const [mode, setMode] = useState<'cct' | 'rgb'>('cct');

  const getKelvinColor = (kelvin: number) => {
    if (kelvin < 2800) return 'rgba(255, 140, 50, 0.85)';
    if (kelvin < 3500) return 'rgba(255, 185, 110, 0.85)';
    if (kelvin < 5000) return 'rgba(255, 230, 190, 0.85)';
    return 'rgba(215, 235, 255, 0.85)';
  };

  const activeGlow =
    mode === 'cct'
      ? getKelvinColor(colorTemp)
      : `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.85)`;

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '动态空间光效演示' : 'Lighting Demo'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-5">
        {/* Architectural 3D Space Viewport Simulation */}
        <div className="relative h-64 rounded-3xl overflow-hidden bg-[#1D1511] border border-[#F0D5C4] dark:border-[#463328] shadow-md flex items-center justify-center">
          {/* Virtual Wall & Room Perspective */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#110B08] via-[#1D1511] to-[#2B1F18]" />
          
          {/* Wall texture lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Virtual Ceiling Fixture */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-12 h-3 rounded-full bg-[#3D2C23] border border-[#5E4537]" />
            <div
              className="w-8 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeGlow,
                boxShadow: `0 0 20px ${activeGlow}`,
              }}
            />
          </div>

          {/* Optical Wash Light Cone & Beam Spread */}
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 w-48 h-56 transition-all duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${activeGlow} 0%, rgba(0,0,0,0) 70%)`,
              opacity: brightness / 100,
              transform: `scale(${0.7 + (brightness / 100) * 0.4})`,
            }}
          />

          {/* Virtual Interior Artwork Illuminated */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-36 rounded-xl bg-[#2C201A] border border-[#5E4537] shadow-xl flex flex-col items-center justify-center p-2 text-center z-10">
            <div className="w-16 h-16 rounded-lg bg-black/40 flex items-center justify-center text-[10px] text-white/50">
              VESTA ART
            </div>
            <div className="text-[10px] text-white/70 mt-2 font-mono">
              {mode === 'cct' ? `${colorTemp}K` : 'RGB Color'}
            </div>
          </div>
        </div>

        {/* Live Controls */}
        <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-4">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-white/70 dark:bg-[#241A15] border border-[#F0D5C4] dark:border-[#463328]">
            <button
              onClick={() => setMode('cct')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold ${
                mode === 'cct'
                  ? 'bg-[#AD4215] text-white dark:bg-[#FF9E6C] dark:text-[#2C1608]'
                  : 'text-[#775A4C] dark:text-[#C2ABA0]'
              }`}
            >
              自然色温 CCT
            </button>
            <button
              onClick={() => setMode('rgb')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold ${
                mode === 'rgb'
                  ? 'bg-[#AD4215] text-white dark:bg-[#FF9E6C] dark:text-[#2C1608]'
                  : 'text-[#775A4C] dark:text-[#C2ABA0]'
              }`}
            >
              全彩氛围 RGB
            </button>
          </div>

          {/* Brightness Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
              <span>空间总照度</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">{brightness}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-3 mt-2 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer"
            />
          </div>

          {/* Color Temp Slider or RGB presets */}
          {mode === 'cct' ? (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
                <span>色温变化 (2200K - 6500K)</span>
                <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">{colorTemp}K</span>
              </div>
              <input
                type="range"
                min="2200"
                max="6500"
                step="50"
                value={colorTemp}
                onChange={(e) => setColorTemp(Number(e.target.value))}
                className="w-full h-4 mt-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background:
                    'linear-gradient(to right, #FF8C33 0%, #FFAE66 25%, #FFE0B2 50%, #FFF8E7 75%, #D6E8FF 100%)',
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { name: '琥珀金', rgb: { r: 255, g: 150, b: 50 } },
                { name: '珊瑚粉', rgb: { r: 255, g: 100, b: 120 } },
                { name: '森林绿', rgb: { r: 50, g: 180, b: 100 } },
                { name: '冰晶蓝', rgb: { r: 60, g: 160, b: 255 } },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setRgbColor(c.rgb)}
                  className="p-2 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] flex flex-col items-center gap-1 text-[11px] font-semibold text-[#302018] dark:text-[#FFEDE2]"
                >
                  <span
                    className="w-6 h-6 rounded-full shadow-xs"
                    style={{ backgroundColor: `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})` }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
