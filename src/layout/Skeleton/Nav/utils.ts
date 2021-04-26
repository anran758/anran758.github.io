import { RouteConfig } from '@/router/index.d';

import { MenuItemType } from './index.d';

/**
 * 将 routes 数据转为 MenuData
 */
export function routesToMenuData(routes: RouteConfig[]): MenuItemType[] {
  const result: MenuItemType[] = [];

  routes
    .filter((item) => !item.hideMenu)
    .forEach((item) => {
      // 隐藏当前这一层路由信息
      if (item.hideMenuItem && item.routes?.length) {
        result.push(...routesToMenuData(item.routes));
        return;
      }

      const path = item.path as string;
      const baseItem = {
        key: path,
        label: item.name,
        Icon: item.Icon,
        disabled: item.disabled,
        disabledTips: item.disabledTips,
      };
      const newItem: MenuItemType = item.routes?.length
        ? {
            ...baseItem,
            type: 'submenu',
            items: routesToMenuData(item.routes),
          }
        : {
            ...baseItem,
            type: 'item',
            path,
          };

      result.push(newItem);
    });

  return result;
}


/**
 * 解析路由信息
 * @param pathname 当前路径名
 * @returns string[]
 */
export function parseMatchRouters(pathname: string) {
  const result: string[] = [];
  return pathname
    .split('/')
    .filter((k) => k)
    .reduce((arr, name, idx, originArr) => {
      let currentName = `/${name}`;
      if (idx !== 0) {
        currentName = arr[idx - 1] + currentName;
      }
      arr.push(currentName);

      if (idx === originArr.length - 1) {
        arr.push(`${currentName}/`);
      }

      return arr;
    }, result);
}

