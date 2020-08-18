import React, { FC, memo } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import { Nav } from '../Nav';
import styles from './index.less';

interface UserInfoAreaProps {
  avatar?: string;
  name?: string;
  path?: string;
}

export interface UserInfoProps {
  name: string;
  avatar_url?: string;
  [key: string]: any;
}

export interface SidebarProps {
  collapsed?: boolean;
  userInfo?: UserInfoProps;
}

const UserInfoArea: FC<UserInfoAreaProps> = memo(
  ({ avatar, name = '', path }) => {
    const history = useHistory();

    return (
      <section className={styles.avatarWrap}>
        <div
          className={styles.avatar}
          style={{
            backgroundImage: avatar ? `url("${avatar}")` : '',
            cursor: path ? 'pointer' : 'auto',
          }}
          onClick={() => path && history.push(path)}
        ></div>
        <p className={styles.nickname}>{name}</p>
      </section>
    );
  }
);

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = true,
  userInfo,
}) => {
  return (
    <aside className={classnames(styles.sidebar, { collapsed })}>
      <UserInfoArea
        avatar={userInfo?.avatar_url}
        name={userInfo?.name}
        path="/"
      />
      <Nav collapsed={collapsed} />
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
