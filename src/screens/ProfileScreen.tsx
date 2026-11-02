import React from 'react';
import {
  Settings,
  Cpu,
  ArrowUpCircle,
  Users,
  Bluetooth,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Shield,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const ProfileScreen: React.FC = () => {
  const { navigateTo, language, theme } = useVesta();

  const menuSections = [
    {
      title: language === 'zh' ? '硬件与网络' : 'Hardware & Mesh',
      items: [
        {
          id: 'matter_gw',
          title: language === 'zh' ? 'Matter 边缘网关' : 'Matter Gateway',
          desc: language === 'zh' ? '1 台在线 · Thread 局域网组网' : '1 Online · Thread LAN',
          icon: Cpu,
          iconColor: '#2E8B57', // Forest green
          action: () => navigateTo('firmware_update'),
        },
        {
          id: 'ble_mesh',
          title: language === 'zh' ? 'Bluetooth Mesh 管理' : 'Bluetooth Mesh',
          desc: language === 'zh' ? '自组网拓扑 · 3 节点中继' : 'Mesh Relay Topology',
          icon: Bluetooth,
          iconColor: '#2563EB', // Blue
          action: () => navigateTo('devices'),
        },
        {
          id: 'ota',
          title: language === 'zh' ? '固件升级与维护' : 'Firmware Updates',
          desc: language === 'zh' ? '发现 2 项新版本待安装' : '2 Updates Available',
          icon: ArrowUpCircle,
          iconColor: '#D97706', // Warm Amber
          badge: 'NEW',
          action: () => navigateTo('firmware_update'),
        },
      ],
    },
    {
      title: language === 'zh' ? '家庭与权限' : 'Family & Access',
      items: [
        {
          id: 'sharing',
          title: language === 'zh' ? '空间分享与成员管理' : 'Space Sharing & RBAC',
          desc: language === 'zh' ? '3 位家庭成员 · 权限分配' : '3 Members · Roles',
          icon: Users,
          iconColor: '#7C3AED', // Violet
          action: () => navigateTo('space_sharing'),
        },
        {
          id: 'settings',
          title: language === 'zh' ? '应用设置 (App Settings)' : 'App Settings',
          desc: language === 'zh' ? '外观深浅色 · 语言 · 系统权限' : 'Appearance, Language, Permissions',
          icon: Settings,
          iconColor: '#AD4215', // Brand Terracotta
          action: () => navigateTo('app_settings'),
        },
      ],
    },
    {
      title: language === 'zh' ? '支持与关于' : 'Support & About',
      items: [
        {
          id: 'help',
          title: language === 'zh' ? '帮助与调试反馈' : 'Help & Feedback',
          desc: language === 'zh' ? '配网指引 · 常见故障排查' : 'Pairing guides & FAQ',
          icon: HelpCircle,
          iconColor: '#0891B2', // Cyan
          action: () => navigateTo('discover'),
        },
        {
          id: 'about',
          title: language === 'zh' ? '关于 VESTA' : 'About VESTA',
          desc: 'Version 2.4.0 (Build 2026.11)',
          icon: Info,
          iconColor: '#DB2777', // Pink
          action: () => navigateTo('app_settings'),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header title={language === 'zh' ? '我的账户' : 'Profile'} />

      <div className="px-5 pt-3 space-y-6">
        {/* User Profile Card */}
        <div
          onClick={() => navigateTo('auth_welcome')}
          className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Avatar"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#AD4215] dark:border-[#FF9E6C]"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#AD4215] text-white text-[9px] font-bold">
                OWNER
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-[#302018] dark:text-[#FFEDE2]">
                  Alex Li (李先生)
                </h3>
              </div>
              <div className="text-xs text-[#775A4C] dark:text-[#C2ABA0] font-mono mt-0.5">
                alex.li@vesta-lighting.com
              </div>
              <div className="text-[10px] text-[#2E8B57] dark:text-[#48C78E] font-medium mt-1">
                ● 全屋空间最高管理员权限 (Role: Owner)
              </div>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-[#775A4C] dark:text-[#C2ABA0]" />
        </div>

        {/* Menu Sections with Unified Container Geometry & Colorful Functional Icons */}
        {menuSections.map((sec) => (
          <div key={sec.title} className="space-y-2">
            <h3 className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] px-1 uppercase tracking-wider">
              {sec.title}
            </h3>

            <div className="rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] overflow-hidden divide-y divide-[#F0D5C4]/60 dark:divide-[#463328]/60 shadow-xs">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFDFCA]/50 dark:hover:bg-[#3D2C23]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Consistent 38x38 Container with distinctive colorful icon */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${item.iconColor}15`,
                          color: item.iconColor,
                        }}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#302018] dark:text-[#FFEDE2]">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#AD4215] text-white text-[9px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#775A4C] dark:text-[#C2ABA0]" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
