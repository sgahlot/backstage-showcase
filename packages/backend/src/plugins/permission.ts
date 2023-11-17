import { createRouter } from '@backstage/plugin-permission-backend';
import {
  AuthorizeResult,
  isPermission,
  isResourcePermission,
  PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import {
  SYS_INFO_RESOURCE_TYPE,
  sysInfoPermissions,
} from '@internal/plugin-sys-info-backend';

class DefaultPermissionPolicy implements PermissionPolicy {
  async handle(request: PolicyQuery): Promise<PolicyDecision> {
    console.log(
      `MANUAL_POLICY_TEST:: permission.name=[${request.permission.name}]`,
    );

    if (isResourcePermission(request.permission, SYS_INFO_RESOURCE_TYPE)) {
      console.log(
        `MANUAL_POLICY_TEST:: isResourcePermission is TRUE for resourceType=[${SYS_INFO_RESOURCE_TYPE}]`,
      );
      for (const permission of sysInfoPermissions) {
        if (isPermission(request.permission, permission)) {
          console.log(`MANUAL_POLICY_TEST:: Permission DENIED...`);

          return { result: AuthorizeResult.DENY };
        }
      }
    }

    console.log(`MANUAL_POLICY_TEST:: Permission ALLOWED...`);
    return { result: AuthorizeResult.ALLOW };
  }
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new DefaultPermissionPolicy(),
    identity: env.identity,
  });
}
