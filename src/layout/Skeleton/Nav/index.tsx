import React, { FC, useEffect, useState } from 'react';
import { Link, LinkProps as ReactLinkProps } from 'react-router-dom';
import classnames from 'classnames';
import {
  StockOutlined,
  UpOutlined,
  DownOutlined,
  LayoutOutlined,
  BulbOutlined,
} from '@ant-design/icons';

import { useRouter } from '@/hooks/use-router';

import styles from './index.less';

export interface BaseSubmenuItemProps {
  id: string;
  label: string;
  path: ReactLinkProps['to'];
  disabled?: boolean;
  disabledTips?: string;
}

export interface BaseMenuDataItemProps {
  id: string;
  label: string;
  icon?: React.ReactType;
  disabled?: boolean;
  disabledTips?: string;
}

export interface MenuDataItemProps extends BaseMenuDataItemProps {
  path: ReactLinkProps['to'];
}

export interface MenuDataSubmenuItemProps extends BaseMenuDataItemProps {
  items: BaseSubmenuItemProps[];
}

interface MenuProps {
  menuData: Array<MenuDataItemProps | MenuDataSubmenuItemProps>;
  collapsed?: boolean;
  selectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
}

interface MenuItemProps extends MenuDataItemProps {
  active?: boolean;
  className?: string;
}

interface SubmenuProps extends MenuDataSubmenuItemProps {
  className?: string;
  active?: boolean;
  isOpen?: boolean;
  collapsed?: boolean;
  triggerSubMenuAction?: (evt: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export interface NavProps {
  collapsed?: boolean;
}

/**
 * 获取路径信息
 */
const getPath = (path: string | ReactLinkProps['to']) => {
  if (typeof path === 'string') return path;

  if (typeof path === 'object') {
    return path.pathname || '';
  }

  return '';
};

/**
 * 菜单项
 */
const MenuItem: FC<MenuItemProps> = ({
  active,
  path,
  icon: Icon,
  label,
  className,
  disabled,
  disabledTips,
}) => {
  return (
    <li
      className={classnames(styles.menuItem, className, {
        [styles.active]: active,
        [styles.disabled]: disabled,
      })}
      role="menuitem"
      title={disabled ? disabledTips : ''}
    >
      <Link to={path}>
        {Icon && <Icon className={styles.icon} />}
        <span>{label}</span>
      </Link>
    </li>
  );
};

/**
 * 子菜单
 */
const Submenu: FC<SubmenuProps> = ({
  active,
  isOpen,
  icon: Icon,
  label,
  collapsed,
  triggerSubMenuAction,
  children,
}) => (
  <li>
    <div
      className={classnames(styles.submenuTitle, {
        [styles.active]: active,
      })}
      onClick={triggerSubMenuAction}
    >
      {Icon && <Icon className={styles.icon} />}
      <span>{label}</span>
      {React.createElement(isOpen ? UpOutlined : DownOutlined, {
        className: styles.submenuArrow,
      })}
    </div>
    {!collapsed && (
      <ul style={{ display: !isOpen ? 'none' : '' }}>{children}</ul>
    )}
  </li>
);

/**
 * 菜单
 */
export const Menu: FC<MenuProps> = (props) => {
  const { menuData, collapsed = false, selectedKeys } = props;
  const [openKeys, setOpenKeys] = useState(props.defaultOpenKeys);

  const handeChangeSubmenuAction = (key: string) => {
    if (openKeys?.includes(key)) {
      setOpenKeys((oldData) => {
        return oldData?.filter((k) => k !== key);
      });
    } else {
      setOpenKeys((oldData) => [...oldData, key]);
    }
  };

  useEffect(() => {
    if ('openKeys' in props) {
      setOpenKeys(props.openKeys);
    }
  }, [props]);

  return (
    <nav className={classnames({ [styles.collapsed]: collapsed })}>
      <ul>
        {menuData.map((data) => {
          if ('items' in data) {
            return (
              <Submenu
                key={data.id}
                isOpen={openKeys?.includes(data.id)}
                collapsed={collapsed}
                triggerSubMenuAction={() => handeChangeSubmenuAction(data.id)}
                {...data}
              >
                {data.items.map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      active={selectedKeys?.includes(getPath(item.path))}
                      className={styles.submenuItem}
                      {...item}
                    />
                  );
                })}
              </Submenu>
            );
          }

          const currentPath = getPath(data.path);
          return (
            <MenuItem
              key={data.id}
              active={selectedKeys?.includes(currentPath)}
              {...data}
            />
          );
        })}
      </ul>
    </nav>
  );
};

/**
 * 侧边栏导航
 */
export const Nav: FC<NavProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuData: MenuProps['menuData'] = [
    {
      id: 'dashboard',
      label: '数据预览',
      icon: StockOutlined,
      path: { pathname: '/content' },
    },
    {
      id: 'layout',
      label: '布局',
      icon: LayoutOutlined,
      items: [
        {
          id: '1',
          label: '圣杯布局',
          path: '/content/layout/1',
          disabled: true,
          disabledTips: '正在开发中',
        },
        {
          id: '2',
          label: 'Flexbox',
          path: '/content/layout/2',
          disabled: true,
          disabledTips: '正在开发中',
        },
      ],
    },
    {
      id: 'button',
      label: 'UI',
      icon: BulbOutlined,
      items: [
        {
          id: '1',
          label: 'Button',
          path: '/content/ui/button',
          disabled: true,
          disabledTips: '正在开发中',
        },
      ],
    },
  ];

  useEffect(() => {
    router.pathname;
    setSelectedKeys([router.pathname]);
  }, [router]);

  return (
    <Menu
      menuData={menuData}
      defaultOpenKeys={['layout']}
      collapsed={collapsed}
      selectedKeys={selectedKeys}
    ></Menu>
  );
};
