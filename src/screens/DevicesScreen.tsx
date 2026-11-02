import React, { useState } from 'react';
import { Plus, Search, LayoutGrid, List, Layers, Cpu, Sliders, ChevronRight } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';
import { DeviceCard } from '../components/common/DeviceCard';

export const DevicesScreen: React.FC = () => {
  const {
    spaces,
    selectedSpaceId,
    setSelectedSpaceId,
    devices,
    groups,
    toggleGroupPower,
    navigateTo,
    language,
  } = useVesta();

  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'gateways'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGrid, setIsGrid] = useState(true);

  // Filter devices by space and query
  const filteredDevices = devices.filter((dev) => {
    const matchesSpace = selectedSpaceId === 'space-1' || dev.spaceId === selectedSpaceId;
    const matchesQuery =
      searchQuery.trim() === '' ||
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'gateways') return matchesSpace && matchesQuery && dev.type === 'gateway';
    if (activeTab === 'all') return matchesSpace && matchesQuery;
    return false;
  });

  const filteredGroups = groups.filter((g) => {
    const matchesSpace = selectedSpaceId === 'space-1' || g.spaceId === selectedSpaceId;
    const matchesQuery =
      searchQuery.trim() === '' ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpace && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '设备管理' : 'Devices'}
        rightAction={
          <button
            onClick={() => navigateTo('add_device')}
            className="w-9 h-9 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] flex items-center justify-center shadow-xs active:scale-95 transition-all"
            title="添加设备"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-5 pt-3 space-y-4">
        {/* Space Horizontal Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {spaces.map((s) => {
            const isSelected = selectedSpaceId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSpaceId(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#AD4215] text-white dark:bg-[#FF9E6C] dark:text-[#2C1608] shadow-xs'
                    : 'bg-[#FFEADD] dark:bg-[#2C201A] text-[#775A4C] dark:text-[#C2ABA0] border border-[#F0D5C4] dark:border-[#463328]'
                }`}
              >
                {language === 'zh' ? s.name : s.nameEn}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Grid/List Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#775A4C] dark:text-[#C2ABA0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'zh' ? '搜索设备、灯组或型号...' : 'Search devices or groups...'}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#FFF3EB] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] placeholder:text-[#9E8072] focus:outline-none focus:ring-1 focus:ring-[#AD4215] dark:focus:ring-[#FF9E6C]"
            />
          </div>

          <button
            onClick={() => setIsGrid(!isGrid)}
            className="w-10 h-10 rounded-xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] flex items-center justify-center text-[#775A4C] dark:text-[#C2ABA0] active:scale-95 transition-all"
            title="切换视图"
          >
            {isGrid ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>
        </div>

        {/* View Mode Segmented Bar */}
        <div className="flex items-center p-1 rounded-xl bg-[#FFEADD] dark:bg-[#241A15] border border-[#F0D5C4] dark:border-[#463328]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            {language === 'zh' ? '全部设备' : 'All Devices'} ({devices.length})
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
              activeTab === 'groups'
                ? 'bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            {language === 'zh' ? '灯组' : 'Groups'} ({groups.length})
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
              activeTab === 'gateways'
                ? 'bg-white dark:bg-[#34241B] text-[#AD4215] dark:text-[#FF9E6C] shadow-xs'
                : 'text-[#775A4C] dark:text-[#C2ABA0]'
            }`}
          >
            {language === 'zh' ? '网关' : 'Gateways'} (1)
          </button>
        </div>

        {/* Group Cards List (When Groups tab is active) */}
        {activeTab === 'groups' ? (
          <div className="space-y-3">
            {filteredGroups.map((grp) => (
              <div
                key={grp.id}
                className="rounded-2xl p-4 bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#AD4215]/10 dark:bg-[#FF9E6C]/15 text-[#AD4215] dark:text-[#FF9E6C] flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#302018] dark:text-[#FFEDE2]">
                        {language === 'zh' ? grp.name : grp.nameEn}
                      </h4>
                      <div className="text-xs text-[#775A4C] dark:text-[#C2ABA0]">
                        {grp.deviceIds.length} {language === 'zh' ? '盏灯具' : 'Fixtures'} · {grp.brightness}%
                      </div>
                    </div>
                  </div>

                  {/* Group Power Switch */}
                  <button
                    onClick={() => toggleGroupPower(grp.id)}
                    className={`min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                      grp.power ? 'text-[#AD4215] dark:text-[#FF9E6C]' : 'text-[#775A4C] dark:text-[#C2ABA0]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        grp.power
                          ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] border-transparent shadow-xs'
                          : 'bg-transparent border-[#E2BFA9] dark:border-[#5E4537]'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Normal / Gateway Devices */
          <div className={isGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-2.5'}>
            {filteredDevices.map((device) => (
              <DeviceCard key={device.id} device={device} compact={!isGrid} />
            ))}

            {filteredDevices.length === 0 && (
              <div className="py-12 text-center col-span-2 text-xs text-[#775A4C] dark:text-[#C2ABA0]">
                {language === 'zh' ? '该空间暂无匹配设备，点击右上角添加' : 'No devices found in this view'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
