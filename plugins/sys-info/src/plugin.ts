import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { SysInfoApiClient, sysInfoApiRef } from './api';

import { rootRouteRef } from './routes';

export const sysInfoPlugin = createPlugin({
  id: 'sys-info',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: sysInfoApiRef,
      deps: {
        configApi: configApiRef,
      },
      factory: ({ configApi }) => new SysInfoApiClient({ configApi }),
    }),
  ],
});

export const SysInfoPage = sysInfoPlugin.provide(
  createRoutableExtension({
    name: 'SysInfoPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
