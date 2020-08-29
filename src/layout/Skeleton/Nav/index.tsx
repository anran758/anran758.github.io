import React, { FC, useEffect, useState } from 'react';
import { useRouter } from '@/hooks/use-router';
import { MenuConfigContainer } from '@/components/Menu';
import { routes } from '@/router';

import { routesToMenuData } from './utils';

export interface NavProps {
  collapsed?: boolean;
}

/**
 * 侧边栏导航
 */
export const Nav: FC<NavProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuData = routesToMenuData(routes);

  useEffect(() => {
    router.pathname;
    setSelectedKeys([router.pathname]);
  }, [router]);

  return (
    <MenuConfigContainer
      menuData={menuData}
      collapsed={collapsed}
      selectedKeys={selectedKeys}
    />
  );
};
