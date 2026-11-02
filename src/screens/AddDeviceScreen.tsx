import React, { useState } from 'react';
import {
  QrCode,
  Bluetooth,
  KeyRound,
  CheckCircle2,
  Loader2,
  Sparkles,
  Wifi,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Camera,
} from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const AddDeviceScreen: React.FC = () => {
  const { goBack, spaces, showToast, language } = useVesta();

  const [step, setStep] = useState<'type' | 'scanning' | 'pairing' | 'naming'>('type');
  const [protocol, setProtocol] = useState<'matter' | 'ble_mesh'>('matter');
  const [pairingProgress, setPairingProgress] = useState(0);
  const [deviceName, setDeviceName] = useState('客厅磁吸轨道射灯 Pro');
  const [targetSpaceId, setTargetSpaceId] = useState(spaces[1]?.id || 'space-2');

  const startPairing = (proto: 'matter' | 'ble_mesh') => {
    setProtocol(proto);
    setStep('scanning');

    // Simulate authentic discover
    setTimeout(() => {
      setStep('pairing');
      simulateProgress();
    }, 1200);
  };

  const simulateProgress = () => {
    setPairingProgress(15);
    const interval = setInterval(() => {
      setPairingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setStep('naming');
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const handleFinish = () => {
    showToast(language === 'zh' ? `「${deviceName}」已成功配网并加入空间` : `Device "${deviceName}" paired!`);
    goBack();
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '添加智能设备' : 'Add Device'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {['选择协议', '搜索接入', '设备绑定', '完成配置'].map((s, idx) => {
            const currentIdx =
              step === 'type' ? 0 : step === 'scanning' ? 1 : step === 'pairing' ? 2 : 3;
            const isPassed = currentIdx >= idx;

            return (
              <div key={s} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isPassed
                      ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608]'
                      : 'bg-[#FFEADD] dark:bg-[#2C201A] text-[#775A4C] dark:text-[#C2ABA0]'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] text-[#775A4C] dark:text-[#C2ABA0] mt-1 font-medium">
                  {s}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step 1: Select Protocol / Method */}
        {step === 'type' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-2">
              <div className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'zh' ? '标准 Matter 极速接入' : 'Matter over Thread'}</span>
              </div>
              <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0]">
                {language === 'zh'
                  ? '支持扫描产品机身或说明书二维码，通过 Thread 局域网边缘网关直接组网，跨平台免云端依赖。'
                  : 'Scan the Matter QR code on device for instant local Thread pairing.'}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => startPairing('matter')}
                  className="w-full h-12 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs"
                >
                  <Camera className="w-4 h-4" />
                  <span>{language === 'zh' ? '扫描 Matter 二维码' : 'Scan Matter QR Code'}</span>
                </button>

                <button
                  onClick={() => startPairing('matter')}
                  className="w-full h-11 rounded-2xl bg-[#FFF3EB] dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs font-medium text-[#775A4C] dark:text-[#FFEDE2] flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{language === 'zh' ? '手动输入 11 或 21 位配对码' : 'Enter Setup Code'}</span>
                </button>
              </div>
            </div>

            {/* Bluetooth Mesh Option */}
            <div className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-2">
              <div className="font-bold text-sm text-[#2563EB] dark:text-[#60A5FA] flex items-center gap-1.5">
                <Bluetooth className="w-4 h-4" />
                <span>{language === 'zh' ? 'Bluetooth Mesh 蓝牙自组网' : 'Bluetooth Mesh'}</span>
              </div>
              <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0]">
                {language === 'zh'
                  ? '适用于单灯具或轨道灯配件快速发现，手机蓝牙靠近设备后一键广播认领。'
                  : 'Nearby BLE Mesh scan for luminaires and track spotlight fixtures.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => startPairing('ble_mesh')}
                  className="w-full h-11 rounded-2xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs font-semibold text-[#302018] dark:text-[#FFEDE2] flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Bluetooth className="w-4 h-4 text-[#2563EB]" />
                  <span>{language === 'zh' ? '搜索附近蓝牙灯具' : 'Scan BLE Mesh Fixtures'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Scanning Simulation */}
        {step === 'scanning' && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#AD4215]/10 dark:bg-[#FF9E6C]/10 flex items-center justify-center animate-ping" />
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-[#FFEADD] dark:bg-[#2C201A] border border-[#AD4215] dark:border-[#FF9E6C] flex items-center justify-center text-[#AD4215] dark:text-[#FF9E6C]">
                {protocol === 'matter' ? <QrCode className="w-10 h-10" /> : <Bluetooth className="w-10 h-10" />}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                {language === 'zh' ? '正在与待配网设备建立加密通道...' : 'Establishing encrypted channel...'}
              </h3>
              <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-1">
                {language === 'zh' ? '请保持手机距离灯具 2 米以内，且供电稳定' : 'Keep device powered and nearby'}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Pairing Progress */}
        {step === 'pairing' && (
          <div className="p-6 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] text-center space-y-4">
            <Loader2 className="w-10 h-10 text-[#AD4215] dark:text-[#FF9E6C] animate-spin mx-auto" />
            
            <div>
              <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                {language === 'zh' ? '正在接入 Matter 边缘网络' : 'Commissioning Device into Matter Network'}
              </h3>
              <div className="text-xs text-[#AD4215] dark:text-[#FF9E6C] font-mono font-bold mt-1">
                {pairingProgress}%
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-[#FFDFCA] dark:bg-[#3D2C23] overflow-hidden">
              <div
                className="h-full bg-[#AD4215] dark:bg-[#FF9E6C] transition-all duration-300"
                style={{ width: `${pairingProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh'
                ? '分配安全公钥证书 · 写入 Thread Mesh 路由 · 分配本地 IP'
                : 'Exchanging Thread network keys & security certificates'}
            </p>
          </div>
        )}

        {/* Step 4: Device Naming and Room Assignment */}
        {step === 'naming' && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-4">
              <div className="flex items-center gap-2 text-[#2E8B57] dark:text-[#48C78E]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">
                  {language === 'zh' ? '设备连接成功！' : 'Device Connected!'}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                  {language === 'zh' ? '设备自定义名称' : 'Device Name'}
                </label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full h-11 mt-1 px-3.5 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                  {language === 'zh' ? '归属空间' : 'Assign to Space'}
                </label>
                <select
                  value={targetSpaceId}
                  onChange={(e) => setTargetSpaceId(e.target.value)}
                  className="w-full h-11 mt-1 px-3 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
                >
                  {spaces.filter((s) => s.id !== 'space-1').map((s) => (
                    <option key={s.id} value={s.id}>
                      {language === 'zh' ? s.name : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full h-12 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'zh' ? '完成并开始控制' : 'Finish & Start Controlling'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
