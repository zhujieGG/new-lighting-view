import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppTheme,
  AppLanguage,
  MainTab,
  ScreenId,
  Space,
  VestaDevice,
  LightGroup,
  LightingScene,
  LightingSchedule,
} from '../types/vesta';
import {
  INITIAL_SPACES,
  INITIAL_DEVICES,
  INITIAL_GROUPS,
  INITIAL_SCENES,
  INITIAL_SCHEDULES,
} from '../data/mockData';

interface VestaContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  currentTab: MainTab;
  setCurrentTab: (tab: MainTab) => void;
  activeScreen: ScreenId;
  navigateTo: (screen: ScreenId, params?: { deviceId?: string; groupId?: string }) => void;
  goBack: () => void;
  screenHistory: ScreenId[];
  
  spaces: Space[];
  selectedSpaceId: string;
  setSelectedSpaceId: (id: string) => void;
  
  devices: VestaDevice[];
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string | null) => void;
  toggleDevicePower: (id: string) => void;
  setDeviceBrightness: (id: string, brightness: number) => void;
  setDeviceColorTemp: (id: string, temp: number) => void;
  setDeviceRgb: (id: string, rgb: { r: number; g: number; b: number }) => void;
  allLightsOnInSpace: (spaceId?: string) => void;
  allLightsOffInSpace: (spaceId?: string) => void;
  
  groups: LightGroup[];
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  toggleGroupPower: (id: string) => void;
  setGroupBrightness: (id: string, brightness: number) => void;
  
  scenes: LightingScene[];
  executingSceneId: string | null;
  runScene: (sceneId: string) => void;
  
  schedules: LightingSchedule[];
  toggleSchedule: (scheduleId: string) => void;
  
  showMobileFrame: boolean;
  toggleMobileFrame: () => void;
  
  toast: string | null;
  showToast: (msg: string) => void;
}

const VestaContext = createContext<VestaContextType | undefined>(undefined);

export const VestaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>('light');
  const [language, setLanguage] = useState<AppLanguage>('zh');
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['home']);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('space-1');
  
  const [devices, setDevices] = useState<VestaDevice[]>(INITIAL_DEVICES);
  const [groups, setGroups] = useState<LightGroup[]>(INITIAL_GROUPS);
  const [scenes, setScenes] = useState<LightingScene[]>(INITIAL_SCENES);
  const [schedules, setSchedules] = useState<LightingSchedule[]>(INITIAL_SCHEDULES);
  
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>('dev-1');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  
  const [showMobileFrame, setShowMobileFrame] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);
  const [executingSceneId, setExecutingSceneId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  const navigateTo = (screen: ScreenId, params?: { deviceId?: string; groupId?: string }) => {
    if (params?.deviceId) setSelectedDeviceId(params.deviceId);
    if (params?.groupId) setSelectedGroupId(params.groupId);
    
    // Map screen to tab if it's a main entry
    if (screen === 'home') setCurrentTab('home');
    else if (screen === 'devices') setCurrentTab('devices');
    else if (screen === 'smart_scenes' || screen === 'smart_schedules') setCurrentTab('smart');
    else if (screen === 'discover') setCurrentTab('discover');
    else if (screen === 'profile') setCurrentTab('profile');
    
    setActiveScreen(screen);
    setScreenHistory((prev) => [...prev, screen]);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setActiveScreen(prevScreen);
    } else {
      setActiveScreen('home');
      setCurrentTab('home');
    }
  };

  const toggleDevicePower = (id: string) => {
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.id === id) {
          if (!dev.online) {
            showToast(language === 'zh' ? '设备离线，请检查供电或网络' : 'Device offline, check power or mesh');
            return dev;
          }
          const nextPower = !dev.power;
          showToast(
            `${dev.name} ${nextPower ? (language === 'zh' ? '已开启' : 'Turned On') : (language === 'zh' ? '已关闭' : 'Turned Off')}`
          );
          return { ...dev, power: nextPower };
        }
        return dev;
      })
    );
  };

  const setDeviceBrightness = (id: string, brightness: number) => {
    setDevices((prev) =>
      prev.map((dev) => (dev.id === id ? { ...dev, brightness, power: brightness > 0 ? true : dev.power } : dev))
    );
  };

  const setDeviceColorTemp = (id: string, colorTemp: number) => {
    setDevices((prev) => prev.map((dev) => (dev.id === id ? { ...dev, colorTemp } : dev)));
  };

  const setDeviceRgb = (id: string, rgb: { r: number; g: number; b: number }) => {
    setDevices((prev) => prev.map((dev) => (dev.id === id ? { ...dev, rgb } : dev)));
  };

  const allLightsOnInSpace = (spaceId?: string) => {
    const targetSpace = spaceId || selectedSpaceId;
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.type === 'gateway' || !dev.online) return dev;
        if (targetSpace === 'space-1' || dev.spaceId === targetSpace) {
          return { ...dev, power: true, brightness: dev.brightness === 0 ? 80 : dev.brightness };
        }
        return dev;
      })
    );
    showToast(language === 'zh' ? '已开启空间内所有灯具' : 'All lights turned on in space');
  };

  const allLightsOffInSpace = (spaceId?: string) => {
    const targetSpace = spaceId || selectedSpaceId;
    setDevices((prev) =>
      prev.map((dev) => {
        if (dev.type === 'gateway') return dev;
        if (targetSpace === 'space-1' || dev.spaceId === targetSpace) {
          return { ...dev, power: false };
        }
        return dev;
      })
    );
    showToast(language === 'zh' ? '已关闭空间内所有灯具' : 'All lights turned off in space');
  };

  const toggleGroupPower = (id: string) => {
    setGroups((prev) =>
      prev.map((grp) => {
        if (grp.id === id) {
          const nextPower = !grp.power;
          // Synchronize member devices
          setDevices((devList) =>
            devList.map((d) => (grp.deviceIds.includes(d.id) && d.online ? { ...d, power: nextPower } : d))
          );
          return { ...grp, power: nextPower };
        }
        return grp;
      })
    );
  };

  const setGroupBrightness = (id: string, brightness: number) => {
    setGroups((prev) =>
      prev.map((grp) => {
        if (grp.id === id) {
          setDevices((devList) =>
            devList.map((d) => (grp.deviceIds.includes(d.id) && d.online ? { ...d, brightness, power: true } : d))
          );
          return { ...grp, brightness, power: true };
        }
        return grp;
      })
    );
  };

  const runScene = (sceneId: string) => {
    setExecutingSceneId(sceneId);
    const scene = scenes.find((s) => s.id === sceneId);
    
    // Simulate real execution delay
    setTimeout(() => {
      if (sceneId === 'scene-6') {
        // Eco / all off
        allLightsOffInSpace('space-1');
      } else if (sceneId === 'scene-1') {
        // Warm welcome
        setDevices((prev) =>
          prev.map((d) =>
            d.type !== 'gateway' && d.online
              ? { ...d, power: true, brightness: 75, colorTemp: 2800 }
              : d
          )
        );
      } else if (sceneId === 'scene-2') {
        // Focus & Study
        setDevices((prev) =>
          prev.map((d) => {
            if (d.id === 'dev-7') return { ...d, power: true, brightness: 95, colorTemp: 4200 };
            if (d.id === 'dev-1') return { ...d, power: true, brightness: 40, colorTemp: 3800 };
            return d;
          })
        );
      } else if (sceneId === 'scene-3') {
        // Cinema
        setDevices((prev) =>
          prev.map((d) => {
            if (d.id === 'dev-2') return { ...d, power: true, brightness: 35, colorTemp: 2400 };
            if (['dev-1', 'dev-3'].includes(d.id)) return { ...d, power: false };
            return d;
          })
        );
      }
      setExecutingSceneId(null);
      showToast(
        language === 'zh'
          ? `「${scene?.name || '场景'}」执行成功`
          : `Scene "${scene?.nameEn || 'Scene'}" executed`
      );
    }, 600);
  };

  const toggleSchedule = (scheduleId: string) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.id === scheduleId) {
          const next = !s.enabled;
          showToast(
            `${s.name} ${next ? (language === 'zh' ? '已启用' : 'Enabled') : (language === 'zh' ? '已暂停' : 'Disabled')}`
          );
          return { ...s, enabled: next };
        }
        return s;
      })
    );
  };

  const toggleMobileFrame = () => {
    setShowMobileFrame((prev) => !prev);
  };

  return (
    <VestaContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        currentTab,
        setCurrentTab: (tab) => {
          setCurrentTab(tab);
          if (tab === 'home') setActiveScreen('home');
          else if (tab === 'devices') setActiveScreen('devices');
          else if (tab === 'smart') setActiveScreen('smart_scenes');
          else if (tab === 'discover') setActiveScreen('discover');
          else if (tab === 'profile') setActiveScreen('profile');
        },
        activeScreen,
        navigateTo,
        goBack,
        screenHistory,
        spaces: INITIAL_SPACES,
        selectedSpaceId,
        setSelectedSpaceId,
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
        toggleDevicePower,
        setDeviceBrightness,
        setDeviceColorTemp,
        setDeviceRgb,
        allLightsOnInSpace,
        allLightsOffInSpace,
        groups,
        selectedGroupId,
        setSelectedGroupId,
        toggleGroupPower,
        setGroupBrightness,
        scenes,
        executingSceneId,
        runScene,
        schedules,
        toggleSchedule,
        showMobileFrame,
        toggleMobileFrame,
        toast,
        showToast,
      }}
    >
      {children}
    </VestaContext.Provider>
  );
};

export const useVesta = () => {
  const context = useContext(VestaContext);
  if (!context) {
    throw new Error('useVesta must be used within a VestaProvider');
  }
  return context;
};
