import Skeleton from '@/layout/Skeleton';
import Introduction from '@/layout/Introduction';
import {
  BulbOutlined,
  CarryOutOutlined,
  EditOutlined,
  LayoutOutlined,
  // TagOutlined,
  // StockOutlined,
} from '@ant-design/icons';

import Dashboard from '@AppPages/Dashboard';
import Preview from '@AppPages/Preview';
import NoMatch from '@AppPages/NoMatch';

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
        Icon: EditOutlined,
      },
      {
        path: '/layout',
        name: '布局',
        Icon: LayoutOutlined,
        routes: [
          {
            name: 'Flex 布局',
            path: '/layout/flex',
            meta: { path: '/pages/demos/flex/' },
            component: Preview,
          },
          {
            path: '/layout/grail',
            name: '圣杯布局',
            meta: {
              path: '/pages/demos/layout/grail',
              frameOptions: {
                fullContent: false,
              },
            },
            component: Preview,
          },
        ],
      },
      {
        name: 'UI',
        path: '/ui',
        Icon: BulbOutlined,
        routes: [
          {
            name: 'Button Effects',
            path: '/ui/button',
            meta: { path: '/pages/demos/button/' },
            component: Preview,
          },
        ],
      },
      {
        name: 'Demos',
        path: '/preview',
        Icon: CarryOutOutlined,
        routes: [
          {
            name: '图片预加载',
            path: '/preview/progress-bar',
            meta: {
              path: 'https://anran758.github.io/demos/modules/progress-bar/',
            },
            component: Preview,
          },
          {
            name: '图片预加载 - rotate',
            path: '/preview/progress-bar-rotate',
            meta: {
              path: 'https://anran758.github.io/demos/modules/progress-bar/rotate.html',
            },
            component: Preview,
          },
          {
            name: 'Canvas 时钟',
            path: '/preview/canvas-clock',
            meta: { path: 'https://anran758.github.io/demos/pages/canvas/clock/' },
            component: Preview,
          },
          {
            name: '全屏滚动页',
            path: '/preview/full-screen',
            meta: {
              path: 'https://anran758.github.io/demos/pages/full-screen-slider',
            },
            component: Preview,
          },
          {
            name: '[React DnD] 带拖拽功能的 Todos',
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
