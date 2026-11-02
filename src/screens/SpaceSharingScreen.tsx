import React, { useState } from 'react';
import { Users, UserPlus, Shield, Check, Copy, Trash2, KeyRound, AlertCircle } from 'lucide-react';
import { useVesta } from '../context/VestaContext';
import { Header } from '../components/common/Header';
import { INITIAL_MEMBERS } from '../data/mockData';
import { FamilyMember, MemberRole } from '../types/vesta';

export const SpaceSharingScreen: React.FC = () => {
  const { goBack, spaces, showToast, language } = useVesta();
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteRole, setInviteRole] = useState<MemberRole>('member');
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(['space-2', 'space-4']);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const handleGenerateInvite = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setInviteCode(code);
    showToast(language === 'zh' ? '已生成 6 位家庭加入邀请码' : 'Invite code generated');
  };

  const handleRemoveMember = (id: string, name: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(language === 'zh' ? `已移除成员「${name}」` : `Member "${name}" removed`);
  };

  const roleLabels: Record<MemberRole, { zh: string; en: string; desc: string }> = {
    owner: {
      zh: '所有者 (Owner)',
      en: 'Owner',
      desc: '最高权限：拥有全屋设备控制、空间新建与删除、成员邀请与移出权限。',
    },
    admin: {
      zh: '管理员 (Admin)',
      en: 'Admin',
      desc: '管理权限：可配置场景与日程、增删改设备，但不能转让家庭所有权。',
    },
    member: {
      zh: '普通成员 (Member)',
      en: 'Member',
      desc: '控制权限：可在授权空间内控制灯光、执行场景，不可修改系统网络配置。',
    },
    guest: {
      zh: '临时访客 (Guest)',
      en: 'Guest',
      desc: '受限权限：仅限指定时段及公共区域基础开关控制。',
    },
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      <Header
        title={language === 'zh' ? '空间分享与成员权限' : 'Space Sharing & RBAC'}
        showBack
        onBack={goBack}
        rightAction={
          <button
            onClick={() => {
              setShowInviteModal(true);
              setInviteCode(null);
            }}
            className="h-8 px-3 rounded-full bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-semibold flex items-center gap-1 shadow-xs active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'zh' ? '邀请' : 'Invite'}</span>
          </button>
        }
      />

      <div className="px-5 pt-3 space-y-5">
        {/* RBAC Info Card */}
        <div className="p-4 rounded-3xl bg-[#FFDFCA] dark:bg-[#38261E] border border-[#E2BFA9] dark:border-[#523A2C] text-xs text-[#775A4C] dark:text-[#C2ABA0] space-y-1">
          <div className="font-bold text-sm text-[#AD4215] dark:text-[#FF9E6C] flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>{language === 'zh' ? '精细化权限隔离体系' : 'Role-Based Access Control'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {language === 'zh'
              ? '支持按空间细分控制范围，有效保护主卧隐私与儿童房护眼日程防误触。'
              : 'Restrict access per room to preserve bedroom privacy and prevent tampering.'}
          </p>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2] px-1">
            {language === 'zh' ? '家庭与项目成员' : 'Family & Project Members'} ({members.length})
          </h3>

          <div className="space-y-2.5">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-3xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#F0D5C4] dark:border-[#463328] shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-2xl object-cover border border-[#AD4215]/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
                        {member.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          member.role === 'owner'
                            ? 'bg-[#AD4215] text-white'
                            : member.role === 'admin'
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#775A4C]/15 text-[#775A4C] dark:text-[#C2ABA0]'
                        }`}
                      >
                        {member.role.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#775A4C] dark:text-[#C2ABA0] mt-0.5">
                      {member.email}
                    </div>

                    <div className="text-[10px] text-[#AD4215] dark:text-[#FF9E6C] mt-1">
                      {member.role === 'owner'
                        ? '全屋 5 个空间完全访问'
                        : `已授权 ${member.spaceIds.length} 个空间`}
                    </div>
                  </div>
                </div>

                {member.role !== 'owner' && (
                  <button
                    onClick={() => handleRemoveMember(member.id, member.name)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#C23326] dark:text-[#F87171] hover:bg-red-500/10 active:scale-95"
                    title="移除成员"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roles & Permissions Explanation Matrix */}
        <div className="p-4 rounded-3xl bg-[#FFF3EB] dark:bg-[#241A15] border border-[#F0D5C4]/70 dark:border-[#463328]/70 space-y-3">
          <h4 className="text-xs font-bold text-[#302018] dark:text-[#FFEDE2]">
            {language === 'zh' ? '角色权限说明' : 'Role Descriptions'}
          </h4>
          <div className="space-y-2 text-[11px] text-[#775A4C] dark:text-[#C2ABA0]">
            {Object.entries(roleLabels).map(([key, val]) => (
              <div key={key} className="p-2 rounded-xl bg-white/60 dark:bg-[#2C201A]">
                <strong className="text-[#302018] dark:text-[#FFEDE2] block">{val.zh}</strong>
                <span>{val.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Member Sheet / Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F3] dark:bg-[#1D1511] border border-[#F0D5C4] dark:border-[#463328] p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-sm font-bold text-[#302018] dark:text-[#FFEDE2]">
              {language === 'zh' ? '邀请新成员加入空间' : 'Invite New Member'}
            </h3>

            {/* Role picker */}
            <div>
              <label className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                分配角色 (Role)
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {(['admin', 'member', 'guest'] as MemberRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setInviteRole(r)}
                    className={`py-1.5 rounded-xl text-xs font-semibold ${
                      inviteRole === r
                        ? 'bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608]'
                        : 'bg-[#FFEADD] dark:bg-[#2C201A] text-[#775A4C] dark:text-[#C2ABA0]'
                    }`}
                  >
                    {r === 'admin' ? '管理员' : r === 'member' ? '普通成员' : '临时访客'}
                  </button>
                ))}
              </div>
            </div>

            {/* Space scopes */}
            <div>
              <label className="text-[11px] font-semibold text-[#775A4C] dark:text-[#C2ABA0]">
                允许访问的空间范围
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {spaces.filter((s) => s.id !== 'space-1').map((s) => {
                  const isChecked = selectedSpaces.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedSpaces((prev) =>
                          isChecked ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                        );
                      }}
                      className={`p-2 rounded-xl text-xs font-medium flex items-center justify-between border ${
                        isChecked
                          ? 'bg-[#FFEADD] dark:bg-[#34241B] border-[#AD4215] dark:border-[#FF9E6C] text-[#302018] dark:text-[#FFEDE2]'
                          : 'bg-white/70 dark:bg-[#241A15] border-[#F0D5C4] dark:border-[#463328] text-[#775A4C]'
                      }`}
                    >
                      <span>{s.name}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#AD4215] dark:text-[#FF9E6C]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Code Area */}
            {inviteCode ? (
              <div className="p-3.5 rounded-2xl bg-[#FFEADD] dark:bg-[#2C201A] border border-[#AD4215] text-center space-y-1">
                <div className="text-[10px] text-[#775A4C] dark:text-[#C2ABA0]">
                  受邀人打开 VESTA 输入以下配对验证码：
                </div>
                <div className="text-2xl font-bold font-mono text-[#AD4215] dark:text-[#FF9E6C] tracking-widest">
                  {inviteCode}
                </div>
                <div className="text-[10px] text-[#775A4C]">24 小时内有效 · 仅限单次加入</div>
              </div>
            ) : (
              <button
                onClick={handleGenerateInvite}
                className="w-full h-11 rounded-2xl bg-[#AD4215] dark:bg-[#FF9E6C] text-white dark:text-[#2C1608] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 shadow-xs"
              >
                <KeyRound className="w-4 h-4" />
                <span>生成邀请码与二维码</span>
              </button>
            )}

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#775A4C] dark:text-[#C2ABA0] hover:bg-[#FFEADD] dark:hover:bg-[#2C201A]"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
