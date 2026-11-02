import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const AuthScreens: React.FC = () => {
  const { goBack, navigateTo, showToast, language } = useVesta();

  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>('welcome');
  const [email, setEmail] = useState('alex.li@vesta-lighting.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(language === 'zh' ? '登录成功，欢迎回到 VESTA' : 'Welcome back to VESTA');
    navigateTo('home');
  };

  if (mode === 'welcome') {
    return (
      <div className="flex flex-col min-h-full pb-10 justify-between px-6 pt-10">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-[#AD4215] dark:text-[#FF9E6C] font-sans">
            VESTA
          </span>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] px-3 py-1.5 rounded-full bg-[#FFEADD] dark:bg-[#2C201A]"
          >
            {language === 'zh' ? '跳过并体验' : 'Skip & Explore'}
          </button>
        </div>

        <div className="py-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FFEADD] dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#523A2C] flex items-center justify-center text-[#AD4215] dark:text-[#FF9E6C] shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-[#302018] dark:text-[#FFEDE2] leading-tight">
            温度与光影的<br />建筑艺术控制系统
          </h1>

          <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] leading-relaxed">
            从深防眩微光到全光谱日光，以暖橙色美学贯穿全屋空间，沉浸体验 Matter 与 BLE Mesh 协议的流畅控制。
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setMode('login')}
            className="w-full h-12 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 shadow-sm"
          >
            <span>{language === 'zh' ? '已有账户，直接登录' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMode('register')}
            className="w-full h-12 rounded-2xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] text-xs font-bold text-[#302018] dark:text-[#FFEDE2] active:scale-98"
          >
            {language === 'zh' ? '注册新业主账户' : 'Create New Account'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={mode === 'login' ? (language === 'zh' ? '账户登录' : 'Sign In') : (language === 'zh' ? '注册业主账户' : 'Register')}
        showBack
        onBack={() => setMode('welcome')}
      />

      <div className="px-6 pt-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#302018] dark:text-[#FFEDE2]">
            {mode === 'login' ? '欢迎回到 VESTA' : '创建你的智能灯光空间'}
          </h2>
          <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-1">
            {mode === 'login'
              ? '请输入注册邮箱或手机号以同步云端空间数据'
              : '注册后即可绑定 Matter 边缘网关与添加设备'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              电子邮箱 / 业主账号
            </label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 text-[#775A4C] dark:text-[#C2ABA0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              密码
            </label>
            <div className="relative mt-1">
              <Lock className="w-4 h-4 text-[#775A4C] dark:text-[#C2ABA0] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 pl-9 pr-10 rounded-xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#775A4C] dark:text-[#C2ABA0]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-4 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 shadow-sm"
          >
            <span>{mode === 'login' ? '立即登录' : '同意条款并注册'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs font-semibold text-[#AD4215] dark:text-[#FF9E6C] hover:underline"
          >
            {mode === 'login' ? '还没有账户？立即注册' : '已有账户？直接登录'}
          </button>
        </div>
      </div>
    </div>
  );
};
