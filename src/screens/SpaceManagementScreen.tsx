import React, { useState } from 'react';
import { Layers, Plus, Check, Trash2, Edit3, Cpu, ChevronRight } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';

export const SpaceManagementScreen: React.FC = () => {
  const { spaces, selectedSpaceId, setSelectedSpaceId, goBack, showToast, language } = useVesta();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');

  const handleAddSpace = () => {
    if (!newSpaceName.trim()) return;
    showToast(language === 'zh' ? `空间「${newSpaceName}」创建成功` : `Space "${newSpaceName}" created`);
    setShowAddModal(false);
    setNewSpaceName('');
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '空间与网关管理' : 'Manage Spaces'}
        showBack
        onBack={goBack}
        rightAction={
          <button
            onClick={() => setShowAddModal(true)}
            className="w-8 h-8 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] flex items-center justify-center shadow-xs active:scale-95"
            title="新增空间"
          >
            <Plus className="w-4 h-4" />
          </button>
        }
      />

      <div className="px-5 pt-3 space-y-4">
        <p className="text-xs text-[#775A4C] dark:text-[#C2ABA0] px-1">
          {language === 'zh'
            ? '管理物理空间划分与关联的 Matter 边缘照明网关。'
            : 'Manage lighting zones and bound Matter Gateways.'}
        </p>

        <div className="space-y-3">
          {spaces.map((space) => {
            const isSelected = selectedSpaceId === space.id;

            return (
              <div
                key={space.id}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`p-4.5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFEADD] dark:bg-[#2C201A] border-[#AD4215] dark:border-[#FF9E6C] shadow-xs'
                    : 'bg-[#FFF3EB] dark:bg-[#241A15] border-[#F0D5C4] dark:border-[#463328]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#AD4215] text-white dark:bg-[#FF9E6C] dark:text-[#2C1608]'
                          : 'bg-[#E8DCD3] dark:bg-[#34241B] text-[#775A4C] dark:text-[#C2ABA0]'
                      }`}
                    >
                      <Layers className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
                          {space.name}
                        </h4>
                        {space.isDefault && (
                          <span className="px-1.5 py-0.2 rounded-md bg-[#AD4215]/10 dark:bg-[#FF9E6C]/20 text-[#AD4215] dark:text-[#FF9E6C] text-[9px] font-bold">
                            DEFAULT
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#775A4C] dark:text-[#C2ABA0] mt-0.5 flex items-center gap-2">
                        <span>{space.deviceCount} 台接入设备</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5 text-[#2E8B57] dark:text-[#48C78E]">
                          <Cpu className="w-3 h-3" />
                          <span>已关联网关 Pro</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Space Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F3] dark:bg-[#1D1511] border border-[#F0D5C4] dark:border-[#463328] p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
              {language === 'zh' ? '创建新照明空间' : 'Create Space'}
            </h3>

            <div>
              <label className="text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                空间名称 (如: 茶室 / 餐厅 / 影音室)
              </label>
              <input
                type="text"
                placeholder="例如：主卫 / 茶室"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                className="w-full h-11 mt-1 px-3.5 rounded-xl bg-white dark:bg-[#34241B] border border-[#F0D5C4] dark:border-[#463328] text-xs text-[#302018] dark:text-[#FFEDE2] font-semibold focus:outline-none focus:ring-1 focus:ring-[#AD4215]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0]"
              >
                取消
              </button>
              <button
                onClick={handleAddSpace}
                className="px-5 py-2 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold active:scale-95 shadow-xs"
              >
                确认创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
