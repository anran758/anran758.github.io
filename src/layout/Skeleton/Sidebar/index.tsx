import React, { FC, memo, useEffect, useState } from 'react';

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

const UserInfoArea: FC<UserInfoAreaProps> = memo(({ avatar, name = '' }) => (
  <section className={styles.avatarWrap}>
    <div
      className={styles.avatar}
      style={{ backgroundImage: avatar ? `url("${avatar}")` : '' }}
    ></div>
    <p className={styles.nickname}>{name}</p>
  </section>
));

export const Sidebar = () => {
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
    <aside className={styles.sidebar}>
      <UserInfoArea avatar={userInfo?.avatar_url} name={userInfo?.name} />
      <Nav></Nav>
    </aside>
  );
};

export default Sidebar;
