import React from 'react';
import {
  Sun,
  Moon,
  Globe,
  Shield,
  Smartphone,
  Trash2,
  LogOut,
  AlertTriangle,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const AppSettingsScreen: React.FC = () => {
  const { theme, setTheme, language, setLanguage, goBack, showToast, navigateTo } = useVesta();

  const handleClearCache = () => {
    showToast(language === 'zh' ? '本地缓存与日志已清理 (已释放 42.8MB)' : 'Cache cleared (42.8MB freed)');
  };

  const handleLogout = () => {
    showToast(language === 'zh' ? '已安全退出登录' : 'Logged out safely');
    navigateTo('auth_welcome');
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '应用设置' : 'App Settings'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-6">
        {/* Appearance Mode (Light / Dark) */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] px-1 uppercase tracking-wider">
            {language === 'zh' ? '外观与显示 (Appearance)' : 'Appearance'}
          </h3>

          <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-3">
            <div className="text-xs text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh'
                ? 'VESTA 严格采用暖橙色品牌设计系统，仅提供高对比度浅色与深色模式，保障阅读与光效还原。'
                : 'Select between carefully calibrated high-contrast Light and Dark palettes.'}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Light Mode Card */}
              <button
                onClick={() => setTheme('light')}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                  theme === 'light'
                    ? 'bg-[#FFF8F3] border-[#AD4215] text-[#302018] shadow-sm'
                    : 'bg-white/60 dark:bg-[#34241B] border-[#F0D5C4] dark:border-[#463328] text-[#775A4C]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FFEADD] text-[#AD4215] flex items-center justify-center shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold">{language === 'zh' ? '浅色模式' : 'Light Mode'}</div>
                  <div className="text-[10px] text-[#775A4C]">{language === 'zh' ? '奶油白与暖杏色' : 'Cream & Warm Apricot'}</div>
                </div>
                {theme === 'light' && (
                  <span className="w-4 h-4 rounded-full bg-[#AD4215] text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                )}
              </button>

              {/* Dark Mode Card */}
              <button
                onClick={() => setTheme('dark')}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-[#1D1511] border-[#FF9E6C] text-[#FFEDE2] shadow-sm'
                    : 'bg-[#2C201A]/60 border-[#463328] text-[#C2ABA0]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#3D2C23] text-[#FF9E6C] flex items-center justify-center shadow-xs">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold">{language === 'zh' ? '深色模式' : 'Dark Mode'}</div>
                  <div className="text-[10px] text-[#C2ABA0]">{language === 'zh' ? '深咖色与暖棕' : 'Deep Espresso & Warm Brown'}</div>
                </div>
                {theme === 'dark' && (
                  <span className="w-4 h-4 rounded-full bg-[#FF9E6C] text-[#2C1608] flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] px-1 uppercase tracking-wider">
            {language === 'zh' ? '多语言环境 (Language)' : 'Language'}
          </h3>

          <div className="p-3 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-1">
            <button
              onClick={() => setLanguage('zh')}
              className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-[#FFDFCA]/60 dark:hover:bg-[#3D2C23]/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
                <span className="text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
                  简体中文 (Chinese)
                </span>
              </div>
              {language === 'zh' && <Check className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />}
            </button>

            <button
              onClick={() => setLanguage('en')}
              className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-[#FFDFCA]/60 dark:hover:bg-[#3D2C23]/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
                <span className="text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
                  English (International)
                </span>
              </div>
              {language === 'en' && <Check className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />}
            </button>
          </div>
        </div>

        {/* System Permissions Status */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] px-1 uppercase tracking-wider">
            {language === 'zh' ? '系统授权状态 (Permissions)' : 'Permissions'}
          </h3>

          <div className="rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] divide-y divide-[#F0D5C4]/60 dark:divide-[#463328]/60 p-2">
            <div className="p-2.5 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-[#302018] dark:text-[#FFEDE2]">蓝牙 BLE 权限</div>
                <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">用于扫描并接入 BLE Mesh 灯具</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#2E8B57]/15 text-[#2E8B57] dark:text-[#48C78E] text-[10px] font-bold">
                已授权
              </span>
            </div>

            <div className="p-2.5 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-[#302018] dark:text-[#FFEDE2]">局域网通讯 (Local Network)</div>
                <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">用于与 Matter 边缘网关零延迟通讯</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#2E8B57]/15 text-[#2E8B57] dark:text-[#48C78E] text-[10px] font-bold">
                已授权
              </span>
            </div>

            <div className="p-2.5 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-[#302018] dark:text-[#FFEDE2]">相机扫描权限</div>
                <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">用于扫描 Matter 二维码配网</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#2E8B57]/15 text-[#2E8B57] dark:text-[#48C78E] text-[10px] font-bold">
                已授权
              </span>
            </div>
          </div>
        </div>

        {/* Cache & Maintenance */}
        <div className="space-y-2">
          <div className="p-3.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs">
              <Trash2 className="w-4 h-4 text-[#775A4C] dark:text-[#C2ABA0]" />
              <span className="font-semibold text-[#302018] dark:text-[#FFEDE2]">
                {language === 'zh' ? '清理本地缓存与空间日志' : 'Clear Storage Cache'}
              </span>
            </div>
            <button
              onClick={handleClearCache}
              className="px-3 py-1 rounded-full bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs font-semibold text-[#AD4215] dark:text-[#FF9E6C] active:scale-95"
            >
              {language === 'zh' ? '立即清理' : 'Clear'}
            </button>
          </div>
        </div>

        {/* Account Safety & Logout */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full h-12 rounded-2xl bg-[#FFF3EB] dark:bg-[#2C201A] border border-[#E2BFA9] dark:border-[#5E4537] text-xs font-semibold text-[#AD4215] dark:text-[#FF9E6C] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'zh' ? '退出当前账户' : 'Log Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
