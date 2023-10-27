import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const rhdaPlugin = createPlugin({
  id: 'rhda',
  routes: {
    root: rootRouteRef,
  },
});

export const RhdaPage = rhdaPlugin.provide(
  createRoutableExtension({
    name: 'RhdaPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
