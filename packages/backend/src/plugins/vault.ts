import { createRouter } from '@backstage/plugin-vault-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return createRouter({
    logger: env.logger,
    config: env.config,
    scheduler: env.scheduler,
  });
}
