import React, { FC, useEffect, useState, useCallback } from 'react';
import { LinkProps } from 'react-router-dom';
import classnames from 'classnames';

import { Submenu } from './Submenu';
import { MenuItem } from './MenuItem';

import { MenuProps, MenuConfigContainerProps, MenuItemType } from './index.d';

import styles from './index.less';

/**
 * 获取路径信息
 */
const getCurrentPath = (path: string | LinkProps['to']) => {
  switch (typeof path) {
    case 'string':
      return path;
    case 'object':
      return path.pathname || '';

    default:
      return '';
  }
};

/**
 * 菜单
 */
export const Menu: FC<MenuProps> = ({ children, collapsed }) => {
  return (
    <nav className={classnames({ [styles.collapsed]: collapsed })}>
      <ul>{children}</ul>
    </nav>
  );
};

/**
 * 配置式菜单
 */
export const MenuConfigContainer: FC<MenuConfigContainerProps> = (props) => {
  const {
    menuData,
    collapsed = false,
    selectedKeys,
    defaultOpenKeys = [],
  } = props;
  const [openKeys, setOpenKeys] = useState<
    MenuConfigContainerProps['defaultOpenKeys']
  >(defaultOpenKeys);

  /**
   * 处理子菜单展开状态
   */
  const handeChangeSubmenuAction = useCallback(
    (key: React.Key) => {
      setOpenKeys((oldData) => {
        return openKeys?.includes(key)
          ? // 如果触发展开的 key 已经存在，那就移除它
            oldData?.filter((k) => k !== key)
          : [...oldData, key];
      });
    },
    [openKeys]
  );

  /**
   * 渲染菜单数据
   */
  function renderMenuData(menuData: MenuItemType[], level: number) {
    return menuData.map((data, idx) => {
      const key = data.key || idx;

      if (data.type === 'submenu') {
        return (
          <Submenu
            {...data}
            collapsed={collapsed}
            key={data.key}
            isOpen={openKeys?.includes(key)}
            triggerSubMenuAction={() => handeChangeSubmenuAction(key)}
          >
            {renderMenuData(data.items, level + 1)}
          </Submenu>
        );
      }

      const currentPath = getCurrentPath(data.path);
      return (
        <MenuItem
          active={selectedKeys?.includes(currentPath)}
          disabledTips={data.disabledTips || '正在开发中...'}
          style={{ paddingLeft: 24 * level }}
          {...data}
          key={key}
        />
      );
    });
  }

  useEffect(() => {
    if ('openKeys' in props) {
      setOpenKeys(props.openKeys);
    }
  }, [props]);

  return <Menu collapsed={collapsed}>{renderMenuData(menuData, 1)}</Menu>;
};

Menu.displayName = 'Menu';
MenuConfigContainer.displayName = 'MenuConfigContainer';

export { Submenu, MenuItem };
