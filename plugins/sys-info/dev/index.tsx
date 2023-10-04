import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { sysInfoPlugin, SysInfoPage } from '../src/plugin';

createDevApp()
  .registerPlugin(sysInfoPlugin)
  .addPage({
    element: <SysInfoPage />,
    title: 'Root Page',
    path: '/sys-info',
  })
  .render();
