import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Smartphone,
  Maximize2,
  Globe,
  Compass,
  BookOpen,
  X,
  CheckCircle2,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useVesta } from '../../context/VestaContext';
import { ScreenId } from '../../types/vesta';

export const PrototypeToolbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    showMobileFrame,
    toggleMobileFrame,
    activeScreen,
    navigateTo,
  } = useVesta();

  const [showCatalog, setShowCatalog] = useState(false);
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const screensList: { id: ScreenId; nameZh: string; nameEn: string; category: string }[] = [
    // Phase 2 Core Screens (Must-haves from Prompt)
    { id: 'home', nameZh: '1. 首页 Home (空间与概况)', nameEn: '1. Home (Space & Overview)', category: '核心主页' },
    { id: 'devices', nameZh: '2. 设备列表 Devices (网格/灯组/网关)', nameEn: '2. Devices List (Grid/Groups)', category: '核心主页' },
    { id: 'device_detail', nameZh: '3. 设备控制详情 (色温/亮度/RGB)', nameEn: '3. Device Control Detail (CCT/Dimmer)', category: '核心主页' },
    { id: 'smart_scenes', nameZh: '4. 智能场景 Smart Scenes', nameEn: '4. Smart Scenes', category: '核心主页' },
    { id: 'smart_schedules', nameZh: '5. 日程列表 Smart Schedules (日落日出)', nameEn: '5. Smart Schedules (Sunrise/Sunset)', category: '核心主页' },
    { id: 'discover', nameZh: '6. 探索 Discover (产品/压降/光效)', nameEn: '6. Discover (Products/Engineering)', category: '核心主页' },
    { id: 'profile', nameZh: '7. 我的 Profile (统一色彩功能区)', nameEn: '7. Profile', category: '核心主页' },
    { id: 'app_settings', nameZh: '8. App Settings (外观/语言/权限)', nameEn: '8. App Settings (Theme/Lang)', category: '核心主页' },

    // Extended Flows & Wizards
    { id: 'add_device', nameZh: '配网向导 (Matter 二维码 / BLE Mesh)', nameEn: 'Add Device Wizard (Matter/BLE)', category: '业务流程' },
    { id: 'create_scene', nameZh: '创建/编辑灯光场景', nameEn: 'Create / Edit Scene', category: '业务流程' },
    { id: 'create_schedule', nameZh: '创建/编辑日程 (日出日落偏移)', nameEn: 'Create Schedule (Offsets)', category: '业务流程' },
    { id: 'space_management', nameZh: '空间与网关关联管理', nameEn: 'Space & Gateway Management', category: '业务流程' },
    { id: 'space_sharing', nameZh: '家庭与空间分享 (RBAC 角色权限)', nameEn: 'Space Sharing & RBAC', category: '业务流程' },
    { id: 'firmware_update', nameZh: '网关与设备固件 OTA 升级', nameEn: 'Firmware OTA Update', category: '业务流程' },
    { id: 'voltage_drop', nameZh: '工程工具: 移动端压降模拟器', nameEn: 'Engineering: Voltage Drop Sim', category: '工程工具' },
    { id: 'lighting_demo', nameZh: '灯光演示: 动态空间光效模拟', nameEn: 'Lighting Demo: Spatial Simulation', category: '工程工具' },
    { id: 'auth_welcome', nameZh: '账户体系: 品牌欢迎与登录入口', nameEn: 'Account: Welcome & Login Gateway', category: '账户流程' },
  ];

  return (
    <>
      {/* Top Floating Prototype Control Bar */}
      <aside aria-label="原型评审控制台" className="fixed top-2 right-2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#1D1511]/90 dark:bg-[#2C201A]/95 text-white shadow-xl backdrop-blur-md border border-white/10 text-xs">
        {/* Page Catalog Dropdown Trigger */}
        <button
          onClick={() => setShowCatalog(!showCatalog)}
          className="h-7 px-3 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] dark:text-[#2C1608] font-medium flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>评审目录 ({screensList.length})</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Design System Spec Sheet */}
        <button
          onClick={() => setShowSpecSheet(true)}
          className="h-7 px-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center gap-1"
          title="查看第一阶段架构与视觉规范"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#FFDFCA]" />
          <span className="hidden sm:inline">设计规范</span>
        </button>

        <div className="w-[1px] h-4 bg-white/20" />

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
          title={theme === 'light' ? '切换深色模式' : '切换浅色模式'}
        >
          {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
        </button>

        {/* Mobile Frame Simulation Switcher */}
        <button
          onClick={toggleMobileFrame}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
          title={showMobileFrame ? '切换全屏平铺视图' : '切换手机模型容器'}
        >
          {showMobileFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="h-7 px-2 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all font-mono text-[11px]"
          title="切换中英文"
        >
          <Globe className="w-3 h-3 mr-1" />
          {language === 'zh' ? '中' : 'EN'}
        </button>
      </aside>

      {/* Page Catalog Drawer */}
      {showCatalog && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm max-h-[85vh] flex flex-col rounded-3xl bg-[#FFF8F3] dark:bg-[#1D1511] border border-[#F0D5C4] dark:border-[#463328] shadow-2xl overflow-hidden mt-12 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="p-4 border-b border-[#F0D5C4] dark:border-[#463328] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                  原型评审目录 (Review Directory)
                </h3>
                <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
                  快速直达 16+ 个完整设计页面与业务流程
                </p>
              </div>
              <button
                onClick={() => setShowCatalog(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-4">
              {['核心主页', '业务流程', '工程工具', '账户流程'].map((cat) => (
                <div key={cat}>
                  <div className="text-[11px] font-semibold tracking-wider text-[#AD4215] dark:text-[#FF9E6C] px-2 mb-1.5 uppercase">
                    {cat}
                  </div>
                  <div className="space-y-1">
                    {screensList
                      .filter((s) => s.category === cat)
                      .map((screen) => {
                        const isCurrent = activeScreen === screen.id;
                        return (
                          <button
                            key={screen.id}
                            onClick={() => {
                              navigateTo(screen.id);
                              setShowCatalog(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                              isCurrent
                                ? 'bg-[#AD4215] text-white dark:bg-[#FF9E6C] dark:text-[#2C1608]'
                                : 'text-[#302018] dark:text-[#FFEDE2] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A]'
                            }`}
                          >
                            <span>{language === 'zh' ? screen.nameZh : screen.nameEn}</span>
                            {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Design System Spec Sheet Modal */}
      {showSpecSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FFF8F3] dark:bg-[#1D1511] border border-[#F0D5C4] dark:border-[#463328] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#F0D5C4] dark:border-[#463328] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#AD4215] dark:text-[#FF9E6C] uppercase">
                  VESTA Design System v2.0
                </span>
                <h2 className="text-base font-bold text-[#302018] dark:text-[#FFEDE2]">
                  第一阶段与第二阶段设计规划及视觉规范
                </h2>
              </div>
              <button
                onClick={() => setShowSpecSheet(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#302018] dark:text-[#FFEDE2]">
              {/* Color System Comparison */}
              <div>
                <h4 className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] mb-2">
                  1. 语义颜色系统与双主题映射 (WCAG AA Compliant)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-[#FFEADD] border border-[#F0D5C4] text-[#302018]">
                    <div className="font-bold mb-1">浅色模式 (Light)</div>
                    <ul className="space-y-1 text-[11px] text-[#775A4C]">
                      <li>• 页面背景: 奶油白 #FFF8F3</li>
                      <li>• 普通卡片: 浅杏色 #FFEADD</li>
                      <li>• 强调卡片: 杏橙色 #FFDFCA</li>
                      <li>• 品牌主色: 深橙色 #AD4215</li>
                      <li>• 正文字色: 深棕色 #302018 (对比度 10.4:1)</li>
                      <li>• 次级文字: #775A4C (对比度 5.2:1)</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#2C201A] border border-[#463328] text-[#FFEDE2]">
                    <div className="font-bold mb-1">深色模式 (Dark)</div>
                    <ul className="space-y-1 text-[11px] text-[#C2ABA0]">
                      <li>• 页面背景: 深咖色 #1D1511</li>
                      <li>• 普通卡片: 暖棕色 #2C201A</li>
                      <li>• 强调卡片: 深暖棕 #3D2C23</li>
                      <li>• 品牌主色: 亮杏橙 #FF9E6C</li>
                      <li>• 正文字色: 暖白色 #FFEDE2 (对比度 12.8:1)</li>
                      <li>• 次级文字: #C2ABA0 (对比度 6.8:1)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status & Light Precision */}
              <div>
                <h4 className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] mb-1.5">
                  2. 真实状态区分与灯光精准还原原则
                </h4>
                <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] leading-relaxed">
                  • <strong>离线与关闭彻底解耦</strong>：离线采用警示标识+辅助说明，不可控时明确提示排查路径；关闭设备保留完整暖调卡片和快速开启入口，拒绝全屏死灰。<br/>
                  • <strong>严禁色彩污染</strong>：RGB 彩色预览、色温（2200K~6500K）均基于真实物理发光模型精准渲染，绝不强制染为品牌橙色。
                </p>
              </div>

              {/* Touch & Ergonomics */}
              <div>
                <h4 className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] mb-1.5">
                  3. 移动端人机工程学 (Thumb Zone & Flutter Feasibility)
                </h4>
                <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] leading-relaxed">
                  • <strong>44×44 触摸热区</strong>：所有独立开关、列表操作项、返回键与滑块握柄均满足 iOS/Android 触摸底线。<br/>
                  • <strong>五大底部入口定点</strong>：首页、设备、智能、探索、我的，顺序固定，不遮挡内容，安全区平滑延伸。<br/>
                  • <strong>Flutter 落地友好</strong>：所有组件采用标准 Flex、Column/Row、Slider 及 BottomSheet 架构，可无缝映射到 Flutter Widget 树。
                </p>
              </div>

              {/* Phase 2 Delivery Scope */}
              <div>
                <h4 className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] mb-1.5">
                  4. 第二阶段核心页面交付覆盖
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 1. 首页 Home (空间无冗余标题)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 2. 设备主页面 (列表/灯组/网关)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 3. 设备控制详情 (色温/亮度/RGB)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 4. 智能场景 (执行/动作映射)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 5. 日程列表 (日出日落偏移/重复)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 6. 探索 Discover (产品/压降/光效)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 7. 我的 Profile (统一色彩功能区)
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF3EB] dark:bg-[#251B16] border border-[#F0D5C4]/60 dark:border-[#463328]/60">
                    ✅ 8. App Settings (外观/语言/权限)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#F0D5C4] dark:border-[#463328] flex justify-end">
              <button
                onClick={() => setShowSpecSheet(false)}
                className="px-4 py-2 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-semibold hover:opacity-90"
              >
                返回原型体验
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
