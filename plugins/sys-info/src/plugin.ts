import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const sysInfoPlugin = createPlugin({
  id: 'sys-info',
  routes: {
    root: rootRouteRef,
  },
});

export const SysInfoPage = sysInfoPlugin.provide(
  createRoutableExtension({
    name: 'SysInfoPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
