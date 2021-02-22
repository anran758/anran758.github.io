import React, { FC, useEffect, useState } from 'react';
import { useRouter } from '@/hooks/use-router';
import { MenuConfigContainer } from '@/components/Menu';
import { routes } from '@/router';

import { routesToMenuData } from './utils';

export interface NavProps {
  collapsed?: boolean;
}

function parseMathRouters(pathname: string) {
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

/**
 * 侧边栏导航
 */
export const Nav: FC<NavProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuData = routesToMenuData(routes);
  const defaultOpenKeys = parseMathRouters(router.pathname);

  useEffect(() => setSelectedKeys([router.pathname]), [router.pathname]);

  return (
    <MenuConfigContainer
      menuData={menuData}
      collapsed={collapsed}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
    />
  );
};
Nav.displayName = 'Nav';
