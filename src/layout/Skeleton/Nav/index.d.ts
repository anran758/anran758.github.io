import { LinkProps } from 'react-router-dom';

export interface BaseMenuDataItemProps {
  label: string;
  key?: React.Key;
  Icon?: React.ElementType;
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
