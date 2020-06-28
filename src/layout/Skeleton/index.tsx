import React from 'react';

import { Nav } from './Nav';
import { Sidebar } from './Sidebar';
import styles from './index.less';

export const Skeleton = ({ children }: { children?: React.ReactChild }) => (
  <section className={styles.container}>
    <Sidebar />
    <main className={styles.main}>{children}</main>
  </section>
);

export function createSkeleton(props: any) {
  const LeftNav = () => <Nav />;
  const SkeletonImpl = <Skeleton {...props} LeftNav={LeftNav} />;

  return SkeletonImpl;
}

export default createSkeleton;
