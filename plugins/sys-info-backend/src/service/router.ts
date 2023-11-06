import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import os from 'os';
import { getSysInfoConfig } from '../config/config';
import { Config } from '@backstage/config';

export interface RouterOptions {
  logger: Logger;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const router = Router();
  router.use(express.json());

  router.get('/system-info', async (_, res) => {
    const sysInfoConfig = getSysInfoConfig(config);
    // const orgName = config.getString('organization.name');
    const systemInfo = {
      data: {
        hostname: os.hostname(),
        operatingSystem: os.type(),
        platform: os.platform(),
        release: os.release(),
        uptime: os.uptime(),
        loadavg: os.loadavg(),
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
      },
      cpus: os.cpus(),
      config: {
        baseUrl: sysInfoConfig.baseUrl,
        fileName: sysInfoConfig.fileName,
        repoName: sysInfoConfig.repoName,
        // orgName: orgName,
      },
    };

    logger.info(
      `Sending systemInfo for hostname=${systemInfo.data.hostname}...`,
    );

    res.send(systemInfo);
  });

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });
  router.use(errorHandler());
  return router;
}
