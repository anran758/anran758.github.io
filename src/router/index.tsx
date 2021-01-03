import Skeleton from '@/layout/Skeleton';
import Introduction from '@/layout/Introduction';
import {
  // TagOutlined,
  EditOutlined,
  // StockOutlined,
  // LayoutOutlined,
  BulbOutlined,
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
        icon: EditOutlined,
      },
      // {
      //   path: '/layout',
      //   name: '布局',
      //   icon: LayoutOutlined,
      //   routes: [
      //     {
      //       path: '/layout/1',
      //       name: '圣杯布局',
      //       disabled: true,
      //     },
      //     {
      //       path: '/layout/flex',
      //       name: 'Flexbox',
      //       disabled: true,
      //     },
      //   ],
      // },
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
            name: 'Flex 布局',
            path: '/preview/flex',
            meta: { path: 'pages/demos/flex/' },
            component: Preview,
          },
          {
            name: 'Canvas 时钟',
            path: '/preview/canvas-clock',
            meta: { path: 'https://anran758.github.io/demos/Canvas/clock/' },
            component: Preview,
          },
          {
            name: '全屏轮播页',
            path: '/preview/full-screen',
            meta: {
              path: 'https://anran758.github.io/demos/pages/full-screen-slider',
            },
            component: Preview,
          },
          {
            name: '图片预加载',
            path: '/preview/progress-bar',
            meta: {
              path: 'https://anran758.github.io/demos/progress-bar',
            },
            component: Preview,
          },
          // {
          //   name: 'jquery-todo',
          //   path: '/preview/jquery-todo',
          //   meta: {
          //     path: 'https://anran758.github.io/jquery-todo/',
          //   },
          //   component: Preview,
          // },
          {
            name: 'React DnD example',
            path: '/preview/react-dnd-example',
            meta: {
              path: 'https://anran758.github.io/react-todos/',
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
