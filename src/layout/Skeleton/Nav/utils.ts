import { MenuItemType } from '@/components/Menu/index.d';
import { RouteConfig } from '@/router/index.d';

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
        icon: item.icon,
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
