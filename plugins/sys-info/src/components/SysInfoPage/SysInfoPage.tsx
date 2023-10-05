// import React, {ReactNode, useState} from "react";
import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { InfoCard, Table, TableColumn } from '@backstage/core-components';

import {
  Box,
  Grid,
  Tooltip as MuiTooltip,
  Typography,
} from '@material-ui/core';

import { configApiRef, useApi } from '@backstage/core-plugin-api';

import Assessment from '@material-ui/icons/Assessment';
import ContactMail from '@material-ui/icons/ContactMail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { sysInfoApiRef } from '../../api';

const sysInfoCpuColumns: TableColumn[] = [
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

const sysInfoOtherColumns: TableColumn[] = [
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

export const SysInfoHomePage = () => {
  const config = useApi(configApiRef);
  const sysInfoApi = useApi(sysInfoApiRef);

  const contactUs = config.getOptionalString('sysInfo.contactUsLink');
  const sysInfoUrl = config.getOptionalString('sysInfo.frontendBaseUrl');

  const { loading: isSysInfoLoading, value: sysInfoData } =
    useAsync(async () => {
      const data = await sysInfoApi.getData('1');

      // eslint-disable-next-line no-console
      console.log(`response: ${JSON.stringify(data)}`);

      // eslint-disable-next-line no-console
      console.log(`data.cpus: ${JSON.stringify(data.cpus)}`);

      // eslint-disable-next-line no-console
      console.log(
        `data -> platform: ${data.platform}, OS: ${data.operatingSystem}`,
      );

      data.otherDataAsArray = [];
      data.otherDataAsArray[0] = {
        cpuModel: data.cpus[0].model,
        cpuSpeed: data.cpus[0].speed,
        operatingSystem: data.operatingSystem,
        platform: data.platform,
        hostname: data.hostname,
        freeMem: data.freeMem,
        totalMem: data.totalMem,
        release: data.release,
        uptime: data.uptime,
        loadavg: data.loadavg,
      };

      return data;
    }, []);

  return (
    <>
      <InfoCard>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Grid container spacing={2}>
            {Boolean(contactUs) && (
              <Grid item>
                <MuiTooltip title="Contact Us">
                  <a target="_blank" rel="noopener" href={contactUs}>
                    <ContactMail
                      fontSize="large"
                      style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    />
                  </a>
                </MuiTooltip>
              </Grid>
            )}
            {Boolean(sysInfoUrl) && (
              <Grid item>
                <MuiTooltip title="SysInfo instance">
                  <a target="_blank" rel="noopener" href={sysInfoUrl}>
                    <Assessment
                      fontSize="large"
                      style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    />
                  </a>
                </MuiTooltip>
              </Grid>
            )}
          </Grid>
        </Box>
      </InfoCard>

      <Grid style={{ marginTop: '1rem' }} container spacing={2}>
        <Table
          title="System Info Details - CPUs"
          columns={sysInfoCpuColumns}
          isLoading={isSysInfoLoading}
          data={sysInfoData?.cpus || []}
          options={{
            padding: 'dense',
            pageSize: 10,
            emptyRowsWhenPaging: false,
            search: false,
          }}
          emptyContent={
            <Box style={{ textAlign: 'center', padding: '15px' }}>
              <Typography variant="body1">Backend data NOT found</Typography>
            </Box>
          }
        />

        <Table
          title="System Info Details - Other data"
          columns={sysInfoOtherColumns}
          isLoading={isSysInfoLoading}
          data={sysInfoData?.otherDataAsArray || []}
          options={{
            padding: 'dense',
            pageSize: 10,
            emptyRowsWhenPaging: false,
            search: false,
          }}
          emptyContent={
            <Box style={{ textAlign: 'center', padding: '15px' }}>
              <Typography variant="body1">Backend data NOT found</Typography>
            </Box>
          }
        />
      </Grid>
    </>
  );
};

// export const SysInfoPage = () => {
//   const { loading: isSysInfoLoading, value: sysInfoData } =
//     useAsync(async () => {
//       const data = await sysInfoApi.getData('1');
//
//       if (data.otherData) {
//         data.otherDataAsArray = [];
//         data.otherDataAsArray[0] = data.otherData;
//         data.otherDataAsArray[0].cpuModel = data.cpus[0].model;
//         data.otherDataAsArray[0].cpuSpeed = data.cpus[0].speed;
//       }
//
//       return data;
//     }, []);
// }

const queryClient = new QueryClient();

export const SysInfoPage = () => (
  <QueryClientProvider client={queryClient}>
    <SysInfoHomePage />
  </QueryClientProvider>
);
