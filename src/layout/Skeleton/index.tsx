import React from 'react';
import { observer } from 'mobx-react';

export const Skeleton = ({
  LeftNav,
  children,
}: {
  LeftNav: React.ComponentType;
  children?: React.ReactChild;
}) => (
  <section>
    <aside>{LeftNav && <LeftNav />}</aside>
    <main>{children}</main>
  </section>
);

export function createSkeleton() {
  const SkeletonImpl = (props: any) => <Skeleton {...props} />;
  return observer(SkeletonImpl);
}

export default createSkeleton();
