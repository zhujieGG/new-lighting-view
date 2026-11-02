import React from 'react';
import { Compass, Zap, Sparkles, ChevronRight, BookOpen, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const DiscoverScreen: React.FC = () => {
  const { navigateTo, language } = useVesta();

  const productCards = [
    {
      title: 'VESTA AURA 极窄深防眩系列',
      titleEn: 'AURA Ultra-Slim Anti-Glare Downlight',
      tag: 'UGR < 10 · Ra > 98',
      desc: '专为高品位住宅与美术馆打造的微棱镜光学防眩系统，见光不见灯。',
      descEn: 'Architectural micro-prism optical system for pure visual comfort.',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'VESTA LINEA 48V 低压磁吸轨道',
      titleEn: 'LINEA 48V Magnetic Track System',
      tag: 'Matter over Thread 极速响应',
      desc: '模块化组合泛光灯条、可调焦聚光筒与偏光洗墙灯，任意位置即插即用。',
      descEn: 'Modular 48V low-voltage tracks with plug-and-play adjustable fixtures.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header title={language === 'zh' ? '探索与工程' : 'Discover'} />

      <div className="px-5 pt-3 space-y-6">
        {/* Engineering Tools Section (Prominent Cards) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
              <span>{language === 'zh' ? '照明工程专业工具' : 'Engineering Tools'}</span>
            </h2>
            <span className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh' ? '施工与调试必备' : 'Design & Installation'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tool 1: Voltage Drop Simulator */}
            <div
              onClick={() => navigateTo('voltage_drop')}
              className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs cursor-pointer hover:border-[#AD4215] dark:hover:border-[#FF9E6C] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#AD4215] text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-[#38261E] flex items-center justify-center text-[#AD4215] dark:text-[#FF9E6C] group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                  {language === 'zh' ? '线缆压降模拟器' : 'Voltage Drop Simulator'}
                </h3>
                <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-1 line-clamp-2">
                  {language === 'zh'
                    ? '计算 24V/48V 低压灯带与磁吸轨道线长、线规(AWG)压降与安全余量。'
                    : 'Calculate DC voltage drop across cable length, wire AWG & LED load.'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0D5C4]/60 dark:border-[#463328]/60 flex items-center justify-between text-[11px] font-semibold text-[#AD4215] dark:text-[#FF9E6C]">
                <span>{language === 'zh' ? '进入模拟测算' : 'Launch Simulator'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Tool 2: Spatial Lighting Demo */}
            <div
              onClick={() => navigateTo('lighting_demo')}
              className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs cursor-pointer hover:border-[#AD4215] dark:hover:border-[#FF9E6C] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-[#38261E] flex items-center justify-center text-[#D97706] group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                  {language === 'zh' ? '动态空间光效演示' : 'Spatial Lighting Demo'}
                </h3>
                <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-1 line-clamp-2">
                  {language === 'zh'
                    ? '真实三维空间光影模拟，体验 2200K 烛光至 6500K 晨光的渲染张力。'
                    : 'Simulate architectural shadows, CCT warmth & beam angles.'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0D5C4]/60 dark:border-[#463328]/60 flex items-center justify-between text-[11px] font-semibold text-[#D97706]">
                <span>{language === 'zh' ? '体验虚拟光境' : 'Launch Demo'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </section>

        {/* Brand & Product Series Showcase */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
              <span>{language === 'zh' ? 'VESTA 灵感与产品' : 'VESTA Collection'}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {productCards.map((prod) => (
              <div
                key={prod.title}
                className="overflow-hidden rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs"
              >
                <div className="relative h-44 w-full bg-[#1D1511]">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#AD4215]/90 text-[10px] font-semibold tracking-wide uppercase">
                      {prod.tag}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {language === 'zh' ? prod.title : prod.titleEn}
                    </h3>
                  </div>
                </div>

                <div className="p-4 text-xs text-[#775A4C] dark:text-[#C2ABA0] flex items-center justify-between">
                  <p className="line-clamp-2 pr-3">
                    {language === 'zh' ? prod.desc : prod.descEn}
                  </p>
                  <button
                    onClick={() => navigateTo('voltage_drop')}
                    className="h-8 px-3 rounded-full bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs font-semibold text-[#AD4215] dark:text-[#FF9E6C] shrink-0"
                  >
                    {language === 'zh' ? '规格书' : 'Specs'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
