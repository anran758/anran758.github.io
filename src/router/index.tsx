import React from 'react';
import Skeleton from '@/layout/Skeleton';
import Introduction from '@/layout/Introduction';
import {
  TagOutlined,
  StockOutlined,
  LayoutOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import Dashboard from '@/pages/Dashboard';
import Preview from '@/pages/Preview';
import NoMatch from '@/pages/NoMatch';

import { RouteConfig } from './index.d';

export { RouteConfig };
export { renderRoutes } from './renderRoutes';

export const routes: RouteConfig[] = [
  {
    path: '/cover',
    hideMenu: true,
    component: Introduction,
  },
  {
    path: '/',
    hideMenuItem: true,
    component: Skeleton,
    routes: [
      {
        path: '/',
        name: '数据预览',
        exact: true,
        component: Dashboard,
        icon: StockOutlined,
      },
      {
        path: '/layout',
        name: '布局',
        icon: LayoutOutlined,
        routes: [
          {
            path: '/layout/1',
            name: '圣杯布局',
            disabled: true,
          },
          {
            path: '/layout/flex',
            name: 'Flexbox',
            disabled: true,
          },
        ],
      },
      {
        name: 'UI',
        path: '/ui',
        icon: BulbOutlined,
        routes: [
          {
            name: 'Button',
            path: '/ui/button',
            disabled: true,
          },
        ],
      },
      {
        name: 'Demo',
        path: '/preview',
        icon: TagOutlined,
        routes: [
          {
            name: 'Flex 布局',
            path: '/preview/flex',
            meta: { path: 'demos/flex/' },
            component: Preview,
          },
        ],
      },
      {
        path: '*',
        component: NoMatch,
        hideMenu: true,
      },
    ],
  },
];
