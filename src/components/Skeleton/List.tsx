import React, { FC, memo, useMemo } from 'react';
import classnames from 'classnames';

import { randomRangeNum } from '@/utils';
import styles from './index.less';

export interface IListProps {
  size?: number;
  loading?: boolean;
}

/**
 * 生成指定数量的占位行
 */
function generateRows(count: number) {
  const rows = Array(count);

  for (let i = 0; i < count; i++) {
    const width = randomRangeNum(12, 60);

    rows[i] = (
      <section className={styles.listItem} key={i}>
        <div className={styles.listItemChild} style={{ width: `${width}%` }}></div>
        <div
          className={classnames(styles.listItemSubContent, styles.listItemChild)}
        ></div>
      </section>
    );
  }

  return rows;
}

export const List: FC<IListProps> = memo(({ size = 10, loading = false, children }) => {
  const rows = useMemo(() => generateRows(size), [size]);

  return <section>{loading ? rows : children}</section>;
});

List.displayName = 'SkeletonList';
