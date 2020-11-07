import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import siteConf from 'Config/site';

import { Header } from './Header';
import { Sidebar, UserInfoProps } from './Sidebar';

import { SkeletonStore } from './skeleton-store';
import styles from './index.less';

interface SkeletonProps {
  children?: React.ReactChild;
  userInfo?: UserInfoProps;
}

const links = [
  {
    href: 'https://github.com/anran758',
    label: 'Github',
    newTab: true,
  },
  {
    href: 'https://anran758.github.io/blog',
    label: 'Blog',
    newTab: true,
  },
  {
    label: '知乎专栏',
    href: 'https://zhuanlan.zhihu.com/c_1147180666474176512',
    newTab: true,
  },
  {
    href: 'https://github.com/anran758/Front-End-Lab',
    label: '知识速查库',
    newTab: true,
  },
];

export const Skeleton: FC<SkeletonProps> = ({ children, userInfo }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setTimeout(() => {
      setCollapsed(false);
    }, 1000);
  }, []);

  return (
    <section className={styles.container}>
      <Sidebar collapsed={collapsed} userInfo={userInfo} />
      <section className={styles.main}>
        <Header
          collapsed={collapsed}
          links={links}
          toggleCollapsed={toggleCollapsed}
          githubRepo={`${siteConf.name}/${siteConf.repoName}`}
        />
        <main className={styles.content}>{children}</main>
      </section>
    </section>
  );
};

Skeleton.displayName = 'Skeleton';

export function createSkeleton() {
  const store = new SkeletonStore();
  store.initUserInfo();

  const SkeletonImpl: FC<SkeletonProps> = (props) => (
    <Skeleton userInfo={store.githubUserInfo} {...props} />
  );

  return observer(SkeletonImpl);
}

export default createSkeleton();
