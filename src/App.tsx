import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { VestaProvider, useVesta } from './context/VestaContext';
import { BottomTabBar } from './components/common/BottomTabBar';
import { PrototypeToolbar } from './components/prototype/PrototypeToolbar';

// Screen imports
import { HomeScreen } from './screens/HomeScreen';
import { DevicesScreen } from './screens/DevicesScreen';
import { DeviceDetailScreen } from './screens/DeviceDetailScreen';
import { ScenesScreen } from './screens/ScenesScreen';
import { SchedulesScreen } from './screens/SchedulesScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AppSettingsScreen } from './screens/AppSettingsScreen';
import { AddDeviceScreen } from './screens/AddDeviceScreen';
import { CreateSceneScreen } from './screens/CreateSceneScreen';
import { CreateScheduleScreen } from './screens/CreateScheduleScreen';
import { VoltageDropScreen } from './screens/VoltageDropScreen';
import { LightingDemoScreen } from './screens/LightingDemoScreen';
import { SpaceSharingScreen } from './screens/SpaceSharingScreen';
import { FirmwareUpdateScreen } from './screens/FirmwareUpdateScreen';
import { SpaceManagementScreen } from './screens/SpaceManagementScreen';
import { AuthScreens } from './screens/AuthScreens';

const AppContent: React.FC = () => {
  const { activeScreen, showMobileFrame, toast } = useVesta();

  const isMainTabScreen = [
    'home',
    'devices',
    'smart_scenes',
    'smart_schedules',
    'discover',
    'profile',
  ].includes(activeScreen);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'devices':
        return <DevicesScreen />;
      case 'device_detail':
        return <DeviceDetailScreen />;
      case 'smart_scenes':
        return <ScenesScreen />;
      case 'smart_schedules':
        return <SchedulesScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'app_settings':
        return <AppSettingsScreen />;
      case 'add_device':
        return <AddDeviceScreen />;
      case 'create_scene':
        return <CreateSceneScreen />;
      case 'create_schedule':
        return <CreateScheduleScreen />;
      case 'voltage_drop':
        return <VoltageDropScreen />;
      case 'lighting_demo':
        return <LightingDemoScreen />;
      case 'space_sharing':
        return <SpaceSharingScreen />;
      case 'firmware_update':
        return <FirmwareUpdateScreen />;
      case 'space_management':
        return <SpaceManagementScreen />;
      case 'auth_welcome':
      case 'auth_login':
        return <AuthScreens />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5ECE5] dark:bg-[#140E0B] text-[#302018] dark:text-[#FFEDE2] flex flex-col items-center justify-center transition-colors">
      {/* Reviewer Toolbar (Design System Catalog & Switchers) */}
      <PrototypeToolbar />

      {/* Main Container: Mobile Frame vs Responsive Full Canvas */}
      {showMobileFrame ? (
        <div className="py-8 px-4 flex flex-col items-center justify-center w-full">
          {/* Subtle Ambient Frame Title */}
          <div className="mb-3 text-center">
            <span className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0] tracking-wider uppercase">
              VESTA Smart Lighting · Mobile Touch Prototype (390 × 844)
            </span>
          </div>

          {/* Smartphone Hardware Enclosure */}
          <div className="relative w-[390px] h-[844px] rounded-[52px] bg-[#1D1511] p-3 shadow-2xl ring-1 ring-black/10 border-4 border-[#3D2C23]">
            {/* Inner Screen Bezel & Canvas */}
            <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-[#FFF8F3] dark:bg-[#1D1511] flex flex-col">
              {/* iOS Mobile Status Bar */}
              <div className="h-11 shrink-0 px-6 flex items-center justify-between text-xs font-semibold select-none z-30 text-[#302018] dark:text-[#FFEDE2]">
                <span className="font-mono text-[13px] tracking-tight">09:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-24 h-6 rounded-full bg-black mx-auto shrink-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1D1511] mr-3" />
                  <div className="w-2 h-2 rounded-full bg-[#2E8B57] opacity-60" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
                  <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                  <Battery className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                {renderActiveScreen()}
              </div>

              {/* Fixed Bottom Tab Bar if on primary tab */}
              {isMainTabScreen && <BottomTabBar />}

              {/* iOS Home Indicator Bar */}
              <div className="h-4 bg-[#FFF8F3] dark:bg-[#1D1511] flex items-center justify-center shrink-0 pb-1">
                <div className="w-32 h-1 rounded-full bg-[#302018]/25 dark:bg-[#FFEDE2]/25" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Width Touch Viewport Canvas */
        <div className="w-full max-w-md min-h-screen bg-[#FFF8F3] dark:bg-[#1D1511] flex flex-col shadow-xl">
          <div className="flex-1 flex flex-col">{renderActiveScreen()}</div>
          {isMainTabScreen && <BottomTabBar />}
        </div>
      )}

      {/* Global Interactive Toast Feedback */}
      {toast && (
        <aside
          aria-label="操作反馈提示"
          className="fixed bottom-20 z-50 px-4 py-2.5 rounded-2xl bg-[#1D1511]/95 dark:bg-[#FFF8F3]/95 text-white dark:text-[#2C1608] text-xs font-medium shadow-2xl backdrop-blur-md border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {toast}
        </aside>
      )}
    </div>
  );
};

export default function App() {
  return (
    <VestaProvider>
      <AppContent />
    </VestaProvider>
  );
}
