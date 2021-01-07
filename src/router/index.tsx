import Skeleton from '@/layout/Skeleton';
import Introduction from '@/layout/Introduction';
import {
  // TagOutlined,
  EditOutlined,
  // StockOutlined,
  LayoutOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import Dashboard from '@/pages/App/Dashboard';
import Preview from '@/pages/App/Preview';
import NoMatch from '@/pages/App/NoMatch';

import { RouteConfig } from './index.d';
export { renderRoutes } from './renderRoutes';

const routes: RouteConfig[] = [
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
        name: 'Home',
        exact: true,
        component: Dashboard,
        icon: EditOutlined,
      },
      {
        path: '/layout',
        name: '布局',
        icon: LayoutOutlined,
        routes: [
          {
            name: 'Flex 布局',
            path: '/layout/flex',
            meta: { path: 'pages/demos/flex/' },
            component: Preview,
          },
          {
            path: '/layout/1',
            name: '圣杯布局',
            disabled: true,
          },
        ],
      },
      // {
      //   name: 'UI',
      //   path: '/ui',
      //   icon: BulbOutlined,
      //   routes: [
      //     {
      //       name: 'Button',
      //       path: '/ui/button',
      //       disabled: true,
      //     },
      //   ],
      // },
      {
        name: 'Demos',
        path: '/preview',
        icon: BulbOutlined,
        routes: [
          {
            name: '图片预加载',
            path: '/preview/progress-bar',
            meta: {
              path: 'https://anran758.github.io/demos/progress-bar',
            },
            component: Preview,
          },
          {
            name: 'Canvas clock example',
            path: '/preview/canvas-clock',
            meta: { path: 'https://anran758.github.io/demos/Canvas/clock/' },
            component: Preview,
          },
          {
            name: 'Full screen slider',
            path: '/preview/full-screen',
            meta: {
              path: 'https://anran758.github.io/demos/pages/full-screen-slider',
            },
            component: Preview,
          },
          {
            name: 'React DnD Todos example',
            path: '/preview/react-dnd-example',
            meta: {
              path: 'https://anran758.github.io/react-dnd-todos/',
            },
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

export { RouteConfig, routes };
