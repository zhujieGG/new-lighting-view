import React, { useState } from 'react';
import { Sparkles, Sun, Palette, Check, Play, ChevronLeft } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const CreateSceneScreen: React.FC = () => {
  const { goBack, devices, showToast, language } = useVesta();

  const [sceneName, setSceneName] = useState('温馨夜读光境');
  const [selectedColor, setSelectedColor] = useState('#D97706');
  const [targetBrightness, setTargetBrightness] = useState(65);
  const [targetCct, setTargetCct] = useState(3000);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['dev-1', 'dev-7']);

  const colorPalette = ['#AD4215', '#D97706', '#C05621', '#E07A5F', '#93360F', '#4A6B53', '#3B82F6'];

  const handleSave = () => {
    showToast(language === 'zh' ? `场景「${sceneName}」已保存并发布` : `Scene "${sceneName}" saved`);
    goBack();
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '创建/编辑灯光场景' : 'Create Scene'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-5">
        {/* Basic Name & Color Identifier */}
        <div className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh' ? '场景名称' : 'Scene Name'}
            </label>
            <input
              type="text"
              value={sceneName}
              onChange={(e) => setSceneName(e.target.value)}
              className="w-full h-11 mt-1 px-3.5 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] font-semibold focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh' ? '场景主题色标' : 'Theme Color Tag'}
            </label>
            <div className="flex items-center gap-2 mt-1.5">
              {colorPalette.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
                  style={{ backgroundColor: c }}
                >
                  {selectedColor === c && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lighting Actions Configuration */}
        <div className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-4">
          <h3 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '目标光效设定' : 'Lighting Target Output'}
          </h3>

          {/* Brightness */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
              <span>预设整体照度</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">{targetBrightness}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={targetBrightness}
              onChange={(e) => setTargetBrightness(Number(e.target.value))}
              className="w-full h-3 mt-2 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer"
            />
          </div>

          {/* CCT */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
              <span>预设色温光谱</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C]">{targetCct}K</span>
            </div>
            <input
              type="range"
              min="2200"
              max="6500"
              step="50"
              value={targetCct}
              onChange={(e) => setTargetCct(Number(e.target.value))}
              className="w-full h-4 mt-2 rounded-full appearance-none cursor-pointer"
              style={{
                background:
                  'linear-gradient(to right, #FF8C33 0%, #FFAE66 25%, #FFE0B2 50%, #FFF8E7 75%, #D6E8FF 100%)',
              }}
            />
          </div>
        </div>

        {/* Member Fixtures Selection */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2] px-1">
            {language === 'zh' ? '关联执行灯具' : 'Participating Fixtures'}
          </h3>

          <div className="space-y-2">
            {devices.filter((d) => d.type !== 'gateway').map((dev) => {
              const isSelected = selectedDevices.includes(dev.id);

              return (
                <button
                  key={dev.id}
                  onClick={() => {
                    setSelectedDevices((prev) =>
                      isSelected ? prev.filter((id) => id !== dev.id) : [...prev, dev.id]
                    );
                  }}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between border text-left transition-all ${
                    isSelected
                      ? 'bg-[#FFEADD] dark:bg-[#34241B] border-[#AD4215] dark:border-[#FF9E6C]'
                      : 'bg-[#FFF3EB] dark:bg-[#2C201A] border-[#F0D5C4] dark:border-[#463328]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
                      {dev.name}
                    </div>
                    <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
                      {dev.protocol === 'matter' ? 'Matter' : 'BLE Mesh'} · 当前: {dev.brightness}% / {dev.colorTemp}K
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] border-transparent'
                        : 'border-[#E2BFA9] dark:border-[#5E4537]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
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
          <Sparkles className="w-4 h-4" />
          <span>{language === 'zh' ? '保存并应用场景' : 'Save & Deploy Scene'}</span>
        </button>
      </div>
    </div>
  );
};
