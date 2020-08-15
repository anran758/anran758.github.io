import React, { FC } from 'react';
import classNames from 'classnames';

import { tuple } from '@/utils/type';

import styles from './index.less';

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
const RowJustify = tuple(
  'start',
  'end',
  'center',
  'space-around',
  'space-between'
);

export interface RowProps {
  className?: string;
  align?: typeof RowAligns[number];
  justify?: typeof RowJustify[number];
  center?: boolean;
  style?: React.CSSProperties;
}

export const Row: FC<RowProps> = ({
  justify,
  align,
  center,
  className,
  style,
  children,
}) => {
  const classes = classNames(
    styles.row,
    {
      [`${styles.row}-justify-${justify}`]: justify,
      [`${styles.row}-align-${align}`]: align,
      [`${styles.row}-center`]: center,
    },
    className
  );

  return (
    <section className={classes} style={style}>
      {children}
    </section>
  );
};

Row.displayName = 'Row';
