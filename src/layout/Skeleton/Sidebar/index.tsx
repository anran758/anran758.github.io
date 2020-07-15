import React, { FC, memo, useEffect, useState } from 'react';
import classnames from 'classnames';

import { Nav } from '../Nav';
import styles from './index.less';

interface UserInfoAreaProps {
  avatar?: string;
  name?: string;
}

interface UserInfoProps {
  avatar_url: string;
  name: string;
  [key: string]: any;
}

interface SidebarProps {
  collapsed?: boolean;
}

const UserInfoArea: FC<UserInfoAreaProps> = memo(({ avatar, name = '' }) => (
  <section className={styles.avatarWrap}>
    <div
      className={styles.avatar}
      style={{ backgroundImage: avatar ? `url("${avatar}")` : '' }}
    ></div>
    <p className={styles.nickname}>{name}</p>
  </section>
));

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = true }) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);

  // 通过 Github 获取用户信息
  useEffect(() => {
    const username = 'anran758';

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
      });
  }, []);

  return (
    <aside className={classnames(styles.sidebar, { collapsed })}>
      <UserInfoArea avatar={userInfo?.avatar_url} name={userInfo?.name} />
      {!collapsed && <Nav />}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
