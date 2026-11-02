import React from 'react';
import { Power, WifiOff, Cpu, Lightbulb, Radio, AlertCircle } from 'lucide-react';
import { VestaDevice } from '../../types/vesta';
import { useVesta } from '../../context/VestaContext';

interface DeviceCardProps {
  device: VestaDevice;
  compact?: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, compact = false }) => {
  const { toggleDevicePower, navigateTo, language } = useVesta();

  const isGateway = device.type === 'gateway';

  // Handle clicking card body -> Navigate to Detail
  const handleCardClick = () => {
    if (isGateway) {
      navigateTo('firmware_update');
    } else {
      navigateTo('device_detail', { deviceId: device.id });
    }
  };

  // Handle quick switch button without bubbling
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDevicePower(device.id);
  };

  const getDeviceIcon = () => {
    if (isGateway) return <Cpu className="w-5 h-5 text-[#AD4215] dark:text-[#FF9E6C]" />;
    return <Lightbulb className="w-5 h-5" />;
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer border select-none ${
        !device.online
          ? 'bg-[#F5ECE5] dark:bg-[#251B16] border-[#E5D7CE] dark:border-[#3D2C24] opacity-80'
          : device.power
          ? 'bg-[#FFEADD] dark:bg-[#34241B] border-[#FFDFCA] dark:border-[#523A2C] shadow-sm hover:shadow-md'
          : 'bg-[#FFF3EB] dark:bg-[#2C201A] border-[#F0D5C4]/70 dark:border-[#463328]/70 hover:border-[#E2BFA9]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Device Icon & Type Tag */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              !device.online
                ? 'bg-[#E8DCD3] dark:bg-[#31231C] text-[#8A7B73] dark:text-[#7D6B63]'
                : device.power
                ? 'bg-[#FFDFCA] dark:bg-[#4E3526] text-[#AD4215] dark:text-[#FF9E6C]'
                : 'bg-[#F2DFD2] dark:bg-[#38281F] text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            {getDeviceIcon()}
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-[#775A4C] dark:text-[#C2ABA0] font-medium flex items-center gap-1">
              <span>{device.protocol === 'matter' ? 'Matter' : 'BLE Mesh'}</span>
              {!device.online ? (
                <span className="text-[#C23326] dark:text-[#F87171] font-semibold flex items-center gap-0.5 ml-1">
                  <WifiOff className="w-3 h-3" />
                  {language === 'zh' ? '离线' : 'Offline'}
                </span>
              ) : isGateway ? (
                <span className="text-[#2E8B57] dark:text-[#48C78E] ml-1">
                  {language === 'zh' ? '运行中' : 'Online'}
                </span>
              ) : null}
            </span>
          </div>
        </div>

        {/* Quick Power Switch (44x44 hitbox) */}
        {!isGateway && (
          <button
            onClick={handleToggle}
            disabled={!device.online}
            aria-label={device.power ? 'Turn off' : 'Turn on'}
            className={`min-w-[44px] min-h-[44px] -mr-1.5 -mt-1.5 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
              !device.online
                ? 'cursor-not-allowed opacity-40'
                : device.power
                ? 'text-[#AD4215] dark:text-[#FF9E6C]'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                !device.online
                  ? 'border-[#C2ABA0]/50'
                  : device.power
                  ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] border-transparent shadow-xs'
                  : 'bg-transparent border-[#E2BFA9] dark:border-[#5E4537]'
              }`}
            >
              <Power className="w-4 h-4" />
            </div>
          </button>
        )}

        {isGateway && device.hasUpdate && (
          <div className="px-2 py-0.5 rounded-full bg-[#AD4215]/10 dark:bg-[#FF9E6C]/20 text-[#AD4215] dark:text-[#FF9E6C] text-[10px] font-semibold">
            {language === 'zh' ? '可升级' : 'Update'}
          </div>
        )}
      </div>

      {/* Device Name */}
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-[#302018] dark:text-[#FFEDE2] leading-snug line-clamp-2">
          {language === 'zh' ? device.name : device.nameEn}
        </h3>
      </div>

      {/* Lighting Metrics / Telemetry */}
      <div className="mt-2.5 pt-2 border-t border-[#F0D5C4]/60 dark:border-[#463328]/60 flex items-center justify-between text-xs">
        {!device.online ? (
          <div className="text-[11px] text-[#8A7B73] dark:text-[#7D6B63] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#C23326] dark:text-[#F87171]" />
            <span>{language === 'zh' ? '未连接至网关，点击排查' : 'Not reachable, tap to fix'}</span>
          </div>
        ) : isGateway ? (
          <div className="flex items-center justify-between w-full text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
            <span>{device.ip}</span>
            <span className="font-mono">{device.firmwareVersion}</span>
          </div>
        ) : (
          <>
            <span className="text-[#775A4C] dark:text-[#C2ABA0]">
              {device.power
                ? `${language === 'zh' ? '亮度' : 'Bri'}: ${device.brightness}%`
                : language === 'zh'
                ? '已关闭'
                : 'Turned off'}
            </span>

            {device.power && (
              <div className="flex items-center gap-1.5">
                {device.rgb ? (
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    style={{
                      backgroundColor: `rgb(${device.rgb.r}, ${device.rgb.g}, ${device.rgb.b})`,
                    }}
                    title="RGB Color"
                  />
                ) : (
                  <span className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] font-mono">
                    {device.colorTemp}K
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
