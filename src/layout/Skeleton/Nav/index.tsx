import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '@/hooks/use-router';
import { MenuItemType } from './index.d';
import { routes } from '@/router';
import { Menu } from 'antd';

import { routesToMenuData, parseMatchRouters } from './utils';

const { SubMenu, Item: MenuItem } = Menu;

export interface NavProps {
  collapsed?: boolean;
}


/**
 * 渲染菜单数据
 */
export function renderMenuData(menuData: MenuItemType[]) {
  return menuData.map((data, idx) => {
    const key = data.key || idx;
    const { Icon, label } = data;

    if ('items' in data) {
      return (
        <SubMenu icon={<Icon />} key={key} title={label}>
          {renderMenuData(data.items)}
        </SubMenu>
      );
    }

    return (
      <MenuItem key={key} icon={Icon && <Icon />}>
        <Link to={data.path}>{label}</Link>
      </MenuItem>
    );
  });
}


/**
 * 侧边栏导航
 */
export const Nav: FC<NavProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuData = routesToMenuData(routes);
  const defaultOpenKeys = parseMatchRouters(router.pathname);

  useEffect(() => setSelectedKeys([router.pathname]), [router.pathname]);

  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      style={{ border: 'none' }}
    >
      {renderMenuData(menuData)}
    </Menu>
  );
};
Nav.displayName = 'Nav';
