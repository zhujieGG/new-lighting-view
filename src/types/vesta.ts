export type AppTheme = 'light' | 'dark';
export type AppLanguage = 'zh' | 'en';

export type MainTab = 'home' | 'devices' | 'smart' | 'discover' | 'profile';

export type ScreenId =
  | 'home'
  | 'devices'
  | 'device_detail'
  | 'smart_scenes'
  | 'smart_schedules'
  | 'discover'
  | 'profile'
  | 'app_settings'
  | 'add_device'
  | 'create_scene'
  | 'create_schedule'
  | 'space_management'
  | 'space_sharing'
  | 'firmware_update'
  | 'voltage_drop'
  | 'lighting_demo'
  | 'group_detail'
  | 'auth_welcome'
  | 'auth_login';

export interface Space {
  id: string;
  name: string;
  nameEn: string;
  isDefault?: boolean;
  deviceCount: number;
  gatewayId?: string;
}

export type DeviceType = 'downlight' | 'strip' | 'spotlight' | 'pendant' | 'gateway';
export type ProtocolType = 'matter' | 'ble_mesh';

export interface VestaDevice {
  id: string;
  name: string;
  nameEn: string;
  spaceId: string;
  type: DeviceType;
  protocol: ProtocolType;
  online: boolean;
  power: boolean;
  brightness: number; // 0 - 100
  colorTemp: number; // 2200 - 6500 K
  rgb?: { r: number; g: number; b: number };
  groupId?: string;
  firmwareVersion: string;
  hasUpdate?: boolean;
  targetVersion?: string;
  ip?: string;
  mac?: string;
  signalStrength?: number; // 1 - 4
}

export interface LightGroup {
  id: string;
  name: string;
  nameEn: string;
  spaceId: string;
  deviceIds: string[];
  power: boolean;
  brightness: number;
  colorTemp: number;
  coverImage?: string;
}

export interface SceneAction {
  deviceId?: string;
  groupId?: string;
  power: boolean;
  brightness: number;
  colorTemp: number;
  rgb?: { r: number; g: number; b: number };
}

export interface LightingScene {
  id: string;
  name: string;
  nameEn: string;
  spaceId: string;
  iconName: string;
  color: string; // Hex for preview badge
  description: string;
  descriptionEn: string;
  actions: SceneAction[];
}

export type TriggerType = 'time' | 'sunrise' | 'sunset';

export interface LightingSchedule {
  id: string;
  name: string;
  nameEn: string;
  enabled: boolean;
  triggerType: TriggerType;
  time?: string; // "07:30"
  offsetMinutes?: number; // e.g. -30 for 30 min before sunset
  repeatDays: number[]; // 0=Sun, 1=Mon ... 6=Sat
  sceneId?: string;
  actionSummary: string;
  actionSummaryEn: string;
}

export type MemberRole = 'owner' | 'admin' | 'member' | 'guest';

export interface FamilyMember {
  id: string;
  name: string;
  role: MemberRole;
  avatar: string;
  email: string;
  joinedDate: string;
  spaceIds: string[];
}

export interface SimulatorNode {
  id: string;
  type: 'power' | 'junction' | 'fixture';
  name: string;
  voltageIn: number; // V
  powerWatts: number; // W
  wireLength: number; // meters from parent
  wireGauge: number; // AWG (e.g. 18, 16, 14, 12)
}
