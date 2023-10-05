export type CpuData = {
  model: string;
  speed: number;
  // times: CpuTimeData;
  times: CpuTimeData | Record<string, CpuTimeData>;
};

export type CpuTimeData = {
  idle: number;
  irq: number;
  nice: number;
  sys: number;
  user: number;
};

export type AllData = {
  cpus: Array<CpuData>;
  freeMem: number;
  hostname: string;
  loadavg: Array<number>;
  operatingSystem: string;
  platform: string;
  release: string;
  totalMem: number;
  uptime: number;
};

export type OtherSysInfoData = {
  cpuModel: string;
  cpuSpeed: number;
  freeMem: number;
  hostname: string;
  loadavg: Array<number>;
  operatingSystem: string;
  platform: string;
  release: string;
  totalMem: number;
  uptime: number;
};

export type SysInfoData = {
  // columns: Record<keyof SysInfoData['allData'], SysInfoData>
  // allData: AllData | Record<string, AllData>
  cpus: Array<CpuData>;
  freeMem: number;
  hostname: string;
  loadavg: Array<number>;
  operatingSystem: string;
  platform: string;
  release: string;
  totalMem: number;
  uptime: number;
  // otherData: OtherSysInfoData;
  otherDataAsArray: OtherSysInfoData[];
};
