import { TableColumn } from '@backstage/core-components';

export const sysInfoCpuColumns: TableColumn[] = [
  {
    title: 'CPU Model',
    field: 'model',
  },
  {
    title: 'CPU Speed',
    field: 'speed',
  },
  {
    title: 'Times Idle',
    field: 'times.user',
  },
  {
    title: 'Times IRQ',
    field: 'times.irq',
  },
  {
    title: 'Times Nice',
    field: 'times.nice',
  },
  {
    title: 'Times Sys',
    field: 'times.sys',
  },
  {
    title: 'Times User',
    field: 'times.user',
  },
];

export const sysInfoMainDataColumns: TableColumn[] = [
  { title: 'Hostname', field: 'hostname', highlight: true },
  { title: 'OS', field: 'operatingSystem', width: '10%' },
  { title: 'Platform', field: 'platform', width: '10%' },
  { title: 'CPU Model', field: 'cpuModel', width: '10%' },
  { title: 'CPU Speed', field: 'cpuSpeed', width: '10%' },
  { title: 'Total Memory', field: 'totalMem', width: '20%' },
  { title: 'Free Memory', field: 'freeMem', width: '10%' },
  { title: 'Release', field: 'release', width: '10%' },
  { title: 'Uptime', field: 'uptime', width: '10%' },
];
