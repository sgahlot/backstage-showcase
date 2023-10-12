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

type SysInfoMainData = {
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
  cpus: Array<CpuData>;
  data: SysInfoMainData;
  mainDataAsArray: SysInfoMainData[];
};
