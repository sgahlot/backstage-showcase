// import React, {ReactNode, useState} from "react";
import React from 'react';
import useAsync from 'react-use/lib/useAsync';

import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import {
  InfoCard,
  MissingAnnotationEmptyState,
  Table,
  TableColumn,
} from '@backstage/core-components';

import {
  Box,
  Grid,
  Tooltip as MuiTooltip,
  Typography,
} from '@material-ui/core';

import { configApiRef, useApi } from '@backstage/core-plugin-api';
import Assessment from '@material-ui/icons/Assessment';
import ContactMail from '@material-ui/icons/ContactMail';
import { sysInfoApiRef } from '../../api';
import { CATALOG_SYS_INFO_SITE_ID } from '../../api/constants';

const sysInfoOtherColumns: TableColumn[] = [
  { title: 'CPU Model', field: 'cpuModel', highlight: true },
  { title: 'CPU Model', field: 'cpuSpeed', highlight: true },
  { title: 'Free Memory', field: 'freeMem', highlight: true },
  { title: 'Total Memory', field: 'totalMem', width: '10%' },
  { title: 'Hostname', field: 'hostname', width: '10%' },
  { title: 'OS', field: 'operatingSystem', width: '10%' },
  { title: 'Platform', field: 'platform', width: '10%' },
];

const getSysInfoConfig = (entity: Entity) =>
  entity.metadata.annotations?.[CATALOG_SYS_INFO_SITE_ID];

export const SysInfoHomePage = () => {
  const { entity } = useEntity();
  const config = useApi(configApiRef);
  const sysInfoApi = useApi(sysInfoApiRef);
  const sysInfoSiteId = getSysInfoConfig(entity);

  const contactUs = config.getOptionalString('sysInfo.contactUsLink');
  const sysInfoUrl = config.getOptionalString('sysInfo.frontendBaseUrl');
  const isSysInfoConfigured = Boolean(sysInfoSiteId);

  const { loading: isSysInfoLoading, value: sysInfoData } =
    useAsync(async () => {
      if (sysInfoSiteId) {
        const data = await sysInfoApi.getData(sysInfoSiteId);

        if (data.otherData) {
          data.otherDataAsArray = [];
          data.otherDataAsArray[0] = data.otherData;
          data.otherDataAsArray[0].cpuModel = data.cpus[0].model;
          data.otherDataAsArray[0].cpuSpeed = data.cpus[0].speed;
        }

        return data;
      }
      return undefined;
    }, [sysInfoSiteId]);

  if (!isSysInfoConfigured) {
    // console.log(`Plugin is NOT configured. Annotation [${CATALOG_SYS_INFO_SITE_ID}] is missing`)
    return (
      <MissingAnnotationEmptyState annotation={CATALOG_SYS_INFO_SITE_ID} />
    );
  }

  return (
    <>
      <InfoCard>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h6"
            component="div"
            style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}
          >
            SysInfo Site ID: {sysInfoSiteId}
          </Typography>

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
        <Grid item xs={12} md={4}>
          <Table
            title="System Info Details - 2"
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
                <Typography variant="body1">
                  No data found for {entity.metadata.name}
                </Typography>
              </Box>
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
