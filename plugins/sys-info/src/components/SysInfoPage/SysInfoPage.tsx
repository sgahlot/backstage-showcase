// import React, {ReactNode, useState} from "react";
import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { InfoCard, Table } from '@backstage/core-components';

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
import { sysInfoCpuColumns, sysInfoMainDataColumns } from './types';

export const SysInfoHomePage = () => {
  const config = useApi(configApiRef);
  const sysInfoApi = useApi(sysInfoApiRef);

  const contactUs = config.getOptionalString('sysInfo.contactUsLink');
  const sysInfoUrl = config.getOptionalString('sysInfo.frontendBaseUrl');

  // // eslint-disable-next-line no-console
  // console.log(`contactUs: [${contactUs}]`);

  const { loading: isSysInfoLoading, value: sysInfoData } =
    useAsync(async () => {
      const systemInfoData = await sysInfoApi.getData('1');

      // To display the main data in a table, prepare the array to contain the ONLY data we have
      systemInfoData.mainDataAsArray = [];
      systemInfoData.mainDataAsArray[0] = systemInfoData.data;
      systemInfoData.mainDataAsArray[0].cpuModel = systemInfoData.cpus[0].model;
      systemInfoData.mainDataAsArray[0].cpuSpeed = systemInfoData.cpus[0].speed;

      return systemInfoData;
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

      <Grid style={{ marginTop: '5rem' }} container spacing={2}>
        <Grid item xs={10}>
          <Table
            title="System Info Details"
            columns={sysInfoMainDataColumns}
            isLoading={isSysInfoLoading}
            data={sysInfoData?.mainDataAsArray || []}
            options={{
              padding: 'dense',
              pageSize: 1,
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

        <Grid item xs={10}>
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
        </Grid>
      </Grid>
    </>
  );
};

const queryClient = new QueryClient();

export const SysInfoPage = () => (
  <QueryClientProvider client={queryClient}>
    <SysInfoHomePage />
  </QueryClientProvider>
);
