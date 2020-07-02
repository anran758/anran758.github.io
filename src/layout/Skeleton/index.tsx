import React, { FC, useState } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import styles from './index.less';

interface SkeletonProps {
  children?: React.ReactChild;
}

const links = [
  {
    href: 'https://anran758.github.io/blog',
    label: '博客',
  },
  {
    href: 'https://github.com/anran758',
    label: 'Github',
  },
];

export const Skeleton: FC<SkeletonProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <section className={styles.container}>
      <Sidebar />
      <section className={styles.main}>
        <Header
          collapsed={collapsed}
          links={links}
          toggleCollapsed={toggleCollapsed}
        />
        <main className={styles.content}>{children}</main>
      </section>
    </section>
  );
};

export function createSkeleton(props: any) {
  const SkeletonImpl = <Skeleton {...props} />;

  return SkeletonImpl;
}

export default createSkeleton;
