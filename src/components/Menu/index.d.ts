import { LinkProps } from 'react-router-dom';

export interface BaseMenuDataItemProps {
  label: string;
  key?: React.Key;
  icon?: React.ReactType;
  disabled?: boolean;
  disabledTips?: string;
}

export type MenuItemType = MenuDataItemProps | MenuDataSubmenuItemProps;

export interface MenuDataItemProps extends BaseMenuDataItemProps {
  type: 'item';
  path: LinkProps['to'];
}

export interface MenuDataSubmenuItemProps extends BaseMenuDataItemProps {
  type: 'submenu';
  items: MenuItemType[];
}

export interface MenuItemProps extends MenuDataItemProps {
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SubmenuProps extends MenuDataSubmenuItemProps {
  className?: string;
  active?: boolean;
  isOpen?: boolean;
  collapsed?: boolean;
  triggerSubMenuAction?: (evt: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface MenuProps {
  collapsed?: boolean;
}

export interface MenuConfigContainerProps extends MenuProps {
  menuData: MenuItemType[];
  selectedKeys?: React.Key[];
  openKeys?: React.Key[];
  defaultOpenKeys?: React.Key[];
}
