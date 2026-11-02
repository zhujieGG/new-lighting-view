import React, { useState } from 'react';
import {
  ArrowUpCircle,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const FirmwareUpdateScreen: React.FC = () => {
  const { goBack, showToast, language } = useVesta();

  const [upgradingDeviceId, setUpgradingDeviceId] = useState<string | null>(null);
  const [stage, setStage] = useState<'idle' | 'downloading' | 'transferring' | 'flashing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const updatesList = [
    {
      id: 'gw-1',
      name: 'Matter 边缘照明网关 Pro',
      type: '网关固件',
      currentVer: 'v2.4.1',
      targetVer: 'v2.5.0',
      size: '14.2 MB',
      changelog: [
        '优化 Thread 1.3.1 边界路由器多路径容灾路由算法',
        '降低批量场景并发指令广播网络抖动 (<10ms 延迟)',
        '修复极端网络丢包下子设备重连状态同步异常',
      ],
    },
    {
      id: 'dev-2',
      name: '电视背景洗墙线型灯带',
      type: '驱动控制器固件',
      currentVer: 'v1.2.0',
      targetVer: 'v1.2.4',
      size: '2.8 MB',
      changelog: [
        '升级高频 10kHz PWM 调光无频闪调控曲线',
        '增加断电记忆缓启缓灭软启动过渡 (0.8s 柔和点亮)',
      ],
    },
  ];

  const handleStartUpgrade = (devId: string) => {
    setUpgradingDeviceId(devId);
    setStage('downloading');
    setProgress(15);

    setTimeout(() => {
      setStage('transferring');
      setProgress(45);

      setTimeout(() => {
        setStage('flashing');
        setProgress(85);

        setTimeout(() => {
          setStage('done');
          setProgress(100);
          showToast(language === 'zh' ? '固件 OTA 升级成功！' : 'Firmware updated successfully!');
        }, 1200);
      }, 1400);
    }, 1200);
  };

  const getStageLabel = () => {
    switch (stage) {
      case 'downloading':
        return language === 'zh' ? '正在从 VESTA 云端下载加密安装包...' : 'Downloading update package...';
      case 'transferring':
        return language === 'zh' ? '正在通过 Thread 局域网分发固件差分块...' : 'Transferring payload over Thread...';
      case 'flashing':
        return language === 'zh' ? '正在校验签名并刷写芯片 Bootloader...' : 'Verifying checksum & flashing...';
      case 'done':
        return language === 'zh' ? '升级校验完毕，设备已就绪' : 'Update verified & ready';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '固件升级与维护' : 'Firmware Updates'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-5">
        {/* Upgrade Safety Notice */}
        <div className="p-4 rounded-3xl bg-[#FFDFCA] dark:bg-[#38261E] border border-[#E2BFA9] dark:border-[#523A2C] text-xs space-y-1.5">
          <div className="font-bold text-[#AD4215] dark:text-[#FF9E6C] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'zh' ? '双重 A/B 分区安全防护' : 'A/B Dual Partition Safe OTA'}</span>
          </div>
          <p className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] leading-relaxed">
            {language === 'zh'
              ? 'VESTA 固件升级支持自动双备份。升级期间请勿切断总电源，若发生意外网络中断，设备将自动回滚至稳定版本。'
              : 'Automatic dual-bank rollback ensures zero bricking risk during firmware updates.'}
          </p>
        </div>

        {/* Updates List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2] px-1">
            {language === 'zh' ? '可升级设备' : 'Available Updates'} ({updatesList.length})
          </h3>

          {updatesList.map((item) => {
            const isThisUpgrading = upgradingDeviceId === item.id;

            return (
              <div
                key={item.id}
                className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#AD4215]/10 dark:bg-[#FF9E6C]/15 text-[#AD4215] dark:text-[#FF9E6C] flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
                        当前版本: <span className="font-mono">{item.currentVer}</span> → 最新版本:{' '}
                        <span className="font-mono font-bold text-[#AD4215] dark:text-[#FF9E6C]">
                          {item.targetVer}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0] border border-[#F0D5C4] dark:border-[#463328]">
                    {item.size}
                  </span>
                </div>

                {/* Changelog Bullets */}
                <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#241A15] border border-[#F0D5C4]/60 dark:border-[#463328]/60 text-[11px] text-[#775A4C] dark:text-[#C2ABA0] space-y-1">
                  <div className="font-semibold text-[#302018] dark:text-[#FFEDE2]">更新说明：</div>
                  {item.changelog.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#AD4215] dark:text-[#FF9E6C] font-bold">•</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar (if upgrading) */}
                {isThisUpgrading && stage !== 'idle' ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#AD4215] dark:text-[#FF9E6C]">
                      <span>{getStageLabel()}</span>
                      <span className="font-mono">{progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FFDFCA] dark:bg-[#3D2C23] overflow-hidden">
                      <div
                        className="h-full bg-[#AD4215] dark:bg-[#FF9E6C] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {stage === 'done' && (
                      <div className="flex items-center gap-1.5 text-xs text-[#2E8B57] dark:text-[#48C78E] font-bold pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>已成功升级至最新版本</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleStartUpgrade(item.id)}
                      className="h-9 px-4 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-xs"
                    >
                      <ArrowUpCircle className="w-4 h-4" />
                      <span>{language === 'zh' ? '立即升级' : 'Update Now'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
