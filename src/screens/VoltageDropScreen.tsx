import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, Info, ChevronLeft, Plus, Trash2, Cpu } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const VoltageDropScreen: React.FC = () => {
  const { goBack, language } = useVesta();

  // DC System Voltage: 24V or 48V
  const [systemVoltage, setSystemVoltage] = useState<24 | 48>(24);
  // Wire Gauge: AWG
  const [gauge, setGauge] = useState<18 | 16 | 14 | 12>(16);
  // Distance in meters
  const [wireLength, setWireLength] = useState<number>(15);
  // Total load in Watts
  const [loadWatts, setLoadWatts] = useState<number>(96);

  // Copper resistance ohms per meter (2-conductor loop round-trip)
  // 18 AWG: ~0.0427 ohm/m loop
  // 16 AWG: ~0.0268 ohm/m loop
  // 14 AWG: ~0.0168 ohm/m loop
  // 12 AWG: ~0.0106 ohm/m loop
  const resistancePerMeter: Record<number, number> = {
    18: 0.0427,
    16: 0.0268,
    14: 0.0168,
    12: 0.0106,
  };

  const totalResistance = resistancePerMeter[gauge] * wireLength;
  const currentAmps = loadWatts / systemVoltage;
  const voltageDropVolts = currentAmps * totalResistance;
  const voltageDropPercent = (voltageDropVolts / systemVoltage) * 100;
  const terminalVoltage = Math.max(0, systemVoltage - voltageDropVolts);

  // Status level
  const status =
    voltageDropPercent <= 3.0
      ? 'optimal'
      : voltageDropPercent <= 5.0
      ? 'warning'
      : 'critical';

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '直流线缆压降模拟器' : 'Voltage Drop Sim'}
        showBack
        onBack={goBack}
      />

      <div className="px-5 pt-3 space-y-5">
        {/* Real-time Calculation Result Card */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            status === 'optimal'
              ? 'bg-[#2E8B57]/10 dark:bg-[#48C78E]/10 border-[#2E8B57]/30 text-[#2E8B57] dark:text-[#48C78E]'
              : status === 'warning'
              ? 'bg-[#D97706]/10 dark:bg-[#FBBF24]/10 border-[#D97706]/30 text-[#D97706] dark:text-[#FBBF24]'
              : 'bg-[#C23326]/10 dark:bg-[#F87171]/10 border-[#C23326]/30 text-[#C23326] dark:text-[#F87171]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'zh' ? '末端压降评估' : 'Voltage Drop Status'}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold">
              {status === 'optimal' && <CheckCircle className="w-4 h-4" />}
              {status === 'warning' && <AlertTriangle className="w-4 h-4" />}
              {status === 'critical' && <AlertTriangle className="w-4 h-4" />}
              <span>
                {status === 'optimal'
                  ? language === 'zh' ? '优秀 (符合工程规范)' : 'Optimal'
                  : status === 'warning'
                  ? language === 'zh' ? '警告 (照度略微可见衰减)' : 'Warning'
                  : language === 'zh' ? '危险 (超载或偏色闪烁)' : 'Critical'}
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 pt-2 border-t border-current/20">
            <div>
              <div className="text-[11px] opacity-80">
                {language === 'zh' ? '线缆压降 (ΔV)' : 'Voltage Drop'}
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight mt-0.5">
                {voltageDropVolts.toFixed(2)}V
                <span className="text-sm font-normal ml-1">
                  ({voltageDropPercent.toFixed(1)}%)
                </span>
              </div>
            </div>

            <div>
              <div className="text-[11px] opacity-80">
                {language === 'zh' ? '灯端实际电压' : 'Terminal Voltage'}
              </div>
              <div className="text-2xl font-bold font-mono tracking-tight mt-0.5">
                {terminalVoltage.toFixed(2)}V
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] opacity-90 leading-relaxed">
            {status === 'optimal'
              ? '末端电压充足，无色温偏移风险，灯具发光均匀度 >98%。'
              : status === 'warning'
              ? '压降处于 3%~5% 边缘，长距离运行时末端可能稍暗，建议增加 1 档线径。'
              : '压降严重超标！建议选用更高线径 (如 12 AWG)、缩短供电半径或改用 48V 供电拓扑。'}
          </div>
        </div>

        {/* Input Parameters Controls */}
        <div className="p-4.5 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] space-y-4">
          <h3 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '工程参数设定' : 'Electrical System Inputs'}
          </h3>

          {/* System Voltage Selector */}
          <div>
            <label className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh' ? '供电母线电压 (DC Voltage)' : 'DC Voltage'}
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {[24, 48].map((v) => (
                <button
                  key={v}
                  onClick={() => setSystemVoltage(v as 24 | 48)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    systemVoltage === v
                      ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] shadow-xs'
                      : 'bg-white/60 dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0] border border-[#F0D5C4] dark:border-[#463328]'
                  }`}
                >
                  DC {v}V
                </button>
              ))}
            </div>
          </div>

          {/* Wire Gauge AWG */}
          <div>
            <label className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              {language === 'zh' ? '线规规格 (American Wire Gauge)' : 'Wire Gauge (AWG)'}
            </label>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {[18, 16, 14, 12].map((g) => (
                <button
                  key={g}
                  onClick={() => setGauge(g as any)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    gauge === g
                      ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] shadow-xs'
                      : 'bg-white/60 dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0] border border-[#F0D5C4] dark:border-[#463328]'
                  }`}
                >
                  {g} AWG
                </button>
              ))}
            </div>
          </div>

          {/* Cable Length Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              <span>{language === 'zh' ? '线缆总长度 (单向直线距离)' : 'Cable Length'}</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C] text-xs">
                {wireLength} 米 (m)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={wireLength}
              onChange={(e) => setWireLength(Number(e.target.value))}
              className="w-full h-3 mt-2 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer"
            />
          </div>

          {/* Load Watts Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
              <span>{language === 'zh' ? '末端照明负载总功率' : 'Total Load Power'}</span>
              <span className="font-mono text-[#AD4215] dark:text-[#FF9E6C] text-xs">
                {loadWatts} 瓦 (W) / {(loadWatts / systemVoltage).toFixed(2)}A
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={loadWatts}
              onChange={(e) => setLoadWatts(Number(e.target.value))}
              className="w-full h-3 mt-2 rounded-lg appearance-none bg-[#FFDFCA] dark:bg-[#3D2C23] accent-[#AD4215] dark:accent-[#FF9E6C] cursor-pointer"
            />
          </div>
        </div>

        {/* Engineering Guidelines */}
        <div className="p-4 rounded-3xl bg-[#FFF3EB] dark:bg-[#241A15] border border-[#F0D5C4]/70 dark:border-[#463328]/70 text-xs space-y-1.5 text-[#775A4C] dark:text-[#C2ABA0]">
          <div className="font-bold text-[#302018] dark:text-[#FFEDE2] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#AD4215] dark:text-[#FF9E6C]" />
            <span>{language === 'zh' ? 'VESTA 官方电气工程建议' : 'VESTA Engineering Guidelines'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            • 建议照明主回路压降控制在 <strong>3% 以内</strong>（24V 系统不超过 0.72V，48V 系统不超过 1.44V）。<br />
            • 超过 20 米距离推荐使用 <strong>48V 拓扑架构</strong>，电流减半，线缆发热与铜损大幅降低 75%。
          </p>
        </div>
      </div>
    </div>
  );
};
